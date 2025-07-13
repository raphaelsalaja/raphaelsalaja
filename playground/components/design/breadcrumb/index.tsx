"use client";

import * as DesignBreadcrumb from "@rs/design/breadcrumb";
import { Link } from "next-view-transitions";
import { ChevronRight } from "@/components/icons";

export function Breadcrumb() {
  return (
    <DesignBreadcrumb.Root>
      <DesignBreadcrumb.List>
        <DesignBreadcrumb.Item>
          <DesignBreadcrumb.Link render={<Link href="/">First</Link>} href="/" />
        </DesignBreadcrumb.Item>
        <DesignBreadcrumb.Separator>
          <ChevronRight width={16} height={16} />
        </DesignBreadcrumb.Separator>
        <DesignBreadcrumb.Item>
          <DesignBreadcrumb.Link render={<Link href="/">Second</Link>} href="/" />
        </DesignBreadcrumb.Item>
        <DesignBreadcrumb.Separator>
          <ChevronRight width={16} height={16} />
        </DesignBreadcrumb.Separator>
        <DesignBreadcrumb.Item>
          <DesignBreadcrumb.Link render={<Link href="/">Third</Link>} href="/" />
        </DesignBreadcrumb.Item>
        <DesignBreadcrumb.Separator>
          <ChevronRight width={16} height={16} />
        </DesignBreadcrumb.Separator>
        <DesignBreadcrumb.Item>
          <DesignBreadcrumb.Page>Fourth</DesignBreadcrumb.Page>
        </DesignBreadcrumb.Item>
      </DesignBreadcrumb.List>
    </DesignBreadcrumb.Root>
  );
}
