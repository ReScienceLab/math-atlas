---
name: math-atlas-problem
description: Optimize or create a math problem page in Math Atlas. Covers research, formula verification, visualization, problem data accuracy, author avatars/links, and browser testing. Use when asked to optimize, fix, or create a /problems/<slug> page.
---

# Math Atlas Problem Optimization

End-to-end workflow for creating or optimizing an interactive math problem page with
verified formulas, accurate history, contributor avatars + profile links, and a
high-quality Canvas visualization.

## When to use

- User asks to optimize/fix/create a problem page at `/problems/<slug>`
- User reports incorrect formulas, bad visualization, or missing references
- User wants to add a new mathematical problem to the atlas

## Architecture (read this first)

Each problem is **one self-contained file** under `src/content/problems/<slug>.ts` that
calls `defineProblem({...})`. There is no central `problems.ts` data array and no separate
`coreFormulas` record — formulas, videos, authors, timeline all live inline in that object.

A new/edited problem touches up to four places:

1. `src/content/problems/<slug>.ts` — the `defineProblem(...)` object (data, formulas, videos, authors, timeline)
2. `src/content/problems/index.ts` — import the export and add it to the `configuredProblems` array
3. `src/components/viz/classic-viz.tsx` — the `draw<Name>` function + `<Name>Viz` wrapper
4. **Two** viz registries — `src/components/viz/viz-loader.tsx` **and** `src/components/ui/problem-card.tsx`

Types live in `src/lib/problem-types.ts`. Helpers (`defineProblem`, `scholarSearch`) in `src/lib/problem-template.ts`.

## Workflow

### Phase 1 — Audit

1. Navigate to the page in the browser (`npx next dev`) and take a full-page screenshot
2. Read the problem file `src/content/problems/<slug>.ts`
3. Read the `draw<Name>` function in `src/components/viz/classic-viz.tsx`
4. Note issues: vague descriptions, missing/weak authors, no avatars, weak references, flat visualization, media-hype framing

### Phase 2 — Research

Spawn a research agent to gather verified data. See [references/research-checklist.md](references/research-checklist.md):

- Precise formal statement with LaTeX, plus 1-2 equivalent formulations
- Verified historical timeline with exact paper citations
- Key contributors (provers, verifiers, generalisers) with institutions
- For each person: homepage / Google Scholar / X(Twitter) / LinkedIn (verify identity!)
- Avatar source per contributor (personal photo for people, logo for orgs)
- DOI / arXiv links for all papers
- 2-3 relevant YouTube videos (verify each `videoId` exists)

Be skeptical of recent (current-year) AI/math news — distinguish the *exact* result from
media conflation, and lean on primary sources (arXiv, the proof PDF, the problem's own catalogue).

### Phase 3 — Write/update the problem file

Edit `src/content/problems/<slug>.ts`. See [references/data-schema.md](references/data-schema.md) for the
field-by-field guide. Key fields: `status`, `field`, `year`, `shortDescription`, `longDescription`,
`vizComponent`, `collections`, `coordinates`, `connections`, `authors`, `papers`, `timeline`,
`formulas`, `videos`.

For a **new** problem, also register it in `src/content/problems/index.ts` (import + array entry).

### Phase 4 — Formulas

Set the inline `formulas: ProblemFormula[]` array (2-4 entries), each `{ label, latex, description }`:

1. **Main statement** — the theorem / problem definition
2. **Key mechanism** — the underlying quantity or bound that drives the result
3. **Classification / structure** — a structural quantity, or the contrasting bound (e.g. the conjecture vs. the disproof)

Use `String.raw` for LaTeX; keep descriptions ≤120 chars.

### Phase 5 — Authors: avatars + profile links

See [references/data-schema.md](references/data-schema.md) "Authors" section.

- **Avatars** (`avatarUrl`): for a **person**, use a personal photo; for a **company/institution
  entity** author, use the org logo. Download assets into `public/people/<name>.<ext>` (photos) or
  `public/orgs/<name>.<ext>` (logos) and reference `"/people/..."` / `"/orgs/..."`. Local assets
  avoid the `next.config.ts` `remotePatterns` allowlist (only `upload.wikimedia.org` +
  `scholar.googleusercontent.com`) and never expire (LinkedIn/Twitter CDN URLs are signed and expire).
- **Links**: prefer Google Scholar; the **Homepage** slot falls back personal-site → Scholar →
  Twitter/LinkedIn. Rendered as brand logos by `src/components/ui/author-card.tsx` via
  `src/components/ui/brand-icons.tsx` (Google Scholar, X, LinkedIn, Wikipedia). Fields:
  `homepageUrl`, `scholarUrl`, `twitterUrl`, `linkedinUrl`, `wikipediaUrl`.
- **Order**: put the result's **main contributors first**, historical figures last.

### Phase 6 — Visualization

Add a `draw<Name>` function + `<Name>Viz` wrapper at the end of `classic-viz.tsx`, then register the
PascalCase name in **both** `viz-loader.tsx` and `problem-card.tsx`. See
[references/viz-patterns.md](references/viz-patterns.md):

- Show the actual mathematical objects (point sets, vector fields, mappings), not abstract decoration
- Add pointer interactivity (mouse controls a meaningful parameter; gentle `time` animation when idle)
- Mark key features (fixed points, singularities, the active element) with blue glow + label
- Style: dark bg (`#050505`), white strokes, blue (`#60a5fa`) highlights; degrade gracefully on card previews

### Phase 7 — Verify

1. Reload the page in the browser, take a screenshot
2. Check formulas render (no KaTeX errors) and the visualization animates + responds to the pointer
3. Confirm every avatar serves (200) and each profile link / video resolves
4. Run `npx next build` — must pass TypeScript and static generation with no errors
5. Verify all DOI/arXiv/homepage URLs are valid (curl 200) and `videoId`s exist (YouTube oEmbed)

## File map

| What | Where |
|------|-------|
| Problem data (per problem) | `src/content/problems/<slug>.ts` — `defineProblem({...})` |
| Problem registry | `src/content/problems/index.ts` — `configuredProblems` array |
| Types | `src/lib/problem-types.ts` (`Problem`, `Author`, `ProblemFormula`, `Video`, …) |
| Helpers | `src/lib/problem-template.ts` (`defineProblem`, `scholarSearch`) |
| Visualization | `src/components/viz/classic-viz.tsx` — `draw*` fn + `*Viz` wrapper |
| Viz registries (BOTH) | `src/components/viz/viz-loader.tsx` **and** `src/components/ui/problem-card.tsx` |
| Author card + avatars | `src/components/ui/author-card.tsx` |
| Brand link icons | `src/components/ui/brand-icons.tsx` |
| Avatar assets | `public/people/<name>.<ext>` (photos), `public/orgs/<name>.<ext>` (logos) |
| Image domain allowlist | `next.config.ts` → `images.remotePatterns` |
| Page template | `src/app/problems/[slug]/page.tsx` |

## References

- [references/research-checklist.md](references/research-checklist.md) — what to verify during research
- [references/data-schema.md](references/data-schema.md) — field-by-field guide for the problem file
- [references/viz-patterns.md](references/viz-patterns.md) — Canvas visualization conventions and patterns
