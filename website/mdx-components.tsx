import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";
import { Image } from "@/components/image";
import { Video } from "./components/media";

const components: MDXComponents = {
  img: (props) => <Image {...props} />,
  video: (props) => <Video loop {...props} />,
};

export function getMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}
