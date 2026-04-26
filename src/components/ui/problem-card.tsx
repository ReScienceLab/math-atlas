"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Problem, fieldLabel, statusLabel, statusColor } from "@/lib/problems";

const vizMap: Record<string, React.ComponentType<{ className?: string }>> = {
  KakeyaViz: dynamic(() => import("@/components/viz/kakeya-viz").then(m => m.KakeyaViz), { ssr: false }),
  LanglandsViz: dynamic(() => import("@/components/viz/langlands-viz").then(m => m.LanglandsViz), { ssr: false }),
  HilbertViz: dynamic(() => import("@/components/viz/hilbert-viz").then(m => m.HilbertViz), { ssr: false }),
  MizohataViz: dynamic(() => import("@/components/viz/mizohata-viz").then(m => m.MizohataViz), { ssr: false }),
  NoperthedronViz: dynamic(() => import("@/components/viz/noperthedron-viz").then(m => m.NoperthedronViz), { ssr: false }),
  AlphaEvolveViz: dynamic(() => import("@/components/viz/alphaevolve-viz").then(m => m.AlphaEvolveViz), { ssr: false }),
  RiemannViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.RiemannViz), { ssr: false }),
  Kakeya2DViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.Kakeya2DViz), { ssr: false }),
  PvsNPViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.PvsNPViz), { ssr: false }),
  NavierStokesViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.NavierStokesViz), { ssr: false }),
  HodgeViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.HodgeViz), { ssr: false }),
  BSDViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.BSDViz), { ssr: false }),
  YangMillsViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.YangMillsViz), { ssr: false }),
  CollatzViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.CollatzViz), { ssr: false }),
  GoldbachViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.GoldbachViz), { ssr: false }),
  TwinPrimeViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.TwinPrimeViz), { ssr: false }),
  AbcViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.AbcViz), { ssr: false }),
  ContinuumViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.ContinuumViz), { ssr: false }),
  PoincareViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.PoincareViz), { ssr: false }),
  AbcVerificationViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.AbcVerificationViz), { ssr: false }),
  FaltingsAbelViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.FaltingsAbelViz), { ssr: false }),
  FourColorViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.FourColorViz), { ssr: false }),
  SpherePackingViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.SpherePackingViz), { ssr: false }),
  TSPViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.TSPViz), { ssr: false }),
  AperiodicTilingViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.AperiodicTilingViz), { ssr: false }),
  MandelbrotViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.MandelbrotViz), { ssr: false }),
  SquarePegViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.SquarePegViz), { ssr: false }),
  HadwigerNelsonViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.HadwigerNelsonViz), { ssr: false }),
  PlateauViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.PlateauViz), { ssr: false }),
  KissingNumberViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.KissingNumberViz), { ssr: false }),
  SteinerTreeViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.SteinerTreeViz), { ssr: false }),
  IsoperimetricViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.IsoperimetricViz), { ssr: false }),
  HoneycombViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.HoneycombViz), { ssr: false }),
  BrouwerViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.BrouwerViz), { ssr: false }),
  BorsukUlamViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.BorsukUlamViz), { ssr: false }),
  HamSandwichViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.HamSandwichViz), { ssr: false }),
  HairyBallViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.HairyBallViz), { ssr: false }),
  GaussCircleViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.GaussCircleViz), { ssr: false }),
  MovingSofaViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.MovingSofaViz), { ssr: false }),
  MoserWormViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.MoserWormViz), { ssr: false }),
  IlluminationViz: dynamic(() => import("@/components/viz/classic-viz").then(m => m.IlluminationViz), { ssr: false }),
};

export function ProblemCard({ problem }: { problem: Problem }) {
  const Viz = vizMap[problem.vizComponent];
  const metrics = problem.coordinates
    ? [
        { label: "D", value: problem.coordinates.difficulty, title: "Difficulty" },
        { label: "B", value: problem.coordinates.beauty, title: "Beauty" },
        { label: "V", value: problem.coordinates.visual, title: "Visual" },
      ]
    : [];
  const draggableViz = problem.vizComponent === "KakeyaViz" || problem.vizComponent === "NoperthedronViz";

  return (
    <article className="group h-full bg-[var(--panel-deep)] transition-colors duration-150 hover:bg-[var(--panel)]">
      <div
        className={`relative aspect-square w-full overflow-hidden border-b border-[var(--line)] bg-[var(--gray-950)] ${draggableViz ? "touch-none cursor-grab" : ""}`}
        title={draggableViz ? "Drag to rotate" : "Animated visualization"}
      >
        {Viz ? (
          <Viz className="!border-0 !rounded-none !aspect-auto [&_.viz-detail-labels]:hidden" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--gray-700)] text-[11px]">viz</div>
        )}
        <div className="pointer-events-none absolute top-1.5 left-1.5">
          <span className={`inline-block font-[var(--font-mono)] text-[8px] font-medium uppercase px-1 py-px border backdrop-blur-sm ${statusColor[problem.status]}`}>
            {statusLabel[problem.status]}
          </span>
        </div>
        <div className="pointer-events-none absolute top-1.5 right-1.5">
          <span className="bg-black/55 px-1 py-px font-[var(--font-mono)] text-[8px] text-[var(--gray-400)] backdrop-blur-sm border border-[var(--line)]">
            {fieldLabel[problem.field]}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <Link href={`/problems/${problem.slug}`} className="block px-3 py-3 transition-colors hover:bg-white/[0.025]">
        <div>
          <h3 className="mb-1 truncate text-[12px] font-semibold leading-tight text-[var(--fg)] transition-colors group-hover:text-white">
            {problem.title}
          </h3>
          <p className="mb-2 line-clamp-1 text-[10px] leading-snug text-[var(--mist)]">
            {problem.shortDescription}
          </p>
          {metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-1 mb-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="min-w-0" title={metric.title}>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 shrink-0 font-[var(--font-mono)] text-[8px] text-[var(--gray-400)]">
                      {metric.label}
                    </span>
                    <span className="relative h-1 flex-1 overflow-hidden bg-white/[0.08]">
                      <span
                        className="absolute inset-y-0 left-0 bg-[var(--gray-300)]"
                        style={{ width: `${metric.value * 10}%` }}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center">
              <div className="flex -space-x-1">
                {problem.authors.slice(0, 2).map((author, i) => (
                  <div key={i} className="w-4 h-4 bg-[var(--gray-800)] border border-[var(--line)] flex-shrink-0 overflow-hidden relative" title={author.name}>
                    {author.avatarUrl ? (
                      <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[7px] font-medium text-[var(--gray-300)]">
                        {author.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="ml-1 max-w-[80px] truncate text-[10px] text-[var(--mist)]">
                {problem.authors.slice(0, 2).map(a => a.name.split(" ").pop()).join(", ")}
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-[9px] text-[var(--gray-300)]">{problem.year}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2 font-[var(--font-mono)] text-[8px] uppercase text-[var(--gray-500)]">
            <span>{problem.lastReviewed ? `Reviewed ${problem.lastReviewed}` : "Interactive"}</span>
            <span className="text-[var(--gray-300)] group-hover:text-white">
              Open -&gt;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
