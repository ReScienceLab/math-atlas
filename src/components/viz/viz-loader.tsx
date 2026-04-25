"use client";

import dynamic from "next/dynamic";

const vizMap: Record<string, React.ComponentType<{ className?: string }>> = {
  KakeyaViz: dynamic(() => import("@/components/viz/kakeya-viz").then((m) => m.KakeyaViz), { ssr: false }),
  LanglandsViz: dynamic(() => import("@/components/viz/langlands-viz").then((m) => m.LanglandsViz), { ssr: false }),
  HilbertViz: dynamic(() => import("@/components/viz/hilbert-viz").then((m) => m.HilbertViz), { ssr: false }),
  MizohataViz: dynamic(() => import("@/components/viz/mizohata-viz").then((m) => m.MizohataViz), { ssr: false }),
  NoperthedronViz: dynamic(() => import("@/components/viz/noperthedron-viz").then((m) => m.NoperthedronViz), { ssr: false }),
  AlphaEvolveViz: dynamic(() => import("@/components/viz/alphaevolve-viz").then((m) => m.AlphaEvolveViz), { ssr: false }),
};

export function VizLoader({ name, className }: { name: string; className?: string }) {
  const Viz = vizMap[name];
  if (!Viz) return <div className="w-full aspect-square bg-[var(--gray-950)] border border-white/[0.08] flex items-center justify-center text-[var(--gray-600)] text-sm">Visualization coming soon</div>;
  return <Viz className={className} />;
}
