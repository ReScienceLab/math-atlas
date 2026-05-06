"use client";

import { useEffect, useRef } from "react";

type Pointer = { x: number; y: number; active: boolean };
type Vec2 = { x: number; y: number };
type DrawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) => void;

const CARD_PREVIEW_CLASS = "viz-card-preview";
const DEFAULT_BG = "#050505";

function isCardPreviewCanvas(ctx: CanvasRenderingContext2D) {
  return ctx.canvas.dataset.cardPreview === "true";
}

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function clear(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  if (isCardPreviewCanvas(ctx)) return;

  ctx.fillStyle = DEFAULT_BG;
  ctx.fillRect(0, 0, width, height);
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  step = 24,
  alpha = 0.055,
) {
  if (isCardPreviewCanvas(ctx)) return;

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

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
) {
  const canvasMin = Math.min(
    ctx.canvas.clientWidth || ctx.canvas.width,
    ctx.canvas.clientHeight || ctx.canvas.height,
  );
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
  const canvasMin = Math.min(
    ctx.canvas.clientWidth || ctx.canvas.width,
    ctx.canvas.clientHeight || ctx.canvas.height,
  );
  if (canvasMin < 520 || size <= 11) return;
  ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function CanvasViz({
  draw,
  className = "",
}: {
  draw: DrawFrame;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<Pointer>({ x: 0.5, y: 0.5, active: false });
  const isCardPreview = className.includes(CARD_PREVIEW_CLASS);

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
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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
    <div
      className={`h-full w-full overflow-hidden ${isCardPreview ? "bg-[#0a0a0a]" : "bg-[var(--gray-950)]"} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        data-card-preview={isCardPreview ? "true" : undefined}
        aria-hidden="true"
      />
    </div>
  );
}

function drawRiemann(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
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
      const x =
        cx + Math.sin(y * 0.035 + time * (1.2 + i * 0.2)) * (24 + i * 16);
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
    ctx.fillStyle =
      i % 3 === 0 ? "rgba(96,165,250,0.85)" : "rgba(245,245,245,0.64)";
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

function drawPvsNP(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
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
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
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
  drawMono(
    ctx,
    "NP",
    center.x + npR * 0.42,
    center.y - npR * 0.62,
    12,
    "rgba(245,245,245,0.72)",
  );
  drawMono(
    ctx,
    "P = NP ?",
    center.x - 26,
    center.y + npR + 22,
    11,
    "rgba(96,165,250,0.7)",
  );
  drawLabel(
    ctx,
    "verifiable solutions / efficient search",
    width * 0.1,
    height * 0.88,
  );
  if (pointer.active) {
    ctx.strokeStyle = "rgba(96,165,250,0.35)";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pointer.x * width, pointer.y * height);
    ctx.stroke();
  }
}

function drawNavierStokes(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const scale = Math.min(width, height) * 0.4;
  const vortexX = pointer.active
    ? pointer.x * width
    : cx + Math.sin(time * 0.2) * scale * 0.3;
  const vortexY = pointer.active
    ? pointer.y * height
    : cy + Math.cos(time * 0.15) * scale * 0.2;
  const cols = 16,
    rows = 12;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const px = (i / cols) * width;
      const py = (j / rows) * height;
      const dx = px - vortexX,
        dy = py - vortexY;
      const dist = Math.sqrt(dx * dx + dy * dy) + 1;
      const strength = (scale * 40) / (dist + scale * 0.5);
      const vx = (-dy / dist) * strength + 15;
      const vy = (dx / dist) * strength;
      const len = Math.sqrt(vx * vx + vy * vy);
      if (len < 0.5) continue;
      const al = Math.min(0.5, 0.08 + strength / 40);
      const arrowLen = Math.min(20, len * 0.8);
      const nx = vx / len,
        ny = vy / len;
      const ex = px + nx * arrowLen,
        ey = py + ny * arrowLen;
      ctx.strokeStyle = `rgba(96,165,250,${al})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      const hs = Math.min(4, arrowLen * 0.3);
      ctx.fillStyle = `rgba(96,165,250,${al})`;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - nx * hs + ny * hs * 0.4, ey - ny * hs - nx * hs * 0.4);
      ctx.lineTo(ex - nx * hs - ny * hs * 0.4, ey - ny * hs + nx * hs * 0.4);
      ctx.closePath();
      ctx.fill();
    }
  }
  const glow = ctx.createRadialGradient(
    vortexX,
    vortexY,
    0,
    vortexX,
    vortexY,
    20,
  );
  glow.addColorStop(0, "rgba(96,165,250,0.4)");
  glow.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(vortexX - 20, vortexY - 20, 40, 40);
  ctx.beginPath();
  ctx.arc(vortexX, vortexY, 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(96,165,250,0.9)";
  ctx.fill();
  drawMono(
    ctx,
    "vortex",
    vortexX + 10,
    vortexY - 8,
    10,
    "rgba(96,165,250,0.7)",
  );
  drawLabel(
    ctx,
    "\u2202\u209cu + (u\xb7\u2207)u = -\u2207p + \u03bd\u2206u",
    12,
    height - 14,
  );
}

function drawHodge(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.28;
  const r = R * 0.38;
  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.6 : 0.4;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.5 : time * 0.15;
  const cosX = Math.cos(tiltX),
    sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY),
    sinY = Math.sin(rotY);
  const project = (u: number, v: number): [number, number, number] => {
    const x0 = (R + r * Math.cos(v)) * Math.cos(u);
    const y0 = (R + r * Math.cos(v)) * Math.sin(u);
    const z0 = r * Math.sin(v);
    const x1 = x0 * cosY + z0 * sinY;
    const z1 = -x0 * sinY + z0 * cosY;
    const y1 = y0 * cosX - z1 * sinX;
    const z2 = y0 * sinX + z1 * cosX;
    return [cx + x1, cy + y1, z2];
  };
  const nU = 36,
    nV = 18;
  const meshAlpha = isCardPreviewCanvas(ctx) ? 0.1 : 0.085;
  for (let i = 0; i < nU; i++) {
    const u = (i / nU) * Math.PI * 2;
    ctx.beginPath();
    for (let j = 0; j <= nV * 2; j++) {
      const v = (j / (nV * 2)) * Math.PI * 2;
      const [px, py] = project(u, v);
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(245,245,245,${meshAlpha})`;
    ctx.lineWidth = 0.65;
    ctx.stroke();
  }
  for (let j = 0; j < nV; j++) {
    const v = (j / nV) * Math.PI * 2;
    ctx.beginPath();
    for (let i = 0; i <= nU * 2; i++) {
      const u = (i / (nU * 2)) * Math.PI * 2;
      const [px, py] = project(u, v);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(245,245,245,${meshAlpha})`;
    ctx.lineWidth = 0.65;
    ctx.stroke();
  }
  ctx.save();
  ctx.shadowColor = "rgba(96,165,250,0.28)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let i = 0; i <= 80; i++) {
    const u = (i / 80) * Math.PI * 2;
    const [px, py] = project(u, 0);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "rgba(96,165,250,0.52)";
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.shadowColor = "rgba(34,197,94,0.24)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let i = 0; i <= 80; i++) {
    const v = (i / 80) * Math.PI * 2;
    const [px, py] = project(0, v);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "rgba(34,197,94,0.46)";
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
  drawLabel(
    ctx,
    "H^{p,q}(X) \u2014 two independent 1-cycles on torus",
    12,
    height - 14,
  );
}

function drawBSD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
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
    const y =
      ly + 58 - (s - 1) * (s - 1) * 18 - Math.sin(s * 2 + time * 0.6) * 4;
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

function drawYangMills(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const n = 12;
  const spacing = Math.min(width, height) * 0.06;
  const ox = cx - ((n - 1) * spacing) / 2;
  const oy = cy - ((n - 1) * spacing) / 2;
  const exciteX = pointer.active
    ? pointer.x * width
    : cx + Math.sin(time * 0.3) * spacing * 2;
  const exciteY = pointer.active
    ? pointer.y * height
    : cy + Math.cos(time * 0.25) * spacing * 2;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = ox + i * spacing;
      const y = oy + j * spacing;
      const dx = x - exciteX,
        dy = y - exciteY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const energy =
        Math.exp((-dist * dist) / (spacing * spacing * 8)) *
        (0.5 + 0.5 * Math.sin(time * 2 - dist * 0.05));
      if (i < n - 1 && j < n - 1) {
        ctx.fillStyle = `rgba(96,165,250,${energy * 0.18})`;
        ctx.fillRect(x, y, spacing, spacing);
      }
      if (i < n - 1) {
        const phase = seeded(i * n + j) * Math.PI * 2 + time * 0.3 + energy * 2;
        const amp = energy * spacing * 0.15;
        ctx.strokeStyle = `rgba(245,245,245,${0.1 + energy * 0.3})`;
        ctx.lineWidth = 0.6 + energy;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x + spacing / 2,
          y + Math.sin(phase) * amp,
          x + spacing,
          y,
        );
        ctx.stroke();
      }
      if (j < n - 1) {
        const phase =
          seeded(i * n + j + 200) * Math.PI * 2 + time * 0.3 + energy * 2;
        const amp = energy * spacing * 0.15;
        ctx.strokeStyle = `rgba(245,245,245,${0.1 + energy * 0.3})`;
        ctx.lineWidth = 0.6 + energy;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
          x + Math.sin(phase) * amp,
          y + spacing / 2,
          x,
          y + spacing,
        );
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, 1.5 + energy * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,245,245,${0.15 + energy * 0.5})`;
      ctx.fill();
    }
  }
  const glow = ctx.createRadialGradient(
    exciteX,
    exciteY,
    0,
    exciteX,
    exciteY,
    spacing * 3,
  );
  glow.addColorStop(0, "rgba(96,165,250,0.25)");
  glow.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(
    exciteX - spacing * 3,
    exciteY - spacing * 3,
    spacing * 6,
    spacing * 6,
  );
  drawLabel(
    ctx,
    "gauge field energy \u2014 mass gap \u0394m > 0",
    12,
    height - 14,
  );
}

function collatzNext(n: number) {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
}

function drawCollatz(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const startN = pointer.active
    ? Math.floor(pointer.x * 120) + 3
    : Math.floor(27 + Math.sin(time * 0.1) * 20);
  const maxSteps = 120;
  const orbits = [startN, startN + 2, startN + 7, startN + 13, startN + 19];
  const colors = [
    "rgba(96,165,250,",
    "rgba(34,197,94,",
    "rgba(249,115,22,",
    "rgba(168,85,247,",
    "rgba(245,158,11,",
  ];
  const stepW = width / (maxSteps + 2);
  const maxVal = Math.max(...orbits) * 4;
  for (let oi = 0; oi < orbits.length; oi++) {
    let n = orbits[oi];
    const pts: [number, number][] = [];
    for (let s = 0; s < maxSteps && n > 1; s++) {
      const x = (s + 1) * stepW;
      const y = height - 20 - (Math.log(n) / Math.log(maxVal)) * (height - 50);
      pts.push([x, y]);
      n = collatzNext(n);
    }
    if (pts.length < 2) continue;
    const alpha = oi === 0 ? 0.7 : 0.25;
    ctx.strokeStyle = colors[oi] + alpha + ")";
    ctx.lineWidth = oi === 0 ? 1.5 : 0.8;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
  }
  const oneY = height - 20;
  ctx.strokeStyle = "rgba(96,165,250,0.3)";
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, oneY);
  ctx.lineTo(width, oneY);
  ctx.stroke();
  ctx.setLineDash([]);
  drawMono(ctx, "n=1", width - 40, oneY - 6, 10, "rgba(96,165,250,0.6)");
  drawMono(ctx, `n\u2080=${orbits[0]}`, 12, 20, 12, "rgba(96,165,250,0.8)");
  drawLabel(
    ctx,
    "T(n) = n/2 or 3n+1 \u2014 all orbits reach 1",
    12,
    height - 14,
  );
}

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function drawGoldbach(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.035);
  const evens = [10, 16, 22, 28, 34, 40, 46, 52, 58, 64];
  const activeRow = pointer.active
    ? Math.max(
        0,
        Math.min(evens.length - 1, Math.floor(pointer.y * evens.length)),
      )
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
    drawMono(
      ctx,
      `${even}`,
      width * 0.1,
      y + 4,
      10,
      selected ? "rgba(96,165,250,0.82)" : "rgba(245,245,245,0.42)",
    );

    const pairs: { p: number; q: number }[] = [];
    for (let p = 2; p <= even / 2; p++) {
      const q = even - p;
      if (!isPrime(p) || !isPrime(q)) continue;
      pairs.push({ p, q });
      const x1 = width * (0.18 + (p / even) * 0.7);
      const x2 = width * (0.18 + (q / even) * 0.7);
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
      ctx.fillStyle = selected
        ? "rgba(96,165,250,0.88)"
        : "rgba(245,245,245,0.42)";
      ctx.fill();
    }
    if (selected && pairs.length > 0) {
      const pair = pairs[Math.floor((time * 0.8) % pairs.length)];
      drawMono(
        ctx,
        `${even} = ${pair.p} + ${pair.q}`,
        width * 0.58,
        y - 18,
        10,
        "rgba(96,165,250,0.78)",
      );
    }
  });
  drawLabel(ctx, "every even N > 2 has N = p + q", 16, height - 18);
}

function drawTwinPrime(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const maxN = pointer.active
    ? Math.floor(pointer.x * 400) + 50
    : Math.floor(200 + Math.sin(time * 0.1) * 100);
  const isPrime = new Uint8Array(maxN + 3).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let i = 2; i * i <= maxN + 2; i++)
    if (isPrime[i]) for (let j = i * i; j <= maxN + 2; j += i) isPrime[j] = 0;
  const twins: [number, number][] = [];
  for (let i = 2; i <= maxN; i++)
    if (isPrime[i] && isPrime[i + 2]) twins.push([i, i + 2]);
  const cols = Math.ceil(Math.sqrt(maxN));
  const cellW = width / (cols + 1);
  const cellH = height / (Math.ceil(maxN / cols) + 1);
  const sz = Math.min(cellW, cellH) * 0.8;
  for (let n = 2; n <= maxN; n++) {
    const col = (n - 1) % cols;
    const row = Math.floor((n - 1) / cols);
    const x = (col + 0.5) * cellW;
    const y = (row + 0.5) * cellH + 10;
    if (x > width || y > height) continue;
    const isTwin = twins.some(([a, b]) => n === a || n === b);
    if (isPrime[n]) {
      ctx.beginPath();
      ctx.arc(x, y, sz * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = isTwin ? "rgba(96,165,250,0.7)" : "rgba(245,245,245,0.3)";
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(245,245,245,0.04)";
      ctx.fillRect(x - sz * 0.15, y - sz * 0.15, sz * 0.3, sz * 0.3);
    }
  }
  for (const [a, b] of twins.slice(0, 30)) {
    const colA = (a - 1) % cols,
      rowA = Math.floor((a - 1) / cols);
    const colB = (b - 1) % cols,
      rowB = Math.floor((b - 1) / cols);
    const x1 = (colA + 0.5) * cellW,
      y1 = (rowA + 0.5) * cellH + 10;
    const x2 = (colB + 0.5) * cellW,
      y2 = (rowB + 0.5) * cellH + 10;
    if (x1 > width || y1 > height || x2 > width || y2 > height) continue;
    ctx.strokeStyle = "rgba(96,165,250,0.15)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - cellH * 0.5, x2, y2);
    ctx.stroke();
  }
  drawMono(
    ctx,
    `${twins.length} twin pairs \u2264 ${maxN}`,
    12,
    20,
    12,
    "rgba(96,165,250,0.8)",
  );
  drawLabel(ctx, "p, p+2 both prime \u2014 infinitely many?", 12, height - 14);
}

function drawAbc(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
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
    {
      label: "rad",
      value: radical,
      x: width * 0.7,
      color: "rgba(245,245,245,0.54)",
    },
  ];

  drawMono(
    ctx,
    `${a} + ${b} = ${c}`,
    width * 0.18,
    height * 0.18,
    14,
    "rgba(245,245,245,0.76)",
  );
  drawMono(
    ctx,
    "rad(abc) = 2 * 3 * 5 = 30",
    width * 0.18,
    height * 0.26,
    11,
    "rgba(245,245,245,0.48)",
  );
  drawMono(
    ctx,
    "c much larger than radical",
    width * 0.18,
    height * 0.34,
    10,
    "rgba(96,165,250,0.66)",
  );

  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.beginPath();
  ctx.moveTo(width * 0.12, baseY);
  ctx.lineTo(width * 0.86, baseY);
  ctx.stroke();

  items.forEach((item) => {
    const h = (item.value / max) * height * 0.42;
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, baseY - h, barW, h);
    drawMono(
      ctx,
      item.label,
      item.x + 2,
      baseY + 18,
      10,
      "rgba(245,245,245,0.5)",
    );
    drawMono(
      ctx,
      `${item.value}`,
      item.x + 2,
      baseY - h - 7,
      10,
      "rgba(245,245,245,0.58)",
    );
  });

  const pulse = 0.45 + Math.sin(time * 2) * 0.18;
  ctx.strokeStyle = `rgba(96,165,250,${pulse})`;
  ctx.beginPath();
  ctx.moveTo(width * 0.7 + barW * 0.5, baseY - (radical / max) * height * 0.42);
  ctx.lineTo(width * 0.5 + barW * 0.5, baseY - (c / max) * height * 0.42);
  ctx.stroke();
  drawLabel(ctx, "a + b = c, compare c with rad(abc)", 16, height - 18);
}

function drawContinuum(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const depth = pointer.active
    ? Math.floor(pointer.x * 6) + 2
    : Math.floor(4 + Math.sin(time * 0.15) * 2);
  const margin = width * 0.08;
  const barH = (height - 60) / (depth + 3);
  function drawCantor(level: number, x0: number, x1: number, y: number) {
    if (level >= depth) return;
    const third = (x1 - x0) / 3;
    ctx.fillStyle = `rgba(96,165,250,${0.15 + level * 0.08})`;
    ctx.fillRect(x0, y, x1 - x0, barH * 0.6);
    if (isCardPreviewCanvas(ctx)) {
      ctx.clearRect(x0 + third, y, third, barH * 0.6);
    } else {
      ctx.fillStyle = DEFAULT_BG;
      ctx.fillRect(x0 + third, y, third, barH * 0.6);
    }
    drawCantor(level + 1, x0, x0 + third, y + barH);
    drawCantor(level + 1, x0 + 2 * third, x1, y + barH);
  }
  ctx.fillStyle = "rgba(245,245,245,0.2)";
  ctx.fillRect(margin, 20, width - 2 * margin, barH * 0.6);
  drawMono(
    ctx,
    "\u2135\u2080",
    width - margin + 8,
    20 + barH * 0.35,
    11,
    "rgba(245,245,245,0.5)",
  );
  drawCantor(0, margin, width - margin, 20 + barH);
  const bottomY = height - 35;
  ctx.strokeStyle = "rgba(245,245,245,0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, bottomY);
  ctx.lineTo(width - margin, bottomY);
  ctx.stroke();
  const qx = width / 2,
    qy = bottomY - 20;
  const glow = ctx.createRadialGradient(qx, qy, 0, qx, qy, 18);
  glow.addColorStop(0, "rgba(96,165,250,0.35)");
  glow.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(qx - 18, qy - 18, 36, 36);
  drawMono(
    ctx,
    "2^\u2135\u2080 = \u2135\u2081 ?",
    qx - 30,
    qy - 22,
    12,
    "rgba(96,165,250,0.8)",
  );
  drawLabel(ctx, `Cantor set \u2014 depth ${depth}`, 12, height - 14);
}

function drawPoincare(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.3;
  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.6 : 0.35;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.5 : time * 0.18;
  const cosX = Math.cos(tiltX),
    sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY),
    sinY = Math.sin(rotY);
  const deform = 0.15 * Math.sin(time * 0.4);
  const project = (theta: number, phi: number): [number, number, number] => {
    const r = R * (1 + deform * (Math.sin(3 * theta) * Math.cos(2 * phi)));
    const px = r * Math.sin(theta) * Math.cos(phi);
    const py = r * Math.sin(theta) * Math.sin(phi);
    const pz = r * Math.cos(theta);
    const x1 = px * cosY + pz * sinY;
    const z1 = -px * sinY + pz * cosY;
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    return [cx + x1, cy + y1, z2];
  };
  const meshAlpha = isCardPreviewCanvas(ctx) ? 0.14 : 0.125;
  for (let i = 1; i < 12; i++) {
    const theta = (i / 12) * Math.PI;
    ctx.beginPath();
    for (let j = 0; j <= 48; j++) {
      const phi = (j / 48) * Math.PI * 2;
      const [px, py] = project(theta, phi);
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(245,245,245,${meshAlpha})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }
  for (let j = 0; j < 18; j++) {
    const phi = (j / 18) * Math.PI * 2;
    ctx.beginPath();
    for (let i = 0; i <= 36; i++) {
      const theta = (i / 36) * Math.PI;
      const [px, py] = project(theta, phi);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(245,245,245,${meshAlpha})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }
  ctx.save();
  ctx.shadowColor = "rgba(96,165,250,0.28)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let j = 0; j <= 72; j++) {
    const phi = (j / 72) * Math.PI * 2;
    const [px, py] = project(Math.PI / 2, phi);
    if (j === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "rgba(96,165,250,0.38)";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();
  for (let i = 0; i < 40; i++) {
    const theta = seeded(i) * Math.PI * 0.8 + 0.1 * Math.PI;
    const phi = seeded(i + 100) * Math.PI * 2;
    const [px, py, pz] = project(theta, phi);
    if (pz < -R * 0.28) continue;
    const alpha = 0.42 + Math.max(0, pz / R) * 0.48;
    const inward = -deform * 3 * Math.sin(3 * theta) * Math.cos(2 * phi);
    const arrowLen = Math.abs(inward) * 10 + 4;
    const nx = (px - cx) / R,
      ny = (py - cy) / R;
    const dir = inward > 0 ? -1 : 1;
    const ex = px + dir * nx * arrowLen,
      ey = py + dir * ny * arrowLen;
    ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.fillStyle = `rgba(96,165,250,${Math.min(0.75, alpha + 0.12)})`;
    ctx.beginPath();
    ctx.arc(ex, ey, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  drawLabel(
    ctx,
    "Ricci flow: \u2202g/\u2202t = -2R\u1d62\u2c7c \u2192 S\xb3",
    12,
    height - 14,
  );
}

function drawKakeya2D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.036);

  const cx = width * 0.5;
  const cy = height * 0.52;
  const scale = Math.min(width, height);
  const compression = 0.24 + (pointer.active ? pointer.x : 0.42) * 0.18;
  const activeAngle = pointer.active
    ? pointer.y * Math.PI
    : (time * 0.22) % Math.PI;

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
    const hot =
      Math.abs(
        Math.atan2(
          Math.sin(angle - activeAngle),
          Math.cos(angle - activeAngle),
        ),
      ) < 0.035;

    ctx.beginPath();
    ctx.moveTo(px - dx, py - dy);
    ctx.lineTo(px + dx, py + dy);
    ctx.strokeStyle = hot
      ? "rgba(245,245,245,0.95)"
      : `rgba(245,245,245,${0.1 + seeded(i) * 0.24})`;
    ctx.lineWidth = hot ? 1.9 : 1;
    ctx.stroke();
  }

  const needleX = Math.cos(activeAngle) * scale * 0.12;
  const needleY =
    Math.sin(activeAngle) * scale * compression * 0.36 - scale * 0.02;
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

  drawMono(
    ctx,
    "area -> 0",
    width * 0.14,
    height * 0.84,
    12,
    "rgba(245,245,245,0.46)",
  );
  drawMono(
    ctx,
    "dim = 2",
    width * 0.72,
    height * 0.84,
    12,
    "rgba(96,165,250,0.72)",
  );
}

function drawFourColor(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const colors = [
    "rgba(96,165,250,0.34)",
    "rgba(34,197,94,0.28)",
    "rgba(249,115,22,0.3)",
    "rgba(245,245,245,0.25)",
  ];
  const cells = [
    [
      [0.05, 0.12],
      [0.28, 0.08],
      [0.34, 0.28],
      [0.19, 0.42],
      [0.06, 0.33],
    ],
    [
      [0.28, 0.08],
      [0.52, 0.1],
      [0.5, 0.32],
      [0.34, 0.28],
    ],
    [
      [0.52, 0.1],
      [0.82, 0.08],
      [0.92, 0.26],
      [0.73, 0.38],
      [0.5, 0.32],
    ],
    [
      [0.06, 0.33],
      [0.19, 0.42],
      [0.23, 0.63],
      [0.05, 0.75],
    ],
    [
      [0.19, 0.42],
      [0.34, 0.28],
      [0.5, 0.32],
      [0.47, 0.56],
      [0.23, 0.63],
    ],
    [
      [0.5, 0.32],
      [0.73, 0.38],
      [0.68, 0.62],
      [0.47, 0.56],
    ],
    [
      [0.73, 0.38],
      [0.92, 0.26],
      [0.9, 0.62],
      [0.68, 0.62],
    ],
    [
      [0.05, 0.75],
      [0.23, 0.63],
      [0.38, 0.84],
      [0.18, 0.92],
    ],
    [
      [0.23, 0.63],
      [0.47, 0.56],
      [0.57, 0.82],
      [0.38, 0.84],
    ],
    [
      [0.47, 0.56],
      [0.68, 0.62],
      [0.78, 0.9],
      [0.57, 0.82],
    ],
    [
      [0.68, 0.62],
      [0.9, 0.62],
      [0.93, 0.9],
      [0.78, 0.9],
    ],
  ];
  const hot = pointer.active
    ? Math.floor(pointer.x * cells.length) % cells.length
    : Math.floor((time * 1.1) % cells.length);
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
    ctx.strokeStyle =
      i === hot ? "rgba(245,245,245,0.72)" : "rgba(245,245,245,0.18)";
    ctx.lineWidth = i === hot ? 1.8 : 1;
    ctx.stroke();
  });
}

function drawSpherePacking(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const r = Math.min(width, height) * 0.045;
  const dx = r * 2;
  const dy = r * Math.sqrt(3);
  const rows = 8;
  const cols = 10;
  const rowStepY = dy * 0.58;
  const sphereRadius = r * 0.92;
  const layers = pointer.active
    ? Math.floor(pointer.y * 3) + 1
    : Math.min(2, Math.floor(2 + Math.sin(time * 0.15)));
  const layerColors = [
    "rgba(96,165,250,",
    "rgba(34,197,94,",
    "rgba(249,115,22,",
  ];
  const offsetY = pointer.active
    ? (pointer.x - 0.5) * r * 2
    : Math.sin(time * 0.2) * r * 0.5;

  const layoutLayerCount = 2;
  const layoutLayerOffsets = Array.from(
    { length: layoutLayerCount + 1 },
    (_, layer) => layer * dy * 0.6 + offsetY * layer,
  );
  const minLayerY = Math.min(0, ...layoutLayerOffsets);
  const maxLayerY = Math.max(0, ...layoutLayerOffsets);
  const minCenterX = 0;
  const maxCenterX = (cols - 1) * dx + r + r;
  const minCenterY = minLayerY;
  const maxCenterY = (rows - 1) * rowStepY + maxLayerY;
  const visualWidth = maxCenterX - minCenterX + sphereRadius * 2;
  const visualHeight = maxCenterY - minCenterY + sphereRadius * 2;
  const originX = (width - visualWidth) * 0.5 + sphereRadius - minCenterX;
  const originY = (height - visualHeight) * 0.5 + sphereRadius - minCenterY;

  for (let layer = 0; layer <= Math.min(layers, 2); layer++) {
    const lox = layer === 1 ? r : layer === 2 ? r * 0.5 : 0;
    const loy = layer * dy * 0.6 + offsetY * layer;
    const color = layerColors[layer];
    for (let row = 0; row < rows; row++) {
      const rowOff = (row % 2) * r;
      for (let col = 0; col < cols; col++) {
        const x = originX + col * dx + rowOff + lox;
        const y = originY + row * rowStepY + loy;
        if (x < -r || x > width + r || y < -r || y > height + r) continue;
        const alpha = 0.1 + (1 - layer * 0.25) * 0.3;
        const grad = ctx.createRadialGradient(
          x - r * 0.25,
          y - r * 0.25,
          r * 0.1,
          x,
          y,
          r,
        );
        grad.addColorStop(0, color + (alpha + 0.2) + ")");
        grad.addColorStop(0.7, color + alpha + ")");
        grad.addColorStop(1, color + "0.02)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, sphereRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = color + alpha * 0.5 + ")";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, sphereRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
  drawMono(
    ctx,
    "\u03c0/\u221a18 \u2248 0.7405",
    width - 130,
    20,
    12,
    "rgba(96,165,250,0.8)",
  );
  drawLabel(ctx, "FCC packing \u2014 densest in R\xb3", 12, height - 14);
}

function drawTSP(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const n = 25;
  const margin = 40;
  const cities: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    cities.push([
      margin + seeded(i) * (width - 2 * margin),
      margin + seeded(i + 100) * (height - 2 * margin),
    ]);
  }
  const visited = new Set<number>();
  const tour: number[] = [0];
  visited.add(0);
  while (tour.length < n) {
    const last = tour[tour.length - 1];
    let bestD = Infinity,
      bestJ = 0;
    for (let j = 0; j < n; j++) {
      if (visited.has(j)) continue;
      const ddx = cities[j][0] - cities[last][0],
        ddy = cities[j][1] - cities[last][1];
      const d = ddx * ddx + ddy * ddy;
      if (d < bestD) {
        bestD = d;
        bestJ = j;
      }
    }
    tour.push(bestJ);
    visited.add(bestJ);
  }
  tour.push(0);
  const progress = pointer.active
    ? pointer.x * tour.length
    : (time * 2) % (tour.length + 5);
  const edgesShown = Math.min(tour.length - 1, Math.floor(progress));
  for (let e = 0; e < edgesShown; e++) {
    const [x1, y1] = cities[tour[e]];
    const [x2, y2] = cities[tour[e + 1]];
    ctx.strokeStyle = `rgba(96,165,250,${0.15 + (e / tour.length) * 0.4})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  for (let i = 0; i < n; i++) {
    const [x, y] = cities[i];
    const inTour = tour.indexOf(i) < edgesShown + 1;
    ctx.beginPath();
    ctx.arc(x, y, inTour ? 4 : 2.5, 0, Math.PI * 2);
    ctx.fillStyle = inTour ? "rgba(96,165,250,0.9)" : "rgba(245,245,245,0.3)";
    ctx.fill();
  }
  drawLabel(ctx, `${n} cities \u2014 nearest-neighbor tour`, 12, height - 14);
}

