import type { ComponentProps } from "react";

export default function Label(props: ComponentProps<"label">) {
  return <label {...props} className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-muted" />;
}
