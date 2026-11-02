import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lab } from "./lab";

export const metadata: Metadata = {
  title: "Motion Blur Lab",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Lab />;
}
