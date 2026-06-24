# Problem Data Schema

Field-by-field guide for a problem file: `src/content/problems/<slug>.ts`.

## File skeleton

```ts
import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const mySlug = defineProblem({
  slug: "my-slug",
  title: "My Problem",
  status: "open",
  field: "geometry",
  year: 2026,
  shortDescription: "...",
  longDescription: "...",
  vizComponent: "MyProblemViz",
  collections: ["frontier", "recent"],
  coordinates: { difficulty: 8, beauty: 9, visual: 8, importance: 9, activity: 10, accessibility: 7 },
  consensusStatus: "settled",
  lastReviewed: "2026-05",
  connections: ["Related Theorem", "..."],
  authors: [ /* ... */ ],
  papers: [ /* ... */ ],
  videos: [ /* ... */ ],
  timeline: [ /* ... */ ],
  formulas: [ /* ... */ ],
});

export default mySlug;
```

Then **register** it in `src/content/problems/index.ts`: add `import { mySlug } from "./my-slug";`
and add `mySlug,` to the `configuredProblems` array (newest/AI work goes near the top).

Types are defined in `src/lib/problem-types.ts` — keep field names/enum values in sync with it.

## Top-level fields

```ts
slug: string            // URL path segment, kebab-case; must equal the filename
title: string           // Display title, title case
status: ProblemStatus   // "open" | "proved" | "disproved" | "resolved" | "partial" | "watch" | "award"
field: MathField        // "analysis" | "algebra" | "geometry" | "number-theory" | "topology"
                        //   | "combinatorics" | "mathematical-physics" | "computer-science" | "ai-math" | "logic"
year: number            // Year of the definitive result (proof/disproof); for open problems, the origin year
shortDescription: string // 1 sentence shown on cards (~110 chars)
longDescription?: string // 2-5 sentences for the detail page; state the mechanism, not just intuition
vizComponent: string     // PascalCase component name, e.g. "UnitDistanceViz"
collections?: ProblemCollection[]  // "canonical" | "beautiful" | "frontier" | "unification" | "recent"
coordinates?: ProblemCoordinates   // { difficulty, beauty, visual, importance, activity, accessibility } each 1-10
consensusStatus?: ConsensusStatus  // "settled" | "active" | "emerging" | "watch"
lastReviewed?: string    // "YYYY-MM"
connections?: string[]   // Related theorem/concept names for discovery
```

- Use `status: "disproved"` when a conjecture is refuted; `"resolved"` for settled either-way;
  `"proved"` when the conjecture is confirmed.
- Use `field: "ai-math"` for AI-driven results (sits next to `alphaevolve-strassen`, `erdos-problem-1196`).

## longDescription

**Do**: name the mechanism. For recent AI/math results, **state the exact result and guard against
media conflation** (e.g. "disproves the conjectured bound" ≠ "solves the famous open problem").

Pattern: intuitive hook → precise statement → key mechanism → what is *still* open / generalization scope.

## authors: Author[]

```ts
{
  name: string;
  institution: string;     // where they were when they did the work
  avatarUrl?: string;      // "/people/<name>.<ext>" (person photo) or "/orgs/<name>.<ext>" (org logo)
  scholarUrl?: string;     // Google Scholar profile, or scholarSearch("Name terms")
  homepageUrl?: string;    // personal site (incl. github.io)
  twitterUrl?: string;     // https://x.com/handle
  linkedinUrl?: string;    // https://www.linkedin.com/in/...
  wikipediaUrl?: string;   // last-resort only; prefer the four above
}
```

- **Order: main contributors first**, historical figures (originator, prior-bound provers) last.
- **Avatars**: people → personal photo; a company/model entity author (e.g. "OpenAI reasoning model")
  → org logo. Download into `public/people/` or `public/orgs/` and reference a local path. Do NOT
  hotlink LinkedIn/Twitter CDN URLs (signed, expire ~weeks) — download them. Wikimedia
  (`upload.wikimedia.org`) is allowlisted in `next.config.ts` and stable.
- **Links** are rendered as brand logos (`author-card.tsx` + `brand-icons.tsx`). Populate what each
  person actually has; prefer Google Scholar, then the **Homepage** slot falls back
  personal-site → Scholar → Twitter/LinkedIn. Deceased/older mathematicians often only have a
  homepage at their institute (e.g. `renyi.hu/~p_erdos/`) — use it instead of Wikipedia.
- Correct diacritics always: "Erdős", "Szemerédi", "Poincaré".
- Verify social handles map to the right person (use the twitter/linkedin skills; check bio/affiliation).

## papers: Paper[]

```ts
{ title: string; arxivId?: string; url: string; year: number }
```

- 3-4 well-chosen references. Prefer primary sources: the proof PDF, arXiv preprint, DOI, and the
  problem's own catalogue (e.g. `erdosproblems.com/<n>`).
- For arXiv set both `arxivId: "2605.20695"` and `url: "https://arxiv.org/abs/2605.20695"`.
- `year` = publication year. Recent-year papers (2025/2026) are expected for frontier results.

## videos: Video[]

```ts
{ title: string; videoId: string; channel: string }
```

- 2-3 videos. `videoId` is the 11-char YouTube id. **Verify every id exists** via the oEmbed endpoint
  (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json`) — it also
  returns the canonical title + channel. Never invent ids.
- Prefer an official/primary video first, then accessible explainers from known math channels.

## timeline: TimelineEvent[]

```ts
{ year: number; month?: string; title: string; description?: string;
  type: "origin" | "progress" | "breakthrough" | "recognition" }
```

- 4-6 events covering origin → prior bounds → breakthrough → verification/recognition.
- `origin`: the problem is posed. `progress`: partial results / standing bounds.
  `breakthrough`: the proof/disproof. `recognition`: verification, prizes, explicit improvements.
- Be specific ("Spencer, Szemerédi & Trotter prove u(n)=O(n^4/3)" not "upper bound proved").

## formulas: ProblemFormula[]

```ts
{ label: string; latex: string; description?: string }
```

- 2-4 entries, inline in the problem object (there is **no** separate `coreFormulas` record).
- Use `String.raw` backticks: `latex: String.raw\`u(n)=\\max_{|P|=n}\\dots\``.
- Labels short + title case; descriptions ≤120 chars, plain English.
- For a disproof page, include both the **conjectured** bound and the **disproving** bound, plus the
  still-open bound — this is what keeps the framing honest.
