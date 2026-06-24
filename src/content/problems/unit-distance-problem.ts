import { defineProblem } from "@/lib/problem-template";

export const unitDistanceProblem = defineProblem({
  slug: "unit-distance-problem",
  title: "Unit Distance Problem",
  status: "disproved",
  field: "ai-math",
  year: 2026,
  shortDescription:
    "An unnamed OpenAI reasoning model disproved Erdős's 1946 conjecture, building planar point sets with n^(1+δ) unit-distance pairs.",
  longDescription:
    "Let u(n) be the maximum number of pairs at distance exactly 1 among n points in the plane — Erdős Problem #90, first asked in 1946. The square grid achieves n^(1+c/log log n) such pairs, and Erdős conjectured this near-linear count was essentially optimal: u(n) = n^(1+o(1)). The famous upper bound u(n) = O(n^(4/3)) of Spencer, Szemerédi and Trotter (1984) is still the standing ceiling. In May 2026 an internal, unnamed OpenAI general-purpose reasoning model disproved the conjecture by a genuinely new construction: it built point sets from totally real number fields of growing degree (Golod–Shafarevich class field towers in which fixed primes split completely), yielding u(n) ≥ n^(1+δ) for a fixed δ > 0 and infinitely many n — a polynomial improvement over the grid. Nine mathematicians (Alon, Bloom, Gowers, Litt, Sawin, Shankar, Tsimerman, Wang, Matchett Wood) verified the argument and posted a companion paper; Will Sawin then made the exponent explicit at u(n) > n^(1.014), later pushed past n^(1.03). The disproof settles the direction of the conjecture but does not close the wide gap up to the open O(n^(4/3)) bound.",
  vizComponent: "UnitDistanceViz",
  collections: ["frontier", "recent"],
  coordinates: {
    difficulty: 9,
    beauty: 9,
    visual: 8,
    importance: 9,
    activity: 10,
    accessibility: 7,
  },
  consensusStatus: "settled",
  lastReviewed: "2026-05",
  connections: [
    "Hadwiger-Nelson Problem",
    "Szemerédi–Trotter theorem",
    "Distinct distances problem",
    "Incidence geometry",
    "Class field towers",
    "AI for math",
  ],
  authors: [
    {
      name: "OpenAI reasoning model",
      institution: "OpenAI (internal, unnamed model)",
      avatarUrl: "/orgs/openai.jpg",
      homepageUrl:
        "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
    },
    {
      name: "Will Sawin",
      institution: "Princeton University",
      avatarUrl: "/people/sawin.png",
      homepageUrl: "https://williamsawin.com/",
      scholarUrl: "https://scholar.google.com/citations?user=RnVPcI0AAAAJ",
      twitterUrl: "https://x.com/WillSawin",
    },
    {
      name: "Timothy Gowers",
      institution: "Collège de France / University of Cambridge",
      avatarUrl: "/people/gowers.jpg",
      homepageUrl: "https://gowers.wordpress.com/",
      twitterUrl: "https://x.com/wtgowers",
    },
    {
      name: "Thomas F. Bloom",
      institution: "University of Manchester",
      avatarUrl: "/people/bloom.jpg",
      homepageUrl: "https://www.thomasbloom.org/",
      twitterUrl: "https://x.com/thomasfbloom",
    },
    {
      name: "Daniel Litt",
      institution: "University of Toronto",
      avatarUrl: "/people/litt.jpg",
      homepageUrl: "https://www.daniellitt.com/",
      twitterUrl: "https://x.com/littmath",
    },
    {
      name: "Noga Alon",
      institution: "Princeton University",
      avatarUrl: "/people/alon.jpg",
      homepageUrl: "https://www.tau.ac.il/~nogaa/",
    },
    {
      name: "Paul Erdős",
      institution: "Hungarian Academy of Sciences",
      avatarUrl: "/people/erdos.jpg",
      homepageUrl: "https://www.renyi.hu/~p_erdos/",
    },
    {
      name: "Endre Szemerédi",
      institution: "Alfréd Rényi Institute of Mathematics",
      avatarUrl: "/people/szemeredi.jpg",
      homepageUrl: "https://www.renyi.hu/~szemered/",
    },
    {
      name: "Joel Spencer",
      institution: "Courant Institute, NYU",
      avatarUrl: "/people/spencer.jpg",
      homepageUrl: "https://cs.nyu.edu/~spencer/",
    },
  ],
  papers: [
    {
      title: "Planar Point Sets with Many Unit Distances (OpenAI proof)",
      url: "https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-proof.pdf",
      year: 2026,
    },
    {
      title:
        "Remarks on a construction of planar point sets with many unit distances",
      arxivId: "2605.20695",
      url: "https://arxiv.org/abs/2605.20695",
      year: 2026,
    },
    {
      title: "An explicit lower bound for the unit distance problem",
      arxivId: "2605.20579",
      url: "https://arxiv.org/abs/2605.20579",
      year: 2026,
    },
    {
      title: "Erdős Problem #90 — Unit distances",
      url: "https://www.erdosproblems.com/90",
      year: 2026,
    },
  ],
  videos: [
    {
      title: "The Erdős Breakthrough",
      videoId: "Br4l9YjCyRU",
      channel: "OpenAI",
    },
    {
      title: "AI just disproved the biggest math conjecture so far",
      videoId: "PD1N72OJa7U",
      channel: "Dr. Trefor Bazett",
    },
    {
      title:
        "BREAKING NEWS: OpenAI has disproved Erdős' unit-distance conjecture",
      videoId: "WUMgEkaqdKs",
      channel: "Alvaro Lozano-Robledo",
    },
  ],
  timeline: [
    {
      year: 1946,
      title: "Erdős poses the unit distance problem",
      description:
        "Conjectures the square grid is essentially optimal, giving u(n) = n^(1+o(1)).",
      type: "origin",
    },
    {
      year: 1984,
      title: "Spencer, Szemerédi & Trotter prove u(n) = O(n^(4/3))",
      description:
        "The standing upper bound, still the best known ceiling on unit distances.",
      type: "progress",
    },
    {
      year: 2026,
      month: "May",
      title: "An OpenAI model disproves the conjecture",
      description:
        "An internal reasoning model constructs class-field-tower point sets with u(n) ≥ n^(1+δ), refuting the near-linear conjecture.",
      type: "breakthrough",
    },
    {
      year: 2026,
      month: "May",
      title: "Nine mathematicians verify the proof",
      description:
        "Alon, Bloom, Gowers, Litt, Sawin, Shankar, Tsimerman, Wang and Matchett Wood check the argument and post a companion paper.",
      type: "recognition",
    },
    {
      year: 2026,
      month: "May",
      title: "Sawin makes the exponent explicit",
      description:
        "u(n) > n^(1.014), later improved past n^(1.03); Gowers said he would accept the proof in the Annals without hesitation.",
      type: "breakthrough",
    },
  ],
  formulas: [
    {
      label: "Unit distance count",
      latex: String.raw`u(n)=\max_{|P|=n}\#\bigl\{\{p,q\}\subset P:\ \lVert p-q\rVert=1\bigr\}`,
      description:
        "Maximum number of point pairs at exactly distance 1 among n points in the plane.",
    },
    {
      label: "Erdős conjecture (1946, disproved)",
      latex: String.raw`u(n)\le n^{\,1+O(1/\log\log n)}=n^{1+o(1)}`,
      description:
        "Erdős believed the square grid was near-optimal — now known to be false.",
    },
    {
      label: "AI disproof (2026)",
      latex: String.raw`\exists\,\delta>0:\quad u(n)\ge n^{\,1+\delta}\quad(\text{Sawin: }u(n)>n^{1.014})`,
      description:
        "Number-field point sets of growing degree beat the grid by a fixed polynomial factor.",
    },
    {
      label: "Standing upper bound (open)",
      latex: String.raw`u(n)=O\!\left(n^{4/3}\right)\qquad(\text{Spencer–Szemerédi–Trotter, 1984})`,
      description:
        "The gap between n^(1+δ) and n^(4/3) remains the famous open unit-distance problem.",
    },
  ],
});

export default unitDistanceProblem;
