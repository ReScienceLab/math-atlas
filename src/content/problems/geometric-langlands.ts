import { defineProblem } from "@/lib/problem-template";

export const geometricLanglands = defineProblem({
  slug: "geometric-langlands",
  title: "Geometric Langlands Conjecture",
  status: "proved",
  field: "algebra",
  year: 2024,
  shortDescription:
      "The 'grand unification' connecting number theory, algebraic geometry, and representation theory.",
  longDescription:
      "The Langlands program is often called the 'grand unified theory of mathematics.' The geometric Langlands conjecture establishes an equivalence between D-modules on BunG and quasi-coherent sheaves on LocSys\u011e. Gaitsgory led a 30-year effort culminating in 5 papers totaling 800+ pages.",
  vizComponent: "LanglandsViz",
  collections: ["canonical", "unification", "frontier", "recent"],
  coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 7,
      importance: 10,
      activity: 10,
      accessibility: 3,
    },
  consensusStatus: "emerging",
  lastReviewed: "2026-04",
  connections: [
      "Number theory",
      "Algebraic geometry",
      "Representation theory",
    ],
  authors: [
      {
        name: "Dennis Gaitsgory",
        institution: "Max Planck Institute (Bonn)",
        avatarUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Dennis_Gaitsgory.jpg/250px-Dennis_Gaitsgory.jpg",
        homepageUrl: "https://people.mpim-bonn.mpg.de/gaitsgde/",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Dennis_Gaitsgory",
      },
      {
        name: "Sam Raskin",
        institution: "Yale University",
        homepageUrl: "https://gauss.math.yale.edu/~sr2532/",
      },
    ],
  papers: [
      {
        title:
          "Proof of the geometric Langlands conjecture I: construction of the functor",
        arxivId: "2405.03599",
        url: "https://arxiv.org/abs/2405.03599",
        year: 2024,
      },
      {
        title:
          "Quantization of Hitchin's integrable system and Hecke eigensheaves",
        url: "https://math.uchicago.edu/~drinfeld/langlands/QuantizationHitchin.pdf",
        year: 2002,
      },
      {
        title: "Lectures on the Langlands program and conformal field theory",
        arxivId: "hep-th/0512172",
        url: "https://arxiv.org/abs/hep-th/0512172",
        year: 2007,
      },
    ],
  timeline: [
      {
        year: 1967,
        title: "Langlands writes his famous letter to Weil",
        type: "origin",
      },
      {
        year: 1990,
        title: "Beilinson-Drinfeld formulate geometric version",
        type: "progress",
      },
      {
        year: 2000,
        title: "Gaitsgory begins systematic program",
        type: "progress",
      },
      {
        year: 2024,
        title: "Proof completed: 5 papers, 800+ pages",
        type: "breakthrough",
      },
      {
        year: 2025,
        title: "Gaitsgory wins Breakthrough Prize ($3M)",
        type: "recognition",
      },
      {
        year: 2026,
        month: "Mar",
        title: "Scholze proposes 'Langlands Program 2.0'",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Geometric Langlands correspondence",
      latex: String.raw`D\text{-}\mathrm{mod}(\operatorname{Bun}_G)\;\simeq\;\mathrm{IndCoh}(\operatorname{LocSys}_{\check{G}})`,
      description:
        "An equivalence of derived categories: D-modules on the moduli of G-bundles correspond to sheaves on Ǧ-local systems.",
    },
    {
      label: "Hecke eigensheaf property",
      latex: String.raw`H_V(\mathcal{F}_\sigma)\cong V_\sigma\boxtimes\mathcal{F}_\sigma`,
      description:
        "The Hecke operators act on the automorphic sheaf by the corresponding representation of the dual group — the geometric analog of being an eigenfunction.",
    },
    {
      label: "Classical Langlands (number-field analog)",
      latex: String.raw`\{\text{automorphic representations of }G\}\;\longleftrightarrow\;\{\text{Galois representations into }\check{G}\}`,
      description:
        "The original Langlands conjecture for number fields, of which geometric Langlands is the function-field / algebro-geometric avatar.",
    },
  ]
});

export default geometricLanglands;
