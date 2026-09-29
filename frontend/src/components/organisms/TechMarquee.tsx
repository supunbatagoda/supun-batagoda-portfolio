export default function TechMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mt-9 overflow-hidden border-y border-paper/[0.08] py-[18px]" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm text-paper/35">
        {row.map((m, i) => (
          <span key={`${m}-${i}`} className="flex gap-10">
            <span>{m}</span>
            <span className="text-signal">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
