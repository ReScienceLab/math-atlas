# Problem Data Schema

Field-by-field guide for editing entries in `src/lib/problems.ts`.

## Problem object (in `rawProblems` array)

```ts
{
  slug: string           // URL path segment, kebab-case
  title: string          // Display title, title case
  status: ProblemStatus  // "open" | "proved" | "disproved" | "resolved" | "partial" | "watch" | "award"
  field: MathField       // "topology" | "analysis" | "algebra" | "geometry" | "number-theory" | ...
  year: number           // Year of definitive proof or original statement (for open problems)
  shortDescription: string    // 1 sentence, ≤100 chars, shown in cards
  longDescription?: string    // 2-4 sentences for detail page sidebar
  vizComponent: string        // PascalCase component name, e.g. "HairyBallViz"
  collections?: ProblemCollection[]  // "canonical" | "beautiful" | "frontier" | "unification" | "recent"
  coordinates?: ProblemCoordinates   // { difficulty, beauty, visual, importance, activity, accessibility } each 1-10
  consensusStatus?: ConsensusStatus  // "settled" | "active" | "emerging" | "watch"
  lastReviewed?: string   // "YYYY-MM" format
  connections?: string[]  // Related theorem/concept names for discovery
  authors: Author[]
  papers: Paper[]
  timeline: TimelineEvent[]
}
```

## Writing the longDescription

**Do**: mention the mathematical mechanism, not just the intuition.

Bad: "The theorem says a sphere cannot be combed flat."
Good: "Every continuous tangent vector field on S² must have a zero — a consequence of χ(S²) = 2 ≠ 0. Via the Poincaré–Hopf index theorem, the indices at all zeros must sum to χ."

Pattern: intuitive hook → precise statement → key mechanism → generalization scope.

## Authors array

```ts
{ name: string, institution: string, scholarUrl?: string }
```

- Use correct diacritics: "Poincaré", "Zürich", "Erdős"
- Institution = where they were when they did the work
- `scholarUrl: scholarSearch("Name key theorem terms")`
- Order: chronological by contribution (original prover first)
- Include 2-3 authors: prover + generaliser + key alternative proof

## Papers array

```ts
{ title: string, arxivId?: string, url: string, year: number }
```

- 3 references is the sweet spot
- Use descriptive titles: "Über Abbildung von Mannigfaltigkeiten — Brouwer's proof for all even-dimensional spheres"
- Prefer DOI URLs: `https://doi.org/10.1007/BF01456931`
- For arXiv: set both `arxivId: "2003.09266"` and `url: "https://arxiv.org/abs/2003.09266"`
- Year = publication year, not submission year

## Timeline array

```ts
{ year: number, title: string, type: "origin" | "progress" | "breakthrough" | "recognition" }
```

- 4-6 events covering the full arc
- `origin`: early related work, conjectures
- `breakthrough`: key proofs, major generalizations
- `progress`: alternative proofs, partial results
- `recognition`: prizes, major applications, cultural impact
- Be specific: "Brouwer extends the proof to all S²ⁿ" not "Brouwer proves it"

## Formula entries (in `coreFormulas` record)

Single formula (simple):
```ts
"slug": coreFormula(String.raw`LaTeX`, "description")
```

Multi-formula (preferred for optimized pages):
```ts
"slug": [
  { label: "Theorem", latex: String.raw`...`, description: "..." },
  { label: "Key mechanism name", latex: String.raw`...`, description: "..." },
  { label: "Structural quantity", latex: String.raw`...`, description: "..." },
],
```

- Use `String.raw` to avoid double-escaping backslashes
- Labels: short, title case, describe what the formula represents
- Descriptions: ≤120 chars, plain English, explain why this formula matters
