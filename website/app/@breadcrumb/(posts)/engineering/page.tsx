import { Logo } from "@/components/logo";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rs/design/breadcrumb";

export default async function BreadcrumbSlot() {
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Logo />
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Engineering</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
