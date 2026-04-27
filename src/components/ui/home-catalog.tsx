"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { Problem } from "@/lib/problems";
import { statusLabel, statusColor, fieldLabel } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";
import type { ViewMode } from "@/components/ui/home-shell";

type SortKey = "title" | "status" | "field" | "proposed" | "resolved";
type SortDir = "asc" | "desc";

const statusOrder: Record<string, number> = {
  open: 0, partial: 1, watch: 2, award: 3, proved: 4, resolved: 5, disproved: 6,
};

const resolvedStatuses = new Set(["proved", "resolved", "disproved"]);

function getProposedYear(p: Problem): number {
  const origin = p.timeline.find((e) => e.type === "origin");
  return origin?.year ?? p.year;
}

function getResolvedYear(p: Problem): number | null {
  if (!resolvedStatuses.has(p.status)) return null;
  const breakthroughs = p.timeline.filter((e) => e.type === "breakthrough");
  if (breakthroughs.length > 0) return Math.max(...breakthroughs.map((e) => e.year));
  return p.year;
}

function compare(a: Problem, b: Problem, key: SortKey): number {
  switch (key) {
    case "title":
      return a.title.localeCompare(b.title);
    case "status":
      return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
    case "field":
      return (fieldLabel[a.field] ?? "").localeCompare(fieldLabel[b.field] ?? "");
    case "proposed":
      return getProposedYear(a) - getProposedYear(b);
    case "resolved": {
      const ra = getResolvedYear(a) ?? Infinity;
      const rb = getResolvedYear(b) ?? Infinity;
      return ra - rb;
    }
  }
}

function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return <ArrowUpDown aria-hidden="true" className="ml-1 inline-block h-2.5 w-2.5 opacity-30" strokeWidth={2} />;
  }

  const Icon = dir === "asc" ? ArrowUp : ArrowDown;
  return <Icon aria-hidden="true" className="ml-1 inline-block h-2.5 w-2.5" strokeWidth={2} />;
}

export function HomeCatalog({
  problems,
  zenMode,
  viewMode = "grid",
}: {
  problems: Problem[];
  zenMode: boolean;
  viewMode?: ViewMode;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("proposed");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const copy = [...problems];
    copy.sort((a, b) => {
      const c = compare(a, b, sortKey);
      return sortDir === "asc" ? c : -c;
    });
    return copy;
  }, [problems, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "proposed" || key === "resolved" ? "desc" : "asc");
    }
  };

  const thClass =
    "px-4 py-2.5 font-medium cursor-pointer select-none transition-colors hover:text-white";

  if (viewMode === "table" && !zenMode) {
    return (
      <section aria-label="Problem catalog — table view">
        <div id="catalog" className="overflow-x-auto border-b border-[var(--line)]">
          <table className="w-full min-w-[720px] border-collapse font-[var(--font-mono)] text-[11px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-white/[0.02] text-left text-[9px] uppercase text-[var(--gray-500)]">
                <th className={thClass} onClick={() => handleSort("title")}>
                  Title <SortArrow active={sortKey === "title"} dir={sortDir} />
                </th>
                <th className={thClass} onClick={() => handleSort("status")}>
                  Status <SortArrow active={sortKey === "status"} dir={sortDir} />
                </th>
                <th className={thClass} onClick={() => handleSort("field")}>
                  Field <SortArrow active={sortKey === "field"} dir={sortDir} />
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort("proposed")}>
                  Proposed <SortArrow active={sortKey === "proposed"} dir={sortDir} />
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort("resolved")}>
                  Resolved <SortArrow active={sortKey === "resolved"} dir={sortDir} />
                </th>
                <th className="px-4 py-2.5 font-medium">Authors</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((problem) => {
                const proposed = getProposedYear(problem);
                const resolved = getResolvedYear(problem);
                return (
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
                      {proposed}
                    </td>
                    <td className="px-4 py-2.5 text-right text-[var(--gray-400)]">
                      {resolved ?? <span className="text-[var(--gray-700)]">--</span>}
                    </td>
                    <td className="px-4 py-2.5 text-[10px] text-white/[0.52]">
                      {problem.authors
                        .slice(0, 3)
                        .map((a) => a.name.split(" ").pop())
                        .join(", ")}
                    </td>
                  </tr>
                );
              })}
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
