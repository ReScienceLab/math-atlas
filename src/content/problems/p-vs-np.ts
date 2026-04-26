import { defineProblem } from "@/lib/problem-template";

export const pVsNp = defineProblem({
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
  videos: [
    {
      title: "P vs. NP and the Computational Complexity Zoo",
      videoId: "YX40hbAHx3s",
      channel: "hackerdashery",
    },
    {
      title: "P vs NP on TV - Computerphile",
      videoId: "dJUEkjxylBw",
      channel: "Computerphile",
    },
    {
      title: "The P vs. NP problem: An Existential Question for Mathematics",
      videoId: "yeFaGFehc44",
      channel: "Clay Mathematics Institute",
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
  formulas: [
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
  ]
});

export default pVsNp;
