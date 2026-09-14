/**
 * The artwork behind every page's share card - the image LinkedIn, Facebook,
 * X, Slack and iMessage show when someone drops a link to the site.
 *
 * One renderer rather than one per route: the frame, the mark and the palette
 * are the brand, and only the words change from page to page. Rendered by
 * Satori through `next/og`, so the CSS here is the flexbox-only subset it
 * understands - no grid, no shorthand `background` beyond what's below, and
 * every container that holds more than one child needs an explicit `display`.
 */

/** 1200x630 is the size both Facebook and X document, and LinkedIn honours. */
export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

export const SHARE_CARD_CONTENT_TYPE = "image/png";

export type ShareCardProps = {
  /** First headline line, in plain white. */
  headline: string;
  /** Second headline line, in the brand yellow. Keep both under ~24 chars. */
  accent: string;
  /** A sentence of supporting copy. Roughly the page's meta description. */
  blurb: string;
};

export function ShareCard({ headline, accent, blurb }: ShareCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 86px",
        background:
          "radial-gradient(1100px 620px at 50% -160px, #26220f 0%, #0a0a0c 62%), #0a0a0c",
        color: "#f4f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#f5d76e" }}>
        <svg width="46" height="46" viewBox="0 0 32 32" fill="currentColor">
          <path d="M11.5,3 C13.7,10.8 13.7,10.8 21.5,13 C13.7,15.2 13.7,15.2 11.5,23 C9.3,15.2 9.3,15.2 1.5,13 C9.3,10.8 9.3,10.8 11.5,3 Z" />
          <path d="M24,3 C25.1,6.9 25.1,6.9 29,8 C25.1,9.1 25.1,9.1 24,13 C22.9,9.1 22.9,9.1 19,8 C22.9,6.9 22.9,6.9 24,3 Z" />
          <path d="M22,16.5 C23.4,21.6 23.4,21.6 28.5,23 C23.4,24.4 23.4,24.4 22,29.5 C20.6,24.4 20.6,24.4 15.5,23 C20.6,21.6 20.6,21.6 22,16.5 Z" />
        </svg>
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
          Auto Dark Mode
        </span>
      </div>

      <div
        style={{
          marginTop: 44,
          fontSize: 86,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -3.2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{headline}</span>
        <span style={{ color: "#f5d76e" }}>{accent}</span>
      </div>

      <div style={{ marginTop: 34, fontSize: 30, color: "#9a9aa6", maxWidth: 900 }}>
        {blurb}
      </div>
    </div>
  );
}
