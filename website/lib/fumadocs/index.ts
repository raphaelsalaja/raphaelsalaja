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

export const getProjectsPages = () => {
  const pages = source.getPages();
  return pages
    .filter((page) => page.slugs[0] === "projects")
    .sort((a, b) => {
      const getDate = (post: typeof a) => new Date(post.data.date);
      return getDate(b).getTime() - getDate(a).getTime();
    });
};
