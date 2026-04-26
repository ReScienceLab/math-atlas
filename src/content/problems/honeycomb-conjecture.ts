import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const honeycombConjecture = defineProblem({
  slug: "honeycomb-conjecture",
  title: "Honeycomb Conjecture",
  status: "proved",
  field: "geometry",
  year: 1999,
  shortDescription:
      "Regular hexagons give the least-perimeter way to divide the plane into equal-area cells.",
  longDescription:
      "The honeycomb conjecture asks why hexagonal cells are optimal for equal-area partitions of the plane. Hales proved that the regular hexagonal tiling minimizes total perimeter.",
  vizComponent: "HoneycombViz",
  collections: ["beautiful", "canonical"],
  coordinates: {
      difficulty: 7,
      beauty: 10,
      visual: 10,
      importance: 7,
      activity: 5,
      accessibility: 10,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Tilings", "Minimal perimeter", "Discrete geometry"],
  authors: [
      {
        name: "Thomas Hales",
        institution: "University of Pittsburgh",
        scholarUrl: scholarSearch("Thomas C Hales honeycomb conjecture"),
      },
      {
        name: "Laszlo Fejes Toth",
        institution: "Hungarian Academy of Sciences",
        scholarUrl: scholarSearch("Laszlo Fejes Toth Lagerungen packing"),
      },
    ],
  papers: [
      {
        title: "The honeycomb conjecture",
        arxivId: "math/9906042",
        url: "https://doi.org/10.1007/s004540010071",
        year: 2001,
      },
      {
        title: "Lagerungen in der Ebene, auf der Kugel und im Raum",
        url: "https://doi.org/10.1007/978-3-642-65234-9",
        year: 1953,
      },
      {
        title: "Geometric Measure Theory: A Beginner's Guide",
        url: "https://doi.org/10.1016/C2009-0-24979-3",
        year: 2000,
      },
    ],
  timeline: [
      {
        year: -36,
        title: "Varro speculates on the optimality of honeycomb cells",
        type: "origin",
      },
      {
        year: 1611,
        title: "Kepler discusses hexagonal packing efficiency",
        type: "progress",
      },
      {
        year: 1943,
        title: "Fejes Toth formulates the honeycomb conjecture precisely",
        type: "progress",
      },
      {
        year: 1999,
        title: "Hales proves the honeycomb conjecture",
        type: "breakthrough",
      },
      {
        year: 2001,
        title: "Morgan extends regularity results for the partition problem",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Honeycomb inequality",
      latex: String.raw`\frac{P^2}{A}\ge 8\sqrt{3}`,
      description:
        "For any partition of the plane into equal-area cells, the perimeter-to-area ratio is minimized by regular hexagons.",
    },
    {
      label: "Hales' theorem (1999)",
      latex: String.raw`\text{Regular hexagonal tiling minimizes }\sum_i |\partial C_i|\text{ subject to }|C_i|=1`,
      description:
        "Thomas Hales proved that the honeycomb (regular hexagonal lattice) achieves the least-perimeter partition into equal areas.",
    },
    {
      label: "Hexagonal optimality",
      latex: String.raw`A=\frac{3\sqrt{3}}{2}s^2,\quad P=6s\quad\Longrightarrow\quad\frac{P}{\sqrt{A}}=\sqrt{8\sqrt{3}}`,
      description:
        "The regular hexagon with side s achieves the exact lower bound — nature exploits this in honeycombs and basalt columns.",
    },
  ]
});

export default honeycombConjecture;
