import { Breadcrumb } from "@/components/breadcrumb";
import { PostList } from "@/components/library";
import { posts } from "@/data/library";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Writing",
  description: "Essays and notes by Raphael Salaja.",
  path: "/library",
});

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Writing" }]}
      />
      <h1 className="sr-only">Writing</h1>
      <PostList items={posts} />
    </>
  );
}
