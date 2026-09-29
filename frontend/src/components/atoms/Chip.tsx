import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const styles = {
  skill: "border-line bg-paper/5 text-paper/85 px-3 py-1.5 text-sm rounded-lg",
  tech: "border-signal/20 bg-signal/10 text-signal font-mono text-xs rounded-md px-2.5 py-1",
  muted: "border-line text-muted font-mono text-[11px] rounded px-2 py-0.5",
};

export default function Chip({ variant = "skill", children }: { variant?: keyof typeof styles; children: ReactNode }) {
  return <span className={cn("block border", styles[variant])}>{children}</span>;
}
