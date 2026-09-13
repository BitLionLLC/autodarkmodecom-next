import type { ReactNode } from "react";
import { CHROME_STORE_URL } from "@/lib/site";

const SIZES = {
  lg: "h-13 px-7 text-[0.975rem]",
  md: "h-10 px-4.5 text-sm",
} as const;

export function InstallButton({
  size = "lg",
  label = "Add to Chrome — free",
  className = "",
}: {
  size?: keyof typeof SIZES;
  label?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gold font-semibold text-ink
        shadow-[0_0_0_1px_rgba(245,215,110,0.5),0_14px_40px_-12px_rgba(245,215,110,0.55)]
        transition hover:bg-gold-deep hover:shadow-[0_0_0_1px_rgba(245,215,110,0.7),0_18px_50px_-12px_rgba(245,215,110,0.7)]
        active:translate-y-px ${SIZES[size]} ${className}`}
    >
      <ChromeGlyph className={size === "lg" ? "size-5" : "size-4"} />
      {label}
    </a>
  );
}

function ChromeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 8h9.2M12 8 7.4 16.1M12 8 2.9 7.2M12 16l4.6-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
