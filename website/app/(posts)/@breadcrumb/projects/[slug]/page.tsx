import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rs/design/breadcrumb";
import { getPosts } from "@/lib/mdx";
import type { Post } from "@/types/post";

interface PageProps {
  params: Promise<Post>;
}

export default async function BreadcrumbSlot(props: PageProps) {
  const params = await props.params;

  const post = getPosts("projects").find((post: { slug: string }) => post.slug === params.slug);

  if (!post) {
    return null;
  }

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{post.title}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
