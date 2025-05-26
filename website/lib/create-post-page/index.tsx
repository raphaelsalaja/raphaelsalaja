import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadataForPost } from "@/config/site";
import { getPosts } from "@/lib/mdx";
import type { Frontmatter } from "@/types/frontmatter";

type Props = {
  params: Promise<Frontmatter>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type RenderFn = (post: Frontmatter) => React.ReactNode;

export function createPostPage(route: string, renderContent: RenderFn) {
  const Posts = getPosts(route);

  async function generateStaticParams() {
    return Posts.map((post) => ({
      slug: `${post.slug}`,
    }));
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;

    const post = Posts.find((post: { slug: string }) => post.slug === slug);

    if (!post) {
      notFound();
    }

    return generateMetadataForPost(post.title, post.summary || "...");
  }

  async function Page(props: Props) {
    const params = await props.params;
    const post = Posts.find((post: { slug: string }) => post.slug === params.slug);

    if (!post) {
      notFound();
    }

    return renderContent(post);
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: Page,
  };
}
