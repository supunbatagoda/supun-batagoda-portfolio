import type { SkillCategory } from "@/types/portfolio";

export const SKILLS: SkillCategory[] = [
  { title: "Front-End", glyph: "{ }", groups: [
    { label: "Languages", items: ["JavaScript", "TypeScript"] },
    { label: "Frameworks", items: ["Vue.js", "React", "Single-SPA"] },
    { label: "Design Systems", items: ["Storybook", "Component Libraries"] } ] },
  { title: "Back-End", glyph: "[ ]", groups: [
    { label: "Languages", items: ["Node.js", "PHP", "SQL"] },
    { label: "Frameworks", items: ["Express.js", "Laravel"] },
    { label: "Architecture", items: ["REST APIs", "Microservices", "Event-Driven"] } ] },
  { title: "Payments & Data", glyph: "$_", groups: [
    { label: "Payments", items: ["Gateway Integration", "Real-Time Processing", "Reconciliation"] },
    { label: "Databases", items: ["MySQL", "MongoDB", "Redis"] },
    { label: "Messaging", items: ["RabbitMQ"] } ] },
  { title: "Cloud & Tooling", glyph: "</>", groups: [
    { label: "Cloud", items: ["AWS (EC2, Lambda, RDS, S3)", "Serverless"] },
    { label: "DevOps", items: ["Docker", "Jenkins", "CI/CD"] },
    { label: "Quality", items: ["SonarQube", "Vitest", "Codeception", "Swagger"] } ] },
];

export const MARQUEE = ["Node.js", "Laravel", "PHP", "Vue.js", "TypeScript", "RabbitMQ", "AWS", "Docker"];
