import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const isoperimetricProblem = defineProblem({
  slug: "isoperimetric-problem",
  title: "Isoperimetric Problem",
  status: "proved",
  field: "geometry",
  year: 1838,
  shortDescription:
      "Among plane figures with a fixed perimeter, the circle encloses the greatest area.",
  longDescription:
      "The isoperimetric problem is one of the oldest optimization problems in geometry. Its visual statement is immediate: deform any closed curve while holding perimeter fixed, and the enclosed area is maximized exactly when the curve becomes a circle.",
  vizComponent: "IsoperimetricViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 6,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 5,
      accessibility: 10,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Calculus of variations", "Geometry", "Dido's problem"],
  authors: [
      { name: "Dido", institution: "Classical legend" },
      {
        name: "Jakob Steiner",
        institution: "University of Berlin",
        scholarUrl: scholarSearch("Jakob Steiner isoperimetric problem"),
      },
      {
        name: "Karl Weierstrass",
        institution: "University of Berlin",
        scholarUrl: scholarSearch("Karl Weierstrass calculus of variations"),
      },
    ],
  papers: [
      {
        title: "The isoperimetric inequality",
        url: "https://doi.org/10.1090/S0002-9904-1978-14553-4",
        year: 1978,
      },
      {
        title:
          "Sur quelques applications de la theorie des courbes a la geometrie",
        url: "https://doi.org/10.1007/BF01445166",
        year: 1902,
      },
      {
        title: "The isoperimetric problem on surfaces",
        url: "https://doi.org/10.1007/s000140050007",
        year: 2001,
      },
    ],
  timeline: [
      {
        year: -200,
        title: "Zenodorus gives the earliest known proof for polygons",
        type: "origin",
      },
      {
        year: 1838,
        title: "Steiner gives a famous symmetrization proof",
        type: "breakthrough",
      },
      {
        year: 1870,
        title: "Weierstrass supplies a rigorous variational proof",
        type: "progress",
      },
      {
        year: 1919,
        title: "Schmidt gives a simplified proof using integral geometry",
        type: "progress",
      },
      {
        year: 1958,
        title: "De Giorgi develops perimeter theory in general dimensions",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Isoperimetric inequality",
      latex: String.raw`L^2\ge 4\pi A`,
      description:
        "Among all simple closed curves of length L enclosing area A, the circle is the unique maximizer of A for given L.",
    },
    {
      label: "Equality case",
      latex: String.raw`L^2=4\pi A\quad\Longleftrightarrow\quad\gamma\text{ is a circle}`,
      description:
        "Equality holds if and only if the curve is a circle — proved rigorously by Weierstrass via the calculus of variations.",
    },
    {
      label: "Higher-dimensional generalization",
      latex: String.raw`|\partial\Omega|^n\ge n^n\omega_n\,|\Omega|^{n-1},\qquad\omega_n=|B^n|`,
      description:
        "In Rⁿ, among bodies of given volume, the ball has the least surface area. Equality iff Ω is a ball.",
    },
  ]
});

export default isoperimetricProblem;
