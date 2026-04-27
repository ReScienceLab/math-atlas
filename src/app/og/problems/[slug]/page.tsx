import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  fieldLabel,
  getProblem,
  problems,
  statusColor,
  statusLabel,
} from "@/lib/problems";
import { VizLoader } from "@/components/viz/viz-loader";

export const dynamic = "force-static";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return problems.map((problem) => ({ slug: problem.slug }));
}

export default async function ProblemOgPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  return (
    <main className="relative h-[630px] w-[1200px] overflow-hidden bg-[#050608] text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 78% 36%, rgba(59,130,246,0.16), transparent 24%),
            radial-gradient(circle at 62% 80%, rgba(34,197,94,0.09), transparent 28%),
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(180deg, #07080b 0%, #030405 100%)`,
          backgroundSize: "auto, auto, 32px 32px, 32px 32px, auto",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035),transparent_26%,transparent_74%,rgba(255,255,255,0.035)),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_19%,transparent_76%,rgba(0,0,0,0.5))]" />

      <header className="relative z-10 flex h-[66px] items-center border-b border-white/[0.14]">
        <div className="flex h-full w-[390px] items-center border-r border-white/[0.14] pl-[26px]">
          <span className="text-[23px] font-[760] uppercase leading-none tracking-normal">
            Math Atlas
          </span>
        </div>
        <div className="flex h-full flex-1 items-center gap-[42px] border-r border-white/[0.14] pl-[48px] font-[var(--font-mono)] text-[13px] font-semibold uppercase text-white/45">
          <span>Problem</span>
          <span>Visual</span>
          <span>Proof Map</span>
        </div>
        <div className="flex h-full w-[158px] flex-col justify-center border-r border-white/[0.14] pl-[22px]">
          <span className="font-[var(--font-mono)] text-[12px] font-semibold uppercase text-white/42">
            Field
          </span>
          <span className="mt-1 text-[16px] font-medium text-white/86">
            {fieldLabel[problem.field]}
          </span>
        </div>
        <div className="flex h-full w-[112px] flex-col justify-center pl-[22px]">
          <span className="font-[var(--font-mono)] text-[12px] font-semibold uppercase text-white/42">
            Year
          </span>
          <span className="mt-1 text-[16px] font-medium text-white/86">
            {problem.year}
          </span>
        </div>
      </header>

      <section className="relative z-10 grid h-[564px] grid-cols-[51.5%_48.5%]">
        <div className="relative min-w-0 px-[54px] pt-[58px]">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`inline-flex border px-2.5 py-1 font-[var(--font-mono)] text-[11px] font-semibold uppercase ${statusColor[problem.status]}`}
            >
              {statusLabel[problem.status]}
            </span>
            <span className="font-[var(--font-mono)] text-[13px] text-white/42">
              {problem.slug}
            </span>
          </div>

          <h1 className="max-w-[560px] text-[66px] font-[800] leading-[0.92] tracking-normal text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.16)]">
            {problem.title}
          </h1>
          <p className="mt-6 line-clamp-4 max-w-[555px] text-[24px] font-medium leading-[1.32] text-[#b7b7bc]">
            {problem.shortDescription}
          </p>

          <div className="absolute bottom-[23px] left-[54px] font-[var(--font-mono)] text-[22px] font-medium text-[#63a2ff]">
            math.rescience.com/problems/{problem.slug}
          </div>
        </div>

        <div className="relative flex items-center justify-center pr-[38px]">
          <div className="relative h-[446px] w-[532px] overflow-hidden border border-white/[0.12] bg-[#050608] shadow-[0_0_34px_rgba(59,130,246,0.12)]">
            <VizLoader name={problem.vizComponent} className="!border-0" />
          </div>
        </div>
      </section>
    </main>
  );
}
