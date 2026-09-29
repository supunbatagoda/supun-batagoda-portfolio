import WindowDots from "@/components/atoms/WindowDots";

export default function TerminalHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-paper/[0.02] px-4 py-3">
      <WindowDots />
      <span className="font-mono text-xs text-muted">{title}</span>
    </div>
  );
}
