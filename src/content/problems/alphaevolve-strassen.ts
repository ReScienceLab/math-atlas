import { defineProblem } from "@/lib/problem-template";

export const alphaevolveStrassen = defineProblem({
  slug: "alphaevolve-strassen",
  title: "AlphaEvolve \u00d7 Strassen",
  status: "resolved",
  field: "ai-math",
  year: 2025,
  shortDescription:
      "AI broke Strassen's 56-year record for 4\u00d74 matrix multiplication: 48 vs 49 scalar ops.",
  longDescription:
      "Matrix multiplication is the most fundamental operation in computing. Strassen (1969) showed 7 multiplications suffice for 2\u00d72 (not 8), giving O(n^2.807). Applied recursively to 4\u00d74, this gives 49. AlphaEvolve found a scheme using only 48 \u2014 the first improvement in 56 years.",
  vizComponent: "AlphaEvolveViz",
  collections: ["frontier", "recent"],
  coordinates: {
      difficulty: 8,
      beauty: 7,
      visual: 7,
      importance: 8,
      activity: 10,
      accessibility: 7,
    },
  consensusStatus: "watch",
  lastReviewed: "2026-04",
  connections: [
      "Matrix multiplication",
      "Computational complexity",
      "AI for math",
    ],
  authors: [
      {
        name: "Alexander Novikov",
        institution: "Google DeepMind",
        scholarUrl: "https://scholar.google.com/citations?user=jMUkLqwAAAAJ",
      },
      {
        name: "Matej Balog",
        institution: "Google DeepMind",
        scholarUrl: "https://scholar.google.com/citations?user=5pF1dBwAAAAJ",
        homepageUrl: "https://matejbalog.eu/en/",
      },
      {
        name: "Pushmeet Kohli",
        institution: "Google DeepMind (VP Science)",
        scholarUrl: "https://scholar.google.com/citations?user=3pyzQQ8AAAAJ",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Pushmeet_Kohli",
      },
    ],
  papers: [
      {
        title:
          "AlphaEvolve: A coding agent for scientific and algorithmic discovery",
        arxivId: "2506.13131",
        url: "https://arxiv.org/abs/2506.13131",
        year: 2025,
      },
      {
        title: "Gaussian elimination is not optimal",
        url: "https://doi.org/10.1007/BF02165411",
        year: 1969,
      },
      {
        title:
          "Discovering faster matrix multiplication algorithms with reinforcement learning",
        url: "https://doi.org/10.1038/s41586-022-05172-4",
        year: 2022,
      },
    ],
  timeline: [
      {
        year: 1969,
        title: "Strassen: 2\u00d72 in 7 multiplications (not 8)",
        type: "origin",
      },
      {
        year: 1969,
        title: "Recursive application: 4\u00d74 in 49 multiplications",
        type: "progress",
      },
      {
        year: 2022,
        title: "AlphaTensor finds improvements for larger matrices",
        type: "progress",
      },
      {
        year: 2025,
        month: "May",
        title: "AlphaEvolve: 4\u00d74 complex in 48 multiplications",
        type: "breakthrough",
      },
      {
        year: 2026,
        month: "Mar",
        title: "Tao: 'AI is ready for primetime in math'",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Strassen's algorithm",
      latex: String.raw`M(2,2,2)=7\quad\bigl(\text{vs.}\ 8\text{ classical}\bigr)`,
      description:
        "Strassen (1969) showed 2×2 matrix multiplication needs only 7 scalar multiplications, launching fast matrix multiplication.",
    },
    {
      label: "AlphaEvolve discovery",
      latex: String.raw`M^{\mathbb{C}}(4,4,4)\le 48\quad\bigl(\text{vs. Strassen's }49\bigr)`,
      description:
        "DeepMind's AlphaEvolve found an algorithm for 4×4 complex matrix multiplication using 48 multiplications, beating 49.",
    },
    {
      label: "Matrix multiplication exponent",
      latex: String.raw`M(n,n,n)=O(n^\omega),\qquad 2\le\omega< 2.372`,
      description:
        "The exponent ω is the infimum such that n×n matrices can be multiplied in O(nω) operations; ω = 2 is conjectured.",
    },
  ]
});

export default alphaevolveStrassen;
