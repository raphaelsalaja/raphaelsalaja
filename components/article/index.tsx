import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import { Children, type ComponentType, isValidElement } from "react";
import { AgentPrompt } from "@/components/agent-prompt";
import { agentPrompt, agentSource } from "@/components/agent-prompt/text";
import { CodeBlock } from "@/components/code-block";
import { Coffee } from "@/components/coffee";
import { Demo } from "@/components/demo";
import { Image } from "@/components/image";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, formatLongDate, sourceUrl } from "@/lib/site";

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
  Content: ComponentType<{ components?: MDXComponents }>;
}

export function Article({
  title,
  description,
  date,
  path,
  Content,
}: ArticleProps) {
  return (
    <>
      <JsonLd data={articleJsonLd({ title, description, date, path })} />
      <article className="prose" data-reveal-children>
        <header>
          <div>
            <h1>{title}</h1>
            <time dateTime={date}>{formatLongDate(date)}</time>
          </div>
          <AgentPrompt
            text={agentPrompt(path, title)}
            href={agentSource(path)}
            source={sourceUrl(path)}
          />
        </header>
        <Content components={components} />
      </article>
      <div data-reveal>
        <Coffee />
      </div>
    </>
  );
}
