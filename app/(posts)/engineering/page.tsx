import type { Post } from "@/types/post";

import { Posts } from "@/components/posts";

interface PageProps {
  params: Promise<Post>;
}

export default async function Page(props: PageProps) {
  return <Posts category="engineering" inline />;
}
