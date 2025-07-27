import title from "title";
import * as Breadcrumb from "@/components/breadcrumb";

const page = "projects";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const data = await props.params;
  const slug = title(data.slug.replace(/-/g, " "));

  return <Breadcrumb.Slug page={page} slug={slug} />;
}
