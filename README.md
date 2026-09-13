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

One rule from the extension is deliberately **not** mirrored here: its
`brightness(0.65)` on banner-sized media. Because a child's filter is applied
before the parent's inversion, a brightness below 1 on a counter-inverted
element ends up *lightening* it once the parent inverts. The site does not
demonstrate or claim that behavior while the extension ships it that way.

## Before launch

- `SUPPORT_EMAIL` in `lib/site.ts` is a placeholder.
- `SITE_URL` assumes `https://autodarkmode.com`; it feeds canonical URLs,
  `sitemap.xml` and `robots.txt`.
