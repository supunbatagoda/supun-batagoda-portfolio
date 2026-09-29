import type { ExperienceItem } from "@/types/portfolio";

export default function TimelineItem({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 pb-8 sm:gap-8">
      <div className="flex flex-col items-center">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-signal/30 bg-signal/5 font-mono text-lg font-semibold text-signal">
          {item.badge}
        </div>
        {!isLast && <div className="mt-2 min-h-6 w-px grow bg-gradient-to-b from-signal/30 to-paper/5" />}
      </div>
      <div className="pt-[3px]">
        <div className="mb-1.5 font-mono text-xs text-signal">{item.period}</div>
        <div className="text-xl font-semibold sm:text-[22px]">
          {item.title}
          {item.note && <span className="ml-2 text-sm font-light text-signal/80">{item.note}</span>}
        </div>
        <div className="mb-2 text-[15px] text-paper/70">{item.organization}</div>
        <p className="max-w-[620px] text-[14.5px] leading-relaxed text-paper/50">{item.description}</p>
      </div>
    </div>
  );
}
