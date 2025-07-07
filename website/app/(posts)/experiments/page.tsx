import { Posts } from "@/components/posts";
import type { Frontmatter } from "@/types/frontmatter";

interface PageProps {
  params: Promise<Frontmatter>;
}

export default async function Page(_props: PageProps) {
  return <Posts category="experiments" index />;
}
