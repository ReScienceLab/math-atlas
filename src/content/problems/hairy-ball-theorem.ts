import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const hairyBallTheorem = defineProblem({
  slug: "hairy-ball-theorem",
  title: "Hairy Ball Theorem",
  status: "proved",
  field: "topology",
  year: 1912,
  shortDescription:
      "Every continuous tangent vector field on an even-dimensional sphere must vanish somewhere.",
  longDescription:
      "You cannot comb the hair on a coconut flat without creating a cowlick. More precisely, every continuous tangent vector field on S² must have a zero — a consequence of the Euler characteristic χ(S²) = 2 ≠ 0. Via the Poincaré–Hopf index theorem, the indices at all zeros must sum to χ, so the obstruction is purely topological. The result generalizes to all even-dimensional spheres S²ⁿ.",
  vizComponent: "HairyBallViz",
  collections: ["canonical", "beautiful"],
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
      "Topology",
      "Vector fields",
      "Euler characteristic",
      "Poincaré–Hopf theorem",
    ],
  authors: [
      {
        name: "Henri Poincaré",
        institution: "University of Paris",
        scholarUrl: scholarSearch(
          "Henri Poincare vector fields sphere topology",
        ),
      },
      {
        name: "L. E. J. Brouwer",
        institution: "University of Amsterdam",
        scholarUrl: scholarSearch("L E J Brouwer hairy ball theorem"),
      },
      {
        name: "Heinz Hopf",
        institution: "ETH Zürich",
        scholarUrl: scholarSearch(
          "Heinz Hopf Vektorfelder Mannigfaltigkeiten index theorem",
        ),
      },
    ],
  papers: [
      {
        title:
          "Über Abbildung von Mannigfaltigkeiten — Brouwer's proof for all even-dimensional spheres",
        url: "https://doi.org/10.1007/BF01456931",
        year: 1912,
      },
      {
        title:
          "Analytic proofs of the 'hairy ball theorem' and the Brouwer fixed point theorem",
        url: "https://doi.org/10.1080/00029890.1978.11994635",
        year: 1978,
      },
      {
        title: "The Hairy Ball Theorem via Sperner's Lemma",
        url: "https://doi.org/10.1080/00029890.2004.11920120",
        year: 2004,
      },
    ],
  videos: [
    {
      title: "The Hairy Ball Theorem",
      videoId: "BHdbsHFs2P0",
      channel: "3Blue1Brown",
    },
  ],
  timeline: [
      {
        year: 1885,
        title:
          "Poincaré proves the theorem for S² via differential equations on surfaces",
        type: "origin",
      },
      {
        year: 1912,
        title: "Brouwer extends the proof to all even-dimensional spheres S²ⁿ",
        type: "breakthrough",
      },
      {
        year: 1926,
        title:
          "Hopf generalises the Poincaré–Hopf index theorem to arbitrary dimensions",
        type: "breakthrough",
      },
      {
        year: 1978,
        title: "Milnor gives a purely analytic proof using only calculus",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Theorem",
      latex: String.raw`v : S^{2n} \to \mathbb{R}^{2n+1}\text{ continuous, }v(p)\perp p\ \forall p \quad\Longrightarrow\quad \exists\, p,\ v(p)=\mathbf{0}`,
      description:
        "Every continuous tangent vector field on an even-dimensional sphere must vanish at some point.",
    },
    {
      label: "Poincaré–Hopf index theorem",
      latex: String.raw`\sum_{i}\operatorname{ind}_{x_i}(v)=\chi(M)`,
      description:
        "The sum of the indices at all isolated zeros of a vector field equals the Euler characteristic of the manifold.",
    },
    {
      label: "Euler characteristic",
      latex: String.raw`\chi(S^n)=1+(-1)^n=\begin{cases}2 & n\text{ even}\\0 & n\text{ odd}\end{cases}`,
      description:
        "Since χ(S²ⁿ) = 2 ≠ 0, no non-vanishing tangent vector field can exist. Odd-dimensional spheres have χ = 0 and do admit one.",
    },
  ]
});

export default hairyBallTheorem;
