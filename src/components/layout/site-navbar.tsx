"use client";

import Link from "next/link";
import type { Problem, ProblemStatus, MathField } from "@/lib/problems";
import { statusLabel, statusColor, fieldLabel } from "@/lib/problems";
import { GitHubSourceLink } from "@/components/layout/github-source-link";
import type { ViewMode } from "@/components/ui/home-shell";

function countByStatus(problems: Problem[], status: Problem["status"]) {
  return problems.filter((problem) => problem.status === status).length;
}

const allStatuses: ProblemStatus[] = ["open", "proved", "disproved", "resolved", "partial", "watch", "award"];
const allFields: MathField[] = [
  "analysis", "algebra", "geometry", "number-theory", "topology",
  "combinatorics", "mathematical-physics", "computer-science", "ai-math", "logic",
];

export function SiteNavbar({
  problems,
  zenMode,
  onZenModeToggle,
  viewMode,
  onViewModeChange,
  statusFilters,
  fieldFilters,
  onToggleStatus,
  onToggleField,
  onClearFilters,
  filteredCount,
}: {
  problems: Problem[];
  zenMode?: boolean;
  onZenModeToggle?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  statusFilters?: Set<ProblemStatus>;
  fieldFilters?: Set<MathField>;
  onToggleStatus?: (s: ProblemStatus) => void;
  onToggleField?: (f: MathField) => void;
  onClearFilters?: () => void;
  filteredCount?: number;
}) {
  const openCount = countByStatus(problems, "open");
  const recentCount = problems.filter((problem) => problem.collections?.includes("recent")).length;
  const fieldCount = new Set(problems.map((problem) => problem.field)).size;
  const hasFilters = (statusFilters?.size ?? 0) > 0 || (fieldFilters?.size ?? 0) > 0;

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line)] bg-black/90 backdrop-blur-md">
      <div className="grid min-h-14 grid-cols-[minmax(160px,0.95fr)_minmax(0,1.4fr)_minmax(316px,0.95fr)] items-stretch max-lg:grid-cols-[minmax(160px,1fr)_auto]">
        {/* Left: logo + zen */}
        <div className="flex items-center gap-3 border-r border-[var(--line)] px-4 sm:px-5">
          <Link
            href="/"
            className="font-[var(--font-mono)] text-[14px] font-semibold uppercase leading-none text-[var(--fg)] transition-colors hover:text-white"
            aria-label="Math Atlas home"
          >
            Math Atlas
          </Link>
          {onZenModeToggle && (
            <button
              type="button"
              aria-pressed={zenMode}
              className={`inline-flex items-center gap-1.5 border px-1.5 py-1 font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
                zenMode
                  ? "border-white/25 bg-white/[0.08] text-white"
                  : "border-white/[0.12] bg-white/[0.025] text-white/[0.58] hover:border-white/25 hover:bg-white/[0.045] hover:text-white"
              }`}
              onClick={onZenModeToggle}
              title={zenMode ? "Zen mode on. Press Z to exit." : "Press Z for Zen mode."}
            >
              <span className="border border-white/[0.16] bg-black/40 px-1 py-px text-white">
                Z
              </span>
              <span>{zenMode ? "Zen mode" : "Zen"}</span>
            </button>
          )}
        </div>

        {/* Middle: view switcher + filters */}
        <div className="flex min-w-0 items-center gap-4 border-r border-[var(--line)] px-4 max-lg:hidden">
          {/* View switcher */}
          {onViewModeChange && (
            <div className="flex items-center gap-1 font-[var(--font-mono)] text-[10px] uppercase">
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`border px-1.5 py-1 transition-colors ${
                  viewMode === "grid"
                    ? "border-white/25 bg-white/[0.08] text-white"
                    : "border-white/[0.08] text-[var(--gray-500)] hover:border-white/20 hover:text-white"
                }`}
                title="Grid view"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("table")}
                className={`border px-1.5 py-1 transition-colors ${
                  viewMode === "table"
                    ? "border-white/25 bg-white/[0.08] text-white"
                    : "border-white/[0.08] text-[var(--gray-500)] hover:border-white/20 hover:text-white"
                }`}
                title="Table view"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="3" x2="15" y2="3" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="1" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          )}

          {/* Divider */}
          {onViewModeChange && <div className="h-5 w-px bg-[var(--line)]" />}

          {/* Filter pills */}
          <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto scrollbar-none">
            {/* Status filters */}
            {onToggleStatus && allStatuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onToggleStatus(s)}
                className={`inline-flex shrink-0 items-center border px-1.5 py-0.5 font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
                  statusFilters?.has(s)
                    ? statusColor[s]
                    : "border-white/[0.06] text-[var(--gray-600)] hover:border-white/[0.14] hover:text-[var(--gray-400)]"
                }`}
              >
                {statusLabel[s]}
              </button>
            ))}

            {/* Separator between status and field */}
            {onToggleStatus && onToggleField && (
              <div className="mx-0.5 h-3 w-px shrink-0 bg-[var(--line)]" />
            )}

            {/* Field filters */}
            {onToggleField && allFields.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => onToggleField(f)}
                className={`inline-flex shrink-0 items-center border px-1.5 py-0.5 font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
                  fieldFilters?.has(f)
                    ? "border-white/25 bg-white/[0.08] text-white"
                    : "border-white/[0.06] text-[var(--gray-600)] hover:border-white/[0.14] hover:text-[var(--gray-400)]"
                }`}
              >
                {fieldLabel[f]}
              </button>
            ))}

            {/* Clear filters */}
            {hasFilters && onClearFilters && (
              <>
                <div className="mx-0.5 h-3 w-px shrink-0 bg-[var(--line)]" />
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex shrink-0 items-center border border-white/[0.08] px-1.5 py-0.5 font-[var(--font-mono)] text-[8px] uppercase text-[var(--gray-500)] transition-colors hover:border-white/20 hover:text-white"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: stats */}
        <div className="grid grid-cols-[minmax(78px,1fr)_minmax(78px,1fr)_minmax(118px,1.2fr)_56px] divide-x divide-[var(--line)] font-[var(--font-mono)] text-[10px] uppercase max-sm:grid-cols-[56px]">
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">{hasFilters ? "Showing" : "Problems"}</span>
            <span className="mt-0.5 text-[var(--gray-300)]">
              {hasFilters ? `${filteredCount ?? problems.length} / ${problems.length}` : problems.length}
            </span>
          </div>
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Open</span>
            <span className="mt-0.5 text-[var(--gray-300)]">{openCount}</span>
          </div>
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Recent / Fields</span>
            <span className="mt-0.5 text-[var(--gray-300)]">
              {recentCount} / {fieldCount}
            </span>
          </div>
          <GitHubSourceLink className="flex items-center justify-center text-[var(--gray-500)] transition-colors hover:bg-white/[0.025] hover:text-white" />
        </div>
      </div>
    </nav>
  );
}
