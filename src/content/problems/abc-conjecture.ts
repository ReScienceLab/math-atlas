import { defineProblem } from "@/lib/problem-template";

export const abcConjecture = defineProblem({
  slug: "abc-conjecture",
  title: "abc Conjecture",
  status: "open",
  field: "number-theory",
  year: 1985,
  shortDescription:
      "Controls how often a + b = c can have c much larger than the radical of abc.",
  longDescription:
      "The abc conjecture, formulated independently by Joseph Oesterle and David Masser in 1985, states that for coprime positive integers with a + b = c, the value of c is almost always bounded by a power of the radical rad(abc) -- the product of distinct prime factors of abc. Despite its compact statement, it implies Fermat's Last Theorem for sufficiently large exponents, the Mordell conjecture, and many other deep results. In August 2012, Shinichi Mochizuki of Kyoto University released a claimed proof via inter-universal Teichmuller theory; however, after Peter Scholze and Jakob Stix identified a disputed step in 2018, the mathematical community remains unconvinced.",
  vizComponent: "AbcViz",
  collections: ["canonical", "unification"],
  coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 5,
      importance: 9,
      activity: 8,
      accessibility: 4,
    },
  consensusStatus: "watch",
  lastReviewed: "2026-04",
  connections: ["Diophantine equations", "Elliptic curves", "Number theory"],
  authors: [
      {
        name: "Joseph Oesterle",
        institution: "Universite Pierre et Marie Curie",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Joseph_Oesterl%C3%A9",
      },
      {
        name: "David Masser",
        institution: "University of Basel",
        wikipediaUrl: "https://en.wikipedia.org/wiki/David_Masser",
      },
      {
        name: "Shinichi Mochizuki",
        institution: "Kyoto University (RIMS)",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Shinichi_Mochizuki",
      },
    ],
  papers: [
      {
        title: "ABC implies Mordell",
        url: "https://doi.org/10.1007/BF01389043",
        year: 1988,
      },
      {
        title:
          "Inter-universal Teichmuller Theory I: Construction of Hodge Theaters",
        url: "https://doi.org/10.4171/PRIMS/57-1-1",
        year: 2021,
      },
      {
        title: "Why abc is still a conjecture (Scholze-Stix report)",
        url: "https://www.math.uni-bonn.de/people/scholze/WhyABCisStillaConjecture.pdf",
        year: 2018,
      },
    ],
  videos: [
    {
      title: "abc Conjecture - Numberphile",
      videoId: "RkBl7WKzzRw",
      channel: "Numberphile",
    },
    {
      title: "The abc conjecture",
      videoId: "PJg1Yo9j6PE",
      channel: "discovermaths",
    },
    {
      title: "The latest two chapters of ABC Conjecture drama",
      videoId: "Rn13v-tgJWE",
      channel: "Numberphile",
    },
  ],
  timeline: [
      {
        year: 1985,
        title: "Oesterle and Masser formulate the abc conjecture",
        description:
          "Arising from discussions about the Szpiro conjecture on elliptic curves, they propose a bound on c in terms of rad(abc).",
        type: "origin",
      },
      {
        year: 1988,
        title: "Elkies proves abc implies Mordell (Faltings' theorem)",
        description:
          "Demonstrates the sweeping power of abc: it would give a new proof that curves of genus >= 2 have finitely many rational points.",
        type: "progress",
      },
      {
        year: 2012,
        month: "Aug",
        title: "Mochizuki releases four IUT preprints claiming a proof",
        description:
          "Shinichi Mochizuki at RIMS, Kyoto posts ~500 pages of inter-universal Teichmuller theory.",
        type: "progress",
      },
      {
        year: 2018,
        title: "Scholze and Stix identify a disputed step in Corollary 3.12",
        description:
          "Peter Scholze (Bonn) and Jakob Stix (Frankfurt) publish a report arguing the proof has a gap that Mochizuki has not resolved.",
        type: "progress",
      },
      {
        year: 2021,
        month: "Mar",
        title: "IUT papers published in PRIMS despite ongoing dispute",
        description:
          "Publications of RIMS publishes the papers, but broad mathematical consensus remains that the proof is incomplete.",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "abc inequality",
      latex: String.raw`\gcd(a,b)=1,\; a+b=c \quad\Longrightarrow\quad c \le C_\varepsilon\cdot\operatorname{rad}(abc)^{1+\varepsilon}`,
      description:
        "For every epsilon > 0 there are only finitely many coprime triples (a,b,c) with a+b=c violating this bound.",
    },
    {
      label: "Radical",
      latex: String.raw`\operatorname{rad}(n) = \prod_{p\mid n} p`,
      description:
        "The radical of n is the product of its distinct prime factors, stripping away all repeated factors.",
    },
    {
      label: "Implication for Fermat",
      latex: String.raw`x^n + y^n = z^n,\; n\ge 6 \quad\Longrightarrow\quad \text{no solution (via abc)}`,
      description:
        "The abc conjecture implies Fermat's Last Theorem for all exponents n >= 6, illustrating its sweeping power.",
    },
  ]
});

export default abcConjecture;
