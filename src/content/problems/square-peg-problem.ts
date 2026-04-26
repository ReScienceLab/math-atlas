import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const squarePegProblem = defineProblem({
  slug: "square-peg-problem",
  title: "Square Peg Problem",
  status: "open",
  field: "geometry",
  year: 1911,
  shortDescription:
      "Every simple closed curve in the plane is conjectured to contain four vertices of a square.",
  longDescription:
      "Draw any closed loop on paper — no matter how wild. Can you always find four points on it forming a perfect square? Toeplitz conjectured yes in 1911, and partial results cover convex, smooth, and piecewise-linear curves. The most dramatic recent progress came from Greene and Lobb (2021), who used symplectic geometry — Möbius bands in R⁴ forming a Klein bottle — to prove every smooth curve inscribes rectangles of every aspect ratio. The general case for non-smooth Jordan curves remains open.",
  vizComponent: "SquarePegViz",
  collections: ["beautiful", "frontier"],
  coordinates: {
      difficulty: 8,
      beauty: 10,
      visual: 10,
      importance: 6,
      activity: 7,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: [
      "Jordan curves",
      "Symplectic geometry",
      "Inscribed rectangles",
      "Topology",
    ],
  authors: [
      {
        name: "Otto Toeplitz",
        institution: "University of Göttingen",
        scholarUrl: scholarSearch("Otto Toeplitz inscribed square conjecture"),
      },
      {
        name: "Joshua Evan Greene",
        institution: "Boston College",
        scholarUrl: scholarSearch("Joshua Greene rectangular peg problem"),
      },
      {
        name: "Andrew Lobb",
        institution: "Durham University",
        scholarUrl: scholarSearch("Andrew Lobb rectangular peg problem"),
      },
    ],
  papers: [
      {
        title: "The rectangular peg problem",
        arxivId: "2005.09193",
        url: "https://doi.org/10.4007/annals.2021.194.2.4",
        year: 2021,
      },
      {
        title: "An integration approach to the Toeplitz square peg problem",
        arxivId: "1611.07441",
        url: "https://doi.org/10.1017/fms.2017.23",
        year: 2017,
      },
      {
        title: "Cyclic quadrilaterals and smooth Jordan curves",
        arxivId: "2011.05216",
        url: "https://arxiv.org/abs/2011.05216",
        year: 2020,
      },
    ],
  timeline: [
      {
        year: 1911,
        title: "Toeplitz poses the inscribed square conjecture",
        type: "origin",
      },
      {
        year: 1916,
        title: "Emch proves the convex and piecewise-analytic case",
        type: "progress",
      },
      {
        year: 1989,
        title: "Stromquist proves the locally monotone case",
        type: "progress",
      },
      {
        year: 2017,
        title: "Tao handles unions of two Lipschitz graphs",
        type: "progress",
      },
      {
        year: 2021,
        title:
          "Greene–Lobb prove every smooth curve inscribes rectangles of every aspect ratio",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Conjecture (Toeplitz 1911)",
      latex: String.raw`\gamma:\,S^1\hookrightarrow\mathbb{R}^2\text{ continuous, injective}\;\Longrightarrow\;\exists\,x_1,x_2,x_3,x_4\in\gamma\text{ forming a square}`,
      description:
        "Every Jordan curve in the plane inscribes a square — open in full generality, proved for smooth and piecewise-linear curves.",
    },
    {
      label: "Smooth case (proved)",
      latex: String.raw`\gamma\in C^1\;\Longrightarrow\;\gamma\text{ inscribes a square}`,
      description:
        "For smooth curves the result follows from topological arguments; the difficulty is purely continuous curves with bad local behavior.",
    },
    {
      label: "Inscribed rectangle theorem",
      latex: String.raw`\forall\,\gamma\text{ Jordan curve},\;\exists\text{ inscribed rectangle of every aspect ratio }r\in(0,1]`,
      description:
        "Greene–Lobb (2021) proved every smooth Jordan curve inscribes rectangles of every aspect ratio, using symplectic geometry.",
    },
  ]
});

export default squarePegProblem;
