import { Article } from "@/components/article";
import { createPostPage } from "@/lib/createPostPage";

const {
  generateStaticParams,
  generateMetadata,
  default: Page,
} = createPostPage("insights", (post) => <Article post={post} />);

export { generateStaticParams, generateMetadata };

export default Page;
