import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@rs/design/breadcrumb";
import { ChevronRight } from "lucide-react";
import { Link } from "next-view-transitions";
import title from "title";

const page = "experiments";

export default async function Page() {
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
        <BreadcrumbPage>{title(page)}</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
