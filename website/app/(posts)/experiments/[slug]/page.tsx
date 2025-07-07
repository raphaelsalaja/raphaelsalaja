import { Article } from "@/components/article";
import { createPostPage } from "@/lib/create-post-page";

const { generateStaticParams, generateMetadata, default: Page } = createPostPage("experiments", (post) => <Article post={post} />);

export { generateMetadata, generateStaticParams };

export default Page;
