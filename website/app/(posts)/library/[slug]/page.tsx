import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import * as Breadcrumb from "@/components/breadcrumb";
import { getLibraryPages, source } from "@/lib/fumadocs";
import { libraryDemos } from "@/lib/mdx-demos";
import { generateMetadataForPost } from "@/lib/site";

const ROOT = "library";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLibraryPages().map((page) => ({
    slug: page.slugs[1],
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

  return (
    <>
      <Breadcrumb.Essay title={page.data.title} />
      <Article page={page} components={await libraryDemos(slug)} />
    </>
  );
}
