import { Bots } from "@/components/bots";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Bots",
  description: "A team of Grok Bots, each with one job.",
  path: "/bots",
});

export default function Page() {
  return <Bots />;
}
