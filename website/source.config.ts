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
      time: z
        .object({
          created: z.string().optional(),
          updated: z.string().optional(),
        })
        .optional(),
      external: z.string().optional(),
      media: z
        .object({
          video: z.string().optional(),
          image: z.string().optional(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      disabled: z.boolean().optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {},
});
