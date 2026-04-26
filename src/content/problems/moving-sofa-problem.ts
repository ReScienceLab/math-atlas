import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const movingSofaProblem = defineProblem({
  slug: "moving-sofa-problem",
  title: "Moving Sofa Problem",
  status: "watch",
  field: "geometry",
  year: 1966,
  shortDescription:
      "Find the largest-area shape that can move around a right-angled hallway corner.",
  longDescription:
      "The moving sofa problem asks for the largest possible shape that can be maneuvered around a 90-degree turn in a unit-width hallway. Gerver's shape has long been the best-known candidate; recent claimed solutions make this an active-watch entry.",
  vizComponent: "MovingSofaViz",
  collections: ["beautiful", "frontier"],
  coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 8,
      accessibility: 9,
    },
  consensusStatus: "watch",
  lastReviewed: "2026-04",
  connections: [
      "Geometric optimization",
      "Motion planning",
      "Convex geometry",
    ],
  authors: [
      {
        name: "Leo Moser",
        institution: "University of Alberta",
        scholarUrl: scholarSearch("Leo Moser moving sofa problem"),
      },
      {
        name: "Joseph Gerver",
        institution: "Mathematics",
        scholarUrl: scholarSearch("Joseph Gerver moving sofa problem"),
      },
      {
        name: "Jineon Baek",
        institution: "Mathematics",
        scholarUrl: scholarSearch("Jineon Baek moving sofa problem"),
      },
    ],
  papers: [
      {
        title: "On the sofa problem",
        url: "https://doi.org/10.1016/S0925-7721(97)00025-4",
        year: 1992,
      },
      {
        title: "Optimality of Gerver's Sofa",
        arxivId: "2411.19826",
        url: "https://arxiv.org/abs/2411.19826",
        year: 2024,
      },
      {
        title: "A computational study of the moving sofa problem",
        arxivId: "1706.06630",
        url: "https://arxiv.org/abs/1706.06630",
        year: 2017,
      },
    ],
  timeline: [
      {
        year: 1966,
        title: "Moser popularizes the moving sofa problem",
        type: "origin",
      },
      {
        year: 1968,
        title:
          "Hammersley proves upper bound μ ≤ 2√2 and proposes telephone-shaped sofa",
        type: "progress",
      },
      {
        year: 1992,
        title:
          "Gerver constructs 18-curve sofa with area 2.2195… via variational analysis",
        type: "breakthrough",
      },
      {
        year: 2017,
        title: "Romik–Kallus computational studies narrow the gap further",
        type: "progress",
      },
      {
        year: 2024,
        title: "Baek posts a proof of Gerver's optimality (μ = |G|)",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Moving sofa constant",
      latex: String.raw`\mu=\sup\{\operatorname{area}(S): S\text{ can navigate a unit-width right-angle hallway}\}`,
      description:
        "The supremum of areas among all rigid shapes that can be moved continuously around a 90° corner in a hallway of width 1.",
    },
    {
      label: "Gerver's sofa area",
      latex: String.raw`|G|=2.2195316\ldots=\frac{\pi}{2}+\frac{2}{\pi}`,
      description:
        "Gerver's 1992 construction achieves this area, long conjectured optimal. Baek (2024) claims to have proved μ = |G|.",
    },
    {
      label: "Hammersley bound",
      latex: String.raw`\mu\le 2\sqrt{2}\approx 2.8284`,
      description:
        "The best known upper bound, established by Hammersley (1968) via a simple geometric argument.",
    },
  ]
});

export default movingSofaProblem;
