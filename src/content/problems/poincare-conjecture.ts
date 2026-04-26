import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const poincareConjecture = defineProblem({
  slug: "poincare-conjecture",
  title: "Poincaré Conjecture",
  status: "proved",
  field: "topology",
  year: 2003,
  shortDescription:
      "Every simply connected closed 3-manifold is homeomorphic to the 3-sphere.",
  longDescription:
      "Can a blob of clay with no holes always be reshaped into a perfect sphere? The Poincaré conjecture asserts that every closed, simply connected 3-manifold is homeomorphic to S³. Perelman proved this in 2002–2003 using Hamilton's Ricci flow, an equation that deforms geometry toward uniform curvature while performing topological surgery at singularities. The proof also settled Thurston's geometrization conjecture, completing the classification of compact 3-manifolds.",
  vizComponent: "PoincareViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 8,
      importance: 10,
      activity: 7,
      accessibility: 5,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Ricci flow",
      "Thurston geometrization",
      "3-manifolds",
      "Millennium Prize Problems",
    ],
  authors: [
      {
        name: "Henri Poincaré",
        institution: "University of Paris",
        scholarUrl: scholarSearch("Henri Poincaré Analysis Situs topology"),
      },
      {
        name: "Grigori Perelman",
        institution: "Steklov Mathematical Institute",
        scholarUrl: scholarSearch("Grigori Perelman Ricci flow entropy"),
      },
      {
        name: "Richard S. Hamilton",
        institution: "Cornell University",
        scholarUrl: scholarSearch(
          "Richard Hamilton Ricci flow three-manifolds",
        ),
      },
    ],
  papers: [
      {
        title:
          "The entropy formula for the Ricci flow and its geometric applications",
        arxivId: "math/0211159",
        url: "https://arxiv.org/abs/math/0211159",
        year: 2002,
      },
      {
        title: "Three-manifolds with positive Ricci curvature",
        url: "https://doi.org/10.4310/jdg/1214436922",
        year: 1982,
      },
      {
        title: "Ricci flow with surgery on three-manifolds",
        arxivId: "math/0303109",
        url: "https://arxiv.org/abs/math/0303109",
        year: 2003,
      },
    ],
  videos: [
    {
      title: "Poincare Conjecture - Numberphile",
      videoId: "GItmC9lxeco",
      channel: "Numberphile",
    },
    {
      title: "What is the Poincare Conjecture?",
      videoId: "YPuOt0JUZBY",
      channel: "World Science Festival",
    },
  ],
  timeline: [
      {
        year: 1904,
        title:
          "Poincaré poses the conjecture in the fifth supplement to Analysis Situs",
        type: "origin",
      },
      {
        year: 1961,
        title:
          "Smale proves the generalised Poincaré conjecture for dimensions n ≥ 5",
        type: "progress",
      },
      {
        year: 1982,
        title:
          "Freedman proves the 4-dimensional case; Hamilton introduces Ricci flow",
        type: "progress",
      },
      {
        year: 2002,
        title: "Perelman posts entropy formula for Ricci flow on arXiv",
        type: "breakthrough",
      },
      {
        year: 2003,
        title: "Perelman completes the proof via Ricci flow with surgery",
        type: "breakthrough",
      },
      {
        year: 2010,
        title: "Clay Millennium Prize awarded and declined by Perelman",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Conjecture",
      latex: String.raw`\pi_1(M^3)=0,\; M^3\text{ closed}\quad\Longrightarrow\quad M^3\cong S^3`,
      description:
        "A closed simply connected 3-manifold is homeomorphic to the 3-sphere.",
    },
    {
      label: "Ricci flow",
      latex: String.raw`\frac{\partial g_{ij}}{\partial t}=-2\,R_{ij}`,
      description:
        "Hamilton's evolution equation deforms the metric toward uniform curvature — the engine of Perelman's proof.",
    },
    {
      label: "Geometrization",
      latex: String.raw`M^3\text{ closed, prime}\;\Longrightarrow\;M^3\text{ decomposes into pieces, each admitting one of 8 Thurston geometries}`,
      description:
        "Thurston's conjecture classifies all compact 3-manifolds; proved by Perelman as a corollary.",
    },
  ]
});

export default poincareConjecture;
