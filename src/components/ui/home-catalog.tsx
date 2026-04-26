"use client";

import Link from "next/link";
import type { Problem } from "@/lib/problems";
import { statusLabel, statusColor, fieldLabel } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";
import type { ViewMode } from "@/components/ui/home-shell";

export function HomeCatalog({
  problems,
  zenMode,
  viewMode = "grid",
}: {
  problems: Problem[];
  zenMode: boolean;
  viewMode?: ViewMode;
}) {
  if (viewMode === "table" && !zenMode) {
    return (
      <section aria-label="Problem catalog — table view">
        <div id="catalog" className="border-b border-[var(--line)]">
          <table className="w-full border-collapse font-[var(--font-mono)] text-[11px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-white/[0.02] text-left text-[9px] uppercase text-[var(--gray-500)]">
                <th className="px-4 py-2.5 font-medium">Title</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Field</th>
                <th className="px-4 py-2.5 font-medium text-right">Year</th>
                <th className="px-4 py-2.5 font-medium">Authors</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem.slug}
                  className="border-b border-[var(--line)] bg-[#0b0b0b] transition-colors hover:bg-[#111]"
                >
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/problems/${problem.slug}`}
                      className="text-[12px] font-medium text-white transition-colors hover:text-white/80"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex shrink-0 border px-1 py-px text-[8px] font-medium uppercase ${statusColor[problem.status]}`}
                    >
                      {statusLabel[problem.status]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="border border-[var(--line)] bg-white/[0.025] px-1 py-px text-[8px] text-white/[0.46]">
                      {fieldLabel[problem.field]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-[var(--gray-400)]">
                    {problem.year}
                  </td>
                  <td className="px-4 py-2.5 text-[10px] text-white/[0.52]">
                    {problem.authors
                      .slice(0, 3)
                      .map((a) => a.name.split(" ").pop())
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {problems.length === 0 && (
            <div className="flex items-center justify-center py-16 text-[12px] text-[var(--gray-500)]">
              No problems match the current filters.
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section aria-label={zenMode ? "Visualization-only catalog" : "Problem catalog"}>
      <div
        id="catalog"
        className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-6"
      >
        {problems.map((problem) => (
          <ProblemCard key={problem.slug} problem={problem} zen={zenMode} />
        ))}
        {problems.length === 0 && (
          <div className="col-span-full flex items-center justify-center bg-[#0b0b0b] py-16 text-[12px] text-[var(--gray-500)]">
            No problems match the current filters.
          </div>
        )}
      </div>
    </section>
  );
}
