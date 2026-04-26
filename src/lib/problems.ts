import { configuredProblems } from "@/content/problems";
import type { MathField, Problem, ProblemStatus } from "@/lib/problem-types";

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

export const problems: Problem[] = configuredProblems;

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
  "ai-math": "AI × Math",
  logic: "Logic",
};
