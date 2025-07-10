import Documentation from "@/components/docs";
import type { MDX } from "@/types/mdx";
import { getFiles } from "@/utils/mdx";

export default async function Page() {
  const components: MDX[] = await getFiles();
  return <Documentation components={components} />;
}
