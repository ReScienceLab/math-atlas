import { defineProblem } from "@/lib/problem-template";

export const collatzConjecture = defineProblem({
  slug: "collatz-conjecture",
  title: "Collatz Conjecture",
  status: "open",
  field: "number-theory",
  year: 1937,
  shortDescription:
      "Repeatedly apply n/2 for even n and 3n+1 for odd n; every path should reach 1.",
  longDescription:
      "The Collatz conjecture, also known as the 3n+1 problem or the Syracuse problem, states that iterating the map T(n) = n/2 for even n and T(n) = 3n+1 for odd n will eventually reach the cycle 4 -> 2 -> 1 starting from any positive integer. Despite its elementary statement, Paul Erdos remarked that 'mathematics may not be ready for such problems.' In 2019, Terence Tao proved the strongest partial result to date: almost all orbits (in the sense of logarithmic density) attain almost bounded values. The conjecture has been computationally verified for all integers up to roughly 2.95 * 10^20.",
  vizComponent: "CollatzViz",
  collections: ["beautiful"],
  coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 9,
      importance: 6,
      activity: 8,
      accessibility: 10,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Iteration", "Dynamical systems", "Number theory"],
  authors: [
      {
        name: "Lothar Collatz",
        institution: "University of Hamburg",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Lothar_Collatz",
      },
      {
        name: "Terence Tao",
        institution: "UCLA",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Terence_Tao",
      },
      {
        name: "Jeffrey Lagarias",
        institution: "University of Michigan",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jeffrey_Lagarias",
      },
    ],
  papers: [
      {
        title:
          "Almost all orbits of the Collatz map attain almost bounded values",
        arxivId: "1909.03562",
        url: "https://arxiv.org/abs/1909.03562",
        year: 2019,
      },
      {
        title: "The 3x + 1 problem and its generalizations",
        url: "https://doi.org/10.1080/00029890.1985.11971528",
        year: 1985,
      },
      {
        title: "The Ultimate Challenge: The 3x+1 Problem",
        url: "https://bookstore.ams.org/mbk-78",
        year: 2010,
      },
    ],
  videos: [
    {
      title: "The Simplest Math Problem No One Can Solve",
      videoId: "094y1Z2wpJg",
      channel: "Veritasium",
    },
    {
      title: "UNCRACKABLE? The Collatz Conjecture - Numberphile",
      videoId: "5mFpVDpKX70",
      channel: "Numberphile",
    },
    {
      title: "Collatz Conjecture in Color - Numberphile",
      videoId: "LqKpkdRRLZw",
      channel: "Numberphile",
    },
  ],
  timeline: [
      {
        year: 1937,
        title: "Collatz circulates the problem",
        description:
          "Lothar Collatz, two years after his doctorate from the University of Berlin, begins sharing the iteration puzzle informally.",
        type: "origin",
      },
      {
        year: 1985,
        title: "Lagarias publishes the definitive survey",
        description:
          "His American Mathematical Monthly paper catalogs equivalences, partial results, and generalizations of the 3x+1 problem.",
        type: "progress",
      },
      {
        year: 2019,
        month: "Sep",
        title: "Tao proves an almost-all logarithmic-density result",
        description:
          "Almost all Collatz orbits attain almost bounded values, the strongest partial result known.",
        type: "breakthrough",
      },
      {
        year: 2022,
        title: "Tao's result published in Forum of Mathematics, Pi",
        description:
          "The peer-reviewed version appears as Forum Math. Pi 10:e12.",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Iteration rule",
      latex: String.raw`T(n)=\begin{cases}n/2 & n\equiv 0\pmod{2}\\3n+1 & n\equiv 1\pmod{2}\end{cases}`,
      description:
        "The Collatz map divides even numbers by 2 and sends odd numbers to 3n+1.",
    },
    {
      label: "Conjecture",
      latex: String.raw`\forall\, n\in\mathbb{Z}^{+},\quad \exists\, k:\; T^{(k)}(n)=1`,
      description:
        "Every positive integer eventually reaches 1 under repeated application of the Collatz map.",
    },
    {
      label: "Tao 2019",
      latex: String.raw`\lim_{N\to\infty}\frac{1}{\log N}\sum_{\substack{n\le N\\\inf T^{(k)}(n)\le f(n)}}\frac{1}{n}=1`,
      description:
        "Almost all orbits (in logarithmic density) attain values below any function f(n) that diverges to infinity.",
    },
  ]
});

export default collatzConjecture;
