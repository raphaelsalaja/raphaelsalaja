import { Logo } from "@/components/logo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@rs/design/breadcrumb";

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
