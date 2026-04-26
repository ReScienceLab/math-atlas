"use client";

import { useEffect, useMemo, useState } from "react";
import type { Problem, ProblemStatus, MathField } from "@/lib/problems";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { HomeCatalog } from "@/components/ui/home-catalog";
import { SearchDialog } from "@/components/ui/search-dialog";

export type ViewMode = "grid" | "table";

function shouldIgnoreShortcut(event: KeyboardEvent) {
  if (
    event.repeat ||
    event.isComposing ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey
  ) {
    return true;
  }

  const target = event.target as HTMLElement | null;
  return Boolean(
    target?.closest("input, textarea, select, [contenteditable='true']"),
  );
}

export function HomeShell({ problems }: { problems: Problem[] }) {
  const [zenMode, setZenMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [statusFilters, setStatusFilters] = useState<Set<ProblemStatus>>(new Set());
  const [fieldFilters, setFieldFilters] = useState<Set<MathField>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      if (statusFilters.size > 0 && !statusFilters.has(p.status)) return false;
      if (fieldFilters.size > 0 && !fieldFilters.has(p.field)) return false;
      return true;
    });
  }, [problems, statusFilters, fieldFilters]);

  const toggleStatus = (s: ProblemStatus) => {
    setStatusFilters((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const toggleField = (f: MathField) => {
    setFieldFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  const clearFilters = () => {
    setStatusFilters(new Set());
    setFieldFilters(new Set());
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((v) => !v);
        return;
      }

      if (shouldIgnoreShortcut(event) || event.key.toLowerCase() !== "z") {
        return;
      }

      setZenMode((current) => !current);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <SiteNavbar
        problems={problems}
        zenMode={zenMode}
        onZenModeToggle={() => setZenMode((current) => !current)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        statusFilters={statusFilters}
        fieldFilters={fieldFilters}
        onToggleStatus={toggleStatus}
        onToggleField={toggleField}
        onClearFilters={clearFilters}
        filteredCount={filteredProblems.length}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <HomeCatalog problems={filteredProblems} zenMode={zenMode} viewMode={viewMode} />
      <SearchDialog
        problems={problems}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
