/**
 * The BitLion catalog, read at build time from the company's own manifest so
 * that shipping a new app never means editing this site.
 *
 * The manifest splits products into three lists that carry different store
 * links (`apps`, `extensions`, `saas`). Everything here flattens them into one
 * shape the page can render without knowing which list an entry came from.
 */

import { SITE_URL } from "./site";

/** Where the manifest and its icons are served from. */
export const CATALOG_ORIGIN = "https://www.bitlion.us";

const CATALOG_URL = `${CATALOG_ORIGIN}/apps.json`;

/** This site's own product, which is omitted from its own "other apps" page. */
const CURRENT_PRODUCT_ID = "auto-dark-mode";

export type ProductKind = "app" | "extension" | "saas";

export type ProductLink = { label: string; href: string };

export type Product = {
  id: string;
  kind: ProductKind;
  title: string;
  tagline: string;
  blurb: string;
  category: string;
  icon: string | null;
  accentColor: string | null;
  comingSoon: boolean;
  links: ProductLink[];
};

type RawEntry = {
  id?: unknown;
  title?: unknown;
  tagline?: unknown;
  description?: unknown;
  shortDescription?: unknown;
  category?: unknown;
  icon?: unknown;
  accentColor?: unknown;
  comingSoon?: unknown;
  websiteUrl?: unknown;
  appStoreUrl?: unknown;
  playStoreUrl?: unknown;
  chromeWebStoreUrl?: unknown;
  firefoxAddonUrl?: unknown;
  edgeAddonUrl?: unknown;
  signupUrl?: unknown;
};

type RawCatalog = {
  apps?: unknown;
  extensions?: unknown;
  saas?: unknown;
};

export const KIND_SECTIONS: { kind: ProductKind; title: string; lede: string }[] = [
  {
    kind: "app",
    title: "Apps",
    lede: "Built for iPhone, and for the parts of the day a browser can't reach.",
  },
  {
    kind: "extension",
    title: "Browser extensions",
    lede: "Small pieces of software that change how a page behaves, the way this one does.",
  },
  {
    kind: "saas",
    title: "On the web",
    lede: "Nothing to install — open it and start.",
  },
];

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** Icons are given as site-root paths in the manifest, so they need an origin. */
function absoluteIcon(value: unknown): string | null {
  const icon = str(value);
  if (!icon) return null;
  if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
  return `${CATALOG_ORIGIN}${icon.startsWith("/") ? "" : "/"}${icon}`;
}

/** Hex accents are appended with an alpha pair, so anything else is dropped. */
function accent(value: unknown): string | null {
  const color = str(value);
  return color && /^#[0-9a-f]{6}$/i.test(color) ? color : null;
}

function links(entry: RawEntry, kind: ProductKind): ProductLink[] {
  const candidates: [string, unknown][] =
    kind === "extension"
      ? [
          ["Chrome Web Store", entry.chromeWebStoreUrl],
          ["Firefox Add-ons", entry.firefoxAddonUrl],
          ["Edge Add-ons", entry.edgeAddonUrl],
          ["Website", entry.websiteUrl],
        ]
      : kind === "saas"
        ? [
            ["Open it", entry.signupUrl],
            ["Website", entry.websiteUrl],
          ]
        : [
            ["App Store", entry.appStoreUrl],
            ["Google Play", entry.playStoreUrl],
            ["Website", entry.websiteUrl],
          ];

  const seen = new Set<string>();
  const result: ProductLink[] = [];
  for (const [label, value] of candidates) {
    const href = str(value);
    // A SaaS product usually lists the same URL as both site and signup.
    if (!href || seen.has(href)) continue;
    seen.add(href);
    result.push({ label, href });
  }
  return result;
}

function normalize(value: unknown, kind: ProductKind): Product[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((raw): Product | null => {
      const entry = raw as RawEntry;
      const id = str(entry.id);
      const title = str(entry.title);
      if (!id || !title) return null;

      return {
        id,
        kind,
        title,
        tagline: str(entry.tagline) ?? "",
        blurb: str(entry.shortDescription) ?? str(entry.description) ?? "",
        category: str(entry.category) ?? "",
        icon: absoluteIcon(entry.icon),
        accentColor: accent(entry.accentColor),
        comingSoon: entry.comingSoon === true,
        links: links(entry, kind),
      };
    })
    .filter((product): product is Product => product !== null)
    .filter((product) => product.id !== CURRENT_PRODUCT_ID && !isThisSite(product))
    // Things you can actually use today come before things you can't.
    .sort((a, b) => Number(a.comingSoon) - Number(b.comingSoon));
}

/** Belt and braces: drop anything pointing at this site, whatever its id is. */
function isThisSite(product: Product): boolean {
  const host = new URL(SITE_URL).hostname.replace(/^www\./, "");
  return product.links.some((link) => {
    try {
      return new URL(link.href).hostname.replace(/^www\./, "") === host;
    } catch {
      return false;
    }
  });
}

/**
 * Returns the catalog grouped by kind, or `null` if the manifest can't be read.
 * A page about other products is not worth a 500, so callers fall back to a
 * plain link to bitlion.us instead.
 */
export async function getOtherProducts(): Promise<Product[] | null> {
  try {
    const response = await fetch(CATALOG_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return null;

    const catalog = (await response.json()) as RawCatalog;
    return [
      ...normalize(catalog.apps, "app"),
      ...normalize(catalog.extensions, "extension"),
      ...normalize(catalog.saas, "saas"),
    ];
  } catch {
    return null;
  }
}
