"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Problem, fieldLabel, statusLabel, statusColor } from "@/lib/problems";

const vizMap: Record<string, React.ComponentType<{ className?: string }>> = {
  KakeyaViz: dynamic(
    () => import("@/components/viz/kakeya-viz").then((m) => m.KakeyaViz),
    { ssr: false },
  ),
  LanglandsViz: dynamic(
    () => import("@/components/viz/langlands-viz").then((m) => m.LanglandsViz),
    { ssr: false },
  ),
  HilbertViz: dynamic(
    () => import("@/components/viz/hilbert-viz").then((m) => m.HilbertViz),
    { ssr: false },
  ),
  MizohataViz: dynamic(
    () => import("@/components/viz/mizohata-viz").then((m) => m.MizohataViz),
    { ssr: false },
  ),
  NoperthedronViz: dynamic(
    () =>
      import("@/components/viz/noperthedron-viz").then(
        (m) => m.NoperthedronViz,
      ),
    { ssr: false },
  ),
  AlphaEvolveViz: dynamic(
    () =>
      import("@/components/viz/alphaevolve-viz").then((m) => m.AlphaEvolveViz),
    { ssr: false },
  ),
  RiemannViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.RiemannViz),
    { ssr: false },
  ),
  Kakeya2DViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.Kakeya2DViz),
    { ssr: false },
  ),
  PvsNPViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.PvsNPViz),
    { ssr: false },
  ),
  NavierStokesViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.NavierStokesViz),
    { ssr: false },
  ),
  HodgeViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.HodgeViz),
    { ssr: false },
  ),
  BSDViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.BSDViz),
    { ssr: false },
  ),
  YangMillsViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.YangMillsViz),
    { ssr: false },
  ),
  CollatzViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.CollatzViz),
    { ssr: false },
  ),
  GoldbachViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.GoldbachViz),
    { ssr: false },
  ),
  TwinPrimeViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.TwinPrimeViz),
    { ssr: false },
  ),
  AbcViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.AbcViz),
    { ssr: false },
  ),
  ContinuumViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.ContinuumViz),
    { ssr: false },
  ),
  PoincareViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.PoincareViz),
    { ssr: false },
  ),
  AbcVerificationViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.AbcVerificationViz),
    { ssr: false },
  ),
  FaltingsAbelViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.FaltingsAbelViz),
    { ssr: false },
  ),
  FourColorViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.FourColorViz),
    { ssr: false },
  ),
  SpherePackingViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.SpherePackingViz),
    { ssr: false },
  ),
  TSPViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.TSPViz),
    { ssr: false },
  ),
  AperiodicTilingViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.AperiodicTilingViz),
    { ssr: false },
  ),
  MandelbrotViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.MandelbrotViz),
    { ssr: false },
  ),
  SquarePegViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.SquarePegViz),
    { ssr: false },
  ),
  HadwigerNelsonViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.HadwigerNelsonViz),
    { ssr: false },
  ),
  PlateauViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.PlateauViz),
    { ssr: false },
  ),
  KissingNumberViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.KissingNumberViz),
    { ssr: false },
  ),
  SteinerTreeViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.SteinerTreeViz),
    { ssr: false },
  ),
  IsoperimetricViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then((m) => m.IsoperimetricViz),
    { ssr: false },
  ),
  HoneycombViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.HoneycombViz),
    { ssr: false },
  ),
  BrouwerViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.BrouwerViz),
    { ssr: false },
  ),
  BorsukUlamViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.BorsukUlamViz),
    { ssr: false },
  ),
  HamSandwichViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.HamSandwichViz),
    { ssr: false },
  ),
  HairyBallViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.HairyBallViz),
    { ssr: false },
  ),
  GaussCircleViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.GaussCircleViz),
    { ssr: false },
  ),
  MovingSofaViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.MovingSofaViz),
    { ssr: false },
  ),
  MoserWormViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.MoserWormViz),
    { ssr: false },
  ),
  IlluminationViz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.IlluminationViz),
    { ssr: false },
  ),
  Erdos1196Viz: dynamic(
    () => import("@/components/viz/classic-viz").then((m) => m.Erdos1196Viz),
    { ssr: false },
  ),
  LebesgueUniversalCoverViz: dynamic(
    () =>
      import("@/components/viz/classic-viz").then(
        (m) => m.LebesgueUniversalCoverViz,
      ),
    { ssr: false },
  ),
};

const cardVizClassName =
  "viz-card-preview !h-full !w-full !border-0 !rounded-none !aspect-auto bg-[#0a0a0a] [&_.viz-detail-labels]:hidden";

export function ProblemCard({
  problem,
  zen = false,
}: {
  problem: Problem;
  zen?: boolean;
}) {
  const Viz = vizMap[problem.vizComponent];
  const draggableViz =
    problem.vizComponent === "KakeyaViz" ||
    problem.vizComponent === "NoperthedronViz";
  const visualization = (
    <div
      className={`relative aspect-square w-full overflow-hidden bg-[#0a0a0a] ${zen ? "" : "border-b border-[var(--line)]"} ${draggableViz ? "touch-none cursor-grab" : ""}`}
      title={draggableViz ? "Drag to rotate" : "Animated visualization"}
    >
      {Viz ? (
        <div className="absolute inset-0 overflow-hidden">
          <Viz className={cardVizClassName} />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[11px] text-[var(--gray-700)]">
          viz
        </div>
      )}
    </div>
  );

  return (
    <article
      className={`group h-full transition-colors duration-150 ${zen ? "bg-[#0a0a0a]" : "bg-[#0b0b0b] hover:bg-[#111]"}`}
    >
      {zen ? (
        <Link
          href={`/problems/${problem.slug}`}
          className="block transition-opacity hover:opacity-90"
          aria-label={`Open ${problem.title}`}
        >
          {visualization}
        </Link>
      ) : (
        visualization
      )}

      {!zen && (
        <Link
          href={`/problems/${problem.slug}`}
          className="block px-3 py-3 transition-colors hover:bg-white/[0.035]"
        >
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={`inline-flex shrink-0 font-[var(--font-mono)] text-[8px] font-medium uppercase px-1 py-px border ${statusColor[problem.status]}`}
              >
                {statusLabel[problem.status]}
              </span>
              <span className="truncate border border-[var(--line)] bg-white/[0.025] px-1 py-px font-[var(--font-mono)] text-[8px] text-white/[0.46]">
                {fieldLabel[problem.field]}
              </span>
            </div>
            <h3 className="mb-2 truncate text-[12px] font-semibold leading-tight text-white transition-colors">
              {problem.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center">
                <div className="flex -space-x-1">
                  {problem.authors.slice(0, 2).map((author, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-[var(--gray-800)] border border-[var(--line)] flex-shrink-0 overflow-hidden relative"
                      title={author.name}
                    >
                      {author.avatarUrl ? (
                        <Image
                          src={author.avatarUrl}
                          alt={author.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[7px] font-medium text-[var(--gray-300)]">
                          {author.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="ml-1 max-w-[80px] truncate text-[10px] text-white/[0.62]">
                  {problem.authors
                    .slice(0, 2)
                    .map((a) => a.name.split(" ").pop())
                    .join(", ")}
                </span>
              </div>
              <span className="font-[var(--font-mono)] text-[9px] text-white/[0.72]">
                {problem.year}
              </span>
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}
