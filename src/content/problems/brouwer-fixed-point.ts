import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const brouwerFixedPoint = defineProblem({
  slug: "brouwer-fixed-point",
  title: "Brouwer Fixed Point Theorem",
  status: "proved",
  field: "topology",
  year: 1911,
  shortDescription:
      "Every continuous map from a closed ball to itself has at least one fixed point.",
  longDescription:
      "Stir your coffee however you like — at least one molecule returns to where it started. Brouwer's theorem says every continuous self-map of Dⁿ has a fixed point. Equivalently, there is no continuous retraction from the ball onto its boundary. The Lefschetz number of any such map is 1 ≠ 0, forcing a fixed point purely by topology. Kakutani's 1941 extension to set-valued maps gave Nash the tool to prove that every finite game has an equilibrium.",
  vizComponent: "BrouwerViz",
  collections: ["canonical", "beautiful"],
  coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 9,
      importance: 9,
      activity: 6,
      accessibility: 8,
    },
  consensusStatus: "settled",
  lastReviewed: "2026-04",
  connections: [
      "Topology",
      "Fixed points",
      "Game theory",
      "Lefschetz theorem",
      "Sperner's lemma",
    ],
  authors: [
      {
        name: "L. E. J. Brouwer",
        institution: "University of Amsterdam",
        scholarUrl: scholarSearch("L E J Brouwer fixed point theorem"),
      },
      {
        name: "Jacques Hadamard",
        institution: "Collège de France",
        scholarUrl: scholarSearch(
          "Hadamard fixed point theorem continuous mapping",
        ),
      },
      {
        name: "Solomon Lefschetz",
        institution: "Princeton University",
        scholarUrl: scholarSearch("Solomon Lefschetz fixed point theorem"),
      },
    ],
  papers: [
      {
        title:
          "Über Abbildung von Mannigfaltigkeiten — Brouwer's original proof via mapping degree",
        url: "https://doi.org/10.1007/BF01456931",
        year: 1911,
      },
      {
        title:
          "Analytic proofs of the 'hairy ball theorem' and the Brouwer fixed point theorem",
        url: "https://doi.org/10.1080/00029890.1978.11994635",
        year: 1978,
      },
      {
        title:
          "A generalization of Brouwer's fixed point theorem — Kakutani's set-valued extension",
        url: "https://doi.org/10.1215/S0012-7094-41-00838-4",
        year: 1941,
      },
    ],
  timeline: [
      {
        year: 1904,
        title: "Bohl proves the theorem for n = 3, but the work goes unnoticed",
        type: "origin",
      },
      {
        year: 1911,
        title:
          "Brouwer publishes the general proof using the degree of a mapping",
        type: "breakthrough",
      },
      {
        year: 1926,
        title:
          "Lefschetz generalises to the Lefschetz fixed-point theorem (Λ_f ≠ 0 ⇒ fixed point)",
        type: "breakthrough",
      },
      {
        year: 1929,
        title:
          "Knaster–Kuratowski–Mazurkiewicz give a combinatorial proof via Sperner's lemma",
        type: "progress",
      },
      {
        year: 1950,
        title:
          "Nash uses Kakutani's extension to prove existence of Nash equilibria",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "Theorem",
      latex: String.raw`f: D^n \to D^n \text{ continuous} \quad\Longrightarrow\quad \exists\, x_0 \in D^n,\; f(x_0) = x_0`,
      description:
        "Every continuous self-map of the closed unit ball has at least one fixed point.",
    },
    {
      label: "No-retraction (equivalent)",
      latex: String.raw`\nexists\; r: D^n \to S^{n-1} \text{ continuous with } r|_{S^{n-1}} = \mathrm{id}`,
      description:
        "If a fixed-point-free map existed, the ray from f(x) through x would define a retraction — but no such retraction can exist.",
    },
    {
      label: "Lefschetz number",
      latex: String.raw`\Lambda_f = \sum_{k \ge 0} (-1)^k \operatorname{tr}(f_{*k}) = 1 \neq 0 \quad\Longrightarrow\quad \text{fixed point}`,
      description:
        "Since Dⁿ is contractible, Λ_f = 1 for every self-map. The Lefschetz theorem then guarantees a fixed point.",
    },
  ]
});

export default brouwerFixedPoint;
