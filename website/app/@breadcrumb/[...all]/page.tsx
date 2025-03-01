import { Logo } from "@/components/logo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@rs/design/breadcrumb";

export default function BreadcrumbSlot() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Logo />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
