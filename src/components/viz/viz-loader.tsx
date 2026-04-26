"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type VizComponent = ComponentType<{ className?: string }>;

function VizLoading() {
  return (
    <div className="h-full w-full border border-white/[0.08] bg-[var(--gray-950)]" />
  );
}

function dynamicViz(loader: () => Promise<VizComponent>) {
  return dynamic(loader, {
    ssr: false,
    loading: VizLoading,
  });
}

const vizMap: Record<string, VizComponent> = {
  KakeyaViz: dynamicViz(() => import("@/components/viz/kakeya-viz").then((m) => m.KakeyaViz)),
  LanglandsViz: dynamicViz(() => import("@/components/viz/langlands-viz").then((m) => m.LanglandsViz)),
  HilbertViz: dynamicViz(() => import("@/components/viz/hilbert-viz").then((m) => m.HilbertViz)),
  MizohataViz: dynamicViz(() => import("@/components/viz/mizohata-viz").then((m) => m.MizohataViz)),
  NoperthedronViz: dynamicViz(() => import("@/components/viz/noperthedron-viz").then((m) => m.NoperthedronViz)),
  AlphaEvolveViz: dynamicViz(() => import("@/components/viz/alphaevolve-viz").then((m) => m.AlphaEvolveViz)),
  RiemannViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.RiemannViz)),
  Kakeya2DViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.Kakeya2DViz)),
  PvsNPViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.PvsNPViz)),
  NavierStokesViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.NavierStokesViz)),
  HodgeViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.HodgeViz)),
  BSDViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.BSDViz)),
  YangMillsViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.YangMillsViz)),
  CollatzViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.CollatzViz)),
  GoldbachViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.GoldbachViz)),
  TwinPrimeViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.TwinPrimeViz)),
  AbcViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.AbcViz)),
  ContinuumViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.ContinuumViz)),
  PoincareViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.PoincareViz)),
  AbcVerificationViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.AbcVerificationViz)),
  FaltingsAbelViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.FaltingsAbelViz)),
  FourColorViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.FourColorViz)),
  SpherePackingViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.SpherePackingViz)),
  TSPViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.TSPViz)),
  AperiodicTilingViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.AperiodicTilingViz)),
  MandelbrotViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.MandelbrotViz)),
  SquarePegViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.SquarePegViz)),
  HadwigerNelsonViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.HadwigerNelsonViz)),
  PlateauViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.PlateauViz)),
  KissingNumberViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.KissingNumberViz)),
  SteinerTreeViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.SteinerTreeViz)),
  IsoperimetricViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.IsoperimetricViz)),
  HoneycombViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.HoneycombViz)),
  BrouwerViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.BrouwerViz)),
  BorsukUlamViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.BorsukUlamViz)),
  HamSandwichViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.HamSandwichViz)),
  HairyBallViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.HairyBallViz)),
  GaussCircleViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.GaussCircleViz)),
  MovingSofaViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.MovingSofaViz)),
  MoserWormViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.MoserWormViz)),
  IlluminationViz: dynamicViz(() => import("@/components/viz/classic-viz").then((m) => m.IlluminationViz)),
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
