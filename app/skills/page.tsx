import { Skills } from "@/components/skills";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Skills",
  description: "Agent skills for building interfaces with coding agents.",
  path: "/skills",
});

export default function Page() {
  return <Skills />;
}
