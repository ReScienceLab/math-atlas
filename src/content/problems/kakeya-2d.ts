import { defineProblem } from "@/lib/problem-template";

export const kakeya2d = defineProblem({
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
    videos: [
    {
      title: "Kakeya's Needle Problem - Numberphile",
      videoId: "j-dce6QmVAQ",
      channel: "Numberphile",
    },
    {
      title: "The Kakeya needle problem (the squeegee approach)",
      videoId: "IM-n9c-ARHU",
      channel: "Mathologer",
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
    formulas: [
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
      label: "Kakeya maximal conjecture",
      latex: String.raw`f_\delta^*(e)=\sup_a \frac{1}{|T_e^\delta(a)|}\int_{T_e^\delta(a)} |f(x)|\,dx,\quad \|f_\delta^*\|_{L^n(S^{n-1})}\le C_\varepsilon\delta^{-\varepsilon}\|f\|_{L^n(\mathbb{R}^n)}`,
      description:
        "A standard normalized form of the directional maximal estimate; it controls directions on the sphere and implies the Kakeya dimension conjecture.",
    },
  ],
});

export default kakeya2d;
