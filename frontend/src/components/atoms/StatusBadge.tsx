import type { ReactNode } from "react";

export default function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/5 px-3 py-1.5 font-mono text-xs text-signal">
      <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]" />
      {children}
    </div>
  );
}
