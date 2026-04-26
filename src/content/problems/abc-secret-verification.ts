import { defineProblem } from "@/lib/problem-template";

export const abcSecretVerification = defineProblem({
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
    formulas: [
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
});

export default abcSecretVerification;
