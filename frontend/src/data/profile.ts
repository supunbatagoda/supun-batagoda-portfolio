import type { TerminalEntry } from "@/types/portfolio";

export const PROFILE = {
  name: "Supun Batagoda",
  initials: "SB",
  tagline: "// senior full-stack engineer · technical lead",
  intro:
    "I design and ship scalable backend systems and full-stack web applications, from real-time payment platforms to the interfaces built on top of them.",
  aboutLead:
    "I'm a senior engineer with 10+ years of experience who believes in reliable systems that hold up under real transaction volume.",
  aboutBody:
    "I lead backend architecture for high-volume platforms across fintech, travel, insurance and e-commerce. On the front end I work with Vue.js, micro-frontends and Storybook-documented design systems.",
  since: 2013,
  email: "supunmbatagoda@gmail.com",
  phone: "(+94) 76 765 4653",
  phoneHref: "tel:+94767654653",
  github: "https://github.com/supunbatagoda",
  linkedin: "https://www.linkedin.com/in/supunbatagoda/",
  available: true,
  stats: [
    { label: "ROLE", value: "Technical Lead" },
    { label: "FOCUS", value: "Full-Stack" },
    { label: "BASED", value: "Sri Lanka" },
  ],
};

export const TERMINAL_ENTRIES: TerminalEntry[] = [
  { key: "role", value: '"Senior Full-Stack Engineer"' },
  {
    key: "focus",
    value: '["payments", "back-end", "micro-frontends]',
  },
  { key: "stack", value: '["Node", "Laravel", "Vue", "MySQL"]' },
  { key: "based", value: '"Sri Lanka"' },
  { key: "status", value: '"open_to_work"', tone: "success" },
];
