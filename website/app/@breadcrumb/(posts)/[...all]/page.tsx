import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@rs/design/breadcrumb";
import { ChevronRight } from "lucide-react";
import React from "react";
import title from "title";
import { Logo } from "@/components/logo";

interface BreadcrumbsProps {
  items: {
    text: string;
    href: string;
    active?: boolean;
  }[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Logo />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {items.map((item, i) => {
        return (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator>
              <ChevronRight strokeWidth={2} size={16} />
            </BreadcrumbSeparator>

            {item.active ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.text}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink key={item.href} href={item.href}>
                  {item.text}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
}

export default async function Page(props: {
  params: Promise<{
    all: string[];
  }>;
}) {
  const params = await props.params;

  const { all } = params;

  const items = [
    ...all.map((param, index) => {
      const post = param.replace(/-/g, " ");

      return {
        text: title(post),
        href: `/${all.slice(0, index + 1).join("/")}`,
        active: index === all.length - 1,
      };
    }),
  ];

  return <Breadcrumbs items={items} />;
}
