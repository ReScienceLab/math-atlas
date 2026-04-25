import { TimelineEvent } from "@/lib/problems";

const typeStyles: Record<TimelineEvent["type"], { dot: string; line: string }> = {
  origin: { dot: "bg-[var(--gray-600)]", line: "bg-[var(--gray-800)]" },
  progress: { dot: "bg-[var(--gray-500)]", line: "bg-[var(--gray-800)]" },
  breakthrough: { dot: "bg-[var(--blue)]", line: "bg-[var(--blue)]/20" },
  recognition: { dot: "bg-[var(--gray-400)]", line: "bg-[var(--gray-800)]" },
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      {events.map((event, i) => {
        const style = typeStyles[event.type];
        const isBreakthrough = event.type === "breakthrough";
        const isLast = i === events.length - 1;

        return (
          <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center flex-shrink-0 w-5">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot} ${
                  isBreakthrough ? "ring-2 ring-[var(--blue)]/30 ring-offset-1 ring-offset-black" : ""
                }`}
                style={{ marginTop: 6 }}
              />
              {!isLast && (
                <div className={`w-px flex-1 mt-1 ${style.line}`} />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 pb-1">
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-[var(--font-mono)] text-[12px] flex-shrink-0 ${
                    isBreakthrough ? "text-[var(--blue)]" : "text-[var(--gray-500)]"
                  }`}
                >
                  {event.year}{event.month ? ` ${event.month}` : ""}
                </span>
              </div>
              <p
                className={`text-[14px] leading-snug mt-0.5 ${
                  isBreakthrough
                    ? "text-[var(--fg)] font-medium"
                    : "text-[var(--gray-400)]"
                }`}
              >
                {event.title}
              </p>
              {event.description && (
                <p className="text-[13px] text-[var(--gray-500)] mt-1">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
