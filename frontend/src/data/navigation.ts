import type { NavItem } from "@/types/portfolio";

export const NAV_ITEMS: NavItem[] = ["home", "about", "experience", "skills", "projects", "contact"].map(
  (s) => ({ label: s, href: `#${s}` })
);
