import Chip from "@/components/atoms/Chip";

export default function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-[18px]">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => <Chip key={i}>{i}</Chip>)}
      </div>
    </div>
  );
}
