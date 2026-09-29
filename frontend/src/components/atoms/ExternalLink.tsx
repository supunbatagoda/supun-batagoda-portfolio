import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("transition hover:text-signal", className)}>
      {children}
    </a>
  );
}
