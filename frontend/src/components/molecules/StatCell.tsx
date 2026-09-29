export default function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink px-4 py-[18px]">
      <div className="mb-1.5 font-mono text-[11px] text-muted">{label}</div>
      <div className="text-[15px] font-medium">{value}</div>
    </div>
  );
}
