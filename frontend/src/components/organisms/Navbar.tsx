import LogoMark from "@/components/atoms/LogoMark";
import Button from "@/components/atoms/Button";
import { NAV_ITEMS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-paper/[0.07] bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5 sm:px-10">
        <a href="#home" className="flex items-center gap-3">
          <LogoMark initials={PROFILE.initials} />
          <span className="font-mono text-[13px] text-paper/85">supun<span className="text-signal">.</span>dev</span>
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="font-mono text-[12.5px] text-paper/60 transition hover:text-paper">{n.label}</a>
              </li>
            ))}
          </ul>
          <Button href="#contact" className="px-3.5 py-2 font-mono text-xs">let&apos;s talk →</Button>
        </div>
      </div>
    </nav>
  );
}
