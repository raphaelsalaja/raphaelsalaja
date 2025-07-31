// source.config.ts
import {
  rehypeCode,
  rehypeCodeDefaultOptions
} from "fumadocs-core/mdx-plugins";
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
      date: z.string(),
      external: z.string().optional(),
      media: z.object({
        video: z.string().optional(),
        image: z.string().optional()
      }).optional(),
      tags: z.array(z.string()).optional(),
      disabled: z.boolean().optional(),
      timestamp: z.number().optional()
    })
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      inline: "tailing-curly-colon",
      defaultColor: false,
      transformers: [...rehypeCodeDefaultOptions.transformers ?? []]
    },
    rehypePlugins: [rehypeCode]
  }
});
export {
  source_config_default as default,
  docs
};
