import { defineProblem } from "@/lib/problem-template";

export const twinPrimeConjecture = defineProblem({
  slug: "twin-prime-conjecture",
  title: "Twin Prime Conjecture",
  status: "partial",
  field: "number-theory",
  year: 1849,
  shortDescription:
      "Predicts infinitely many prime pairs separated by 2, such as 11 and 13.",
  longDescription:
      "The twin prime conjecture asserts that there are infinitely many primes p such that p + 2 is also prime. In 2013, Yitang Zhang stunned the mathematical world by proving that there are infinitely many pairs of primes differing by at most 70 million, the first finite bound ever established. James Maynard independently improved the bound later that year using a different sieve method, and the collaborative Polymath 8b project subsequently reduced the gap to 246, where it currently stands. The Hardy-Littlewood conjecture predicts the precise asymptotic density of twin primes via the twin prime constant C_2 = 0.6601...",
  vizComponent: "TwinPrimeViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 8,
      importance: 8,
      activity: 9,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Prime gaps", "Sieve methods", "Additive combinatorics"],
  authors: [
      {
        name: "Yitang Zhang",
        institution: "University of New Hampshire",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Yitang_Zhang",
      },
      {
        name: "James Maynard",
        institution: "University of Oxford",
        wikipediaUrl:
          "https://en.wikipedia.org/wiki/James_Maynard_(mathematician)",
      },
      {
        name: "Alphonse de Polignac",
        institution: "France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Alphonse_de_Polignac",
      },
    ],
  papers: [
      {
        title: "Bounded gaps between primes",
        arxivId: "1305.4726",
        url: "https://doi.org/10.4007/annals.2014.179.3.7",
        year: 2014,
      },
      {
        title: "Small gaps between primes",
        url: "https://doi.org/10.4007/annals.2015.181.1.7",
        year: 2015,
      },
      {
        title:
          "Variants of the Selberg sieve, and bounded intervals containing many primes",
        arxivId: "1407.4897",
        url: "https://arxiv.org/abs/1407.4897",
        year: 2014,
      },
    ],
  timeline: [
      {
        year: 1849,
        title: "Polignac proposes a broad prime gaps conjecture",
        description:
          "He conjectures that for every even k, there are infinitely many consecutive prime pairs differing by k.",
        type: "origin",
      },
      {
        year: 1915,
        title: "Brun proves the sum of reciprocals of twin primes converges",
        description:
          "Brun's theorem shows that even if twin primes are infinite, they are sparse enough for their reciprocal series to converge (Brun's constant ~ 1.902).",
        type: "progress",
      },
      {
        year: 2013,
        month: "Apr",
        title: "Zhang proves bounded gaps between primes (gap < 70 million)",
        description:
          "Yitang Zhang, a lecturer at the University of New Hampshire, establishes the first finite bound on prime gaps.",
        type: "breakthrough",
      },
      {
        year: 2013,
        month: "Nov",
        title: "Maynard independently improves the bound using a new sieve",
        description:
          "James Maynard at Oxford obtains a simpler proof with a much smaller gap bound. He later receives the 2022 Fields Medal.",
        type: "breakthrough",
      },
      {
        year: 2014,
        title: "Polymath 8b reduces the bound to 246",
        description:
          "The collaborative Polymath project, combining Zhang's and Maynard's techniques, achieves the current best bound of H = 246.",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Conjecture",
      latex: String.raw`\#\{p \le x : p\text{ and }p+2\text{ both prime}\} = \infty`,
      description:
        "There are infinitely many primes p such that p + 2 is also prime.",
    },
    {
      label: "Hardy-Littlewood asymptotic",
      latex: String.raw`\pi_2(x) \sim 2C_2 \int_2^x \frac{dt}{(\ln t)^2},\qquad C_2 = \prod_{p\ge 3}\left(1-\frac{1}{(p-1)^2}\right) \approx 0.6601`,
      description:
        "The first Hardy-Littlewood conjecture predicts the asymptotic count of twin primes using the twin prime constant.",
    },
    {
      label: "Current best bound (Polymath 8b)",
      latex: String.raw`\liminf_{n\to\infty}(p_{n+1}-p_n) \le 246`,
      description:
        "There are infinitely many pairs of consecutive primes differing by at most 246. Gap 2 (the twin prime case) remains open.",
    },
  ]
});

export default twinPrimeConjecture;
