import { Posts } from "@/components/posts";
import type { Frontmatter } from "@/types/frontmatter";

interface PageProps {
  params: Promise<Frontmatter>;
}

export default async function Page(props: PageProps) {
  return <Posts category="projects" index />;
}
