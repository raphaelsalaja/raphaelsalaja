import React from "react";
import { MDX } from "@/components/mdx";
import type { MDX as MDXType } from "@/types/mdx";

interface SectionProps {
  section: MDXType;
}

export const Section = ({ section }: SectionProps) => {
  const { content, data } = section;

  return (
    <React.Fragment>
      <h1 id={data.title}>{data.title}</h1>
      <MDX source={content} />
    </React.Fragment>
  );
};
