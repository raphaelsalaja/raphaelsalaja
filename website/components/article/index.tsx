import type React from "react";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";
import { OutlineProvider } from "../outline";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  page: Page;
}

export const Article = ({ page }: ArticleProps) => {
  const { title, date, body: MDX } = page.data;

  return (
    <OutlineProvider>
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <MDX components={getMDXComponents()} />
      </article>
    </OutlineProvider>
  );
};
