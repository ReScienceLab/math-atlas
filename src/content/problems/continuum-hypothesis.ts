import { defineProblem } from "@/lib/problem-template";

export const continuumHypothesis = defineProblem({
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
  videos: [
    {
      title: "The Infinity Problem that BROKE Mathematics",
      videoId: "Gz6qefUi3Ho",
      channel: "Up and Atom",
    },
    {
      title: "How Big is Infinity?",
      videoId: "WIrdyu9WquQ",
      channel: "Undefined Behavior",
    },
    {
      title: "Mathematician W. Hugh Woodin Explains Continuum Hypothesis",
      videoId: "ZC7wglkBWMM",
      channel: "World Science Festival",
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
  formulas: [
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
  ]
});

export default continuumHypothesis;
