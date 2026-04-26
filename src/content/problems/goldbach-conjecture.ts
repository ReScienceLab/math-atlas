import { defineProblem } from "@/lib/problem-template";

export const goldbachConjecture = defineProblem({
  slug: "goldbach-conjecture",
  title: "Goldbach's Conjecture",
  status: "open",
  field: "number-theory",
  year: 1742,
  shortDescription:
      "Every even integer greater than 2 should be expressible as a sum of two primes.",
  longDescription:
      "Goldbach's conjecture originated in a June 7, 1742 letter from Christian Goldbach to Leonhard Euler. In its modern form, it asserts that every even integer greater than 2 is the sum of two primes. The weak (ternary) version -- every odd integer greater than 5 is the sum of three primes -- was proved by Harald Helfgott in 2013. Chen Jingrun's 1966 theorem showed every sufficiently large even integer is the sum of a prime and a product of at most two primes. The strong conjecture has been computationally verified for all even integers up to 4 * 10^18 by Oliveira e Silva.",
  vizComponent: "GoldbachViz",
  collections: ["beautiful"],
  coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 8,
      importance: 8,
      activity: 7,
      accessibility: 10,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Primes", "Additive number theory", "Sieve methods"],
  authors: [
      {
        name: "Christian Goldbach",
        institution: "St. Petersburg Academy",
      },
      {
        name: "Harald Helfgott",
        institution: "CNRS / Institut de Mathematiques de Jussieu",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Harald_Helfgott",
      },
      {
        name: "Chen Jingrun",
        institution: "Chinese Academy of Sciences",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Chen_Jingrun",
      },
    ],
  papers: [
      {
        title: "The ternary Goldbach conjecture is true",
        arxivId: "1312.7748",
        url: "https://arxiv.org/abs/1312.7748",
        year: 2013,
      },
      {
        title: "Major arcs for Goldbach's problem",
        arxivId: "1305.2897",
        url: "https://arxiv.org/abs/1305.2897",
        year: 2013,
      },
      {
        title:
          "On the representation of a large even integer as the sum of a prime and the product of at most two primes",
        url: "https://doi.org/10.1007/BF02785357",
        year: 1973,
      },
    ],
  timeline: [
      {
        year: 1742,
        month: "Jun",
        title: "Goldbach writes to Euler proposing the conjecture",
        description:
          "In letter XLIII dated June 7, 1742, Goldbach conjectures that every integer greater than 2 is the sum of three primes. Euler reformulates it into the modern binary form.",
        type: "origin",
      },
      {
        year: 1937,
        title:
          "Vinogradov proves the weak conjecture for sufficiently large odd numbers",
        description:
          "Using the circle method, Vinogradov eliminates the need for GRH but leaves the threshold uncomputed.",
        type: "progress",
      },
      {
        year: 1966,
        title: "Chen Jingrun proves his landmark sieve result",
        description:
          "Every sufficiently large even integer is the sum of a prime and a number with at most two prime factors.",
        type: "breakthrough",
      },
      {
        year: 2013,
        month: "May",
        title: "Helfgott proves the weak Goldbach conjecture in full",
        description:
          "Using refined circle method estimates, he shows every odd integer greater than 5 is the sum of three primes, with no 'sufficiently large' qualifier.",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Strong conjecture",
      latex: String.raw`\forall\, n\ge 2,\quad 2n = p + q\qquad (p,q\text{ prime})`,
      description:
        "Every even integer greater than 2 can be written as the sum of two primes.",
    },
    {
      label: "Weak (ternary) conjecture (proved 2013)",
      latex: String.raw`\forall\text{ odd } m > 5,\quad m = p_1 + p_2 + p_3\qquad (p_i\text{ prime})`,
      description:
        "Every odd integer greater than 5 is the sum of three primes. Proved by Helfgott in 2013.",
    },
    {
      label: "Chen's theorem (1966)",
      latex: String.raw`2n = p + q,\quad q\text{ prime or }q = p_1 p_2\quad\text{for all large }n`,
      description:
        "Every sufficiently large even integer is the sum of a prime and a number with at most two prime factors.",
    },
  ]
});

export default goldbachConjecture;
