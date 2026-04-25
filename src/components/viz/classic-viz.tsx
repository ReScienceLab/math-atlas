"use client";

import { useEffect, useRef } from "react";

type Pointer = { x: number; y: number; active: boolean };
type DrawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) => void;

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function clear(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, width, height);
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, step = 24, alpha = 0.055) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  const canvasMin = Math.min(ctx.canvas.clientWidth || ctx.canvas.width, ctx.canvas.clientHeight || ctx.canvas.height);
  if (canvasMin < 720) return;
  ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillStyle = "rgba(245,245,245,0.48)";
  ctx.fillText(text, x, y);
}

function drawMono(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size = 11,
  color = "rgba(245,245,245,0.68)",
) {
  const canvasMin = Math.min(ctx.canvas.clientWidth || ctx.canvas.width, ctx.canvas.clientHeight || ctx.canvas.height);
  if (canvasMin < 520 || size <= 11) return;
  ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function CanvasViz({ draw, className = "" }: { draw: DrawFrame; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<Pointer>({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    let dpr = 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / Math.max(1, rect.width),
        y: (event.clientY - rect.top) / Math.max(1, rect.height),
        active: true,
      };
    };

    const leave = () => {
      pointerRef.current.active = false;
    };

    const tick = () => {
      draw(ctx, width, height, reduced ? 0 : frame * 0.016, pointerRef.current);
      frame += 1;
      if (!reduced) raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [draw]);

  return (
    <div className={`h-full w-full overflow-hidden bg-[var(--gray-950)] ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

function drawRiemann(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.04);

  const cx = width * 0.5;
  const left = width * 0.3;
  const right = width * 0.7;
  ctx.strokeStyle = "rgba(245,245,245,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, height * 0.08);
  ctx.lineTo(left, height * 0.92);
  ctx.moveTo(right, height * 0.08);
  ctx.lineTo(right, height * 0.92);
  ctx.stroke();

  ctx.strokeStyle = "rgba(96,165,250,0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, height * 0.08);
  ctx.lineTo(cx, height * 0.92);
  ctx.stroke();

  ctx.strokeStyle = "rgba(245,245,245,0.22)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    for (let y = height * 0.1; y <= height * 0.9; y += 4) {
      const x = cx + Math.sin(y * 0.035 + time * (1.2 + i * 0.2)) * (24 + i * 16);
      if (y === height * 0.1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  for (let i = 0; i < 18; i++) {
    const y = height * (0.12 + i * 0.044 + seeded(i) * 0.012);
    const glow = 3 + Math.sin(time * 2 + i) * 1.5;
    ctx.beginPath();
    ctx.arc(cx, y, glow, 0, Math.PI * 2);
    ctx.fillStyle = i % 3 === 0 ? "rgba(96,165,250,0.85)" : "rgba(245,245,245,0.64)";
    ctx.fill();
  }

  if (pointer.active) {
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    ctx.arc(pointer.x * width, pointer.y * height, 28, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawLabel(ctx, "critical strip: 0 < Re(s) < 1", left + 8, height * 0.1);
  drawLabel(ctx, "Re(s) = 1/2", cx + 8, height * 0.15);
}

function drawPvsNP(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 28, 0.035);

  const center = { x: width * 0.5, y: height * 0.5 };
  const npR = Math.min(width, height) * 0.32;
  const pR = Math.min(width, height) * 0.15;
  const p = { x: center.x - npR * 0.28, y: center.y, r: pR };

  ctx.fillStyle = "rgba(255,255,255,0.025)";
  ctx.beginPath();
  ctx.arc(center.x, center.y, npR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(245,245,245,0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center.x, center.y, npR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(96,165,250,0.08)";
  ctx.strokeStyle = "rgba(96,165,250,0.48)";
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const nodes = Array.from({ length: 24 }, (_, i) => {
    const angle = i * 2.399 + time * 0.08;
    const radius = npR * (0.55 + seeded(i) * 0.38);
    return { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
  });
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  nodes.forEach((a, i) => {
    const b = nodes[(i * 7 + 3) % nodes.length];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
  nodes.forEach((node, i) => {
    const hot = i === Math.floor((time * 8) % nodes.length);
    ctx.beginPath();
    ctx.arc(node.x, node.y, hot ? 4 : 2.4, 0, Math.PI * 2);
    ctx.fillStyle = hot ? "rgba(96,165,250,0.9)" : "rgba(245,245,245,0.45)";
    ctx.fill();
  });

  drawMono(ctx, "P", p.x - 5, p.y + 4, 12, "rgba(245,245,245,0.78)");
  drawMono(ctx, "NP", center.x + npR * 0.42, center.y - npR * 0.62, 12, "rgba(245,245,245,0.72)");
  drawMono(ctx, "P = NP ?", center.x - 26, center.y + npR + 22, 11, "rgba(96,165,250,0.7)");
  drawLabel(ctx, "verifiable solutions / efficient search", width * 0.1, height * 0.88);
  if (pointer.active) {
    ctx.strokeStyle = "rgba(96,165,250,0.35)";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pointer.x * width, pointer.y * height);
    ctx.stroke();
  }
}

function drawNavierStokes(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 26, 0.035);
  const px = pointer.active ? pointer.x * width : width * 0.5;
  const py = pointer.active ? pointer.y * height : height * 0.48;

  for (let i = 0; i < 360; i++) {
    let x = seeded(i) * width;
    let y = seeded(i + 1000) * height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let step = 0; step < 18; step++) {
      const dx = x - px;
      const dy = y - py;
      const dist = Math.max(36, Math.hypot(dx, dy));
      const vx = -dy / dist + Math.sin(y * 0.018 + time) * 0.35;
      const vy = dx / dist + Math.cos(x * 0.018 - time) * 0.35;
      x += vx * 5.8;
      y += vy * 5.8;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(96,165,250,${0.05 + seeded(i + 5) * 0.16})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(px, py, 16 + Math.sin(time * 3) * 4, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(245,245,245,0.35)";
  ctx.stroke();
  drawLabel(ctx, "velocity field / possible singularity", 16, height - 18);
}

function drawHodge(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.04);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const rx = width * 0.32;
  const ry = height * 0.18;

  ctx.fillStyle = "rgba(255,255,255,0.025)";
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 1.05, ry * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let j = -4; j <= 4; j++) {
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const u = (i / 100) * Math.PI * 2;
      const x = cx + Math.cos(u) * (rx + j * 2);
      const y = cy + Math.sin(u) * (ry + j * 4) + Math.sin(u * 3 + time) * 8;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = j === 0 ? "rgba(96,165,250,0.62)" : "rgba(255,255,255,0.12)";
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(245,245,245,0.44)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 0.52, ry * 1.35, Math.sin(time * 0.5) * 0.15, 0, Math.PI * 2);
  ctx.stroke();

  const gridX = width * 0.16;
  const gridY = height * 0.18;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      ctx.strokeStyle = i === j ? "rgba(96,165,250,0.58)" : "rgba(245,245,245,0.12)";
      ctx.strokeRect(gridX + i * 16, gridY + j * 16, 12, 12);
    }
  }
  drawMono(ctx, "H^(p,p)", gridX, gridY - 10, 10, "rgba(245,245,245,0.48)");
  drawLabel(ctx, "Hodge class -> algebraic cycle", cx - 74, cy + ry + 34);
}

function drawBSD(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.04);
  const sx = width / 6.4;
  const sy = height / 5.6;
  const ox = width * 0.38;
  const oy = height * 0.62;
  const pulse = 0.52 + Math.sin(time * 2) * 0.18;

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(0, oy);
  ctx.lineTo(width, oy);
  ctx.moveTo(ox, 0);
  ctx.lineTo(ox, height);
  ctx.stroke();

  ctx.strokeStyle = "rgba(96,165,250,0.72)";
  ctx.lineWidth = 1.5;
  for (const sign of [-1, 1]) {
    ctx.beginPath();
    let first = true;
    for (let x = -2.1; x <= 2.1; x += 0.012) {
      const rhs = x * x * x - x + 0.6;
      if (rhs < 0) {
        first = true;
        continue;
      }
      const y = sign * Math.sqrt(rhs);
      const px = ox + x * sx;
      const py = oy - y * sy;
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  }

  for (let i = 0; i < 14; i++) {
    const x = -1.8 + i * 0.28;
    const rhs = x * x * x - x + 0.6;
    if (rhs <= 0) continue;
    const y = Math.sqrt(rhs) * (i % 2 === 0 ? 1 : -1);
    ctx.beginPath();
    ctx.arc(ox + x * sx, oy - y * sy, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(245,245,245,${pulse})`;
    ctx.fill();
  }

  const lx = width * 0.68;
  const ly = height * 0.42;
  ctx.strokeStyle = "rgba(245,245,245,0.18)";
  ctx.beginPath();
  ctx.moveTo(lx - 40, ly + 58);
  ctx.lineTo(lx + 72, ly + 58);
  ctx.moveTo(lx, ly - 48);
  ctx.lineTo(lx, ly + 68);
  ctx.stroke();
  ctx.strokeStyle = "rgba(96,165,250,0.72)";
  ctx.beginPath();
  for (let i = -40; i <= 72; i++) {
    const s = i / 36;
    const x = lx + i;
    const y = ly + 58 - (s - 1) * (s - 1) * 18 - Math.sin(s * 2 + time * 0.6) * 4;
    if (i === -40) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(lx, ly + 58, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(245,245,245,0.72)";
  ctx.fill();
  drawMono(ctx, "s=1", lx - 10, ly + 82, 10, "rgba(245,245,245,0.5)");
  drawLabel(ctx, "rank <-> order of zero of L(E,s) at s=1", 16, height - 18);
}

function drawYangMills(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.08);
  const cols = 9;
  const rows = 9;
  const sx = width / (cols + 1);
  const sy = height / (rows + 1);

  for (let y = 1; y <= rows; y++) {
    for (let x = 1; x <= cols; x++) {
      const px = x * sx;
      const py = y * sy;
      const angle = Math.sin(x * 1.7 + y * 1.2 + time) * Math.PI;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(96,165,250,0.45)";
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(px, py, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,245,245,0.45)";
      ctx.fill();
    }
  }

  const gap = height * 0.78;
  ctx.strokeStyle = "rgba(245,245,245,0.24)";
  ctx.beginPath();
  ctx.moveTo(width * 0.15, gap);
  ctx.lineTo(width * 0.85, gap);
  ctx.stroke();
  ctx.fillStyle = "rgba(96,165,250,0.72)";
  ctx.fillRect(width * 0.42, gap - 28 - Math.sin(time * 2) * 4, width * 0.16, 28 + Math.sin(time * 2) * 4);
  drawLabel(ctx, "mass gap", width * 0.42, gap + 18);
}

function collatzNext(n: number) {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
}

function drawCollatz(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.035);
  for (let seed = 7; seed <= 31; seed += 4) {
    let n = seed;
    ctx.beginPath();
    for (let i = 0; i < 38; i++) {
      const x = width * 0.08 + i * width * 0.022;
      const y = height * 0.86 - Math.log2(n + 1) * height * 0.08;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      n = collatzNext(n);
      if (n === 1) break;
    }
    ctx.strokeStyle = seed === 27 ? "rgba(96,165,250,0.8)" : "rgba(245,245,245,0.18)";
    ctx.lineWidth = seed === 27 ? 1.8 : 1;
    ctx.stroke();
  }
  const pulse = Math.floor((time * 8) % 30);
  drawLabel(ctx, `n -> ${pulse % 2 === 0 ? "n/2" : "3n+1"}`, 16, height - 18);
}

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function drawGoldbach(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.035);
  const evens = [10, 16, 22, 28, 34, 40, 46, 52, 58, 64];
  const activeRow = pointer.active
    ? Math.max(0, Math.min(evens.length - 1, Math.floor(pointer.y * evens.length)))
    : Math.floor((time * 0.45) % evens.length);

  evens.forEach((even, row) => {
    const y = height * (0.13 + row * 0.075);
    const selected = row === activeRow;
    if (selected) {
      ctx.fillStyle = "rgba(96,165,250,0.07)";
      ctx.fillRect(width * 0.1, y - 14, width * 0.78, 28);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(width * 0.18, y);
    ctx.lineTo(width * 0.88, y);
    ctx.stroke();
    drawMono(ctx, `${even}`, width * 0.1, y + 4, 10, selected ? "rgba(96,165,250,0.82)" : "rgba(245,245,245,0.42)");

    const pairs: { p: number; q: number }[] = [];
    for (let p = 2; p <= even / 2; p++) {
      const q = even - p;
      if (!isPrime(p) || !isPrime(q)) continue;
      pairs.push({ p, q });
      const x1 = width * (0.18 + p / even * 0.7);
      const x2 = width * (0.18 + q / even * 0.7);
      if (selected) {
        const arcH = 12 + pairs.length * 2.4;
        ctx.strokeStyle = "rgba(96,165,250,0.28)";
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.quadraticCurveTo((x1 + x2) / 2, y - arcH, x2, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x1, y, 2.4, 0, Math.PI * 2);
      ctx.arc(x2, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = selected ? "rgba(96,165,250,0.88)" : "rgba(245,245,245,0.42)";
      ctx.fill();
    }
    if (selected && pairs.length > 0) {
      const pair = pairs[Math.floor((time * 0.8) % pairs.length)];
      drawMono(ctx, `${even} = ${pair.p} + ${pair.q}`, width * 0.58, y - 18, 10, "rgba(96,165,250,0.78)");
    }
  });
  drawLabel(ctx, "every even N > 2 has N = p + q", 16, height - 18);
}

function drawTwinPrime(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.035);
  const max = 120;
  const rows = 3;
  const rowSpan = Math.ceil(max / rows);
  const left = width * 0.1;
  const right = width * 0.9;

  for (let row = 0; row < rows; row++) {
    const start = row * rowSpan;
    const end = Math.min(max, start + rowSpan);
    const y = height * (0.24 + row * 0.22);
    ctx.strokeStyle = "rgba(245,245,245,0.1)";
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    drawMono(ctx, `${start}`, left - 24, y + 4, 9, "rgba(245,245,245,0.35)");

    for (let n = Math.max(2, start); n <= end; n++) {
      if (!isPrime(n)) continue;
      const x = left + ((n - start) / rowSpan) * (right - left);
      const twin = isPrime(n - 2) || isPrime(n + 2);
      ctx.beginPath();
      ctx.arc(x, y, twin ? 3 : 1.9, 0, Math.PI * 2);
      ctx.fillStyle = twin ? "rgba(96,165,250,0.84)" : "rgba(245,245,245,0.4)";
      ctx.fill();

      if (isPrime(n + 2) && n + 2 <= end) {
        const x2 = left + ((n + 2 - start) / rowSpan) * (right - left);
        const h = 14 + Math.sin(time * 1.6 + n) * 2;
        ctx.strokeStyle = "rgba(96,165,250,0.34)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + x2) / 2, y - h, x2, y);
        ctx.stroke();
      }
    }
  }

  drawMono(ctx, "gap = 2", width * 0.68, height * 0.16, 11, "rgba(96,165,250,0.72)");
  drawLabel(ctx, "infinitely many prime pairs p, p+2 ?", 16, height - 18);
}

function drawAbc(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.035);
  const a = 1;
  const b = 80;
  const c = 81;
  const radical = 30;
  const baseY = height * 0.76;
  const barW = width * 0.11;
  const max = 90;
  const items = [
    { label: "a", value: a, x: width * 0.18, color: "rgba(245,245,245,0.34)" },
    { label: "b", value: b, x: width * 0.34, color: "rgba(245,245,245,0.42)" },
    { label: "c", value: c, x: width * 0.5, color: "rgba(96,165,250,0.74)" },
    { label: "rad", value: radical, x: width * 0.7, color: "rgba(245,245,245,0.54)" },
  ];

  drawMono(ctx, `${a} + ${b} = ${c}`, width * 0.18, height * 0.18, 14, "rgba(245,245,245,0.76)");
  drawMono(ctx, "rad(abc) = 2 * 3 * 5 = 30", width * 0.18, height * 0.26, 11, "rgba(245,245,245,0.48)");
  drawMono(ctx, "c much larger than radical", width * 0.18, height * 0.34, 10, "rgba(96,165,250,0.66)");

  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.beginPath();
  ctx.moveTo(width * 0.12, baseY);
  ctx.lineTo(width * 0.86, baseY);
  ctx.stroke();

  items.forEach((item) => {
    const h = (item.value / max) * height * 0.42;
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, baseY - h, barW, h);
    drawMono(ctx, item.label, item.x + 2, baseY + 18, 10, "rgba(245,245,245,0.5)");
    drawMono(ctx, `${item.value}`, item.x + 2, baseY - h - 7, 10, "rgba(245,245,245,0.58)");
  });

  const pulse = 0.45 + Math.sin(time * 2) * 0.18;
  ctx.strokeStyle = `rgba(96,165,250,${pulse})`;
  ctx.beginPath();
  ctx.moveTo(width * 0.7 + barW * 0.5, baseY - (radical / max) * height * 0.42);
  ctx.lineTo(width * 0.5 + barW * 0.5, baseY - (c / max) * height * 0.42);
  ctx.stroke();
  drawLabel(ctx, "a + b = c, compare c with rad(abc)", 16, height - 18);
}

function drawContinuum(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 26, 0.035);
  const bands = [
    { label: "aleph_0", y: 0.25, w: 0.34 },
    { label: "?", y: 0.48, w: 0.58 },
    { label: "2^aleph_0", y: 0.71, w: 0.82 },
  ];
  bands.forEach((band, i) => {
    const x = width * (0.5 - band.w / 2);
    const y = height * band.y;
    const h = height * 0.12;
    ctx.strokeStyle = i === 1 ? "rgba(96,165,250,0.62)" : "rgba(245,245,245,0.28)";
    ctx.strokeRect(x, y, width * band.w, h);
    ctx.fillStyle = i === 1 ? "rgba(96,165,250,0.1)" : "rgba(255,255,255,0.04)";
    ctx.fillRect(x, y, width * band.w, h);
    ctx.fillStyle = "rgba(245,245,245,0.7)";
    ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(band.label, x + 10, y + h * 0.62);
  });
  ctx.strokeStyle = "rgba(245,245,245,0.18)";
  ctx.setLineDash([4, 5]);
  ctx.beginPath();
  ctx.moveTo(width * 0.33, height * 0.37);
  ctx.lineTo(width * 0.33, height * 0.7);
  ctx.moveTo(width * 0.67, height * 0.37);
  ctx.lineTo(width * 0.67, height * 0.7);
  ctx.stroke();
  ctx.setLineDash([]);
  const sweep = width * (0.12 + ((time * 0.08) % 0.76));
  ctx.strokeStyle = "rgba(96,165,250,0.38)";
  ctx.beginPath();
  ctx.moveTo(sweep, height * 0.18);
  ctx.lineTo(sweep, height * 0.88);
  ctx.stroke();
  drawLabel(ctx, "independent of ZFC", 16, height - 18);
}

function drawPoincare(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.035);
  const cx = width * 0.5;
  const cy = height * 0.5;
  for (let ring = 0; ring < 6; ring++) {
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const angle = (i / 180) * Math.PI * 2;
      const r = Math.min(width, height) * (0.13 + ring * 0.045);
      const smoothing = Math.exp(-ring * 0.12) * Math.sin(angle * 3 + time * 1.2) * (10 - ring);
      const x = cx + Math.cos(angle) * (r + smoothing);
      const y = cy + Math.sin(angle) * (r * 0.78 + smoothing * 0.55);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ring === 2 ? "rgba(96,165,250,0.72)" : "rgba(245,245,245,0.18)";
    ctx.lineWidth = ring === 2 ? 1.8 : 1;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(245,245,245,0.72)";
  ctx.fill();
  ctx.strokeStyle = "rgba(96,165,250,0.32)";
  ctx.setLineDash([5, 6]);
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(width, height) * 0.33, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  drawMono(ctx, "simply connected closed 3-manifold", 16, 26, 10, "rgba(245,245,245,0.48)");
  drawLabel(ctx, "Ricci flow smoothing -> S^3", 16, height - 18);
}

function drawKakeya2D(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.036);

  const cx = width * 0.5;
  const cy = height * 0.52;
  const scale = Math.min(width, height);
  const compression = 0.24 + (pointer.active ? pointer.x : 0.42) * 0.18;
  const activeAngle = pointer.active ? pointer.y * Math.PI : (time * 0.22) % Math.PI;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "rgba(96,165,250,0.055)";
  ctx.strokeStyle = "rgba(96,165,250,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 96; i++) {
    const angle = (i / 96) * Math.PI;
    const x = Math.cos(angle) * scale * 0.34;
    const y = Math.sin(angle) * scale * compression - scale * 0.11;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(scale * 0.31, scale * 0.27);
  ctx.quadraticCurveTo(0, scale * 0.34, -scale * 0.31, scale * 0.27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  for (let i = 0; i < 74; i++) {
    const angle = (i / 73) * Math.PI;
    const bend = Math.sin(angle * 3 + time * 0.8) * scale * 0.018;
    const px = Math.cos(angle) * scale * 0.12 + bend;
    const py = Math.sin(angle) * scale * compression * 0.36 - scale * 0.02;
    const len = scale * 0.42;
    const dx = Math.cos(angle) * len * 0.5;
    const dy = Math.sin(angle) * len * 0.5;
    const hot = Math.abs(Math.atan2(Math.sin(angle - activeAngle), Math.cos(angle - activeAngle))) < 0.035;

    ctx.beginPath();
    ctx.moveTo(px - dx, py - dy);
    ctx.lineTo(px + dx, py + dy);
    ctx.strokeStyle = hot ? "rgba(245,245,245,0.95)" : `rgba(245,245,245,${0.1 + seeded(i) * 0.24})`;
    ctx.lineWidth = hot ? 1.9 : 1;
    ctx.stroke();
  }

  const needleX = Math.cos(activeAngle) * scale * 0.12;
  const needleY = Math.sin(activeAngle) * scale * compression * 0.36 - scale * 0.02;
  const needleLen = scale * 0.42;
  const ndx = Math.cos(activeAngle) * needleLen * 0.5;
  const ndy = Math.sin(activeAngle) * needleLen * 0.5;
  ctx.beginPath();
  ctx.moveTo(needleX - ndx, needleY - ndy);
  ctx.lineTo(needleX + ndx, needleY + ndy);
  ctx.strokeStyle = "rgba(96,165,250,0.95)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(needleX, needleY, 3.4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(245,245,245,0.74)";
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(245,245,245,0.16)";
  ctx.beginPath();
  ctx.moveTo(width * 0.13, height * 0.78);
  ctx.lineTo(width * 0.87, height * 0.78);
  ctx.stroke();

  drawMono(ctx, "area -> 0", width * 0.14, height * 0.84, 12, "rgba(245,245,245,0.46)");
  drawMono(ctx, "dim = 2", width * 0.72, height * 0.84, 12, "rgba(96,165,250,0.72)");
}

function drawFourColor(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const colors = ["rgba(96,165,250,0.34)", "rgba(34,197,94,0.28)", "rgba(249,115,22,0.3)", "rgba(245,245,245,0.25)"];
  const cells = [
    [[0.05, 0.12], [0.28, 0.08], [0.34, 0.28], [0.19, 0.42], [0.06, 0.33]],
    [[0.28, 0.08], [0.52, 0.1], [0.5, 0.32], [0.34, 0.28]],
    [[0.52, 0.1], [0.82, 0.08], [0.92, 0.26], [0.73, 0.38], [0.5, 0.32]],
    [[0.06, 0.33], [0.19, 0.42], [0.23, 0.63], [0.05, 0.75]],
    [[0.19, 0.42], [0.34, 0.28], [0.5, 0.32], [0.47, 0.56], [0.23, 0.63]],
    [[0.5, 0.32], [0.73, 0.38], [0.68, 0.62], [0.47, 0.56]],
    [[0.73, 0.38], [0.92, 0.26], [0.9, 0.62], [0.68, 0.62]],
    [[0.05, 0.75], [0.23, 0.63], [0.38, 0.84], [0.18, 0.92]],
    [[0.23, 0.63], [0.47, 0.56], [0.57, 0.82], [0.38, 0.84]],
    [[0.47, 0.56], [0.68, 0.62], [0.78, 0.9], [0.57, 0.82]],
    [[0.68, 0.62], [0.9, 0.62], [0.93, 0.9], [0.78, 0.9]],
  ];
  const hot = pointer.active ? Math.floor(pointer.x * cells.length) % cells.length : Math.floor((time * 1.1) % cells.length);
  cells.forEach((cell, i) => {
    ctx.beginPath();
    cell.forEach(([x, y], j) => {
      const px = x * width;
      const py = y * height;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = colors[i % 4];
    ctx.fill();
    ctx.strokeStyle = i === hot ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.18)";
    ctx.lineWidth = i === hot ? 1.8 : 1;
    ctx.stroke();
  });
}

function drawSpherePacking(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.024);
  const radius = Math.min(width, height) * 0.075;
  const dx = radius * 1.76;
  const dy = radius * 1.52;
  const ox = width * 0.5;
  const oy = height * 0.52;
  for (let row = -4; row <= 4; row++) {
    for (let col = -5; col <= 5; col++) {
      const x = ox + col * dx + (row % 2) * dx * 0.5;
      const y = oy + row * dy;
      if (x < -radius || x > width + radius || y < -radius || y > height + radius) continue;
      const dist = Math.hypot((x - ox) / dx, (y - oy) / dy);
      ctx.beginPath();
      ctx.arc(x, y, radius * (0.92 + Math.sin(time * 1.3 + dist) * 0.02), 0, Math.PI * 2);
      ctx.fillStyle = dist < 1.2 ? "rgba(96,165,250,0.24)" : "rgba(245,245,245,0.12)";
      ctx.fill();
      ctx.strokeStyle = "rgba(245,245,245,0.2)";
      ctx.stroke();
    }
  }
  const px = pointer.active ? pointer.x * width : ox + Math.cos(time) * dx;
  const py = pointer.active ? pointer.y * height : oy + Math.sin(time) * dy;
  ctx.beginPath();
  ctx.arc(px, py, radius * 0.92, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(96,165,250,0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawTSP(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.024);
  const nodes = Array.from({ length: 16 }, (_, i) => ({
    x: width * (0.12 + seeded(i * 7 + 1) * 0.76),
    y: height * (0.14 + seeded(i * 7 + 2) * 0.72),
  }));
  const cx = pointer.active ? pointer.x * width : width * (0.5 + Math.sin(time * 0.35) * 0.08);
  const cy = pointer.active ? pointer.y * height : height * 0.52;
  const route = [...nodes].sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
  ctx.strokeStyle = "rgba(96,165,250,0.5)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  route.forEach((node, i) => {
    if (i === 0) ctx.moveTo(node.x, node.y);
    else ctx.lineTo(node.x, node.y);
  });
  ctx.closePath();
  ctx.stroke();
  nodes.forEach((node, i) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, i === 0 ? 4.2 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? "rgba(96,165,250,0.95)" : "rgba(245,245,245,0.66)";
    ctx.fill();
  });
}

