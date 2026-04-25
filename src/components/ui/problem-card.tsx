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
};

export function ProblemCard({ problem }: { problem: Problem }) {
  const Viz = vizMap[problem.vizComponent];

  return (
    <Link href={`/problems/${problem.slug}`} className="group block">
      <article className="h-full bg-[var(--bg)] transition-colors duration-150 hover:bg-[var(--gray-950)]">
        {/* Viz — square for dense grid */}
        <div className="w-full aspect-square bg-[var(--gray-950)] overflow-hidden relative">
          {Viz ? (
            <Viz className="!border-0 !rounded-none !aspect-auto" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--gray-700)] text-[11px]">viz</div>
          )}
          <div className="absolute top-1.5 left-1.5">
            <span className={`inline-block font-[var(--font-mono)] text-[8px] font-medium uppercase tracking-[0.06em] px-1 py-px border backdrop-blur-sm ${statusColor[problem.status]}`}>
              {statusLabel[problem.status]}
            </span>
          </div>
          <div className="absolute top-1.5 right-1.5">
            <span className="font-[var(--font-mono)] text-[8px] text-[var(--gray-400)] bg-black/60 backdrop-blur-sm px-1 py-px border border-white/[0.06]">
              {fieldLabel[problem.field]}
            </span>
          </div>
        </div>

        {/* Info strip */}
        <div className="px-2.5 py-2">
          <h3 className="text-[12px] font-semibold leading-tight tracking-[-0.01em] mb-0.5 group-hover:text-white transition-colors text-[var(--gray-200)] truncate">
            {problem.title}
          </h3>
          <p className="text-[10px] leading-snug text-[var(--gray-500)] line-clamp-1 mb-1.5">
            {problem.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-1">
                {problem.authors.slice(0, 2).map((author, i) => (
                  <div key={i} className="w-4 h-4 bg-[var(--gray-800)] border border-[var(--gray-700)] flex-shrink-0 overflow-hidden relative" title={author.name}>
                    {author.avatarUrl ? (
                      <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[7px] font-medium text-[var(--gray-400)]">
                        {author.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="ml-1 text-[10px] text-[var(--gray-500)] truncate max-w-[80px]">
                {problem.authors.slice(0, 2).map(a => a.name.split(" ").pop()).join(", ")}
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-[9px] text-[var(--gray-600)]">{problem.year}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
