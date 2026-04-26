import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const gaussCircleProblem = defineProblem({
  slug: "gauss-circle-problem",
  title: "Gauss Circle Problem",
  status: "open",
  field: "number-theory",
  year: 1837,
  shortDescription:
      "Estimate how many integer lattice points lie inside a circle of radius r.",
  longDescription:
      "The Gauss circle problem asks for the sharp error term when counting lattice points in a disk. The image is simple: the main term is area, and the hard part lives near the boundary.",
  vizComponent: "GaussCircleViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 9,
      importance: 7,
      activity: 8,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: [
      "Lattice points",
      "Analytic number theory",
      "Exponential sums",
    ],
  authors: [
      {
        name: "Carl Friedrich Gauss",
        institution: "University of Göttingen",
        scholarUrl: scholarSearch(
          "Carl Friedrich Gauss circle problem lattice points",
        ),
      },
      {
        name: "G. H. Hardy",
        institution: "University of Cambridge",
        scholarUrl: scholarSearch("G H Hardy lattice points circle"),
      },
      {
        name: "Martin Huxley",
        institution: "Cardiff University",
        scholarUrl: scholarSearch(
          "Martin Huxley lattice points exponential sums",
        ),
      },
    ],
  papers: [
      {
        title: "On the expression of a number as the sum of two squares",
        url: "https://doi.org/10.1093/qmath/os-46.1.263",
        year: 1915,
      },
      {
        title: "Exponential sums and lattice points III",
        url: "https://doi.org/10.1112/S0024611502013874",
        year: 2003,
      },
      {
        title:
          "Improvement on Gauss circle Problem and Dirichlet divisor Problem",
        arxivId: "2308.14859",
        url: "https://arxiv.org/abs/2308.14859",
        year: 2023,
      },
    ],
  videos: [
    {
      title: "Pi hiding in prime regularities",
      videoId: "NaL_Cb42WyY",
      channel: "3Blue1Brown",
    },
    {
      title: "Gauss Circle Problem",
      videoId: "RL606EweWGA",
      channel: "Prime Newtons",
    },
  ],
  timeline: [
      {
        year: 1837,
        title: "Gauss counts lattice points inside circles",
        type: "origin",
      },
      {
        year: 1906,
        title: "Sierpiński proves E(R) = O(R^{2/3})",
        type: "progress",
      },
      {
        year: 1915,
        title:
          "Hardy and Landau prove E(R) = Ω(R^{1/2}), establishing the lower bound",
        type: "breakthrough",
      },
      {
        year: 1963,
        title: "Iwaniec and Mozzochi improve the exponent toward 7/11",
        type: "progress",
      },
      {
        year: 2003,
        title: "Huxley proves E(R) = O(R^{131/208}), the current best bound",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Lattice point count",
      latex: String.raw`N(R)=\#\{(m,n)\in\mathbb{Z}^2: m^2+n^2\le R^2\}=\pi R^2+E(R)`,
      description:
        "Count lattice points inside a circle of radius R; the error E(R) is the central object of study.",
    },
    {
      label: "Hardy conjecture",
      latex: String.raw`E(R)=O\bigl(R^{1/2+\varepsilon}\bigr)\quad\forall\,\varepsilon>0`,
      description:
        "Hardy and Landau conjectured the optimal error exponent is 1/2 — the trivial bound is O(R) and the best known is 131/208.",
    },
    {
      label: "Best known bound (Huxley 2000)",
      latex: String.raw`E(R)=O\bigl(R^{131/208}\bigr),\qquad \tfrac{131}{208}\approx 0.6298`,
      description:
        "Huxley's exponential-sum estimate gives the best unconditional bound, still far from the conjectured exponent 1/2.",
    },
  ]
});

export default gaussCircleProblem;
