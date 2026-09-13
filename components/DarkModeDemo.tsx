"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's live demo: a mock browser window next to a replica of the
 * extension popup. Flipping the popup's switch runs the extension's real
 * inversion CSS (see globals.css) over the fake page, so what you see here is
 * what the extension does, not a picture of it.
 */
export function DarkModeDemo() {
  const [dark, setDark] = useState(false);
  const [siteEnabled, setSiteEnabled] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);
  const autoPlayTimer = useRef<number | undefined>(undefined);

  const on = dark && siteEnabled;

  // Flip it once, unprompted, the first time it scrolls into view - the whole
  // point of the section lands before anyone thinks to click anything.
  useEffect(() => {
    const node = frameRef.current;
    if (!node || hasAutoPlayed.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAutoPlayed.current) return;
        hasAutoPlayed.current = true;
        observer.disconnect();
        autoPlayTimer.current = window.setTimeout(() => {
          setDark(true);
          setSiteEnabled(true);
        }, 650);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(autoPlayTimer.current);
    };
  }, []);

  return (
    <div ref={frameRef} className="relative">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
        <BrowserFrame dark={on} />
        <PopupReplica
          dark={dark}
          siteEnabled={siteEnabled}
          onToggleDark={() => setDark((v) => !v)}
          onToggleSite={() => setSiteEnabled((v) => !v)}
        />
      </div>
    </div>
  );
}

function BrowserFrame({ dark }: { dark: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-raised shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-3 border-b border-line bg-ink-sunken px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#3a3a42]" />
          <span className="size-2.5 rounded-full bg-[#3a3a42]" />
          <span className="size-2.5 rounded-full bg-[#3a3a42]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-[#1c1c22] px-3 py-1.5 font-mono text-[0.7rem] text-muted">
          northwind-review.example
        </div>
        <span
          className={`hidden rounded-full px-2 py-0.5 font-mono text-[0.65rem] transition-colors sm:inline ${
            dark ? "bg-gold/15 text-gold" : "bg-[#1c1c22] text-muted"
          }`}
        >
          {dark ? "inverted" : "as served"}
        </span>
      </div>
      <MockPage dark={dark} />
    </div>
  );
}

/**
 * A deliberately ordinary light-mode article: white ground, dark text, one big
 * photo and a few small ones. Nothing here is styled for dark mode, which is
 * exactly the situation the extension exists for.
 */
function MockPage({ dark }: { dark: boolean }) {
  return (
    <div
      className="demo-page bg-white text-[#16161a] select-none"
      data-demo-dark={dark}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-[#e7e7ec] px-5 py-3.5 sm:px-7">
        <span className="text-[0.82rem] font-semibold tracking-tight">Northwind Review</span>
        <div className="hidden gap-5 text-[0.72rem] text-[#6b6b76] sm:flex">
          <span>Reporting</span>
          <span>Culture</span>
          <span>Archive</span>
        </div>
        <span className="rounded-full bg-[#16161a] px-3 py-1 text-[0.68rem] font-medium text-white">
          Subscribe
        </span>
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#8a8a96]">
          Long read
        </span>
        <h3 className="mt-2.5 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          The quiet hours, and the people who keep them
        </h3>

        <div
          data-demo-media
          className="mt-5 h-32 rounded-lg bg-[linear-gradient(115deg,#ffd9a0_0%,#ff9f7c_38%,#c98ce0_72%,#7fb4f5_100%)] sm:h-40"
        />

        <div className="mt-5 space-y-2">
          <Line w="w-full" />
          <Line w="w-[97%]" />
          <Line w="w-[91%]" />
          <Line w="w-[63%]" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            "linear-gradient(135deg,#8fd3c1,#3f8f7d)",
            "linear-gradient(135deg,#f3b0c3,#c9556f)",
            "linear-gradient(135deg,#a9b8f0,#5468b8)",
          ].map((bg) => (
            <div key={bg} className="rounded-lg border border-[#ececf1] p-2.5">
              <div data-demo-media className="h-10 rounded" style={{ backgroundImage: bg }} />
              <div className="mt-2 h-1.5 w-4/5 rounded-full bg-[#e2e2e9]" />
              <div className="mt-1.5 h-1.5 w-3/5 rounded-full bg-[#ececf1]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Line({ w }: { w: string }) {
  return <div className={`h-2 rounded-full bg-[#e4e4ea] ${w}`} />;
}

/** A replica of the extension's popup, sized and worded like the real one. */
function PopupReplica({
  dark,
  siteEnabled,
  onToggleDark,
  onToggleSite,
}: {
  dark: boolean;
  siteEnabled: boolean;
  onToggleDark: () => void;
  onToggleSite: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[15rem] rounded-2xl border border-line bg-ink-raised p-4 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] lg:mx-0">
      <div className="flex items-center gap-2 border-b border-line-soft pb-3">
        <span className="text-sm font-semibold tracking-tight">Auto Dark Mode</span>
      </div>

      <div className="mt-3 space-y-1">
        <Switch checked={dark} onChange={onToggleDark} label="Enable Auto Dark Mode" />
        <Switch checked={siteEnabled} onChange={onToggleSite} label="Enable for this site" />
      </div>

      <p className="mt-3 border-t border-line-soft pt-3 text-[0.68rem] leading-relaxed text-muted">
        Try the switches — this is the popup, and the window beside it is a real
        page being inverted.
      </p>
    </div>
  );
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 text-left transition-colors hover:bg-white/4"
    >
      <span
        className={`relative h-4.5 w-8 shrink-0 rounded-full transition-colors ${
          checked ? "bg-gold" : "bg-[#32323a]"
        }`}
      >
        <span
          className={`absolute top-0.5 size-3.5 rounded-full bg-white transition-[left] duration-200 ${
            checked ? "left-4" : "left-0.5"
          }`}
        />
      </span>
      <span className="text-[0.74rem] leading-tight text-cream">{label}</span>
    </button>
  );
}
