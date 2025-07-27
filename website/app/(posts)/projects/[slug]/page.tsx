// import { Article } from "@/components/article";
// import { createPostPage } from "@/lib/create-post-page";

import { notFound } from "next/navigation";
import { source } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";

// const {
//   generateStaticParams,
//   generateMetadata,
//   default: Page,
// } = createPostPage("projects", (post) => <Article post={post} />);

// export { generateMetadata, generateStaticParams };

// export default Page;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const Content = page.data.body;

  return (
    <div className="prose dark:prose-invert">
      <h1>{page.data.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {page.data.description}
      </p>
      <Content components={getMDXComponents()} />
    </div>
  );
}
