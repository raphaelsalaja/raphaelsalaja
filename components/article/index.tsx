import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import { Children, type ComponentType, isValidElement } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { CodeBlock } from "@/components/code-block";
import { Demo } from "@/components/demo";
import { Image } from "@/components/image";
import { JsonLd } from "@/components/json-ld";
import { Outline } from "@/components/outline";
import { Support } from "@/components/support";
import { articleJsonLd, formatLongDate } from "@/lib/site";
import { CopyLink } from "./copy-link";
import styles from "./styles.module.css";

const components: MDXComponents = {
  Demo,
  img: Image,
  pre: CodeBlock,
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
  description: string;
  date: string;
  path: string;
  parent: { href: string; label: string };
  Content: ComponentType<{ components?: MDXComponents }>;
}

export function Article({
  title,
  description,
  date,
  path,
  parent,
  Content,
}: ArticleProps) {
  return (
    <>
      <JsonLd data={articleJsonLd({ title, description, date, path })} />
      <Breadcrumb
        className={styles.breadcrumb}
        items={[{ label: "Home", href: "/" }, parent, { label: title }]}
      />
      <Outline back={parent} />
      <article className="prose">
        <header>
          <h1>{title}</h1>
          <div className={styles.meta}>
            <time dateTime={date}>{formatLongDate(date)}</time>
            <CopyLink />
          </div>
        </header>
        <Content components={components} />
        <Support />
      </article>
    </>
  );
}
