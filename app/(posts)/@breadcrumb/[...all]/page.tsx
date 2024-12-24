import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import React from "react";
import type { ReactElement } from "react";

export default async function BreadcrumbSlot(props: { params: Promise<{ all: string[] }> }) {
  const params = await props.params;
  const breadcrumbItems: ReactElement<any>[] = [];
  let breadcrumbPage: ReactElement<any> = <></>;
  for (let i = 0; i < params.all.length; i++) {
    const route = params.all[i];
    const href = `/${params.all.at(0)}/${route}`;
    if (i === params.all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className="capitalize">
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>,
      );
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
