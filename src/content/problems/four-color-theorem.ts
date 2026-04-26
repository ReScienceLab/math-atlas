import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const fourColorTheorem = defineProblem({
  slug: "four-color-theorem",
  title: "Four Color Theorem",
  status: "proved",
  field: "combinatorics",
  year: 1976,
  shortDescription:
      "Every planar map can be colored with at most four colors so neighboring regions differ.",
  longDescription:
      "The four color theorem is one of the clearest visual problems in mathematics: no matter how complicated a planar map becomes, four colors suffice. Appel and Haken's proof was the first major computer-assisted proof to settle a famous problem.",
  vizComponent: "FourColorViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 7,
      beauty: 8,
      visual: 10,
      importance: 8,
      activity: 6,
      accessibility: 10,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Planar graphs", "Graph coloring", "Computer-assisted proof"],
  authors: [
      { name: "Kenneth Appel", institution: "University of Illinois" },
      { name: "Wolfgang Haken", institution: "University of Illinois" },
      {
        name: "Neil Robertson",
        institution: "Ohio State University",
        scholarUrl: scholarSearch("Neil Robertson graph theory four color"),
      },
      {
        name: "Georges Gonthier",
        institution: "Inria / Microsoft Research",
        scholarUrl: scholarSearch("Georges Gonthier formal proof Coq"),
      },
    ],
  papers: [
      {
        title: "Every planar map is four colorable",
        url: "https://doi.org/10.1090/conm/098",
        year: 1989,
      },
      {
        title: "The four-colour theorem",
        url: "https://doi.org/10.1006/jctb.1997.1750",
        year: 1997,
      },
      {
        title: "Formal proof — The Four-Color Theorem",
        url: "https://doi.org/10.1090/noti870",
        year: 2008,
      },
    ],
  timeline: [
      {
        year: 1852,
        title: "Guthrie poses the map-coloring problem",
        type: "origin",
      },
      {
        year: 1879,
        title: "Kempe publishes a flawed proof (later found incorrect)",
        type: "progress",
      },
      {
        year: 1890,
        title: "Heawood proves the five-color theorem",
        type: "progress",
      },
      {
        year: 1976,
        title: "Appel and Haken announce a computer-assisted proof",
        type: "breakthrough",
      },
      {
        year: 1997,
        title: "Robertson, Sanders, Seymour, Thomas give a simplified proof",
        type: "progress",
      },
      {
        year: 2005,
        title: "Gonthier formalizes the theorem in Coq",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Theorem",
      latex: String.raw`G\text{ planar}\quad\Longrightarrow\quad \chi(G)\le 4`,
      description:
        "Every planar graph is 4-colorable — equivalently, every map on the plane or sphere can be colored with four colors.",
    },
    {
      label: "Euler's formula",
      latex: String.raw`V - E + F = 2`,
      description:
        "The structural backbone: for any connected planar graph, vertices minus edges plus faces equals 2.",
    },
    {
      label: "Unavoidable configurations",
      latex: String.raw`\forall\,G\text{ planar},\;\exists\, v\in V(G):\;\deg(v)\le 5`,
      description:
        "Every planar graph has a vertex of degree ≤ 5 (from Euler's formula). Appel–Haken's proof uses 1,482 reducible configurations.",
    },
  ]
});

export default fourColorTheorem;
