import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { type Post, posts } from "@/data/library";

export function PostList({ items }: { items: Post[] }) {
  return (
    <StackList
      items={items.map((post) => ({
        href: `/library/${post.slug}`,
        title: post.title,
        description: post.summary ?? post.description,
      }))}
    />
  );
}

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      <PostList items={posts} />
    </Section>
  );
}
