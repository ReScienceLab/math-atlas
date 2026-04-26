import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const mandelbrotLocalConnectivity = defineProblem({
  slug: "mandelbrot-local-connectivity",
  title: "Mandelbrot Local Connectivity",
  status: "open",
  field: "analysis",
  year: 1982,
  shortDescription:
      "Asks whether the Mandelbrot set is locally connected at every point.",
  longDescription:
      "The MLC conjecture asks for a precise topological regularity property of the Mandelbrot set. The image is iconic, but the conjecture is not merely visual: local connectivity would organize how parameter space is navigated by external rays.",
  vizComponent: "MandelbrotViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 8,
      accessibility: 7,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Complex dynamics", "Fractals", "Local connectivity"],
  authors: [
      { name: "Benoit Mandelbrot", institution: "IBM" },
      {
        name: "Adrien Douady",
        institution: "Universite Paris-Sud",
        scholarUrl: scholarSearch(
          "Adrien Douady Mandelbrot set complex dynamics",
        ),
      },
      { name: "John Hubbard", institution: "Cornell University" },
    ],
  papers: [
      {
        title: "Exploring the Mandelbrot set",
        url: "https://doi.org/10.1007/BF03023727",
        year: 1985,
      },
      {
        title: "Etude dynamique des polynomes complexes (Orsay Notes)",
        url: "https://pi.math.cornell.edu/~hubbard/OrsayEnglish.pdf",
        year: 1984,
      },
      {
        title: "Dynamics of quadratic polynomials, I-II",
        url: "https://doi.org/10.2307/120974",
        year: 1999,
      },
    ],
  videos: [
    {
      title: "Beyond the Mandelbrot set, an intro to holomorphic dynamics",
      videoId: "LqbZpur38nw",
      channel: "3Blue1Brown",
    },
    {
      title: "What's so special about the Mandelbrot Set? - Numberphile",
      videoId: "FFftmWSzgmk",
      channel: "Numberphile",
    },
    {
      title: "The Mandelbrot Set - Numberphile",
      videoId: "NGMRB4O922I",
      channel: "Numberphile",
    },
  ],
  timeline: [
      {
        year: 1980,
        title: "Mandelbrot names the set and popularizes computer images",
        type: "origin",
      },
      {
        year: 1982,
        title: "Douady and Hubbard prove the Mandelbrot set is connected",
        type: "progress",
      },
      {
        year: 1990,
        title: "Yoccoz proves MLC for finitely renormalizable parameters",
        type: "progress",
      },
      {
        year: 1999,
        title:
          "Lyubich proves MLC at infinitely renormalizable real parameters",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Mandelbrot set",
      latex: String.raw`M=\{c\in\mathbb{C}: \sup_n|z_n|<\infty,\; z_0=0,\; z_{n+1}=z_n^2+c\}`,
      description:
        "The Mandelbrot set is the set of parameters c for which the critical orbit of z² + c remains bounded.",
    },
    {
      label: "MLC conjecture",
      latex: String.raw`M\text{ is locally connected}`,
      description:
        "If true, M has no infinitely fine filaments and the Douady–Hubbard landing theorem extends to all external rays.",
    },
    {
      label: "Density of hyperbolicity (implication)",
      latex: String.raw`\text{MLC}\;\Longrightarrow\;\{c: z^2+c\text{ is hyperbolic}\}\text{ is dense in }\partial M`,
      description:
        "MLC would imply that hyperbolic dynamics is dense in the quadratic family — a central conjecture in holomorphic dynamics.",
    },
  ]
});

export default mandelbrotLocalConnectivity;
