import { defineProblem } from "@/lib/problem-template";

export const noperthedron = defineProblem({
  slug: "noperthedron",
  title: "The Noperthedron",
  status: "disproved",
  field: "geometry",
  year: 2025,
  shortDescription:
      "First convex polyhedron (90 vertices) proven to NOT have Rupert's property \u2014 cannot pass through itself.",
  longDescription:
      "Rupert's property: a convex body can pass a copy of itself through a straight hole cut inside itself. All Platonic solids have it. The 2017 conjecture claimed ALL convex polyhedra do. Steininger and Yurkevich constructed a 90-vertex polyhedron that provably does not, settling a 300-year-old question.",
  vizComponent: "NoperthedronViz",
  collections: ["beautiful", "frontier", "recent"],
  coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 8,
      accessibility: 8,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Convex geometry", "Polyhedra", "Rupert's property"],
  authors: [
      {
        name: "Jakob Steininger",
        institution: "Statistics Austria, Vienna",
      },
      {
        name: "Sergey Yurkevich",
        institution: "A&R TECH, Vienna",
        scholarUrl: "https://scholar.google.com/citations?user=uWQorJ4AAAAJ",
        homepageUrl: "https://yurkevi.ch/",
      },
    ],
  papers: [
      {
        title: "A convex polyhedron without Rupert's property",
        arxivId: "2508.18475",
        url: "https://arxiv.org/abs/2508.18475",
        year: 2025,
      },
      {
        title: "A resolution of the Rupert problem for regular polytopes",
        arxivId: "2409.16407",
        url: "https://arxiv.org/abs/2409.16407",
        year: 2024,
      },
      {
        title: "Prince Rupert's problem and its generalizations",
        url: "https://doi.org/10.1007/s00283-016-9680-2",
        year: 2016,
      },
    ],
  videos: [
    {
      title: "Noperthedron: The Shape That Defies Geometry!",
      videoId: "1vbTWlIfEZI",
      channel: "Math & Science Explained",
    },
  ],
  timeline: [
      {
        year: 1693,
        title: "Prince Rupert bets a cube can pass through itself",
        type: "origin",
      },
      { year: 1816, title: "Nieuwland proves the cube case", type: "progress" },
      {
        year: 2017,
        title: "Conjecture: all convex polyhedra are Rupert",
        type: "progress",
      },
      {
        year: 2025,
        month: "Aug",
        title: "Steininger & Yurkevich find 90-vertex counterexample",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Rupert property",
      latex: String.raw`P\text{ is Rupert}\;\Longleftrightarrow\;\exists\,\text{tunnel through }P\text{ admitting a copy of }P`,
      description:
        "A convex body is Rupert if a congruent copy can pass through a hole cut straight through it.",
    },
    {
      label: "Noperthedron existence",
      latex: String.raw`\exists\,P\text{ convex polytope}:\;P\text{ is not Rupert}`,
      description:
        "Confirmed in 2024: a convex polyhedron exists that cannot pass through itself — settling a question open since Nieuwland's 1950s work.",
    },
    {
      label: "Passage width criterion",
      latex: String.raw`\max_\theta \operatorname{width}(\operatorname{proj}_\theta P) > \min_\theta \operatorname{cross\text{-}section}(P,\theta)`,
      description:
        "Rupert requires a projection direction where the silhouette fits inside some cross-section — the noperthedron violates this.",
    },
  ]
});

export default noperthedron;