function drawAperiodicTiling(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  const scale = pointer.active
    ? 20 + pointer.x * 30
    : 28 + Math.sin(time * 0.1) * 5;
  const rot = pointer.active ? pointer.y * 0.3 : time * 0.02;
  const cosR = Math.cos(rot),
    sinR = Math.sin(rot);
  const cx = width / 2,
    cy = height / 2;
  const pts: { x: number; y: number; type: number }[] = [];
  for (let i = -20; i < 20; i++) {
    for (let j = -20; j < 20; j++) {
      const type = (Math.abs(i) + Math.abs(j)) % 3;
      const oox = i * scale * 0.87 + j * scale * 0.5 * Math.cos(Math.PI / 5);
      const ooy = j * scale * 0.87 + i * scale * 0.12 * Math.sin(Math.PI / 3);
      const rx = oox * cosR - ooy * sinR + cx;
      const ry = oox * sinR + ooy * cosR + cy;
      if (
        rx < -scale * 2 ||
        rx > width + scale * 2 ||
        ry < -scale * 2 ||
        ry > height + scale * 2
      )
        continue;
      pts.push({ x: rx, y: ry, type });
    }
  }
  for (const p of pts) {
    const s = scale * 0.42;
    const angles =
      p.type === 0
        ? [0, 1.2, 2.4, 3.6]
        : p.type === 1
          ? [0.6, 1.8, 3.0, 4.2]
          : [0.3, 1.5, 2.7, 3.9];
    ctx.beginPath();
    for (let k = 0; k < 4; k++) {
      const a = angles[k] + rot;
      const kx = p.x + Math.cos(a) * s;
      const ky = p.y + Math.sin(a) * s;
      if (k === 0) ctx.moveTo(kx, ky);
      else ctx.lineTo(kx, ky);
    }
    ctx.closePath();
    const colors = [
      "rgba(96,165,250,0.08)",
      "rgba(34,197,94,0.06)",
      "rgba(249,115,22,0.05)",
    ];
    ctx.fillStyle = colors[p.type];
    ctx.fill();
    ctx.strokeStyle = `rgba(245,245,245,${0.08 + p.type * 0.03})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  drawLabel(
    ctx,
    "aperiodic tiling \u2014 no translational symmetry",
    12,
    height - 14,
  );
}

function drawMandelbrot(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  const centerX = pointer.active
    ? -0.5 + (pointer.x - 0.5) * 2
    : -0.5 + Math.sin(time * 0.05) * 0.3;
  const centerY = pointer.active
    ? (pointer.y - 0.5) * 1.5
    : Math.cos(time * 0.07) * 0.2;
  const zoom = 1.5;
  const maxIter = 80;
  const step = 3;
  for (let px = 0; px < width; px += step) {
    for (let py = 0; py < height; py += step) {
      const x0 = centerX + (px / width - 0.5) * zoom * (width / height) * 2;
      const y0 = centerY + (py / height - 0.5) * zoom * 2;
      let x = 0,
        y = 0,
        iter = 0;
      while (x * x + y * y <= 4 && iter < maxIter) {
        const xn = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xn;
        iter++;
      }
      if (iter === maxIter) {
        ctx.fillStyle = "rgba(96,165,250,0.08)";
      } else {
        const t = iter / maxIter;
        const r = Math.floor(t * 40);
        const g = Math.floor(t * 80 + 60);
        const b = Math.floor(200 + t * 55);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.3 + t * 0.5})`;
      }
      ctx.fillRect(px, py, step, step);
    }
  }
  drawLabel(ctx, "M = {c : z\xb2 + c stays bounded}", 12, height - 14);
}

