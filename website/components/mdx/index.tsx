import type { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

import type React from "react";
import type { JSX } from "react";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

import "@/styles/mdx/index.css";

import Stage from "@/components/stage";

import { CustomComponents } from "./custom";
import { BaseComponents } from "./base";

const components: MDXComponents = {
  Stage,
  ...CustomComponents,
  ...BaseComponents,
};

export function MDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={
        components as React.ComponentProps<typeof MDXProvider>["components"]
      }
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            remarkParse,
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                bypassInlineCode: true,
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
                keepBackground: false,
                defaultLang: "tsx",
              },
            ],
            rehypeStringify,
          ],
        },
      }}
    />
  );
}
