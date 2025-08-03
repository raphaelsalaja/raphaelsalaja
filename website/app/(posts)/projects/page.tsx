import { Projects } from "@/components/projects";
import type { Frontmatter } from "@/source.config";

interface PageProps {
  params: Promise<Frontmatter>;
}

export default async function Page(_props: PageProps) {
  return <Projects index />;
}
