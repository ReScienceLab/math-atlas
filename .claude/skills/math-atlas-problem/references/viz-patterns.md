# Visualization Patterns

Canvas visualization conventions for `src/components/viz/classic-viz.tsx`.

## Architecture

Each problem has a draw function and a React wrapper:

```ts
function drawMyProblem(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, pointer: Pointer) {
  // ...
}

export function MyProblemViz({ className = "" }: { className?: string }) {
  return <CanvasViz draw={drawMyProblem} className={className} />;
}
```

Register in `viz-loader.tsx` and `problem-card.tsx` dynamic import maps.

## Style constants

- Background: `#050505` (via `clear(ctx, w, h)`)
- Grid: `drawGrid(ctx, w, h, 24, 0.02)` — subtle 24px grid
- Primary strokes: `rgba(245,245,245, 0.12-0.35)` — white at low alpha
- Highlight color: `rgba(96,165,250, ...)` — blue (#60a5fa)
- Secondary highlights: green `rgba(34,197,94,...)`, orange `rgba(249,115,22,...)`
- Line widths: 0.6-1.2 for structure, 1.5-2 for emphasis

## Available helpers

```ts
clear(ctx, width, height)          // Fill black background
drawGrid(ctx, width, height, step, alpha)  // Subtle grid overlay
drawLabel(ctx, text, x, y)         // Monospace label (hidden on small screens)
drawMono(ctx, text, x, y, size, color)     // Monospace text at any size
seeded(index: number): number      // Deterministic pseudo-random [0,1)
```

## Pointer interaction

```ts
type Pointer = { x: number; y: number; active: boolean };
// x, y are normalized [0,1] within the canvas
```

Pattern: use pointer to control a meaningful parameter.

```ts
const param = pointer.active ? pointer.x * range : defaultValue + Math.sin(time * speed) * amplitude;
```

When pointer is inactive, animate gently with `time`.

## 3D sphere projection (for topology problems)

```ts
const tiltX = pointer.active ? (pointer.y - 0.5) * 0.5 : 0.35;
const rotY = pointer.active ? (pointer.x - 0.5) * Math.PI * 1.2 : time * 0.18;
const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

const project = (px: number, py: number, pz: number): [screenX, screenY, depth] => {
  const x1 = px * cosY + pz * sinY;
  const z1 = -px * sinY + pz * cosY;
  const y1 = py * cosX - z1 * sinX;
  const z2 = py * sinX + z1 * cosX;
  return [cx + x1 * R, cy + y1 * R, z2];
};
```

- Draw latitude/longitude wireframe with depth-based alpha
- Back-face elements: alpha 0.03-0.05, front-face: 0.12-0.22
- Depth-sort arrows/points before drawing

## Vector field patterns

For tangent vector fields on a sphere:

1. Sample on a lat/lon grid, skip poles
2. Compute tangent basis vectors eφ, eθ at each point
3. Combine to form the field direction
4. Project to screen space and normalize arrow length
5. Draw with arrowheads (triangle tip, size ~4px)
6. Vanishing points: mark with blue glow + `drawMono` label

## Disk mapping patterns (Brouwer-style)

1. Define `mapF(px, py) → [fx, fy]` for the continuous self-map
2. Draw the deformed grid by mapping grid intersection points
3. Draw arrows from sample points x to f(x)
4. Compute fixed point by iterating mapF ~30 times from center
5. Mark fixed point with blue glow + label

## Key features to mark

Use this pattern for singularities, fixed points, or key geometric features:

```ts
const glow = ctx.createRadialGradient(px, py, 0, px, py, 14);
glow.addColorStop(0, "rgba(96,165,250,0.4)");
glow.addColorStop(1, "rgba(96,165,250,0)");
ctx.fillStyle = glow;
ctx.fillRect(px - 14, py - 14, 28, 28);
ctx.beginPath();
ctx.arc(px, py, 5, 0, Math.PI * 2);
ctx.fillStyle = "rgba(96,165,250,0.95)";
ctx.fill();
drawMono(ctx, "label", px + 10, py - 8, 10, "rgba(96,165,250,0.8)");
```

## Arrowhead pattern

```ts
const hs = Math.min(4, len * 0.4);  // head size
ctx.beginPath();
ctx.moveTo(ex, ey);                  // tip
ctx.lineTo(ex - nx * hs + ny * hs * 0.4, ey - ny * hs - nx * hs * 0.4);
ctx.lineTo(ex - nx * hs - ny * hs * 0.4, ey - ny * hs + nx * hs * 0.4);
ctx.closePath();
ctx.fill();
```

## Performance

- Keep point counts reasonable: ~100-200 arrows, ~50 grid lines
- Use `seeded(i)` for deterministic randomness, not `Math.random()`
- Animation speed: `time * 0.15` to `time * 0.5` for gentle movement
- Skip drawing off-screen or fully transparent elements
