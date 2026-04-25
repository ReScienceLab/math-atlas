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
      <article className="h-full bg-[var(--bg)] transition-colors duration-200 hover:bg-[var(--gray-950)]">
        {/* Viz — compact 16:10 ratio */}
        <div className="w-full aspect-[16/10] bg-[var(--gray-950)] overflow-hidden relative">
          {Viz ? (
            <Viz className="!border-0 !rounded-none !aspect-auto" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--gray-700)] text-[12px]">
              Visualization
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`inline-block font-[var(--font-mono)] text-[9px] font-medium uppercase tracking-[0.06em] px-1.5 py-px border backdrop-blur-sm ${statusColor[problem.status]}`}>
              {statusLabel[problem.status]}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="font-[var(--font-mono)] text-[9px] text-[var(--gray-400)] bg-black/60 backdrop-blur-sm px-1.5 py-px border border-white/[0.06]">
              {fieldLabel[problem.field]}
            </span>
          </div>
        </div>

        {/* Text — compact */}
        <div className="px-3 py-2.5">
          <h3 className="text-[14px] font-semibold leading-tight tracking-[-0.02em] mb-1 group-hover:text-white transition-colors text-[var(--gray-200)]">
            {problem.title}
          </h3>
          <p className="text-[11px] leading-snug text-[var(--gray-500)] line-clamp-2 mb-2.5">
            {problem.shortDescription}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1.5">
                {problem.authors.slice(0, 3).map((author, i) => (
                  <div key={i} className="w-5 h-5 bg-[var(--gray-800)] border border-[var(--gray-700)] flex-shrink-0 overflow-hidden relative" title={author.name}>
                    {author.avatarUrl ? (
                      <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] font-medium text-[var(--gray-400)]">
                        {author.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="ml-1.5 text-[11px] text-[var(--gray-500)] truncate max-w-[140px]">
                {problem.authors.map(a => a.name.split(" ").pop()).join(", ")}
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-[10px] text-[var(--gray-600)] flex-shrink-0">
              {problem.year}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
