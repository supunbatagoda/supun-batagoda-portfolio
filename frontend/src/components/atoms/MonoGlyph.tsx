import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function MonoGlyph({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-signal", className)}>{children}</span>;
}
