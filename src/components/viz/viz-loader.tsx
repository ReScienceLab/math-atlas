"use client";

import dynamic from "next/dynamic";

const vizMap: Record<string, React.ComponentType<{ className?: string }>> = {
  KakeyaViz: dynamic(() => import("@/components/viz/kakeya-viz").then((m) => m.KakeyaViz), { ssr: false }),
  LanglandsViz: dynamic(() => import("@/components/viz/langlands-viz").then((m) => m.LanglandsViz), { ssr: false }),
  HilbertViz: dynamic(() => import("@/components/viz/hilbert-viz").then((m) => m.HilbertViz), { ssr: false }),
  MizohataViz: dynamic(() => import("@/components/viz/mizohata-viz").then((m) => m.MizohataViz), { ssr: false }),
  NoperthedronViz: dynamic(() => import("@/components/viz/noperthedron-viz").then((m) => m.NoperthedronViz), { ssr: false }),
  AlphaEvolveViz: dynamic(() => import("@/components/viz/alphaevolve-viz").then((m) => m.AlphaEvolveViz), { ssr: false }),
  RiemannViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.RiemannViz), { ssr: false }),
  Kakeya2DViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.Kakeya2DViz), { ssr: false }),
  PvsNPViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.PvsNPViz), { ssr: false }),
  NavierStokesViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.NavierStokesViz), { ssr: false }),
  HodgeViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.HodgeViz), { ssr: false }),
  BSDViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.BSDViz), { ssr: false }),
  YangMillsViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.YangMillsViz), { ssr: false }),
  CollatzViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.CollatzViz), { ssr: false }),
  GoldbachViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.GoldbachViz), { ssr: false }),
  TwinPrimeViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.TwinPrimeViz), { ssr: false }),
  AbcViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.AbcViz), { ssr: false }),
  ContinuumViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.ContinuumViz), { ssr: false }),
  PoincareViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.PoincareViz), { ssr: false }),
  AbcVerificationViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.AbcVerificationViz), { ssr: false }),
  FaltingsAbelViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.FaltingsAbelViz), { ssr: false }),
  FourColorViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.FourColorViz), { ssr: false }),
  SpherePackingViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.SpherePackingViz), { ssr: false }),
  TSPViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.TSPViz), { ssr: false }),
  AperiodicTilingViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.AperiodicTilingViz), { ssr: false }),
  MandelbrotViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.MandelbrotViz), { ssr: false }),
  SquarePegViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.SquarePegViz), { ssr: false }),
  HadwigerNelsonViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.HadwigerNelsonViz), { ssr: false }),
  PlateauViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.PlateauViz), { ssr: false }),
  KissingNumberViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.KissingNumberViz), { ssr: false }),
  SteinerTreeViz: dynamic(() => import("@/components/viz/classic-viz").then((m) => m.SteinerTreeViz), { ssr: false }),
};

export function VizLoader({ name, className }: { name: string; className?: string }) {
  const Viz = vizMap[name];
  const stableClassName = `h-full w-full ${className ?? ""}`;
  if (!Viz) {
    return (
      <div className={`${stableClassName} bg-[var(--gray-950)] border border-white/[0.08] flex items-center justify-center text-[var(--gray-600)] text-sm`}>
        Visualization coming soon
      </div>
    );
  }
  return <Viz className={stableClassName} />;
}
