import type { Metadata } from "next";
import { AppIcon } from "@/components/AppIcon";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  CATALOG_ORIGIN,
  KIND_SECTIONS,
  getOtherProducts,
  type Product,
} from "@/lib/apps";
import { pageMetadata } from "@/lib/metadata";
import { COMPANY_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Other apps",
  description:
    "The rest of what BitLion makes — iPhone apps, browser extensions and web tools, built by the same two-person shop as Auto Dark Mode.",
  path: "/apps",
});

export default async function AppsPage() {
  const products = await getOtherProducts();

  const sections = KIND_SECTIONS.map((section) => ({
    ...section,
    products: products?.filter((product) => product.kind === section.kind) ?? [],
  })).filter((section) => section.products.length > 0);

  return (
    <>
      <Nav />

      <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">
            From BitLion
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            Check out our other apps
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
            Auto Dark Mode is one of several small things we make. Same
            approach every time: do one job properly, ask for as little as
            possible, and stay out of the way.
          </p>
        </header>

        {sections.length > 0 ? (
          <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
            {sections.map((section) => (
              <section key={section.kind}>
                <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="text-sm text-muted text-pretty sm:max-w-md sm:text-right">
                    {section.lede}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-16 rounded-2xl border border-line bg-ink-raised p-6 text-[0.95rem] leading-relaxed text-muted">
            The catalog couldn&apos;t be loaded just now. Everything we make is
            listed at{" "}
            <a
              href={CATALOG_ORIGIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4"
            >
              bitlion.us
            </a>
            .
          </p>
        )}

        <section className="mt-16 rounded-3xl border border-line bg-ink-raised p-8 text-center sm:mt-20 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance">
            Everything in one place
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted text-pretty">
            The full catalog — including whatever shipped after this page was
            built — lives on our directory.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CATALOG_ORIGIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center rounded-full bg-gold px-7 text-[0.975rem] font-semibold text-ink transition-colors hover:bg-gold-deep"
            >
              Browse bitlion.us
            </a>
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center rounded-full border border-line px-7 text-[0.975rem] font-medium text-cream transition-colors hover:border-muted/60 hover:bg-white/4"
            >
              About BitLion
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  // Some accents (the deep greens and blues) are too dark to read as text on
  // a near-black card, so they are lifted toward the body color first.
  const accent = `color-mix(in oklab, ${product.accentColor ?? "#f5d76e"} 62%, var(--color-cream))`;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-ink-raised p-6 transition-colors hover:border-gold/30">
      <div className="flex items-start gap-4">
        <AppIcon
          src={product.icon}
          title={product.title}
          accentColor={product.accentColor}
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-semibold tracking-tight">{product.title}</h3>
            {product.comingSoon && <ComingSoonChip />}
          </div>
          {product.tagline && (
            <p className="mt-1 text-sm" style={{ color: accent }}>
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      {product.blurb && (
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted text-pretty">
          {product.blurb}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
        {product.category && (
          <span className="mr-auto font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
            {product.category}
          </span>
        )}
        {product.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.8rem] font-medium text-cream/90 transition-colors hover:border-gold/40 hover:text-gold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function ComingSoonChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-gold">
      <span className="size-1.5 rounded-full bg-gold" />
      Coming soon
    </span>
  );
}
