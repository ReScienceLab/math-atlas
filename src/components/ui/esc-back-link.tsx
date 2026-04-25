"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function goHome(router: ReturnType<typeof useRouter>) {
  router.push("/");
}

export function EscBackLink() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (event.key !== "Escape" || isTyping) return;

      event.preventDefault();
      goHome(router);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <button
      type="button"
      onClick={() => goHome(router)}
      className="inline-flex h-6 min-w-8 items-center justify-center border border-white/[0.14] bg-white/[0.04] px-1.5 font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-400)] transition-colors hover:border-white/[0.24] hover:text-white"
      title="Press ESC to return home"
    >
      ESC
    </button>
  );
}
