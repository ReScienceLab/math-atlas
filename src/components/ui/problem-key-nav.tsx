"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

export function ProblemKeyNav({
  previousSlug,
  previousTitle,
  nextSlug,
  nextTitle,
}: {
  previousSlug: string;
  previousTitle: string;
  nextSlug: string;
  nextTitle: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        router.push(`/problems/${previousSlug}`);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        router.push(`/problems/${nextSlug}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextSlug, previousSlug, router]);

  return (
    <div className="ml-auto hidden items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-600)] md:flex">
      <button
        type="button"
        onClick={() => router.push(`/problems/${previousSlug}`)}
        className="inline-flex h-6 w-6 items-center justify-center border border-white/[0.12] bg-white/[0.02] text-[var(--gray-500)] transition-colors hover:border-white/[0.22] hover:text-white"
        title={`Previous: ${previousTitle}`}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => router.push(`/problems/${nextSlug}`)}
        className="inline-flex h-6 w-6 items-center justify-center border border-white/[0.12] bg-white/[0.02] text-[var(--gray-500)] transition-colors hover:border-white/[0.22] hover:text-white"
        title={`Next: ${nextTitle}`}
      >
        →
      </button>
      <span className="pl-1 text-[var(--gray-600)]">Switch</span>
    </div>
  );
}
