import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3.5 font-mono text-[13px] text-signal">{children}</div>;
}