function drawSquarePeg(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.32;
  const deform = pointer.active
    ? pointer.x * 0.4
    : 0.2 + Math.sin(time * 0.2) * 0.1;
  const N = 120;
  const curve: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r =
      R *
      (1 +
        deform * Math.sin(3 * t + time * 0.3) +
        deform * 0.5 * Math.cos(5 * t - time * 0.2));
    curve.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  ctx.strokeStyle = "rgba(245,245,245,0.3)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  curve.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.stroke();
  const idx = [
    0,
    Math.floor(N * 0.25),
    Math.floor(N * 0.5),
    Math.floor(N * 0.75),
  ];
  const sq = idx.map((i) => curve[i]);
  ctx.strokeStyle = "rgba(96,165,250,0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  sq.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.stroke();
  for (const [x, y] of sq) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(96,165,250,0.9)";
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(96,165,250,0.15)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(sq[0][0], sq[0][1]);
  ctx.lineTo(sq[2][0], sq[2][1]);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sq[1][0], sq[1][1]);
  ctx.lineTo(sq[3][0], sq[3][1]);
  ctx.stroke();
  drawLabel(ctx, "every Jordan curve inscribes a square?", 12, height - 14);
}

function drawHadwigerNelson(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const r = Math.min(width, height) * 0.24;
  const nodes = [
    [0, 0],
    [1, 0],
    [0.5, 0.86],
    [-0.5, 0.86],
    [-1, 0],
    [-0.5, -0.86],
    [0.5, -0.86],
    [1.5, 0.86],
    [1.5, -0.86],
    [-1.5, 0.86],
    [-1.5, -0.86],
  ].map(([x, y]) => ({ x: cx + x * r * 0.72, y: cy + y * r * 0.72 }));
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 2],
    [1, 6],
    [2, 3],
    [4, 3],
    [4, 5],
    [5, 6],
    [2, 7],
    [1, 7],
    [6, 8],
    [1, 8],
    [3, 9],
    [4, 9],
    [5, 10],
    [4, 10],
  ];
  ctx.strokeStyle = "rgba(245,245,245,0.18)";
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });
  const palette = ["#60a5fa", "#86efac", "#fdba74", "#d4d4d4", "#f87171"];
  nodes.forEach((node, i) => {
    const hot =
      pointer.active &&
      Math.hypot(pointer.x * width - node.x, pointer.y * height - node.y) < 26;
    ctx.beginPath();
    ctx.arc(node.x, node.y, hot ? 7 : 5, 0, Math.PI * 2);
    ctx.fillStyle = palette[(i + Math.floor(time * 0.5)) % palette.length];
    ctx.globalAlpha = hot ? 0.95 : 0.72;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function drawPlateau(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.32;
  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.6 : 0.3;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.5 : time * 0.15;
  const cosX = Math.cos(tiltX),
    sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY),
    sinY = Math.sin(rotY);
  const project = (
    x: number,
    y: number,
    z: number,
  ): [number, number, number] => {
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    return [cx + x1, cy + y1, z2];
  };
  const boundary: [number, number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * Math.PI * 2;
    const bx = R * (Math.sin(t) + 2 * Math.sin(2 * t)) * 0.35;
    const by = R * (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.35;
    const bz = R * -Math.sin(3 * t) * 0.2;
    boundary.push(project(bx, by, bz));
  }
  const gridN = 20;
  for (let i = 0; i <= gridN; i++) {
    const u = (i / gridN) * Math.PI * 2;
    ctx.beginPath();
    for (let j = 0; j <= gridN; j++) {
      const v = j / gridN;
      const r = R * 0.35 * (1 - 0.3 * v);
      const sx = r * (Math.sin(u) + 2 * v * Math.sin(2 * u));
      const sy = r * (Math.cos(u) - 2 * v * Math.cos(2 * u));
      const sz = R * 0.2 * v * Math.sin(3 * u + time * 0.3);
      const [px, py, pz] = project(sx, sy, sz);
      const alpha = 0.03 + Math.max(0, pz / R) * 0.1;
      ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.lineWidth = 0.4;
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(245,245,245,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  boundary.forEach(([x, y], i) =>
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
  );
  ctx.stroke();
  drawLabel(
    ctx,
    "H = 0 \u2014 minimal surface spanning boundary",
    12,
    height - 14,
  );
}

function drawKissingNumber(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.14;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 2 : time * 0.2;
  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.5 : 0.3;
  const cosX = Math.cos(tiltX),
    sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY),
    sinY = Math.sin(rotY);
  const cGrad = ctx.createRadialGradient(
    cx - R * 0.2,
    cy - R * 0.2,
    R * 0.1,
    cx,
    cy,
    R,
  );
  cGrad.addColorStop(0, "rgba(245,245,245,0.15)");
  cGrad.addColorStop(1, "rgba(245,245,245,0.03)");
  ctx.fillStyle = cGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(245,245,245,0.2)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  const golden = (1 + Math.sqrt(5)) / 2;
  const positions: [number, number, number][] = [];
  for (const [a, b, c] of [
    [0, 1, golden],
    [0, 1, -golden],
    [0, -1, golden],
    [0, -1, -golden],
    [1, golden, 0],
    [1, -golden, 0],
    [-1, golden, 0],
    [-1, -golden, 0],
    [golden, 0, 1],
    [golden, 0, -1],
    [-golden, 0, 1],
    [-golden, 0, -1],
  ] as const) {
    const len = Math.sqrt(a * a + b * b + c * c);
    positions.push([a / len, b / len, c / len]);
  }
  const spheres: { sx: number; sy: number; depth: number }[] = [];
  for (const [px, py, pz] of positions) {
    const x1 = px * cosY + pz * sinY;
    const z1 = -px * sinY + pz * cosY;
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    spheres.push({ sx: cx + x1 * R * 2, sy: cy + y1 * R * 2, depth: z2 });
  }
  spheres.sort((a, b) => a.depth - b.depth);
  for (const { sx, sy, depth } of spheres) {
    const alpha = 0.08 + Math.max(0, depth) * 0.25;
    const grad = ctx.createRadialGradient(
      sx - R * 0.15,
      sy - R * 0.15,
      R * 0.05,
      sx,
      sy,
      R,
    );
    grad.addColorStop(0, `rgba(96,165,250,${alpha + 0.1})`);
    grad.addColorStop(1, `rgba(96,165,250,${alpha * 0.3})`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(sx, sy, R * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(96,165,250,${alpha * 0.6})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(sx, sy, R * 0.85, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawMono(ctx, "\u03c4(3) = 12", width - 100, 20, 12, "rgba(96,165,250,0.8)");
  drawLabel(ctx, "12 spheres touch the central sphere", 12, height - 14);
}

function drawSteinerTree(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.026);
  const pts = [
    { x: width * 0.18, y: height * 0.24 },
    { x: width * 0.78, y: height * 0.2 },
    { x: width * 0.84, y: height * 0.72 },
    { x: width * 0.28, y: height * 0.82 },
    { x: width * 0.46, y: height * 0.46 },
  ];
  const s1 = {
    x: pointer.active
      ? pointer.x * width
      : width * (0.45 + Math.sin(time * 0.7) * 0.03),
    y: height * 0.42,
  };
  const s2 = {
    x: width * 0.56,
    y: pointer.active
      ? pointer.y * height
      : height * (0.62 + Math.cos(time * 0.8) * 0.03),
  };
  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  pts.forEach((p, i) =>
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
  );
  ctx.stroke();
  ctx.strokeStyle = "rgba(96,165,250,0.62)";
  ctx.lineWidth = 2;
  [
    [pts[0], s1],
    [pts[1], s1],
    [s1, s2],
    [s2, pts[2]],
    [s2, pts[3]],
    [s1, pts[4]],
  ].forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
  [...pts, s1, s2].forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, i >= pts.length ? 3.4 : 4.2, 0, Math.PI * 2);
    ctx.fillStyle =
      i >= pts.length ? "rgba(96,165,250,0.95)" : "rgba(245,245,245,0.7)";
    ctx.fill();
  });
}

function drawIsoperimetric(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.28;
  const morph = pointer.active ? pointer.x : 0.5 + 0.5 * Math.sin(time * 0.25);
  const N = 80;
  const shape: [number, number][] = [];
  let perimeter = 0;
  let area = 0;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const polyR =
      R *
      (1 +
        (1 - morph) *
          (0.3 * Math.sin(3 * t) +
            0.2 * Math.cos(5 * t) +
            0.15 * Math.sin(7 * t)));
    shape.push([cx + polyR * Math.cos(t), cy + polyR * Math.sin(t)]);
  }
  for (let i = 0; i < N; i++) {
    const [x1, y1] = shape[i];
    const [x2, y2] = shape[(i + 1) % N];
    perimeter += Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    area += x1 * y2 - x2 * y1;
  }
  area = Math.abs(area) / 2;
  const ratio = (4 * Math.PI * area) / (perimeter * perimeter);
  ctx.fillStyle = `rgba(96,165,250,${0.05 + ratio * 0.08})`;
  ctx.beginPath();
  shape.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(245,245,245,0.35)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  shape.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.stroke();
  const idealR = perimeter / (2 * Math.PI);
  ctx.strokeStyle = "rgba(96,165,250,0.2)";
  ctx.lineWidth = 0.8;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(cx, cy, idealR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  drawMono(
    ctx,
    `4\u03c0A/L\xb2 = ${ratio.toFixed(3)}`,
    12,
    22,
    12,
    "rgba(96,165,250,0.8)",
  );
  drawMono(
    ctx,
    morph > 0.95 ? "= 1 (circle)" : "< 1",
    180,
    22,
    12,
    "rgba(96,165,250,0.6)",
  );
  drawLabel(
    ctx,
    "L\xb2 \u2265 4\u03c0A \u2014 equality iff circle",
    12,
    height - 14,
  );
}

function drawHoneycomb(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  const s = pointer.active
    ? 15 + pointer.x * 30
    : 22 + Math.sin(time * 0.15) * 4;
  const h = s * Math.sqrt(3);
  const morph = pointer.active ? pointer.y : 0.5 + 0.5 * Math.sin(time * 0.2);
  for (let row = -1; row < height / (h * 0.75) + 1; row++) {
    for (let col = -1; col < width / (s * 3) + 1; col++) {
      const hcx = col * s * 3 + (row % 2) * s * 1.5;
      const hcy = row * h * 0.75;
      const n = morph > 0.5 ? 6 : 4;
      const cellRot = n === 4 ? Math.PI / 4 : Math.PI / 6;
      const r = n === 6 ? s : s * 0.85;
      ctx.beginPath();
      for (let k = 0; k <= n; k++) {
        const angle = (k / n) * Math.PI * 2 + cellRot;
        const px = hcx + r * Math.cos(angle);
        const py = hcy + r * Math.sin(angle);
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const ddx = hcx - width / 2,
        ddy = hcy - height / 2;
      const dist =
        Math.sqrt(ddx * ddx + ddy * ddy) / (Math.max(width, height) * 0.5);
      ctx.fillStyle = `rgba(96,165,250,${Math.max(0.02, 0.06 - dist * 0.04)})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(245,245,245,${Math.max(0.05, 0.15 - dist * 0.08)})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }
  drawMono(
    ctx,
    morph > 0.5 ? "hexagons \u2014 optimal" : "squares \u2014 suboptimal",
    12,
    22,
    12,
    morph > 0.5 ? "rgba(96,165,250,0.8)" : "rgba(249,115,22,0.8)",
  );
  drawLabel(
    ctx,
    "P\xb2/A \u2265 8\u221a3 \u2014 honeycomb minimizes perimeter",
    12,
    height - 14,
  );
}

function drawBrouwer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.024);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const R = Math.min(width, height) * 0.35;

  const twist = pointer.active ? (pointer.x - 0.5) * 2.5 : 0.8;
  const contract = pointer.active
    ? 0.35 + pointer.y * 0.45
    : 0.55 + Math.sin(time * 0.25) * 0.15;
  const offX = Math.cos(time * 0.3) * R * 0.15;
  const offY = Math.sin(time * 0.3) * R * 0.15;

  const mapF = (px: number, py: number): [number, number] => {
    const dx = px - cx;
    const dy = py - cy;
    const rr = Math.hypot(dx, dy) / R;
    const a = Math.atan2(dy, dx);
    const newR = rr * contract;
    const newA = a + twist * (1 - rr * 0.3);
    return [
      cx + offX + Math.cos(newA) * newR * R,
      cy + offY + Math.sin(newA) * newR * R,
    ];
  };

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grd.addColorStop(0, "rgba(96,165,250,0.06)");
  grd.addColorStop(0.8, "rgba(96,165,250,0.025)");
  grd.addColorStop(1, "rgba(96,165,250,0.01)");
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.strokeStyle = "rgba(245,245,245,0.22)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  const gridN = 9;
  ctx.lineWidth = 0.6;
  for (let i = 0; i <= gridN; i++) {
    const t = (i / gridN) * 2 - 1;
    ctx.beginPath();
    let started = false;
    for (let j = 0; j <= 40; j++) {
      const s = (j / 40) * 2 - 1;
      if (t * t + s * s > 1) {
        started = false;
        continue;
      }
      const [mx, my] = mapF(cx + t * R, cy + s * R);
      if (!started) {
        ctx.moveTo(mx, my);
        started = true;
      } else ctx.lineTo(mx, my);
    }
    ctx.strokeStyle = "rgba(96,165,250,0.12)";
    ctx.stroke();
    ctx.beginPath();
    started = false;
    for (let j = 0; j <= 40; j++) {
      const s = (j / 40) * 2 - 1;
      if (s * s + t * t > 1) {
        started = false;
        continue;
      }
      const [mx, my] = mapF(cx + s * R, cy + t * R);
      if (!started) {
        ctx.moveTo(mx, my);
        started = true;
      } else ctx.lineTo(mx, my);
    }
    ctx.strokeStyle = "rgba(96,165,250,0.12)";
    ctx.stroke();
  }

  const nRings = 4;
  const nPts = 12;
  for (let ring = 1; ring <= nRings; ring++) {
    const rFrac = ring / nRings;
    for (let j = 0; j < nPts; j++) {
      const a = (j / nPts) * Math.PI * 2 + ring * 0.3;
      const px = cx + Math.cos(a) * rFrac * R * 0.9;
      const py = cy + Math.sin(a) * rFrac * R * 0.9;
      const [fx, fy] = mapF(px, py);

      const dx = fx - px;
      const dy = fy - py;
      const len = Math.hypot(dx, dy);
      if (len < 1) continue;
      const nx = dx / len;
      const ny = dy / len;

      ctx.strokeStyle = `rgba(245,245,245,${0.15 + (1 - rFrac) * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(fx, fy);
      ctx.stroke();

      const hs = Math.min(5, len * 0.3);
      ctx.fillStyle = `rgba(245,245,245,${0.2 + (1 - rFrac) * 0.25})`;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx - nx * hs + ny * hs * 0.4, fy - ny * hs - nx * hs * 0.4);
      ctx.lineTo(fx - nx * hs - ny * hs * 0.4, fy - ny * hs + nx * hs * 0.4);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,245,245,${0.2 + (1 - rFrac) * 0.15})`;
      ctx.fill();
    }
  }

  let fpx = cx;
  let fpy = cy;
  for (let iter = 0; iter < 30; iter++) {
    const [nx, ny] = mapF(fpx, fpy);
    if (Math.hypot(nx - fpx, ny - fpy) < 0.01) break;
    fpx = nx;
    fpy = ny;
  }

  const glow = ctx.createRadialGradient(fpx, fpy, 0, fpx, fpy, 16);
  glow.addColorStop(0, "rgba(96,165,250,0.45)");
  glow.addColorStop(1, "rgba(96,165,250,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(fpx - 16, fpy - 16, 32, 32);
  ctx.beginPath();
  ctx.arc(fpx, fpy, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(96,165,250,0.95)";
  ctx.fill();

  drawMono(ctx, "f(x₀) = x₀", fpx + 12, fpy - 8, 10, "rgba(96,165,250,0.8)");
}

function drawBorsukUlam(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.3;
  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.6 : 0.35;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.5 : time * 0.18;
  const cosX = Math.cos(tiltX),
    sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY),
    sinY = Math.sin(rotY);
  const project = (
    px: number,
    py: number,
    pz: number,
  ): [number, number, number] => {
    const x1 = px * cosY + pz * sinY;
    const z1 = -px * sinY + pz * cosY;
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    return [cx + x1 * R, cy + y1 * R, z2];
  };
  for (let i = 1; i < 10; i++) {
    const theta = (i / 10) * Math.PI;
    ctx.beginPath();
    for (let j = 0; j <= 40; j++) {
      const phi = (j / 40) * Math.PI * 2;
      const [spx, spy, spz] = project(
        Math.sin(theta) * Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(theta),
      );
      const alpha = 0.03 + Math.max(0, spz) * 0.1;
      ctx.strokeStyle = `rgba(245,245,245,${alpha})`;
      if (j === 0) ctx.moveTo(spx, spy);
      else ctx.lineTo(spx, spy);
    }
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
  const pairs = 5;
  const colors = [
    "96,165,250",
    "34,197,94",
    "249,115,22",
    "168,85,247",
    "245,158,11",
  ];
  for (let k = 0; k < pairs; k++) {
    const theta = seeded(k * 3) * Math.PI * 0.7 + 0.15 * Math.PI;
    const phi = seeded(k * 3 + 1) * Math.PI * 2;
    const sx = Math.sin(theta) * Math.cos(phi),
      sy = Math.sin(theta) * Math.sin(phi),
      sz = Math.cos(theta);
    const [x1, y1, z1] = project(sx, sy, sz);
    const [x2, y2, z2] = project(-sx, -sy, -sz);
    const c = colors[k];
    ctx.strokeStyle = `rgba(${c},0.15)`;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    for (const [ptx, pty, ptz] of [
      [x1, y1, z1],
      [x2, y2, z2],
    ]) {
      const alpha = 0.3 + Math.max(0, ptz as number) * 0.6;
      const glow = ctx.createRadialGradient(ptx, pty, 0, ptx, pty, 10);
      glow.addColorStop(0, `rgba(${c},${alpha * 0.5})`);
      glow.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(ptx - 10, pty - 10, 20, 20);
      ctx.beginPath();
      ctx.arc(ptx, pty, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c},${alpha})`;
      ctx.fill();
    }
  }
  drawMono(ctx, "f(x) = f(-x)", cx - 40, 20, 12, "rgba(96,165,250,0.8)");
  drawLabel(ctx, "antipodal points must map to same value", 12, height - 14);
}

function drawHamSandwich(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.35;
  const offsets: [number, number][] = [
    [-0.35, -0.2],
    [0.3, -0.25],
    [0.0, 0.35],
  ];
  const colors = ["96,165,250", "34,197,94", "249,115,22"];
  const clusters: { pts: [number, number][]; color: string }[] = [];
  for (let c = 0; c < 3; c++) {
    const pts: [number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const angle = seeded(c * 20 + i) * Math.PI * 2;
      const dist = seeded(c * 20 + i + 100) * R * 0.25;
      pts.push([
        cx + offsets[c][0] * R + Math.cos(angle) * dist,
        cy + offsets[c][1] * R + Math.sin(angle) * dist,
      ]);
    }
    clusters.push({ pts, color: colors[c] });
  }
  for (const cluster of clusters) {
    for (const [x, y] of cluster.pts) {
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cluster.color},0.6)`;
      ctx.fill();
    }
  }
  const angle = pointer.active ? (pointer.x - 0.5) * Math.PI : time * 0.15;
  const nx = Math.cos(angle),
    ny = Math.sin(angle);
  const lineLen = Math.max(width, height);
  ctx.strokeStyle = "rgba(245,245,245,0.4)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - ny * lineLen, cy + nx * lineLen);
  ctx.lineTo(cx + ny * lineLen, cy - nx * lineLen);
  ctx.stroke();
  drawMono(ctx, "ham sandwich cut", 12, 22, 12, "rgba(245,245,245,0.7)");
  drawLabel(
    ctx,
    "one hyperplane bisects n measures in R\u207f",
    12,
    height - 14,
  );
}

function drawHairyBall(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const R = Math.min(width, height) * 0.34;

  const tiltX = pointer.active ? (pointer.y - 0.5) * 0.5 : 0.35;
  const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.2 : time * 0.18;
  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);

  const project = (
    px: number,
    py: number,
    pz: number,
  ): [number, number, number] => {
    const x1 = px * cosY + pz * sinY;
    const z1 = -px * sinY + pz * cosY;
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    return [cx + x1 * R, cy + y1 * R, z2];
  };

  const grd = ctx.createRadialGradient(
    cx - R * 0.25,
    cy - R * 0.25,
    R * 0.05,
    cx,
    cy,
    R,
  );
  grd.addColorStop(0, "rgba(245,245,245,0.07)");
  grd.addColorStop(0.7, "rgba(245,245,245,0.025)");
  grd.addColorStop(1, "rgba(245,245,245,0.005)");
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.lineWidth = 0.7;
  const latSteps = 7;
  for (let i = 1; i < latSteps; i++) {
    const theta = (i / latSteps) * Math.PI;
    const st = Math.sin(theta);
    const ct = Math.cos(theta);
    ctx.beginPath();
    let started = false;
    for (let j = 0; j <= 64; j++) {
      const phi = (j / 64) * Math.PI * 2;
      const [sx, sy, sz] = project(st * Math.cos(phi), ct, st * Math.sin(phi));
      const alpha = sz > 0 ? 0.14 : 0.04;
      if (!started) {
        ctx.moveTo(sx, sy);
        started = true;
      } else {
        ctx.strokeStyle = `rgba(245,245,245,${alpha})`;
        ctx.lineTo(sx, sy);
      }
    }
    ctx.stroke();
  }

  const lonSteps = 12;
  for (let i = 0; i < lonSteps; i++) {
    const phi = (i / lonSteps) * Math.PI * 2;
    ctx.beginPath();
    let started = false;
    for (let j = 0; j <= 48; j++) {
      const theta = (j / 48) * Math.PI;
      const [sx, sy, sz] = project(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi),
      );
      const alpha = sz > 0 ? 0.12 : 0.03;
      if (!started) {
        ctx.moveTo(sx, sy);
        started = true;
      } else {
        ctx.strokeStyle = `rgba(245,245,245,${alpha})`;
        ctx.lineTo(sx, sy);
      }
    }
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(245,245,245,0.22)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  type Arrow = {
    sx: number;
    sy: number;
    ex: number;
    ey: number;
    z: number;
    alpha: number;
  };
  const arrows: Arrow[] = [];
  const nLat = 14;
  const nLon = 24;

  for (let i = 1; i < nLat; i++) {
    const theta = (i / nLat) * Math.PI;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const count = Math.max(4, Math.round(nLon * sinT));
    for (let j = 0; j < count; j++) {
      const phi = (j / count) * Math.PI * 2;
      const px = sinT * Math.cos(phi);
      const py = cosT;
      const pz = sinT * Math.sin(phi);

      const ePhi = -Math.sin(phi);
      const ePhiZ = Math.cos(phi);
      const eTheta_x = cosT * Math.cos(phi);
      const eTheta_y = -sinT;
      const eTheta_z = cosT * Math.sin(phi);

      const distPole = Math.min(theta, Math.PI - theta);
      const mag = Math.sin(distPole);
      const wave = Math.sin(time * 0.6 + phi * 2 + theta) * 0.25;
      const vx = (ePhi + eTheta_x * wave) * mag;
      const vy = eTheta_y * wave * mag;
      const vz = (ePhiZ + eTheta_z * wave) * mag;

      const [sx, sy, sz] = project(px, py, pz);
      const scale = R * 0.06;
      const [ex, ey] = project(px + vx * 0.08, py + vy * 0.08, pz + vz * 0.08);
      const dx = ex - sx;
      const dy = ey - sy;
      const dLen = Math.hypot(dx, dy) || 1;
      const normLen = mag * scale;
      const fx = sx + (dx / dLen) * normLen;
      const fy = sy + (dy / dLen) * normLen;

      const facing = sz > -0.15 ? 1 : 0;
      const alpha =
        facing * (0.15 + mag * 0.55) * (0.3 + Math.max(0, sz + 0.15));
      if (alpha > 0.02) {
        arrows.push({ sx, sy, ex: fx, ey: fy, z: sz, alpha });
      }
    }
  }

  arrows.sort((a, b) => a.z - b.z);

  for (const arr of arrows) {
    const dx = arr.ex - arr.sx;
    const dy = arr.ey - arr.sy;
    const len = Math.hypot(dx, dy);
    if (len < 0.5) continue;
    const nx = dx / len;
    const ny = dy / len;

    ctx.strokeStyle = `rgba(245,245,245,${arr.alpha.toFixed(3)})`;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(arr.sx, arr.sy);
    ctx.lineTo(arr.ex, arr.ey);
    ctx.stroke();

    const hs = Math.min(4, len * 0.4);
    ctx.fillStyle = `rgba(245,245,245,${arr.alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(arr.ex, arr.ey);
    ctx.lineTo(
      arr.ex - nx * hs + ny * hs * 0.4,
      arr.ey - ny * hs - nx * hs * 0.4,
    );
    ctx.lineTo(
      arr.ex - nx * hs - ny * hs * 0.4,
      arr.ey - ny * hs + nx * hs * 0.4,
    );
    ctx.closePath();
    ctx.fill();
  }

  const [npx, npy, npz] = project(0, 1, 0);
  const [spx, spy, spz] = project(0, -1, 0);
  const npVisible = npz > -0.1;
  const spVisible = spz > -0.1;

  if (npVisible) {
    const glow = ctx.createRadialGradient(npx, npy, 0, npx, npy, 14);
    glow.addColorStop(0, "rgba(96,165,250,0.4)");
    glow.addColorStop(1, "rgba(96,165,250,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(npx - 14, npy - 14, 28, 28);
    ctx.beginPath();
    ctx.arc(npx, npy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(96,165,250,0.95)";
    ctx.fill();
  }
  if (spVisible) {
    const glow = ctx.createRadialGradient(spx, spy, 0, spx, spy, 14);
    glow.addColorStop(0, "rgba(96,165,250,0.4)");
    glow.addColorStop(1, "rgba(96,165,250,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(spx - 14, spy - 14, 28, 28);
    ctx.beginPath();
    ctx.arc(spx, spy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(96,165,250,0.95)";
    ctx.fill();
  }

  const labelY = cy + R + 24;
  drawMono(
    ctx,
    "v(p) = 0",
    npVisible ? npx + 10 : cx + R * 0.3,
    npVisible ? npy - 12 : labelY,
    10,
    `rgba(96,165,250,${npVisible ? 0.8 : 0.5})`,
  );
}

function drawGaussCircle(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const spacing = Math.min(width, height) * 0.065;
  const radius =
    Math.min(width, height) *
    (pointer.active
      ? 0.18 + pointer.x * 0.22
      : 0.31 + Math.sin(time * 0.3) * 0.03);
  ctx.strokeStyle = "rgba(96,165,250,0.68)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
  for (let x = cx - spacing * 6; x <= cx + spacing * 6; x += spacing) {
    for (let y = cy - spacing * 6; y <= cy + spacing * 6; y += spacing) {
      const d = Math.hypot(x - cx, y - cy);
      const inside = d <= radius;
      const boundary = Math.abs(d - radius) < spacing * 0.55;
      ctx.beginPath();
      ctx.arc(x, y, boundary ? 3 : 2.2, 0, Math.PI * 2);
      ctx.fillStyle = inside
        ? boundary
          ? "rgba(96,165,250,0.85)"
          : "rgba(245,245,245,0.42)"
        : "rgba(245,245,245,0.08)";
      ctx.fill();
    }
  }
}

const SOFA_HALF_PI = Math.PI / 2;
const GERVER_PHI = 0.03917736479008364;
const GERVER_THETA = 0.6813015093827249;
const GERVER_AREA = 2.2195316688719674;
const GERVER_K = [
  { x: -0.21032242207268875, y: 0.25 },
  { x: -0.9191792927715933, y: 0.47240661975080547 },
  { x: -0.6137632294302517, y: 0.8896264790032219 },
  { x: -0.30834716608891, y: 0.47240661975080547 },
  { x: -1.0172040367878146, y: 0.25 },
];
const GERVER_C = {
  a1: 1.2103224220726888,
  a2: -0.25,
  b1: -0.5276245980267846,
  b2: 0.9202583851606376,
  c1: 0.6260455228484659,
  c2: -0.9447508039464308,
  d1: 1.313022761424233,
  d2: -0.5253826704145544,
  e1: 1.2103224220726888,
  e2: 0.25,
};
const SOFA_VIEW_BOUNDS = { minX: -2.72, maxX: 1.34, minY: -2.48, maxY: 1.18 };

function addVec(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

function subVec(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

function dotVec(a: Vec2, b: Vec2) {
  return a.x * b.x + a.y * b.y;
}

function rotateVec(point: Vec2, angle: number): Vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: c * point.x - s * point.y, y: s * point.x + c * point.y };
}

function sofaMu(angle: number): Vec2 {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function sofaNu(angle: number): Vec2 {
  return { x: -Math.sin(angle), y: Math.cos(angle) };
}

function gerverSegment(angle: number) {
  const t = Math.min(SOFA_HALF_PI, Math.max(0, angle));
  if (t < GERVER_PHI) {
    return {
      offset: GERVER_K[0],
      local: {
        x: GERVER_C.a1 * Math.cos(t) + GERVER_C.a2 * Math.sin(t) - 1,
        y: -GERVER_C.a2 * Math.cos(t) + GERVER_C.a1 * Math.sin(t) - 0.5,
      },
      localPrime: {
        x: -GERVER_C.a1 * Math.sin(t) + GERVER_C.a2 * Math.cos(t),
        y: GERVER_C.a2 * Math.sin(t) + GERVER_C.a1 * Math.cos(t),
      },
    };
  }
  if (t < GERVER_THETA) {
    return {
      offset: GERVER_K[1],
      local: {
        x: -0.25 * t * t + GERVER_C.b1 * t + GERVER_C.b2,
        y: 0.5 * t - GERVER_C.b1 - 1,
      },
      localPrime: { x: -0.5 * t + GERVER_C.b1, y: 0.5 },
    };
  }
  if (t < SOFA_HALF_PI - GERVER_THETA) {
    return {
      offset: GERVER_K[2],
      local: { x: GERVER_C.c1 - t, y: GERVER_C.c2 + t },
      localPrime: { x: -1, y: 1 },
    };
  }
  if (t < SOFA_HALF_PI - GERVER_PHI) {
    return {
      offset: GERVER_K[3],
      local: {
        x: -0.5 * t + GERVER_C.d1 - 1,
        y: -0.25 * t * t + GERVER_C.d1 * t + GERVER_C.d2,
      },
      localPrime: { x: -0.5, y: -0.5 * t + GERVER_C.d1 },
    };
  }
  return {
    offset: GERVER_K[4],
    local: {
      x: GERVER_C.e1 * Math.cos(t) + GERVER_C.e2 * Math.sin(t) - 0.5,
      y: -GERVER_C.e2 * Math.cos(t) + GERVER_C.e1 * Math.sin(t) - 1,
    },
    localPrime: {
      x: -GERVER_C.e1 * Math.sin(t) + GERVER_C.e2 * Math.cos(t),
      y: GERVER_C.e2 * Math.sin(t) + GERVER_C.e1 * Math.cos(t),
    },
  };
}

function gerverX(angle: number): Vec2 {
  const segment = gerverSegment(angle);
  return addVec(segment.offset, rotateVec(segment.local, angle));
}

function gerverXPrime(angle: number): Vec2 {
  const segment = gerverSegment(angle);
  return rotateVec(
    addVec({ x: -segment.local.y, y: segment.local.x }, segment.localPrime),
    angle,
  );
}

function gerverContact(angle: number, kind: "A" | "B" | "C" | "D"): Vec2 {
  const x = gerverX(angle);
  const xp = gerverXPrime(angle);
  const mu = sofaMu(angle);
  const nu = sofaNu(angle);
  if (kind === "A")
    return addVec(addVec(x, mu), {
      x: dotVec(xp, mu) * nu.x,
      y: dotVec(xp, mu) * nu.y,
    });
  if (kind === "B")
    return addVec(x, { x: dotVec(xp, mu) * nu.x, y: dotVec(xp, mu) * nu.y });
  if (kind === "C")
    return addVec(addVec(x, nu), {
      x: -dotVec(xp, nu) * mu.x,
      y: -dotVec(xp, nu) * mu.y,
    });
  return addVec(x, { x: -dotVec(xp, nu) * mu.x, y: -dotVec(xp, nu) * mu.y });
}

function sampleSofaCurve(
  fn: (angle: number) => Vec2,
  start: number,
  end: number,
  steps: number,
) {
  return Array.from({ length: steps + 1 }, (_, index) =>
    fn(start + (end - start) * (index / steps)),
  );
}

function buildGerverSofaBoundary() {
  return [
    ...sampleSofaCurve(gerverX, GERVER_PHI, SOFA_HALF_PI - GERVER_PHI, 118),
    ...sampleSofaCurve(
      (angle) => gerverContact(angle, "D"),
      GERVER_THETA,
      0,
      56,
    ),
    ...sampleSofaCurve(
      (angle) => gerverContact(angle, "C"),
      SOFA_HALF_PI,
      GERVER_PHI,
      118,
    ),
    ...sampleSofaCurve(
      (angle) => gerverContact(angle, "A"),
      SOFA_HALF_PI,
      GERVER_PHI,
      118,
    ),
    ...sampleSofaCurve(
      (angle) => gerverContact(angle, "B"),
      SOFA_HALF_PI,
      SOFA_HALF_PI - GERVER_THETA,
      56,
    ),
  ];
}

const GERVER_SOFA_BOUNDARY = buildGerverSofaBoundary();

function gerverContactSet(
  angle: number,
): Array<{ point: Vec2; corner: boolean }> {
  const corner = { point: gerverX(angle), corner: true };
  const wall = (kind: "A" | "B" | "C" | "D") => ({
    point: gerverContact(angle, kind),
    corner: false,
  });
  if (angle < GERVER_PHI) return [wall("A"), wall("C"), wall("D")];
  if (angle <= GERVER_THETA) return [corner, wall("A"), wall("C"), wall("D")];
  if (angle < SOFA_HALF_PI - GERVER_THETA)
    return [corner, wall("A"), wall("C")];
  if (angle <= SOFA_HALF_PI - GERVER_PHI)
    return [corner, wall("A"), wall("B"), wall("C")];
  return [wall("A"), wall("B"), wall("C")];
}

function movingSofaViewport(width: number, height: number) {
  const bounds = SOFA_VIEW_BOUNDS;
  const viewWidth = bounds.maxX - bounds.minX;
  const viewHeight = bounds.maxY - bounds.minY;
  const scale = Math.min(width / viewWidth, height / viewHeight) * 0.9;
  const offsetX = (width - viewWidth * scale) / 2 - bounds.minX * scale;
  const offsetY = (height - viewHeight * scale) / 2 + bounds.maxY * scale;
  return {
    scale,
    toScreen: (point: Vec2): Vec2 => ({
      x: offsetX + point.x * scale,
      y: offsetY - point.y * scale,
    }),
  };
}

function worldFromSofa(point: Vec2, angle: number): Vec2 {
  return rotateVec(subVec(point, gerverX(angle)), -angle);
}

function drawMathPath(
  ctx: CanvasRenderingContext2D,
  points: Vec2[],
  toScreen: (point: Vec2) => Vec2,
  close = false,
) {
  points.forEach((point, index) => {
    const screen = toScreen(point);
    if (index === 0) ctx.moveTo(screen.x, screen.y);
    else ctx.lineTo(screen.x, screen.y);
  });
  if (close) ctx.closePath();
}

function drawMathArc(
  ctx: CanvasRenderingContext2D,
  toScreen: (point: Vec2) => Vec2,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  ctx.beginPath();
  for (let i = 0; i <= 48; i++) {
    const angle = startAngle + (endAngle - startAngle) * (i / 48);
    const screen = toScreen({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
    if (i === 0) ctx.moveTo(screen.x, screen.y);
    else ctx.lineTo(screen.x, screen.y);
  }
  ctx.stroke();
}

function drawMovingSofaHallway(
  ctx: CanvasRenderingContext2D,
  toScreen: (point: Vec2) => Vec2,
  fill = true,
) {
  const xMin = SOFA_VIEW_BOUNDS.minX;
  const yMin = SOFA_VIEW_BOUNDS.minY;
  const hallway = [
    { x: xMin, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: yMin },
    { x: 1, y: yMin },
    { x: 1, y: 1 },
    { x: xMin, y: 1 },
  ];
  ctx.beginPath();
  drawMathPath(ctx, hallway, toScreen, true);
  if (fill) {
    ctx.fillStyle = "rgba(245,245,245,0.052)";
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(245,245,245,0.26)";
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

function drawGerverSofaAt(
  ctx: CanvasRenderingContext2D,
  toScreen: (point: Vec2) => Vec2,
  angle: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
) {
  ctx.beginPath();
  GERVER_SOFA_BOUNDARY.forEach((point, index) => {
    const screen = toScreen(worldFromSofa(point, angle));
    if (index === 0) ctx.moveTo(screen.x, screen.y);
    else ctx.lineTo(screen.x, screen.y);
  });
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.fill();
  ctx.stroke();
}

function drawMovingSofa(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);

  const { scale, toScreen } = movingSofaViewport(width, height);
  const phase = pointer.active
    ? Math.min(1, Math.max(0, pointer.x))
    : (Math.sin(time * 0.34) + 1) / 2;
  const angle = phase * SOFA_HALF_PI;

  drawMovingSofaHallway(ctx, toScreen);

  ctx.strokeStyle = "rgba(96,165,250,0.18)";
  ctx.lineWidth = 1;
  [0.5, 1, 1.5].forEach((radius) =>
    drawMathArc(ctx, toScreen, radius, Math.PI, Math.PI * 1.5),
  );

  [0, 0.18, 0.36, 0.54, 0.72, 0.9, 1].forEach((ghostPhase) => {
    if (Math.abs(ghostPhase - phase) < 0.045) return;
    drawGerverSofaAt(
      ctx,
      toScreen,
      ghostPhase * SOFA_HALF_PI,
      "rgba(245,245,245,0.055)",
      "rgba(245,245,245,0.18)",
      1,
    );
  });

  drawGerverSofaAt(
    ctx,
    toScreen,
    angle,
    "rgba(96,165,250,0.42)",
    "rgba(96,165,250,0.95)",
    Math.max(1.7, scale * 0.012),
  );

  ctx.save();
  ctx.setLineDash([5, 6]);
  ctx.beginPath();
  for (let i = 0; i <= 128; i++) {
    const pathAngle = (i / 128) * SOFA_HALF_PI;
    const screen = toScreen(worldFromSofa(gerverX(pathAngle), angle));
    if (i === 0) ctx.moveTo(screen.x, screen.y);
    else ctx.lineTo(screen.x, screen.y);
  }
  ctx.strokeStyle = "rgba(96,165,250,0.46)";
  ctx.lineWidth = 1.35;
  ctx.stroke();
  ctx.restore();

  gerverContactSet(angle).forEach(({ point, corner }) => {
    const screen = toScreen(worldFromSofa(point, angle));
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, corner ? 3.6 : 2.7, 0, Math.PI * 2);
    ctx.fillStyle = corner ? "rgba(96,165,250,0.95)" : "rgba(245,245,245,0.72)";
    ctx.fill();
  });

  const corner = toScreen({ x: 0, y: 0 });
  ctx.beginPath();
  ctx.arc(corner.x, corner.y, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(96,165,250,0.95)";
  ctx.fill();

  drawMovingSofaHallway(ctx, toScreen, false);
  drawMono(
    ctx,
    `Gerver area ${GERVER_AREA.toFixed(7)}    rotation ${((angle * 180) / Math.PI).toFixed(1)} deg`,
    18,
    height - 18,
    12,
  );
}

function drawMoserWorm(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);

  const s = Math.min(width, height);
  const unit = s * 0.19;
  const coverFill = (i: number, hp: number) =>
    hp === i ? "rgba(250,204,21,0.16)" : "rgba(250,204,21,0.08)";
  const coverStroke = "rgba(250,204,21,0.5)";
  const wormStroke = "rgba(153,85,0,0.85)";

  const panels = [
    { cx: width * 0.26, cy: height * 0.32 },
    { cx: width * 0.7, cy: height * 0.28 },
    { cx: width * 0.26, cy: height * 0.72 },
    { cx: width * 0.7, cy: height * 0.7 },
  ];
  const mx = pointer.active ? pointer.x * width : -1;
  const my = pointer.active ? pointer.y * height : -1;
  let hp = -1;
  panels.forEach((p, i) => {
    if (
      Math.abs(mx - p.cx) < width * 0.22 &&
      Math.abs(my - p.cy) < height * 0.2
    )
      hp = i;
  });

  // Panel 1: Full disc (area = pi/4). SVG: circle r=50, worm: M -40,30 L 40,-30
  {
    const { cx, cy } = panels[0];
    const r = unit;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = coverFill(0, hp);
    ctx.fill();
    ctx.strokeStyle = coverStroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.8, cy + r * 0.6);
    ctx.lineTo(cx + r * 0.8, cy - r * 0.6);
    ctx.strokeStyle = wormStroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    drawMono(ctx, "1", cx - r - 14, cy - r - 8, 12, "rgba(245,245,245,0.6)");
    drawMono(
      ctx,
      "A = pi/4",
      cx - r * 0.5,
      cy + r + 14,
      8,
      "rgba(250,204,21,0.55)",
    );
  }

  // Panel 2: Upper half-disc (area = pi/8). SVG: M -50,0 A 50,50 0 0 1 50,0
  // Worm: M -2,0 V -46.5 a 2,2 0 0 1 4,0 V 0 (tall thin U going up)
  {
    const { cx, cy } = panels[1];
    const r = unit;
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.closePath();
    ctx.fillStyle = coverFill(1, hp);
    ctx.fill();
    ctx.strokeStyle = coverStroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    const gap = r * 0.04;
    const wormH = r * 0.93;
    ctx.beginPath();
    ctx.moveTo(cx - gap, cy);
    ctx.lineTo(cx - gap, cy - wormH);
    ctx.arc(cx, cy - wormH, gap, Math.PI, 0, false);
    ctx.lineTo(cx + gap, cy);
    ctx.strokeStyle = wormStroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    drawMono(ctx, "2", cx - r - 14, cy - r - 8, 12, "rgba(245,245,245,0.6)");
    drawMono(
      ctx,
      "A = pi/8",
      cx - r * 0.5,
      cy + 14,
      8,
      "rgba(250,204,21,0.55)",
    );
  }

  // Panel 3: Rectangle width constraint. SVG: rect -50,-15.9155 to 50,15.9155
  // height = 100/pi = 31.831, i.e. width >= 1/pi of worm length
  // Worm: circle r=15.9155 stroke-dasharray=99,99 => semicircle
  {
    const { cx, cy } = panels[2];
    const rectW = unit * 2;
    const rectH = (unit * 2) / Math.PI;
    ctx.beginPath();
    ctx.rect(cx - rectW / 2, cy - rectH / 2, rectW, rectH);
    ctx.fillStyle = coverFill(2, hp);
    ctx.fill();
    ctx.strokeStyle = coverStroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    const circR = rectH / 2;
    ctx.beginPath();
    ctx.arc(cx + circR * 0.3, cy, circR, Math.PI + 0.1, -0.1, false);
    ctx.strokeStyle = wormStroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    drawMono(
      ctx,
      "3",
      cx - rectW / 2 - 14,
      cy - rectH / 2 - 8,
      12,
      "rgba(245,245,245,0.6)",
    );
    drawMono(
      ctx,
      "w >= 1/pi",
      cx - rectW * 0.3,
      cy + rectH / 2 + 14,
      8,
      "rgba(250,204,21,0.55)",
    );
  }

  // Panel 4: Wetzel sector (area = pi/12). SVG coordinates (sc = unit/50):
  // Cover: M 0,28.8675 L 50,0 L 25,-14.434 A 57.735 0 0 0 -25,-14.434 L -50,0
  // Const (dashed rhombus): 0,-28.8675 50,0 0,28.8675 -50,0 + diagonals
  // Worm: M -45,0 C -20,-33 20,33 45,0 (S-curve)
  {
    const { cx, cy } = panels[3];
    const sc = unit / 50;
    const arcR = 57.735 * sc;
    const arcCY = cy + (-14.43376 - Math.sqrt(57.735 * 57.735 - 625)) * sc;
    const sa = Math.atan2(cy - 14.43376 * sc - arcCY, 25 * sc);
    const ea = Math.atan2(cy - 14.43376 * sc - arcCY, -25 * sc);

    ctx.beginPath();
    ctx.moveTo(cx, cy + 28.8675 * sc);
    ctx.lineTo(cx + 50 * sc, cy);
    ctx.lineTo(cx + 25 * sc, cy - 14.43376 * sc);
    ctx.arc(cx, arcCY, arcR, sa, ea, false);
    ctx.lineTo(cx - 50 * sc, cy);
    ctx.closePath();
    ctx.fillStyle =
      hp === 3 ? "rgba(250,204,21,0.18)" : "rgba(250,204,21,0.09)";
    ctx.fill();
    ctx.strokeStyle = "rgba(250,204,21,0.55)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.setLineDash([2, 3]);
    ctx.strokeStyle = "rgba(204,153,0,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 28.8675 * sc);
    ctx.lineTo(cx + 50 * sc, cy);
    ctx.lineTo(cx, cy + 28.8675 * sc);
    ctx.lineTo(cx - 50 * sc, cy);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - 28.8675 * sc);
    ctx.lineTo(cx, cy + 28.8675 * sc);
    ctx.moveTo(cx + 25 * sc, cy - 14.43376 * sc);
    ctx.lineTo(cx, cy + 28.8675 * sc);
    ctx.lineTo(cx - 25 * sc, cy - 14.43376 * sc);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(cx - 45 * sc, cy);
    ctx.bezierCurveTo(
      cx - 20 * sc,
      cy - 33 * sc,
      cx + 20 * sc,
      cy + 33 * sc,
      cx + 45 * sc,
      cy,
    );
    ctx.strokeStyle = wormStroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    drawMono(
      ctx,
      "4",
      cx - 50 * sc - 14,
      cy - 20 * sc,
      12,
      "rgba(245,245,245,0.6)",
    );
    drawMono(
      ctx,
      "A = pi/12",
      cx - 30 * sc,
      cy + 28.8675 * sc + 14,
      8,
      "rgba(250,204,21,0.55)",
    );
  }

  // Area bounds number line
  const tlY = height * 0.95;
  const tlL = width * 0.06;
  const tlR = width * 0.94;
  ctx.strokeStyle = "rgba(245,245,245,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tlL, tlY);
  ctx.lineTo(tlR, tlY);
  ctx.stroke();
  const aMin = 0.2,
    aMax = 0.42;
  [
    { a: 0.2322, l: "lower 0.232", c: "rgba(34,197,94,0.7)" },
    { a: 0.2604, l: "best 0.260", c: "rgba(96,165,250,0.8)" },
    { a: 0.2618, l: "pi/12", c: "rgba(250,204,21,0.8)" },
    { a: 0.275, l: "0.275", c: "rgba(249,115,22,0.6)" },
    { a: 0.3927, l: "pi/8", c: "rgba(245,245,245,0.4)" },
  ].forEach((b) => {
    const x = tlL + ((b.a - aMin) / (aMax - aMin)) * (tlR - tlL);
    ctx.beginPath();
    ctx.arc(x, tlY, 3, 0, Math.PI * 2);
    ctx.fillStyle = b.c;
    ctx.fill();
    drawMono(ctx, b.l, x - 14, tlY - 10, 7, b.c);
  });

  drawLabel(
    ctx,
    "Moser 1966: smallest convex cover for all unit arcs",
    16,
    height * 0.06,
  );
}

function drawIllumination(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.02);
  const cx = width / 2,
    cy = height / 2;
  const R = Math.min(width, height) * 0.25;
  const squareness = pointer.active
    ? pointer.x
    : 0.5 + 0.3 * Math.sin(time * 0.2);
  const N = 60;
  const body: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const p = 2 + squareness * 6;
    const r =
      R /
      Math.pow(
        Math.pow(Math.abs(Math.cos(t)), p) + Math.pow(Math.abs(Math.sin(t)), p),
        1 / p,
      );
    body.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  ctx.fillStyle = "rgba(245,245,245,0.04)";
  ctx.beginPath();
  body.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(245,245,245,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  body.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
  ctx.stroke();
  const nDirs = squareness > 0.7 ? 4 : squareness > 0.3 ? 3 : 2;
  const dirAngles: number[] = [];
  for (let d = 0; d < nDirs; d++)
    dirAngles.push((d * Math.PI * 2) / nDirs + time * 0.1);
  for (const da of dirAngles) {
    const ddx = Math.cos(da),
      ddy = Math.sin(da);
    for (let rr = -6; rr <= 6; rr++) {
      const oox = cx + -ddy * rr * R * 0.12 - ddx * R * 2;
      const ooy = cy + ddx * rr * R * 0.12 - ddy * R * 2;
      ctx.strokeStyle = "rgba(96,165,250,0.08)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(oox, ooy);
      ctx.lineTo(oox + ddx * R * 4, ooy + ddy * R * 4);
      ctx.stroke();
    }
    const ax = cx - ddx * R * 1.6,
      ay = cy - ddy * R * 1.6;
    const aex = cx - ddx * R * 1.2,
      aey = cy - ddy * R * 1.2;
    ctx.strokeStyle = "rgba(96,165,250,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(aex, aey);
    ctx.stroke();
    const hs = 5;
    ctx.fillStyle = "rgba(96,165,250,0.5)";
    ctx.beginPath();
    ctx.moveTo(aex, aey);
    ctx.lineTo(
      aex - ddx * hs + ddy * hs * 0.4,
      aey - ddy * hs - ddx * hs * 0.4,
    );
    ctx.lineTo(
      aex - ddx * hs - ddy * hs * 0.4,
      aey - ddy * hs + ddx * hs * 0.4,
    );
    ctx.closePath();
    ctx.fill();
  }
  drawMono(ctx, `I(K) = ${nDirs}`, 12, 22, 12, "rgba(96,165,250,0.8)");
  drawLabel(
    ctx,
    squareness > 0.7
      ? "parallelogram needs 4 \u2014 maximum!"
      : "smooth bodies need fewer",
    12,
    height - 14,
  );
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
  drawMono(
    ctx,
    label,
    x + 10,
    y + height * 0.56,
    10,
    active ? "rgba(245,245,245,0.86)" : "rgba(245,245,245,0.58)",
  );
}

function drawErdos1196(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.032);

  const scale = Math.min(width, height);
  const compact = isCardPreviewCanvas(ctx) || width < 560 || height < 300;
  const leftW = compact ? width : width * 0.68;
  const leftX = compact ? 0 : width * 0.02;
  const top = height * 0.12;
  const nodeR = Math.max(10, Math.min(22, scale * 0.045));
  const text = (
    value: string,
    x: number,
    y: number,
    size = 12,
    color = "rgba(245,245,245,0.72)",
    align: CanvasTextAlign = "center",
  ) => {
    if (compact) return;
    ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  };
  const point = (x: number, y: number) => ({
    x: leftX + leftW * x,
    y: top + height * y,
  });
  const nodes = {
    n2310: { label: "2310", ...point(0.43, 0.06), kind: "source" },
    n1155: { label: "1155", ...point(0.12, 0.29), kind: "primitive" },
    n770: { label: "770", ...point(0.28, 0.29), kind: "hit" },
    n462: { label: "462", ...point(0.44, 0.29), kind: "primitive" },
    n330: { label: "330", ...point(0.6, 0.29), kind: "primitive" },
    n210: { label: "210", ...point(0.76, 0.29), kind: "primitive" },
    n154: { label: "154", ...point(0.28, 0.5), kind: "chain" },
    n22: { label: "22", ...point(0.28, 0.67), kind: "chain" },
    n2: { label: "2", ...point(0.28, 0.82), kind: "chain" },
  };
  const edges = [
    ["n2310", "n1155", "2", false],
    ["n2310", "n770", "3", true],
    ["n2310", "n462", "5", false],
    ["n2310", "n330", "7", false],
    ["n2310", "n210", "11", false],
    ["n770", "n154", "5", true],
    ["n154", "n22", "7", true],
    ["n22", "n2", "11", true],
  ] as const;
  const drawArrow = (
    from: (typeof nodes)[keyof typeof nodes],
    to: (typeof nodes)[keyof typeof nodes],
    q: string,
    active: boolean,
  ) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const sx = from.x + ux * nodeR;
    const sy = from.y + uy * nodeR;
    const ex = to.x - ux * nodeR;
    const ey = to.y - uy * nodeR;
    const pulse = active ? 0.58 + 0.18 * Math.sin(time * 2.2) : 0.15;
    ctx.strokeStyle = active
      ? `rgba(96,165,250,${pulse})`
      : "rgba(245,245,245,0.16)";
    ctx.lineWidth = active ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    const head = active ? 7 : 5;
    ctx.fillStyle = active ? "rgba(96,165,250,0.78)" : "rgba(245,245,245,0.22)";
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(
      ex - ux * head - uy * head * 0.55,
      ey - uy * head + ux * head * 0.55,
    );
    ctx.lineTo(
      ex - ux * head + uy * head * 0.55,
      ey - uy * head - ux * head * 0.55,
    );
    ctx.closePath();
    ctx.fill();
    if (active) {
      const mx = (sx + ex) * 0.5;
      const my = (sy + ey) * 0.5;
      text(
        `Λ(${q})/log n`,
        mx,
        my - 10,
        active ? 11 : 10,
        active ? "rgba(147,197,253,0.82)" : "rgba(245,245,245,0.38)",
      );
    }
  };

  ctx.fillStyle = "rgba(34,197,94,0.055)";
  ctx.strokeStyle = "rgba(34,197,94,0.28)";
  ctx.lineWidth = 1;
  const bandX = nodes.n1155.x - nodeR * 1.8;
  const bandY = nodes.n1155.y - nodeR * 1.7;
  const bandW = nodes.n210.x - nodes.n1155.x + nodeR * 3.6;
  const bandH = nodeR * 3.4;
  ctx.fillRect(bandX, bandY, bandW, bandH);
  ctx.strokeRect(bandX, bandY, bandW, bandH);
  text(
    "primitive antichain A",
    bandX + 10,
    bandY - 12,
    11,
    "rgba(134,239,172,0.66)",
    "left",
  );

  edges.forEach(([from, to, q, active]) =>
    drawArrow(nodes[from], nodes[to], q, active),
  );

  Object.values(nodes).forEach((node) => {
    const active =
      pointer.active &&
      Math.hypot(pointer.x * width - node.x, pointer.y * height - node.y) <
        nodeR * 1.8;
    ctx.beginPath();
    ctx.arc(node.x, node.y, active ? nodeR * 1.18 : nodeR, 0, Math.PI * 2);
    ctx.fillStyle =
      node.kind === "hit"
        ? "rgba(34,197,94,0.7)"
        : node.kind === "source"
          ? "rgba(96,165,250,0.66)"
          : node.kind === "primitive"
            ? "rgba(134,239,172,0.18)"
            : "rgba(245,245,245,0.13)";
    ctx.fill();
    ctx.strokeStyle =
      node.kind === "hit"
        ? "rgba(134,239,172,0.86)"
        : active
          ? "rgba(96,165,250,0.78)"
          : "rgba(245,245,245,0.24)";
    ctx.lineWidth = node.kind === "hit" || active ? 1.7 : 1;
    ctx.stroke();
    text(node.label, node.x, node.y + 1, 12, "rgba(245,245,245,0.82)");
  });

  text(
    "sample downward chain: 2310 -> 770 -> 154 -> 22 -> 2",
    leftX + 18,
    height - 24,
    12,
    "rgba(147,197,253,0.72)",
    "left",
  );

  if (compact) return;

  const rightX = width * 0.72;
  const rightW = width * 0.23;
  const boxH = 48;
  const boxes = [
    ["transition", "P(n -> n/q) = Λ(q)/log n"],
    ["normalization", "sum_{q|n} Λ(q) = log n"],
    ["primitive set", "a chain can hit A at most once"],
    ["zeta weight", "sum_{a in A} ν(a) <= 1"],
    ["asymptotic", "ν(a) ~ 1/(a log a)"],
  ];
  boxes.forEach(([label, value], i) => {
    const y = height * 0.14 + i * (boxH + 12);
    drawBox(
      ctx,
      "",
      rightX,
      y,
      rightW,
      boxH,
      i === 3 ? "rgba(34,197,94,0.55)" : "rgba(96,165,250,0.45)",
      i === 3,
    );
    text(label, rightX + 10, y - 10, 10, "rgba(245,245,245,0.42)", "left");
    text(
      value,
      rightX + 12,
      y + boxH * 0.56,
      11,
      "rgba(245,245,245,0.7)",
      "left",
    );
  });
  drawLabel(
    ctx,
    "legal divisibility edges only; highlighted path hits the primitive set once",
    16,
    height - 18,
  );
}

function drawAbcVerification(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 22, 0.038);

  const left = width * 0.1;
  const top = height * 0.12;
  drawMono(ctx, "abc conjecture", left, top, 13, "rgba(245,245,245,0.78)");
  drawMono(
    ctx,
    "a + b = c  |  c ? rad(abc)^(1+eps)",
    left,
    top + 24,
    10,
    "rgba(245,245,245,0.5)",
  );

  const baseY = height * 0.72;
  const bars = [
    { label: "a", value: 18, x: width * 0.12, color: "rgba(245,245,245,0.32)" },
    { label: "b", value: 72, x: width * 0.21, color: "rgba(245,245,245,0.42)" },
    { label: "c", value: 90, x: width * 0.3, color: "rgba(96,165,250,0.72)" },
    {
      label: "rad",
      value: 34,
      x: width * 0.41,
      color: "rgba(249,115,22,0.58)",
    },
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
    {
      label: "2012 claimed IUT proof",
      y: proofY,
      color: "rgba(245,245,245,0.38)",
    },
    {
      label: "disputed lemma / translation gap",
      y: proofY + 62,
      color: "rgba(249,115,22,0.58)",
    },
    {
      label: "Lean formalization projects",
      y: proofY + 124,
      color: "rgba(96,165,250,0.56)",
    },
    {
      label: "kernel-checkable statement",
      y: proofY + 186,
      color: "rgba(34,197,94,0.52)",
    },
  ];
  nodes.forEach((node, i) => {
    const active =
      Math.abs(cursorY - (node.y + nodeH / 2)) < 38 && cursorX > proofX - 20;
    drawBox(ctx, node.label, proofX, node.y, nodeW, nodeH, node.color, active);
    if (i < nodes.length - 1) {
      ctx.strokeStyle =
        i === 1 ? "rgba(249,115,22,0.36)" : "rgba(245,245,245,0.18)";
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

function drawFaltingsAbel(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
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
    const active =
      pointer.active &&
      Math.hypot(pointer.x * width - x, pointer.y * height - y) < 28;
    ctx.beginPath();
    ctx.arc(x, y, active ? 5 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle =
      active || i % 3 === 0
        ? "rgba(96,165,250,0.82)"
        : "rgba(245,245,245,0.58)";
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
  ctx.arc(
    medalX,
    medalY,
    Math.min(width, height) * (0.07 + Math.sin(time * 1.3) * 0.004),
    0,
    Math.PI * 2,
  );
  ctx.strokeStyle = "rgba(96,165,250,0.38)";
  ctx.lineWidth = 1;
  ctx.stroke();
  drawMono(ctx, "ABEL", medalX - 16, medalY + 4, 12, "rgba(245,245,245,0.72)");

  drawBox(
    ctx,
    "Mordell: finite C(Q)",
    width * 0.08,
    height * 0.12,
    width * 0.33,
    34,
    "rgba(96,165,250,0.46)",
  );
  drawBox(
    ctx,
    "Mordell-Lang: subvariety intersection",
    width * 0.52,
    height * 0.72,
    width * 0.4,
    34,
    "rgba(245,245,245,0.36)",
  );
  drawMono(
    ctx,
    "genus > 1 arithmetic curve",
    width * 0.18,
    height * 0.82,
    10,
    "rgba(245,245,245,0.42)",
  );
  drawLabel(
    ctx,
    "Faltings: rational points made finite and structural",
    16,
    height - 18,
  );
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

export function IsoperimetricViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawIsoperimetric} className={className} />;
}

export function HoneycombViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawHoneycomb} className={className} />;
}

export function BrouwerViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawBrouwer} className={className} />;
}

export function BorsukUlamViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawBorsukUlam} className={className} />;
}

export function HamSandwichViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawHamSandwich} className={className} />;
}

export function HairyBallViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawHairyBall} className={className} />;
}

export function GaussCircleViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawGaussCircle} className={className} />;
}

