import Link from "next/link";
import { InstallButton } from "./InstallButton";
import { SparkleMark } from "./SparkleMark";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-semibold tracking-tight"
        >
          <SparkleMark className="size-6 shrink-0 text-gold" />
          Auto Dark Mode
        </Link>

        <ul className="ml-auto hidden items-center gap-7 text-sm text-muted md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-cream">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <InstallButton
          size="md"
          className="ml-auto md:ml-0"
          label={
            <>
              <span className="sm:hidden">Install</span>
              <span className="hidden sm:inline">Add to Chrome</span>
            </>
          }
        />
      </nav>
    </header>
  );
}
