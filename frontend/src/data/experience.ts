import type { ExperienceItem } from "@/types/portfolio";

export const EXPERIENCE: ExperienceItem[] = [
  { id: "opusxenta", badge: "O", period: "2020 — PRESENT", title: "Associate Technical Lead",
    organization: "OpusXenta Lanka (Pvt) Ltd, Malabe",
    description: "Architected OpusPay, a real-time payment gateway middleware for the Byond Cloud and Byond Pro platforms. Built event-driven APIs with Node.js and RabbitMQ, co-architected a Single-SPA micro-frontend platform, and mentored engineers." },
  { id: "virstack", badge: "V", period: "2020 — 2021", title: "Freelance Programmer", note: "(Part-time Contract)",
    organization: "Virstack Technology, USA",
    description: "Built Node.js backend services and serverless AWS Lambda functions for TaxGlobal, and designed the MySQL databases behind them." },
  { id: "intervest", badge: "I", period: "2015 — 2020", title: "Software Engineer / Senior Software Engineer",
    organization: "Intervest Software Technologies (Pvt) Ltd, Colombo",
    description: "Delivered backend services and REST APIs with PHP, Laravel and Node.js for travel, insurance and e-commerce platforms. Customised enterprise WordPress sites for Staysure, Avanti and Expat." },
  { id: "digibrush", badge: "D", period: "2013 — 2015", title: "Web Developer",
    organization: "Digibrush Production (Pvt) Ltd, Colombo 06",
    description: "Built websites and e-commerce backends with PHP, WordPress, OpenCart and Magento for multiple client projects." },
  { id: "ucsc", badge: "U", period: "2010 — 2014", title: "Bachelor of Computer Science", note: "(Software Engineering)",
    organization: "University of Colombo (UCSC)",
    description: "Degree in computer science with a focus on software engineering." },
];
