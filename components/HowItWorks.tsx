import { SectionHeading } from "./Features";
import { InstallButton } from "./InstallButton";

const STEPS = [
  {
    n: "01",
    title: "Install it",
    body: "One click from the Chrome Web Store. No sign-up form, no email, no onboarding tour to click through.",
  },
  {
    n: "02",
    title: "Flip it on for a site",
    body: "Open the popup on a page you want darkened and turn on the switch. The page inverts immediately, and the domain is remembered.",
  },
  {
    n: "03",
    title: "Forget it exists",
    body: "Every later visit is already dark from the first frame. Sites that ship their own dark theme are skipped, and you never think about it again.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line bg-ink-sunken">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, and two of them are optional after the first week."
        />

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="rounded-2xl border border-line bg-ink-raised p-6">
              <span className="font-mono text-sm text-gold">{step.n}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-gold/20 bg-gold/6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-lg font-semibold tracking-tight">Ready to stop squinting?</p>
            <p className="mt-1 text-sm text-muted">
              Free on your first ten sites. Nothing to cancel if you don&apos;t like it.
            </p>
          </div>
          <InstallButton className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
