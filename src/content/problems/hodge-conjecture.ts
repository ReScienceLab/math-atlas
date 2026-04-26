import { defineProblem } from "@/lib/problem-template";

export const hodgeConjecture = defineProblem({
  slug: "hodge-conjecture",
  title: "Hodge Conjecture",
  status: "open",
  field: "geometry",
  year: 1950,
  shortDescription:
      "Predicts which cohomology classes on projective varieties come from algebraic cycles.",
  longDescription:
      "The Hodge Conjecture asserts that on a smooth complex projective variety X, every rational cohomology class of type (p,p) -- that is, every class in the intersection of H^{2p}(X, Q) with H^{p,p}(X) -- is a rational linear combination of classes of algebraic subvarieties. It is a deep bridge connecting algebraic geometry, topology, and complex analysis. The conjecture was presented by W. V. D. Hodge at the 1950 International Congress of Mathematicians and is known to hold for divisors (the Lefschetz (1,1)-theorem, proved in 1924) and in certain low-dimensional cases. Voisin showed in 2002 that the generalization to compact Kahler manifolds is false, confirming the conjecture is intrinsically about projective algebraic geometry.",
  vizComponent: "HodgeViz",
  collections: ["canonical", "unification"],
  coordinates: {
      difficulty: 10,
      beauty: 9,
      visual: 6,
      importance: 10,
      activity: 8,
      accessibility: 3,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Algebraic cycles", "Cohomology", "Projective varieties"],
  authors: [
      {
        name: "W. V. D. Hodge",
        institution: "University of Cambridge",
        wikipediaUrl: "https://en.wikipedia.org/wiki/W._V._D._Hodge",
      },
      {
        name: "Pierre Deligne",
        institution: "IHES / Institute for Advanced Study",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Pierre_Deligne",
      },
      {
        name: "Claire Voisin",
        institution: "College de France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Claire_Voisin",
      },
    ],
  papers: [
      {
        title: "The Theory and Applications of Harmonic Integrals",
        url: "https://www.claymath.org/millennium/hodge-conjecture/",
        year: 1941,
      },
      {
        title: "The standard conjectures on algebraic cycles",
        url: "https://doi.org/10.1007/978-3-540-46233-8_7",
        year: 1969,
      },
      {
        title:
          "A counterexample to the Hodge conjecture extended to Kahler varieties",
        url: "https://doi.org/10.1155/S1073792802111135",
        year: 2002,
      },
    ],
  timeline: [
      {
        year: 1924,
        title: "Lefschetz proves the (1,1)-theorem",
        description:
          "Solomon Lefschetz proves that every rational (1,1)-class on a projective variety is algebraic, establishing the first case of what would become the Hodge conjecture.",
        type: "origin",
      },
      {
        year: 1950,
        title: "Hodge presents the conjecture at the ICM",
        description:
          "W. V. D. Hodge states the conjecture at the International Congress of Mathematicians in Cambridge, Massachusetts, generalizing the Lefschetz result to all (p,p)-classes.",
        type: "origin",
      },
      {
        year: 1961,
        title: "Atiyah-Hirzebruch disprove the integral version",
        description:
          "They construct counterexamples to the integral Hodge conjecture, showing the statement must be restricted to rational coefficients.",
        type: "progress",
      },
      {
        year: 1969,
        title: "Grothendieck proposes a corrected generalization",
        description:
          "Alexander Grothendieck reformulates the generalized Hodge conjecture, correcting Hodge's original more general statement.",
        type: "progress",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem",
        description:
          "Pierre Deligne authors the official problem description for the Clay Mathematics Institute.",
        type: "recognition",
      },
      {
        year: 2002,
        title: "Voisin disproves the Kahler generalization",
        description:
          "Claire Voisin constructs compact Kahler manifolds where the Hodge conjecture fails, showing it is intrinsically projective. She receives the 2008 Clay Research Award.",
        type: "breakthrough",
      },
    ],
  formulas: [
    {
      label: "Hodge conjecture",
      latex: String.raw`\operatorname{Hdg}^p(X)\stackrel{?}{=}\operatorname{im}\bigl(\operatorname{cl}:A^p(X)\otimes\mathbb{Q}\to H^{2p}(X,\mathbb{Q})\bigr)`,
      description:
        "Every Hodge class on a smooth projective variety should be a rational linear combination of classes of algebraic subvarieties.",
    },
    {
      label: "Hodge decomposition",
      latex: String.raw`H^k(X,\mathbb{C})=\bigoplus_{p+q=k}H^{p,q}(X),\qquad \overline{H^{p,q}}=H^{q,p}`,
      description:
        "The cohomology of a compact Kähler manifold splits into (p,q)-types — the Hodge structure underlying the conjecture.",
    },
    {
      label: "Known case: divisors (Lefschetz (1,1))",
      latex: String.raw`\operatorname{Hdg}^1(X)=\operatorname{NS}(X)\otimes\mathbb{Q}`,
      description:
        "For p = 1 the Hodge conjecture is the Lefschetz (1,1)-theorem: every Hodge class of type (1,1) is algebraic.",
    },
  ]
});

export default hodgeConjecture;
