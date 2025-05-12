import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@rs/design/breadcrumb";
import { Logo } from "@/components/logo";

export default function BreadcrumbSlot() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Logo />
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
