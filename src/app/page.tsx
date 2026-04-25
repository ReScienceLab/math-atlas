"use client";

import dynamic from "next/dynamic";
import { problems } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";

const HeroBackground = dynamic(
  () => import("@/components/viz/hero-background").then((m) => m.HeroBackground),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      {/* Compact hero */}
      <section className="relative h-[40vh] min-h-[280px] max-h-[400px] flex items-center justify-center border-b border-white/[0.08] overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" style={{ zIndex: 1 }} />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-[clamp(36px,6vw,56px)] font-extrabold tracking-[-0.05em] leading-[1.05]">
            Math Atlas
          </h1>
          <p className="mt-2 text-[15px] text-[var(--gray-500)] max-w-[420px] mx-auto leading-relaxed">
            A visual encyclopedia of mathematical breakthroughs.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 font-[var(--font-mono)] text-[11px] text-[var(--gray-600)]">
            <span>{problems.length} problems</span>
            <span className="w-px h-2.5 bg-[var(--gray-700)]" />
            <span>{problems.filter((p) => p.status === "proved" || p.status === "resolved").length} solved</span>
            <span className="w-px h-2.5 bg-[var(--gray-700)]" />
            <span>{problems.filter((p) => p.status === "open").length} open</span>
          </div>
        </div>
      </section>

      {/* Catalog grid — tight */}
      <section className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-[20px] font-bold tracking-[-0.03em]">
            Recent Breakthroughs
          </h2>
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--gray-600)]">
            2024–2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.08] px-6 py-8 text-center">
        <p className="font-[var(--font-mono)] text-[11px] text-[var(--gray-600)]">
          Math Atlas by ReScience Lab
        </p>
      </footer>
    </main>
  );
}
