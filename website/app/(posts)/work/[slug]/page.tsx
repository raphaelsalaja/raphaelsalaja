import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import * as Breadcrumb from "@/components/breadcrumb";
import { workPages } from "@/data/work";
import { source } from "@/lib/fumadocs";
import { workDemos } from "@/lib/mdx-demos";
import { generateMetadataForPost } from "@/lib/site";

const ROOT = "work";

export const dynamicParams = false;

export function generateStaticParams() {
  return workPages.map((item) => ({
    slug: item.href.split("/").at(-1) ?? "",
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage([ROOT, slug]);
  if (!page || page.data.draft) notFound();

  return generateMetadataForPost(
    page.data.title,
    page.data.description ?? "Design Engineer",
    `/${ROOT}/${slug}`,
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage([ROOT, slug]);
  if (!page || page.data.draft) notFound();
  const item = workPages.find((entry) => entry.href === `/${ROOT}/${slug}`);

  return (
    <>
      <Breadcrumb.Slug page={ROOT} slug={item?.title ?? page.data.title} />
      <Article page={page} components={await workDemos(slug)} />
    </>
  );
}
