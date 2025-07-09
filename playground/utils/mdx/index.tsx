"use server";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { MDX } from "@/types/mdx";

export async function getFiles(): Promise<MDX[]> {
  const folder = path.resolve(process.cwd(), "markdown");
  const files = await fs.readdir(folder);

  return await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folder, file);
      const content = await fs.readFile(filePath, "utf-8");
      const graymatter = matter(content);
      return { data: graymatter.data, content: graymatter.content };
    }),
  );
}
