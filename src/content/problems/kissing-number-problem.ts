import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const kissingNumberProblem = defineProblem({
  slug: "kissing-number-problem",
  title: "Kissing Number Problem",
  status: "partial",
  field: "geometry",
  year: 1694,
  shortDescription:
      "Ask how many equal spheres can touch one equal sphere without overlap.",
  longDescription:
      "The kissing number problem is solved in several dimensions, including the famous 3D answer of 12, but remains open in many dimensions. It is a compact visual gateway into high-dimensional geometry.",
  vizComponent: "KissingNumberViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 7,
      activity: 7,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Sphere packing", "Lattices", "Coding theory"],
  authors: [
      { name: "Isaac Newton", institution: "Royal Society" },
      { name: "David Gregory", institution: "University of Oxford" },
      {
        name: "Kurt Schutte",
        institution: "University of Munich",
        scholarUrl: scholarSearch("Kurt Schutte kissing number sphere packing"),
      },
      {
        name: "Vladimir Levenshtein",
        institution: "Keldysh Institute, Moscow",
        scholarUrl: scholarSearch(
          "Vladimir Levenshtein bounds kissing numbers",
        ),
      },
    ],
  papers: [
      {
        title: "The kissing number in four dimensions",
        arxivId: "math/0309430",
        url: "https://arxiv.org/abs/math/0309430",
        year: 2003,
      },
      {
        title: "Das Problem der dreizehn Kugeln",
        url: "https://doi.org/10.1007/BF01343156",
        year: 1953,
      },
      {
        title: "The kissing number in four dimensions",
        url: "https://doi.org/10.4007/annals.2008.168.1",
        year: 2008,
      },
    ],
  videos: [
    {
      title: "Kissing Numbers - Numberphile",
      videoId: "LZ7X_YOfJqY",
      channel: "Numberphile",
    },
  ],
  timeline: [
      {
        year: 1694,
        title: "Newton vs Gregory dispute: is the 3D kissing number 12 or 13?",
        type: "origin",
      },
      {
        year: 1953,
        title: "Schutte and van der Waerden prove the 3D kissing number is 12",
        type: "breakthrough",
      },
      {
        year: 1979,
        title:
          "Levenshtein, Odlyzko, and Sloane prove kissing numbers in dimensions 8 and 24",
        type: "breakthrough",
      },
      {
        year: 2003,
        title: "Musin gives a new proof that the 4D kissing number is 24",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Kissing number",
      latex: String.raw`\tau(n)=\max\{m:\;\exists\,u_1,\dots,u_m\in S^{n-1},\;\langle u_i,u_j\rangle\le\tfrac{1}{2}\;\forall\,i\ne j\}`,
      description:
        "The maximum number of non-overlapping unit spheres that can simultaneously touch one central unit sphere in Rⁿ.",
    },
    {
      label: "Known exact values",
      latex: String.raw`\tau(1)=2,\quad\tau(2)=6,\quad\tau(3)=12,\quad\tau(4)=24,\quad\tau(8)=240,\quad\tau(24)=196\,560`,
      description:
        "Exact values are known only in dimensions 1–4, 8, and 24. The τ(3) = 12 case settled Newton vs. Gregory (1694).",
    },
    {
      label: "Delsarte LP bound",
      latex: String.raw`\tau(n)\le\max\Bigl\{\sum_i f_i: f\ge 0,\;\hat{f}(k)\le 0\;(k\ge 1),\;f(\cos\theta)\le 0\;(\theta<60°)\Bigr\}`,
      description:
        "Linear programming bounds on spherical codes — tight in dimensions 8 and 24, yielding the exact kissing numbers.",
    },
  ]
});

export default kissingNumberProblem;
