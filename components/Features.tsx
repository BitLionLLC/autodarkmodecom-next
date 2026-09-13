import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
  wide?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "It knows when to stay out of the way",
    body: "Before changing anything, it samples what the page actually paints — the root background, the colors behind your text, and any dark-mode class the site sets on itself. Sites that are already dark are left completely alone, and that verdict is remembered per domain.",
    wide: true,
    icon: <EyeIcon />,
  },
  {
    title: "Photos still look like photos",
    body: "Images, video, canvases and frames get a second inversion that cancels the first, so they come back to their true colors instead of turning into negatives.",
    icon: <ImageIcon />,
  },
  {
    title: "No white flash",
    body: "It runs before the page paints. On a domain already known to be light, the theme is on from the first frame — there is no bright moment to squint through.",
    icon: <BoltIcon />,
  },
  {
    title: "Keeps up with the page",
    body: "Infinite feeds, single-page apps and lazily loaded carousels stay themed. New content is caught as it arrives, and media is re-measured when its real size finally lands.",
    icon: <RefreshIcon />,
  },
  {
    title: "Per-site switches",
    body: "One site whose design you'd rather keep? Turn it off for that domain and leave everything else dark. Your choices sync with your Chrome profile.",
    icon: <SlidersIcon />,
  },
  {
    title: "Nothing leaves your browser",
    body: "No analytics, no telemetry, no server. Color analysis happens on your device, and your preferences live in Chrome's own storage.",
    wide: true,
    icon: <ShieldIcon />,
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Why this one"
          title="Most dark mode extensions invert everything and hope."
          lede="This one looks at the page first. The difference is the hour you don't spend switching it off on the sites it wrecked."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className={`group rounded-2xl border border-line bg-ink-raised p-6 transition-colors hover:border-gold/30 ${
                feature.wide ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-line-soft bg-gold/8 text-gold transition-colors group-hover:bg-gold/14">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-balance">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-gold">
        {eyebrow}
      </span>
      <h2 className="mt-3.5 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-balance sm:text-[2.6rem]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-muted text-pretty sm:text-lg">{lede}</p>
      ) : null}
    </div>
  );
}

/* ---- icons: 20px stroke set, sized by the wrapper ---- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      {children}
    </svg>
  );
}

function EyeIcon() {
  return (
    <Svg>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" {...stroke} />
      <circle cx="12" cy="12" r="3" {...stroke} />
    </Svg>
  );
}

function ImageIcon() {
  return (
    <Svg>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" {...stroke} />
      <circle cx="8.5" cy="9.5" r="1.6" {...stroke} />
      <path d="m3.5 16.5 4.3-4a2 2 0 0 1 2.7 0l3 2.8m0 0 2-1.8a2 2 0 0 1 2.7 0l2.3 2.1m-7-.3 3 2.7" {...stroke} />
    </Svg>
  );
}

function BoltIcon() {
  return (
    <Svg>
      <path d="M13.2 2.5 4.8 13.2h6l-1.4 8.3 8.8-10.7h-6.2l1.2-8.3Z" {...stroke} />
    </Svg>
  );
}

function RefreshIcon() {
  return (
    <Svg>
      <path d="M20.5 12a8.5 8.5 0 0 1-14.7 5.8M3.5 12a8.5 8.5 0 0 1 14.7-5.8" {...stroke} />
      <path d="M18.4 2.6v3.9h-3.9M5.6 21.4v-3.9h3.9" {...stroke} />
    </Svg>
  );
}

function SlidersIcon() {
  return (
    <Svg>
      <path d="M5 3.5v6m0 5v5M12 3.5v3m0 5v12M19 3.5v10m0 5v2.5" {...stroke} />
      <circle cx="5" cy="12" r="2.2" {...stroke} />
      <circle cx="12" cy="9" r="2.2" {...stroke} />
      <circle cx="19" cy="16" r="2.2" {...stroke} />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg>
      <path d="M12 2.8 4.5 5.8v6c0 4.4 3.1 8.3 7.5 9.4 4.4-1.1 7.5-5 7.5-9.4v-6L12 2.8Z" {...stroke} />
      <path d="m8.8 12 2.3 2.3 4.1-4.4" {...stroke} />
    </Svg>
  );
}
