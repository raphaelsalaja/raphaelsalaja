import { Article } from "@/components/article";
import { createPostPage } from "@/lib/create-post-page";

const { generateStaticParams, default: Page } = createPostPage("projects", (post) => <Article post={post} />);

export { generateStaticParams };

export default Page;
