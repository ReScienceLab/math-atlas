import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const hadwigerNelsonProblem = defineProblem({
  slug: "hadwiger-nelson-problem",
  title: "Hadwiger-Nelson Problem",
  status: "partial",
  field: "combinatorics",
  year: 1950,
  shortDescription:
      "Determine how many colors are needed to color the plane so points distance 1 apart differ.",
  longDescription:
      "The chromatic number of the plane is known to be at least 5 and at most 7. The problem is easy to draw as a unit-distance graph but remains open after decades.",
  vizComponent: "HadwigerNelsonViz",
  collections: ["canonical", "beautiful", "frontier"],
  coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 9,
      importance: 7,
      activity: 8,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: [
      "Graph coloring",
      "Unit-distance graphs",
      "Discrete geometry",
    ],
  authors: [
      { name: "Hugo Hadwiger", institution: "University of Bern" },
      {
        name: "Edward Nelson",
        institution: "Princeton University",
        scholarUrl: scholarSearch("Edward Nelson chromatic number plane"),
      },
      {
        name: "Aubrey de Grey",
        institution: "SENS Research Foundation",
        scholarUrl: scholarSearch(
          "Aubrey de Grey chromatic number plane graph",
        ),
      },
    ],
  papers: [
      {
        title: "The chromatic number of the plane is at least 5",
        arxivId: "1804.02385",
        url: "https://arxiv.org/abs/1804.02385",
        year: 2018,
      },
      {
        title: "The Mathematical Coloring Book",
        url: "https://doi.org/10.1007/978-0-387-74642-5",
        year: 2009,
      },
      {
        title: "On the chromatic number of the plane",
        arxivId: "1909.00180",
        url: "https://arxiv.org/abs/1909.00180",
        year: 2019,
      },
    ],
  videos: [
    {
      title: "A Colorful Unsolved Problem - Numberphile",
      videoId: "niaeV_NHh-o",
      channel: "Numberphile",
    },
    {
      title: "A Colorful Problem (extra footage) - Numberphile",
      videoId: "7nBtRKvUox4",
      channel: "Numberphile",
    },
  ],
  timeline: [
      {
        year: 1950,
        title: "Nelson poses the chromatic number of the plane problem",
        type: "origin",
      },
      {
        year: 1950,
        title: "Isbell proves the chromatic number is at least 4",
        type: "progress",
      },
      {
        year: 1961,
        title: "Hadwiger and Debrunner reformulate and popularize the problem",
        type: "progress",
      },
      {
        year: 2018,
        title: "de Grey proves the chromatic number is at least 5",
        type: "breakthrough",
      },
      {
        year: 2018,
        title: "Heule uses SAT solvers to reduce the required vertex count",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Chromatic number of the plane",
      latex: String.raw`5\le \chi(\mathbb{R}^2)\le 7`,
      description:
        "The minimum number of colors needed so no two points at distance 1 share a color lies between 5 and 7.",
    },
    {
      label: "de Grey lower bound (2018)",
      latex: String.raw`\exists\, G\subset\mathbb{R}^2:\;\chi(G)\ge 5,\quad |V(G)|=1581`,
      description:
        "Aubrey de Grey constructed a unit-distance graph on 1,581 vertices requiring 5 colors, breaking the 1950s bound of 4.",
    },
    {
      label: "Hexagonal upper bound",
      latex: String.raw`\chi(\mathbb{R}^2)\le 7\quad\text{(hexagonal 7-coloring with diameter }<1\text{)}`,
      description:
        "Coloring the plane with regular hexagons of diameter slightly less than 1 gives a valid 7-coloring — unimproved since 1950.",
    },
  ]
});

export default hadwigerNelsonProblem;
