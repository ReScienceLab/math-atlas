import type { Problem } from "@/lib/problem-types";

export const scholarSearch = (query: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;

export function defineProblem<const TProblem extends Problem>(
  problem: TProblem,
): TProblem {
  return problem;
}
