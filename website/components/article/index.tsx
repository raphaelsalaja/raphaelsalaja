import { notFound } from "next/navigation";
import type React from "react";
import { OutlineProvider } from "@/components/outline";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";
import { Support } from "../support";
import { MobileAwareArticle } from "./mobile-aware";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  page: Page;
}

export const Article = async ({ page }: ArticleProps) => {
  const { title, date, body: MDX, external, desktop } = page.data;

  if (external) {
    notFound();
  }

  // For desktop-only content, use client-side mobile detection
  if (desktop) {
    return <MobileAwareArticle page={page} />;
  }

  // Regular article rendering for non-desktop-only content
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
