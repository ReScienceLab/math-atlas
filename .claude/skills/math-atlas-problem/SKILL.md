---
name: math-atlas-problem
description: Optimize or create a math problem page in Math Atlas. Covers research, formula verification, visualization rewrite, problem data accuracy, and browser testing. Use when asked to optimize, fix, or create a /problems/<slug> page.
---

# Math Atlas Problem Optimization

End-to-end workflow for creating or optimizing an interactive math problem page with verified formulas, accurate history, and a high-quality Canvas visualization.

## When to use

- User asks to optimize/fix/create a problem page at `/problems/<slug>`
- User reports incorrect formulas, bad visualization, or missing references
- User wants to add a new mathematical problem to the atlas

## Workflow

### Phase 1 — Audit

1. Navigate to the page in the browser and take a full-page screenshot
2. Read the problem data in `src/lib/problems.ts` (find by slug)
3. Read the formula entry in the `coreFormulas` record (same file, search slug)
4. Read the draw function in `src/components/viz/classic-viz.tsx`
5. Note issues: vague descriptions, missing authors, weak references, flat visualization

### Phase 2 — Research

Spawn a research agent to gather verified data. See [references/research-checklist.md](references/research-checklist.md) for what to collect:

- Precise formal statement with LaTeX
- Related theorems / equivalent formulations (2-3 formulas total)
- Verified historical timeline with exact paper citations
- Key contributors beyond the obvious names
- DOI links for all papers when possible

### Phase 3 — Update problem data

Edit `src/lib/problems.ts`. See [references/data-schema.md](references/data-schema.md) for field-by-field guidance:

- `longDescription`: mention the key mathematical mechanism, not just intuition
- `authors`: include all major contributors (provers, generalisers)
- `papers`: 3 well-chosen references with DOI URLs, not encyclopedia links
- `timeline`: 4-6 events covering origin → proof → generalization → applications
- `year`: use the publication year of the definitive proof
- `connections`: add related theorem names

### Phase 4 — Update formulas

Replace the single `coreFormula(...)` call with a multi-formula array (2-3 entries):

1. **Theorem** — the main formal statement
2. **Key mechanism** — the underlying theorem that makes it work (e.g. index theorem, Lefschetz number)
3. **Classification / structure** — the structural quantity that governs the result

Each entry: `{ label, latex, description }`. Keep descriptions under 120 chars.

### Phase 5 — Rewrite visualization

Replace the draw function in `classic-viz.tsx`. See [references/viz-patterns.md](references/viz-patterns.md) for conventions:

- Use 3D projection when the theorem concerns spheres/manifolds
- Show the mathematical objects (vector fields, mappings, deformations), not abstract decoration
- Add pointer interactivity (mouse controls a parameter)
- Use depth-sorting, alpha-fading, arrowheads for vectors
- Mark key features (fixed points, singularities) with blue glow + label
- Style: dark bg (#050505), white strokes, blue (#60a5fa) for highlights

### Phase 6 — Verify

1. Reload the page in the browser, take screenshot
2. Check formulas render correctly (no KaTeX errors)
3. Check visualization animates and responds to mouse
4. Run `npx next build` to confirm no type/compile errors
5. Verify all DOI/arXiv links are syntactically correct

## File map

| What | Where |
|------|-------|
| Problem data | `src/lib/problems.ts` — `rawProblems` array |
| Formula data | `src/lib/problems.ts` — `coreFormulas` record |
| Visualization | `src/components/viz/classic-viz.tsx` — `draw*` function |
| Viz exports | `src/components/viz/classic-viz.tsx` — bottom of file |
| Viz registry | `src/components/viz/viz-loader.tsx` + `src/components/ui/problem-card.tsx` |
| Page template | `src/app/problems/[slug]/page.tsx` |

## References

- [references/research-checklist.md](references/research-checklist.md) — what to verify during research
- [references/data-schema.md](references/data-schema.md) — field-by-field guide for problems.ts
- [references/viz-patterns.md](references/viz-patterns.md) — Canvas visualization conventions and patterns
