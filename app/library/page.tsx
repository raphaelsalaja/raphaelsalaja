import { Breadcrumb } from "@/components/breadcrumb";
import { PostList } from "@/components/library";
import { posts } from "@/data/library";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Library",
  description: "Essays and notes by Raphael Salaja.",
  path: "/library",
});

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Library" }]}
      />
      <h1 className="sr-only">Library</h1>
      <PostList items={posts} />
    </>
  );
}
