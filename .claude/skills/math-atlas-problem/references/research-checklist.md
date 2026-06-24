# Research Checklist

What to collect and verify when researching a math problem for Math Atlas.

## Formal statement

- [ ] LaTeX for the main theorem/problem (use `String.raw` backtick syntax)
- [ ] Generalized or equivalent forms (1-2)
- [ ] Conditions stated precisely (continuous, compact, planar, etc.)
- [ ] For a disproof: the **conjectured** bound, the **disproving** bound, and the **still-open** bound

## Related quantities (pick 1-2)

- [ ] The "engine" theorem/quantity that drives the result
- [ ] A structural invariant or contrasting bound that governs it
- [ ] LaTeX for each, with a one-line plain-English description

## Historical timeline (4-6 events)

- [ ] Exact year (publication year, not "around"/"circa"); `month` for recent events
- [ ] Who did it and what *exactly* they proved
- [ ] Paper title / venue for key entries
- [ ] Arc: origin → standing bounds/partial progress → breakthrough → verification/recognition

## Authors

- [ ] Originator(s), the prover/disprover, and key verifiers/generalisers — correct diacritics
- [ ] Institution at the time of the contribution
- [ ] **Order: main contributors first**, historical figures last
- [ ] Per person, collect links (prefer Scholar; Homepage falls back to Scholar → Twitter/LinkedIn):
  - [ ] `homepageUrl` — personal/academic site (incl. github.io, institute pages like `renyi.hu/~name`)
  - [ ] `scholarUrl` — Google Scholar profile, or `scholarSearch("Name terms")`
  - [ ] `twitterUrl` / `linkedinUrl` — **verify the handle is the right person** (check bio/affiliation
        via the twitter/linkedin skills; beware common-name collisions)
- [ ] Avatar source per contributor:
  - [ ] **Person** → personal photo (Wikipedia/Wikimedia lead image, institutional headshot, homepage,
        or verified X avatar). Download to `public/people/<name>.<ext>`.
  - [ ] **Company/model entity** (e.g. "OpenAI reasoning model") → org logo. Download to `public/orgs/`.
  - [ ] Never hotlink LinkedIn/Twitter CDN URLs (signed, expire) — download the bytes.

## Papers (3-4)

Select for coverage, not volume:

1. **Primary source** — the proof/disproof PDF or arXiv preprint (set both `arxivId` and `url`)
2. **Verification / landmark companion** — DOI or arXiv
3. **The problem's catalogue or a standing-bound paper** — e.g. `erdosproblems.com/<n>`

Recent-year papers (2025/2026) are expected for frontier results — do **not** filter them out.
Avoid encyclopedia links (MathWorld/Wikipedia) as *papers* (Wikipedia may still be an author link).

## Videos (2-3)

- [ ] Find an official/primary video plus accessible explainers from known math channels
- [ ] **Verify each `videoId`** with the YouTube oEmbed endpoint
      (`.../oembed?url=https://www.youtube.com/watch?v=<id>&format=json`) — returns 200 + exact
      title + channel. Use the returned values; never invent ids.

## Verification sources

Cross-check with web search + primary sources:
- Exact publication year vs. "result obtained" year
- Author name spelling and diacritics
- DOI / arXiv / homepage URLs resolve (curl 200)
- LaTeX compiles (cases, subscripts, operators)
- For recent AI/math news: the **exact** problem settled vs. media conflation (read arXiv / the proof
  PDF / the problem's catalogue, not just headlines)

## Common pitfalls

- Media headlines conflate "disproved the conjectured bound" with "solved the famous open problem" —
  state precisely what was settled and what remains open.
- The breakthrough's `year` is the proof/disproof year; the problem's origin goes in the timeline.
- Don't list someone as a contributor if they only posed the problem (put them in the timeline + as a
  historical author, ordered last).
- Don't attribute a result to a specific model version unless it's officially disclosed.
