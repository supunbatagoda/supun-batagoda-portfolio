export default function LogoMark({ initials }: { initials: string }) {
  return (
    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-signal/50 bg-signal/5 font-mono text-sm font-semibold text-signal">
      {initials}
    </span>
  );
}
