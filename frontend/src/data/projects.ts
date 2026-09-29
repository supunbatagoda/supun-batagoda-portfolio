import type { Project } from "@/types/portfolio";

export const PROJECTS: Project[] = [
  { id: "opuspay", variant: "featured", badge: "FEATURED", title: "OpusPay", href: "https://opuspay.co/",
    description: "A payment gateway middleware connecting OpusXenta's Byond Cloud and Byond Pro platforms. I own its design, backend, integrations and maintenance, covering real-time payment processing and transaction visibility.",
    tags: ["Node.js", "Express.js", "RabbitMQ", "MySQL", "AWS", "Docker"] },
  { id: "byond-design", variant: "compact", badge: "DESIGN SYSTEM", title: "Byond Design Foundation",
    href: "http://ox-dev-byonddesign-foundation-101.s3-website-ap-southeast-1.amazonaws.com/",
    description: "A shared component and icon library documented in Storybook, keeping OpusXenta applications consistent and maintainable.",
    tags: ["Vue.js", "Storybook", "Single-SPA"] },
  { id: "staysure-golf", variant: "compact", badge: "HEADLESS CMS", title: "Staysure Golf", href: "https://golf.staysure.co.uk/",
    description: "A headless CMS integration built on Node.js, Redis and the WordPress REST API for a UK travel insurance brand.",
    tags: ["Node.js", "Redis", "WordPress"] },
];
