# Research Checklist

What to collect and verify when researching a math problem for Math Atlas.

## Formal statement

- [ ] LaTeX for the main theorem (use `String.raw` backtick syntax)
- [ ] Generalized form if it exists (e.g. S² → S²ⁿ, D² → Dⁿ)
- [ ] Conditions stated precisely (continuous, compact, etc.)
- [ ] 1-2 equivalent formulations or key corollaries

## Related theorems (pick 1-2)

- [ ] The "engine" theorem that drives the result (e.g. Poincaré-Hopf, Lefschetz)
- [ ] A structural invariant that governs it (e.g. Euler characteristic, degree)
- [ ] LaTeX for each, with a one-line plain-English description

## Historical timeline

Collect 4-6 events. For each, verify:

- [ ] Exact year (publication year, not "around" or "circa")
- [ ] Who did it and what exactly they proved
- [ ] The paper title and journal (for key entries)

Typical arc: early ideas → first proof → generalization → alternative proof → major application

## Authors

- [ ] Original prover(s) — with correct accent marks (Poincaré, not Poincare)
- [ ] Key generalisers (e.g. Hopf generalizing Poincaré's index theorem)
- [ ] Institution at the time of their contribution
- [ ] Scholar URL via `scholarSearch("Name key terms")`

## Papers (3 references)

Select for coverage, not volume:

1. **Original proof** — prefer DOI link (doi.org/10.xxx)
2. **Landmark alternative proof or generalization** — prefer DOI or arXiv
3. **Modern accessible treatment** — can be arXiv survey or textbook-adjacent paper

Avoid: encyclopedia links (MathWorld, Wikipedia), papers with year "2026", unrelated application papers.

## Verification sources

Use web search to cross-check:
- Exact publication year vs. "result obtained" year
- Author name spelling and diacritics
- Whether the paper DOI resolves correctly
- That the LaTeX compiles (check cases, subscripts, operators)

## Common pitfalls

- Brouwer's 1911 paper is often cited as 1910 or 1912 — check the Annalen volume
- Poincaré proved the hairy ball theorem for S², not just conjectured it
- Many "year" fields should be the proof publication year, not the conjecture year
- Don't list someone as author if they only conjectured, not proved
