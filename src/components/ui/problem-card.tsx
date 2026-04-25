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
      <article className="h-full bg-[var(--bg)] p-0 transition-colors duration-200 hover:bg-[var(--gray-950)]">
        {/* Viz preview — takes up top half */}
        <div className="w-full aspect-[4/3] bg-[var(--gray-950)] overflow-hidden relative">
          {Viz ? (
            <Viz className="!border-0 !rounded-none" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--gray-700)] text-sm">
              Visualization
            </div>
          )}
          {/* Status badge overlay */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block font-[var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.06em] px-2 py-0.5 border backdrop-blur-sm ${statusColor[problem.status]}`}>
              {statusLabel[problem.status]}
            </span>
          </div>
          {/* Field tag overlay */}
          <div className="absolute top-3 right-3">
            <span className="font-[var(--font-mono)] text-[10px] text-[var(--gray-400)] bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-white/[0.06]">
              {fieldLabel[problem.field]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em] mb-2 group-hover:text-white transition-colors text-[var(--gray-200)]">
            {problem.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-[var(--gray-500)] line-clamp-2 mb-4">
            {problem.shortDescription}
          </p>

          {/* Authors row with avatars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Stacked avatars */}
              <div className="flex -space-x-2">
                {problem.authors.slice(0, 3).map((author, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-[var(--gray-800)] border border-[var(--gray-700)] flex-shrink-0 overflow-hidden relative"
                    title={author.name}
                  >
                    {author.avatarUrl ? (
                      <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[9px] font-medium text-[var(--gray-400)]">
                        {author.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="ml-2 text-[12px] text-[var(--gray-500)] truncate max-w-[180px]">
                {problem.authors.map(a => a.name.split(" ").pop()).join(", ")}
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--gray-600)] flex-shrink-0">
              {problem.year}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
