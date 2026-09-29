import Image from "next/image";
import portrait from "@/assets/img/supun_batagoda.png";
import Button from "@/components/atoms/Button";
import MonoGlyph from "@/components/atoms/MonoGlyph";
import StatusBadge from "@/components/atoms/StatusBadge";
import ExternalLink from "@/components/atoms/ExternalLink";
import SocialLinks from "@/components/molecules/SocialLinks";
import StatCell from "@/components/molecules/StatCell";
import ProfileTerminal from "@/components/organisms/ProfileTerminal";
import Timeline from "@/components/organisms/Timeline";
import SkillCard from "@/components/organisms/SkillCard";
import TechMarquee from "@/components/organisms/TechMarquee";
import ProjectCard from "@/components/organisms/ProjectCard";
import ContactForm from "@/components/organisms/ContactForm";
import PageShell from "@/components/templates/PageShell";
import SectionLayout from "@/components/templates/SectionLayout";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE } from "@/data/experience";
import { SKILLS, MARQUEE } from "@/data/skills";
import { PROJECTS } from "@/data/projects";

const dot = <span className="text-signal">.</span>;
const socials = [
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "GitHub", href: PROFILE.github },
  { label: "Email", href: `mailto:${PROFILE.email}` },
];

function Hero() {
  return (
    <section id="home" className="relative z-[1] mx-auto grid max-w-[1180px] items-center gap-16 px-6 pb-20 pt-36 sm:px-10 md:grid-cols-2">
      <div>
        {PROFILE.available && <div className="mb-[26px]"><StatusBadge>available for work</StatusBadge></div>}
        <div className="mb-3.5 font-mono text-[13px] text-paper/50">{PROFILE.tagline}</div>
        <h1 className="mb-[22px] text-5xl font-bold leading-[1] tracking-tighter sm:text-7xl lg:text-[82px]">{PROFILE.name}{dot}</h1>
        <p className="mb-8 max-w-[480px] text-[19px] leading-[1.6] text-paper/65">{PROFILE.intro}</p>
        <div className="mb-[30px] flex flex-wrap gap-3.5">
          <Button href="#projects">View my work →</Button>
          <Button href="#contact" variant="outline">Get in touch</Button>
        </div>
        <SocialLinks links={socials} />
      </div>
      <ProfileTerminal />
    </section>
  );
}

function About() {
  return (
    <SectionLayout id="about" label="// 01 — about">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-6 text-2xl font-medium leading-snug tracking-tight sm:text-[30px]">{PROFILE.aboutLead}</p>
          <p className="mb-7 leading-relaxed text-paper/60">{PROFILE.aboutBody}</p>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-paper/[0.08] bg-paper/[0.08]">
            {PROFILE.stats.map((s) => <StatCell key={s.label} {...s} />)}
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-paper/10 bg-surface">
            <Image
              src={portrait}
              alt="Portrait of Supun Batagoda"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-3.5 -right-3.5 rounded-[10px] bg-signal px-3.5 py-2.5 font-mono text-xs font-semibold text-ink shadow-[0_10px_30px_rgba(242,169,59,0.3)]">
            &lt;/&gt; since {PROFILE.since}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

function Contact() {
  return (
    <SectionLayout id="contact" label="// 05 — contact">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-[22px] text-4xl font-bold leading-[1.02] tracking-tighter sm:text-[56px]">Let&apos;s build something{dot}</h2>
          <p className="mb-8 max-w-[420px] leading-relaxed text-paper/60">
            Got something on your mind? Share your idea and let&apos;s talk.
          </p>
          <div className="flex flex-col gap-4 text-[15px]">
            <ExternalLink href={`mailto:${PROFILE.email}`} className="flex items-center gap-3"><MonoGlyph className="text-[13px]">✉</MonoGlyph>{PROFILE.email}</ExternalLink>
            <ExternalLink href={PROFILE.phoneHref} className="flex items-center gap-3"><MonoGlyph className="text-[13px]">☎</MonoGlyph>{PROFILE.phone}</ExternalLink>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={PROFILE.github} variant="outline" className="rounded-xl px-7 py-4 font-mono text-base">GitHub ↗</Button>
              <Button href={PROFILE.linkedin} variant="outline" className="rounded-xl px-7 py-4 font-mono text-base">LinkedIn ↗</Button>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionLayout>
  );
}

export default function PortfolioPage() {
  return (
    <PageShell>
      <Hero />
      <About />
      <SectionLayout id="experience" label="// 02 — experience" title="Career progression">
        <Timeline items={EXPERIENCE} />
      </SectionLayout>
      <SectionLayout id="skills" label="// 03 — skills" title="Areas of expertise">
        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((c) => <SkillCard key={c.title} category={c} />)}
        </div>
        <TechMarquee items={MARQUEE} />
      </SectionLayout>
      <SectionLayout id="projects" label="// 04 — selected work" title="Featured projects">
        {PROJECTS.filter((p) => p.variant === "featured").map((p) => <ProjectCard key={p.id} project={p} />)}
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.filter((p) => p.variant === "compact").map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </SectionLayout>
      <Contact />
    </PageShell>
  );
}
