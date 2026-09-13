/**
 * Single source of truth for everything about the product that appears on the
 * site. Copy lives next to the thing it describes, so a price change or a new
 * store listing is one edit here rather than a hunt through components.
 */

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/auto-dark-mode/ececpikikiadgencgepkdkafekilbakj";

export const SITE_URL = "https://autodarkmode.com";

/** TODO: swap in the real support inbox before launch. */
export const SUPPORT_EMAIL = "support@example.com";

/** Domains you can theme before a subscription is needed. Mirrors FREE_USES_LIMIT. */
export const FREE_SITE_LIMIT = 10;

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Try it on the sites you read most.",
    features: [
      `Up to ${FREE_SITE_LIMIT} sites`,
      "Every theming feature, nothing held back",
      "No account, no card",
    ],
  },
  {
    name: "Monthly",
    price: "$0.99",
    cadence: "per month",
    blurb: "Unlimited sites, cancel whenever.",
    features: ["Unlimited sites", "Settings sync across your Chrome profile", "Cancel anytime"],
  },
  {
    name: "Yearly",
    price: "$4.99",
    cadence: "per year",
    blurb: "The same thing, for less than five dollars.",
    features: ["Unlimited sites", "Settings sync across your Chrome profile", "Under 42¢ a month"],
    featured: true,
    badge: "Best value",
  },
  {
    name: "Lifetime",
    price: "$9.99",
    cadence: "once",
    blurb: "Pay once and stop thinking about it.",
    features: ["Unlimited sites", "All future updates included", "No recurring charge"],
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Does it break sites that already have a dark theme?",
    a: "No. Before touching anything, Auto Dark Mode samples what the page actually paints — the root background, the colors behind your text, and any dark-mode class the site sets on itself. If the page is already dark it leaves it completely alone, and remembers that verdict so it never second-guesses on your next visit.",
  },
  {
    q: "Why aren't my photos inverted into weird negatives?",
    a: "Because images, video, canvases and embedded frames get a second inversion applied on top of the page's, which cancels out and returns them to their true colors. Text, backgrounds and borders flip to a dark theme; the things you actually want to look at are left looking like themselves.",
  },
  {
    q: "Will I see a white flash before it kicks in?",
    a: "On a site you've visited before, no. The content script runs at document_start, before the page paints, and on a domain already known to be light it inverts immediately. The first visit to a brand-new domain waits for the DOM, because guessing wrong the other way would flash bright white instead.",
  },
  {
    q: "What about pages that load content as I scroll?",
    a: "A mutation observer watches for new nodes and themes them as they arrive, and a resize observer tracks media whose size only becomes known later — carousel slides, lazily loaded images. Infinite feeds and single-page apps stay themed as you move through them.",
  },
  {
    q: "Can I turn it off for one specific site?",
    a: "Yes. The popup has a per-site switch alongside the global one, and your choice is remembered for that domain. Turn it off on the one site whose design you'd rather keep, and every other site stays dark.",
  },
  {
    q: "What data do you collect?",
    a: "None. Auto Dark Mode has no analytics, no telemetry, and no server of its own — the extension's own code makes zero network requests. Color analysis happens on your device, and your preferences live in Chrome's storage. Subscriptions are handled by ExtensionPay, which processes payment through Stripe; we never see your card.",
  },
];
