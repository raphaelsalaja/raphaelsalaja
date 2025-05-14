import { MDX } from "@/components/mdx";
import type { Frontmatter } from "@/types/frontmatter";

interface ArticleProps extends React.ComponentPropsWithoutRef<"article"> {
  post: Frontmatter;
}

export const Article = ({ post, ...props }: ArticleProps) => {
  const { title, summary, content } = post;

  return (
    <React.Fragment>
      <article data-mdx-article {...props}>
        <h1>{title}</h1>
        {summary && <p data-mdx-article-summary>{summary}</p>}
        <MDX source={content} />
      </article>
      {/* <Island /> */}
    </React.Fragment>
  );
};
