import { problems, fieldLabel } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { ProblemCard } from "@/components/ui/problem-card";

export default function Home() {
  // Featured: first problem gets a large hero card
  const featured = problems[0];
  const rest = problems.slice(1);

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-6 py-24 flex flex-col items-center text-center">
          <h1 className="text-[clamp(48px,8vw,80px)] font-extrabold tracking-[-0.05em] leading-[1.05]">
            Math Atlas
          </h1>
          <p className="mt-4 text-[18px] text-[var(--gray-500)] max-w-[520px] leading-relaxed">
            A visual encyclopedia of mathematical problems, conjectures, and breakthroughs.
          </p>
          <div className="mt-8 flex items-center gap-4 font-[var(--font-mono)] text-[13px] text-[var(--gray-600)]">
            <span>{problems.length} problems</span>
            <span className="w-px h-3 bg-[var(--gray-800)]" />
            <span>{problems.filter(p => p.status === "proved" || p.status === "resolved").length} solved</span>
            <span className="w-px h-3 bg-[var(--gray-800)]" />
            <span>{problems.filter(p => p.status === "open").length} open</span>
          </div>
        </div>
      </section>

      {/* Catalog grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-[28px] font-bold tracking-[-0.03em]">
            Recent Breakthroughs
          </h2>
          <span className="font-[var(--font-mono)] text-[12px] text-[var(--gray-600)]">
            2024–2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-6 py-12 text-center">
        <p className="font-[var(--font-mono)] text-[13px] text-[var(--gray-600)]">
          Math Atlas by ReScience Lab
        </p>
      </footer>
    </main>
  );
}