function drawAperiodicTiling(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  const scale = Math.min(width, height) * 0.11;
  const cx = width * 0.5;
  const cy = height * 0.5;
  for (let ring = 0; ring < 5; ring++) {
    const count = 5 + ring * 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ring * 0.37 + time * 0.03;
      const r = scale * (0.35 + ring * 0.82);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      const tilt = angle + (ring % 2 ? Math.PI / 5 : 0);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tilt);
      ctx.beginPath();
      ctx.moveTo(0, -scale * 0.42);
      ctx.lineTo(scale * 0.26, 0);
      ctx.lineTo(0, scale * 0.7);
      ctx.lineTo(-scale * 0.42, 0);
      ctx.closePath();
      const hot = pointer.active && Math.hypot(pointer.x * width - x, pointer.y * height - y) < scale;
      ctx.fillStyle = hot ? "rgba(96,165,250,0.34)" : ring % 2 ? "rgba(245,245,245,0.11)" : "rgba(96,165,250,0.13)";
      ctx.fill();
      ctx.strokeStyle = "rgba(245,245,245,0.17)";
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawMandelbrot(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  const cell = Math.max(3, Math.floor(Math.min(width, height) / 110));
  const zoom = pointer.active ? 2.2 - pointer.y * 1.3 : 1.25 + Math.sin(time * 0.15) * 0.12;
  const ox = pointer.active ? -0.75 + (pointer.x - 0.5) * 0.8 : -0.72;
  const oy = pointer.active ? (pointer.y - 0.5) * 0.45 : 0;
  for (let y = 0; y < height; y += cell) {
    for (let x = 0; x < width; x += cell) {
      const cr = ox + (x / width - 0.5) * 3.2 * zoom;
      const ci = oy + (y / height - 0.5) * 2.6 * zoom;
      let zr = 0;
      let zi = 0;
      let n = 0;
      while (zr * zr + zi * zi <= 4 && n < 36) {
        const next = zr * zr - zi * zi + cr;
        zi = 2 * zr * zi + ci;
        zr = next;
        n++;
      }
      const a = n === 36 ? 0.78 : n / 52;
      ctx.fillStyle = n === 36 ? "rgba(5,5,5,1)" : `rgba(96,165,250,${a})`;
      ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
    }
  }
}

function drawSquarePeg(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const base = Math.min(width, height) * 0.28;
  ctx.beginPath();
  for (let i = 0; i <= 240; i++) {
    const a = (i / 240) * Math.PI * 2;
    const r = base * (1 + 0.15 * Math.sin(3 * a + time * 0.7) + 0.08 * Math.cos(5 * a));
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.78;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "rgba(245,245,245,0.34)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  const angle = pointer.active ? pointer.x * Math.PI * 2 : time * 0.24;
  const side = base * 0.86;
  const square = Array.from({ length: 4 }, (_, i) => {
    const a = angle + Math.PI / 4 + i * Math.PI / 2;
    return { x: cx + Math.cos(a) * side, y: cy + Math.sin(a) * side * 0.78 };
  });
  ctx.strokeStyle = "rgba(96,165,250,0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  square.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.stroke();
  square.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(245,245,245,0.75)";
    ctx.fill();
  });
}

