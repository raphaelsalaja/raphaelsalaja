import { Breadcrumb } from "@/components/breadcrumb";
import { ChangelogList } from "@/components/changelog";
import { changelog } from "@/data/changelog";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Changelog",
  description: "Everything Raphael Salaja has written, built and shipped.",
  path: "/changelog",
});

export default function Page() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Changelog" }]}
      />
      <h1 className="sr-only">Changelog</h1>
      <ChangelogList items={changelog} />
    </>
  );
}
