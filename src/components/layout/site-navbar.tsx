"use client";

import Link from "next/link";
import type { Problem } from "@/lib/problems";
import { GitHubSourceLink } from "@/components/layout/github-source-link";

function countByStatus(problems: Problem[], status: Problem["status"]) {
  return problems.filter((problem) => problem.status === status).length;
}

export function SiteNavbar({
  problems,
  zenMode,
  onZenModeToggle,
}: {
  problems: Problem[];
  zenMode?: boolean;
  onZenModeToggle?: () => void;
}) {
  const openCount = countByStatus(problems, "open");
  const recentCount = problems.filter((problem) => problem.collections?.includes("recent")).length;
  const fieldCount = new Set(problems.map((problem) => problem.field)).size;

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line)] bg-black/90 backdrop-blur-md">
      <div className="grid min-h-14 grid-cols-[minmax(160px,0.95fr)_minmax(0,1.4fr)_minmax(316px,0.95fr)] items-stretch max-lg:grid-cols-[minmax(160px,1fr)_auto]">
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

        <div className="flex min-w-0 items-center border-r border-[var(--line)] px-4 max-lg:hidden">
          <div className="flex items-center gap-7 font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-500)]">
            <Link href="/" className="transition-colors hover:text-white">
              Index
            </Link>
            <a href="#catalog" className="transition-colors hover:text-white">
              Problems
            </a>
            <a href="#footer" className="transition-colors hover:text-white">
              Summary
            </a>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(78px,1fr)_minmax(78px,1fr)_minmax(118px,1.2fr)_56px] divide-x divide-[var(--line)] font-[var(--font-mono)] text-[10px] uppercase max-sm:grid-cols-[56px]">
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Problems</span>
            <span className="mt-0.5 text-[var(--gray-300)]">{problems.length}</span>
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
