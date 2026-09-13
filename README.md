# autodarkmode.com

Marketing site for [Auto Dark Mode](https://chromewebstore.google.com/detail/auto-dark-mode/ececpikikiadgencgepkdkafekilbakj),
a Chrome extension that turns light websites dark automatically.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

```bash
npm run dev
```

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site.ts` | Store URL, pricing plans, FAQ copy. Change the product here, not in components. |
| `app/page.tsx` | The landing page, plus its JSON-LD structured data. |
| `app/privacy/page.tsx` | Privacy policy — the URL the Chrome Web Store listing points at. |
| `app/opengraph-image.tsx` | Social card, generated at build time. |
| `components/DarkModeDemo.tsx` | The hero demo. |
| `app/globals.css` | Theme tokens and the demo's inversion CSS. |

## About the hero demo

The demo is not a video or a pair of screenshots. The mock page is real markup,
and flipping the popup switch applies the extension's own inversion CSS to it —
`invert(1) hue-rotate(180deg)` on the page, counter-inverted on media so photos
come back to their true colors. Those rules live at the bottom of
`app/globals.css` and are kept in sync with the extension's `THEME_CSS`.

The demo mirrors the extension's banner-sized rule too: the big photo carries
`data-demo-big` and dims to 65%, while the thumbnails stay near full brightness.

Note the filter order in those rules — `brightness(0.65) invert(1)
hue-rotate(180deg)`, dim **first**. A child's filter is applied to the child's
own rendering before the page's `invert(1)` runs on the composited result, so a
`brightness()` below 1 written *after* the counter-inversion gets inverted along
with everything else and lightens the element instead of dimming it. The
extension carried that bug through v1.4; keep the dim in front of the invert in
both places.

## Before launch

- `SUPPORT_EMAIL` in `lib/site.ts` is a placeholder.
- `SITE_URL` assumes `https://autodarkmode.com`; it feeds canonical URLs,
  `sitemap.xml` and `robots.txt`.
- The FAQ now says banner-sized artwork is dimmed. That is true of the
  extension's source but **not** of v1.4 in the Chrome Web Store, which still
  has the inverted-brightness bug. Ship the extension update before this copy
  goes live.
