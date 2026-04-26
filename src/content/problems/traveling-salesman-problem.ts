import { defineProblem, scholarSearch } from "@/lib/problem-template";

export const travelingSalesmanProblem = defineProblem({
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
  videos: [
    {
      title: "The Traveling Salesman Problem: When Good Enough Beats Perfect",
      videoId: "GiDsjIBOVoA",
      channel: "Reducible",
    },
    {
      title: "What is the Traveling Salesman Problem?",
      videoId: "1pmBjIZ20pE",
      channel: "TED-Ed",
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
  formulas: [
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
  ]
});

export default travelingSalesmanProblem;
