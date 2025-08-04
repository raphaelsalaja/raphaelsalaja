import type { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import { Roboto_Mono as MonoFont } from "next/font/google";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";

import type React from "react";
import type { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

import { Demo } from "@/components/demo";
import { Accordion, Breadcrumb, Select } from "@/components/design";
import { Figcaption } from "@/components/mdx/figcaption";

import "./styles.css";

const mono = MonoFont({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const components: MDXComponents = {
  Accordion,
  Select,
  Breadcrumb,
  Demo,
  figcaption: (props: React.ComponentProps<typeof Figcaption>) => (
    <Figcaption {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className={`${props.className} ${mono.className}`} />
  ),
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
