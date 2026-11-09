import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Skills at Work",
  description:
    "Development-only demos of the skills collection. A production build omits this route.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  if (process.env.NODE_ENV === "production") notFound();

  const { SkillsAtWork } = await import("@/dev/skills-at-work/at-work");
  return <SkillsAtWork />;
}
