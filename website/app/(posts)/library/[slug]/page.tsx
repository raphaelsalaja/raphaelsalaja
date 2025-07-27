import { notFound } from "next/navigation";
import { source } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

const ROOT = "library";

export function generateStaticParams() {
  return source.generateParams().map(({ slug }) => ({
    slug: slug.join("/"),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = source.getPage([ROOT, params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = source.getPage([ROOT, params.slug]);
  if (!page) notFound();

  const { title, date } = page.data;
  const MDXContent = page.data.body;

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <time>{date && <time>{date}</time>}</time>
      </header>
      <MDXContent components={getMDXComponents()} />
    </article>
  );
}
