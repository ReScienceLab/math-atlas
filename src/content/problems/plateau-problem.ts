import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const plateauProblem = defineProblem({
  slug: "plateau-problem",
  title: "Plateau's Problem",
  status: "resolved",
  field: "analysis",
  year: 1931,
  shortDescription:
      "Find a surface of least area spanning a given boundary curve.",
  longDescription:
      "Dip a wire frame into soapy water — the film that forms minimises surface area, producing a minimal surface with mean curvature H = 0. Douglas and Radó independently proved existence in 1930–1931, earning Douglas one of the first Fields Medals. Federer–Fleming's geometric measure theory (1960) generalised the result to arbitrary dimensions via integral currents.",
  vizComponent: "PlateauViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 8,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 7,
      accessibility: 8,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Minimal surfaces",
      "Calculus of variations",
      "Geometric measure theory",
    ],
  authors: [
      {
        name: "Joseph Plateau",
        institution: "Ghent University",
        scholarUrl: scholarSearch("Joseph Plateau soap film minimal surfaces"),
      },
      {
        name: "Jesse Douglas",
        institution: "Columbia University",
        scholarUrl: scholarSearch("Jesse Douglas solution problem Plateau"),
      },
      {
        name: "Tibor Radó",
        institution: "Ohio State University",
        scholarUrl: scholarSearch("Tibor Rado Plateau problem"),
      },
    ],
  papers: [
      {
        title: "Solution of the problem of Plateau",
        url: "https://doi.org/10.1090/S0002-9947-1931-1501590-9",
        year: 1931,
      },
      {
        title: "On Plateau's problem",
        url: "https://doi.org/10.2307/1968237",
        year: 1930,
      },
      {
        title: "Normal and integral currents",
        url: "https://doi.org/10.2307/1970227",
        year: 1960,
      },
    ],
  videos: [
    {
      title: "How physics solves a math problem",
      videoId: "Cvs8iRqG6lg",
      channel: "Morphocular",
    },
    {
      title: "The Math of Bubbles // Minimal Surfaces & the Calculus of Variations",
      videoId: "8SABptOYUVk",
      channel: "Sour Patch Maths",
    },
    {
      title: "Plateau's Laws of Soap Bubbles - Explained",
      videoId: "NscxxwDqq5s",
      channel: "Steve Mould",
    },
  ],
  timeline: [
      {
        year: 1760,
        title: "Lagrange formulates the minimal surface equation",
        type: "origin",
      },
      {
        year: 1849,
        title: "Plateau systematically studies soap-film minimal surfaces",
        type: "origin",
      },
      {
        year: 1930,
        title: "Radó solves the problem for rectifiable boundaries",
        type: "breakthrough",
      },
      {
        year: 1931,
        title: "Douglas gives a general solution via his A-functional",
        type: "breakthrough",
      },
      {
        year: 1936,
        title: "Douglas receives one of the first Fields Medals",
        type: "recognition",
      },
      {
        year: 1960,
        title:
          "Federer–Fleming extend to arbitrary dimensions via integral currents",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Minimal surface equation",
      latex: String.raw`\min_{\partial\Sigma=\Gamma}\operatorname{area}(\Sigma)\quad\Longleftrightarrow\quad H=0\text{ on }\Sigma`,
      description:
        "A surface spanning a given boundary wire minimizes area if and only if its mean curvature vanishes everywhere.",
    },
    {
      label: "Mean curvature",
      latex: String.raw`H=\frac{\kappa_1+\kappa_2}{2}=0`,
      description:
        "The average of the two principal curvatures vanishes on a minimal surface — the Euler–Lagrange equation for the area functional.",
    },
    {
      label: "Douglas–Radó existence",
      latex: String.raw`\Gamma\text{ rectifiable Jordan curve in }\mathbb{R}^3\;\Longrightarrow\;\exists\,\Sigma\text{ minimal disk with }\partial\Sigma=\Gamma`,
      description:
        "Douglas (1931) and Radó (1930) independently proved existence of a minimal disk spanning any rectifiable Jordan curve.",
    },
  ]
});

export default plateauProblem;
