import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = { variant?: "primary" | "outline"; href?: string } & Omit<ComponentProps<"button">, "href">;

const styles = {
  primary: "bg-signal text-ink font-semibold hover:opacity-90",
  outline: "border border-paper/20 text-paper font-medium hover:border-signal",
};

export default function Button({ variant = "primary", href, className, children, ...rest }: Props) {
  const cls = cn("inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm transition", styles[variant], className);
  return href ? <a href={href} className={cls}>{children}</a> : <button className={cls} {...rest}>{children}</button>;
}
