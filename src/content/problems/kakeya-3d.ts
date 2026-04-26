import { defineProblem } from "@/lib/problem-template";

export const kakeya3d = defineProblem({
  slug: "kakeya-3d",
  title: "Kakeya Conjecture (3D)",
  status: "proved",
  field: "analysis",
  year: 2025,
  shortDescription:
      "Any set in R\u00b3 containing a unit segment in every direction must have Hausdorff dimension 3.",
  longDescription:
      "The Kakeya conjecture asks: what is the smallest possible Hausdorff dimension of a compact set in R\u207f that contains a unit line segment in every direction? In 3D, the conjecture predicts dimension 3 (full). This was open for 50 years until Wang and Zahl's proof in February 2025, which Quanta Magazine called 'once in a century.'",
  vizComponent: "KakeyaViz",
  collections: ["beautiful", "frontier", "recent"],
  coordinates: {
      difficulty: 9,
      beauty: 9,
      visual: 10,
      importance: 8,
      activity: 9,
      accessibility: 6,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Fourier restriction",
      "Incidence geometry",
      "Hausdorff dimension",
    ],
  authors: [
      {
        name: "Hong Wang",
        institution: "NYU Courant / IH\u00c9S",
        scholarUrl: "https://scholar.google.com/citations?user=wulKoVsAAAAJ",
        avatarUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Hong_Wang_%282025%29.jpg/250px-Hong_Wang_%282025%29.jpg",
        homepageUrl: "https://sites.google.com/view/hongwang/home",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Hong_Wang",
      },
      {
        name: "Joshua Zahl",
        institution: "Nankai University (prev. UBC)",
        scholarUrl: "https://scholar.google.com/citations?user=9V39xzQAAAAJ",
        homepageUrl: "https://personal.math.ubc.ca/~jzahl/",
      },
    ],
  papers: [
      {
        title:
          "Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions",
        arxivId: "2502.17655",
        url: "https://arxiv.org/abs/2502.17655",
        year: 2025,
      },
      {
        title: "Kakeya sets in R^3",
        url: "https://doi.org/10.1090/S0894-0347-99-00283-8",
        year: 1999,
      },
      {
        title:
          "A proof of the Kakeya set conjecture over rings of integers modulo square-free N",
        arxivId: "2406.19803",
        url: "https://arxiv.org/abs/2406.19803",
        year: 2025,
      },
    ],
  timeline: [
      { year: 1917, title: "Kakeya poses the needle problem", type: "origin" },
      {
        year: 1928,
        title: "Besicovitch shows measure can be zero",
        type: "progress",
      },
      {
        year: 1971,
        title: "Davies proves 2D case (dim = 2)",
        type: "progress",
      },
      {
        year: 2002,
        title: "Katz-Tao prove dim \u2265 5/2 + \u03b5 in 3D",
        type: "progress",
      },
      {
        year: 2025,
        month: "Feb",
        title: "Wang & Zahl prove dim = 3 in 3D",
        type: "breakthrough",
      },
      {
        year: 2026,
        title:
          "Wang wins New Horizons Prize; top Fields Medal candidate (~72%)",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Kakeya conjecture (3D)",
      latex: String.raw`K\subset\mathbb{R}^3,\; K\text{ Besicovitch set}\quad\Longrightarrow\quad \dim_H K=3`,
      description:
        "In three dimensions the Kakeya conjecture remains open — it implies key estimates in harmonic analysis and PDE.",
    },
    {
      label: "Wang–Zahl breakthrough (2025)",
      latex: String.raw`\dim_H K \ge 3 - \frac{1}{4} + \eta\quad\text{for some }\eta > 0`,
      description:
        "Wang and Zahl proved the first bound exceeding 5/2 + 1/4, breaking a longstanding barrier using refined polynomial methods.",
    },
    {
      label: "Wolff's hairbrush bound",
      latex: String.raw`\dim_H K \ge \tfrac{5}{2}\quad\text{for }K\subset\mathbb{R}^3`,
      description:
        "Wolff (1995) established dim ≥ 5/2 using the hairbrush argument, the first major advance beyond Bourgain's earlier bound.",
    },
  ]
});

export default kakeya3d;
