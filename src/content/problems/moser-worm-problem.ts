import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const moserWormProblem = defineProblem({
  slug: "moser-worm-problem",
  title: "Moser's Worm Problem",
  status: "open",
  field: "geometry",
  year: 1966,
  shortDescription:
      "Find the smallest-area planar region that can cover every curve of length 1.",
  longDescription:
      "Moser's worm problem asks for the region of smallest area that can accommodate every plane curve of unit length, where each curve may be rotated and translated to fit. The problem is visually natural but technically subtle because every possible bent, kinked, or smoothly curved arc of length one must fit inside a single compact region. The best known non-convex upper bound of approximately 0.260437 was established by Norwood and Poole in 2003, while the best convex lower bound of 0.232239 was proved by Khandhawit, Sriswasdi, and Wetzel in 2013. Despite steady progress on tightening bounds, the exact minimum area remains unknown.",
  vizComponent: "MoserWormViz",
  collections: ["beautiful", "frontier"],
  coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 7,
      accessibility: 9,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Geometric optimization", "Universal covers", "Plane curves"],
  authors: [
      {
        name: "Leo Moser",
        institution: "University of Alberta",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Leo_Moser",
        scholarUrl: scholarSearch("Leo Moser worm problem"),
      },
      {
        name: "Rick Norwood",
        institution: "East Tennessee State University",
        scholarUrl: scholarSearch("Rick Norwood Moser worm problem"),
      },
      {
        name: "George Poole",
        institution: "East Tennessee State University",
        scholarUrl: scholarSearch("George Poole Moser worm problem"),
      },
    ],
  papers: [
      {
        title: "The Worm Problem of Leo Moser",
        url: "https://doi.org/10.1007/s00454-003-2953-y",
        year: 2003,
      },
      {
        title: "An Improved Lower Bound for Moser's Worm Problem",
        arxivId: "math/0701391",
        url: "https://arxiv.org/abs/math/0701391",
        year: 2007,
      },
      {
        title: "Curve packing and modulus estimates",
        arxivId: "1602.01707",
        url: "https://arxiv.org/abs/1602.01707",
        year: 2016,
      },
    ],
  timeline: [
      {
        year: 1966,
        title: "Moser poses the universal-cover problem for unit curves",
        description:
          "Leo Moser asks: what is the region of smallest area that can accommodate every planar arc of length one?",
        type: "origin",
      },
      {
        year: 1974,
        title: "Gerriets and Poole test polygonal-chain conjectures",
        description:
          "Early work proposes that three-segment polygonal chains could serve as a test family for minimal covers.",
        type: "progress",
      },
      {
        year: 2003,
        title: "Norwood and Poole achieve non-convex upper bound 0.260437",
        description:
          "A carefully trimmed non-convex region is shown to contain all unit arcs, setting the best known upper bound.",
        type: "breakthrough",
      },
      {
        year: 2007,
        title: "Khandhawit and Sriswasdi improve the lower bound to 0.227498",
        description:
          "By requiring the cover to contain a unit segment, an equilateral triangle of side 1/2, and a square of side 1/3, they raise the lower bound.",
        type: "progress",
      },
      {
        year: 2021,
        title: "Panraksa and Wichiramala resolve Wetzel's sector conjecture",
        description:
          "They confirm that for convex covers, the 30-degree circular sector plays a key role, yielding a convex upper bound near pi/12.",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Universal cover",
      latex: String.raw`\min\{|C|:\;C\text{ convex},\;\forall\,\gamma\text{ with }\operatorname{len}(\gamma)=1,\;\exists\,\text{rigid motion placing }\gamma\subset C\}`,
      description:
        "Find the convex region of smallest area that can contain a congruent copy of every plane curve of unit length.",
    },
    {
      label: "Known bounds",
      latex: String.raw`0.2194\le A^*\le 0.2604`,
      description:
        "The optimal area lies between Khandhawit–Pagonakis (2014) lower and Norwood–Poole (2003) upper bounds — still a wide gap.",
    },
    {
      label: "Semicircular cover",
      latex: String.raw`A_{\text{semicircle}}=\frac{\pi}{8}\approx 0.3927`,
      description:
        "A semicircle of diameter 1 is a valid universal cover — far from optimal but a natural starting point; trimming corners improves it.",
    },
  ]
});

export default moserWormProblem;
