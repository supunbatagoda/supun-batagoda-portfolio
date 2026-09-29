import type { ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-12 text-4xl font-bold tracking-tight sm:text-5xl">{children}</h2>;
}
