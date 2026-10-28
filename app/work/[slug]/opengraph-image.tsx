import { getWorkPage, workPages } from "@/data/work";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return workPages.map((item) => ({ slug: item.href.split("/").at(-1) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return renderOgImage(getWorkPage(slug)?.title ?? "Raphael Salaja");
}
