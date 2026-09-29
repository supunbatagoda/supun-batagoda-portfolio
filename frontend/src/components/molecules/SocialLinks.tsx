import ExternalLink from "@/components/atoms/ExternalLink";

export default function SocialLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="flex items-center gap-5 font-mono text-[12.5px] text-paper/55">
      {links.map((l, i) => (
        <span key={l.label} className="flex items-center gap-5">
          {i > 0 && <span className="opacity-30">/</span>}
          <ExternalLink href={l.href}>{l.label}</ExternalLink>
        </span>
      ))}
    </div>
  );
}
