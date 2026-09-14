import type { Metadata } from "next";

/**
 * Shared link-preview plumbing.
 *
 * Next merges metadata one top-level key at a time, so a page that declares its
 * own `openGraph` replaces the layout's entirely - og:type, og:site_name and
 * og:locale silently vanish, and `twitter` drops back to a small `summary`
 * card. Every page goes through `pageMetadata` so those can't be forgotten.
 */

export const SITE_NAME = "Auto Dark Mode";

/** Matches the `title.template` in app/layout.tsx. */
const TITLE_SUFFIX = ` — ${SITE_NAME}`;

/** What every page's Open Graph block carries regardless of route. */
export const OPEN_GRAPH_DEFAULTS = {
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
} as const;

type PageMetadata = {
  /** Bare page title, without the site suffix - `<title>` gets it from the template. */
  title: string;
  description: string;
  /** Route-absolute path, e.g. "/privacy". Resolved against `metadataBase`. */
  path: string;
};

/**
 * Metadata for a page below the root layout: the tab title and description, a
 * canonical URL, and full Open Graph and Twitter cards pointing at this page
 * rather than the homepage. The card image comes from the `opengraph-image`
 * file sitting next to the page.
 */
export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  const socialTitle = `${title}${TITLE_SUFFIX}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      title: socialTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
