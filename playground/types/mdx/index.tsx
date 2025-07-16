import type { GrayMatterFile } from "gray-matter";

export interface MDX {
  data: GrayMatterFile<string>["data"];
  content: GrayMatterFile<string>["content"];
}
