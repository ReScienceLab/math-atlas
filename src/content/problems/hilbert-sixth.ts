import { defineProblem } from "@/lib/problem-template";

export const hilbertSixth = defineProblem({
  slug: "hilbert-sixth",
  title: "Hilbert's Sixth Problem",
  status: "resolved",
  field: "mathematical-physics",
  year: 2025,
  shortDescription:
      "Rigorously derived Euler and Navier-Stokes equations from hard-sphere particle dynamics.",
  longDescription:
      "Hilbert's 6th problem (1900) asks for the axiomatization of physics. Deng, Hani, and Ma rigorously derived the fundamental equations of fluid mechanics \u2014 compressible Euler and incompressible Navier-Stokes-Fourier \u2014 from Newtonian particle dynamics via the Boltzmann-Grad limit. A 125-year challenge.",
  vizComponent: "HilbertViz",
  collections: ["canonical", "unification", "frontier", "recent"],
  coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 8,
      importance: 9,
      activity: 9,
      accessibility: 4,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["PDE", "Statistical mechanics", "Fluid dynamics"],
  authors: [
      {
        name: "Yu Deng",
        institution: "University of Chicago",
        scholarUrl: "https://scholar.google.com/citations?user=AshwaigAAAAJ",
        homepageUrl: "https://sites.google.com/uchicago.edu/yudeng/",
      },
      {
        name: "Zaher Hani",
        institution: "University of Michigan",
        scholarUrl: "https://scholar.google.com/citations?user=qp7ABIsAAAAJ",
        homepageUrl: "https://sites.lsa.umich.edu/zhani/",
      },
      {
        name: "Xiao Ma",
        institution: "Co-author",
      },
    ],
  papers: [
      {
        title:
          "Hilbert's sixth problem: derivation of fluid equations via Boltzmann's kinetic theory",
        arxivId: "2503.01800",
        url: "https://arxiv.org/abs/2503.01800",
        year: 2025,
      },
      {
        title: "Time evolution of large classical systems",
        url: "https://doi.org/10.1007/BFb0091149",
        year: 1975,
      },
      {
        title:
          "Hilbert's sixth problem: derivation of fluid equations via Boltzmann's kinetic theory",
        arxivId: "2408.07818",
        url: "https://arxiv.org/abs/2408.07818",
        year: 2024,
      },
    ],
  timeline: [
      {
        year: 1900,
        title: "Hilbert poses 23 problems at ICM Paris; #6: axiomatize physics",
        type: "origin",
      },
      {
        year: 1872,
        title: "Boltzmann derives kinetic equation (pre-Hilbert)",
        type: "progress",
      },
      {
        year: 1975,
        title: "Lanford's theorem: short-time derivation",
        type: "progress",
      },
      {
        year: 2025,
        month: "Mar",
        title: "Deng-Hani-Ma derive full Euler & Navier-Stokes",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Boltzmann equation",
      latex: String.raw`\partial_t f + v\cdot\nabla_x f = Q(f,f)`,
      description:
        "The kinetic equation governing the distribution of particles in a dilute gas — the central bridge in Hilbert's sixth problem.",
    },
    {
      label: "Hydrodynamic limit",
      latex: String.raw`f^\varepsilon \xrightarrow{\varepsilon\to 0} M_{\rho,u,T}\quad\Longrightarrow\quad (\rho,u,T)\text{ solve Euler or Navier–Stokes}`,
      description:
        "In the small mean-free-path limit, the Boltzmann distribution converges to a local Maxwellian whose parameters satisfy fluid equations.",
    },
    {
      label: "Lanford's theorem (1975)",
      latex: String.raw`f_N^{(1)}(t)\to f(t)\quad\text{as }N\to\infty,\quad t < \tfrac{1}{5}t_{\text{mfp}}`,
      description:
        "Rigorous derivation of the Boltzmann equation from Newtonian N-particle dynamics, valid for short times.",
    },
  ]
});

export default hilbertSixth;
