import Link from "next/link";
import { Problem } from "@/lib/problems";
import { GitHubSourceLink } from "@/components/layout/github-source-link";

function countByStatus(problems: Problem[], status: Problem["status"]) {
  return problems.filter((problem) => problem.status === status).length;
}

export function SiteNavbar({ problems }: { problems: Problem[] }) {
  const openCount = countByStatus(problems, "open");
  const recentCount = problems.filter((problem) => problem.collections?.includes("recent")).length;
  const fieldCount = new Set(problems.map((problem) => problem.field)).size;

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--line)] bg-black/90 backdrop-blur-md">
      <div className="grid min-h-14 grid-cols-[minmax(160px,0.95fr)_minmax(0,1.4fr)_minmax(316px,0.95fr)] items-stretch max-lg:grid-cols-[minmax(160px,1fr)_auto]">
        <Link
          href="/"
          className="flex items-center border-r border-[var(--line)] px-4 transition-colors hover:bg-white/[0.025] sm:px-5"
          aria-label="Math Atlas home"
        >
          <span className="font-[var(--font-mono)] text-[14px] font-semibold uppercase leading-none text-[var(--fg)]">
            Math Atlas
          </span>
        </Link>

        <div className="flex min-w-0 items-center border-r border-[var(--line)] px-4 max-lg:hidden">
          <div className="flex items-center gap-7 font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-500)]">
            <Link href="/" className="transition-colors hover:text-white">
              Index
            </Link>
            <a href="#catalog" className="transition-colors hover:text-white">
              Problems
            </a>
            <a href="#footer" className="transition-colors hover:text-white">
              Summary
            </a>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(78px,1fr)_minmax(78px,1fr)_minmax(118px,1.2fr)_56px] divide-x divide-[var(--line)] font-[var(--font-mono)] text-[10px] uppercase max-sm:grid-cols-[56px]">
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Problems</span>
            <span className="mt-0.5 text-[var(--gray-300)]">{problems.length}</span>
          </div>
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Open</span>
            <span className="mt-0.5 text-[var(--gray-300)]">{openCount}</span>
          </div>
          <div className="flex flex-col justify-center px-4 max-sm:hidden">
            <span className="text-[var(--gray-600)]">Recent / Fields</span>
            <span className="mt-0.5 text-[var(--gray-300)]">
              {recentCount} / {fieldCount}
            </span>
          </div>
          <GitHubSourceLink className="flex items-center justify-center text-[var(--gray-500)] transition-colors hover:bg-white/[0.025] hover:text-white" />
        </div>
      </div>
    </nav>
  );
}
