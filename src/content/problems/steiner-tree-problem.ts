import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const steinerTreeProblem = defineProblem({
  slug: "steiner-tree-problem",
  title: "Steiner Tree Problem",
  status: "partial",
  field: "computer-science",
  year: 1836,
  shortDescription:
      "Connect given points with the shortest possible network, allowing extra junction points.",
  longDescription:
      "The geometric Steiner tree problem asks for the shortest network connecting prescribed terminals, with optional Steiner points that meet at 120-degree angles. Its computational versions are NP-hard, but the visual principle is crisp.",
  vizComponent: "SteinerTreeViz",
  collections: ["beautiful", "canonical"],
  coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 9,
      importance: 7,
      activity: 7,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Optimization", "Networks", "Computational geometry"],
  authors: [
      { name: "Jakob Steiner", institution: "University of Berlin" },
      {
        name: "Edgar Gilbert",
        institution: "Bell Labs",
        scholarUrl: scholarSearch("Edgar Gilbert Steiner tree minimum network"),
      },
      {
        name: "Henry Pollak",
        institution: "Bell Labs",
        scholarUrl: scholarSearch(
          "Henry Pollak Steiner tree Gilbert-Pollak conjecture",
        ),
      },
    ],
  papers: [
      {
        title: "The Euclidean Steiner tree problem is NP-hard",
        url: "https://doi.org/10.1016/0020-0190(77)90010-9",
        year: 1977,
      },
      {
        title: "Steiner minimal trees",
        url: "https://doi.org/10.1137/0116001",
        year: 1968,
      },
      {
        title: "On Steiner's problem with rectilinear distance",
        url: "https://doi.org/10.1007/BF01758756",
        year: 1992,
      },
    ],
  videos: [
    {
      title: "Episode 7 - Steiner Trees",
      videoId: "BG4vAoV5kWw",
      channel: "Reducible",
    },
    {
      title: "Analog computing with soap films (Steiner tree problem)",
      videoId: "BVbIRM01UTs",
      channel: "Chirag Kalelkar",
    },
  ],
  timeline: [
      {
        year: 1640,
        title:
          "Fermat poses the problem of minimizing total distance to three points",
        type: "origin",
      },
      {
        year: 1836,
        title: "Gauss considers generalized shortest networks",
        type: "progress",
      },
      {
        year: 1941,
        title: "Courant and Robbins popularize the Steiner tree problem",
        type: "progress",
      },
      {
        year: 1968,
        title: "Gilbert and Pollak conjecture the Steiner ratio is sqrt(3)/2",
        type: "progress",
      },
      {
        year: 1977,
        title: "The Euclidean Steiner tree problem is proved NP-hard",
        type: "breakthrough",
      },
      {
        year: 1992,
        title:
          "The Gilbert-Pollak conjecture is proved for the Euclidean plane",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Steiner minimum tree",
      latex: String.raw`\min_{T\supseteq P}\sum_{e\in T}|e|,\quad T\text{ tree, }P\subset V(T)`,
      description:
        "Find the shortest tree interconnecting a given set of terminal points, allowing additional Steiner points.",
    },
    {
      label: "Steiner ratio",
      latex: String.raw`\rho_2=\frac{\sqrt{3}}{2}\approx 0.866\quad\Longrightarrow\quad \text{SMT}\ge\frac{\sqrt{3}}{2}\,\text{MST}`,
      description:
        "In the Euclidean plane, a Steiner tree is at least √3/2 times the minimum spanning tree length (Gilbert–Pollak, proved 1990s).",
    },
    {
      label: "120° angle property",
      latex: String.raw`\text{At every Steiner point, exactly 3 edges meet at }120°`,
      description:
        "Optimal Steiner points have degree 3 with equal 120° angles — the same geometry as soap film junctions (Plateau's laws).",
    },
  ]
});

export default steinerTreeProblem;
