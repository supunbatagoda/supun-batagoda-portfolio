import Image from "next/image";
import opuspayImage from "@/assets/img/opuspay.png";
import Button from "@/components/atoms/Button";
import Chip from "@/components/atoms/Chip";
import MonoGlyph from "@/components/atoms/MonoGlyph";
import ExternalLink from "@/components/atoms/ExternalLink";
import type { Project } from "@/types/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  if (project.variant === "featured") {
    return (
      <div className="mb-6 grid overflow-hidden rounded-[18px] border border-line bg-surface/45 backdrop-blur-[14px] md:grid-cols-2">
        <div className="p-8 sm:p-11">
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="rounded-md border border-signal/30 px-2 py-1 font-mono text-[11px] text-signal">{project.badge}</span>
            <span className="font-mono text-[11px] text-muted">live</span>
          </div>
          <h3 className="mb-3.5 text-3xl font-bold tracking-tight">{project.title}</h3>
          <p className="mb-[22px] text-[15.5px] leading-relaxed text-paper/60">{project.description}</p>
          <div className="mb-[26px] flex flex-wrap gap-2">
            {project.tags.map((t) => <Chip key={t} variant="tech">{t}</Chip>)}
          </div>
          <Button href={project.href} className="px-[18px] py-2.5">Visit live ↗</Button>
        </div>
        <div className="relative min-h-[260px] overflow-hidden border-t border-line bg-[repeating-linear-gradient(135deg,rgba(242,169,59,0.06)_0,rgba(242,169,59,0.06)_14px,transparent_14px,transparent_28px)] md:border-l md:border-t-0">
          <Image
            src={opuspayImage}
            alt="OpusPay project screenshot"
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-7 backdrop-blur-[14px]">
      <div className="mb-4 flex items-start justify-between">
        <MonoGlyph className="text-[22px] opacity-70">{"{ }"}</MonoGlyph>
        <span className="rounded border border-line px-2 py-0.5 font-mono text-[10.5px] text-muted">{project.badge}</span>
      </div>
      <h3 className="mb-2 text-[19px] font-semibold">{project.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-paper/55">{project.description}</p>
      <div className="mb-4 flex flex-wrap gap-[7px]">
        {project.tags.map((t) => <Chip key={t} variant="muted">{t}</Chip>)}
      </div>
      <ExternalLink href={project.href} className="font-mono text-[13px] text-signal">Visit ↗</ExternalLink>
    </div>
  );
}
