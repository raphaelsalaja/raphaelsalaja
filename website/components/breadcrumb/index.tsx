"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as Breadcrumb from "@rs/design/breadcrumb";
import { Link } from "next-view-transitions";
import title from "title";

const Chevron = <ChevronRightIcon width={14} />;

export function Home() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link render={<Link href="/">Home</Link>} href="/" />
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

export function Root({ page }: { page: string }) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link render={<Link href="/">Home</Link>} href="/" />
        </Breadcrumb.Item>
        <Breadcrumb.Separator>{Chevron}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>{title(page)}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

export function Essay({ title }: { title: string }) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link render={<Link href="/">Home</Link>} href="/" />
        </Breadcrumb.Item>
        <Breadcrumb.Separator>{Chevron}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>{title}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

export function Slug({ page, slug }: { page: string; slug: string }) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link render={<Link href="/">Home</Link>} href="/" />
        </Breadcrumb.Item>
        <Breadcrumb.Separator>{Chevron}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            render={<Link href={`/${page}`}>{title(page)}</Link>}
            href={`/${page}`}
          />
        </Breadcrumb.Item>
        <Breadcrumb.Separator>{Chevron}</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>{slug}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
