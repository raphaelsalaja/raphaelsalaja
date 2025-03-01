import { Logo } from "@/components/logo";
import { getPosts } from "@/lib/mdx";
import type { Post } from "@/types/post";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rs/design/breadcrumb";

interface PageProps {
  params: Promise<Post>;
}

export default async function BreadcrumbSlot(props: PageProps) {
  const params = await props.params;

  const post = getPosts("design-system").find(
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
        <BreadcrumbLink href="/design-system">Design System</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{post.title}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
