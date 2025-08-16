import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
});

export const getLibraryPages = () => {
  const pages = source.getPages();
  return pages
    .filter((page) => page.slugs[0] === "library")
    .sort((a, b) => {
      const getDate = (post: typeof a) => new Date(post.data.date);
      return getDate(b).getTime() - getDate(a).getTime();
    });
};

export const getWorkPages = () => {
  const pages = source.getPages();
  return pages
    .filter((page) => page.slugs[0] === "work")
    .sort((a, b) => {
      const getDate = (post: typeof a) => new Date(post.data.date);
      return getDate(b).getTime() - getDate(a).getTime();
    });
};

export const getPage = (slug: string[]) => {
  return source.getPage(slug);
};

export const getAboutPage = () => {
  return source.getPage(["about"])?.data;
};

export type Page = ReturnType<typeof source.getPages>[number];
