import { getPosts } from "@/lib/mdx";
import type { Post } from "@/types/post";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rs/design/breadcrumb";

import { Logo } from "@/components/logo";

interface PageProps {
  params: Promise<Post>;
}

export default async function BreadcrumbSlot(props: PageProps) {
  const params = await props.params;

  const post = getPosts("engineering").find(
    (post: { slug: string }) => post.slug === params.slug
  );

  if (!post) {
    return null;
  }

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Logo />
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/engineering">Engineering</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{post.title}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
