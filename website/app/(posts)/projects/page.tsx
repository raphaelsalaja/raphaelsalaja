import type { Frontmatter } from "@/types/frontmatter";

import { Posts } from "@/components/posts";

interface PageProps {
  params: Promise<Frontmatter>;
}

export default async function Page(props: PageProps) {
  return <Posts category="projects" index />;
}
