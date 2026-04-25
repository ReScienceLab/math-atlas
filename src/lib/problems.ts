export type ProblemStatus = "open" | "proved" | "disproved" | "resolved" | "partial";

export type MathField =
  | "analysis" | "algebra" | "geometry" | "number-theory"
  | "topology" | "combinatorics" | "mathematical-physics"
  | "computer-science" | "ai-math" | "logic";

export interface Author {
  name: string;
  institution: string;
  scholarUrl?: string;
  avatarUrl?: string;
  homepageUrl?: string;
  wikipediaUrl?: string;
}

export interface Paper {
  title: string;
  arxivId?: string;
  url: string;
  year: number;
}

export interface TimelineEvent {
  year: number;
  month?: string;
  title: string;
  description?: string;
  type: "origin" | "progress" | "breakthrough" | "recognition";
}

export type ProblemCollection = "canonical" | "beautiful" | "frontier" | "unification" | "recent";

export type ConsensusStatus = "settled" | "active" | "emerging" | "watch";

export interface ProblemCoordinates {
  difficulty: number;
  beauty: number;
  visual: number;
  importance: number;
  activity: number;
  accessibility: number;
}

export interface Problem {
  slug: string;
  title: string;
  status: ProblemStatus;
  field: MathField;
  year: number;
  shortDescription: string;
  longDescription?: string;
  vizComponent: string;
  authors: Author[];
  papers: Paper[];
  timeline: TimelineEvent[];
  collections?: ProblemCollection[];
  coordinates?: ProblemCoordinates;
  consensusStatus?: ConsensusStatus;
  lastReviewed?: string;
  connections?: string[];
}

