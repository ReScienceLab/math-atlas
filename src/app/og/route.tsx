import { ImageResponse } from "next/og";
import { fieldLabel, getProblem, problems, statusLabel } from "@/lib/problems";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const size = { width: 2400, height: 1260 };
const dpi = 300;
const pixelsPerMeter = Math.round(dpi / 0.0254);

function writeUint32(target: Uint8Array, offset: number, value: number) {
  target[offset] = (value >>> 24) & 0xff;
  target[offset + 1] = (value >>> 16) & 0xff;
  target[offset + 2] = (value >>> 8) & 0xff;
  target[offset + 3] = value & 0xff;
}

function readUint32(source: Uint8Array, offset: number) {
  return (
    source[offset] * 0x1000000 +
    ((source[offset + 1] << 16) | (source[offset + 2] << 8) | source[offset + 3])
  );
}

function crc32(source: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of source) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatBytes(parts: Uint8Array[]) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function pngChunk(type: string, data: Uint8Array) {
  const typeBytes = new TextEncoder().encode(type);
  const chunk = new Uint8Array(12 + data.length);
  writeUint32(chunk, 0, data.length);
  chunk.set(typeBytes, 4);
  chunk.set(data, 8);
  writeUint32(chunk, 8 + data.length, crc32(concatBytes([typeBytes, data])));
  return chunk;
}

function pngDpiChunk() {
  const data = new Uint8Array(9);
  writeUint32(data, 0, pixelsPerMeter);
  writeUint32(data, 4, pixelsPerMeter);
  data[8] = 1;
  return pngChunk("pHYs", data);
}

function withPngDpi(source: Uint8Array) {
  const chunks = [source.slice(0, 8)];
  const physicalResolution = pngDpiChunk();
  let inserted = false;
  let offset = 8;

  while (offset < source.length) {
    const length = readUint32(source, offset);
    const type = String.fromCharCode(
      source[offset + 4],
      source[offset + 5],
      source[offset + 6],
      source[offset + 7],
    );
    const end = offset + 12 + length;

    if (type === "IDAT" && !inserted) {
      chunks.push(physicalResolution);
      inserted = true;
    }

    if (type !== "pHYs") {
      chunks.push(source.slice(offset, end));
    }

    offset = end;
  }

  return concatBytes(chunks);
}

