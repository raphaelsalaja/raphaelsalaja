import { notFound } from "next/navigation";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import type { Frontmatter } from "@/types/frontmatter";

interface PageProps {
  params: Promise<Frontmatter>;
}

type RenderFn = (post: Frontmatter) => React.ReactNode;

export function createPostPage(route: string, renderContent: RenderFn) {
  const Posts = getPosts(route);

  async function generateStaticParams() {
    return Posts.map((post) => ({
      slug: `${post.slug}`,
    }));
  }

  async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const post = Posts.find((post: { slug: string }) => post.slug === params.slug);
    const title = post ? post.title : "";

    return {
      ...OpenGraph,
      title,
      openGraph: {
        title,
      },
      twitter: {},
    };
  }

  async function Page(props: PageProps) {
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
