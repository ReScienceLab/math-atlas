import { problems } from "@/lib/problems";
import { ProblemCard } from "@/components/ui/problem-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="grid grid-cols-6 gap-px bg-[var(--line)]">
        {problems.map((problem) => (
          <ProblemCard key={problem.slug} problem={problem} />
        ))}
      </div>
    </main>
  );
}
