import { ogSize, renderOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(SITE_NAME);
}
