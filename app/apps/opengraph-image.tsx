import { ImageResponse } from "next/og";
import {
  SHARE_CARD_CONTENT_TYPE,
  SHARE_CARD_SIZE,
  ShareCard,
} from "@/lib/share-card";

export const alt = "Other apps from BitLion";
export const size = SHARE_CARD_SIZE;
export const contentType = SHARE_CARD_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <ShareCard
        headline="The rest of"
        accent="what BitLion makes."
        blurb="iPhone apps, browser extensions and web tools — built by the same two-person shop as Auto Dark Mode."
      />
    ),
    size,
  );
}
