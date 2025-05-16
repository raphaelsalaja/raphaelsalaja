import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@rs/design/breadcrumb";
import { ChevronRight } from "lucide-react";
import React from "react";
import title from "title";

import { Link } from "next-view-transitions";

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
        <BreadcrumbLink href="/" asChild>
          <Link href="/">Home</Link>
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
                <BreadcrumbLink asChild>
                  <Link href={item.href} key={item.href}>
                    {item.text}
                  </Link>
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
