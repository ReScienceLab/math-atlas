import { notFound } from "next/navigation";
import { problems, getProblem, fieldLabel } from "@/lib/problems";
import { Badge } from "@/components/ui/badge";
import { AuthorCard } from "@/components/ui/author-card";
import { EscBackLink } from "@/components/ui/esc-back-link";
import { ProblemKeyNav } from "@/components/ui/problem-key-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Timeline } from "@/components/ui/timeline";
import { VizLoader } from "@/components/viz/viz-loader";

const pageShell = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8";
const detailColumns =
  "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(360px,0.92fr)] lg:gap-10";

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
  const problemIndex = problems.findIndex((p) => p.slug === slug);
  const previousProblem = problems[(problemIndex - 1 + problems.length) % problems.length];
  const nextProblem = problems[(problemIndex + 1) % problems.length];

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/85 backdrop-blur-md">
        <div className={`${pageShell} flex h-11 min-w-0 items-center gap-2 sm:h-12 sm:gap-3`}>
          <EscBackLink />
          <span className="font-[var(--font-mono)] text-[12px] text-[var(--gray-500)] sm:text-[13px]">Math Atlas</span>
          <span className="text-[var(--gray-800)]">/</span>
          <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] text-[var(--gray-400)] sm:text-[13px]">{problem.slug}</span>
          <ProblemKeyNav
            previousSlug={previousProblem.slug}
            previousTitle={previousProblem.title}
            nextSlug={nextProblem.slug}
            nextTitle={nextProblem.title}
          />
        </div>
      </nav>

      <section className={`${pageShell} py-4 sm:py-5 lg:py-6`}>
        <header className={`${detailColumns} border-b border-white/[0.08] pb-4 sm:pb-5 lg:items-end`}>
          <div className="min-w-0 space-y-3 sm:space-y-4">
            <div className="flex min-h-7 flex-wrap items-center gap-2 sm:gap-3">
              <Badge status={problem.status} />
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] sm:text-[12px]">
                {fieldLabel[problem.field]}
              </span>
              <span className="text-[var(--gray-800)]">&middot;</span>
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--gray-500)] sm:text-[12px]">{problem.year}</span>
            </div>
            <h1 className="max-w-[940px] text-[30px] font-bold leading-none text-[var(--fg)] sm:text-[46px] lg:text-[54px] xl:text-[60px]">
              {problem.title}
            </h1>
            <p className="line-clamp-2 text-[13px] leading-5 text-[var(--gray-400)] lg:hidden">
              {problem.shortDescription}
            </p>
          </div>
          <p className="hidden max-w-[560px] text-[14px] leading-6 text-[var(--gray-400)] lg:block lg:pb-0.5">
            {problem.longDescription || problem.shortDescription}
          </p>
        </header>

        <div className={`${detailColumns} items-start pt-4 sm:pt-5 lg:pt-6`}>
          <div className="min-w-0 space-y-6">
            <div className="h-[calc(100vw-32px)] min-h-[300px] max-h-[420px] w-full overflow-hidden border border-white/[0.08] bg-[var(--gray-950)] sm:h-[clamp(320px,48vh,560px)] sm:max-h-none">
              <VizLoader name={problem.vizComponent} className="!border-0" />
            </div>

            <section className="border-y border-white/[0.08] py-4 lg:hidden">
              <h3 className="mb-3 flex h-5 items-center font-[var(--font-mono)] text-[11px] uppercase text-[var(--gray-500)]">
                Summary
              </h3>
              <p className="text-[14px] leading-6 text-[var(--gray-400)]">
                {problem.longDescription || problem.shortDescription}
              </p>
            </section>

            <section>
              <h3 className="mb-3 flex h-5 items-center font-[var(--font-mono)] text-[11px] uppercase text-[var(--gray-500)]">
                Sources
              </h3>
              <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
                {problem.papers.map((paper, i) => (
                  <a
                    key={i}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--gray-950)] p-4 transition-colors hover:bg-[var(--gray-900)] group"
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
            </section>
          </div>

          <aside className="space-y-7">
            <section>
              <h3 className="mb-3 flex h-5 items-center font-[var(--font-mono)] text-[11px] uppercase text-[var(--gray-500)]">
                Researchers
              </h3>
              <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
                {problem.authors.map((author, i) => (
                  <AuthorCard key={i} author={author} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 flex h-5 items-center font-[var(--font-mono)] text-[11px] uppercase text-[var(--gray-500)]">
                Timeline
              </h3>
              <div className="border-y border-white/[0.08] py-5">
                <Timeline events={problem.timeline} />
              </div>
            </section>
          </aside>
        </div>
      </section>

      <SiteFooter problems={problems} />
    </main>
  );
}
