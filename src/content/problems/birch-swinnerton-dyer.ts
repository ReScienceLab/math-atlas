import { defineProblem } from "@/lib/problem-template";

export const birchSwinnertonDyer = defineProblem({
  slug: "birch-swinnerton-dyer",
  title: "Birch and Swinnerton-Dyer Conjecture",
  status: "open",
  field: "number-theory",
  year: 1965,
  shortDescription:
      "Relates rational points on elliptic curves to the behavior of their L-functions at s = 1.",
  longDescription:
      "The Birch and Swinnerton-Dyer conjecture predicts that the algebraic rank of an elliptic curve E over the rationals -- the number of independent rational points of infinite order -- equals the analytic rank, the order of vanishing of its Hasse-Weil L-function L(E,s) at s = 1. A refined version gives a precise formula for the leading Taylor coefficient involving the Tate-Shafarevich group, the regulator, real periods, and Tamagawa numbers. The conjecture emerged from extensive numerical computation on the Cambridge EDSAC-2 in the early 1960s. Major partial results include the Coates-Wiles theorem (1977) for CM curves, the Gross-Zagier formula (1986) connecting Heegner points to L-function derivatives, and Kolyvagin's Euler system method (1989) settling the rank 0 and 1 cases for modular elliptic curves.",
  vizComponent: "BSDViz",
  collections: ["canonical", "unification"],
  coordinates: {
      difficulty: 10,
      beauty: 9,
      visual: 7,
      importance: 10,
      activity: 9,
      accessibility: 4,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Elliptic curves", "L-functions", "Rational points"],
  authors: [
      {
        name: "Bryan Birch",
        institution: "University of Oxford",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Bryan_John_Birch",
      },
      {
        name: "Peter Swinnerton-Dyer",
        institution: "University of Cambridge",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Peter_Swinnerton-Dyer",
      },
      {
        name: "Andrew Wiles",
        institution: "University of Oxford",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Andrew_Wiles",
      },
    ],
  papers: [
      {
        title: "On the conjecture of Birch and Swinnerton-Dyer",
        url: "https://doi.org/10.1007/BF01402975",
        year: 1977,
      },
      {
        title: "Heegner points and derivatives of L-series",
        url: "https://doi.org/10.1007/BF01388809",
        year: 1986,
      },
      {
        title: "Finiteness of E(Q) and Sha(E/Q) for a subclass of Weil curves",
        url: "https://doi.org/10.1070/IM1989v032n03ABEH000779",
        year: 1989,
      },
    ],
  videos: [
    {
      title: "The Most Difficult Math Problem You've Never Heard Of",
      videoId: "R9FKN9MIHlE",
      channel: "Kinertia",
    },
    {
      title: "What is the Birch and Swinnerton-Dyer Conjecture?",
      videoId: "2gbQWIzb6Dg",
      channel: "Clay Mathematics Institute",
    },
  ],
  timeline: [
      {
        year: 1922,
        title: "Mordell proves finiteness of generators",
        description:
          "Louis Mordell proves that the group of rational points on an elliptic curve over Q is finitely generated, establishing the concept of rank.",
        type: "origin",
      },
      {
        year: 1965,
        title: "Birch and Swinnerton-Dyer formulate the conjecture",
        description:
          "Based on extensive numerical computations on the Cambridge EDSAC-2 computer, Bryan Birch and Peter Swinnerton-Dyer conjecture the precise relationship between rank and L-function vanishing.",
        type: "origin",
      },
      {
        year: 1977,
        title: "Coates-Wiles theorem for CM curves",
        description:
          "John Coates and Andrew Wiles prove a partial result: for elliptic curves with complex multiplication, if L(E,1) != 0 then E(Q) is finite.",
        type: "breakthrough",
      },
      {
        year: 1986,
        title: "Gross-Zagier formula for Heegner points",
        description:
          "Benedict Gross and Don Zagier prove that the derivative L'(E,1) equals a height pairing of Heegner points, connecting analytic and algebraic information.",
        type: "breakthrough",
      },
      {
        year: 1989,
        title: "Kolyvagin's Euler systems settle rank 0 and 1",
        description:
          "Victor Kolyvagin uses Euler systems to prove BSD for modular elliptic curves of analytic rank 0 or 1, the strongest general result to date.",
        type: "breakthrough",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem",
        description:
          "Andrew Wiles authors the official problem description for the Clay Mathematics Institute.",
        type: "recognition",
      },
    ],
  formulas: [
    {
      label: "BSD conjecture",
      latex: String.raw`\operatorname{rank}\,E(\mathbb{Q})=\operatorname{ord}_{s=1}L(E,s)`,
      description:
        "The algebraic rank of the group of rational points on E equals the analytic rank (order of vanishing of the L-function at s = 1).",
    },
    {
      label: "L-function",
      latex: String.raw`L(E,s)=\prod_{p\text{ good}}\frac{1}{1-a_p p^{-s}+p^{1-2s}}\cdot\prod_{p\text{ bad}}(\cdots)`,
      description:
        "The Hasse–Weil L-function of E encodes local point counts a_p = p + 1 − #E(𝔽_p) at each prime.",
    },
    {
      label: "Leading coefficient (refined BSD)",
      latex: String.raw`\lim_{s\to 1}\frac{L(E,s)}{(s-1)^r}=\frac{|\text{Ш}|\cdot\Omega_E\cdot R_E\cdot\prod c_p}{|E(\mathbb{Q})_{\text{tors}}|^2}`,
      description:
        "The refined conjecture predicts the leading Taylor coefficient in terms of the Sha group, regulator, period, and Tamagawa numbers.",
    },
  ]
});

export default birchSwinnertonDyer;
