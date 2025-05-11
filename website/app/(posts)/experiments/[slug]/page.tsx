import { MDX } from "@/components/mdx";
import { createPostPage } from "@/lib/createPostPage";

const {
  generateStaticParams,
  generateMetadata,
  default: Page,
} = createPostPage("experiments", (post) => <MDX source={post.content} />);

export { generateStaticParams, generateMetadata };
export default Page;
