import Link from "next/link";
import { Problem } from "@/lib/problems";
import { GitHubSourceLink } from "@/components/layout/github-source-link";

function latestReview(problems: Problem[]) {
  const reviews = problems
    .map((problem) => problem.lastReviewed)
    .filter((review): review is string => Boolean(review));

  return reviews.sort().at(-1) ?? "Live";
}

function statusCount(problems: Problem[], status: Problem["status"]) {
  return problems.filter((problem) => problem.status === status).length;
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex min-h-20 flex-col justify-between bg-[var(--panel-deep)] p-4">
      <span className="font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-600)]">
        {label}
      </span>
      <span className="font-[var(--font-mono)] text-[18px] leading-none text-[var(--gray-200)]">
        {value}
      </span>
    </div>
  );
}

export function SiteFooter({ problems }: { problems: Problem[] }) {
  const fieldCount = new Set(problems.map((problem) => problem.field)).size;
  const settledCount =
    statusCount(problems, "proved") +
    statusCount(problems, "resolved") +
    statusCount(problems, "disproved");
  const watchAwardCount = `${statusCount(problems, "watch")} / ${statusCount(problems, "award")}`;

  return (
    <footer id="footer" className="border-t border-[var(--line)] bg-black">
      <div className="grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-3 lg:grid-cols-6">
        <StatCell label="Catalogued" value={problems.length} />
        <StatCell label="Open" value={statusCount(problems, "open")} />
        <StatCell label="Watch / Award" value={watchAwardCount} />
        <StatCell label="Settled" value={settledCount} />
        <StatCell label="Fields" value={fieldCount} />
        <StatCell label="Reviewed" value={latestReview(problems)} />
      </div>

      <div className="grid min-h-16 grid-cols-1 border-t border-[var(--line)] font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-600)] md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center px-4 sm:px-5">
          <span>© 2026 ReScience Lab</span>
        </div>
        <div className="flex items-center justify-start gap-5 border-y border-[var(--line)] px-4 md:justify-center md:border-x md:border-y-0 sm:px-8">
          <Link href="/" className="transition-colors hover:text-white">
            Math Atlas
          </Link>
          <GitHubSourceLink
            label
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          />
        </div>
        <div className="flex items-center px-4 md:justify-end sm:px-5">
          <span>A visual directory of mathematical problems</span>
        </div>
      </div>
    </footer>
  );
}
