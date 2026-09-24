"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  /** ISO date string (with timezone) the countdown counts down to. */
  launchDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;

  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "days" },
  { key: "hours", label: "hrs" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
];

export default function Countdown({ launchDate }: CountdownProps) {
  const target = new Date(launchDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  if (!timeLeft) {
    return (
      <p className="font-mono text-sm tracking-tight text-signal">Coming Soon</p>
    );
  }

  return (
    <div
      className="flex gap-4 sm:gap-6"
      role="timer"
      aria-live="polite"
      aria-label="Time remaining until launch"
    >
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <span className="font-mono text-2xl sm:text-3xl text-paper tabular-nums">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[11px] text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
