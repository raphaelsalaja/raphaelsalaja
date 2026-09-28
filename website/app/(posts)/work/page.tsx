import * as Breadcrumb from "@/components/breadcrumb";
import { Work } from "@/components/work";

export default function Page() {
  return (
    <>
      <Breadcrumb.Root page="work" />
      <Work index />
    </>
  );
}
