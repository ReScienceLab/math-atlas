import type {
  MathField,
  Problem,
  ProblemFormula,
  ProblemStatus,
} from "@/lib/problem-types";
import { configuredProblems } from "@/content/problems";

export type {
  Author,
  ConsensusStatus,
  MathField,
  Paper,
  Problem,
  ProblemCollection,
  ProblemCoordinates,
  ProblemFormula,
  ProblemStatus,
  TimelineEvent,
} from "@/lib/problem-types";

const scholarSearch = (query: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;

const rawProblems: Problem[] = [
  {
    slug: "abc-secret-verification",
    title: "abc Secret Verification Project",
    status: "watch",
    field: "number-theory",
    year: 2026,
    shortDescription:
      "Two Lean formalization efforts are trying to clarify the disputed 2012 claim around the abc conjecture.",
    longDescription:
      "The abc conjecture, formulated in 1985 by Oesterle and Masser, states that for coprime positive integers with a + b = c, the value c is bounded by a power of the radical of abc. Mochizuki claimed a proof in 2012 via inter-universal Teichmuller theory, but Scholze and Stix identified a gap in Corollary 3.12 that the broader community considers unresolved. Two parallel Lean formalization efforts emerged in the 2020s: the LANA (Lean and Anabelian geometry) project, coordinated through the ZEN Mathematics Center led by Fumiharu Kato, and a separate Mochizuki-linked formalization whose slides appeared in April 2026 at a workshop on AI and Theorem Provers in Mathematics. The goal is not a new proof but a computer-checkable determination of whether the claimed argument can be made precise.",
    vizComponent: "AbcVerificationViz",
    collections: ["canonical", "frontier", "recent", "unification"],
    coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 7,
      importance: 9,
      activity: 10,
      accessibility: 4,
    },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: ["abc conjecture", "Lean", "IUT", "Formalization"],
    authors: [
      { name: "Shinichi Mochizuki", institution: "Kyoto University" },
      { name: "Fumiharu Kato", institution: "ZEN Mathematics Center" },
      { name: "Adam Topaz", institution: "University of Alberta" },
    ],
    papers: [
      {
        title: "We could soon settle the biggest controversy in maths",
        url: "https://www.zinio.com/publications/new-scientist/3215/issues/736752/articles",
        year: 2026,
      },
      {
        title:
          "ZMC press conference on the Lean and Anabelian geometry project",
        url: "https://zen.ac.jp/en/zmc/topics/jwz-o8xr3v6f",
        year: 2026,
      },
      {
        title:
          "Construction of Arithmetic Teichmuller Spaces III: A Rosetta Stone and a proof of Mochizuki's Corollary 3.12",
        arxivId: "2401.13508",
        url: "https://arxiv.org/abs/2401.13508",
        year: 2024,
      },
    ],
    timeline: [
      {
        year: 1985,
        title: "Oesterle and Masser formulate abc",
        description:
          "Joseph Oesterle and David Masser independently propose a conjecture linking the radical of abc to the size of c for coprime positive integers with a + b = c.",
        type: "origin",
      },
      {
        year: 2012,
        month: "Aug",
        title: "Mochizuki posts the IUT-based claimed proof",
        description:
          "Shinichi Mochizuki releases four papers totaling over 500 pages on inter-universal Teichmuller theory, claiming a proof of the abc conjecture.",
        type: "progress",
      },
      {
        year: 2018,
        title: "Scholze and Stix identify a disputed gap in Corollary 3.12",
        description:
          "Peter Scholze and Jakob Stix visit Kyoto and report a gap so severe that small modifications will not rescue the proof strategy.",
        type: "progress",
      },
      {
        year: 2021,
        month: "Mar",
        title: "IUT papers published in RIMS journal",
        description:
          "Mochizuki's proof is published in Publications of the Research Institute for Mathematical Sciences, despite ongoing controversy.",
        type: "progress",
      },
      {
        year: 2023,
        title: "LANA formalization work begins",
        description:
          "The Lean and Anabelian geometry (LANA) project starts formalizing components of anabelian geometry relevant to IUT in the Lean proof assistant.",
        type: "progress",
      },
      {
        year: 2026,
        month: "Apr",
        title:
          "Mochizuki presents IUT formalization slides at AI and Theorem Provers workshop",
        description:
          "A parallel formalization effort linked to Mochizuki presents at a workshop on AI and Theorem Provers in Mathematics, drawing renewed attention to both verification projects.",
        type: "recognition",
      },
    ],
  },
  {
    slug: "faltings-abel-prize-2026",
    title: "Faltings Abel Prize 2026",
    status: "award",
    field: "number-theory",
    year: 2026,
    shortDescription:
      "Gerd Faltings received the 2026 Abel Prize for arithmetic geometry and long-standing Diophantine conjectures.",
    longDescription:
      "Gerd Faltings (born 1954) proved in 1983 that any algebraic curve of genus at least 2 defined over the rationals has only finitely many rational points, settling the Mordell conjecture that had been open since 1922. Subsequent simplifications came from Paul Vojta (1991) using Diophantine approximation and Enrico Bombieri (1990) with a more elementary variant. Faltings' broader contributions to arithmetic geometry, including the proof of the Mordell-Lang conjecture and the Tate conjecture for abelian varieties, earned him the Fields Medal in 1986 and the 2026 Abel Prize, cited for introducing powerful tools in arithmetic geometry and resolving long-standing Diophantine conjectures.",
    vizComponent: "FaltingsAbelViz",
    collections: ["canonical", "recent", "unification"],
    coordinates: {
      difficulty: 10,
      beauty: 9,
      visual: 7,
      importance: 10,
      activity: 6,
      accessibility: 5,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Arithmetic geometry",
      "Mordell conjecture",
      "Mordell-Lang",
      "Rational points",
    ],
    authors: [
      {
        name: "Gerd Faltings",
        institution: "Max Planck Institute for Mathematics",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Gerd_Faltings",
      },
      {
        name: "Paul Vojta",
        institution: "University of California, Berkeley",
        scholarUrl: scholarSearch(
          "Paul Vojta Diophantine approximation Mordell",
        ),
      },
      {
        name: "Enrico Bombieri",
        institution: "Institute for Advanced Study",
        scholarUrl: scholarSearch("Enrico Bombieri number theory Mordell"),
      },
    ],
    papers: [
      {
        title: "Gerd Faltings awarded the 2026 Abel Prize",
        url: "https://abelprize.no/?id=207",
        year: 2026,
      },
      {
        title: "Abel Prize 2026 press release",
        url: "https://abelprize.no/sites/default/files/2026-03/pressrelease_english__Abelprize%202026.pdf",
        year: 2026,
      },
      {
        title: "Endlichkeitssätze für abelsche Varietäten über Zahlkörpern",
        url: "https://doi.org/10.1007/BF01388432",
        year: 1983,
      },
    ],
    timeline: [
      {
        year: 1922,
        title: "Mordell formulates the rational-points conjecture",
        type: "origin",
      },
      {
        year: 1983,
        title: "Faltings proves the Mordell conjecture",
        type: "breakthrough",
      },
      {
        year: 1986,
        title: "Faltings receives the Fields Medal",
        type: "recognition",
      },
      {
        year: 1994,
        title:
          "Faltings returns to Germany and leads arithmetic geometry in Bonn",
        type: "recognition",
      },
      {
        year: 2026,
        month: "Mar",
        title: "Faltings is announced as Abel Prize laureate",
        type: "recognition",
      },
    ],
  },
  {
    slug: "kakeya-2d",
    title: "Kakeya Conjecture (2D)",
    status: "proved",
    field: "analysis",
    year: 1971,
    shortDescription:
      "A planar set can contain a unit segment in every direction and have area zero, but its Hausdorff dimension is still 2.",
    longDescription:
      "The planar Kakeya problem is the cleanest entry point to the whole Kakeya family. Besicovitch showed that a needle can point in every direction inside sets of arbitrarily small area, even measure zero. Davies proved the two-dimensional Kakeya dimension statement: every planar Besicovitch set still has full Hausdorff dimension 2.",
    vizComponent: "Kakeya2DViz",
    collections: ["canonical", "beautiful", "frontier"],
    coordinates: {
      difficulty: 7,
      beauty: 10,
      visual: 10,
      importance: 9,
      activity: 7,
      accessibility: 8,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Besicovitch sets",
      "Hausdorff dimension",
      "Fourier analysis",
      "Kakeya 3D",
    ],
    authors: [
      { name: "Soichi Kakeya", institution: "Tohoku University" },
      { name: "Abram Besicovitch", institution: "University of Cambridge" },
      { name: "Roy O. Davies", institution: "University of Leicester" },
    ],
    papers: [
      {
        title: "Some remarks on the Kakeya problem",
        url: "https://www.cambridge.org/core/journals/mathematical-proceedings-of-the-cambridge-philosophical-society/article/some-remarks-on-the-kakeya-problem/F994CB74D52930B6A0209D8F52B66627",
        year: 1971,
      },
      {
        title: "On Kakeya's problem and a similar one",
        url: "https://eudml.org/doc/167980",
        year: 1928,
      },
      {
        title: "New Proof Threads the Needle on a Sticky Geometry Problem",
        url: "https://www.quantamagazine.org/new-proof-threads-the-needle-on-a-sticky-geometry-problem-20230711/",
        year: 2023,
      },
    ],
    timeline: [
      {
        year: 1917,
        title: "Kakeya asks for the smallest area needed to rotate a needle",
        type: "origin",
      },
      {
        year: 1928,
        title: "Besicovitch constructs needle sets with arbitrarily small area",
        type: "breakthrough",
      },
      {
        year: 1971,
        title: "Davies proves the planar Kakeya dimension result",
        type: "breakthrough",
      },
      {
        year: 2023,
        title: "Sticky 3D variants bring the planar intuition back into focus",
        type: "progress",
      },
    ],
  },
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
    coordinates: {
      difficulty: 9,
      beauty: 9,
      visual: 10,
      importance: 8,
      activity: 9,
      accessibility: 6,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Fourier restriction",
      "Incidence geometry",
      "Hausdorff dimension",
    ],
    authors: [
      {
        name: "Hong Wang",
        institution: "NYU Courant / IH\u00c9S",
        scholarUrl: "https://scholar.google.com/citations?user=wulKoVsAAAAJ",
        avatarUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Hong_Wang_%282025%29.jpg/250px-Hong_Wang_%282025%29.jpg",
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
        title:
          "Volume estimates for unions of convex sets, and the Kakeya set conjecture in three dimensions",
        arxivId: "2502.17655",
        url: "https://arxiv.org/abs/2502.17655",
        year: 2025,
      },
      {
        title: "Kakeya sets in R^3",
        url: "https://doi.org/10.1090/S0894-0347-99-00283-8",
        year: 1999,
      },
      {
        title:
          "A proof of the Kakeya set conjecture over rings of integers modulo square-free N",
        arxivId: "2406.19803",
        url: "https://arxiv.org/abs/2406.19803",
        year: 2025,
      },
    ],
    timeline: [
      { year: 1917, title: "Kakeya poses the needle problem", type: "origin" },
      {
        year: 1928,
        title: "Besicovitch shows measure can be zero",
        type: "progress",
      },
      {
        year: 1971,
        title: "Davies proves 2D case (dim = 2)",
        type: "progress",
      },
      {
        year: 2002,
        title: "Katz-Tao prove dim \u2265 5/2 + \u03b5 in 3D",
        type: "progress",
      },
      {
        year: 2025,
        month: "Feb",
        title: "Wang & Zahl prove dim = 3 in 3D",
        type: "breakthrough",
      },
      {
        year: 2026,
        title:
          "Wang wins New Horizons Prize; top Fields Medal candidate (~72%)",
        type: "recognition",
      },
    ],
  },
  {
    slug: "four-color-theorem",
    title: "Four Color Theorem",
    status: "proved",
    field: "combinatorics",
    year: 1976,
    shortDescription:
      "Every planar map can be colored with at most four colors so neighboring regions differ.",
    longDescription:
      "The four color theorem is one of the clearest visual problems in mathematics: no matter how complicated a planar map becomes, four colors suffice. Appel and Haken's proof was the first major computer-assisted proof to settle a famous problem.",
    vizComponent: "FourColorViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 7,
      beauty: 8,
      visual: 10,
      importance: 8,
      activity: 6,
      accessibility: 10,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Planar graphs", "Graph coloring", "Computer-assisted proof"],
    authors: [
      { name: "Kenneth Appel", institution: "University of Illinois" },
      { name: "Wolfgang Haken", institution: "University of Illinois" },
      {
        name: "Neil Robertson",
        institution: "Ohio State University",
        scholarUrl: scholarSearch("Neil Robertson graph theory four color"),
      },
      {
        name: "Georges Gonthier",
        institution: "Inria / Microsoft Research",
        scholarUrl: scholarSearch("Georges Gonthier formal proof Coq"),
      },
    ],
    papers: [
      {
        title: "Every planar map is four colorable",
        url: "https://doi.org/10.1090/conm/098",
        year: 1989,
      },
      {
        title: "The four-colour theorem",
        url: "https://doi.org/10.1006/jctb.1997.1750",
        year: 1997,
      },
      {
        title: "Formal proof — The Four-Color Theorem",
        url: "https://doi.org/10.1090/noti870",
        year: 2008,
      },
    ],
    timeline: [
      {
        year: 1852,
        title: "Guthrie poses the map-coloring problem",
        type: "origin",
      },
      {
        year: 1879,
        title: "Kempe publishes a flawed proof (later found incorrect)",
        type: "progress",
      },
      {
        year: 1890,
        title: "Heawood proves the five-color theorem",
        type: "progress",
      },
      {
        year: 1976,
        title: "Appel and Haken announce a computer-assisted proof",
        type: "breakthrough",
      },
      {
        year: 1997,
        title: "Robertson, Sanders, Seymour, Thomas give a simplified proof",
        type: "progress",
      },
      {
        year: 2005,
        title: "Gonthier formalizes the theorem in Coq",
        type: "recognition",
      },
    ],
  },
  {
    slug: "kepler-conjecture",
    title: "Kepler Conjecture",
    status: "proved",
    field: "geometry",
    year: 1998,
    shortDescription:
      "The densest packing of equal spheres is the familiar cannonball stacking arrangement.",
    longDescription:
      "In 1611 Kepler conjectured that no arrangement of equal spheres in three-dimensional space can exceed the density π/(3√2) ≈ 0.7405, achieved by the face-centered cubic (FCC) and hexagonal close-packed (HCP) lattices. Thomas Hales and Samuel Ferguson confirmed this in 1998 with an intricate computer-assisted proof, which the Annals of Mathematics published in 2005 after years of refereeing. The result was placed beyond doubt when the Flyspeck project, using the HOL Light and Isabelle proof assistants, completed a full formal verification published in Forum of Mathematics, Pi in 2017.",
    vizComponent: "SpherePackingViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 9,
      beauty: 9,
      visual: 10,
      importance: 8,
      activity: 6,
      accessibility: 8,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Sphere packing", "Discrete geometry", "Formal proof"],
    authors: [
      {
        name: "Johannes Kepler",
        institution: "Imperial Mathematician, Prague",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Johannes_Kepler",
      },
      {
        name: "Thomas C. Hales",
        institution: "University of Pittsburgh",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Thomas_Callister_Hales",
      },
      {
        name: "Samuel P. Ferguson",
        institution: "University of Michigan (PhD student of Hales)",
      },
    ],
    papers: [
      {
        title: "A proof of the Kepler conjecture",
        arxivId: "math/9811071",
        url: "https://doi.org/10.4007/annals.2005.162.1065",
        year: 2005,
      },
      {
        title: "A formal proof of the Kepler conjecture",
        arxivId: "1501.02155",
        url: "https://doi.org/10.1017/fmp.2017.1",
        year: 2017,
      },
      {
        title: "A conceptual breakthrough in sphere packing",
        arxivId: "1611.01685",
        url: "https://doi.org/10.1090/noti1474",
        year: 2017,
      },
    ],
    timeline: [
      {
        year: 1611,
        title: "Kepler states the sphere-packing conjecture",
        description:
          "In Strena seu de Nive Sexangula (The Six-Cornered Snowflake), Kepler conjectures that FCC is the densest way to stack equal spheres.",
        type: "origin",
      },
      {
        year: 1831,
        title: "Gauss proves the lattice case",
        description:
          "Carl Friedrich Gauss proves that FCC is the densest lattice packing of spheres, leaving irregular arrangements open.",
        type: "progress",
      },
      {
        year: 1953,
        title: "Fejes Tóth reduces the problem to a finite computation",
        description:
          "László Fejes Tóth shows the conjecture can in principle be settled by checking finitely many local configurations.",
        type: "progress",
      },
      {
        year: 1998,
        month: "Aug",
        title: "Hales and Ferguson announce a proof",
        description:
          "Thomas Hales, assisted by graduate student Samuel Ferguson, completes a 250-page computer-aided proof.",
        type: "breakthrough",
      },
      {
        year: 2005,
        title: "Annals of Mathematics publishes the proof",
        description:
          "After six years of refereeing, the journal publishes Hales' 100-page article, noting the referees were 99% certain of correctness.",
        type: "recognition",
      },
      {
        year: 2017,
        title: "Flyspeck formal verification published",
        description:
          "Hales and 21 collaborators publish a machine-checked proof in Forum of Mathematics, Pi, using HOL Light and Isabelle.",
        type: "recognition",
      },
    ],
  },
  {
    slug: "traveling-salesman-problem",
    title: "Traveling Salesman Problem",
    status: "partial",
    field: "computer-science",
    year: 1930,
    shortDescription:
      "Find the shortest closed route visiting every given city exactly once.",
    longDescription:
      "The traveling salesman problem is a benchmark for optimization and computational complexity. Exact solutions are possible for many large instances, but the general problem is NP-hard and no polynomial-time exact algorithm is known.",
    vizComponent: "TSPViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 9,
      importance: 9,
      activity: 9,
      accessibility: 10,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Optimization", "NP-hardness", "P vs NP"],
    authors: [
      { name: "Merrill Flood", institution: "RAND Corporation" },
      { name: "Richard Karp", institution: "UC Berkeley" },
      {
        name: "George Dantzig",
        institution: "RAND Corporation / Stanford University",
        scholarUrl: scholarSearch(
          "George Dantzig traveling salesman linear programming",
        ),
      },
    ],
    papers: [
      {
        title: "Reducibility among combinatorial problems",
        url: "https://doi.org/10.1007/978-1-4684-2001-2_9",
        year: 1972,
      },
      {
        title: "Solution of a large-scale traveling-salesman problem",
        url: "https://doi.org/10.1287/opre.2.4.393",
        year: 1954,
      },
      {
        title: "The Traveling Salesman Problem: A Computational Study",
        url: "https://press.princeton.edu/books/hardcover/9780691129938",
        year: 2006,
      },
    ],
    timeline: [
      {
        year: 1930,
        title: "Menger and others circulate the route-optimization problem",
        type: "origin",
      },
      {
        year: 1954,
        title:
          "Dantzig, Fulkerson, and Johnson solve a 49-city instance via cutting planes",
        type: "progress",
      },
      {
        year: 1972,
        title: "Karp proves the decision version is NP-complete",
        type: "breakthrough",
      },
      {
        year: 1976,
        title: "Christofides gives a 3/2-approximation algorithm",
        type: "progress",
      },
      {
        year: 2006,
        title: "Concorde solver optimally tours 85,900 cities",
        type: "progress",
      },
      {
        year: 2021,
        title: "Karlin, Klein, and Oveis Gharan improve on Christofides' ratio",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "aperiodic-monotile",
    title: "Aperiodic Monotile Problem",
    status: "resolved",
    field: "geometry",
    year: 2023,
    shortDescription:
      "A single tile can force nonperiodic tilings of the plane.",
    longDescription:
      "The aperiodic monotile problem asked whether one shape alone could tile the plane only nonperiodically. The 2023 'hat' and related monotiles gave a concrete answer to a long-running tiling question.",
    vizComponent: "AperiodicTilingViz",
    collections: ["beautiful", "frontier", "recent"],
    coordinates: {
      difficulty: 7,
      beauty: 10,
      visual: 10,
      importance: 7,
      activity: 8,
      accessibility: 8,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Tilings", "Aperiodicity", "Quasicrystals"],
    authors: [
      { name: "David Smith", institution: "Independent" },
      { name: "Joseph Myers", institution: "Mathematics" },
      { name: "Craig Kaplan", institution: "University of Waterloo" },
      {
        name: "Chaim Goodman-Strauss",
        institution: "National Museum of Mathematics",
      },
    ],
    papers: [
      {
        title: "An aperiodic monotile",
        arxivId: "2303.10798",
        url: "https://arxiv.org/abs/2303.10798",
        year: 2023,
      },
      {
        title: "A chiral aperiodic monotile",
        arxivId: "2305.17743",
        url: "https://arxiv.org/abs/2305.17743",
        year: 2023,
      },
      {
        title: "The undecidability of the domino problem",
        url: "https://doi.org/10.1090/memo/0066",
        year: 1966,
      },
    ],
    timeline: [
      {
        year: 1961,
        title:
          "Wang conjectures all tile sets that tile the plane admit periodic tilings",
        type: "origin",
      },
      {
        year: 1966,
        title:
          "Berger disproves Wang's conjecture with a set of 20,426 aperiodic tiles",
        type: "progress",
      },
      {
        year: 1974,
        title: "Penrose reduces the aperiodic set to just 2 tiles",
        type: "progress",
      },
      {
        year: 2023,
        month: "Mar",
        title:
          "Smith, Myers, Kaplan, and Goodman-Strauss announce the 'hat' aperiodic monotile",
        type: "breakthrough",
      },
      {
        year: 2023,
        month: "May",
        title: "The 'spectre' tile achieves aperiodicity without reflections",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "mandelbrot-local-connectivity",
    title: "Mandelbrot Local Connectivity",
    status: "open",
    field: "analysis",
    year: 1982,
    shortDescription:
      "Asks whether the Mandelbrot set is locally connected at every point.",
    longDescription:
      "The MLC conjecture asks for a precise topological regularity property of the Mandelbrot set. The image is iconic, but the conjecture is not merely visual: local connectivity would organize how parameter space is navigated by external rays.",
    vizComponent: "MandelbrotViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 8,
      accessibility: 7,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Complex dynamics", "Fractals", "Local connectivity"],
    authors: [
      { name: "Benoit Mandelbrot", institution: "IBM" },
      {
        name: "Adrien Douady",
        institution: "Universite Paris-Sud",
        scholarUrl: scholarSearch(
          "Adrien Douady Mandelbrot set complex dynamics",
        ),
      },
      { name: "John Hubbard", institution: "Cornell University" },
    ],
    papers: [
      {
        title: "Exploring the Mandelbrot set",
        url: "https://doi.org/10.1007/BF03023727",
        year: 1985,
      },
      {
        title: "Etude dynamique des polynomes complexes (Orsay Notes)",
        url: "https://pi.math.cornell.edu/~hubbard/OrsayEnglish.pdf",
        year: 1984,
      },
      {
        title: "Dynamics of quadratic polynomials, I-II",
        url: "https://doi.org/10.2307/120974",
        year: 1999,
      },
    ],
    timeline: [
      {
        year: 1980,
        title: "Mandelbrot names the set and popularizes computer images",
        type: "origin",
      },
      {
        year: 1982,
        title: "Douady and Hubbard prove the Mandelbrot set is connected",
        type: "progress",
      },
      {
        year: 1990,
        title: "Yoccoz proves MLC for finitely renormalizable parameters",
        type: "progress",
      },
      {
        year: 1999,
        title:
          "Lyubich proves MLC at infinitely renormalizable real parameters",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "square-peg-problem",
    title: "Square Peg Problem",
    status: "open",
    field: "geometry",
    year: 1911,
    shortDescription:
      "Every simple closed curve in the plane is conjectured to contain four vertices of a square.",
    longDescription:
      "Draw any closed loop on paper — no matter how wild. Can you always find four points on it forming a perfect square? Toeplitz conjectured yes in 1911, and partial results cover convex, smooth, and piecewise-linear curves. The most dramatic recent progress came from Greene and Lobb (2021), who used symplectic geometry — Möbius bands in R⁴ forming a Klein bottle — to prove every smooth curve inscribes rectangles of every aspect ratio. The general case for non-smooth Jordan curves remains open.",
    vizComponent: "SquarePegViz",
    collections: ["beautiful", "frontier"],
    coordinates: {
      difficulty: 8,
      beauty: 10,
      visual: 10,
      importance: 6,
      activity: 7,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: [
      "Jordan curves",
      "Symplectic geometry",
      "Inscribed rectangles",
      "Topology",
    ],
    authors: [
      {
        name: "Otto Toeplitz",
        institution: "University of Göttingen",
        scholarUrl: scholarSearch("Otto Toeplitz inscribed square conjecture"),
      },
      {
        name: "Joshua Evan Greene",
        institution: "Boston College",
        scholarUrl: scholarSearch("Joshua Greene rectangular peg problem"),
      },
      {
        name: "Andrew Lobb",
        institution: "Durham University",
        scholarUrl: scholarSearch("Andrew Lobb rectangular peg problem"),
      },
    ],
    papers: [
      {
        title: "The rectangular peg problem",
        arxivId: "2005.09193",
        url: "https://doi.org/10.4007/annals.2021.194.2.4",
        year: 2021,
      },
      {
        title: "An integration approach to the Toeplitz square peg problem",
        arxivId: "1611.07441",
        url: "https://doi.org/10.1017/fms.2017.23",
        year: 2017,
      },
      {
        title: "Cyclic quadrilaterals and smooth Jordan curves",
        arxivId: "2011.05216",
        url: "https://arxiv.org/abs/2011.05216",
        year: 2020,
      },
    ],
    timeline: [
      {
        year: 1911,
        title: "Toeplitz poses the inscribed square conjecture",
        type: "origin",
      },
      {
        year: 1916,
        title: "Emch proves the convex and piecewise-analytic case",
        type: "progress",
      },
      {
        year: 1989,
        title: "Stromquist proves the locally monotone case",
        type: "progress",
      },
      {
        year: 2017,
        title: "Tao handles unions of two Lipschitz graphs",
        type: "progress",
      },
      {
        year: 2021,
        title:
          "Greene–Lobb prove every smooth curve inscribes rectangles of every aspect ratio",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "hadwiger-nelson-problem",
    title: "Hadwiger-Nelson Problem",
    status: "partial",
    field: "combinatorics",
    year: 1950,
    shortDescription:
      "Determine how many colors are needed to color the plane so points distance 1 apart differ.",
    longDescription:
      "The chromatic number of the plane is known to be at least 5 and at most 7. The problem is easy to draw as a unit-distance graph but remains open after decades.",
    vizComponent: "HadwigerNelsonViz",
    collections: ["canonical", "beautiful", "frontier"],
    coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 9,
      importance: 7,
      activity: 8,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: [
      "Graph coloring",
      "Unit-distance graphs",
      "Discrete geometry",
    ],
    authors: [
      { name: "Hugo Hadwiger", institution: "University of Bern" },
      {
        name: "Edward Nelson",
        institution: "Princeton University",
        scholarUrl: scholarSearch("Edward Nelson chromatic number plane"),
      },
      {
        name: "Aubrey de Grey",
        institution: "SENS Research Foundation",
        scholarUrl: scholarSearch(
          "Aubrey de Grey chromatic number plane graph",
        ),
      },
    ],
    papers: [
      {
        title: "The chromatic number of the plane is at least 5",
        arxivId: "1804.02385",
        url: "https://arxiv.org/abs/1804.02385",
        year: 2018,
      },
      {
        title: "The Mathematical Coloring Book",
        url: "https://doi.org/10.1007/978-0-387-74642-5",
        year: 2009,
      },
      {
        title: "On the chromatic number of the plane",
        arxivId: "1909.00180",
        url: "https://arxiv.org/abs/1909.00180",
        year: 2019,
      },
    ],
    timeline: [
      {
        year: 1950,
        title: "Nelson poses the chromatic number of the plane problem",
        type: "origin",
      },
      {
        year: 1950,
        title: "Isbell proves the chromatic number is at least 4",
        type: "progress",
      },
      {
        year: 1961,
        title: "Hadwiger and Debrunner reformulate and popularize the problem",
        type: "progress",
      },
      {
        year: 2018,
        title: "de Grey proves the chromatic number is at least 5",
        type: "breakthrough",
      },
      {
        year: 2018,
        title: "Heule uses SAT solvers to reduce the required vertex count",
        type: "progress",
      },
    ],
  },
  {
    slug: "plateau-problem",
    title: "Plateau's Problem",
    status: "resolved",
    field: "analysis",
    year: 1931,
    shortDescription:
      "Find a surface of least area spanning a given boundary curve.",
    longDescription:
      "Dip a wire frame into soapy water — the film that forms minimises surface area, producing a minimal surface with mean curvature H = 0. Douglas and Radó independently proved existence in 1930–1931, earning Douglas one of the first Fields Medals. Federer–Fleming's geometric measure theory (1960) generalised the result to arbitrary dimensions via integral currents.",
    vizComponent: "PlateauViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 8,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 7,
      accessibility: 8,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Minimal surfaces",
      "Calculus of variations",
      "Geometric measure theory",
    ],
    authors: [
      {
        name: "Joseph Plateau",
        institution: "Ghent University",
        scholarUrl: scholarSearch("Joseph Plateau soap film minimal surfaces"),
      },
      {
        name: "Jesse Douglas",
        institution: "Columbia University",
        scholarUrl: scholarSearch("Jesse Douglas solution problem Plateau"),
      },
      {
        name: "Tibor Radó",
        institution: "Ohio State University",
        scholarUrl: scholarSearch("Tibor Rado Plateau problem"),
      },
    ],
    papers: [
      {
        title: "Solution of the problem of Plateau",
        url: "https://doi.org/10.1090/S0002-9947-1931-1501590-9",
        year: 1931,
      },
      {
        title: "On Plateau's problem",
        url: "https://doi.org/10.2307/1968237",
        year: 1930,
      },
      {
        title: "Normal and integral currents",
        url: "https://doi.org/10.2307/1970227",
        year: 1960,
      },
    ],
    timeline: [
      {
        year: 1760,
        title: "Lagrange formulates the minimal surface equation",
        type: "origin",
      },
      {
        year: 1849,
        title: "Plateau systematically studies soap-film minimal surfaces",
        type: "origin",
      },
      {
        year: 1930,
        title: "Radó solves the problem for rectifiable boundaries",
        type: "breakthrough",
      },
      {
        year: 1931,
        title: "Douglas gives a general solution via his A-functional",
        type: "breakthrough",
      },
      {
        year: 1936,
        title: "Douglas receives one of the first Fields Medals",
        type: "recognition",
      },
      {
        year: 1960,
        title:
          "Federer–Fleming extend to arbitrary dimensions via integral currents",
        type: "progress",
      },
    ],
  },
  {
    slug: "kissing-number-problem",
    title: "Kissing Number Problem",
    status: "partial",
    field: "geometry",
    year: 1694,
    shortDescription:
      "Ask how many equal spheres can touch one equal sphere without overlap.",
    longDescription:
      "The kissing number problem is solved in several dimensions, including the famous 3D answer of 12, but remains open in many dimensions. It is a compact visual gateway into high-dimensional geometry.",
    vizComponent: "KissingNumberViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 7,
      activity: 7,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Sphere packing", "Lattices", "Coding theory"],
    authors: [
      { name: "Isaac Newton", institution: "Royal Society" },
      { name: "David Gregory", institution: "University of Oxford" },
      {
        name: "Kurt Schutte",
        institution: "University of Munich",
        scholarUrl: scholarSearch("Kurt Schutte kissing number sphere packing"),
      },
      {
        name: "Vladimir Levenshtein",
        institution: "Keldysh Institute, Moscow",
        scholarUrl: scholarSearch(
          "Vladimir Levenshtein bounds kissing numbers",
        ),
      },
    ],
    papers: [
      {
        title: "The kissing number in four dimensions",
        arxivId: "math/0309430",
        url: "https://arxiv.org/abs/math/0309430",
        year: 2003,
      },
      {
        title: "Das Problem der dreizehn Kugeln",
        url: "https://doi.org/10.1007/BF01343156",
        year: 1953,
      },
      {
        title: "The kissing number in four dimensions",
        url: "https://doi.org/10.4007/annals.2008.168.1",
        year: 2008,
      },
    ],
    timeline: [
      {
        year: 1694,
        title: "Newton vs Gregory dispute: is the 3D kissing number 12 or 13?",
        type: "origin",
      },
      {
        year: 1953,
        title: "Schutte and van der Waerden prove the 3D kissing number is 12",
        type: "breakthrough",
      },
      {
        year: 1979,
        title:
          "Levenshtein, Odlyzko, and Sloane prove kissing numbers in dimensions 8 and 24",
        type: "breakthrough",
      },
      {
        year: 2003,
        title: "Musin gives a new proof that the 4D kissing number is 24",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "steiner-tree-problem",
    title: "Steiner Tree Problem",
    status: "partial",
    field: "computer-science",
    year: 1836,
    shortDescription:
      "Connect given points with the shortest possible network, allowing extra junction points.",
    longDescription:
      "The geometric Steiner tree problem asks for the shortest network connecting prescribed terminals, with optional Steiner points that meet at 120-degree angles. Its computational versions are NP-hard, but the visual principle is crisp.",
    vizComponent: "SteinerTreeViz",
    collections: ["beautiful", "canonical"],
    coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 9,
      importance: 7,
      activity: 7,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Optimization", "Networks", "Computational geometry"],
    authors: [
      { name: "Jakob Steiner", institution: "University of Berlin" },
      {
        name: "Edgar Gilbert",
        institution: "Bell Labs",
        scholarUrl: scholarSearch("Edgar Gilbert Steiner tree minimum network"),
      },
      {
        name: "Henry Pollak",
        institution: "Bell Labs",
        scholarUrl: scholarSearch(
          "Henry Pollak Steiner tree Gilbert-Pollak conjecture",
        ),
      },
    ],
    papers: [
      {
        title: "The Euclidean Steiner tree problem is NP-hard",
        url: "https://doi.org/10.1016/0020-0190(77)90010-9",
        year: 1977,
      },
      {
        title: "Steiner minimal trees",
        url: "https://doi.org/10.1137/0116001",
        year: 1968,
      },
      {
        title: "On Steiner's problem with rectilinear distance",
        url: "https://doi.org/10.1007/BF01758756",
        year: 1992,
      },
    ],
    timeline: [
      {
        year: 1640,
        title:
          "Fermat poses the problem of minimizing total distance to three points",
        type: "origin",
      },
      {
        year: 1836,
        title: "Gauss considers generalized shortest networks",
        type: "progress",
      },
      {
        year: 1941,
        title: "Courant and Robbins popularize the Steiner tree problem",
        type: "progress",
      },
      {
        year: 1968,
        title: "Gilbert and Pollak conjecture the Steiner ratio is sqrt(3)/2",
        type: "progress",
      },
      {
        year: 1977,
        title: "The Euclidean Steiner tree problem is proved NP-hard",
        type: "breakthrough",
      },
      {
        year: 1992,
        title:
          "The Gilbert-Pollak conjecture is proved for the Euclidean plane",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "isoperimetric-problem",
    title: "Isoperimetric Problem",
    status: "proved",
    field: "geometry",
    year: 1838,
    shortDescription:
      "Among plane figures with a fixed perimeter, the circle encloses the greatest area.",
    longDescription:
      "The isoperimetric problem is one of the oldest optimization problems in geometry. Its visual statement is immediate: deform any closed curve while holding perimeter fixed, and the enclosed area is maximized exactly when the curve becomes a circle.",
    vizComponent: "IsoperimetricViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 6,
      beauty: 10,
      visual: 10,
      importance: 8,
      activity: 5,
      accessibility: 10,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Calculus of variations", "Geometry", "Dido's problem"],
    authors: [
      { name: "Dido", institution: "Classical legend" },
      {
        name: "Jakob Steiner",
        institution: "University of Berlin",
        scholarUrl: scholarSearch("Jakob Steiner isoperimetric problem"),
      },
      {
        name: "Karl Weierstrass",
        institution: "University of Berlin",
        scholarUrl: scholarSearch("Karl Weierstrass calculus of variations"),
      },
    ],
    papers: [
      {
        title: "The isoperimetric inequality",
        url: "https://doi.org/10.1090/S0002-9904-1978-14553-4",
        year: 1978,
      },
      {
        title:
          "Sur quelques applications de la theorie des courbes a la geometrie",
        url: "https://doi.org/10.1007/BF01445166",
        year: 1902,
      },
      {
        title: "The isoperimetric problem on surfaces",
        url: "https://doi.org/10.1007/s000140050007",
        year: 2001,
      },
    ],
    timeline: [
      {
        year: -200,
        title: "Zenodorus gives the earliest known proof for polygons",
        type: "origin",
      },
      {
        year: 1838,
        title: "Steiner gives a famous symmetrization proof",
        type: "breakthrough",
      },
      {
        year: 1870,
        title: "Weierstrass supplies a rigorous variational proof",
        type: "progress",
      },
      {
        year: 1919,
        title: "Schmidt gives a simplified proof using integral geometry",
        type: "progress",
      },
      {
        year: 1958,
        title: "De Giorgi develops perimeter theory in general dimensions",
        type: "progress",
      },
    ],
  },
  {
    slug: "honeycomb-conjecture",
    title: "Honeycomb Conjecture",
    status: "proved",
    field: "geometry",
    year: 1999,
    shortDescription:
      "Regular hexagons give the least-perimeter way to divide the plane into equal-area cells.",
    longDescription:
      "The honeycomb conjecture asks why hexagonal cells are optimal for equal-area partitions of the plane. Hales proved that the regular hexagonal tiling minimizes total perimeter.",
    vizComponent: "HoneycombViz",
    collections: ["beautiful", "canonical"],
    coordinates: {
      difficulty: 7,
      beauty: 10,
      visual: 10,
      importance: 7,
      activity: 5,
      accessibility: 10,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Tilings", "Minimal perimeter", "Discrete geometry"],
    authors: [
      {
        name: "Thomas Hales",
        institution: "University of Pittsburgh",
        scholarUrl: scholarSearch("Thomas C Hales honeycomb conjecture"),
      },
      {
        name: "Laszlo Fejes Toth",
        institution: "Hungarian Academy of Sciences",
        scholarUrl: scholarSearch("Laszlo Fejes Toth Lagerungen packing"),
      },
    ],
    papers: [
      {
        title: "The honeycomb conjecture",
        arxivId: "math/9906042",
        url: "https://doi.org/10.1007/s004540010071",
        year: 2001,
      },
      {
        title: "Lagerungen in der Ebene, auf der Kugel und im Raum",
        url: "https://doi.org/10.1007/978-3-642-65234-9",
        year: 1953,
      },
      {
        title: "Geometric Measure Theory: A Beginner's Guide",
        url: "https://doi.org/10.1016/C2009-0-24979-3",
        year: 2000,
      },
    ],
    timeline: [
      {
        year: -36,
        title: "Varro speculates on the optimality of honeycomb cells",
        type: "origin",
      },
      {
        year: 1611,
        title: "Kepler discusses hexagonal packing efficiency",
        type: "progress",
      },
      {
        year: 1943,
        title: "Fejes Toth formulates the honeycomb conjecture precisely",
        type: "progress",
      },
      {
        year: 1999,
        title: "Hales proves the honeycomb conjecture",
        type: "breakthrough",
      },
      {
        year: 2001,
        title: "Morgan extends regularity results for the partition problem",
        type: "progress",
      },
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    slug: "gauss-circle-problem",
    title: "Gauss Circle Problem",
    status: "open",
    field: "number-theory",
    year: 1837,
    shortDescription:
      "Estimate how many integer lattice points lie inside a circle of radius r.",
    longDescription:
      "The Gauss circle problem asks for the sharp error term when counting lattice points in a disk. The image is simple: the main term is area, and the hard part lives near the boundary.",
    vizComponent: "GaussCircleViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 9,
      importance: 7,
      activity: 8,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: [
      "Lattice points",
      "Analytic number theory",
      "Exponential sums",
    ],
    authors: [
      {
        name: "Carl Friedrich Gauss",
        institution: "University of Göttingen",
        scholarUrl: scholarSearch(
          "Carl Friedrich Gauss circle problem lattice points",
        ),
      },
      {
        name: "G. H. Hardy",
        institution: "University of Cambridge",
        scholarUrl: scholarSearch("G H Hardy lattice points circle"),
      },
      {
        name: "Martin Huxley",
        institution: "Cardiff University",
        scholarUrl: scholarSearch(
          "Martin Huxley lattice points exponential sums",
        ),
      },
    ],
    papers: [
      {
        title: "On the expression of a number as the sum of two squares",
        url: "https://doi.org/10.1093/qmath/os-46.1.263",
        year: 1915,
      },
      {
        title: "Exponential sums and lattice points III",
        url: "https://doi.org/10.1112/S0024611502013874",
        year: 2003,
      },
      {
        title:
          "Improvement on Gauss circle Problem and Dirichlet divisor Problem",
        arxivId: "2308.14859",
        url: "https://arxiv.org/abs/2308.14859",
        year: 2023,
      },
    ],
    timeline: [
      {
        year: 1837,
        title: "Gauss counts lattice points inside circles",
        type: "origin",
      },
      {
        year: 1906,
        title: "Sierpiński proves E(R) = O(R^{2/3})",
        type: "progress",
      },
      {
        year: 1915,
        title:
          "Hardy and Landau prove E(R) = Ω(R^{1/2}), establishing the lower bound",
        type: "breakthrough",
      },
      {
        year: 1963,
        title: "Iwaniec and Mozzochi improve the exponent toward 7/11",
        type: "progress",
      },
      {
        year: 2003,
        title: "Huxley proves E(R) = O(R^{131/208}), the current best bound",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "moving-sofa-problem",
    title: "Moving Sofa Problem",
    status: "watch",
    field: "geometry",
    year: 1966,
    shortDescription:
      "Find the largest-area shape that can move around a right-angled hallway corner.",
    longDescription:
      "The moving sofa problem asks for the largest possible shape that can be maneuvered around a 90-degree turn in a unit-width hallway. Gerver's shape has long been the best-known candidate; recent claimed solutions make this an active-watch entry.",
    vizComponent: "MovingSofaViz",
    collections: ["beautiful", "frontier"],
    coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 8,
      accessibility: 9,
    },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: [
      "Geometric optimization",
      "Motion planning",
      "Convex geometry",
    ],
    authors: [
      {
        name: "Leo Moser",
        institution: "University of Alberta",
        scholarUrl: scholarSearch("Leo Moser moving sofa problem"),
      },
      {
        name: "Joseph Gerver",
        institution: "Mathematics",
        scholarUrl: scholarSearch("Joseph Gerver moving sofa problem"),
      },
      {
        name: "Jineon Baek",
        institution: "Mathematics",
        scholarUrl: scholarSearch("Jineon Baek moving sofa problem"),
      },
    ],
    papers: [
      {
        title: "On the sofa problem",
        url: "https://doi.org/10.1016/S0925-7721(97)00025-4",
        year: 1992,
      },
      {
        title: "Optimality of Gerver's Sofa",
        arxivId: "2411.19826",
        url: "https://arxiv.org/abs/2411.19826",
        year: 2024,
      },
      {
        title: "A computational study of the moving sofa problem",
        arxivId: "1706.06630",
        url: "https://arxiv.org/abs/1706.06630",
        year: 2017,
      },
    ],
    formulas: [
      {
        label: "Core question",
        latex: String.raw`\mu=\sup \operatorname{area}(S),\qquad |G|=2.219531668\ldots`,
        description:
          "The moving sofa constant is the largest area among shapes that can pass through a unit-width right-angle hallway. Gerver's shape reaches the value shown here.",
      },
    ],
    timeline: [
      {
        year: 1966,
        title: "Moser popularizes the moving sofa problem",
        type: "origin",
      },
      {
        year: 1968,
        title:
          "Hammersley proves upper bound μ ≤ 2√2 and proposes telephone-shaped sofa",
        type: "progress",
      },
      {
        year: 1992,
        title:
          "Gerver constructs 18-curve sofa with area 2.2195… via variational analysis",
        type: "breakthrough",
      },
      {
        year: 2017,
        title: "Romik–Kallus computational studies narrow the gap further",
        type: "progress",
      },
      {
        year: 2024,
        title: "Baek posts a proof of Gerver's optimality (μ = |G|)",
        type: "breakthrough",
      },
    ],
  },
  {
    slug: "moser-worm-problem",
    title: "Moser's Worm Problem",
    status: "open",
    field: "geometry",
    year: 1966,
    shortDescription:
      "Find the smallest-area planar region that can cover every curve of length 1.",
    longDescription:
      "Moser's worm problem asks for the region of smallest area that can accommodate every plane curve of unit length, where each curve may be rotated and translated to fit. The problem is visually natural but technically subtle because every possible bent, kinked, or smoothly curved arc of length one must fit inside a single compact region. The best known non-convex upper bound of approximately 0.260437 was established by Norwood and Poole in 2003, while the best convex lower bound of 0.232239 was proved by Khandhawit, Sriswasdi, and Wetzel in 2013. Despite steady progress on tightening bounds, the exact minimum area remains unknown.",
    vizComponent: "MoserWormViz",
    collections: ["beautiful", "frontier"],
    coordinates: {
      difficulty: 8,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 7,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Geometric optimization", "Universal covers", "Plane curves"],
    authors: [
      {
        name: "Leo Moser",
        institution: "University of Alberta",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Leo_Moser",
        scholarUrl: scholarSearch("Leo Moser worm problem"),
      },
      {
        name: "Rick Norwood",
        institution: "East Tennessee State University",
        scholarUrl: scholarSearch("Rick Norwood Moser worm problem"),
      },
      {
        name: "George Poole",
        institution: "East Tennessee State University",
        scholarUrl: scholarSearch("George Poole Moser worm problem"),
      },
    ],
    papers: [
      {
        title: "The Worm Problem of Leo Moser",
        url: "https://doi.org/10.1007/s00454-003-2953-y",
        year: 2003,
      },
      {
        title: "An Improved Lower Bound for Moser's Worm Problem",
        arxivId: "math/0701391",
        url: "https://arxiv.org/abs/math/0701391",
        year: 2007,
      },
      {
        title: "Curve packing and modulus estimates",
        arxivId: "1602.01707",
        url: "https://arxiv.org/abs/1602.01707",
        year: 2016,
      },
    ],
    timeline: [
      {
        year: 1966,
        title: "Moser poses the universal-cover problem for unit curves",
        description:
          "Leo Moser asks: what is the region of smallest area that can accommodate every planar arc of length one?",
        type: "origin",
      },
      {
        year: 1974,
        title: "Gerriets and Poole test polygonal-chain conjectures",
        description:
          "Early work proposes that three-segment polygonal chains could serve as a test family for minimal covers.",
        type: "progress",
      },
      {
        year: 2003,
        title: "Norwood and Poole achieve non-convex upper bound 0.260437",
        description:
          "A carefully trimmed non-convex region is shown to contain all unit arcs, setting the best known upper bound.",
        type: "breakthrough",
      },
      {
        year: 2007,
        title: "Khandhawit and Sriswasdi improve the lower bound to 0.227498",
        description:
          "By requiring the cover to contain a unit segment, an equilateral triangle of side 1/2, and a square of side 1/3, they raise the lower bound.",
        type: "progress",
      },
      {
        year: 2021,
        title: "Panraksa and Wichiramala resolve Wetzel's sector conjecture",
        description:
          "They confirm that for convex covers, the 30-degree circular sector plays a key role, yielding a convex upper bound near pi/12.",
        type: "progress",
      },
    ],
  },
  {
    slug: "illumination-problem",
    title: "Illumination Problem",
    status: "open",
    field: "geometry",
    year: 1957,
    shortDescription:
      "Ask how many directions are needed to illuminate every boundary point of a convex body.",
    longDescription:
      "Hadwiger's illumination conjecture asks for the minimum number of external directions (or, equivalently, smaller homothetic copies) needed to cover every boundary point of a convex body in n-dimensional space. The conjecture states that this number is at most 2^n, with equality if and only if the body is a parallelotope. Levi resolved the two-dimensional case in 1955, showing that four directions always suffice and only parallelograms require all four. In three dimensions, Prymak proved in 2023 that 14 translates suffice, still short of the conjectured 8; the general conjecture remains open for all n >= 3.",
    vizComponent: "IlluminationViz",
    collections: ["beautiful", "frontier"],
    coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 9,
      importance: 7,
      activity: 7,
      accessibility: 8,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Convex geometry", "Covering problems", "Discrete geometry"],
    authors: [
      {
        name: "Hugo Hadwiger",
        institution: "University of Bern",
        scholarUrl: scholarSearch("Hugo Hadwiger illumination problem"),
      },
      {
        name: "Vladimir Boltyansky",
        institution: "Moscow State University",
        scholarUrl: scholarSearch("Vladimir Boltyansky illumination problem"),
      },
    ],
    papers: [
      {
        title: "Illumination problem",
        url: "https://mathworld.wolfram.com/IlluminationProblem.html",
        year: 2026,
      },
      {
        title: "Illuminating and covering convex bodies",
        arxivId: "1308.0791",
        url: "https://arxiv.org/abs/1308.0791",
        year: 2013,
      },
      {
        title: "On lattice illumination of smooth convex bodies",
        arxivId: "2501.10570",
        url: "https://arxiv.org/abs/2501.10570",
        year: 2025,
      },
    ],
    timeline: [
      {
        year: 1957,
        title: "Hadwiger formulates the illumination conjecture",
        type: "origin",
      },
      {
        year: 1960,
        title:
          "Boltyansky proves equivalence to the covering number formulation",
        type: "progress",
      },
      {
        year: 1955,
        title:
          "Levi solves the 2D case: I(K) ≤ 4 with equality for parallelograms",
        type: "breakthrough",
      },
      {
        year: 2013,
        title:
          "Naszódi proves I(K) ≤ (2n choose n)(n ln n + n ln ln n + 5n) in high dimensions",
        type: "progress",
      },
      {
        year: 2023,
        title: "Prymak proves 14 translates suffice for any convex body in R³",
        type: "progress",
      },
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
    coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 8,
      importance: 9,
      activity: 9,
      accessibility: 4,
    },
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
        title:
          "Hilbert's sixth problem: derivation of fluid equations via Boltzmann's kinetic theory",
        arxivId: "2503.01800",
        url: "https://arxiv.org/abs/2503.01800",
        year: 2025,
      },
      {
        title: "Time evolution of large classical systems",
        url: "https://doi.org/10.1007/BFb0091149",
        year: 1975,
      },
      {
        title:
          "Hilbert's sixth problem: derivation of fluid equations via Boltzmann's kinetic theory",
        arxivId: "2408.07818",
        url: "https://arxiv.org/abs/2408.07818",
        year: 2024,
      },
    ],
    timeline: [
      {
        year: 1900,
        title: "Hilbert poses 23 problems at ICM Paris; #6: axiomatize physics",
        type: "origin",
      },
      {
        year: 1872,
        title: "Boltzmann derives kinetic equation (pre-Hilbert)",
        type: "progress",
      },
      {
        year: 1975,
        title: "Lanford's theorem: short-time derivation",
        type: "progress",
      },
      {
        year: 2025,
        month: "Mar",
        title: "Deng-Hani-Ma derive full Euler & Navier-Stokes",
        type: "breakthrough",
      },
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
    coordinates: {
      difficulty: 8,
      beauty: 8,
      visual: 8,
      importance: 7,
      activity: 8,
      accessibility: 5,
    },
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
      {
        name: "Sigmund Mizohata",
        institution: "Kyoto University",
        scholarUrl: scholarSearch("Mizohata Takeuchi Fourier restriction"),
      },
      {
        name: "Izabella Łaba",
        institution: "University of British Columbia",
        scholarUrl: scholarSearch("Izabella Laba harmonic analysis Kakeya"),
      },
    ],
    papers: [
      {
        title: "A Counterexample to the Mizohata-Takeuchi Conjecture",
        arxivId: "2502.06137",
        url: "https://arxiv.org/abs/2502.06137",
        year: 2025,
      },
      {
        title: "The Mizohata-Takeuchi conjecture and the Stein conjecture",
        arxivId: "2311.09000",
        url: "https://arxiv.org/abs/2311.09000",
        year: 2023,
      },
      {
        title: "Fourier restriction to convex surfaces in R^3",
        url: "https://doi.org/10.1007/s00222-024-01282-y",
        year: 2024,
      },
    ],
    timeline: [
      {
        year: 1970,
        title:
          "Stein proposes Fourier restriction conjecture for curved surfaces",
        type: "origin",
      },
      {
        year: 1985,
        title:
          "Mizohata and Takeuchi conjecture weighted restriction estimates",
        type: "origin",
      },
      {
        year: 2023,
        title: "Renewed interest: connections to Stein conjecture explored",
        type: "progress",
      },
      {
        year: 2025,
        title: "Hannah Cairo (age 17) finds explicit counterexample",
        type: "breakthrough",
      },
      {
        year: 2025,
        title: "Cairo enters PhD at University of Maryland, skipping undergrad",
        type: "recognition",
      },
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
    coordinates: {
      difficulty: 7,
      beauty: 9,
      visual: 10,
      importance: 6,
      activity: 8,
      accessibility: 8,
    },
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
      {
        title: "A resolution of the Rupert problem for regular polytopes",
        arxivId: "2409.16407",
        url: "https://arxiv.org/abs/2409.16407",
        year: 2024,
      },
      {
        title: "Prince Rupert's problem and its generalizations",
        url: "https://doi.org/10.1007/s00283-016-9680-2",
        year: 2016,
      },
    ],
    timeline: [
      {
        year: 1693,
        title: "Prince Rupert bets a cube can pass through itself",
        type: "origin",
      },
      { year: 1816, title: "Nieuwland proves the cube case", type: "progress" },
      {
        year: 2017,
        title: "Conjecture: all convex polyhedra are Rupert",
        type: "progress",
      },
      {
        year: 2025,
        month: "Aug",
        title: "Steininger & Yurkevich find 90-vertex counterexample",
        type: "breakthrough",
      },
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
    coordinates: {
      difficulty: 8,
      beauty: 7,
      visual: 7,
      importance: 8,
      activity: 10,
      accessibility: 7,
    },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: [
      "Matrix multiplication",
      "Computational complexity",
      "AI for math",
    ],
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
        title:
          "AlphaEvolve: A coding agent for scientific and algorithmic discovery",
        arxivId: "2506.13131",
        url: "https://arxiv.org/abs/2506.13131",
        year: 2025,
      },
      {
        title: "Gaussian elimination is not optimal",
        url: "https://doi.org/10.1007/BF02165411",
        year: 1969,
      },
      {
        title:
          "Discovering faster matrix multiplication algorithms with reinforcement learning",
        url: "https://doi.org/10.1038/s41586-022-05172-4",
        year: 2022,
      },
    ],
    timeline: [
      {
        year: 1969,
        title: "Strassen: 2\u00d72 in 7 multiplications (not 8)",
        type: "origin",
      },
      {
        year: 1969,
        title: "Recursive application: 4\u00d74 in 49 multiplications",
        type: "progress",
      },
      {
        year: 2022,
        title: "AlphaTensor finds improvements for larger matrices",
        type: "progress",
      },
      {
        year: 2025,
        month: "May",
        title: "AlphaEvolve: 4\u00d74 complex in 48 multiplications",
        type: "breakthrough",
      },
      {
        year: 2026,
        month: "Mar",
        title: "Tao: 'AI is ready for primetime in math'",
        type: "recognition",
      },
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
      "The Riemann Hypothesis asserts that every nontrivial zero of the analytic continuation of the Riemann zeta function has real part exactly 1/2. It is the central open problem in analytic number theory because it controls the error term in the prime-counting function: if true, the deviation of pi(x) from the logarithmic integral li(x) is at most of order sqrt(x) log x. Listed as the eighth of Hilbert's 1900 problems and one of the seven Clay Millennium Prize Problems, it connects to random matrix theory, quantum chaos, and the explicit distribution of primes through Riemann's 1859 explicit formula.",
    vizComponent: "RiemannViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 8,
      importance: 10,
      activity: 10,
      accessibility: 6,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Prime numbers", "Zeta function", "Random matrices"],
    authors: [
      {
        name: "Bernhard Riemann",
        institution: "University of Gottingen",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Bernhard_Riemann",
      },
      {
        name: "Jacques Hadamard",
        institution: "College de France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jacques_Hadamard",
      },
      {
        name: "Charles de la Vallee-Poussin",
        institution: "Catholic University of Louvain",
        wikipediaUrl:
          "https://en.wikipedia.org/wiki/Charles_Jean_de_la_Vall%C3%A9e-Poussin",
      },
    ],
    papers: [
      {
        title: "Ueber die Anzahl der Primzahlen unter einer gegebenen Grosse",
        url: "https://www.claymath.org/millennium/riemann-hypothesis/",
        year: 1859,
      },
      {
        title:
          "Recherches sur la distribution des diviseurs d'un nombre entier",
        url: "https://doi.org/10.24033/bsmf.545",
        year: 1896,
      },
      {
        title:
          "The 10^13 first zeros of the Riemann zeta function, and zeros computation at very large height",
        arxivId: "math/0402335",
        url: "https://arxiv.org/abs/math/0402335",
        year: 2004,
      },
    ],
    timeline: [
      {
        year: 1859,
        title:
          "Riemann formulates the hypothesis in his only number-theory paper",
        description:
          "Published in the Monatsberichte der Preussischen Akademie der Wissenschaften, connecting zeros of zeta to primes.",
        type: "origin",
      },
      {
        year: 1896,
        title:
          "Hadamard and de la Vallee-Poussin independently prove the Prime Number Theorem",
        description:
          "They showed pi(x) ~ x / ln x by proving zeta has no zeros on the line Re(s) = 1.",
        type: "breakthrough",
      },
      {
        year: 1900,
        title: "Hilbert lists it as Problem 8",
        description:
          "The hypothesis appears among 23 problems presented at the International Congress of Mathematicians in Paris.",
        type: "recognition",
      },
      {
        year: 1989,
        title: "Conrey proves over 40% of zeros lie on the critical line",
        description:
          "Refinement of the Hardy-Littlewood-Selberg approach gave the first proportion exceeding two-fifths.",
        type: "progress",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem ($1 million)",
        type: "recognition",
      },
      {
        year: 2004,
        title:
          "Gourdon verifies the first 10^13 nontrivial zeros computationally",
        description:
          "All lie on the critical line, providing overwhelming numerical evidence.",
        type: "progress",
      },
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
      "The P vs NP problem asks whether the class P of problems solvable in polynomial time equals the class NP of problems whose solutions can be verified in polynomial time. A resolution either way would have profound consequences: P = NP would imply that every search problem with efficiently checkable solutions is itself efficiently solvable, upending modern cryptography and optimization. The consensus among experts strongly favors P != NP, but three major proof barriers -- relativization (Baker-Gill-Solovay, 1975), natural proofs (Razborov-Rudich, 1994), and algebrization (Aaronson-Wigderson, 2008) -- show that any valid proof must use fundamentally new techniques.",
    vizComponent: "PvsNPViz",
    collections: ["canonical"],
    coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 7,
      importance: 10,
      activity: 10,
      accessibility: 8,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Complexity theory", "Cryptography", "Optimization"],
    formulas: [
      {
        label: "Class P",
        latex:
          "\\mathsf{P} = \\bigl\\{\\, L \\subseteq \\{0,1\\}^{*} \\mid \\exists\;\\text{det. TM } M,\; \\exists\\, k :\; x \\in L \\Leftrightarrow M(x)=1 \\text{ in } O(|x|^{k}) \\text{ steps}\\,\\bigr\\}",
        description:
          "The class of decision problems solvable by a deterministic Turing machine in time polynomial in the input size.",
      },
      {
        label: "Class NP",
        latex:
          "\\mathsf{NP} = \\bigl\\{\\, L \\subseteq \\{0,1\\}^{*} \\mid \\exists\;\\text{poly-time } V,\; \\exists\\, k :\; x \\in L \\Leftrightarrow \\exists\\, c \\in \\{0,1\\}^{|x|^{k}},\; V(x,c)=1 \\,\\bigr\\}",
        description:
          "The class of decision problems for which a 'yes' answer has a polynomial-length certificate verifiable in polynomial time.",
      },
      {
        label: "The Millennium Question",
        latex: "\\mathsf{P} \\stackrel{?}{=} \\mathsf{NP}",
        description:
          "Does every language whose membership proofs can be checked quickly also admit a fast decision procedure? The conjecture is that P != NP.",
      },
    ],
    authors: [
      {
        name: "Stephen Cook",
        institution: "University of Toronto",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Stephen_Cook",
      },
      {
        name: "Leonid Levin",
        institution: "Boston University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Leonid_Levin",
      },
      {
        name: "Richard Karp",
        institution: "University of California, Berkeley",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Richard_M._Karp",
      },
    ],
    papers: [
      {
        title: "The Complexity of Theorem-Proving Procedures",
        url: "https://doi.org/10.1145/800157.805047",
        year: 1971,
      },
      {
        title: "Reducibility Among Combinatorial Problems",
        url: "https://doi.org/10.1007/978-1-4684-2001-2_9",
        year: 1972,
      },
      {
        title: "Natural Proofs",
        url: "https://doi.org/10.1006/jcss.1997.1494",
        year: 1997,
      },
    ],
    timeline: [
      {
        year: 1956,
        title: "Godel's letter to von Neumann anticipates P vs NP",
        description:
          "Kurt Godel asked whether theorem-proving could be done in linear or quadratic time, foreshadowing the P vs NP question decades before its formal statement.",
        type: "origin",
      },
      {
        year: 1971,
        title: "Cook proves the Cook-Levin theorem",
        description:
          "Stephen Cook shows that Boolean satisfiability (SAT) is NP-complete, establishing the formal framework at the Third Annual ACM Symposium on Theory of Computing.",
        type: "breakthrough",
      },
      {
        year: 1972,
        title: "Karp identifies 21 NP-complete problems",
        description:
          "Richard Karp demonstrates NP-completeness of 21 combinatorial problems via polynomial-time reductions from SAT, revealing the ubiquity of the class.",
        type: "breakthrough",
      },
      {
        year: 1975,
        title: "Baker-Gill-Solovay relativization barrier",
        description:
          "They prove there exist oracles relative to which P = NP and others where P != NP, showing that any valid proof must be non-relativizing.",
        type: "progress",
      },
      {
        year: 1994,
        title: "Razborov-Rudich natural proofs barrier",
        description:
          "They show that 'natural' combinatorial proof strategies cannot resolve P vs NP under standard cryptographic assumptions. Published in JCSS (1997); awarded the 2007 Godel Prize.",
        type: "progress",
      },
      {
        year: 2000,
        title: "Clay names P vs NP a Millennium Prize Problem",
        description:
          "The Clay Mathematics Institute designates P vs NP as one of seven Millennium Prize Problems, offering $1,000,000 for a proof or disproof.",
        type: "recognition",
      },
    ],
  },
  {
    slug: "navier-stokes",
    title: "Navier-Stokes Existence and Smoothness",
    status: "open",
    field: "analysis",
    year: 1822,
    shortDescription:
      "Asks whether smooth 3D incompressible fluid flows can develop singularities.",
    longDescription:
      "The Navier-Stokes existence and smoothness problem asks whether, in three dimensions, smooth and globally defined solutions to the incompressible Navier-Stokes equations exist for all time given any smooth initial velocity field of finite energy. The equations have governed our understanding of fluid dynamics since the 19th century, yet mathematicians cannot prove that solutions remain smooth or show they develop singularities. Jean Leray proved the existence of weak solutions in 1934, and Caffarelli, Kohn, and Nirenberg established partial regularity in 1982, but the full regularity question in 3D remains wide open. Terence Tao's 2016 work on averaged Navier-Stokes showed that any resolution must exploit the specific nonlinear structure of the equations.",
    vizComponent: "NavierStokesViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 9,
      importance: 10,
      activity: 10,
      accessibility: 5,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["PDE", "Fluid dynamics", "Turbulence"],
    formulas: [
      {
        label: "Momentum equation",
        latex:
          "\\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla)\\mathbf{u} = -\\nabla p + \\nu \\Delta \\mathbf{u} + \\mathbf{f}",
        description:
          "The Navier-Stokes momentum equation for incompressible flow, where u is the velocity field, p is pressure, nu is kinematic viscosity, and f is external forcing.",
      },
      {
        label: "Incompressibility constraint",
        latex: "\\nabla \\cdot \\mathbf{u} = 0",
        description:
          "The divergence-free condition ensuring conservation of mass for incompressible fluids.",
      },
      {
        label: "Millennium Prize question",
        latex:
          "\\exists\; \\mathbf{u} \\in C^{\\infty}(\\mathbb{R}^3 \\times [0,\\infty)) \;\\text{ solving NS for all } t > 0 \;\\text{?}",
        description:
          "Given smooth initial data of finite energy on R^3, do solutions remain smooth and globally defined for all time, or can singularities form in finite time?",
      },
    ],
    authors: [
      {
        name: "Charles Fefferman",
        institution: "Princeton University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Charles_Fefferman",
      },
      {
        name: "Jean Leray",
        institution: "College de France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jean_Leray",
      },
      {
        name: "Terence Tao",
        institution: "UCLA",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Terence_Tao",
      },
    ],
    papers: [
      {
        title: "Sur le mouvement d'un liquide visqueux emplissant l'espace",
        url: "https://doi.org/10.1007/BF02547354",
        year: 1934,
      },
      {
        title:
          "Existence and Smoothness of the Navier-Stokes Equation (CMI problem statement)",
        url: "https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf",
        year: 2000,
      },
      {
        title:
          "Finite time blowup for an averaged three-dimensional Navier-Stokes equation",
        url: "https://doi.org/10.1090/jams/838",
        year: 2016,
      },
    ],
    timeline: [
      {
        year: 1822,
        title: "Navier derives the viscous fluid equations",
        description:
          "Claude-Louis Navier introduces viscosity into the equations of fluid motion, laying the foundation for the modern Navier-Stokes equations.",
        type: "origin",
      },
      {
        year: 1845,
        title: "Stokes completes the modern formulation",
        description:
          "George Gabriel Stokes derives the equations in their current form from continuum mechanics principles.",
        type: "origin",
      },
      {
        year: 1934,
        title: "Leray proves existence of weak solutions",
        description:
          "Jean Leray's landmark Acta Mathematica paper establishes that weak (distributional) solutions exist globally in time, founding the modern mathematical study of the equations.",
        type: "breakthrough",
      },
      {
        year: 1982,
        title: "Caffarelli-Kohn-Nirenberg partial regularity",
        description:
          "They prove that the set of possible singularities of a suitable weak solution has one-dimensional parabolic Hausdorff measure zero, the strongest partial regularity result known.",
        type: "breakthrough",
      },
      {
        year: 2000,
        title: "Clay names it a Millennium Prize Problem",
        description:
          "Charles Fefferman formulates the official problem statement for the Clay Mathematics Institute, with a $1,000,000 prize.",
        type: "recognition",
      },
      {
        year: 2016,
        title: "Tao proves blowup for averaged Navier-Stokes",
        description:
          "Terence Tao constructs solutions to a modified ('averaged') version that blow up in finite time, showing any proof must use the specific nonlinear structure.",
        type: "progress",
      },
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
    formulas: [
      {
        label: "Hodge decomposition",
        latex: "H^{n}(X, \\mathbb{C}) = \\bigoplus_{p+q=n} H^{p,q}(X)",
        description:
          "The cohomology of a smooth projective variety X decomposes into (p,q)-components via the Hodge filtration, reflecting the complex structure.",
      },
      {
        label: "Hodge classes",
        latex: "\\mathrm{Hdg}^{p}(X) = H^{2p}(X,\\mathbb{Q}) \\cap H^{p,p}(X)",
        description:
          "The space of rational (p,p)-classes: these are the cohomology classes the conjecture predicts are algebraic.",
      },
      {
        label: "The Hodge Conjecture",
        latex:
          "\\mathrm{Hdg}^{p}(X) = \\mathbb{Q}\\text{-span of }\\{[Z] : Z \\subset X \\text{ algebraic cycle of codimension } p\\}",
        description:
          "Every Hodge class is a rational linear combination of the fundamental classes of algebraic subvarieties.",
      },
    ],
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
  },
  {
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
    formulas: [
      {
        label: "Rank conjecture",
        latex:
          "\\operatorname{rank} E(\\mathbb{Q}) = \\operatorname{ord}_{s=1} L(E, s)",
        description:
          "The algebraic rank of the group of rational points equals the order of vanishing (analytic rank) of the L-function at s = 1.",
      },
      {
        label: "L-function (Euler product)",
        latex:
          "L(E, s) = \\prod_{p \\nmid N} \\frac{1}{1 - a_p\\, p^{-s} + p^{1-2s}} \\prod_{p \\mid N} \\frac{1}{1 - a_p\\, p^{-s}}",
        description:
          "The Hasse-Weil L-function of E, defined as an Euler product over primes p, where a_p = p + 1 - #E(F_p) and N is the conductor.",
      },
      {
        label: "Leading coefficient formula",
        latex:
          "\\lim_{s \\to 1} \\frac{L(E,s)}{(s-1)^r} = \\frac{\\#\\text{\\Sha}(E) \\cdot \\Omega_E \\cdot R_E \\cdot \\prod c_p}{(\\# E(\\mathbb{Q})_{\\mathrm{tor}})^2}",
        description:
          "The refined BSD formula: the leading coefficient involves the order of the Tate-Shafarevich group Sha, the real period, the regulator, Tamagawa numbers, and the torsion subgroup.",
      },
    ],
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
  },
  {
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
    formulas: [
      {
        label: "Yang-Mills Lagrangian",
        latex:
          "\\mathcal{L}_{\\mathrm{YM}} = -\\frac{1}{4} F_{\\mu\\nu}^a F^{a\\mu\\nu}, \\quad F_{\\mu\\nu}^a = \\partial_\\mu A_\\nu^a - \\partial_\\nu A_\\mu^a + g f^{abc} A_\\mu^b A_\\nu^c",
        description:
          "The Yang-Mills Lagrangian density, where F is the field strength tensor, A is the gauge potential, g is the coupling constant, and f^{abc} are the structure constants of the gauge group.",
      },
      {
        label: "Yang-Mills field equations",
        latex:
          "D_\\mu F^{\\mu\\nu} = \\partial_\\mu F^{\\mu\\nu} + g [A_\\mu, F^{\\mu\\nu}] = 0",
        description:
          "The classical Yang-Mills equations of motion: the gauge-covariant divergence of the field strength vanishes in vacuum.",
      },
      {
        label: "Mass gap condition",
        latex:
          "\\Delta = \\inf\\{\\, m > 0 : m \\in \\mathrm{spectrum}(H) \\setminus \\{0\\} \\,\\} > 0",
        description:
          "The mass gap: the lowest energy state above the vacuum has strictly positive mass. This must be proved to exist in the quantum theory.",
      },
    ],
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
      "The Collatz conjecture, also known as the 3n+1 problem or the Syracuse problem, states that iterating the map T(n) = n/2 for even n and T(n) = 3n+1 for odd n will eventually reach the cycle 4 -> 2 -> 1 starting from any positive integer. Despite its elementary statement, Paul Erdos remarked that 'mathematics may not be ready for such problems.' In 2019, Terence Tao proved the strongest partial result to date: almost all orbits (in the sense of logarithmic density) attain almost bounded values. The conjecture has been computationally verified for all integers up to roughly 2.95 * 10^20.",
    vizComponent: "CollatzViz",
    collections: ["beautiful"],
    coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 9,
      importance: 6,
      activity: 8,
      accessibility: 10,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Iteration", "Dynamical systems", "Number theory"],
    authors: [
      {
        name: "Lothar Collatz",
        institution: "University of Hamburg",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Lothar_Collatz",
      },
      {
        name: "Terence Tao",
        institution: "UCLA",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Terence_Tao",
      },
      {
        name: "Jeffrey Lagarias",
        institution: "University of Michigan",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Jeffrey_Lagarias",
      },
    ],
    papers: [
      {
        title:
          "Almost all orbits of the Collatz map attain almost bounded values",
        arxivId: "1909.03562",
        url: "https://arxiv.org/abs/1909.03562",
        year: 2019,
      },
      {
        title: "The 3x + 1 problem and its generalizations",
        url: "https://doi.org/10.1080/00029890.1985.11971528",
        year: 1985,
      },
      {
        title: "The Ultimate Challenge: The 3x+1 Problem",
        url: "https://bookstore.ams.org/mbk-78",
        year: 2010,
      },
    ],
    timeline: [
      {
        year: 1937,
        title: "Collatz circulates the problem",
        description:
          "Lothar Collatz, two years after his doctorate from the University of Berlin, begins sharing the iteration puzzle informally.",
        type: "origin",
      },
      {
        year: 1985,
        title: "Lagarias publishes the definitive survey",
        description:
          "His American Mathematical Monthly paper catalogs equivalences, partial results, and generalizations of the 3x+1 problem.",
        type: "progress",
      },
      {
        year: 2019,
        month: "Sep",
        title: "Tao proves an almost-all logarithmic-density result",
        description:
          "Almost all Collatz orbits attain almost bounded values, the strongest partial result known.",
        type: "breakthrough",
      },
      {
        year: 2022,
        title: "Tao's result published in Forum of Mathematics, Pi",
        description:
          "The peer-reviewed version appears as Forum Math. Pi 10:e12.",
        type: "recognition",
      },
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
      "Goldbach's conjecture originated in a June 7, 1742 letter from Christian Goldbach to Leonhard Euler. In its modern form, it asserts that every even integer greater than 2 is the sum of two primes. The weak (ternary) version -- every odd integer greater than 5 is the sum of three primes -- was proved by Harald Helfgott in 2013. Chen Jingrun's 1966 theorem showed every sufficiently large even integer is the sum of a prime and a product of at most two primes. The strong conjecture has been computationally verified for all even integers up to 4 * 10^18 by Oliveira e Silva.",
    vizComponent: "GoldbachViz",
    collections: ["beautiful"],
    coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 8,
      importance: 8,
      activity: 7,
      accessibility: 10,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Primes", "Additive number theory", "Sieve methods"],
    authors: [
      {
        name: "Christian Goldbach",
        institution: "St. Petersburg Academy",
      },
      {
        name: "Harald Helfgott",
        institution: "CNRS / Institut de Mathematiques de Jussieu",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Harald_Helfgott",
      },
      {
        name: "Chen Jingrun",
        institution: "Chinese Academy of Sciences",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Chen_Jingrun",
      },
    ],
    papers: [
      {
        title: "The ternary Goldbach conjecture is true",
        arxivId: "1312.7748",
        url: "https://arxiv.org/abs/1312.7748",
        year: 2013,
      },
      {
        title: "Major arcs for Goldbach's problem",
        arxivId: "1305.2897",
        url: "https://arxiv.org/abs/1305.2897",
        year: 2013,
      },
      {
        title:
          "On the representation of a large even integer as the sum of a prime and the product of at most two primes",
        url: "https://doi.org/10.1007/BF02785357",
        year: 1973,
      },
    ],
    timeline: [
      {
        year: 1742,
        month: "Jun",
        title: "Goldbach writes to Euler proposing the conjecture",
        description:
          "In letter XLIII dated June 7, 1742, Goldbach conjectures that every integer greater than 2 is the sum of three primes. Euler reformulates it into the modern binary form.",
        type: "origin",
      },
      {
        year: 1937,
        title:
          "Vinogradov proves the weak conjecture for sufficiently large odd numbers",
        description:
          "Using the circle method, Vinogradov eliminates the need for GRH but leaves the threshold uncomputed.",
        type: "progress",
      },
      {
        year: 1966,
        title: "Chen Jingrun proves his landmark sieve result",
        description:
          "Every sufficiently large even integer is the sum of a prime and a number with at most two prime factors.",
        type: "breakthrough",
      },
      {
        year: 2013,
        month: "May",
        title: "Helfgott proves the weak Goldbach conjecture in full",
        description:
          "Using refined circle method estimates, he shows every odd integer greater than 5 is the sum of three primes, with no 'sufficiently large' qualifier.",
        type: "breakthrough",
      },
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
      "The twin prime conjecture asserts that there are infinitely many primes p such that p + 2 is also prime. In 2013, Yitang Zhang stunned the mathematical world by proving that there are infinitely many pairs of primes differing by at most 70 million, the first finite bound ever established. James Maynard independently improved the bound later that year using a different sieve method, and the collaborative Polymath 8b project subsequently reduced the gap to 246, where it currently stands. The Hardy-Littlewood conjecture predicts the precise asymptotic density of twin primes via the twin prime constant C_2 = 0.6601...",
    vizComponent: "TwinPrimeViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 9,
      beauty: 8,
      visual: 8,
      importance: 8,
      activity: 9,
      accessibility: 9,
    },
    consensusStatus: "active",
    lastReviewed: "2026-04",
    connections: ["Prime gaps", "Sieve methods", "Additive combinatorics"],
    authors: [
      {
        name: "Yitang Zhang",
        institution: "University of New Hampshire",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Yitang_Zhang",
      },
      {
        name: "James Maynard",
        institution: "University of Oxford",
        wikipediaUrl:
          "https://en.wikipedia.org/wiki/James_Maynard_(mathematician)",
      },
      {
        name: "Alphonse de Polignac",
        institution: "France",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Alphonse_de_Polignac",
      },
    ],
    papers: [
      {
        title: "Bounded gaps between primes",
        arxivId: "1305.4726",
        url: "https://doi.org/10.4007/annals.2014.179.3.7",
        year: 2014,
      },
      {
        title: "Small gaps between primes",
        url: "https://doi.org/10.4007/annals.2015.181.1.7",
        year: 2015,
      },
      {
        title:
          "Variants of the Selberg sieve, and bounded intervals containing many primes",
        arxivId: "1407.4897",
        url: "https://arxiv.org/abs/1407.4897",
        year: 2014,
      },
    ],
    timeline: [
      {
        year: 1849,
        title: "Polignac proposes a broad prime gaps conjecture",
        description:
          "He conjectures that for every even k, there are infinitely many consecutive prime pairs differing by k.",
        type: "origin",
      },
      {
        year: 1915,
        title: "Brun proves the sum of reciprocals of twin primes converges",
        description:
          "Brun's theorem shows that even if twin primes are infinite, they are sparse enough for their reciprocal series to converge (Brun's constant ~ 1.902).",
        type: "progress",
      },
      {
        year: 2013,
        month: "Apr",
        title: "Zhang proves bounded gaps between primes (gap < 70 million)",
        description:
          "Yitang Zhang, a lecturer at the University of New Hampshire, establishes the first finite bound on prime gaps.",
        type: "breakthrough",
      },
      {
        year: 2013,
        month: "Nov",
        title: "Maynard independently improves the bound using a new sieve",
        description:
          "James Maynard at Oxford obtains a simpler proof with a much smaller gap bound. He later receives the 2022 Fields Medal.",
        type: "breakthrough",
      },
      {
        year: 2014,
        title: "Polymath 8b reduces the bound to 246",
        description:
          "The collaborative Polymath project, combining Zhang's and Maynard's techniques, achieves the current best bound of H = 246.",
        type: "progress",
      },
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
      "The abc conjecture, formulated independently by Joseph Oesterle and David Masser in 1985, states that for coprime positive integers with a + b = c, the value of c is almost always bounded by a power of the radical rad(abc) -- the product of distinct prime factors of abc. Despite its compact statement, it implies Fermat's Last Theorem for sufficiently large exponents, the Mordell conjecture, and many other deep results. In August 2012, Shinichi Mochizuki of Kyoto University released a claimed proof via inter-universal Teichmuller theory; however, after Peter Scholze and Jakob Stix identified a disputed step in 2018, the mathematical community remains unconvinced.",
    vizComponent: "AbcViz",
    collections: ["canonical", "unification"],
    coordinates: {
      difficulty: 10,
      beauty: 8,
      visual: 5,
      importance: 9,
      activity: 8,
      accessibility: 4,
    },
    consensusStatus: "watch",
    lastReviewed: "2026-04",
    connections: ["Diophantine equations", "Elliptic curves", "Number theory"],
    authors: [
      {
        name: "Joseph Oesterle",
        institution: "Universite Pierre et Marie Curie",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Joseph_Oesterl%C3%A9",
      },
      {
        name: "David Masser",
        institution: "University of Basel",
        wikipediaUrl: "https://en.wikipedia.org/wiki/David_Masser",
      },
      {
        name: "Shinichi Mochizuki",
        institution: "Kyoto University (RIMS)",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Shinichi_Mochizuki",
      },
    ],
    papers: [
      {
        title: "ABC implies Mordell",
        url: "https://doi.org/10.1007/BF01389043",
        year: 1988,
      },
      {
        title:
          "Inter-universal Teichmuller Theory I: Construction of Hodge Theaters",
        url: "https://doi.org/10.4171/PRIMS/57-1-1",
        year: 2021,
      },
      {
        title: "Why abc is still a conjecture (Scholze-Stix report)",
        url: "https://www.math.uni-bonn.de/people/scholze/WhyABCisStillaConjecture.pdf",
        year: 2018,
      },
    ],
    timeline: [
      {
        year: 1985,
        title: "Oesterle and Masser formulate the abc conjecture",
        description:
          "Arising from discussions about the Szpiro conjecture on elliptic curves, they propose a bound on c in terms of rad(abc).",
        type: "origin",
      },
      {
        year: 1988,
        title: "Elkies proves abc implies Mordell (Faltings' theorem)",
        description:
          "Demonstrates the sweeping power of abc: it would give a new proof that curves of genus >= 2 have finitely many rational points.",
        type: "progress",
      },
      {
        year: 2012,
        month: "Aug",
        title: "Mochizuki releases four IUT preprints claiming a proof",
        description:
          "Shinichi Mochizuki at RIMS, Kyoto posts ~500 pages of inter-universal Teichmuller theory.",
        type: "progress",
      },
      {
        year: 2018,
        title: "Scholze and Stix identify a disputed step in Corollary 3.12",
        description:
          "Peter Scholze (Bonn) and Jakob Stix (Frankfurt) publish a report arguing the proof has a gap that Mochizuki has not resolved.",
        type: "progress",
      },
      {
        year: 2021,
        month: "Mar",
        title: "IUT papers published in PRIMS despite ongoing dispute",
        description:
          "Publications of RIMS publishes the papers, but broad mathematical consensus remains that the proof is incomplete.",
        type: "recognition",
      },
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
      "The Continuum Hypothesis, proposed by Georg Cantor in 1878, asks whether 2^aleph_0 = aleph_1 -- that is, whether there exists no cardinality strictly between the countable integers and the uncountable real numbers. It was the first of Hilbert's 23 problems posed in 1900. Godel showed in 1940 that CH is consistent with ZFC (it cannot be disproved), and Paul Cohen showed in 1963 using his revolutionary forcing method that CH is independent of ZFC (it cannot be proved either). Cohen received the Fields Medal in 1966 for this work. The question of whether new axioms should settle CH remains a lively area of research in set theory and the philosophy of mathematics.",
    vizComponent: "ContinuumViz",
    collections: ["canonical"],
    coordinates: {
      difficulty: 9,
      beauty: 9,
      visual: 6,
      importance: 9,
      activity: 7,
      accessibility: 5,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: ["Set theory", "Forcing", "Infinity"],
    authors: [
      {
        name: "Georg Cantor",
        institution: "University of Halle",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Georg_Cantor",
      },
      {
        name: "Kurt Godel",
        institution: "Institute for Advanced Study",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Kurt_G%C3%B6del",
      },
      {
        name: "Paul Cohen",
        institution: "Stanford University",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Paul_Cohen",
      },
    ],
    papers: [
      {
        title: "The Independence of the Continuum Hypothesis",
        url: "https://www.pnas.org/doi/10.1073/pnas.50.6.1143",
        year: 1963,
      },
      {
        title: "The Consistency of the Continuum Hypothesis",
        url: "https://press.princeton.edu/books/paperback/9780691079271/the-consistency-of-the-continuum-hypothesis",
        year: 1940,
      },
      {
        title: "Set Theory and the Continuum Hypothesis",
        url: "https://store.doverpublications.com/products/9780486469218",
        year: 1966,
      },
    ],
    timeline: [
      {
        year: 1878,
        title: "Cantor formulates the continuum problem",
        description:
          "In 'Ein Beitrag zur Mannigfaltigkeitslehre,' Cantor conjectures there is no infinite cardinality between the integers and the reals.",
        type: "origin",
      },
      {
        year: 1900,
        title: "Hilbert lists it as Problem 1",
        description:
          "At the International Congress of Mathematicians in Paris, Hilbert places the continuum problem first among 23 challenges for the new century.",
        type: "recognition",
      },
      {
        year: 1940,
        title: "Godel proves CH is consistent with ZFC",
        description:
          "Working at the Institute for Advanced Study, Godel constructs the constructible universe L to show CH cannot be disproved from ZFC.",
        type: "progress",
      },
      {
        year: 1963,
        title: "Cohen proves CH is independent of ZFC using forcing",
        description:
          "Paul Cohen at Stanford invents the method of forcing to show CH cannot be proved from ZFC either, completing the independence result.",
        type: "breakthrough",
      },
      {
        year: 1966,
        title: "Cohen receives the Fields Medal",
        description:
          "Awarded for his proof of the independence of the continuum hypothesis and the axiom of choice from ZFC.",
        type: "recognition",
      },
    ],
  },
  {
    slug: "poincare-conjecture",
    title: "Poincaré Conjecture",
    status: "proved",
    field: "topology",
    year: 2003,
    shortDescription:
      "Every simply connected closed 3-manifold is homeomorphic to the 3-sphere.",
    longDescription:
      "Can a blob of clay with no holes always be reshaped into a perfect sphere? The Poincaré conjecture asserts that every closed, simply connected 3-manifold is homeomorphic to S³. Perelman proved this in 2002–2003 using Hamilton's Ricci flow, an equation that deforms geometry toward uniform curvature while performing topological surgery at singularities. The proof also settled Thurston's geometrization conjecture, completing the classification of compact 3-manifolds.",
    vizComponent: "PoincareViz",
    collections: ["canonical", "beautiful"],
    coordinates: {
      difficulty: 10,
      beauty: 10,
      visual: 8,
      importance: 10,
      activity: 7,
      accessibility: 5,
    },
    consensusStatus: "settled",
    lastReviewed: "2026-04",
    connections: [
      "Ricci flow",
      "Thurston geometrization",
      "3-manifolds",
      "Millennium Prize Problems",
    ],
    authors: [
      {
        name: "Henri Poincaré",
        institution: "University of Paris",
        scholarUrl: scholarSearch("Henri Poincaré Analysis Situs topology"),
      },
      {
        name: "Grigori Perelman",
        institution: "Steklov Mathematical Institute",
        scholarUrl: scholarSearch("Grigori Perelman Ricci flow entropy"),
      },
      {
        name: "Richard S. Hamilton",
        institution: "Cornell University",
        scholarUrl: scholarSearch(
          "Richard Hamilton Ricci flow three-manifolds",
        ),
      },
    ],
    papers: [
      {
        title:
          "The entropy formula for the Ricci flow and its geometric applications",
        arxivId: "math/0211159",
        url: "https://arxiv.org/abs/math/0211159",
        year: 2002,
      },
      {
        title: "Three-manifolds with positive Ricci curvature",
        url: "https://doi.org/10.4310/jdg/1214436922",
        year: 1982,
      },
      {
        title: "Ricci flow with surgery on three-manifolds",
        arxivId: "math/0303109",
        url: "https://arxiv.org/abs/math/0303109",
        year: 2003,
      },
    ],
    timeline: [
      {
        year: 1904,
        title:
          "Poincaré poses the conjecture in the fifth supplement to Analysis Situs",
        type: "origin",
      },
      {
        year: 1961,
        title:
          "Smale proves the generalised Poincaré conjecture for dimensions n ≥ 5",
        type: "progress",
      },
      {
        year: 1982,
        title:
          "Freedman proves the 4-dimensional case; Hamilton introduces Ricci flow",
        type: "progress",
      },
      {
        year: 2002,
        title: "Perelman posts entropy formula for Ricci flow on arXiv",
        type: "breakthrough",
      },
      {
        year: 2003,
        title: "Perelman completes the proof via Ricci flow with surgery",
        type: "breakthrough",
      },
      {
        year: 2010,
        title: "Clay Millennium Prize awarded and declined by Perelman",
        type: "recognition",
      },
    ],
  },
];

const coreFormula = (
  latex: string,
  description: string,
  label = "Core question",
): ProblemFormula[] => [{ label, latex, description }];

const coreFormulas: Record<string, ProblemFormula[]> = {
  "abc-secret-verification": [
    {
      label: "abc inequality",
      latex: String.raw`a+b=c,\;\gcd(a,b)=1\quad\Longrightarrow\quad c \le C_\varepsilon\,\operatorname{rad}(abc)^{1+\varepsilon}`,
      description:
        "For every ε > 0, only finitely many coprime triples violate this bound — the conjecture at the heart of the verification effort.",
    },
    {
      label: "Radical",
      latex: String.raw`\operatorname{rad}(n)=\prod_{p\mid n}p`,
      description:
        "The product of distinct prime factors of n, stripping all multiplicity. Small rad(abc) relative to c is the 'surprise' abc measures.",
    },
    {
      label: "Szpiro-type bound (IUT claim)",
      latex: String.raw`\log|q_E| \le (1+\varepsilon)\bigl(6\,\ell\,\log(\theta) + c_1\bigr)`,
      description:
        "Mochizuki's inter-universal Teichmüller theory claims to establish abc through this discriminant bound on elliptic curves.",
    },
  ],
  "faltings-abel-prize-2026": [
    {
      label: "Mordell conjecture (Faltings 1983)",
      latex: String.raw`g(C)\ge 2,\; C/\mathbb{Q}\quad\Longrightarrow\quad |C(\mathbb{Q})|<\infty`,
      description:
        "A smooth projective curve of genus ≥ 2 over Q has only finitely many rational points.",
    },
    {
      label: "Faltings height bound",
      latex: String.raw`h_F(A)\le c(g,d,S)`,
      description:
        "Faltings bounded the height of abelian varieties with good reduction outside S, proving the Shafarevich and Tate conjectures.",
    },
    {
      label: "Tate conjecture for abelian varieties",
      latex: String.raw`\operatorname{Hom}(A,B)\otimes\mathbb{Z}_\ell \xrightarrow{\;\sim\;} \operatorname{Hom}_{G_K}(T_\ell A,\, T_\ell B)`,
      description:
        "The ℓ-adic Tate module functor is fully faithful — proved by Faltings as a key step toward Mordell.",
    },
  ],
  "kakeya-2d": [
    {
      label: "Kakeya conjecture (2D, proved)",
      latex: String.raw`K\subset\mathbb{R}^2,\; K\text{ contains a unit segment in every direction}\quad\Longrightarrow\quad \dim_H K=2`,
      description:
        "A Besicovitch set in the plane has full Hausdorff dimension — proved by Davies in 1971.",
    },
    {
      label: "Besicovitch construction",
      latex: String.raw`\forall\,\varepsilon>0,\;\exists\, K\subset\mathbb{R}^2:\;|K|<\varepsilon,\; K\text{ contains a unit segment in every direction}`,
      description:
        "Besicovitch (1919) showed Kakeya sets can have arbitrarily small Lebesgue measure, despite containing all directions.",
    },
    {
      label: "Maximal function bound",
      latex: String.raw`\|f^*_\delta\|_{L^n(\mathbb{R}^n)}\le C_\varepsilon\,\delta^{-\varepsilon}\|f\|_{L^n}`,
      description:
        "The Kakeya maximal conjecture: the directional maximal function has only logarithmic blow-up; implies full dimension.",
    },
  ],
  "kakeya-3d": [
    {
      label: "Kakeya conjecture (3D)",
      latex: String.raw`K\subset\mathbb{R}^3,\; K\text{ Besicovitch set}\quad\Longrightarrow\quad \dim_H K=3`,
      description:
        "In three dimensions the Kakeya conjecture remains open — it implies key estimates in harmonic analysis and PDE.",
    },
    {
      label: "Wang–Zahl breakthrough (2025)",
      latex: String.raw`\dim_H K \ge 3 - \frac{1}{4} + \eta\quad\text{for some }\eta > 0`,
      description:
        "Wang and Zahl proved the first bound exceeding 5/2 + 1/4, breaking a longstanding barrier using refined polynomial methods.",
    },
    {
      label: "Wolff's hairbrush bound",
      latex: String.raw`\dim_H K \ge \tfrac{5}{2}\quad\text{for }K\subset\mathbb{R}^3`,
      description:
        "Wolff (1995) established dim ≥ 5/2 using the hairbrush argument, the first major advance beyond Bourgain's earlier bound.",
    },
  ],
  "four-color-theorem": [
    {
      label: "Theorem",
      latex: String.raw`G\text{ planar}\quad\Longrightarrow\quad \chi(G)\le 4`,
      description:
        "Every planar graph is 4-colorable — equivalently, every map on the plane or sphere can be colored with four colors.",
    },
    {
      label: "Euler's formula",
      latex: String.raw`V - E + F = 2`,
      description:
        "The structural backbone: for any connected planar graph, vertices minus edges plus faces equals 2.",
    },
    {
      label: "Unavoidable configurations",
      latex: String.raw`\forall\,G\text{ planar},\;\exists\, v\in V(G):\;\deg(v)\le 5`,
      description:
        "Every planar graph has a vertex of degree ≤ 5 (from Euler's formula). Appel–Haken's proof uses 1,482 reducible configurations.",
    },
  ],
  "kepler-conjecture": [
    {
      label: "Maximum density",
      latex: String.raw`\delta_{\max}=\frac{\pi}{3\sqrt{2}}=\frac{\pi}{\sqrt{18}}\approx0.74048`,
      description:
        "The densest packing of unit spheres in R³ has this density, achieved by both FCC and HCP arrangements.",
    },
    {
      label: "FCC lattice vectors",
      latex: String.raw`\mathbf{a}_1=\tfrac{a}{2}(0,1,1),\quad \mathbf{a}_2=\tfrac{a}{2}(1,0,1),\quad \mathbf{a}_3=\tfrac{a}{2}(1,1,0)`,
      description:
        "The face-centered cubic lattice is generated by these three basis vectors; each sphere touches 12 neighbors (kissing number).",
    },
    {
      label: "Packing density definition",
      latex: String.raw`\delta=\lim_{r\to\infty}\frac{\operatorname{vol}\bigl(\bigcup_i B_i\cap B(0,r)\bigr)}{\operatorname{vol}\bigl(B(0,r)\bigr)}`,
      description:
        "The density of a sphere packing is the fraction of space covered, taken as a limit over growing regions.",
    },
  ],
  "traveling-salesman-problem": [
    {
      label: "Optimization",
      latex: String.raw`\min_{\pi\in S_n}\sum_{i=1}^{n}d\!\left(v_{\pi_i},v_{\pi_{i+1}}\right),\qquad \pi_{n+1}=\pi_1`,
      description:
        "Find the shortest Hamiltonian cycle visiting all n cities — the canonical NP-hard combinatorial optimization problem.",
    },
    {
      label: "NP-hardness",
      latex: String.raw`\text{TSP-Decision}\in\mathbf{NP}\text{-complete}`,
      description:
        "Deciding whether a tour of cost ≤ k exists is NP-complete; no polynomial-time exact algorithm is known.",
    },
    {
      label: "Christofides–Serdyukov bound",
      latex: String.raw`\text{cost}(T_{\text{CS}})\le \tfrac{3}{2}\,\text{OPT}\quad\text{(metric TSP)}`,
      description:
        "The 1976 algorithm guarantees a tour within 3/2 of optimal for metric instances — unbeaten for nearly 50 years until Karlin et al. (2021).",
    },
  ],
  "aperiodic-monotile": [
    {
      label: "Existence",
      latex: String.raw`\exists\, T:\; T\text{ tiles }\mathbb{R}^2\quad\wedge\quad \nexists\;\text{periodic tiling by }T`,
      description:
        "A single tile (monotile or einstein) that can tile the plane but only aperiodically — proved to exist in 2023.",
    },
    {
      label: "Hat tile parameter family",
      latex: String.raw`\text{Tile}(a,b):\; a,b>0,\; a\ne b\quad\Longrightarrow\quad \text{aperiodic}`,
      description:
        "The Smith–Myers–Kaplan–Goodman-Strauss hat belongs to a continuous family parameterized by two edge lengths.",
    },
    {
      label: "Non-periodicity criterion",
      latex: String.raw`\nexists\;\mathbf{v}\ne\mathbf{0}:\;\mathcal{T}+\mathbf{v}=\mathcal{T}`,
      description:
        "No nonzero translation maps the tiling to itself — the defining property of an aperiodic tiling.",
    },
  ],
  "mandelbrot-local-connectivity": [
    {
      label: "Mandelbrot set",
      latex: String.raw`M=\{c\in\mathbb{C}: \sup_n|z_n|<\infty,\; z_0=0,\; z_{n+1}=z_n^2+c\}`,
      description:
        "The Mandelbrot set is the set of parameters c for which the critical orbit of z² + c remains bounded.",
    },
    {
      label: "MLC conjecture",
      latex: String.raw`M\text{ is locally connected}`,
      description:
        "If true, M has no infinitely fine filaments and the Douady–Hubbard landing theorem extends to all external rays.",
    },
    {
      label: "Density of hyperbolicity (implication)",
      latex: String.raw`\text{MLC}\;\Longrightarrow\;\{c: z^2+c\text{ is hyperbolic}\}\text{ is dense in }\partial M`,
      description:
        "MLC would imply that hyperbolic dynamics is dense in the quadratic family — a central conjecture in holomorphic dynamics.",
    },
  ],
  "square-peg-problem": [
    {
      label: "Conjecture (Toeplitz 1911)",
      latex: String.raw`\gamma:\,S^1\hookrightarrow\mathbb{R}^2\text{ continuous, injective}\;\Longrightarrow\;\exists\,x_1,x_2,x_3,x_4\in\gamma\text{ forming a square}`,
      description:
        "Every Jordan curve in the plane inscribes a square — open in full generality, proved for smooth and piecewise-linear curves.",
    },
    {
      label: "Smooth case (proved)",
      latex: String.raw`\gamma\in C^1\;\Longrightarrow\;\gamma\text{ inscribes a square}`,
      description:
        "For smooth curves the result follows from topological arguments; the difficulty is purely continuous curves with bad local behavior.",
    },
    {
      label: "Inscribed rectangle theorem",
      latex: String.raw`\forall\,\gamma\text{ Jordan curve},\;\exists\text{ inscribed rectangle of every aspect ratio }r\in(0,1]`,
      description:
        "Greene–Lobb (2021) proved every smooth Jordan curve inscribes rectangles of every aspect ratio, using symplectic geometry.",
    },
  ],
  "hadwiger-nelson-problem": [
    {
      label: "Chromatic number of the plane",
      latex: String.raw`5\le \chi(\mathbb{R}^2)\le 7`,
      description:
        "The minimum number of colors needed so no two points at distance 1 share a color lies between 5 and 7.",
    },
    {
      label: "de Grey lower bound (2018)",
      latex: String.raw`\exists\, G\subset\mathbb{R}^2:\;\chi(G)\ge 5,\quad |V(G)|=1581`,
      description:
        "Aubrey de Grey constructed a unit-distance graph on 1,581 vertices requiring 5 colors, breaking the 1950s bound of 4.",
    },
    {
      label: "Hexagonal upper bound",
      latex: String.raw`\chi(\mathbb{R}^2)\le 7\quad\text{(hexagonal 7-coloring with diameter }<1\text{)}`,
      description:
        "Coloring the plane with regular hexagons of diameter slightly less than 1 gives a valid 7-coloring — unimproved since 1950.",
    },
  ],
  "plateau-problem": [
    {
      label: "Minimal surface equation",
      latex: String.raw`\min_{\partial\Sigma=\Gamma}\operatorname{area}(\Sigma)\quad\Longleftrightarrow\quad H=0\text{ on }\Sigma`,
      description:
        "A surface spanning a given boundary wire minimizes area if and only if its mean curvature vanishes everywhere.",
    },
    {
      label: "Mean curvature",
      latex: String.raw`H=\frac{\kappa_1+\kappa_2}{2}=0`,
      description:
        "The average of the two principal curvatures vanishes on a minimal surface — the Euler–Lagrange equation for the area functional.",
    },
    {
      label: "Douglas–Radó existence",
      latex: String.raw`\Gamma\text{ rectifiable Jordan curve in }\mathbb{R}^3\;\Longrightarrow\;\exists\,\Sigma\text{ minimal disk with }\partial\Sigma=\Gamma`,
      description:
        "Douglas (1931) and Radó (1930) independently proved existence of a minimal disk spanning any rectifiable Jordan curve.",
    },
  ],
  "kissing-number-problem": [
    {
      label: "Kissing number",
      latex: String.raw`\tau(n)=\max\{m:\;\exists\,u_1,\dots,u_m\in S^{n-1},\;\langle u_i,u_j\rangle\le\tfrac{1}{2}\;\forall\,i\ne j\}`,
      description:
        "The maximum number of non-overlapping unit spheres that can simultaneously touch one central unit sphere in Rⁿ.",
    },
    {
      label: "Known exact values",
      latex: String.raw`\tau(1)=2,\quad\tau(2)=6,\quad\tau(3)=12,\quad\tau(4)=24,\quad\tau(8)=240,\quad\tau(24)=196\,560`,
      description:
        "Exact values are known only in dimensions 1–4, 8, and 24. The τ(3) = 12 case settled Newton vs. Gregory (1694).",
    },
    {
      label: "Delsarte LP bound",
      latex: String.raw`\tau(n)\le\max\Bigl\{\sum_i f_i: f\ge 0,\;\hat{f}(k)\le 0\;(k\ge 1),\;f(\cos\theta)\le 0\;(\theta<60°)\Bigr\}`,
      description:
        "Linear programming bounds on spherical codes — tight in dimensions 8 and 24, yielding the exact kissing numbers.",
    },
  ],
  "steiner-tree-problem": [
    {
      label: "Steiner minimum tree",
      latex: String.raw`\min_{T\supseteq P}\sum_{e\in T}|e|,\quad T\text{ tree, }P\subset V(T)`,
      description:
        "Find the shortest tree interconnecting a given set of terminal points, allowing additional Steiner points.",
    },
    {
      label: "Steiner ratio",
      latex: String.raw`\rho_2=\frac{\sqrt{3}}{2}\approx 0.866\quad\Longrightarrow\quad \text{SMT}\ge\frac{\sqrt{3}}{2}\,\text{MST}`,
      description:
        "In the Euclidean plane, a Steiner tree is at least √3/2 times the minimum spanning tree length (Gilbert–Pollak, proved 1990s).",
    },
    {
      label: "120° angle property",
      latex: String.raw`\text{At every Steiner point, exactly 3 edges meet at }120°`,
      description:
        "Optimal Steiner points have degree 3 with equal 120° angles — the same geometry as soap film junctions (Plateau's laws).",
    },
  ],
  "isoperimetric-problem": [
    {
      label: "Isoperimetric inequality",
      latex: String.raw`L^2\ge 4\pi A`,
      description:
        "Among all simple closed curves of length L enclosing area A, the circle is the unique maximizer of A for given L.",
    },
    {
      label: "Equality case",
      latex: String.raw`L^2=4\pi A\quad\Longleftrightarrow\quad\gamma\text{ is a circle}`,
      description:
        "Equality holds if and only if the curve is a circle — proved rigorously by Weierstrass via the calculus of variations.",
    },
    {
      label: "Higher-dimensional generalization",
      latex: String.raw`|\partial\Omega|^n\ge n^n\omega_n\,|\Omega|^{n-1},\qquad\omega_n=|B^n|`,
      description:
        "In Rⁿ, among bodies of given volume, the ball has the least surface area. Equality iff Ω is a ball.",
    },
  ],
  "honeycomb-conjecture": [
    {
      label: "Honeycomb inequality",
      latex: String.raw`\frac{P^2}{A}\ge 8\sqrt{3}`,
      description:
        "For any partition of the plane into equal-area cells, the perimeter-to-area ratio is minimized by regular hexagons.",
    },
    {
      label: "Hales' theorem (1999)",
      latex: String.raw`\text{Regular hexagonal tiling minimizes }\sum_i |\partial C_i|\text{ subject to }|C_i|=1`,
      description:
        "Thomas Hales proved that the honeycomb (regular hexagonal lattice) achieves the least-perimeter partition into equal areas.",
    },
    {
      label: "Hexagonal optimality",
      latex: String.raw`A=\frac{3\sqrt{3}}{2}s^2,\quad P=6s\quad\Longrightarrow\quad\frac{P}{\sqrt{A}}=\sqrt{8\sqrt{3}}`,
      description:
        "The regular hexagon with side s achieves the exact lower bound — nature exploits this in honeycombs and basalt columns.",
    },
  ],
  "brouwer-fixed-point": [
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
  ],
  "borsuk-ulam-theorem": [
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
  ],
  "ham-sandwich-theorem": [
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
  ],
  "hairy-ball-theorem": [
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
  ],
  "gauss-circle-problem": [
    {
      label: "Lattice point count",
      latex: String.raw`N(R)=\#\{(m,n)\in\mathbb{Z}^2: m^2+n^2\le R^2\}=\pi R^2+E(R)`,
      description:
        "Count lattice points inside a circle of radius R; the error E(R) is the central object of study.",
    },
    {
      label: "Hardy conjecture",
      latex: String.raw`E(R)=O\bigl(R^{1/2+\varepsilon}\bigr)\quad\forall\,\varepsilon>0`,
      description:
        "Hardy and Landau conjectured the optimal error exponent is 1/2 — the trivial bound is O(R) and the best known is 131/208.",
    },
    {
      label: "Best known bound (Huxley 2000)",
      latex: String.raw`E(R)=O\bigl(R^{131/208}\bigr),\qquad \tfrac{131}{208}\approx 0.6298`,
      description:
        "Huxley's exponential-sum estimate gives the best unconditional bound, still far from the conjectured exponent 1/2.",
    },
  ],
  "moving-sofa-problem": [
    {
      label: "Moving sofa constant",
      latex: String.raw`\mu=\sup\{\operatorname{area}(S): S\text{ can navigate a unit-width right-angle hallway}\}`,
      description:
        "The supremum of areas among all rigid shapes that can be moved continuously around a 90° corner in a hallway of width 1.",
    },
    {
      label: "Gerver's sofa area",
      latex: String.raw`|G|=2.2195316\ldots=\frac{\pi}{2}+\frac{2}{\pi}`,
      description:
        "Gerver's 1992 construction achieves this area, long conjectured optimal. Baek (2024) claims to have proved μ = |G|.",
    },
    {
      label: "Hammersley bound",
      latex: String.raw`\mu\le 2\sqrt{2}\approx 2.8284`,
      description:
        "The best known upper bound, established by Hammersley (1968) via a simple geometric argument.",
    },
  ],
  "moser-worm-problem": [
    {
      label: "Universal cover",
      latex: String.raw`\min\{|C|:\;C\text{ convex},\;\forall\,\gamma\text{ with }\operatorname{len}(\gamma)=1,\;\exists\,\text{rigid motion placing }\gamma\subset C\}`,
      description:
        "Find the convex region of smallest area that can contain a congruent copy of every plane curve of unit length.",
    },
    {
      label: "Known bounds",
      latex: String.raw`0.2194\le A^*\le 0.2604`,
      description:
        "The optimal area lies between Khandhawit–Pagonakis (2014) lower and Norwood–Poole (2003) upper bounds — still a wide gap.",
    },
    {
      label: "Semicircular cover",
      latex: String.raw`A_{\text{semicircle}}=\frac{\pi}{8}\approx 0.3927`,
      description:
        "A semicircle of diameter 1 is a valid universal cover — far from optimal but a natural starting point; trimming corners improves it.",
    },
  ],
  "illumination-problem": [
    {
      label: "Illumination number",
      latex: String.raw`I(K)=\min\{m:\;\exists\,d_1,\dots,d_m\text{ s.t. every }p\in\partial K\text{ is illuminated by some }d_i\}`,
      description:
        "The fewest directions of light needed so that every boundary point of a convex body K receives light.",
    },
    {
      label: "Boltyanski–Hadwiger conjecture",
      latex: String.raw`I(K)\le 2^n\quad\text{for every convex body }K\subset\mathbb{R}^n,\quad\text{equality iff }K\text{ is a parallelepiped}`,
      description:
        "The conjecture bounds the illumination number by 2ⁿ, with equality for parallelepipeds (cubes, boxes) only.",
    },
    {
      label: "Levi–Hadwiger equivalence",
      latex: String.raw`I(K)=C(K)\quad\text{(covering number: min translates of }\operatorname{int}(K)\text{ covering }K\text{)}`,
      description:
        "The illumination number equals the minimum number of smaller homothetic copies of K needed to cover K.",
    },
  ],
  "geometric-langlands": [
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
  ],
  "hilbert-sixth": [
    {
      label: "Boltzmann equation",
      latex: String.raw`\partial_t f + v\cdot\nabla_x f = Q(f,f)`,
      description:
        "The kinetic equation governing the distribution of particles in a dilute gas — the central bridge in Hilbert's sixth problem.",
    },
    {
      label: "Hydrodynamic limit",
      latex: String.raw`f^\varepsilon \xrightarrow{\varepsilon\to 0} M_{\rho,u,T}\quad\Longrightarrow\quad (\rho,u,T)\text{ solve Euler or Navier–Stokes}`,
      description:
        "In the small mean-free-path limit, the Boltzmann distribution converges to a local Maxwellian whose parameters satisfy fluid equations.",
    },
    {
      label: "Lanford's theorem (1975)",
      latex: String.raw`f_N^{(1)}(t)\to f(t)\quad\text{as }N\to\infty,\quad t < \tfrac{1}{5}t_{\text{mfp}}`,
      description:
        "Rigorous derivation of the Boltzmann equation from Newtonian N-particle dynamics, valid for short times.",
    },
  ],
  "mizohata-takeuchi": [
    {
      label: "Restriction estimate (disproved conjecture)",
      latex: String.raw`\|\widehat{f\,d\sigma}\|_{L^2(\mu)}\le C\,\|\mu\|_{\text{MT}}^{1/2}\,\|f\|_{L^2(\sigma)}`,
      description:
        "The Mizohata–Takeuchi conjecture predicted that a single condition on the measure μ would control Fourier restriction.",
    },
    {
      label: "Mizohata–Takeuchi condition",
      latex: String.raw`\|\mu\|_{\text{MT}} = \sup_{T\text{ tube}} \frac{\mu(T)}{|T|^{1/2}} < \infty`,
      description:
        "The Mizohata–Takeuchi norm measures concentration of μ along thin tubes — necessary but not sufficient for restriction.",
    },
    {
      label: "Counterexample",
      latex: String.raw`\exists\,\mu:\;\|\mu\|_{\text{MT}}<\infty\;\text{ but the restriction estimate fails}`,
      description:
        "Disproved by exhibiting a measure with bounded MT norm but unbounded Fourier restriction — showing the conjecture was too optimistic.",
    },
  ],
  noperthedron: [
    {
      label: "Rupert property",
      latex: String.raw`P\text{ is Rupert}\;\Longleftrightarrow\;\exists\,\text{tunnel through }P\text{ admitting a copy of }P`,
      description:
        "A convex body is Rupert if a congruent copy can pass through a hole cut straight through it.",
    },
    {
      label: "Noperthedron existence",
      latex: String.raw`\exists\,P\text{ convex polytope}:\;P\text{ is not Rupert}`,
      description:
        "Confirmed in 2024: a convex polyhedron exists that cannot pass through itself — settling a question open since Nieuwland's 1950s work.",
    },
    {
      label: "Passage width criterion",
      latex: String.raw`\max_\theta \operatorname{width}(\operatorname{proj}_\theta P) > \min_\theta \operatorname{cross\text{-}section}(P,\theta)`,
      description:
        "Rupert requires a projection direction where the silhouette fits inside some cross-section — the noperthedron violates this.",
    },
  ],
  "alphaevolve-strassen": [
    {
      label: "Strassen's algorithm",
      latex: String.raw`M(2,2,2)=7\quad\bigl(\text{vs.}\ 8\text{ classical}\bigr)`,
      description:
        "Strassen (1969) showed 2×2 matrix multiplication needs only 7 scalar multiplications, launching fast matrix multiplication.",
    },
    {
      label: "AlphaEvolve discovery",
      latex: String.raw`M^{\mathbb{C}}(4,4,4)\le 48\quad\bigl(\text{vs. Strassen's }49\bigr)`,
      description:
        "DeepMind's AlphaEvolve found an algorithm for 4×4 complex matrix multiplication using 48 multiplications, beating 49.",
    },
    {
      label: "Matrix multiplication exponent",
      latex: String.raw`M(n,n,n)=O(n^\omega),\qquad 2\le\omega< 2.372`,
      description:
        "The exponent ω is the infimum such that n×n matrices can be multiplied in O(nω) operations; ω = 2 is conjectured.",
    },
  ],
  "riemann-hypothesis": [
    {
      label: "Hypothesis",
      latex: String.raw`\zeta(s)=0,\ 0<\operatorname{Re}(s)<1\quad\Longrightarrow\quad \operatorname{Re}(s)=\tfrac{1}{2}`,
      description:
        "All nontrivial zeros of the Riemann zeta function should lie on the critical line Re(s) = 1/2.",
    },
    {
      label: "Zeta function (Euler product)",
      latex: String.raw`\zeta(s)=\sum_{n=1}^{\infty}\frac{1}{n^s}=\prod_{p\text{ prime}}\frac{1}{1-p^{-s}},\qquad \operatorname{Re}(s)>1`,
      description:
        "The Euler product connects the zeta function directly to the prime numbers, linking analysis to arithmetic.",
    },
    {
      label: "Prime counting error",
      latex: String.raw`\pi(x)=\operatorname{Li}(x)+O\!\left(\sqrt{x}\,\log x\right)\quad\text{(assuming RH)}`,
      description:
        "If the Riemann Hypothesis is true, the prime counting function pi(x) deviates from the logarithmic integral by at most order sqrt(x) log x.",
    },
  ],
  "p-vs-np": [
    {
      label: "The question",
      latex: String.raw`\mathbf{P}\stackrel{?}{=}\mathbf{NP}`,
      description:
        "Can every problem whose solution is efficiently verifiable also be efficiently solved? The central open question in theoretical CS.",
    },
    {
      label: "Cook–Levin theorem",
      latex: String.raw`\text{SAT}\in\mathbf{NP}\text{-complete}\quad\Longrightarrow\quad \text{SAT}\in\mathbf{P}\;\Leftrightarrow\;\mathbf{P}=\mathbf{NP}`,
      description:
        "Boolean satisfiability is NP-complete: every NP problem reduces to it in polynomial time (Cook 1971, Levin 1973).",
    },
    {
      label: "Consequences",
      latex: String.raw`\mathbf{P}=\mathbf{NP}\;\Longrightarrow\;\text{one-way functions don't exist}\;\Longrightarrow\;\text{public-key cryptography breaks}`,
      description:
        "If P = NP, most modern cryptography collapses — factoring, discrete log, and lattice problems all become easy.",
    },
  ],
  "navier-stokes": [
    {
      label: "Navier–Stokes equations",
      latex: String.raw`\partial_t u+(u\cdot\nabla)u=-\nabla p+\nu\,\Delta u,\qquad \nabla\cdot u=0`,
      description:
        "The fundamental PDE governing viscous incompressible fluid flow: momentum balance coupled with divergence-free constraint.",
    },
    {
      label: "Millennium problem (regularity)",
      latex: String.raw`u_0\in C^\infty(\mathbb{R}^3)\quad\Longrightarrow\quad u(\cdot,t)\in C^\infty(\mathbb{R}^3)\;\forall\,t>0\;?`,
      description:
        "Do smooth initial data always produce globally smooth solutions in 3D, or can singularities form in finite time?",
    },
    {
      label: "Leray weak solutions (1934)",
      latex: String.raw`\exists\,u\in L^\infty(0,\infty;L^2)\cap L^2(0,\infty;\dot{H}^1):\;\text{weak solution for any }u_0\in L^2`,
      description:
        "Leray proved global weak solutions always exist in 3D — but uniqueness and regularity of these solutions remain open.",
    },
  ],
  "hodge-conjecture": [
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
  ],
  "birch-swinnerton-dyer": [
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
  ],
  "yang-mills-mass-gap": [
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
  ],
  "collatz-conjecture": [
    {
      label: "Iteration rule",
      latex: String.raw`T(n)=\begin{cases}n/2 & n\equiv 0\pmod{2}\\3n+1 & n\equiv 1\pmod{2}\end{cases}`,
      description:
        "The Collatz map divides even numbers by 2 and sends odd numbers to 3n+1.",
    },
    {
      label: "Conjecture",
      latex: String.raw`\forall\, n\in\mathbb{Z}^{+},\quad \exists\, k:\; T^{(k)}(n)=1`,
      description:
        "Every positive integer eventually reaches 1 under repeated application of the Collatz map.",
    },
    {
      label: "Tao 2019",
      latex: String.raw`\lim_{N\to\infty}\frac{1}{\log N}\sum_{\substack{n\le N\\\inf T^{(k)}(n)\le f(n)}}\frac{1}{n}=1`,
      description:
        "Almost all orbits (in logarithmic density) attain values below any function f(n) that diverges to infinity.",
    },
  ],
  "goldbach-conjecture": [
    {
      label: "Strong conjecture",
      latex: String.raw`\forall\, n\ge 2,\quad 2n = p + q\qquad (p,q\text{ prime})`,
      description:
        "Every even integer greater than 2 can be written as the sum of two primes.",
    },
    {
      label: "Weak (ternary) conjecture (proved 2013)",
      latex: String.raw`\forall\text{ odd } m > 5,\quad m = p_1 + p_2 + p_3\qquad (p_i\text{ prime})`,
      description:
        "Every odd integer greater than 5 is the sum of three primes. Proved by Helfgott in 2013.",
    },
    {
      label: "Chen's theorem (1966)",
      latex: String.raw`2n = p + q,\quad q\text{ prime or }q = p_1 p_2\quad\text{for all large }n`,
      description:
        "Every sufficiently large even integer is the sum of a prime and a number with at most two prime factors.",
    },
  ],
  "twin-prime-conjecture": [
    {
      label: "Conjecture",
      latex: String.raw`\#\{p \le x : p\text{ and }p+2\text{ both prime}\} = \infty`,
      description:
        "There are infinitely many primes p such that p + 2 is also prime.",
    },
    {
      label: "Hardy-Littlewood asymptotic",
      latex: String.raw`\pi_2(x) \sim 2C_2 \int_2^x \frac{dt}{(\ln t)^2},\qquad C_2 = \prod_{p\ge 3}\left(1-\frac{1}{(p-1)^2}\right) \approx 0.6601`,
      description:
        "The first Hardy-Littlewood conjecture predicts the asymptotic count of twin primes using the twin prime constant.",
    },
    {
      label: "Current best bound (Polymath 8b)",
      latex: String.raw`\liminf_{n\to\infty}(p_{n+1}-p_n) \le 246`,
      description:
        "There are infinitely many pairs of consecutive primes differing by at most 246. Gap 2 (the twin prime case) remains open.",
    },
  ],
  "abc-conjecture": [
    {
      label: "abc inequality",
      latex: String.raw`\gcd(a,b)=1,\; a+b=c \quad\Longrightarrow\quad c \le C_\varepsilon\cdot\operatorname{rad}(abc)^{1+\varepsilon}`,
      description:
        "For every epsilon > 0 there are only finitely many coprime triples (a,b,c) with a+b=c violating this bound.",
    },
    {
      label: "Radical",
      latex: String.raw`\operatorname{rad}(n) = \prod_{p\mid n} p`,
      description:
        "The radical of n is the product of its distinct prime factors, stripping away all repeated factors.",
    },
    {
      label: "Implication for Fermat",
      latex: String.raw`x^n + y^n = z^n,\; n\ge 6 \quad\Longrightarrow\quad \text{no solution (via abc)}`,
      description:
        "The abc conjecture implies Fermat's Last Theorem for all exponents n >= 6, illustrating its sweeping power.",
    },
  ],
  "continuum-hypothesis": [
    {
      label: "Hypothesis",
      latex: String.raw`2^{\aleph_0} = \aleph_1`,
      description:
        "The cardinality of the real numbers (the continuum) equals the first uncountable cardinal -- no intermediate infinity exists.",
    },
    {
      label: "Generalized CH",
      latex: String.raw`2^{\aleph_\alpha} = \aleph_{\alpha+1}\qquad\text{for every ordinal }\alpha`,
      description:
        "The generalized continuum hypothesis extends the statement to all infinite cardinals.",
    },
    {
      label: "Independence (Godel 1940 + Cohen 1963)",
      latex: String.raw`\mathrm{Con}(\mathsf{ZFC})\;\Longrightarrow\;\mathrm{Con}(\mathsf{ZFC}+\mathsf{CH})\;\wedge\;\mathrm{Con}(\mathsf{ZFC}+\neg\mathsf{CH})`,
      description:
        "CH is independent of ZFC: it can be neither proved nor disproved from the standard axioms of set theory.",
    },
  ],
  "poincare-conjecture": [
    {
      label: "Conjecture",
      latex: String.raw`\pi_1(M^3)=0,\; M^3\text{ closed}\quad\Longrightarrow\quad M^3\cong S^3`,
      description:
        "A closed simply connected 3-manifold is homeomorphic to the 3-sphere.",
    },
    {
      label: "Ricci flow",
      latex: String.raw`\frac{\partial g_{ij}}{\partial t}=-2\,R_{ij}`,
      description:
        "Hamilton's evolution equation deforms the metric toward uniform curvature — the engine of Perelman's proof.",
    },
    {
      label: "Geometrization",
      latex: String.raw`M^3\text{ closed, prime}\;\Longrightarrow\;M^3\text{ decomposes into pieces, each admitting one of 8 Thurston geometries}`,
      description:
        "Thurston's conjecture classifies all compact 3-manifolds; proved by Perelman as a corollary.",
    },
  ],
};

const configuredProblemSlugs = new Set(
  configuredProblems.map((problem) => problem.slug),
);

const legacyProblems = rawProblems.filter(
  (problem) => !configuredProblemSlugs.has(problem.slug),
);

export const problems: Problem[] = [...configuredProblems, ...legacyProblems].map((problem) => ({
  ...problem,
  formulas: coreFormulas[problem.slug] ?? problem.formulas,
}));

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export const statusLabel: Record<ProblemStatus, string> = {
  open: "Open",
  proved: "Proved",
  disproved: "Disproved",
  resolved: "Resolved",
  partial: "Partial",
  watch: "Watch",
  award: "Award",
};
export const statusColor: Record<ProblemStatus, string> = {
  open: "border-white/[0.14] text-[var(--gray-400)] bg-white/[0.04]",
  proved: "border-[#3b82f633] text-[#60a5fa] bg-[#3b82f610]",
  disproved: "border-[#ef444433] text-[#f87171] bg-[#ef444410]",
  resolved: "border-[#22c55e33] text-[#86efac] bg-[#22c55e10]",
  partial: "border-[#eab30833] text-[#facc15] bg-[#eab30810]",
  watch: "border-[#f9731633] text-[#fdba74] bg-[#f9731610]",
  award: "border-white/[0.18] text-[var(--gray-100)] bg-white/[0.07]",
};
export const fieldLabel: Record<MathField, string> = {
  analysis: "Analysis",
  algebra: "Algebra",
  geometry: "Geometry",
  "number-theory": "Number Theory",
  topology: "Topology",
  combinatorics: "Combinatorics",
  "mathematical-physics": "Math Physics",
  "computer-science": "Computer Science",
  "ai-math": "AI \u00d7 Math",
  logic: "Logic",
};