function drawHadwigerNelson(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const r = Math.min(width, height) * 0.24;
  const nodes = [
    [0, 0], [1, 0], [0.5, 0.86], [-0.5, 0.86], [-1, 0], [-0.5, -0.86], [0.5, -0.86],
    [1.5, 0.86], [1.5, -0.86], [-1.5, 0.86], [-1.5, -0.86],
  ].map(([x, y]) => ({ x: cx + x * r * 0.72, y: cy + y * r * 0.72 }));
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [1, 6], [2, 3], [4, 3], [4, 5], [5, 6], [2, 7], [1, 7], [6, 8], [1, 8], [3, 9], [4, 9], [5, 10], [4, 10]];
  ctx.strokeStyle = "rgba(245,245,245,0.18)";
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });
  const palette = ["#60a5fa", "#86efac", "#fdba74", "#d4d4d4", "#f87171"];
  nodes.forEach((node, i) => {
    const hot = pointer.active && Math.hypot(pointer.x * width - node.x, pointer.y * height - node.y) < 26;
    ctx.beginPath();
    ctx.arc(node.x, node.y, hot ? 7 : 5, 0, Math.PI * 2);
    ctx.fillStyle = palette[(i + Math.floor(time * 0.5)) % palette.length];
    ctx.globalAlpha = hot ? 0.95 : 0.72;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function drawPlateau(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const cx = width * 0.5;
  const top = height * 0.22;
  const bottom = height * 0.78;
  const rx = Math.min(width, height) * 0.24;
  const pull = pointer.active ? (pointer.x - 0.5) * 28 : Math.sin(time * 0.7) * 12;
  ctx.strokeStyle = "rgba(245,245,245,0.24)";
  ctx.lineWidth = 1.3;
  [top, bottom].forEach((y) => {
    ctx.beginPath();
    ctx.ellipse(cx, y, rx, rx * 0.24, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    const x1 = cx - rx + Math.sin(t * Math.PI) * pull;
    const x2 = cx + rx + Math.sin(t * Math.PI) * pull;
    const y = top + t * (bottom - top);
    ctx.strokeStyle = `rgba(96,165,250,${0.08 + Math.sin(t * Math.PI) * 0.24})`;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.bezierCurveTo(cx - rx * 0.35 + pull, y, cx + rx * 0.35 + pull, y, x2, y);
    ctx.stroke();
  }
}

function drawKissingNumber(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.024);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const radius = Math.min(width, height) * 0.12;
  const orbit = radius * 2.04;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(96,165,250,0.22)";
  ctx.fill();
  ctx.strokeStyle = "rgba(96,165,250,0.62)";
  ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI * 2 / 12 + time * 0.08;
    const z = Math.sin(i * 1.7 + time * 0.6);
    const x = cx + Math.cos(a) * orbit * (0.92 + z * 0.08);
    const y = cy + Math.sin(a) * orbit * 0.62;
    const hot = pointer.active && Math.hypot(pointer.x * width - x, pointer.y * height - y) < radius;
    ctx.beginPath();
    ctx.arc(x, y, radius * (0.72 + z * 0.08), 0, Math.PI * 2);
    ctx.fillStyle = hot ? "rgba(245,245,245,0.34)" : "rgba(245,245,245,0.13)";
    ctx.fill();
    ctx.strokeStyle = "rgba(245,245,245,0.22)";
    ctx.stroke();
  }
}

function drawSteinerTree(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const pts = [
    { x: width * 0.18, y: height * 0.24 },
    { x: width * 0.78, y: height * 0.2 },
    { x: width * 0.84, y: height * 0.72 },
    { x: width * 0.28, y: height * 0.82 },
    { x: width * 0.46, y: height * 0.46 },
  ];
  const s1 = { x: pointer.active ? pointer.x * width : width * (0.45 + Math.sin(time * 0.7) * 0.03), y: height * 0.42 };
  const s2 = { x: width * 0.56, y: pointer.active ? pointer.y * height : height * (0.62 + Math.cos(time * 0.8) * 0.03) };
  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.stroke();
  ctx.strokeStyle = "rgba(96,165,250,0.62)";
  ctx.lineWidth = 2;
  [[pts[0], s1], [pts[1], s1], [s1, s2], [s2, pts[2]], [s2, pts[3]], [s1, pts[4]]].forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
  [...pts, s1, s2].forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, i >= pts.length ? 3.4 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle = i >= pts.length ? "rgba(96,165,250,0.95)" : "rgba(245,245,245,0.7)";
    ctx.fill();
  });
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent = "rgba(96,165,250,0.42)",
  active = false,
) {
  ctx.fillStyle = active ? "rgba(96,165,250,0.11)" : "rgba(255,255,255,0.035)";
  ctx.strokeStyle = active ? "rgba(96,165,250,0.76)" : "rgba(245,245,245,0.14)";
  ctx.lineWidth = active ? 1.5 : 1;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y, 3, height);
  drawMono(ctx, label, x + 10, y + height * 0.56, 10, active ? "rgba(245,245,245,0.86)" : "rgba(245,245,245,0.58)");
}

