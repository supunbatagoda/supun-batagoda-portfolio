import Countdown from "@/components/Countdown";
import SubscribeForm from "@/components/SubscribeForm";

// Configurable launch date. Move to an env var later if it needs to change
// without a redeploy.
const LAUNCH_DATE = "2026-12-31T00:00:00+05:30";

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-xl rounded-lg border border-line bg-surface/60 shadow-[0_0_0_1px_rgba(36,48,74,0.4)] overflow-hidden">
        {/* terminal chrome */}
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 font-mono text-xs text-muted">
            portfolio.sh
          </span>
        </div>

        <div className="px-6 py-10 sm:px-10 sm:py-14 flex flex-col gap-8">
          <div>
            <p className="font-mono text-sm text-signal">$ whoami</p>
            <h1 className="mt-2 font-mono text-3xl sm:text-4xl font-medium text-paper tracking-tight">
              Supun Batagoda
            </h1>
            <p className="mt-1 text-muted">FULL-STACK ENGINEER</p>
          </div>

          <p className="text-paper/90 leading-relaxed">
            My portfolio is being built. In the meantime, leave your email and
            I&apos;ll let you know the moment it&apos;s live.
          </p>

          <div>
            <p className="mb-3 font-mono text-xs text-muted">
              $ time-until-launch
            </p>
            <Countdown launchDate={LAUNCH_DATE} />
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-muted">
              $ subscribe --email
            </p>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </main>
  );
}