export const problems: Problem[] = [
  {
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
    coordinates: { difficulty: 9, beauty: 9, visual: 10, importance: 8, activity: 9, accessibility: 6 },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Fourier restriction", "Incidence geometry", "Hausdorff dimension"],
    authors: [
      {
        name: "Hong Wang",
        institution: "NYU Courant / IH\u00c9S",
        scholarUrl: "https://scholar.google.com/citations?user=wulKoVsAAAAJ",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Hong_Wang_%282025%29.jpg/250px-Hong_Wang_%282025%29.jpg",
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
        title: "Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions",
        arxivId: "2502.17655",
        url: "https://arxiv.org/abs/2502.17655",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1917, title: "Kakeya poses the needle problem", type: "origin" },
      { year: 1928, title: "Besicovitch shows measure can be zero", type: "progress" },
      { year: 1971, title: "Davies proves 2D case (dim = 2)", type: "progress" },
      { year: 2002, title: "Katz-Tao prove dim \u2265 5/2 + \u03b5 in 3D", type: "progress" },
      { year: 2025, month: "Feb", title: "Wang & Zahl prove dim = 3 in 3D", type: "breakthrough" },
      { year: 2026, title: "Wang wins New Horizons Prize; top Fields Medal candidate (~72%)", type: "recognition" },
    ],
  },
  {
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
    coordinates: { difficulty: 10, beauty: 10, visual: 7, importance: 10, activity: 10, accessibility: 3 },
    consensusStatus: "emerging",
    lastReviewed: "2026-04",
    connections: ["Number theory", "Algebraic geometry", "Representation theory"],
    authors: [
      {
        name: "Dennis Gaitsgory",
        institution: "Max Planck Institute (Bonn)",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Dennis_Gaitsgory.jpg/250px-Dennis_Gaitsgory.jpg",
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
        title: "Proof of the geometric Langlands conjecture I: construction of the functor",
        arxivId: "2405.03599",
        url: "https://arxiv.org/abs/2405.03599",
        year: 2024,
      },
    ],
    timeline: [
      { year: 1967, title: "Langlands writes his famous letter to Weil", type: "origin" },
      { year: 1990, title: "Beilinson-Drinfeld formulate geometric version", type: "progress" },
      { year: 2000, title: "Gaitsgory begins systematic program", type: "progress" },
      { year: 2024, title: "Proof completed: 5 papers, 800+ pages", type: "breakthrough" },
      { year: 2025, title: "Gaitsgory wins Breakthrough Prize ($3M)", type: "recognition" },
      { year: 2026, month: "Mar", title: "Scholze proposes 'Langlands Program 2.0'", type: "progress" },
    ],
  },
  {
    slug: "hilbert-sixth",
    title: "Hilbert's Sixth Problem",
    status: "resolved",
    field: "mathematical-physics",
    year: 2025,
    shortDescription:
      "Rigorously derived Euler and Navier-Stokes equations from hard-sphere particle dynamics.",
    longDescription:
      "Hilbert's 6th problem (1900) asks for the axiomatization of physics. Deng, Hani, and Ma rigorously derived the fundamental equations of fluid mechanics \u2014 compressible Euler and incompressible Navier-Stokes-Fourier \u2014 from Newtonian particle dynamics via the Boltzmann-Grad limit. A 125-year challenge.",
    vizComponent: "HilbertViz",
    collections: ["canonical", "unification", "frontier", "recent"],
    coordinates: { difficulty: 10, beauty: 8, visual: 8, importance: 9, activity: 9, accessibility: 4 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["PDE", "Statistical mechanics", "Fluid dynamics"],
    authors: [
      {
        name: "Yu Deng",
        institution: "University of Chicago",
        scholarUrl: "https://scholar.google.com/citations?user=AshwaigAAAAJ",
        homepageUrl: "https://sites.google.com/uchicago.edu/yudeng/",
      },
      {
        name: "Zaher Hani",
        institution: "University of Michigan",
        scholarUrl: "https://scholar.google.com/citations?user=qp7ABIsAAAAJ",
        homepageUrl: "https://sites.lsa.umich.edu/zhani/",
      },
      {
        name: "Xiao Ma",
        institution: "Co-author",
      },
    ],
    papers: [
      {
        title: "Hilbert's sixth problem: derivation of fluid equations via Boltzmann's kinetic theory",
        arxivId: "2503.01800",
        url: "https://arxiv.org/abs/2503.01800",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1900, title: "Hilbert poses 23 problems at ICM Paris; #6: axiomatize physics", type: "origin" },
      { year: 1872, title: "Boltzmann derives kinetic equation (pre-Hilbert)", type: "progress" },
      { year: 1975, title: "Lanford's theorem: short-time derivation", type: "progress" },
      { year: 2025, month: "Mar", title: "Deng-Hani-Ma derive full Euler & Navier-Stokes", type: "breakthrough" },
    ],
  },
  {
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
    coordinates: { difficulty: 8, beauty: 8, visual: 8, importance: 7, activity: 8, accessibility: 5 },
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
    ],
    papers: [
      {
        title: "A Counterexample to the Mizohata-Takeuchi Conjecture",
        arxivId: "2502.06137",
        url: "https://arxiv.org/abs/2502.06137",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1985, title: "Mizohata-Takeuchi conjecture proposed", type: "origin" },
      { year: 2025, title: "Hannah Cairo (age 17) finds counterexample", type: "breakthrough" },
      { year: 2025, title: "Cairo enters PhD at University of Maryland", type: "recognition" },
    ],
  },
  {
    slug: "noperthedron",
    title: "The Noperthedron",
    status: "disproved",
    field: "geometry",
    year: 2025,
    shortDescription:
      "First convex polyhedron (90 vertices) proven to NOT have Rupert's property \u2014 cannot pass through itself.",
    longDescription:
      "Rupert's property: a convex body can pass a copy of itself through a straight hole cut inside itself. All Platonic solids have it. The 2017 conjecture claimed ALL convex polyhedra do. Steininger and Yurkevich constructed a 90-vertex polyhedron that provably does not, settling a 300-year-old question.",
    vizComponent: "NoperthedronViz",
    collections: ["beautiful", "frontier", "recent"],
    coordinates: { difficulty: 7, beauty: 9, visual: 10, importance: 6, activity: 8, accessibility: 8 },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Convex geometry", "Polyhedra", "Rupert's property"],
    authors: [
      {
        name: "Jakob Steininger",
        institution: "Statistics Austria, Vienna",
      },
      {
        name: "Sergey Yurkevich",
        institution: "A&R TECH, Vienna",
        scholarUrl: "https://scholar.google.com/citations?user=uWQorJ4AAAAJ",
        homepageUrl: "https://yurkevi.ch/",
      },
    ],
    papers: [
      {
        title: "A convex polyhedron without Rupert's property",
        arxivId: "2508.18475",
        url: "https://arxiv.org/abs/2508.18475",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1693, title: "Prince Rupert bets a cube can pass through itself", type: "origin" },
      { year: 1816, title: "Nieuwland proves the cube case", type: "progress" },
      { year: 2017, title: "Conjecture: all convex polyhedra are Rupert", type: "progress" },
      { year: 2025, month: "Aug", title: "Steininger & Yurkevich find 90-vertex counterexample", type: "breakthrough" },
    ],
  },
  {
    slug: "alphaevolve-strassen",
    title: "AlphaEvolve \u00d7 Strassen",
    status: "resolved",
    field: "ai-math",
    year: 2025,
    shortDescription:
      "AI broke Strassen's 56-year record for 4\u00d74 matrix multiplication: 48 vs 49 scalar ops.",
    longDescription:
      "Matrix multiplication is the most fundamental operation in computing. Strassen (1969) showed 7 multiplications suffice for 2\u00d72 (not 8), giving O(n^2.807). Applied recursively to 4\u00d74, this gives 49. AlphaEvolve found a scheme using only 48 \u2014 the first improvement in 56 years.",
    vizComponent: "AlphaEvolveViz",
    collections: ["frontier", "recent"],
    coordinates: { difficulty: 8, beauty: 7, visual: 7, importance: 8, activity: 10, accessibility: 7 },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: ["Matrix multiplication", "Computational complexity", "AI for math"],
    authors: [
      {
        name: "Alexander Novikov",
        institution: "Google DeepMind",
        scholarUrl: "https://scholar.google.com/citations?user=jMUkLqwAAAAJ",
      },
      {
        name: "Matej Balog",
        institution: "Google DeepMind",
        scholarUrl: "https://scholar.google.com/citations?user=5pF1dBwAAAAJ",
        homepageUrl: "https://matejbalog.eu/en/",
      },
      {
        name: "Pushmeet Kohli",
        institution: "Google DeepMind (VP Science)",
        scholarUrl: "https://scholar.google.com/citations?user=3pyzQQ8AAAAJ",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Pushmeet_Kohli",
      },
    ],
    papers: [
      {
        title: "AlphaEvolve: A coding agent for scientific and algorithmic discovery",
        arxivId: "2506.13131",
        url: "https://arxiv.org/abs/2506.13131",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1969, title: "Strassen: 2\u00d72 in 7 multiplications (not 8)", type: "origin" },
      { year: 1969, title: "Recursive application: 4\u00d74 in 49 multiplications", type: "progress" },
      { year: 2022, title: "AlphaTensor finds improvements for larger matrices", type: "progress" },
      { year: 2025, month: "May", title: "AlphaEvolve: 4\u00d74 complex in 48 multiplications", type: "breakthrough" },
      { year: 2026, month: "Mar", title: "Tao: 'AI is ready for primetime in math'", type: "recognition" },
    ],
  },
  {
    slug: "riemann-hypothesis",
    title: "Riemann Hypothesis",
    status: "open",
    field: "number-theory",
    year: 1859,
    shortDescription:
      "All nontrivial zeros of the zeta function should lie on the critical line Re(s) = 1/2.",
    longDescription:
      "The Riemann Hypothesis links the hidden geometry of the zeta function to the distribution of prime numbers. It is one of the Clay Millennium Prize Problems and remains one of the central open questions in mathematics.",
    vizComponent: "RiemannViz",
    collections: ["canonical", "beautiful"],
    coordinates: { difficulty: 10, beauty: 10, visual: 8, importance: 10, activity: 10, accessibility: 6 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Prime numbers", "Zeta function", "Random matrices"],
    authors: [{ name: "Bernhard Riemann", institution: "University of Gottingen" }],
    papers: [
      {
        title: "On the Number of Primes Less Than a Given Magnitude",
        url: "https://www.claymath.org/millennium/riemann-hypothesis/",
        year: 1859,
      },
    ],
    timeline: [
      { year: 1859, title: "Riemann formulates the hypothesis", type: "origin" },
      { year: 1896, title: "Hadamard and de la Vallee Poussin prove the prime number theorem", type: "progress" },
      { year: 2000, title: "Clay names it a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "p-vs-np",
    title: "P vs NP",
    status: "open",
    field: "computer-science",
    year: 1971,
    shortDescription:
      "Asks whether every efficiently verifiable solution can also be efficiently found.",
    longDescription:
      "P vs NP is the central problem of computational complexity. A proof would reshape cryptography, optimization, proof search, and the theoretical limits of computation.",
    vizComponent: "PvsNPViz",
    collections: ["canonical"],
    coordinates: { difficulty: 10, beauty: 8, visual: 7, importance: 10, activity: 10, accessibility: 8 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Complexity theory", "Cryptography", "Optimization"],
    authors: [{ name: "Stephen Cook", institution: "University of Toronto" }],
    papers: [
      {
        title: "The Complexity of Theorem-Proving Procedures",
        url: "https://www.claymath.org/millennium/p-vs-np/",
        year: 1971,
      },
    ],
    timeline: [
      { year: 1971, title: "Cook formalizes NP-completeness", type: "origin" },
      { year: 1972, title: "Karp identifies 21 NP-complete problems", type: "progress" },
      { year: 2000, title: "Clay names P vs NP a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "navier-stokes",
    title: "Navier-Stokes Regularity",
    status: "open",
    field: "analysis",
    year: 2000,
    shortDescription:
      "Asks whether smooth 3D incompressible fluid flows can develop singularities.",
    longDescription:
      "The Navier-Stokes existence and smoothness problem asks for a rigorous understanding of the equations governing fluid motion in three dimensions. It is a Millennium Prize Problem.",
    vizComponent: "NavierStokesViz",
    collections: ["canonical", "beautiful"],
    coordinates: { difficulty: 10, beauty: 8, visual: 9, importance: 10, activity: 10, accessibility: 5 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["PDE", "Fluid dynamics", "Turbulence"],
    authors: [{ name: "Claude-Louis Navier", institution: "Ecole des Ponts" }, { name: "George Stokes", institution: "University of Cambridge" }],
    papers: [
      {
        title: "Navier-Stokes Equation",
        url: "https://www.claymath.org/millennium/navier-stokes-equation/",
        year: 2000,
      },
    ],
    timeline: [
      { year: 1822, title: "Navier writes early viscous fluid equations", type: "origin" },
      { year: 1934, title: "Leray develops weak solution theory", type: "progress" },
      { year: 2000, title: "Clay names regularity a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "hodge-conjecture",
    title: "Hodge Conjecture",
    status: "open",
    field: "geometry",
    year: 1950,
    shortDescription:
      "Predicts which cohomology classes on projective varieties come from algebraic cycles.",
    longDescription:
      "The Hodge Conjecture is a deep bridge between algebraic geometry and topology. It asks whether certain analytic/topological classes can always be represented by algebraic subvarieties.",
    vizComponent: "HodgeViz",
    collections: ["canonical", "unification"],
    coordinates: { difficulty: 10, beauty: 9, visual: 6, importance: 10, activity: 8, accessibility: 3 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Algebraic cycles", "Cohomology", "Projective varieties"],
    authors: [{ name: "W. V. D. Hodge", institution: "University of Cambridge" }],
    papers: [
      {
        title: "The Hodge Conjecture",
        url: "https://www.claymath.org/millennium/hodge-conjecture/",
        year: 2000,
      },
    ],
    timeline: [
      { year: 1950, title: "Hodge states the conjecture", type: "origin" },
      { year: 1970, title: "Integral variants are shown to fail", type: "progress" },
      { year: 2000, title: "Clay names it a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "birch-swinnerton-dyer",
    title: "Birch-Swinnerton-Dyer",
    status: "open",
    field: "number-theory",
    year: 1965,
    shortDescription:
      "Relates rational points on elliptic curves to the behavior of their L-functions at s = 1.",
    longDescription:
      "The Birch and Swinnerton-Dyer conjecture predicts that the rank of an elliptic curve is encoded by the order of vanishing of its L-function. It is a Millennium Prize Problem.",
    vizComponent: "BSDViz",
    collections: ["canonical", "unification"],
    coordinates: { difficulty: 10, beauty: 9, visual: 7, importance: 10, activity: 9, accessibility: 4 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Elliptic curves", "L-functions", "Rational points"],
    authors: [{ name: "Bryan Birch", institution: "University of Cambridge" }, { name: "Peter Swinnerton-Dyer", institution: "University of Cambridge" }],
    papers: [
      {
        title: "The Birch and Swinnerton-Dyer Conjecture",
        url: "https://www.claymath.org/millennium/birch-and-swinnerton-dyer-conjecture/",
        year: 2000,
      },
    ],
    timeline: [
      { year: 1965, title: "Birch and Swinnerton-Dyer formulate the conjecture", type: "origin" },
      { year: 1990, title: "Major progress through modularity and Euler systems", type: "progress" },
      { year: 2000, title: "Clay names it a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "yang-mills-mass-gap",
    title: "Yang-Mills Mass Gap",
    status: "open",
    field: "mathematical-physics",
    year: 2000,
    shortDescription:
      "Asks for a rigorous quantum Yang-Mills theory with a positive mass gap.",
    longDescription:
      "The Yang-Mills existence and mass gap problem asks for a mathematically rigorous construction of quantum gauge theory in four dimensions. It is a Millennium Prize Problem.",
    vizComponent: "YangMillsViz",
    collections: ["canonical", "unification"],
    coordinates: { difficulty: 10, beauty: 8, visual: 8, importance: 10, activity: 8, accessibility: 3 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Gauge theory", "Quantum field theory", "Mass gap"],
    authors: [{ name: "Chen-Ning Yang", institution: "Institute for Advanced Study" }, { name: "Robert Mills", institution: "Brookhaven National Laboratory" }],
    papers: [
      {
        title: "Yang-Mills and Mass Gap",
        url: "https://www.claymath.org/millennium/yang-mills-and-mass-gap/",
        year: 2000,
      },
    ],
    timeline: [
      { year: 1954, title: "Yang and Mills introduce non-abelian gauge theory", type: "origin" },
      { year: 1970, title: "Gauge theories become central to particle physics", type: "progress" },
      { year: 2000, title: "Clay names mass gap a Millennium Prize Problem", type: "recognition" },
    ],
  },
  {
    slug: "collatz-conjecture",
    title: "Collatz Conjecture",
    status: "open",
    field: "number-theory",
    year: 1937,
    shortDescription:
      "Repeatedly apply n/2 for even n and 3n+1 for odd n; every path should reach 1.",
    longDescription:
      "The Collatz conjecture is famous for its elementary statement and extreme resistance to proof. It is a test case for simple dynamical rules producing hard arithmetic behavior.",
    vizComponent: "CollatzViz",
    collections: ["beautiful"],
    coordinates: { difficulty: 9, beauty: 8, visual: 9, importance: 6, activity: 8, accessibility: 10 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Iteration", "Dynamical systems", "Number theory"],
    authors: [{ name: "Lothar Collatz", institution: "University of Hamburg" }],
    papers: [
      {
        title: "Almost all orbits of the Collatz map attain almost bounded values",
        arxivId: "1909.03562",
        url: "https://arxiv.org/abs/1909.03562",
        year: 2019,
      },
    ],
    timeline: [
      { year: 1937, title: "Collatz circulates the problem", type: "origin" },
      { year: 2019, title: "Tao proves an almost-all logarithmic-density result", type: "progress" },
      { year: 2026, title: "Problem remains open", type: "recognition" },
    ],
  },
  {
    slug: "goldbach-conjecture",
    title: "Goldbach's Conjecture",
    status: "open",
    field: "number-theory",
    year: 1742,
    shortDescription:
      "Every even integer greater than 2 should be expressible as a sum of two primes.",
    longDescription:
      "Goldbach's conjecture is one of the oldest famous open problems in additive number theory. Its statement is elementary, but a complete proof remains unknown.",
    vizComponent: "GoldbachViz",
    collections: ["beautiful"],
    coordinates: { difficulty: 9, beauty: 8, visual: 8, importance: 8, activity: 7, accessibility: 10 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Primes", "Additive number theory", "Sieve methods"],
    authors: [{ name: "Christian Goldbach", institution: "St. Petersburg Academy" }],
    papers: [
      {
        title: "Every odd number greater than 1 is the sum of at most five primes",
        arxivId: "1205.5252",
        url: "https://arxiv.org/abs/1205.5252",
        year: 2012,
      },
    ],
    timeline: [
      { year: 1742, title: "Goldbach writes to Euler", type: "origin" },
      { year: 2013, title: "Helfgott proves the weak Goldbach conjecture", type: "progress" },
      { year: 2026, title: "Strong Goldbach remains open", type: "recognition" },
    ],
  },
  {
    slug: "twin-prime-conjecture",
    title: "Twin Prime Conjecture",
    status: "partial",
    field: "number-theory",
    year: 1849,
    shortDescription:
      "Predicts infinitely many prime pairs separated by 2, such as 11 and 13.",
    longDescription:
      "The twin prime conjecture asks whether there are infinitely many primes p for which p + 2 is also prime. Modern work proved bounded gaps between primes, but the gap 2 case remains open.",
    vizComponent: "TwinPrimeViz",
    collections: ["canonical", "beautiful"],
    coordinates: { difficulty: 9, beauty: 8, visual: 8, importance: 8, activity: 9, accessibility: 9 },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Prime gaps", "Sieve methods", "Additive combinatorics"],
    authors: [{ name: "Alphonse de Polignac", institution: "France" }],
    papers: [
      {
        title: "Bounded gaps between primes",
        arxivId: "1305.4726",
        url: "https://arxiv.org/abs/1305.4726",
        year: 2013,
      },
    ],
    timeline: [
      { year: 1849, title: "Polignac proposes a broad prime gaps conjecture", type: "origin" },
      { year: 2013, title: "Zhang proves infinitely many bounded prime gaps", type: "breakthrough" },
      { year: 2014, title: "Maynard and Tao sharpen bounded gaps methods", type: "progress" },
    ],
  },
  {
    slug: "abc-conjecture",
    title: "abc Conjecture",
    status: "open",
    field: "number-theory",
    year: 1985,
    shortDescription:
      "Controls how often a + b = c can have c much larger than the radical of abc.",
    longDescription:
      "The abc conjecture is a compact statement with consequences across Diophantine equations. Claimed proofs have generated major controversy, so the consensus status remains delicate.",
    vizComponent: "AbcViz",
    collections: ["canonical", "unification"],
    coordinates: { difficulty: 10, beauty: 8, visual: 5, importance: 9, activity: 8, accessibility: 4 },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: ["Diophantine equations", "Elliptic curves", "Number theory"],
    authors: [{ name: "Joseph Oesterle", institution: "Universite Pierre et Marie Curie" }, { name: "David Masser", institution: "University of Basel" }],
    papers: [
      {
        title: "ABC implies Mordell",
        url: "https://doi.org/10.1007/BF01389043",
        year: 1988,
      },
    ],
    timeline: [
      { year: 1985, title: "Oesterle and Masser formulate abc", type: "origin" },
      { year: 2012, title: "Mochizuki announces inter-universal Teichmuller theory", type: "progress" },
      { year: 2026, title: "Broad consensus remains unsettled", type: "recognition" },
    ],
  },
  {
    slug: "continuum-hypothesis",
    title: "Continuum Hypothesis",
    status: "resolved",
    field: "logic",
    year: 1963,
    shortDescription:
      "Asks whether there is a set size strictly between the integers and the real numbers.",
    longDescription:
      "The Continuum Hypothesis was shown to be independent of the usual ZFC axioms: it can neither be proved nor disproved from them, assuming ZFC is consistent.",
    vizComponent: "ContinuumViz",
    collections: ["canonical"],
    coordinates: { difficulty: 9, beauty: 9, visual: 6, importance: 9, activity: 7, accessibility: 5 },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Set theory", "Forcing", "Infinity"],
    authors: [{ name: "Georg Cantor", institution: "University of Halle" }, { name: "Paul Cohen", institution: "Stanford University" }],
    papers: [
      {
        title: "The Independence of the Continuum Hypothesis",
        url: "https://www.pnas.org/doi/10.1073/pnas.50.6.1143",
        year: 1963,
      },
    ],
    timeline: [
      { year: 1878, title: "Cantor formulates the continuum problem", type: "origin" },
      { year: 1940, title: "Godel proves CH is consistent with ZFC, if ZFC is consistent", type: "progress" },
      { year: 1963, title: "Cohen proves independence using forcing", type: "breakthrough" },
    ],
  },
  {
    slug: "poincare-conjecture",
    title: "Poincare Conjecture",
    status: "proved",
    field: "topology",
    year: 2003,
    shortDescription:
      "Every simply connected closed 3-manifold is homeomorphic to the 3-sphere.",
    longDescription:
      "The Poincare conjecture was one of topology's defining problems. Perelman's proof via Ricci flow completed a central chapter in the classification of 3-manifolds.",
    vizComponent: "PoincareViz",
    collections: ["canonical", "beautiful"],
    coordinates: { difficulty: 10, beauty: 10, visual: 8, importance: 10, activity: 7, accessibility: 5 },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["3-manifolds", "Ricci flow", "Topology"],
    authors: [{ name: "Henri Poincare", institution: "University of Paris" }, { name: "Grigori Perelman", institution: "Steklov Institute" }],
    papers: [
      {
        title: "The entropy formula for the Ricci flow and its geometric applications",
        arxivId: "math/0211159",
        url: "https://arxiv.org/abs/math/0211159",
        year: 2002,
      },
    ],
    timeline: [
      { year: 1904, title: "Poincare states the conjecture", type: "origin" },
      { year: 1982, title: "Hamilton introduces Ricci flow", type: "progress" },
      { year: 2003, title: "Perelman completes the proof", type: "breakthrough" },
    ],
  },
];

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export const statusLabel: Record<ProblemStatus, string> = {
  open: "Open", proved: "Proved", disproved: "Disproved", resolved: "Resolved", partial: "Partial",
};
export const statusColor: Record<ProblemStatus, string> = {
  open: "border-white/[0.14] text-[var(--gray-400)] bg-white/[0.04]",
  proved: "border-[#3b82f633] text-[#60a5fa] bg-[#3b82f610]",
  disproved: "border-[#ef444433] text-[#f87171] bg-[#ef444410]",
  resolved: "border-[#22c55e33] text-[#86efac] bg-[#22c55e10]",
  partial: "border-[#eab30833] text-[#facc15] bg-[#eab30810]",
};
export const fieldLabel: Record<MathField, string> = {
  analysis: "Analysis", algebra: "Algebra", geometry: "Geometry",
  "number-theory": "Number Theory", topology: "Topology",
  combinatorics: "Combinatorics", "mathematical-physics": "Math Physics",
  "computer-science": "Computer Science", "ai-math": "AI \u00d7 Math",
  logic: "Logic",
};
