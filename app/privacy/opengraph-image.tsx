import { ImageResponse } from "next/og";
import {
  SHARE_CARD_CONTENT_TYPE,
  SHARE_CARD_SIZE,
  ShareCard,
} from "@/lib/share-card";

export const alt = "Auto Dark Mode privacy — nothing is collected";
export const size = SHARE_CARD_SIZE;
export const contentType = SHARE_CARD_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <ShareCard
        headline="Nothing leaves"
        accent="your browser."
        blurb="No analytics, no telemetry, no server of its own. The extension's own code makes zero network requests."
      />
    ),
    size,
  );
}
