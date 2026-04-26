"use client";

import { useEffect, useState } from "react";
import type { Problem } from "@/lib/problems";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { HomeCatalog } from "@/components/ui/home-catalog";

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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
      />
      <HomeCatalog problems={problems} zenMode={zenMode} />
    </>
  );
}
