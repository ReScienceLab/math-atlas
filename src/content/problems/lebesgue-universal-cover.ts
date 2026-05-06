import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const lebesgueUniversalCover = defineProblem({
  slug: "lebesgue-universal-cover",
  title: "Lebesgue's Universal Cover",
  status: "open",
  field: "geometry",
  year: 1914,
  shortDescription:
    "Find the convex set of minimum area that contains a congruent copy of every planar set of diameter 1.",
  longDescription:
    "In a 1914 letter to Gyula Pál, Henri Lebesgue asked for the minimum-area convex subset of the plane that can accommodate, by rigid motion, every planar set of diameter at most 1. Pál's 1920 answer showed a regular hexagon of width 1 (area √3/2 ≈ 0.8660) is sufficient; by trimming two opposite corners he reduced this to ≈ 0.8453. Sprague (1936) improved the upper bound further to ≈ 0.8441, and Baez, Bagdasaryan, and Gibbs (2015) reached 0.8441153 using computer-assisted corner trimming. Gibbs (2018) refined this to ≈ 0.8440936. The best lower bound, 0.832, was proved by Brass and Sharifi (2005) through a computational search over configurations of circles, triangles, and pentagons. Despite over a century of effort the gap of roughly 0.012 between the bounds remains fully open, making this one of the most stubborn unsolved problems in combinatorial geometry.",
  vizComponent: "LebesgueUniversalCoverViz",
  collections: ["beautiful", "frontier"],
  coordinates: {
    difficulty: 7,
    beauty: 9,
    visual: 10,
    importance: 7,
    activity: 5,
    accessibility: 9,
  },
  consensusStatus: "active",
  lastReviewed: "2026-05",
  connections: [
    "Moser's Worm Problem",
    "Borsuk's Problem",
    "Geometric optimization",
    "Packing and covering",
  ],
  authors: [
    {
      name: "Henri Lebesgue",
      institution: "Université de Paris",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Henri_Lebesgue",
      scholarUrl: scholarSearch("Henri Lebesgue universal cover convex"),
    },
    {
      name: "Gyula Pál",
      institution: "University of Copenhagen",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Gyula_Pál",
      scholarUrl: scholarSearch("Gyula Pal universal cover hexagon 1920"),
    },
    {
      name: "Philip Gibbs",
      institution: "University of Reading",
      scholarUrl: scholarSearch("Philip Gibbs universal cover Lebesgue"),
    },
  ],
  papers: [
    {
      title:
        "Über ein minimumproblem für konvexe bereiche (On a minimum problem for convex regions)",
      url: "https://doi.org/10.1007/BF01459793",
      year: 1920,
    },
    {
      title: "Lebesgue's Universal Covering Problem",
      arxivId: "1502.01251",
      url: "https://arxiv.org/abs/1502.01251",
      year: 2015,
    },
    {
      title: "An improved upper bound for Lebesgue's universal covering problem",
      arxivId: "1401.8217",
      url: "https://arxiv.org/abs/1401.8217",
      year: 2014,
    },
  ],
  timeline: [
    {
      year: 1914,
      title: "Lebesgue poses the problem to Pál",
      description:
        "In a letter, Henri Lebesgue asks for the convex set of smallest area that can cover, by rigid motion, every planar set of diameter 1.",
      type: "origin",
    },
    {
      year: 1920,
      title: "Pál proves the hexagon works and trims two corners",
      description:
        "Gyula Pál shows a regular hexagon of width 1 (area √3/2 ≈ 0.8660) is sufficient, then removes two opposite triangular corners to reach ≈ 0.8453.",
      type: "breakthrough",
    },
    {
      year: 1936,
      title: "Sprague trims additional corner regions",
      description:
        "Roland Sprague identifies further removable sliver regions near the corners, improving the upper bound to ≈ 0.8441.",
      type: "progress",
    },
    {
      year: 2005,
      title: "Brass and Sharifi prove lower bound 0.832",
      description:
        "A computational search over configurations of circles, equilateral triangles, and regular pentagons shows no universal cover can have area below 0.832.",
      type: "progress",
    },
    {
      year: 2015,
      title: "Baez, Bagdasaryan, and Gibbs reach 0.8441153",
      description:
        "Computer-assisted trimming shaves 2.2 × 10⁻⁵ from the upper bound; Gibbs later refines this to ≈ 0.8440936 (2018), the current record.",
      type: "breakthrough",
    },
  ],
  formulas: [
    {
      label: "Universal cover",
      latex: String.raw`\min\bigl\{|C|:\;C\text{ convex},\;\forall S\subset\mathbb{R}^2,\;\operatorname{diam}(S)\le 1\;\Rightarrow\;\exists\text{ rigid motion }f,\;f(S)\subseteq C\bigr\}`,
      description:
        "Find the minimum-area convex set containing a congruent copy of every planar set of diameter ≤ 1.",
    },
    {
      label: "Pál hexagon",
      latex: String.raw`A_{\mathrm{Pál}} = \frac{\sqrt{3}}{2} \approx 0.8660`,
      description:
        "A regular hexagon of width 1 covers all unit-diameter sets; Pál's corner trimming reduces this to ≈ 0.8453.",
    },
    {
      label: "Known bounds",
      latex: String.raw`0.832 \le A^* \le 0.8441153`,
      description:
        "The optimal area lies in this interval after a century of work; the gap of ≈ 0.012 remains open.",
    },
  ],
});
