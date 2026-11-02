import { getWorkPage, workPages } from "@/data/work";
import { ogSize, renderOgImage } from "@/lib/og";
import { renderMotionBlurOgImage } from "@/lib/og/motion-blur";

export const size = ogSize;
export const contentType = "image/png";

const images: Record<string, () => Promise<Response>> = {
  "motion-blur": renderMotionBlurOgImage,
};

export function generateStaticParams() {
  return workPages.map((item) => ({ slug: item.href.split("/").at(-1) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const image = images[slug];
  if (image) return image();
  return renderOgImage(getWorkPage(slug)?.title ?? "Raphael Salaja");
}
