import { defineProblem } from "@/lib/problem-template";

export const navierStokes = defineProblem({
  slug: "navier-stokes",
  title: "Navier-Stokes Existence and Smoothness",
  status: "open",
  field: "analysis",
  year: 1822,
  shortDescription:
      "Asks whether smooth 3D incompressible fluid flows can develop singularities.",
  longDescription:
      "The Navier-Stokes existence and smoothness problem asks whether, in three dimensions, smooth and globally defined solutions to the incompressible Navier-Stokes equations exist for all time given any smooth initial velocity field of finite energy. The equations have governed our understanding of fluid dynamics since the 19th century, yet mathematicians cannot prove that solutions remain smooth or show they develop singularities. Jean Leray proved the existence of weak solutions in 1934, and Caffarelli, Kohn, and Nirenberg established partial regularity in 1982, but the full regularity question in 3D remains wide open. Terence Tao's 2016 work on averaged Navier-Stokes showed that any resolution must exploit the specific nonlinear structure of the equations.",
  vizComponent: "NavierStokesViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 9,
      importance: 10,
      activity: 10,
      accessibility: 5,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["PDE", "Fluid dynamics", "Turbulence"],
  authors: [
      {
        name: "Charles Fefferman",
        institution: "Princeton University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Charles_Fefferman",
      },
      {
        name: "Jean Leray",
        institution: "College de France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jean_Leray",
      },
      {
        name: "Terence Tao",
        institution: "UCLA",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Terence_Tao",
      },
    ],
  papers: [
      {
        title: "Sur le mouvement d'un liquide visqueux emplissant l'espace",
        url: "https://doi.org/10.1007/BF02547354",
        year: 1934,
      },
      {
        title:
          "Existence and Smoothness of the Navier-Stokes Equation (CMI problem statement)",
        url: "https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf",
        year: 2000,
      },
      {
        title:
          "Finite time blowup for an averaged three-dimensional Navier-Stokes equation",
        url: "https://doi.org/10.1090/jams/838",
        year: 2016,
      },
    ],
  videos: [
    {
      title: "Navier-Stokes Equations - Numberphile",
      videoId: "ERBVFcutl3M",
      channel: "Numberphile",
    },
    {
      title: "The million dollar problem of fluid dynamics",
      videoId: "7ZgcydJdEMo",
      channel: "Dr. Trefor Bazett",
    },
  ],
  timeline: [
      {
        year: 1822,
        title: "Navier derives the viscous fluid equations",
        description:
          "Claude-Louis Navier introduces viscosity into the equations of fluid motion, laying the foundation for the modern Navier-Stokes equations.",
        type: "origin",
      },
      {
        year: 1845,
        title: "Stokes completes the modern formulation",
        description:
          "George Gabriel Stokes derives the equations in their current form from continuum mechanics principles.",
        type: "origin",
      },
      {
        year: 1934,
        title: "Leray proves existence of weak solutions",
        description:
          "Jean Leray's landmark Acta Mathematica paper establishes that weak (distributional) solutions exist globally in time, founding the modern mathematical study of the equations.",
        type: "breakthrough",
      },
      {
        year: 1982,
        title: "Caffarelli-Kohn-Nirenberg partial regularity",
        description:
          "They prove that the set of possible singularities of a suitable weak solution has one-dimensional parabolic Hausdorff measure zero, the strongest partial regularity result known.",
        type: "breakthrough",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem",
        description:
          "Charles Fefferman formulates the official problem statement for the Clay Mathematics Institute, with a $1,000,000 prize.",
        type: "recognition",
      },
      {
        year: 2016,
        title: "Tao proves blowup for averaged Navier-Stokes",
        description:
          "Terence Tao constructs solutions to a modified ('averaged') version that blow up in finite time, showing any proof must use the specific nonlinear structure.",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Navier–Stokes equations",
      latex: String.raw`\partial_t u+(u\cdot\nabla)u=-\nabla p+\nu\,\Delta u,\qquad \nabla\cdot u=0`,
      description:
        "The fundamental PDE governing viscous incompressible fluid flow: momentum balance coupled with divergence-free constraint.",
    },
    {
      label: "Millennium problem (regularity)",
      latex: String.raw`u_0\in C^\infty(\mathbb{R}^3)\quad\Longrightarrow\quad u(\cdot,t)\in C^\infty(\mathbb{R}^3)\;\forall\,t>0\;?`,
      description:
        "Do smooth initial data always produce globally smooth solutions in 3D, or can singularities form in finite time?",
    },
    {
      label: "Leray weak solutions (1934)",
      latex: String.raw`\exists\,u\in L^\infty(0,\infty;L^2)\cap L^2(0,\infty;\dot{H}^1):\;\text{weak solution for any }u_0\in L^2`,
      description:
        "Leray proved global weak solutions always exist in 3D — but uniqueness and regularity of these solutions remain open.",
    },
  ]
});

export default navierStokes;
