import { Article } from "@/components/article";
import { createPostPage } from "@/lib/create-post-page/iindex";

const {
  generateStaticParams,
  generateMetadata,
  default: Page,
} = createPostPage("insights", (post) => <Article post={post} />);

export { generateStaticParams, generateMetadata };

export default Page;