function kakeyaPath(width: number, height: number) {
  const cx = width * 0.5;
  const cy = height * 0.48;
  const scale = Math.min(width * 0.98, height * 1.18);
  const compression = 0.24 + 0.42 * 0.18;
  const points: string[] = [];

  for (let i = 0; i <= 96; i += 1) {
    const angle = (i / 96) * Math.PI;
    const x = cx + Math.cos(angle) * scale * 0.34;
    const y = cy + Math.sin(angle) * scale * compression - scale * 0.11;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  points.push(`L ${(cx + scale * 0.31).toFixed(2)} ${(cy + scale * 0.27).toFixed(2)}`);
  points.push(`Q ${cx.toFixed(2)} ${(cy + scale * 0.34).toFixed(2)} ${(cx - scale * 0.31).toFixed(2)} ${(cy + scale * 0.27).toFixed(2)}`);
  points.push("Z");
  return points.join(" ");
}

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function KakeyaGraphic() {
  const width = 920;
  const height = 720;
  const cx = width * 0.5;
  const cy = height * 0.48;
  const scale = Math.min(width * 0.98, height * 1.18);
  const compression = 0.24 + 0.42 * 0.18;
  const activeAngle = (3.7 * 0.22) % Math.PI;
  const needleX = cx + Math.cos(activeAngle) * scale * 0.12;
  const needleY = cy + Math.sin(activeAngle) * scale * compression * 0.36 - scale * 0.02;
  const needleLen = scale * 0.42;
  const ndx = Math.cos(activeAngle) * needleLen * 0.5;
  const ndy = Math.sin(activeAngle) * needleLen * 0.5;

  const lines = Array.from({ length: 74 }, (_, i) => {
    const angle = (i / 73) * Math.PI;
    const bend = Math.sin(angle * 3 + 3.7 * 0.8) * scale * 0.018;
    const px = cx + Math.cos(angle) * scale * 0.12 + bend;
    const py = cy + Math.sin(angle) * scale * compression * 0.36 - scale * 0.02;
    const len = scale * 0.42;
    const dx = Math.cos(angle) * len * 0.5;
    const dy = Math.sin(angle) * len * 0.5;
    const opacity = 0.12 + seeded(i) * 0.32;
    return <line key={i} x1={px - dx} y1={py - dy} x2={px + dx} y2={py + dy} stroke="#f5f5f5" strokeOpacity={opacity} strokeWidth="1.5" />;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", right: 112, top: 250 }}>
      <path d={kakeyaPath(width, height)} fill="#60a5fa" fillOpacity="0.07" stroke="#60a5fa" strokeOpacity="0.28" strokeWidth="2" />
      {lines}
      <line x1={width * 0.13} y1={height * 0.78} x2={width * 0.87} y2={height * 0.78} stroke="#f5f5f5" strokeOpacity="0.16" strokeWidth="2" />
      <line x1={needleX - ndx} y1={needleY - ndy} x2={needleX + ndx} y2={needleY + ndy} stroke="#60a5fa" strokeOpacity="0.18" strokeWidth="15" />
      <line x1={needleX - ndx} y1={needleY - ndy} x2={needleX + ndx} y2={needleY + ndy} stroke="#f5f5f5" strokeOpacity="0.18" strokeWidth="8" />
      <line x1={needleX - ndx} y1={needleY - ndy} x2={needleX + ndx} y2={needleY + ndy} stroke="#60a5fa" strokeOpacity="0.95" strokeWidth="4" />
      <circle cx={needleX} cy={needleY} r="8" fill="#f5f5f5" fillOpacity="0.78" />
    </svg>
  );
}

function Grid() {
  const vertical = Array.from({ length: Math.ceil(size.width / 60) + 1 }, (_, i) => (
    <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2={size.height} stroke="#ffffff" strokeOpacity="0.055" />
  ));
  const horizontal = Array.from({ length: Math.ceil(size.height / 60) + 1 }, (_, i) => (
    <line key={`h-${i}`} x1="0" y1={i * 60} x2={size.width} y2={i * 60} stroke="#ffffff" strokeOpacity="0.055" />
  ));

  return (
    <svg width={size.width} height={size.height} style={{ position: "absolute", inset: 0 }}>
      {vertical}
      {horizontal}
    </svg>
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const problem = slug ? getProblem(slug) : undefined;
  const openCount = problems.filter((item) => item.status === "open").length;
  const recentCount = problems.filter((item) => item.collections?.includes("recent")).length;
  const fieldCount = new Set(problems.map((item) => item.field)).size;

  const title = problem?.title ?? "Math Atlas";
  const description =
    problem?.shortDescription ?? "A curated atlas of mathematical problems, conjectures, and theorems.";
  const statOne = problem ? statusLabel[problem.status] : String(problems.length);
  const statTwo = problem ? fieldLabel[problem.field] : String(openCount);
  const statThree = problem ? String(problem.year) : `${recentCount} / ${fieldCount}`;
  const statOneLabel = problem ? "Status" : "Problems";
  const statTwoLabel = problem ? "Field" : "Open";
  const statThreeLabel = problem ? "Year" : "Recent / Fields";
  const titleSize = title.length > 24 ? 118 : 178;

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050608",
          color: "#f4f4f5",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <Grid />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 74% 43%, rgba(59,130,246,0.16), transparent 25%), radial-gradient(circle at 66% 80%, rgba(76,199,159,0.08), transparent 30%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: size.width, height: 130, display: "flex", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ width: 640, display: "flex", alignItems: "center", paddingLeft: 50, borderRight: "1px solid rgba(255,255,255,0.14)", fontSize: 44, fontWeight: 760, textTransform: "uppercase" }}>Math Atlas</div>
          <div style={{ width: 880, display: "flex", alignItems: "center", gap: 90, paddingLeft: 90, borderRight: "1px solid rgba(255,255,255,0.14)", color: "#9b9ca3", fontSize: 28, fontWeight: 650, textTransform: "uppercase" }}>
            <span>Index</span>
            <span>Problems</span>
            <span>Summary</span>
          </div>
          {[
            [statOneLabel, statOne, 200],
            [statTwoLabel, statTwo, 180],
            [statThreeLabel, statThree, 360],
          ].map(([label, value, width]) => (
            <div key={label} style={{ width, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 44, borderRight: "1px solid rgba(255,255,255,0.14)", textTransform: "uppercase" }}>
              <span style={{ color: "#8d8e96", fontSize: 26, fontWeight: 650 }}>{label}</span>
              <span style={{ color: "#f4f4f5", fontSize: 38, fontWeight: 560, marginTop: 10 }}>{value}</span>
            </div>
          ))}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#9b9ca3", fontSize: 42, fontWeight: 700 }}>GH</div>
        </div>

        <div style={{ position: "absolute", left: 100, top: 310, width: 1220, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: titleSize, lineHeight: 0.92, fontWeight: 820, letterSpacing: 0, textTransform: "uppercase", textShadow: "0 0 32px rgba(255,255,255,0.18)" }}>
            {title}
          </div>
          <div style={{ marginTop: 58, width: 1060, color: "#b7b7bc", fontSize: 50, lineHeight: 1.32, fontWeight: 520 }}>
            {description}
          </div>
          <div style={{ marginTop: 92, display: "flex", alignItems: "center", gap: 28, color: "#9b9ca3", fontSize: 28, fontWeight: 650, textTransform: "uppercase" }}>
            {[
              ["#3b82f6", "Number Theory"],
              ["#4cc79f", "Geometry"],
              ["#c47a3f", "Combinatorics"],
              ["#d6d7da", "Analysis"],
            ].map(([color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 18, height: 18, background: color }} />
                <span>{label}</span>
              </div>
            ))}
            <span>And More</span>
          </div>
          <div style={{ marginTop: 150, color: "#63a2ff", fontSize: 42, fontWeight: 520 }}>
            https://math.rescience.com/
          </div>
        </div>

        <KakeyaGraphic />
      </div>
    ),
    size,
  );

  const body = withPngDpi(new Uint8Array(await image.arrayBuffer()));
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
