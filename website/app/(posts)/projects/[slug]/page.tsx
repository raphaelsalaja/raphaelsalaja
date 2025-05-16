import { MDX } from "@/components/mdx";
import { createPostPage } from "@/lib/create-post-page";

const {
  generateStaticParams,

  default: Page,
} = createPostPage("projects", (post) => <MDX source={post.content} />);

export { generateStaticParams };
export default Page;
