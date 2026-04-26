import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const hamSandwichTheorem = defineProblem({
  slug: "ham-sandwich-theorem",
  title: "Ham Sandwich Theorem",
  status: "proved",
  field: "geometry",
  year: 1942,
  shortDescription:
      "In n dimensions, one hyperplane can simultaneously bisect n measurable bodies.",
  longDescription:
      "Slice a ham sandwich — two slices of bread and a slab of ham — with one straight cut so each ingredient is exactly halved. The theorem guarantees this is always possible: given n measurable bodies in Rⁿ, a single hyperplane bisects all n simultaneously. The proof is a direct application of Borsuk–Ulam — each direction on Sⁿ⁻¹ determines a family of hyperplanes, and the topological obstruction forces a bisecting cut to exist.",
  vizComponent: "HamSandwichViz",
  collections: ["beautiful", "canonical"],
  coordinates: {
      difficulty: 6,
      beauty: 9,
      visual: 10,
      importance: 7,
      activity: 5,
      accessibility: 10,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Measure theory",
      "Topology",
      "Borsuk–Ulam theorem",
      "Fair division",
    ],
  authors: [
      {
        name: "Arthur H. Stone",
        institution: "Princeton University",
        scholarUrl: scholarSearch("Arthur H Stone ham sandwich theorem"),
      },
      {
        name: "John W. Tukey",
        institution: "Princeton University",
        scholarUrl: scholarSearch("John Tukey ham sandwich theorem"),
      },
      {
        name: "Stefan Banach",
        institution: "University of Lwów",
        scholarUrl: scholarSearch("Stefan Banach ham sandwich theorem"),
      },
    ],
  papers: [
      {
        title: "Generalized 'sandwich' theorems",
        url: "https://doi.org/10.1215/S0012-7094-42-00925-6",
        year: 1942,
      },
      {
        title: "Algorithms for Ham-Sandwich Cuts",
        url: "https://doi.org/10.1007/BF02574017",
        year: 1994,
      },
      {
        title:
          "Using the Borsuk-Ulam Theorem — Topological Methods in Combinatorics and Geometry",
        url: "https://doi.org/10.1007/978-3-540-76649-0",
        year: 2003,
      },
    ],
  videos: [
    {
      title: "Ham Sandwich Problem - Numberphile",
      videoId: "YCXmUi56rao",
      channel: "Numberphile",
    },
    {
      title: "Topology is weird: The Ham Sandwich Theorem",
      videoId: "Mh0rtVfLfs0",
      channel: "Dr. Trefor Bazett",
    },
    {
      title: "The Ham Sandwich Theorem Will Change How You See the Universe",
      videoId: "uhNqEs7vDGg",
      channel: "Up and Atom",
    },
  ],
  timeline: [
      {
        year: 1938,
        title:
          "Steinhaus poses the problem; Banach gives the first proof via Borsuk–Ulam",
        type: "origin",
      },
      {
        year: 1942,
        title: "Stone and Tukey prove the general n-dimensional theorem",
        type: "breakthrough",
      },
      {
        year: 1994,
        title: "Lo–Matoušek–Steiger achieve optimal O(n) algorithm in 2D",
        type: "progress",
      },
      {
        year: 2003,
        title:
          "Matoušek's monograph places the theorem in topological combinatorics",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Theorem",
      latex: String.raw`\mu_1,\dots,\mu_n\text{ in }\mathbb{R}^n\quad\Longrightarrow\quad\exists\,\text{hyperplane }H:\;\mu_i(H^+)=\mu_i(H^-)\;\forall\,i`,
      description:
        "One hyperplane can simultaneously bisect n finite Borel measures in Rⁿ — proved via the Borsuk–Ulam theorem.",
    },
    {
      label: "Borsuk–Ulam proof sketch",
      latex: String.raw`F:S^{n-1}\to\mathbb{R}^{n-1},\quad F_i(u)=\mu_i(H_u^+)-\tfrac{1}{2}\mu_i\quad\Longrightarrow\quad F(u_0)=\mathbf{0}`,
      description:
        "Map each direction to the imbalance vector; Borsuk–Ulam forces a zero, which is the bisecting hyperplane.",
    },
    {
      label: "Polynomial ham sandwich (Guth–Katz)",
      latex: String.raw`\exists\,P\in\mathbb{R}[x_1,\dots,x_n],\;\deg P\le d:\;P=0\text{ bisects }\binom{d+n}{n}-1\text{ measures}`,
      description:
        "The polynomial generalization uses algebraic hypersurfaces instead of hyperplanes, key to the Erdős distinct-distances solution.",
    },
  ]
});

export default hamSandwichTheorem;