function drawAbcVerification(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.038);

  const left = width * 0.1;
  const top = height * 0.12;
  drawMono(ctx, "abc conjecture", left, top, 13, "rgba(245,245,245,0.78)");
  drawMono(ctx, "a + b = c  |  c ? rad(abc)^(1+eps)", left, top + 24, 10, "rgba(245,245,245,0.5)");

  const baseY = height * 0.72;
  const bars = [
    { label: "a", value: 18, x: width * 0.12, color: "rgba(245,245,245,0.32)" },
    { label: "b", value: 72, x: width * 0.21, color: "rgba(245,245,245,0.42)" },
    { label: "c", value: 90, x: width * 0.3, color: "rgba(96,165,250,0.72)" },
    { label: "rad", value: 34, x: width * 0.41, color: "rgba(249,115,22,0.58)" },
  ];
  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.beginPath();
  ctx.moveTo(width * 0.1, baseY);
  ctx.lineTo(width * 0.52, baseY);
  ctx.stroke();
  bars.forEach((bar) => {
    const h = (bar.value / 100) * height * 0.34;
    ctx.fillStyle = bar.color;
    ctx.fillRect(bar.x, baseY - h, width * 0.045, h);
    drawMono(ctx, bar.label, bar.x, baseY + 17, 9, "rgba(245,245,245,0.5)");
  });

  const proofX = width * 0.58;
  const proofY = height * 0.15;
  const nodeW = width * 0.3;
  const nodeH = 34;
  const cursorX = pointer.active ? pointer.x * width : proofX + nodeW * 0.7;
  const cursorY = pointer.active ? pointer.y * height : proofY + nodeH * 3.3;
  const nodes = [
    { label: "2012 claimed IUT proof", y: proofY, color: "rgba(245,245,245,0.38)" },
    { label: "disputed lemma / translation gap", y: proofY + 62, color: "rgba(249,115,22,0.58)" },
    { label: "Lean formalization projects", y: proofY + 124, color: "rgba(96,165,250,0.56)" },
    { label: "kernel-checkable statement", y: proofY + 186, color: "rgba(34,197,94,0.52)" },
  ];
  nodes.forEach((node, i) => {
    const active = Math.abs(cursorY - (node.y + nodeH / 2)) < 38 && cursorX > proofX - 20;
    drawBox(ctx, node.label, proofX, node.y, nodeW, nodeH, node.color, active);
    if (i < nodes.length - 1) {
      ctx.strokeStyle = i === 1 ? "rgba(249,115,22,0.36)" : "rgba(245,245,245,0.18)";
      ctx.setLineDash(i === 1 ? [4, 6] : []);
      ctx.beginPath();
      ctx.moveTo(proofX + nodeW * 0.5, node.y + nodeH);
      ctx.lineTo(proofX + nodeW * 0.5, nodes[i + 1].y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  const scan = proofX + ((time * 34) % Math.max(1, nodeW));
  ctx.strokeStyle = "rgba(96,165,250,0.28)";
  ctx.beginPath();
  ctx.moveTo(scan, proofY - 12);
  ctx.lineTo(scan, proofY + 230);
  ctx.stroke();
  drawLabel(ctx, "verification, not consensus yet", 16, height - 18);
}

function drawFaltingsAbel(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.035);

  const cx = width * 0.46;
  const cy = height * 0.5;
  ctx.strokeStyle = "rgba(245,245,245,0.24)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const r = Math.min(width, height) * (0.2 + 0.055 * Math.sin(t * 3));
    const x = cx + Math.cos(t) * r * 1.25;
    const y = cy + Math.sin(t * 2) * r * 0.54;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  for (let i = 0; i < 12; i++) {
    const t = i * 0.73 + 0.2;
    const r = Math.min(width, height) * (0.2 + 0.055 * Math.sin(t * 3));
    const x = cx + Math.cos(t) * r * 1.25;
    const y = cy + Math.sin(t * 2) * r * 0.54;
    const active = pointer.active && Math.hypot(pointer.x * width - x, pointer.y * height - y) < 28;
    ctx.beginPath();
    ctx.arc(x, y, active ? 5 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle = active || i % 3 === 0 ? "rgba(96,165,250,0.82)" : "rgba(245,245,245,0.58)";
    ctx.fill();
  }

  const medalX = width * 0.77;
  const medalY = height * 0.28;
  ctx.beginPath();
  ctx.arc(medalX, medalY, Math.min(width, height) * 0.12, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(245,245,245,0.46)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(medalX, medalY, Math.min(width, height) * (0.07 + Math.sin(time * 1.3) * 0.004), 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(96,165,250,0.38)";
  ctx.lineWidth = 1;
  ctx.stroke();
  drawMono(ctx, "ABEL", medalX - 16, medalY + 4, 12, "rgba(245,245,245,0.72)");

  drawBox(ctx, "Mordell: finite C(Q)", width * 0.08, height * 0.12, width * 0.33, 34, "rgba(96,165,250,0.46)");
  drawBox(ctx, "Mordell-Lang: subvariety intersection", width * 0.52, height * 0.72, width * 0.4, 34, "rgba(245,245,245,0.36)");
  drawMono(ctx, "genus > 1 arithmetic curve", width * 0.18, height * 0.82, 10, "rgba(245,245,245,0.42)");
  drawLabel(ctx, "Faltings: rational points made finite and structural", 16, height - 18);
}

export function RiemannViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawRiemann} className={className} />;
}

export function PvsNPViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawPvsNP} className={className} />;
}

export function NavierStokesViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawNavierStokes} className={className} />;
}

