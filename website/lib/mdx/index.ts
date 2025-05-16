import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Frontmatter } from "@/types/frontmatter";

function readFile(filePath: string): Frontmatter | null {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    const slug = path.basename(filePath, path.extname(filePath));

    return {
      ...data,
      slug,
      content,
    } as Frontmatter;
  } catch (error) {
    console.error(`Failed to read or parse the file at ${filePath}:`, error);
    return null;
  }
}

function getFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Failed to read directory at ${dir}:`, error);
    return [];
  }
}

export function getPosts(directory: string): Frontmatter[] {
  const files = getFiles(path.join(process.cwd(), "app", "(posts)", directory, "posts"));
  return files
    .map((file) => readFile(path.join(process.cwd(), "app", "(posts)", directory, "posts", file)))
    .filter((post): post is Frontmatter => post !== null);
}
