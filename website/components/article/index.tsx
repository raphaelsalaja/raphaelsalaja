import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import type React from "react";
import { OutlineProvider } from "@/components/outline";
import { Support } from "@/components/support";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  page: Page;
  components?: MDXComponents;
}

export const Article = ({ page, components }: ArticleProps) => {
  const { title, date, body: MDX, draft } = page.data;

  if (draft) {
    notFound();
  }

  return (
    <OutlineProvider>
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <MDX components={{ ...getMDXComponents(), ...components }} />
        <Support />
      </article>
    </OutlineProvider>
  );
};
