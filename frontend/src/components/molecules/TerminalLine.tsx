import type { TerminalEntry } from "@/types/portfolio";
import { cn } from "@/lib/cn";

export default function TerminalLine({ entry, last }: { entry: TerminalEntry; last: boolean }) {
  return (
    <div className="pl-4">
      <span className="text-signal">&quot;{entry.key}&quot;</span>:{" "}
      <span className={cn(entry.tone === "success" ? "text-emerald-400" : "text-sky-300")}>{entry.value}</span>
      {last ? "" : ","}
    </div>
  );
}
