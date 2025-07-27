// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema.extend({
      time: z.object({
        created: z.string().optional(),
        updated: z.string().optional()
      }).optional(),
      external: z.string().optional(),
      media: z.object({
        video: z.string().optional(),
        image: z.string().optional()
      }).optional(),
      tags: z.array(z.string()).optional(),
      disabled: z.boolean().optional()
    })
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {}
});
export {
  source_config_default as default,
  docs
};
