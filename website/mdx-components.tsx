import { clsx } from "clsx";
import type { MDXComponents } from "mdx/types";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import Image, { type ImageProps } from "next/image";

import type React from "react";
import type { JSX } from "react";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import "@/styles/mdx.css";
import { Container, Video } from "lucide-react";
import DelayedButton from "./components/playground/button-delayed-icon";
import ExpandableBlock from "./components/playground/expandable-block";
import FamilyWallet from "./components/playground/family-wallet";
import LinearDialog from "./components/playground/linear-dialog";
import BasicExample from "./components/playground/linear-dialog-guide/1-example";
import BasicLayoutExample from "./components/playground/linear-dialog-guide/2-basic-layout-example";
import Metadata from "./components/playground/metadata-dialog";
import SharedAnimation from "./components/playground/shared-animation";

const components: MDXComponents = {
  pre: ({ children }) => (
    <pre
      className="border bg-muted py-2"
      style={{
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </pre>
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={clsx("mt-6 mb-2", className)} {...props} style={{ margin: "1.5rem 0rem 0.5rem 0rem" }} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={clsx("mb-4", className)} {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className={clsx("underline underline-offset-4", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={clsx("list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li
      className={clsx("mt-2 ml-2", className)}
      {...props}
      style={{
        marginTop: "0.5rem",
        marginLeft: "1rem",
      }}
    />
  ),
  Link: ({ children, href, ...props }) => <Link href={href}>{children}</Link>,
  Showcase: ({ children, caption }) => (
    <div className="my-6 flex flex-col justify-end gap-2">
      <div
        className="overflow-hidden border"
        style={{
          height: "24rem",
        }}
      >
        <div className="h-full">{children}</div>
      </div>
      {caption && <p className="text-center text-gray-500 text-xs">{caption}</p>}
    </div>
  ),
  ComponentContainer: ({ children, caption, code }) => (
    <div className={`relative my-6 flex flex-col gap-2 ${code ? "mb-0" : ""}`}>
      <div
        className="absolute flex w-full gap-2 p-2"
        style={{
          justifyContent: "flex-end",
        }}
      />
      <div
        className={clsx("relative overflow-hidden", code ? "border-x border-t border-b-0" : "border")}
        style={{
          height: "24rem",
          border: "1px  solid #e5e7eb",
          borderBottom: code ? "0" : "1px solid #e5e7eb",
        }}
      >
        <div className="flex h-full items-center justify-center">{children}</div>
      </div>
      {caption && <p className="text-center text-gray-500 text-xs">{caption}</p>}
    </div>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={clsx("relative rounded bg-muted font-mono text-xs", className)}
      style={{
        padding: "0.1rem 0.3rem",
      }}
      {...props}
    />
  ),
  CodeBlock: ({ children }) => <div className="">{children}</div>,
  Image: ({ caption, ...props }: ImageProps & { caption?: string }) => {
    return <Image {...props} caption={caption} />;
  },
  Video: ({ src, ...props }) => {
    return <Video src={src} {...props} />;
  },
  PreetsLayout: ({}) => {
    return (
      <iframe
        src="https://codesandbox.io/embed/9r88w5?view=preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1"
        style={{
          width: "100%",
          height: "500px",
          border: "0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
        title="Framer Motion: Linear's Shared Layout Animation"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    );
  },
  Container: () => <Container />,
  DelayedButton: () => <DelayedButton />,
  ExpandableBlock: () => <ExpandableBlock />,
  Metadata: () => <Metadata />,
  SharedAnimation: () => <SharedAnimation />,
  FamilyWallet: () => <FamilyWallet />,
  BasicLayoutExample: () => <BasicLayoutExample />,
  LinearDialog: () => <LinearDialog />,
  BasicExample: () => <BasicExample />,
};

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      [rehypeSlug],
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: false,
          defaultLang: "tsx",
          filterMetaString: (string: string) => string.replace(/filename="[^"]*"/, ""),
        },
      ],
    ],
  },
};

export function MDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  // @ts-ignore
  return <MDXRemote {...props} components={components} options={options} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
