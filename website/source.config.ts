import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      preview: z.string().optional(),
      draft: z.boolean().optional(),
      category: z
        .enum([
          "Experiments",
          "Experience",
          "Projects",
          "Animation",
          "Thoughts",
          "Craft",
          "Design",
          "Fashion",
        ])
        .optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? [])],
    },
    rehypePlugins: [rehypeCode],
  },
});

export type Frontmatter = z.infer<typeof docs.docs.schema>;
