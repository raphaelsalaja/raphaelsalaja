import { notFound } from "next/navigation";
import type React from "react";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";
import { OutlineProvider } from "../outline";
import { Support } from "../support";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  page: Page;
}

export const Article = ({ page }: ArticleProps) => {
  const { title, date, body: MDX, external } = page.data;

  if (external) {
    notFound();
  }

  return (
    <OutlineProvider>
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <MDX components={getMDXComponents()} />
        <Support />
      </article>
    </OutlineProvider>
  );
};
