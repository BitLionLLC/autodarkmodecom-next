import { DarkModeDemo } from "./DarkModeDemo";
import { InstallButton } from "./InstallButton";
import { FREE_SITE_LIMIT } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-glow">
      <div className="pointer-events-none absolute inset-0 grid-veil" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">
            Chrome extension
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance sm:text-6xl">
            Every site goes dark.
            <br />
            <span className="text-gold">You do nothing.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            Auto Dark Mode turns light websites dark as they load — before the
            page paints, not after it blinds you. It leaves sites that are
            already dark alone, and keeps your photos and video looking the way
            they should.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <InstallButton />
            <a
              href="#how"
              className="inline-flex h-13 items-center justify-center rounded-full border border-line px-7 text-[0.975rem] font-medium text-cream transition-colors hover:border-muted/60 hover:bg-white/4"
            >
              See how it works
            </a>
          </div>

          <p className="mt-4 font-mono text-[0.72rem] text-muted/80">
            Free on your first {FREE_SITE_LIMIT} sites · No account · Nothing leaves your browser
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <DarkModeDemo />
        </div>
      </div>
    </section>
  );
}
