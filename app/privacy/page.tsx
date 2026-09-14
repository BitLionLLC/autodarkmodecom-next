import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { pageMetadata } from "@/lib/metadata";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "Auto Dark Mode collects nothing. No analytics, no telemetry, no server. Here is exactly what the extension touches and why.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Privacy</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
          Auto Dark Mode has no analytics, no telemetry and no server of its own.
          The extension&apos;s own code makes zero network requests.
        </p>

        <div className="mt-12 space-y-10">
          <Block title="What the extension reads">
            <p>
              To decide whether a page needs darkening, the content script reads
              colors that the page has already painted — the root background, the
              backgrounds behind text, and any dark-mode class the site sets on
              itself. It also measures the size and position of images and video
              so that they can be handed back their real colors.
            </p>
            <p>
              All of this happens inside your browser, on the page you are already
              looking at. None of it is transmitted anywhere.
            </p>
          </Block>

          <Block title="What is stored, and where">
            <p>
              Two things are saved, both using Chrome&apos;s own extension storage:
              your on/off preferences (globally and per domain), and a small
              record of which domains were found to be light or dark, so repeat
              visits never flash.
            </p>
            <p>
              Preferences use Chrome&apos;s synced storage, which means they follow
              your Chrome profile across your signed-in devices, under Google&apos;s
              terms rather than ours. The light/dark verdicts stay on the local
              device. Uninstalling the extension removes this data.
            </p>
          </Block>

          <Block title="Payments">
            <p>
              Subscriptions and the lifetime purchase are handled by ExtensionPay,
              which processes payment through Stripe. Your card details go to
              Stripe and are never seen by us or by the extension. What comes back
              is a yes-or-no answer about whether your copy is paid for.
            </p>
          </Block>

          <Block title="What is never collected">
            <p>
              We do not collect browsing history, page contents, keystrokes, form
              data, IP-based analytics, or any personal identifier. There is no
              account to create and no profile to build. Nothing is sold or
              shared, because nothing is gathered in the first place.
            </p>
          </Block>

          <Block title="Permissions, and why each one exists">
            <ul className="list-disc space-y-2 pl-5 marker:text-gold">
              <li>
                <Term>Host access to all sites</Term> — the theme has to be able to
                apply on whichever site you turn it on for. The extension only
                acts on domains you have enabled.
              </li>
              <li>
                <Term>Storage</Term> — remembering your switches and the per-domain
                light/dark verdicts.
              </li>
              <li>
                <Term>Tabs</Term> — so the popup can tell which site you are
                currently on and label its per-site switch correctly.
              </li>
            </ul>
          </Block>

          <Block title="Questions">
            <p>
              Write to{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-gold underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>
              . If this policy changes, the date below changes with it.
            </p>
          </Block>
        </div>

        <p className="mt-14 border-t border-line pt-6 font-mono text-xs text-muted">
          Last updated 12 September 2026
        </p>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
        {children}
      </div>
    </section>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-cream">{children}</strong>;
}
