import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { source } from "@/lib/fumadocs";
import { generateMetadataForPost } from "@/lib/site";

const ROOT = "work";

export function generateStaticParams() {
  return source.generateParams().map(({ slug }) => ({
    slug: slug.join("/"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage([ROOT, slug]);
  if (!page) notFound();

  return generateMetadataForPost(
    page.data.title,
    page.data.description ?? "Design Engineer",
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage([ROOT, slug]);

  if (!page) notFound();

  return <Article page={page} />;
}
