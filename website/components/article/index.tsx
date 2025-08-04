import { notFound } from "next/navigation";
import type React from "react";
import { isServerMobile } from "@/hooks/use-is-mobile";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";
import { OutlineProvider } from "../outline";
import { Support } from "../support";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  page: Page;
}

export const Article = async ({ page }: ArticleProps) => {
  const { title, date, body: MDX, external, desktop } = page.data;

  if (external) {
    notFound();
  }

  if (desktop && (await isServerMobile())) {
    return (
      <article>
        <p>
          This article is under construction to achieve the best viewing
          pleasure on mobile devices.
        </p>
        <p>Please check back later :)</p>
      </article>
    );
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