export function HodgeViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawHodge} className={className} />;
}

export function BSDViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawBSD} className={className} />;
}

export function YangMillsViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawYangMills} className={className} />;
}

export function CollatzViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawCollatz} className={className} />;
}

export function GoldbachViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawGoldbach} className={className} />;
}

export function TwinPrimeViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawTwinPrime} className={className} />;
}

export function AbcViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawAbc} className={className} />;
}

export function ContinuumViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawContinuum} className={className} />;
}

export function PoincareViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawPoincare} className={className} />;
}

export function Kakeya2DViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawKakeya2D} className={className} />;
}

export function FourColorViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawFourColor} className={className} />;
}

export function SpherePackingViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawSpherePacking} className={className} />;
}

export function TSPViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawTSP} className={className} />;
}

export function AperiodicTilingViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawAperiodicTiling} className={className} />;
}

export function MandelbrotViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawMandelbrot} className={className} />;
}

export function SquarePegViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawSquarePeg} className={className} />;
}

export function HadwigerNelsonViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawHadwigerNelson} className={className} />;
}

export function PlateauViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawPlateau} className={className} />;
}

export function KissingNumberViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawKissingNumber} className={className} />;
}

export function SteinerTreeViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawSteinerTree} className={className} />;
}

export function AbcVerificationViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawAbcVerification} className={className} />;
}

export function FaltingsAbelViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawFaltingsAbel} className={className} />;
}
