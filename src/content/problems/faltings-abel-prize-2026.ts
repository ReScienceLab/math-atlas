import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const faltingsAbelPrize2026 = defineProblem({
    slug: "faltings-abel-prize-2026",
    title: "Faltings Abel Prize 2026",
    status: "award",
    field: "number-theory",
    year: 2026,
    shortDescription:
      "Gerd Faltings received the 2026 Abel Prize for arithmetic geometry and long-standing Diophantine conjectures.",
    longDescription:
      "Gerd Faltings (born 1954) proved in 1983 that any algebraic curve of genus at least 2 defined over the rationals has only finitely many rational points, settling the Mordell conjecture that had been open since 1922. Subsequent simplifications came from Paul Vojta (1991) using Diophantine approximation and Enrico Bombieri (1990) with a more elementary variant. Faltings' broader contributions to arithmetic geometry, including the proof of the Mordell-Lang conjecture and the Tate conjecture for abelian varieties, earned him the Fields Medal in 1986 and the 2026 Abel Prize, cited for introducing powerful tools in arithmetic geometry and resolving long-standing Diophantine conjectures.",
    vizComponent: "FaltingsAbelViz",
    collections: ["canonical", "recent", "unification"],
    coordinates: {
      difficulty: 10,
      beauty: 9,
      visual: 7,
      importance: 10,
      activity: 6,
      accessibility: 5,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Arithmetic geometry",
      "Mordell conjecture",
      "Mordell-Lang",
      "Rational points",
    ],
    authors: [
      {
        name: "Gerd Faltings",
        institution: "Max Planck Institute for Mathematics",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Gerd_Faltings",
      },
      {
        name: "Paul Vojta",
        institution: "University of California, Berkeley",
        scholarUrl: scholarSearch(
          "Paul Vojta Diophantine approximation Mordell",
        ),
      },
      {
        name: "Enrico Bombieri",
        institution: "Institute for Advanced Study",
        scholarUrl: scholarSearch("Enrico Bombieri number theory Mordell"),
      },
    ],
    papers: [
      {
        title: "Gerd Faltings awarded the 2026 Abel Prize",
        url: "https://abelprize.no/?id=207",
        year: 2026,
      },
      {
        title: "Abel Prize 2026 press release",
        url: "https://abelprize.no/sites/default/files/2026-03/pressrelease_english__Abelprize%202026.pdf",
        year: 2026,
      },
      {
        title: "Endlichkeitssätze für abelsche Varietäten über Zahlkörpern",
        url: "https://doi.org/10.1007/BF01388432",
        year: 1983,
      },
    ],
    timeline: [
      {
        year: 1922,
        title: "Mordell formulates the rational-points conjecture",
        type: "origin",
      },
      {
        year: 1983,
        title: "Faltings proves the Mordell conjecture",
        type: "breakthrough",
      },
      {
        year: 1986,
        title: "Faltings receives the Fields Medal",
        type: "recognition",
      },
      {
        year: 1994,
        title:
          "Faltings returns to Germany and leads arithmetic geometry in Bonn",
        type: "recognition",
      },
      {
        year: 2026,
        month: "Mar",
        title: "Faltings is announced as Abel Prize laureate",
        type: "recognition",
      },
    ],
    formulas: [
    {
      label: "Mordell conjecture (Faltings 1983)",
      latex: String.raw`g(C)\ge 2,\; C/\mathbb{Q}\quad\Longrightarrow\quad |C(\mathbb{Q})|<\infty`,
      description:
        "A smooth projective curve of genus ≥ 2 over Q has only finitely many rational points.",
    },
    {
      label: "Faltings height bound",
      latex: String.raw`h_F(A)\le c(g,d,S)`,
      description:
        "Faltings bounded the height of abelian varieties with good reduction outside S, proving the Shafarevich and Tate conjectures.",
    },
    {
      label: "Tate conjecture for abelian varieties",
      latex: String.raw`\operatorname{Hom}(A,B)\otimes\mathbb{Z}_\ell \xrightarrow{\;\sim\;} \operatorname{Hom}_{G_K}(T_\ell A,\, T_\ell B)`,
      description:
        "The ℓ-adic Tate module functor is fully faithful — proved by Faltings as a key step toward Mordell.",
    },
  ],
});

export default faltingsAbelPrize2026;
