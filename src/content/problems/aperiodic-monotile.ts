import { defineProblem } from "@/lib/problem-template";

export const aperiodicMonotile = defineProblem({
  slug: "aperiodic-monotile",
  title: "Aperiodic Monotile Problem",
  status: "resolved",
  field: "geometry",
  year: 2023,
  shortDescription:
      "A single tile can force nonperiodic tilings of the plane.",
  longDescription:
      "The aperiodic monotile problem asked whether one shape alone could tile the plane only nonperiodically. The 2023 'hat' and related monotiles gave a concrete answer to a long-running tiling question.",
  vizComponent: "AperiodicTilingViz",
  collections: ["beautiful", "frontier", "recent"],
  coordinates: {
      difficulty: 7,
      beauty: 10,
      visual: 10,
      importance: 7,
      activity: 8,
      accessibility: 8,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Tilings", "Aperiodicity", "Quasicrystals"],
  authors: [
      { name: "David Smith", institution: "Independent" },
      { name: "Joseph Myers", institution: "Mathematics" },
      { name: "Craig Kaplan", institution: "University of Waterloo" },
      {
        name: "Chaim Goodman-Strauss",
        institution: "National Museum of Mathematics",
      },
    ],
  papers: [
      {
        title: "An aperiodic monotile",
        arxivId: "2303.10798",
        url: "https://arxiv.org/abs/2303.10798",
        year: 2023,
      },
      {
        title: "A chiral aperiodic monotile",
        arxivId: "2305.17743",
        url: "https://arxiv.org/abs/2305.17743",
        year: 2023,
      },
      {
        title: "The undecidability of the domino problem",
        url: "https://doi.org/10.1090/memo/0066",
        year: 1966,
      },
    ],
  videos: [
    {
      title: "Discovery of the Aperiodic Monotile - Numberphile",
      videoId: "_ZS3Oqg1AX0",
      channel: "Numberphile",
    },
    {
      title: "How a Hobbyist Solved a 50-Year-Old Math Problem",
      videoId: "A1BhOVW8qZU",
      channel: "Up and Atom",
    },
    {
      title: "Aperiodic Monotile - Mad as a Hat",
      videoId: "vtpswcAfWiI",
      channel: "Ayliean",
    },
  ],
  timeline: [
      {
        year: 1961,
        title:
          "Wang conjectures all tile sets that tile the plane admit periodic tilings",
        type: "origin",
      },
      {
        year: 1966,
        title:
          "Berger disproves Wang's conjecture with a set of 20,426 aperiodic tiles",
        type: "progress",
      },
      {
        year: 1974,
        title: "Penrose reduces the aperiodic set to just 2 tiles",
        type: "progress",
      },
      {
        year: 2023,
        month: "Mar",
        title:
          "Smith, Myers, Kaplan, and Goodman-Strauss announce the 'hat' aperiodic monotile",
        type: "breakthrough",
      },
      {
        year: 2023,
        month: "May",
        title: "The 'spectre' tile achieves aperiodicity without reflections",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Existence",
      latex: String.raw`\exists\, T:\; T\text{ tiles }\mathbb{R}^2\quad\wedge\quad \nexists\;\text{periodic tiling by }T`,
      description:
        "A single tile (monotile or einstein) that can tile the plane but only aperiodically — proved to exist in 2023.",
    },
    {
      label: "Hat tile parameter family",
      latex: String.raw`\text{Tile}(a,b):\; a,b>0,\; a\ne b\quad\Longrightarrow\quad \text{aperiodic}`,
      description:
        "The Smith–Myers–Kaplan–Goodman-Strauss hat belongs to a continuous family parameterized by two edge lengths.",
    },
    {
      label: "Non-periodicity criterion",
      latex: String.raw`\nexists\;\mathbf{v}\ne\mathbf{0}:\;\mathcal{T}+\mathbf{v}=\mathcal{T}`,
      description:
        "No nonzero translation maps the tiling to itself — the defining property of an aperiodic tiling.",
    },
  ]
});

export default aperiodicMonotile;
