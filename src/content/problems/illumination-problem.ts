import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const illuminationProblem = defineProblem({
  slug: "illumination-problem",
  title: "Illumination Problem",
  status: "open",
  field: "geometry",
  year: 1957,
  shortDescription:
      "Ask how many directions are needed to illuminate every boundary point of a convex body.",
  longDescription:
      "Hadwiger's illumination conjecture asks for the minimum number of external directions (or, equivalently, smaller homothetic copies) needed to cover every boundary point of a convex body in n-dimensional space. The conjecture states that this number is at most 2^n, with equality if and only if the body is a parallelotope. Levi resolved the two-dimensional case in 1955, showing that four directions always suffice and only parallelograms require all four. In three dimensions, Prymak proved in 2023 that 14 translates suffice, still short of the conjectured 8; the general conjecture remains open for all n >= 3.",
  vizComponent: "IlluminationViz",
  collections: ["beautiful", "frontier"],
  coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 9,
      importance: 7,
      activity: 7,
      accessibility: 8,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Convex geometry", "Covering problems", "Discrete geometry"],
  authors: [
      {
        name: "Hugo Hadwiger",
        institution: "University of Bern",
        scholarUrl: scholarSearch("Hugo Hadwiger illumination problem"),
      },
      {
        name: "Vladimir Boltyansky",
        institution: "Moscow State University",
        scholarUrl: scholarSearch("Vladimir Boltyansky illumination problem"),
      },
    ],
  papers: [
      {
        title: "Illumination problem",
        url: "https://mathworld.wolfram.com/IlluminationProblem.html",
        year: 2026,
      },
      {
        title: "Illuminating and covering convex bodies",
        arxivId: "1308.0791",
        url: "https://arxiv.org/abs/1308.0791",
        year: 2013,
      },
      {
        title: "On lattice illumination of smooth convex bodies",
        arxivId: "2501.10570",
        url: "https://arxiv.org/abs/2501.10570",
        year: 2025,
      },
    ],
  timeline: [
      {
        year: 1957,
        title: "Hadwiger formulates the illumination conjecture",
        type: "origin",
      },
      {
        year: 1960,
        title:
          "Boltyansky proves equivalence to the covering number formulation",
        type: "progress",
      },
      {
        year: 1955,
        title:
          "Levi solves the 2D case: I(K) ≤ 4 with equality for parallelograms",
        type: "breakthrough",
      },
      {
        year: 2013,
        title:
          "Naszódi proves I(K) ≤ (2n choose n)(n ln n + n ln ln n + 5n) in high dimensions",
        type: "progress",
      },
      {
        year: 2023,
        title: "Prymak proves 14 translates suffice for any convex body in R³",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Illumination number",
      latex: String.raw`I(K)=\min\{m:\;\exists\,d_1,\dots,d_m\text{ s.t. every }p\in\partial K\text{ is illuminated by some }d_i\}`,
      description:
        "The fewest directions of light needed so that every boundary point of a convex body K receives light.",
    },
    {
      label: "Boltyanski–Hadwiger conjecture",
      latex: String.raw`I(K)\le 2^n\quad\text{for every convex body }K\subset\mathbb{R}^n,\quad\text{equality iff }K\text{ is a parallelepiped}`,
      description:
        "The conjecture bounds the illumination number by 2ⁿ, with equality for parallelepipeds (cubes, boxes) only.",
    },
    {
      label: "Levi–Hadwiger equivalence",
      latex: String.raw`I(K)=C(K)\quad\text{(covering number: min translates of }\operatorname{int}(K)\text{ covering }K\text{)}`,
      description:
        "The illumination number equals the minimum number of smaller homothetic copies of K needed to cover K.",
    },
  ]
});

export default illuminationProblem;
