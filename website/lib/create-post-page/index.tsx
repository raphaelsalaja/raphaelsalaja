import { notFound } from "next/navigation";
import { getPosts } from "@/lib/mdx";
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
    default: Page,
  };
}
