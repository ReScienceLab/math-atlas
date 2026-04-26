import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const mizohataTakeuchi = defineProblem({
  slug: "mizohata-takeuchi",
  title: "Mizohata-Takeuchi Conjecture",
  status: "disproved",
  field: "analysis",
  year: 2025,
  shortDescription:
      "17-year-old found a counterexample to the 40-year-old conjecture about Fourier restriction estimates.",
  longDescription:
      "The Mizohata-Takeuchi conjecture (1985) proposed that certain weighted Fourier restriction estimates should always hold for positive Borel measures on spheres. Hannah Cairo, at age 17, found an explicit counterexample that disproved it. She went directly into a PhD program, skipping undergrad.",
  vizComponent: "MizohataViz",
  collections: ["beautiful", "frontier", "recent"],
  coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 8,
      importance: 7,
      activity: 8,
      accessibility: 5,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: ["Fourier analysis", "Restriction theory", "Counterexamples"],
  authors: [
      {
        name: "Hannah Cairo",
        institution: "University of Maryland (PhD)",
        scholarUrl: "https://scholar.google.com/citations?user=mgVHOr0AAAAJ",
        homepageUrl: "https://sites.google.com/view/hannah-cairo/",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Hannah_Cairo",
      },
      {
        name: "Sigmund Mizohata",
        institution: "Kyoto University",
        scholarUrl: scholarSearch("Mizohata Takeuchi Fourier restriction"),
      },
      {
        name: "Izabella Łaba",
        institution: "University of British Columbia",
        scholarUrl: scholarSearch("Izabella Laba harmonic analysis Kakeya"),
      },
    ],
  papers: [
      {
        title: "A Counterexample to the Mizohata-Takeuchi Conjecture",
        arxivId: "2502.06137",
        url: "https://arxiv.org/abs/2502.06137",
        year: 2025,
      },
      {
        title: "The Mizohata-Takeuchi conjecture and the Stein conjecture",
        arxivId: "2311.09000",
        url: "https://arxiv.org/abs/2311.09000",
        year: 2023,
      },
      {
        title: "Fourier restriction to convex surfaces in R^3",
        url: "https://doi.org/10.1007/s00222-024-01282-y",
        year: 2024,
      },
    ],
  timeline: [
      {
        year: 1970,
        title:
          "Stein proposes Fourier restriction conjecture for curved surfaces",
        type: "origin",
      },
      {
        year: 1985,
        title:
          "Mizohata and Takeuchi conjecture weighted restriction estimates",
        type: "origin",
      },
      {
        year: 2023,
        title: "Renewed interest: connections to Stein conjecture explored",
        type: "progress",
      },
      {
        year: 2025,
        title: "Hannah Cairo (age 17) finds explicit counterexample",
        type: "breakthrough",
      },
      {
        year: 2025,
        title: "Cairo enters PhD at University of Maryland, skipping undergrad",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Restriction estimate (disproved conjecture)",
      latex: String.raw`\|\widehat{f\,d\sigma}\|_{L^2(\mu)}\le C\,\|\mu\|_{\text{MT}}^{1/2}\,\|f\|_{L^2(\sigma)}`,
      description:
        "The Mizohata–Takeuchi conjecture predicted that a single condition on the measure μ would control Fourier restriction.",
    },
    {
      label: "Mizohata–Takeuchi condition",
      latex: String.raw`\|\mu\|_{\text{MT}} = \sup_{T\text{ tube}} \frac{\mu(T)}{|T|^{1/2}} < \infty`,
      description:
        "The Mizohata–Takeuchi norm measures concentration of μ along thin tubes — necessary but not sufficient for restriction.",
    },
    {
      label: "Counterexample",
      latex: String.raw`\exists\,\mu:\;\|\mu\|_{\text{MT}}<\infty\;\text{ but the restriction estimate fails}`,
      description:
        "Disproved by exhibiting a measure with bounded MT norm but unbounded Fourier restriction — showing the conjecture was too optimistic.",
    },
  ]
});

export default mizohataTakeuchi;
