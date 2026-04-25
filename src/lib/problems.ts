export type ProblemStatus = "open" | "proved" | "disproved" | "resolved" | "partial";

export type MathField =
  | "analysis" | "algebra" | "geometry" | "number-theory"
  | "topology" | "combinatorics" | "mathematical-physics"
  | "computer-science" | "ai-math";

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
];

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export const statusLabel: Record<ProblemStatus, string> = {
  open: "Open", proved: "Proved", disproved: "Disproved", resolved: "Resolved", partial: "Partial",
};
export const statusColor: Record<ProblemStatus, string> = {
  open: "border-[var(--gray-600)] text-[var(--gray-400)] bg-[var(--gray-900)]",
  proved: "border-[#0070f333] text-[var(--blue)] bg-[#0070f30f]",
  disproved: "border-[#ee000026] text-[#f44] bg-[#ee000010]",
  resolved: "border-[#0070f333] text-[var(--blue)] bg-[#0070f30f]",
  partial: "border-[#f5a62333] text-[#f5a623] bg-[#f5a62310]",
};
export const fieldLabel: Record<MathField, string> = {
  analysis: "Analysis", algebra: "Algebra", geometry: "Geometry",
  "number-theory": "Number Theory", topology: "Topology",
  combinatorics: "Combinatorics", "mathematical-physics": "Math Physics",
  "computer-science": "Computer Science", "ai-math": "AI \u00d7 Math",
};
