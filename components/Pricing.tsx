import { SectionHeading } from "./Features";
import { CHROME_STORE_URL, PLANS } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Pricing"
          title="Cheaper than the coffee you're drinking to stay awake."
          lede="Start free on ten sites. When you want the rest of the web, pick whichever number annoys you least."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.featured
                  ? "border-gold/45 bg-gold/6 shadow-[0_0_0_1px_rgba(245,215,110,0.12),0_30px_70px_-40px_rgba(245,215,110,0.5)]"
                  : "border-line bg-ink-raised"
              }`}
            >
              {plan.badge ? (
                <span className="absolute -top-2.5 left-6 rounded-full bg-gold px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-ink">
                  {plan.badge}
                </span>
              ) : null}

              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {plan.name}
              </h3>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-[-0.03em]">{plan.price}</span>
                <span className="text-xs text-muted">{plan.cadence}</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{plan.blurb}</p>

              <ul className="mt-5 space-y-2.5 border-t border-line-soft pt-5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check className={plan.featured ? "text-gold" : "text-gold/70"} />
                    <span className="leading-snug text-cream/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-gold text-ink hover:bg-gold-deep"
                    : "border border-line text-cream hover:border-muted/60 hover:bg-white/4"
                }`}
              >
                {plan.price === "$0" ? "Start free" : "Get Auto Dark Mode"}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Paid plans are purchased from inside the extension. Payments are handled by
          ExtensionPay and processed by Stripe — we never see your card details.
        </p>
      </div>
    </section>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 size-4 shrink-0 ${className}`} aria-hidden="true">
      <path
        d="m4.5 10.5 3.6 3.5 7.4-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
