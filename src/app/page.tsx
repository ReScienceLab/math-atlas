import { problems } from "@/lib/problems";
import { HomeShell } from "@/components/ui/home-shell";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <HomeShell problems={problems} />

      <SiteFooter problems={problems} />
    </main>
  );
}
