import { problems } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <SiteNavbar problems={problems} />

      <div id="catalog" className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-6">
        {problems.map((problem) => (
          <ProblemCard key={problem.slug} problem={problem} />
        ))}
      </div>

      <SiteFooter problems={problems} />
    </main>
  );
}
