import TerminalHeader from "@/components/molecules/TerminalHeader";
import TerminalLine from "@/components/molecules/TerminalLine";
import { TERMINAL_ENTRIES } from "@/data/profile";

const prompt = <span className="text-[#27c93f]">$</span>;

export default function ProfileTerminal() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-paper/10 bg-surface/60 shadow-[0_30px_70px_rgba(0,0,0,0.45)] backdrop-blur-lg">
      <TerminalHeader title="~/supun — zsh" />
      <div className="px-[22px] py-5 font-mono text-[13.5px] leading-[26px]">
        <div className="text-muted">{prompt} whoami</div>
        <div className="mb-2">supun_batagoda</div>
        <div className="text-muted">{prompt} cat profile.json</div>
        <div className="text-paper/55">{"{"}</div>
        {TERMINAL_ENTRIES.map((e, i) => <TerminalLine key={e.key} entry={e} last={i === TERMINAL_ENTRIES.length - 1} />)}
        <div className="text-paper/55">{"}"}</div>
        <div className="mt-1.5 text-muted">{prompt} <span className="inline-block h-[17px] w-[9px] bg-signal align-[-3px]" /></div>
      </div>
    </div>
  );
}
