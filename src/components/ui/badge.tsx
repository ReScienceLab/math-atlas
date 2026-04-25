import { ProblemStatus, statusLabel, statusColor } from "@/lib/problems";

export function Badge({
  status,
  className = "",
}: {
  status: ProblemStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.05em] px-2 py-0.5 rounded border ${statusColor[status]} ${className}`}
    >
      {statusLabel[status]}
    </span>
  );
}
