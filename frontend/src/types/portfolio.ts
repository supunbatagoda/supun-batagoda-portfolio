export interface NavItem { label: string; href: string }
export interface ExperienceItem {
  id: string; badge: string; period: string; title: string; note?: string;
  organization: string; description: string;
}
export interface SkillCategory {
  title: string; glyph: string; groups: { label: string; items: string[] }[];
}
export interface Project {
  id: string; title: string; description: string; tags: string[];
  variant: "featured" | "compact"; badge: string; href: string;
}
export interface TerminalEntry { key: string; value: string; tone?: "default" | "success" }
