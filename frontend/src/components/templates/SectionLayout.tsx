import type { ReactNode } from "react";
import SectionLabel from "@/components/atoms/SectionLabel";
import SectionTitle from "@/components/atoms/SectionTitle";

interface Props { id: string; label: string; title?: string; children: ReactNode }

export default function SectionLayout({ id, label, title, children }: Props) {
  return (
    <section id={id} className="relative z-[1] mx-auto max-w-[1180px] scroll-mt-16 px-6 py-20 sm:px-10">
      <SectionLabel>{label}</SectionLabel>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  );
}
