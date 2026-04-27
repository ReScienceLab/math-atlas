import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const erdosProblem1196 = defineProblem({
  slug: "erdos-problem-1196",
  title: "Erdős Problem #1196",
  status: "proved",
  field: "ai-math",
  year: 2026,
  shortDescription:
    "GPT-5.4 Pro produced the key proof idea for a 1968 primitive-sets conjecture on the Erdős sum.",
  longDescription:
    "Erdős Problem #1196 asks whether every primitive set A whose elements are all at least x has Erdős sum at most 1 + o(1) as x tends to infinity. In April 2026, Liam Price prompted GPT-5.4 Pro on the problem; Kevin Barreto recognized the result and specialists on the Erdős Problems forum quickly refined and checked the argument. The decisive idea is to keep the problem on the integers: a von Mangoldt-weighted divisibility Markov chain, together with an adjoint hitting-probability bound, controls how often a primitive set can be hit. Tao, Lichtman, Sawin, Barreto, and others then recast the proof using an invariant weight governed by 1/zeta, yielding a clean bound with an explicit error term.",
  vizComponent: "Erdos1196Viz",
  collections: ["frontier", "recent", "unification"],
  coordinates: {
    difficulty: 8,
    beauty: 9,
    visual: 6,
    importance: 8,
    activity: 10,
    accessibility: 6,
  },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
    "Primitive sets",
    "Analytic number theory",
    "Divisibility posets",
    "Markov chains",
    "AI for math",
  ],
  authors: [
    {
      name: "Paul Erdős",
      institution: "Hungarian Academy of Sciences",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Paul_Erd%C5%91s",
    },
    {
      name: "András Sárközy",
      institution: "Eötvös Loránd University",
      scholarUrl: scholarSearch("Andras Sarkozy primitive sequences Erdos"),
    },
    {
      name: "Endre Szemerédi",
      institution: "Alfréd Rényi Institute of Mathematics",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Endre_Szemer%C3%A9di",
    },
    {
      name: "Liam Price",
      institution: "Independent",
      scholarUrl: scholarSearch("Liam Price Erdos Problem 1196"),
    },
    {
      name: "Kevin Barreto",
      institution: "University of Cambridge",
      scholarUrl: scholarSearch("Kevin Barreto Erdos Problem 1196"),
    },
    {
      name: "Jared Duker Lichtman",
      institution: "Stanford University",
      scholarUrl: "https://scholar.google.com/citations?user=dy84k0kAAAAJ",
      homepageUrl: "https://sites.google.com/view/jaredlichtman",
    },
    {
      name: "Terence Tao",
      institution: "UCLA",
      scholarUrl: "https://scholar.google.com/citations?user=HhoAHAoAAAAJ",
      homepageUrl: "https://www.math.ucla.edu/~tao/",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Terence_Tao",
    },
    {
      name: "Will Sawin",
      institution: "Columbia University",
      scholarUrl: scholarSearch("Will Sawin analytic number theory"),
    },
  ],
  papers: [
    {
      title: "Erdős Problem #1196 - Discussion thread",
      url: "https://www.erdosproblems.com/forum/thread/1196",
      year: 2026,
    },
    {
      title:
        "A note on Erdős Problem #1196: primitive sets, divisibility chains, and an invariant zeta-weight",
      url: "https://www.ulam.ai/research/erdos1196-note.pdf",
      year: 2026,
    },
    {
      title:
        "An amateur just solved a 60-year-old math problem - by asking AI",
      url: "https://www.scientificamerican.com/article/amateur-armed-with-chatgpt-vibe-maths-a-60-year-old-problem/",
      year: 2026,
    },
    {
      title: "A proof of the Erdős primitive set conjecture",
      arxivId: "2202.02384",
      url: "https://arxiv.org/abs/2202.02384",
      year: 2022,
    },
  ],
  timeline: [
    {
      year: 1935,
      title: "Erdős proves the Erdős sum is bounded for primitive sets",
      type: "progress",
    },
    {
      year: 1968,
      title: "Erdős, Sárközy, and Szemerédi pose the asymptotic question",
      type: "origin",
    },
    {
      year: 2022,
      title: "Lichtman proves the Erdős primitive set conjecture",
      type: "progress",
    },
    {
      year: 2026,
      month: "Apr",
      title: "Price obtains a GPT-5.4 Pro proof using von Mangoldt weights",
      description:
        "The first proof used a downward divisibility Markov chain n -> n/q with transition weight Lambda(q)/log n.",
      type: "breakthrough",
    },
    {
      year: 2026,
      month: "Apr",
      title: "Forum participants refine the proof via an invariant zeta-weight",
      description:
        "Tao, Lichtman, Sawin, Barreto, and others recast the argument as a clean hitting-probability proof.",
      type: "breakthrough",
    },
    {
      year: 2026,
      month: "Apr",
      title: "Erdős Problems marks #1196 proved",
      type: "recognition",
    },
  ],
  formulas: [
    {
      label: "Primitive set",
      latex: String.raw`A\subset\mathbb{N}\setminus\{1\},\quad a\ne b\in A\Longrightarrow a\nmid b`,
      description:
        "No element of the set divides another; the primes are the basic example.",
    },
    {
      label: "Erdős Problem #1196",
      latex: String.raw`\sup_{\substack{A\subset [x,\infty)\\ A\;\mathrm{primitive}}}\;\sum_{a\in A}\frac{1}{a\log a}=1+o(1)\qquad (x\to\infty)`,
      description:
        "The conjecture asks for the asymptotic upper bound of the Erdős sum once all elements of A are large.",
    },
    {
      label: "Von Mangoldt chain",
      latex: String.raw`n\longmapsto \frac{n}{q}\quad\text{with probability}\quad \frac{\Lambda(q)}{\log n}\qquad(q\mid n)`,
      description:
        "The identity sum_{q|n} Lambda(q) = log n makes this a natural downward divisibility chain on the integers.",
    },
    {
      label: "Refined bound",
      latex: String.raw`\sum_{a\in A}\frac{1}{a\log a}\le 1+\frac{2\gamma}{\log x}+O\!\left(\frac{1}{(\log x)^2}\right)`,
      description:
        "The zeta-weight reformulation gives an explicit sharpening of the asymptotic result.",
    },
  ],
});

export default erdosProblem1196;
