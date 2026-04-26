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
`public/github-banner.png` as a 3:1 banner at 2x resolution with 300 DPI PNG metadata.
Open Graph images are generated dynamically by `src/app/og/route.tsx`.

## Deployment

The project is configured for Vercel with Bun via `vercel.json`.

```bash
vercel deploy --prod
```
