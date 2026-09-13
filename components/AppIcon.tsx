"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A product icon from the BitLion catalog. The manifest lists icons for things
 * that haven't shipped one yet, so a missing file falls back to a monogram in
 * the product's own accent color rather than a broken image.
 */
export function AppIcon({
  src,
  title,
  accentColor,
  className = "",
}: {
  src: string | null;
  title: string;
  accentColor: string | null;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const accent = accentColor ?? "#f5d76e";
  // The monogram sits on the accent's own tint, so it needs lifting the same
  // way card text does.
  const monogram = `color-mix(in oklab, ${accent} 62%, var(--color-cream))`;

  return (
    <span
      className={`relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${className}`}
      style={{ borderColor: `${accent}3d`, backgroundColor: `${accent}14` }}
    >
      {src && !broken ? (
        <Image
          src={src}
          alt=""
          width={56}
          height={56}
          className="size-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-mono text-xl font-semibold"
          style={{ color: monogram }}
        >
          {title.slice(0, 1).toUpperCase()}
        </span>
      )}
    </span>
  );
}
