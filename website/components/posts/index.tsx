import { Link } from "next-view-transitions";
import * as Media from "@/components/media";
import { source } from "@/lib/fumadocs";
import type { Frontmatter } from "@/types/frontmatter";
import { Placeholder } from "./placeholder";
import styles from "./styles.module.css";

interface PostsProps {
  index?: boolean;
  category: string;
  title?: string;
  filter?: boolean;
}

export const Posts = async ({
  category,
  index = false,
  title = category
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (l) => l.toUpperCase()),
}: PostsProps) => {
  const pages = source.getPages();

  console.log("pages", pages);

  // Here is an example of a page object from the source
  // {
  //     "file": {
  //         "dirname": "projects",
  //         "name": "daybreak",
  //         "ext": ".mdx",
  //         "path": "projects/daybreak.mdx",
  //         "flattenedPath": "projects/daybreak"
  //     },
  //     "absolutePath": "/Users/raphaelsalaja/Developer/raphaelsalaja/website/content/projects/daybreak.mdx",
  //     "path": "projects/daybreak.mdx",
  //     "url": "/projects/daybreak",
  //     "slugs": [
  //         "projects",
  //         "daybreak"
  //     ],
  //     "data": {
  //         "structuredData": {
  //             "contents": [],
  //             "headings": []
  //         },
  //         "toc": [],
  //         "title": "Daybreak V5",
  //         "time": {
  //             "created": "31 March 2025"
  //         },
  //         "external": "https://www.daybreak.studio/",
  //         "media": {
  //             "video": "/media/posts/daybreak-v5.mp4"
  //         },
  //         "_file": {
  //             "path": "projects/daybreak.mdx",
  //             "absolutePath": "/Users/raphaelsalaja/Developer/raphaelsalaja/website/content/projects/daybreak.mdx"
  //         },
  //         "_exports": {
  //             "frontmatter": {
  //                 "title": "Daybreak V5",
  //                 "time": {
  //                     "created": "31 March 2025"
  //                 },
  //                 "external": "https://www.daybreak.studio/",
  //                 "media": {
  //                     "video": "/media/posts/daybreak-v5.mp4"
  //                 }
  //             },
  //             "structuredData": {
  //                 "contents": [],
  //                 "headings": []
  //             },
  //             "toc": []
  //         },
  //         "content": "---\ntitle: 'Daybreak V5'\ntime: \n  created: '31 March 2025'\nexternal: \"https://www.daybreak.studio/\"\nmedia:\n  video: '/media/posts/daybreak-v5.mp4'\n---\n\n"
  //     },
  //     "locale": ""
  // }
  // what we can get is file.dirname which is the category, file.name which is the slug, and data.title which is the title of the post
  const posts = pages.filter((page) => page.slugs[0] === category);

  const length = posts.length;

  console.log("posts", posts);

  const Thumbnail = ({ post }: { post: Frontmatter }) => {
    if (post.media?.video) {
      return (
        <div className={styles.thumbnail}>
          <Media.Video
            src={post.media.video}
            autoPlay
            muted
            loop
            playsInline
            className={styles.media}
          >
            <track kind="captions" />
          </Media.Video>
        </div>
      );
    }

    if (post.media?.image) {
      return (
        <div className={styles.thumbnail}>
          <Media.Image
            fill
            src={post.media.image}
            className={styles.media}
            alt={post.title || "Post image"}
            loading="lazy"
          />
        </div>
      );
    }

    return <Placeholder post={post} />;
  };

  return (
    <div className={styles.posts}>
      {!index && (
        <Link href={`/${category}`} className={styles.heading}>
          <h1 className={styles.name}>{title}</h1>
          <h2 className={styles.count}>{length}</h2>
        </Link>
      )}

      <div className={styles.grid}>
        {posts
          .filter((_post) => {
            return true;
          })
          .slice(0, index ? posts.length : 3)
          .map((post) => {
            if (post.data.disabled) {
              return (
                <div
                  className={styles.entry}
                  key={post.slugs.join("/")}
                  data-index={index ? "root" : false}
                  data-disabled="true"
                >
                  <Thumbnail post={post} />
                </div>
              );
            }

            return (
              <Link
                href={post.data.external ?? `/${post.slugs.join("/")}`}
                className={styles.entry}
                key={post.slugs.join("/")}
                data-index={index ? "root" : false}
              >
                <Thumbnail post={post} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
