import type { MDXComponents } from "mdx/types";
import FigCaption, { type FigCaptionProps } from "@/components/codeblock";
import Heading, { type HeadingProps } from "@/components/heading";
import { Image } from "@/components/image";

export const BaseComponents: Partial<MDXComponents> = {
  h1: (props: HeadingProps) => <Heading {...props} />,
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} />
  ),
  a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
  ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} />
  ),
  li: ({ ...props }: React.HTMLAttributes<HTMLElement>) => <li {...props} />,
  pre: ({ ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} />
  ),
  code: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} />
  ),
  blockquote: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props} />
  ),
  figcaption: (props: FigCaptionProps) => <FigCaption {...props} />,
  img: (props) => <Image {...props} />,
};
