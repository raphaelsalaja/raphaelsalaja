import type { Post } from "@/types/post";

import { MDX } from "@/mdx-components";

import React from "react";

interface Props {
  post: Post;
  route: string;
}

export const Layout = ({ post }: Props) => {
  return (
    <React.Fragment>
      <div>
        <h1>{post.title}</h1>
      </div>

      <MDX source={post.content} />
    </React.Fragment>
  );
};
