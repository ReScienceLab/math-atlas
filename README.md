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

## Deployment

The project is configured for Vercel with Bun via `vercel.json`.

```bash
vercel deploy --prod
```
