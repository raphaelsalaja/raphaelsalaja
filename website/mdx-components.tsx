import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import { Image } from "@/components/image";
import { Principles } from "./components/mdx/12-principles";
import { Experiments } from "./components/mdx/experiments";
import { SimplyEffective } from "./components/mdx/simply-effective";
import { Video } from "./components/media";

const components: MDXComponents = {
  img: (props) => <Image {...props} />,
  video: (props) => <Video loop {...props} />,
  ...Principles,
  ...Experiments,
  ...SimplyEffective,
};

export function getMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}
