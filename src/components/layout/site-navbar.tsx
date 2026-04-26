"use client";

import { useEffect, useRef, useState } from "react";
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

type OpenDropdown = "status" | "field" | null;

function FilterDropdown({
  label,
  isOpen,
  onToggle,
  activeCount,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  activeCount: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center gap-1 border px-1.5 py-0.5 font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
          isOpen || activeCount > 0
            ? "border-white/25 bg-white/[0.08] text-white"
            : "border-white/[0.08] text-[var(--gray-500)] hover:border-white/20 hover:text-white"
        }`}
      >
        <span>{label}</span>
        {activeCount > 0 && (
          <span className="ml-0.5 border border-white/20 bg-white/10 px-1 text-[7px]">
            {activeCount}
          </span>
        )}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 flex min-w-[140px] flex-col gap-0.5 border border-[var(--line)] bg-[#0a0a0a] p-1.5 shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}

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
  onSearchOpen,
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
  onSearchOpen?: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
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

        {/* Middle: view switcher + filter dropdowns */}
        <div className="flex min-w-0 items-center gap-3 border-r border-[var(--line)] px-4 max-lg:hidden">
          {/* Search button */}
          {onSearchOpen && (
            <button
              type="button"
              onClick={onSearchOpen}
              className="inline-flex items-center gap-2 border border-white/[0.08] px-2 py-1 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)] transition-colors hover:border-white/20 hover:text-white"
              title="Search problems (⌘K)"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Search</span>
              <kbd className="border border-white/[0.1] bg-white/[0.04] px-1 py-px text-[8px] text-[var(--gray-600)]">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Divider after search */}
          {onSearchOpen && onViewModeChange && <div className="h-5 w-px bg-[var(--line)]" />}

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

          {/* Filter dropdowns */}
          {onToggleStatus && (
            <FilterDropdown
              label="Status"
              isOpen={openDropdown === "status"}
              onToggle={() => setOpenDropdown((prev) => (prev === "status" ? null : "status"))}
              activeCount={statusFilters?.size ?? 0}
            >
              {allStatuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onToggleStatus(s)}
                  className={`flex w-full items-center gap-2 px-1.5 py-1 text-left font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
                    statusFilters?.has(s)
                      ? statusColor[s]
                      : "text-[var(--gray-500)] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className={`inline-block h-1.5 w-1.5 shrink-0 border ${statusFilters?.has(s) ? "bg-current opacity-80" : "border-current opacity-40"}`} />
                  {statusLabel[s]}
                </button>
              ))}
            </FilterDropdown>
          )}

          {onToggleField && (
            <FilterDropdown
              label="Field"
              isOpen={openDropdown === "field"}
              onToggle={() => setOpenDropdown((prev) => (prev === "field" ? null : "field"))}
              activeCount={fieldFilters?.size ?? 0}
            >
              {allFields.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onToggleField(f)}
                  className={`flex w-full items-center gap-2 px-1.5 py-1 text-left font-[var(--font-mono)] text-[8px] uppercase transition-colors ${
                    fieldFilters?.has(f)
                      ? "bg-white/[0.08] text-white"
                      : "text-[var(--gray-500)] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className={`inline-block h-1.5 w-1.5 shrink-0 border ${fieldFilters?.has(f) ? "border-white bg-white/60" : "border-current opacity-40"}`} />
                  {fieldLabel[f]}
                </button>
              ))}
            </FilterDropdown>
          )}

          {/* Clear filters */}
          {hasFilters && onClearFilters && (
            <>
              <div className="h-5 w-px bg-[var(--line)]" />
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center border border-white/[0.08] px-1.5 py-0.5 font-[var(--font-mono)] text-[8px] uppercase text-[var(--gray-500)] transition-colors hover:border-white/20 hover:text-white"
              >
                Clear
              </button>
            </>
          )}
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
