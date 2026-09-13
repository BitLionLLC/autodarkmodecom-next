/**
 * The extension's icon, redrawn as vector so it stays crisp at any size and
 * inherits `currentColor` wherever it is placed.
 */
export function SparkleMark({ className }: { className?: string }) {
  // A four-point sparkle: concave sides pulled toward the center by `waist`.
  const star = (cx: number, cy: number, r: number) => {
    const w = r * 0.22;
    return [
      `M${cx},${cy - r}`,
      `C${cx + w},${cy - w} ${cx + w},${cy - w} ${cx + r},${cy}`,
      `C${cx + w},${cy + w} ${cx + w},${cy + w} ${cx},${cy + r}`,
      `C${cx - w},${cy + w} ${cx - w},${cy + w} ${cx - r},${cy}`,
      `C${cx - w},${cy - w} ${cx - w},${cy - w} ${cx},${cy - r}`,
      "Z",
    ].join(" ");
  };

  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d={star(11.5, 13, 10)} />
      <path d={star(24, 8, 5)} />
      <path d={star(22, 23, 6.5)} />
    </svg>
  );
}
