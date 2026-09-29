import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-10 border-t border-paper/[0.08]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-[30px] font-mono text-[12.5px] text-paper/45 sm:px-10">
        <span>© {new Date().getFullYear()} {PROFILE.name} — built with care<span className="text-signal">.</span></span>
        <a href="#home" className="transition hover:text-paper">back to top ↑</a>
      </div>
    </footer>
  );
}
