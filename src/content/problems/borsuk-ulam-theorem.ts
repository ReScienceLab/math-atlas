import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const borsukUlamTheorem = defineProblem({
  slug: "borsuk-ulam-theorem",
  title: "Borsuk–Ulam Theorem",
  status: "proved",
  field: "topology",
  year: 1933,
  shortDescription:
      "Every continuous map from a sphere to a plane identifies some pair of antipodal points.",
  longDescription:
      "At every instant, two diametrically opposite points on Earth share the same temperature and barometric pressure. Formally, every continuous f: Sⁿ → Rⁿ satisfies f(x) = f(−x) for some x. The proof rests on the algebraic topology of the ℤ/2-action on spheres: no continuous antipodal-preserving map Sⁿ → Sⁿ⁻¹ can exist. The theorem unifies results from the ham sandwich theorem to Tucker's lemma, making it one of the most widely applied tools in topological combinatorics.",
  vizComponent: "BorsukUlamViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 9,
      importance: 8,
      activity: 6,
      accessibility: 8,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Topology",
      "Antipodal maps",
      "Ham sandwich theorem",
      "Tucker's lemma",
    ],
  authors: [
      {
        name: "Karol Borsuk",
        institution: "University of Warsaw",
        scholarUrl: scholarSearch("Karol Borsuk Borsuk Ulam theorem"),
      },
      {
        name: "Stanisław Ulam",
        institution: "Lwów Polytechnic",
        scholarUrl: scholarSearch("Stanislaw Ulam Borsuk Ulam conjecture"),
      },
      {
        name: "Jiří Matoušek",
        institution: "Charles University, Prague",
        scholarUrl: scholarSearch(
          "Jiri Matousek Borsuk Ulam topological combinatorics",
        ),
      },
    ],
  papers: [
      {
        title:
          "Drei Sätze über die n-dimensionale euklidische Sphäre — Borsuk's original proof",
        url: "https://doi.org/10.4064/fm-20-1-177-190",
        year: 1933,
      },
      {
        title: "Borsuk-Ulam Implies Brouwer: A Direct Construction",
        url: "https://doi.org/10.2307/2975293",
        year: 1997,
      },
      {
        title:
          "Using the Borsuk-Ulam Theorem — Lectures on Topological Methods in Combinatorics and Geometry",
        url: "https://doi.org/10.1007/978-3-540-76649-0",
        year: 2003,
      },
    ],
  timeline: [
      {
        year: 1930,
        title: "Lyusternik–Shnirel'man prove the covering theorem, a precursor",
        type: "origin",
      },
      {
        year: 1933,
        title: "Borsuk proves the conjecture posed by Ulam",
        type: "breakthrough",
      },
      {
        year: 1954,
        title: "Yang generalises to arbitrary free involutions on spheres",
        type: "progress",
      },
      {
        year: 1997,
        title:
          "Su gives an elegant elementary proof that Borsuk-Ulam implies Brouwer",
        type: "progress",
      },
      {
        year: 2003,
        title: "Matoušek's monograph becomes the definitive modern reference",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Theorem",
      latex: String.raw`f:S^n\to\mathbb{R}^n\text{ continuous}\quad\Longrightarrow\quad\exists\,x\in S^n,\;f(x)=f(-x)`,
      description:
        "Every continuous map from the n-sphere to Rⁿ identifies some pair of antipodal points.",
    },
    {
      label: "Equivalent (no antipodal map)",
      latex: String.raw`\nexists\;g:S^n\to S^{n-1}\text{ continuous and odd }\bigl(g(-x)=-g(x)\bigr)`,
      description:
        "There is no continuous antipodal map from Sⁿ to Sⁿ⁻¹ — equivalent to Borsuk–Ulam via normalization.",
    },
    {
      label: "Topological degree",
      latex: String.raw`\deg(g)\equiv 1\pmod{2}\quad\text{for }g:S^n\to S^n\text{ odd}`,
      description:
        "Any odd map from Sⁿ to Sⁿ has odd degree — the algebraic-topology engine behind Borsuk–Ulam.",
    },
  ]
});

export default borsukUlamTheorem;
