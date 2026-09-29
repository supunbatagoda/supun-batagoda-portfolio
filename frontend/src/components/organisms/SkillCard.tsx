import MonoGlyph from "@/components/atoms/MonoGlyph";
import SkillGroup from "@/components/molecules/SkillGroup";
import type { SkillCategory } from "@/types/portfolio";

export default function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/45 p-[30px] backdrop-blur-[14px]">
      <div className="mb-[22px] flex items-center gap-3">
        <MonoGlyph className="text-[15px]">{category.glyph}</MonoGlyph>
        <h3 className="text-xl font-semibold">{category.title}</h3>
      </div>
      {category.groups.map((g) => <SkillGroup key={g.label} {...g} />)}
    </div>
  );
}
