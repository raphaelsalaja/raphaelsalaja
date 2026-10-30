import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { getPost, posts } from "@/data/library";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/library/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return createMetadata({
    ...post,
    path: `/library/${slug}`,
    publishedTime: post.date,
  });
}

export default async function Page(props: PageProps<"/library/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(
    `@/content/library/${slug}/index.mdx`
  );

  return (
    <Article
      title={post.title}
      description={post.description}
      date={post.date}
      path={`/library/${slug}`}
      Content={Content}
    />
  );
}
