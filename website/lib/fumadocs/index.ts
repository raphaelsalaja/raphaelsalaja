import { loader } from "fumadocs-core/source";
import { docs } from "@/.source/server";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
});

export const getLibraryPages = () => {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === "library" && !page.data.draft)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
};

export const getPage = (slug: string[]) => {
  return source.getPage(slug);
};

export const getAboutPage = () => {
  return source.getPage(["about"])?.data;
};

export type Page = ReturnType<typeof source.getPages>[number];
