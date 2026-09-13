import Link from "next/link";
import { CHROME_STORE_URL, COMPANY_URL, SUPPORT_EMAIL } from "@/lib/site";
import { SparkleMark } from "./SparkleMark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <SparkleMark className="size-5 text-gold" />
              Auto Dark Mode
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Dark mode for every site, automatically. A Chrome extension by BitLion.
            </p>
          </div>

          <nav className="flex gap-12 text-sm">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Product
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <a
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/90 transition-colors hover:text-gold"
                  >
                    Chrome Web Store
                  </a>
                </li>
                <li>
                  <Link href="/#pricing" className="text-cream/90 transition-colors hover:text-gold">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-cream/90 transition-colors hover:text-gold">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Company
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <Link href="/apps" className="text-cream/90 transition-colors hover:text-gold">
                    Other apps
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-cream/90 transition-colors hover:text-gold">
                    Privacy
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-cream/90 transition-colors hover:text-gold"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()}{" "}
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-gold"
          >
            BitLion LLC
          </a>
          . Chrome is a trademark of Google LLC.
        </p>
      </div>
    </footer>
  );
}
