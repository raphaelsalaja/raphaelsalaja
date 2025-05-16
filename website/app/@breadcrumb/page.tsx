import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@rs/design/breadcrumb";
import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";

export default function BreadcrumbSlot() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">
            <Logo />
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
