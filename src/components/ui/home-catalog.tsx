"use client";

import type { Problem } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";

export function HomeCatalog({
  problems,
  zenMode,
}: {
  problems: Problem[];
  zenMode: boolean;
}) {
  return (
    <section aria-label={zenMode ? "Visualization-only catalog" : "Problem catalog"}>
      <div
        id="catalog"
        className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-6"
      >
        {problems.map((problem) => (
          <ProblemCard key={problem.slug} problem={problem} zen={zenMode} />
        ))}
      </div>
    </section>
  );
}
