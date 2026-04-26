"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Problem } from "@/lib/problems";
import { statusLabel, statusColor, fieldLabel } from "@/lib/problems";

function matchScore(problem: Problem, query: string): number {
  const q = query.toLowerCase();
  const title = problem.title.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 90;
  if (title.includes(q)) return 80;

  const desc = problem.shortDescription.toLowerCase();
  if (desc.includes(q)) return 60;

  const field = fieldLabel[problem.field].toLowerCase();
  if (field.includes(q)) return 50;

  for (const a of problem.authors) {
    if (a.name.toLowerCase().includes(q)) return 40;
  }

  for (const c of problem.connections ?? []) {
    if (c.toLowerCase().includes(q)) return 30;
  }

  return 0;
}

export function SearchDialog({
  problems,
  open,
  onClose,
}: {
  problems: Problem[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = query.trim()
    ? problems
        .map((p) => ({ problem: p, score: matchScore(p, query.trim()) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((r) => r.problem)
    : problems.slice(0, 8);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      onClose();
      router.push(`/problems/${slug}`);
    },
    [onClose, router],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex].slug);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, results, activeIndex, navigate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[520px] border border-[var(--line)] bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 text-[var(--gray-500)]"
          >
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems..."
            className="flex-1 bg-transparent font-[var(--font-mono)] text-[13px] text-white placeholder-[var(--gray-600)] outline-none"
          />
          <kbd className="border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 font-[var(--font-mono)] text-[9px] text-[var(--gray-600)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto py-1">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center font-[var(--font-mono)] text-[12px] text-[var(--gray-600)]">
              No results found
            </div>
          ) : (
            results.map((problem, i) => (
              <button
                key={problem.slug}
                type="button"
                onClick={() => navigate(problem.slug)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === activeIndex
                    ? "bg-white/[0.06]"
                    : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[13px] text-white">
                      {problem.title}
                    </span>
                    <span
                      className={`inline-flex shrink-0 border px-1 py-px text-[7px] font-medium uppercase ${statusColor[problem.status]}`}
                    >
                      {statusLabel[problem.status]}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 font-[var(--font-mono)] text-[10px] text-[var(--gray-600)]">
                    <span>{fieldLabel[problem.field]}</span>
                    <span className="text-[var(--gray-800)]">&middot;</span>
                    <span className="truncate">{problem.shortDescription}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
