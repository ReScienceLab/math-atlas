import { execFileSync, spawn } from "node:child_process";
import {
  createReadStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const pngDpi = 300;
const pngPixelsPerMeter = Math.round(pngDpi / 0.0254);

const outputs = [
  { name: "github", width: 1500, height: 500, scale: 2, file: "github-banner.png" },
];

function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  for (const command of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome"]) {
    if (commandExists(command)) return command;
  }

  throw new Error("Could not find Chrome/Chromium. Set CHROME_PATH to a headless-capable browser binary.");
}

function contentType(filePath) {
  const extension = path.extname(filePath);
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".js") return "text/javascript; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".png") return "image/png";
  if (extension === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

function startServer() {
  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    const requestedPath = decodeURIComponent(requestUrl.pathname);
    const filePath = path.normalize(path.join(root, requestedPath));

    if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType(filePath) });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

function pngPhysicalResolutionChunk() {
  const data = Buffer.alloc(9);
  data.writeUInt32BE(pngPixelsPerMeter, 0);
  data.writeUInt32BE(pngPixelsPerMeter, 4);
  data.writeUInt8(1, 8);
  return pngChunk("pHYs", data);
}

function setPngDpi(filePath) {
  const buffer = readFileSync(filePath);
  const signature = buffer.subarray(0, 8);
  const chunks = [signature];
  const physicalResolution = pngPhysicalResolutionChunk();
  let inserted = false;
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const chunkEnd = offset + 12 + length;

    if (type === "IDAT" && !inserted) {
      chunks.push(physicalResolution);
      inserted = true;
    }

    if (type !== "pHYs") {
      chunks.push(buffer.subarray(offset, chunkEnd));
    }

    offset = chunkEnd;
  }

  writeFileSync(filePath, Buffer.concat(chunks));
}

function render(baseUrl, { name, width, height, scale, file }) {
  const chrome = findChrome();
  const outPath = path.join(publicDir, file);
  const userDataDir = mkdtempSync(path.join(tmpdir(), `math-atlas-social-${name}-`));
  const url = `${baseUrl}/assets/social/banner.html?variant=${name}`;
  rmSync(outPath, { force: true });
  const args = [
    "--headless=new",
    "--hide-scrollbars",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--run-all-compositor-stages-before-draw",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    `--force-device-scale-factor=${scale}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height}`,
    `--screenshot=${outPath}`,
    url,
  ];

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    let captured = false;
    let lastSize = 0;
    let stableSizeChecks = 0;
    let timedOut = false;
    let forceKillTimer;
    const child = spawn(chrome, args, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    const readyPoll = setInterval(() => {
      if (!existsSync(outPath)) return;

      const { size } = statSync(outPath);
      if (size === 0) return;

      if (size === lastSize) {
        stableSizeChecks += 1;
      } else {
        stableSizeChecks = 0;
        lastSize = size;
      }

      if (stableSizeChecks >= 2) {
        captured = true;
        child.kill("SIGTERM");
      }
    }, 100);
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      forceKillTimer = setTimeout(() => child.kill("SIGKILL"), 2000);
    }, 15000);

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      clearInterval(readyPoll);
      clearTimeout(timer);
      clearTimeout(forceKillTimer);
      rmSync(userDataDir, { recursive: true, force: true });
      reject(error);
    });
    child.on("close", (status, signal) => {
      clearInterval(readyPoll);
      clearTimeout(timer);
      clearTimeout(forceKillTimer);
      rmSync(userDataDir, { recursive: true, force: true });

      if (captured || timedOut) {
        if (!existsSync(outPath) || statSync(outPath).size === 0) {
          reject(new Error(`${chrome} closed before writing ${file}`));
          return;
        }
      } else if (status !== 0) {
        reject(new Error(`${chrome} exited with ${status ?? signal}\n${stderr || stdout}`));
        return;
      }

      setPngDpi(outPath);
      const { size } = statSync(outPath);
      console.log(`Rendered ${path.relative(root, outPath)} (${width * scale}x${height * scale}, ${pngDpi} DPI, ${Math.round(size / 1024)} KB)`);
      resolve();
    });
  });
}

mkdirSync(publicDir, { recursive: true });
const { server, port } = await startServer();
try {
  const baseUrl = `http://127.0.0.1:${port}`;
  for (const output of outputs) await render(baseUrl, output);
} finally {
  server.close();
}
