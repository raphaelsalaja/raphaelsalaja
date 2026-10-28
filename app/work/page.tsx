import { Breadcrumb } from "@/components/breadcrumb";
import { WorkIndex } from "@/components/work";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Work",
  description: "Experiments, client work, and projects by Raphael Salaja.",
  path: "/work",
});

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
      <h1 className="sr-only">Work</h1>
      <WorkIndex />
    </>
  );
}
