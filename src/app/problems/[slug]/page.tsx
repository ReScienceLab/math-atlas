import { notFound } from "next/navigation";
import Link from "next/link";
import { problems, getProblem, fieldLabel, statusLabel, statusColor } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { AuthorCard } from "@/components/ui/author-card";
import { Timeline } from "@/components/ui/timeline";
import { VizLoader } from "@/components/viz/viz-loader";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/[0.08] px-6 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center gap-3">
          <Link href="/" className="font-[var(--font-mono)] text-[13px] text-[var(--gray-500)] hover:text-white transition-colors">
                        &larr; Math Atlas
          </Link>
          <span className="text-[var(--gray-800)]">/</span>
          <span className="font-[var(--font-mono)] text-[13px] text-[var(--gray-400)]">{problem.slug}</span>
        </div>
      </nav>

      {/* Hero header */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3 mb-4">
          <Badge status={problem.status} />
          <span className="font-[var(--font-mono)] text-[12px] text-[var(--gray-500)]">
            {fieldLabel[problem.field]}
          </span>
          <span className="text-[var(--gray-800)]">&middot;</span>
          <span className="font-[var(--font-mono)] text-[12px] text-[var(--gray-500)]">{problem.year}</span>
        </div>
        <h1 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
          {problem.title}
        </h1>
        <p className="text-[18px] leading-[1.7] text-[var(--gray-400)] max-w-[700px]">
          {problem.longDescription || problem.shortDescription}
        </p>
      </section>

      {/* Main content: 2-column */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left: Viz (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <VizLoader name={problem.vizComponent} />

            {/* Papers */}
            <div>
              <h3 className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] uppercase tracking-[0.08em] mb-4">
                Papers
              </h3>
              <div className="space-y-3">
                {problem.papers.map((paper, i) => (
                  <a
                    key={i}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-md border border-white/[0.08] bg-[var(--gray-950)] hover:border-white/[0.15] hover:bg-[var(--gray-900)] transition-colors group"
                  >
                    <p className="text-[14px] text-[var(--gray-300)] group-hover:text-white transition-colors leading-snug">
                      {paper.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2 font-[var(--font-mono)] text-[12px] text-[var(--gray-500)]">
                      {paper.arxivId && (
                        <span className="text-[var(--blue)]">arXiv:{paper.arxivId}</span>
                      )}
                      <span>{paper.year}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Authors + Timeline (2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Authors */}
            <div>
              <h3 className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] uppercase tracking-[0.08em] mb-3">
                Researchers
              </h3>
              <div className="divide-y divide-white/[0.06]">
                {problem.authors.map((author, i) => (
                  <AuthorCard key={i} author={author} />
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] uppercase tracking-[0.08em] mb-4">
                Timeline
              </h3>
              <Timeline events={problem.timeline} />
            </div>

            {/* Interact hint */}
            <div className="p-4 rounded-md border border-white/[0.06] bg-[var(--gray-950)]">
              <h4 className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] uppercase tracking-[0.08em] mb-2">
                Interact
              </h4>
              <p className="text-[13px] text-[var(--gray-500)] leading-relaxed">
                Drag to rotate the 3D visualization. The animation runs in real-time at 60fps using WebGL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-6 py-12 text-center">
        <p className="font-[var(--font-mono)] text-[13px] text-[var(--gray-600)]">Math Atlas by ReScience Lab</p>
      </footer>
    </main>
  );
}
