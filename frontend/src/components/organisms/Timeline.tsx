import TimelineItem from "@/components/molecules/TimelineItem";
import type { ExperienceItem } from "@/types/portfolio";

export default function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div>
      {items.map((item, i) => <TimelineItem key={item.id} item={item} isLast={i === items.length - 1} />)}
    </div>
  );
}