export function MovingSofaViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawMovingSofa} className={className} />;
}

export function MoserWormViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawMoserWorm} className={className} />;
}

export function IlluminationViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawIllumination} className={className} />;
}

export function Erdos1196Viz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawErdos1196} className={className} />;
}

export function AbcVerificationViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawAbcVerification} className={className} />;
}

export function FaltingsAbelViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawFaltingsAbel} className={className} />;
}

function drawLebesgueUniversalCover(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
) {
  clear(ctx, width, height);
  drawGrid(ctx, width, height, 24, 0.022);

  const s = Math.min(width, height);
  const isCard = isCardPreviewCanvas(ctx);
  const unit = s * (isCard ? 0.52 : 0.46); // larger in card preview to fill the canvas

  // Pál hexagon parameters
  // Flat-top orientation: vertices at 0°, 60°, 120°, 180°, 240°, 300°
  // inradius = unit/2, circumradius = unit/√3
  const hexInr = unit / 2;
  const hexCirc = hexInr * (2 / Math.sqrt(3));

  // Main hexagon center: shifted left on wide canvases to make room for annotations
  const cx = isCard
    ? width / 2
    : Math.min(width * 0.44, width / 2 + hexCirc * 0.1);
  const cy = height / 2;

  // Hexagon vertices
  const hex: Vec2[] = [];
  for (let k = 0; k < 6; k++) {
    const a = k * (Math.PI / 3);
    hex.push({ x: cx + hexCirc * Math.cos(a), y: cy + hexCirc * Math.sin(a) });
  }

  // Outer glow
  if (!isCard) {
    const grad = ctx.createRadialGradient(
      cx,
      cy,
      hexInr * 0.5,
      cx,
      cy,
      hexCirc * 1.5,
    );
    grad.addColorStop(0, "rgba(96,165,250,0.06)");
    grad.addColorStop(1, "rgba(96,165,250,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, hexCirc * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Hexagon fill + stroke
  ctx.beginPath();
  ctx.moveTo(hex[0].x, hex[0].y);
  for (let k = 1; k < 6; k++) ctx.lineTo(hex[k].x, hex[k].y);
  ctx.closePath();
  ctx.fillStyle = "rgba(96,165,250,0.07)";
  ctx.fill();
  ctx.strokeStyle = "rgba(96,165,250,0.58)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Width annotation: vertical dimension line (flat-top → top/bottom at ±hexInr)
  if (!isCard) {
    const annX = cx + hexCirc + s * 0.055;
    const yTop = cy - hexInr;
    const yBot = cy + hexInr;
    // Dashed extension lines
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = "rgba(96,165,250,0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, yTop);
    ctx.lineTo(annX + 6, yTop);
    ctx.moveTo(cx, yBot);
    ctx.lineTo(annX + 6, yBot);
    ctx.stroke();
    ctx.setLineDash([]);
    // Arrow shaft
    ctx.strokeStyle = "rgba(96,165,250,0.55)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(annX + 6, yTop + 5);
    ctx.lineTo(annX + 6, yBot - 5);
    ctx.stroke();
    // Arrowheads
    ctx.fillStyle = "rgba(96,165,250,0.6)";
    for (const [y, d] of [
      [yTop, 1],
      [yBot, -1],
    ] as const) {
      ctx.beginPath();
      ctx.moveTo(annX + 6, y + d * 2);
      ctx.lineTo(annX + 2, y + d * 8);
      ctx.lineTo(annX + 10, y + d * 8);
      ctx.closePath();
      ctx.fill();
    }
    drawLabel(ctx, "width = 1", annX + 14, (yTop + yBot) / 2 + 4);
  }

  // ── Cycling unit-diameter shapes inside the hexagon ──
  const shapeNames = [
    "Unit disk  (d = 1)",
    "Equilateral triangle  (side = 1)",
    "Reuleaux triangle  (width = 1)",
    "Square  (diagonal = 1)",
    "Unit segment  (length = 1)",
  ];
  const shapeDur = 3.4;
  const cycleT = (time % (shapeNames.length * shapeDur)) / shapeDur;
  const si = Math.floor(cycleT) % shapeNames.length;
  const lt = cycleT - Math.floor(cycleT);
  const alpha = lt < 0.1 ? lt / 0.1 : lt > 0.9 ? (1 - lt) / 0.1 : 1.0;

  // Mouse x controls rotation; otherwise slowly rotates
  const rot = pointer.active ? (pointer.x - 0.5) * Math.PI * 2 : time * 0.1;

  // Circumradius of equilateral triangle with side = unit
  const eqR = unit / Math.sqrt(3);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;

  if (si === 0) {
    // Unit disk
    ctx.beginPath();
    ctx.arc(0, 0, unit / 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Diameter tick
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-unit / 2, 0);
    ctx.lineTo(unit / 2, 0);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (si === 1) {
    // Equilateral triangle, side = unit (diameter = unit)
    ctx.beginPath();
    for (let k = 0; k < 3; k++) {
      const a = -Math.PI / 2 + k * ((2 * Math.PI) / 3);
      k === 0
        ? ctx.moveTo(eqR * Math.cos(a), eqR * Math.sin(a))
        : ctx.lineTo(eqR * Math.cos(a), eqR * Math.sin(a));
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else if (si === 2) {
    // Reuleaux triangle: 3 circular arcs of radius = unit centered at opposite vertices
    // Vertices of the underlying equilateral triangle (same circumradius eqR, side = unit)
    const verts: Vec2[] = Array.from({ length: 3 }, (_, k) => ({
      x: eqR * Math.cos(-Math.PI / 2 + k * ((2 * Math.PI) / 3)),
      y: eqR * Math.sin(-Math.PI / 2 + k * ((2 * Math.PI) / 3)),
    }));
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const center = verts[i];
      const p1 = verts[(i + 1) % 3];
      const p2 = verts[(i + 2) % 3];
      const a1 = Math.atan2(p1.y - center.y, p1.x - center.x);
      let a2 = Math.atan2(p2.y - center.y, p2.x - center.x);
      // Ensure we sweep the short clockwise arc (anticlockwise=false)
      if (a2 < a1) a2 += 2 * Math.PI;
      if (i === 0) ctx.moveTo(p1.x, p1.y);
      ctx.arc(center.x, center.y, unit, a1, a2, false);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(251,146,60,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(251,146,60,0.85)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else if (si === 3) {
    // Square with diagonal = unit (rotated 45°, vertices at ±unit/2 on axes)
    ctx.beginPath();
    ctx.moveTo(0, -unit / 2);
    ctx.lineTo(unit / 2, 0);
    ctx.lineTo(0, unit / 2);
    ctx.lineTo(-unit / 2, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else {
    // Unit segment
    const hw = unit / 2;
    const ht = unit * 0.017;
    ctx.beginPath();
    ctx.moveTo(-hw, -ht);
    ctx.lineTo(hw, -ht);
    ctx.lineTo(hw, ht);
    ctx.lineTo(-hw, ht);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 1.8;
    ctx.stroke();
    for (const ex of [-hw, hw]) {
      ctx.beginPath();
      ctx.arc(ex, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96,165,250,0.9)";
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();

  // Labels
  if (!isCard) {
    drawLabel(ctx, shapeNames[si], cx - 70, cy + hexInr + 24);
    drawLabel(
      ctx,
      "Pál hexagon  (A = √3/2 ≈ 0.866)",
      cx - 75,
      cy - hexInr - 18,
    );
  }

  // ── Right panel: area bounds bar ──
  if (!isCard) {
    const px = Math.min(cx + hexCirc + s * 0.34, width - s * 0.08);
    const py = cy;
    const bH = s * 0.4;
    const bW = 13;
    const bX = px - bW / 2;
    const bY = py - bH / 2;

    // Display range
    const rMin = 0.826,
      rMax = 0.872;
    const toY = (v: number) => bY + bH * (1 - (v - rMin) / (rMax - rMin));

    // Background
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(bX, bY, bW, bH);

    const lo = 0.832,
      hi = 0.8441153,
      palArea = Math.sqrt(3) / 2;
    const yLo = toY(lo),
      yHi = toY(hi),
      yPal = toY(palArea);

    // Uncertainty region
    ctx.fillStyle = "rgba(96,165,250,0.18)";
    ctx.fillRect(bX, yHi, bW, yLo - yHi);

    // Pál level (dashed)
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(96,165,250,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bX - 4, yPal);
    ctx.lineTo(bX + bW + 4, yPal);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bound ticks
    for (const y of [yLo, yHi]) {
      ctx.strokeStyle = "rgba(96,165,250,0.7)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(bX - 5, y);
      ctx.lineTo(bX + bW + 5, y);
      ctx.stroke();
    }

    // Pulsing highlight on bound lines
    const pulse = 0.5 + 0.5 * Math.sin(time * 1.7);
    ctx.fillStyle = `rgba(96,165,250,${0.45 + 0.35 * pulse})`;
    ctx.fillRect(bX, yHi - 1, bW, 2);
    ctx.fillRect(bX, yLo - 1, bW, 2);

    // Text labels to the right of the bar
    const lx = bX + bW + 8;
    drawLabel(ctx, "upper 0.8441", lx, yHi + 4);
    drawLabel(ctx, "lower 0.832", lx, yLo + 4);
    drawLabel(ctx, "Pal  0.866", lx, yPal + 4);
    drawLabel(ctx, "A*", bX + bW / 2 - 4, (yHi + yLo) / 2 + 4);
    drawLabel(ctx, "Area", bX - 2, bY - 12);
  }
}

export function LebesgueUniversalCoverViz({
  className = "",
}: {
  className?: string;
}) {
  return <CanvasViz draw={drawLebesgueUniversalCover} className={className} />;
}
