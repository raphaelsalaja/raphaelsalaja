import { MDX } from "@/components/mdx";
import { createPostPage } from "@/lib/create-post-page/iindex";

const {
  generateStaticParams,
  generateMetadata,
  default: Page,
} = createPostPage("projects", (post) => <MDX source={post.content} />);

export { generateStaticParams, generateMetadata };
export default Page;
