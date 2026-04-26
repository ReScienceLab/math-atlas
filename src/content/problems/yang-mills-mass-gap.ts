import { defineProblem } from "@/lib/problem-template";

export const yangMillsMassGap = defineProblem({
  slug: "yang-mills-mass-gap",
  title: "Yang-Mills Existence and Mass Gap",
  status: "open",
  field: "mathematical-physics",
  year: 1954,
  shortDescription:
      "Asks for a rigorous quantum Yang-Mills theory with a positive mass gap.",
  longDescription:
      "The Yang-Mills existence and mass gap problem requires proving that for any compact simple gauge group G, a non-trivial quantum Yang-Mills theory exists on four-dimensional Euclidean space satisfying the Wightman axioms (or equivalently the Osterwalder-Schrader axioms), and that the mass spectrum has a strictly positive lower bound (mass gap Delta > 0). Yang-Mills gauge theory is the mathematical foundation of the Standard Model of particle physics, and the mass gap explains why the strong nuclear force has finite range despite gluons being classically massless. The existence of a mass gap is confirmed by experiment and lattice simulations, but no rigorous mathematical proof exists. The problem was formulated for the Clay Institute by Arthur Jaffe (Harvard) and Edward Witten (IAS Princeton).",
  vizComponent: "YangMillsViz",
  collections: ["canonical", "unification"],
  coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 8,
      importance: 10,
      activity: 8,
      accessibility: 3,
    },
  consensusStatus: "active",
  lastReviewed: "2026-04",
  connections: ["Gauge theory", "Quantum field theory", "Mass gap"],
  authors: [
      {
        name: "Arthur Jaffe",
        institution: "Harvard University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Arthur_Jaffe",
      },
      {
        name: "Edward Witten",
        institution: "Institute for Advanced Study",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Edward_Witten",
      },
      {
        name: "Chen-Ning Yang",
        institution: "Institute for Advanced Study / Stony Brook University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Yang_Chen-Ning",
      },
    ],
  papers: [
      {
        title: "Conservation of Isotopic Spin and Isotopic Gauge Invariance",
        url: "https://doi.org/10.1103/PhysRev.96.191",
        year: 1954,
      },
      {
        title: "Ultraviolet Behavior of Non-Abelian Gauge Theories",
        url: "https://doi.org/10.1103/PhysRevLett.30.1343",
        year: 1973,
      },
      {
        title: "Quantum Yang-Mills Theory (CMI official problem description)",
        url: "https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf",
        year: 2000,
      },
    ],
  timeline: [
      {
        year: 1954,
        title: "Yang and Mills introduce non-abelian gauge theory",
        description:
          "Chen-Ning Yang and Robert Mills publish 'Conservation of Isotopic Spin and Isotopic Gauge Invariance' in Physical Review, extending gauge invariance from U(1) to SU(2).",
        type: "origin",
      },
      {
        year: 1971,
        title: "'t Hooft proves renormalizability",
        description:
          "Gerard 't Hooft, working with Martinus Veltman, proves that Yang-Mills theories with spontaneous symmetry breaking are renormalizable, making them viable quantum theories.",
        type: "breakthrough",
      },
      {
        year: 1973,
        title: "Gross-Wilczek and Politzer discover asymptotic freedom",
        description:
          "David Gross and Frank Wilczek (Princeton) and independently David Politzer (Harvard) discover that non-abelian gauge theories become weakly coupled at high energies. They share the 2004 Nobel Prize in Physics.",
        type: "breakthrough",
      },
      {
        year: 2000,
        title: "Jaffe-Witten formulate the Millennium Prize problem",
        description:
          "Arthur Jaffe and Edward Witten write the official problem statement requiring proof of existence (via Wightman or OS axioms) and a mass gap for any compact simple gauge group on R^4.",
        type: "recognition",
      },
      {
        year: 2004,
        title: "Lattice QCD confirms glueball mass gap numerically",
        description:
          "Chen et al. compute the glueball spectrum on anisotropic lattices, providing strong numerical evidence for a mass gap in SU(3) Yang-Mills theory.",
        type: "progress",
      },
    ],
  formulas: [
    {
      label: "Mass gap",
      latex: String.raw`\inf\sigma(H)\setminus\{0\}=m>0`,
      description:
        "The lowest energy excitation above the vacuum has strictly positive mass — confinement in pure Yang–Mills theory.",
    },
    {
      label: "Yang–Mills action",
      latex: String.raw`S_{\text{YM}}=\frac{1}{2g^2}\int_{\mathbb{R}^4}\operatorname{tr}(F\wedge{\star}F),\qquad F=dA+A\wedge A`,
      description:
        "The classical action for a gauge field with curvature F; quantizing this action and proving a mass gap is the Millennium problem.",
    },
    {
      label: "Wightman axioms requirement",
      latex: String.raw`\exists\;\mathcal{H},\;U(\Lambda),\;\Omega,\;\hat{A}_\mu:\;\text{satisfying Osterwalder–Schrader axioms}`,
      description:
        "The problem requires constructing a quantum Yang–Mills theory on R⁴ satisfying rigorous axioms — not just perturbative expansion.",
    },
  ]
});

export default yangMillsMassGap;
