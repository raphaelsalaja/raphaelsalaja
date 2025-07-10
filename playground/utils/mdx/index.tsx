import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { MDX } from "@/types/mdx";

export async function getFiles(): Promise<MDX[]> {
  const folder = path.resolve(process.cwd(), "markdown");
  const raw = await fs.readdir(folder);
  const files = raw.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folder, file);
      const src = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(src);
      return { data, content };
    }),
  );
}
