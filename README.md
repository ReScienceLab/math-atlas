![Math Atlas GitHub banner](public/github-banner.png)

# Math Atlas

A visual directory of mathematical discoveries, open problems, and the people behind them.

## Local Development

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Build

```bash
bun run lint
bunx tsc --noEmit
bun run build
```

## Social Images

```bash
bun run social
```

The source HTML lives at `assets/social/banner.html` and renders
`public/og.png` and `public/github-banner.png` at 2x resolution with 300 DPI PNG metadata.
Problem pages use pre-rendered Open Graph images in `public/og/problems/`,
generated from a screenshot-only Next route that reuses each problem's real visualization.

Useful options:

```bash
SKIP_STATIC_SOCIAL=1 PROBLEM_OG_SLUGS=erdos-problem-1196 bun run social
SKIP_PROBLEM_OG=1 bun run social
```

## Deployment

The project is configured for Vercel with Bun via `vercel.json`.

```bash
vercel deploy --prod
```
