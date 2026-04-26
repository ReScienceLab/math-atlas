import { defineProblem } from "@/lib/problem-template";

export const riemannHypothesis = defineProblem({
  slug: "riemann-hypothesis",
  title: "Riemann Hypothesis",
  status: "open",
  field: "number-theory",
  year: 1859,
  shortDescription:
      "All nontrivial zeros of the zeta function should lie on the critical line Re(s) = 1/2.",
  longDescription:
      "The Riemann Hypothesis asserts that every nontrivial zero of the analytic continuation of the Riemann zeta function has real part exactly 1/2. It is the central open problem in analytic number theory because it controls the error term in the prime-counting function: if true, the deviation of pi(x) from the logarithmic integral li(x) is at most of order sqrt(x) log x. Listed as the eighth of Hilbert's 1900 problems and one of the seven Clay Millennium Prize Problems, it connects to random matrix theory, quantum chaos, and the explicit distribution of primes through Riemann's 1859 explicit formula.",
  vizComponent: "RiemannViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 8,
      importance: 10,
      activity: 10,
      accessibility: 6,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Prime numbers", "Zeta function", "Random matrices"],
  authors: [
      {
        name: "Bernhard Riemann",
        institution: "University of Gottingen",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Bernhard_Riemann",
      },
      {
        name: "Jacques Hadamard",
        institution: "College de France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jacques_Hadamard",
      },
      {
        name: "Charles de la Vallee-Poussin",
        institution: "Catholic University of Louvain",
        wikipediaUrl:
          "https://en.wikipedia.org/wiki/Charles_Jean_de_la_Vall%C3%A9e-Poussin",
      },
    ],
  papers: [
      {
        title: "Ueber die Anzahl der Primzahlen unter einer gegebenen Grosse",
        url: "https://www.claymath.org/millennium/riemann-hypothesis/",
        year: 1859,
      },
      {
        title:
          "Recherches sur la distribution des diviseurs d'un nombre entier",
        url: "https://doi.org/10.24033/bsmf.545",
        year: 1896,
      },
      {
        title:
          "The 10^13 first zeros of the Riemann zeta function, and zeros computation at very large height",
        arxivId: "math/0402335",
        url: "https://arxiv.org/abs/math/0402335",
        year: 2004,
      },
    ],
  videos: [
    {
      title: "Visualizing the Riemann zeta function and analytic continuation",
      videoId: "sD0NjbwqlYw",
      channel: "3Blue1Brown",
    },
    {
      title: "Riemann Hypothesis - Numberphile",
      videoId: "d6c6uIyieoo",
      channel: "Numberphile",
    },
    {
      title: "The Riemann Hypothesis, Explained",
      videoId: "zlm1aajH6gY",
      channel: "Quanta Magazine",
    },
  ],
  timeline: [
      {
        year: 1859,
        title:
          "Riemann formulates the hypothesis in his only number-theory paper",
        description:
          "Published in the Monatsberichte der Preussischen Akademie der Wissenschaften, connecting zeros of zeta to primes.",
        type: "origin",
      },
      {
        year: 1896,
        title:
          "Hadamard and de la Vallee-Poussin independently prove the Prime Number Theorem",
        description:
          "They showed pi(x) ~ x / ln x by proving zeta has no zeros on the line Re(s) = 1.",
        type: "breakthrough",
      },
      {
        year: 1900,
        title: "Hilbert lists it as Problem 8",
        description:
          "The hypothesis appears among 23 problems presented at the International Congress of Mathematicians in Paris.",
        type: "recognition",
      },
      {
        year: 1989,
        title: "Conrey proves over 40% of zeros lie on the critical line",
        description:
          "Refinement of the Hardy-Littlewood-Selberg approach gave the first proportion exceeding two-fifths.",
        type: "progress",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem ($1 million)",
        type: "recognition",
      },
      {
        year: 2004,
        title:
          "Gourdon verifies the first 10^13 nontrivial zeros computationally",
        description:
          "All lie on the critical line, providing overwhelming numerical evidence.",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Hypothesis",
      latex: String.raw`\zeta(s)=0,\ 0<\operatorname{Re}(s)<1\quad\Longrightarrow\quad \operatorname{Re}(s)=\tfrac{1}{2}`,
      description:
        "All nontrivial zeros of the Riemann zeta function should lie on the critical line Re(s) = 1/2.",
    },
    {
      label: "Zeta function (Euler product)",
      latex: String.raw`\zeta(s)=\sum_{n=1}^{\infty}\frac{1}{n^s}=\prod_{p\text{ prime}}\frac{1}{1-p^{-s}},\qquad \operatorname{Re}(s)>1`,
      description:
        "The Euler product connects the zeta function directly to the prime numbers, linking analysis to arithmetic.",
    },
    {
      label: "Prime counting error",
      latex: String.raw`\pi(x)=\operatorname{Li}(x)+O\!\left(\sqrt{x}\,\log x\right)\quad\text{(assuming RH)}`,
      description:
        "If the Riemann Hypothesis is true, the prime counting function pi(x) deviates from the logarithmic integral by at most order sqrt(x) log x.",
    },
  ]
});

export default riemannHypothesis;
