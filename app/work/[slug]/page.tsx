import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { Breadcrumb } from "@/components/breadcrumb";
import { getWorkPage, workPages } from "@/data/work";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return workPages.map((item) => ({ slug: item.href.split("/").at(-1) }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = getWorkPage(slug);
  if (!item) notFound();

  return createMetadata({
    title: item.title,
    description: item.description ?? item.title,
    path: item.href,
  });
}

export default async function Page(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = getWorkPage(slug);
  if (!item) notFound();

  const { default: Content } = await import(`@/content/work/${slug}.mdx`);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: item.title },
        ]}
      />
      <Article title={item.title} date={item.date} Content={Content} />
    </>
  );
}
