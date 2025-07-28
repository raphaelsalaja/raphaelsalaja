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
      date: z.string(),
      external: z.string().optional(),
      media: z
        .object({
          video: z.string().optional(),
          image: z.string().optional(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      disabled: z.boolean().optional(),
      timestamp: z.number().optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {},
});

export type Frontmatter = z.infer<typeof docs.docs.schema>;
