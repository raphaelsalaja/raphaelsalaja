import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@rs/design/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Link } from "next-view-transitions";
import title from "title";

const page = "Projects";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const data = await props.params;
  const slug = title(data.slug.replace(/-/g, " "));

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight strokeWidth={2} size={16} />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${page}`} asChild>
          <Link href={`/${page}`}>{title(page)}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight strokeWidth={2} size={16} />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>{slug}</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
