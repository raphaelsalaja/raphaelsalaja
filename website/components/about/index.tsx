import { getAboutPage } from "@/lib/fumadocs";

import { getMDXComponents } from "@/mdx-components";

import "./styles.css";

export default function About() {
  const page = getAboutPage();

  // @ts-expect-error
  const { title, body: MDX } = page;

  return (
    <div className="about">
      <h1>{title}</h1>
      <MDX components={getMDXComponents()} />
    </div>
  );
}
