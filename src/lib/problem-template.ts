import type { Problem } from "@/lib/problem-types";

export function defineProblem<const TProblem extends Problem>(
  problem: TProblem,
): TProblem {
  return problem;
}
