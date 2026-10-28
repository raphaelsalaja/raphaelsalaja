import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { Breadcrumb } from "@/components/breadcrumb";
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

  return createMetadata({ ...post, path: `/library/${slug}` });
}

export default async function Page(props: PageProps<"/library/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/library/${slug}.mdx`);

  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: post.title }]}
      />
      <Article title={post.title} date={post.date} Content={Content} />
    </>
  );
}
