import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import { Children, type ComponentType, isValidElement } from "react";
import { Image } from "@/components/image";
import { Outline } from "@/components/outline";
import { Support } from "@/components/support";
import { formatDate } from "@/lib/site";

const components: MDXComponents = {
  img: Image,
  p: ({ children }) => {
    const only = Children.toArray(children);
    if (
      only.length === 1 &&
      isValidElement(only[0]) &&
      only[0].type === Image
    ) {
      return only[0];
    }
    return <p>{children}</p>;
  },
};

interface ArticleProps {
  title: string;
  date: string;
  Content: ComponentType<{ components?: MDXComponents }>;
}

export function Article({ title, date, Content }: ArticleProps) {
  return (
    <>
      <Outline />
      <article>
        <header>
          <h1>{title}</h1>
          <time dateTime={date}>{formatDate(date)}</time>
        </header>
        <Content components={components} />
        <Support />
      </article>
    </>
  );
}
