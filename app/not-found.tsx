import type { Metadata } from "next";
import { NotFound } from "@/components/not-found";

export const metadata: Metadata = { title: "Page Not Found" };

export default function Page() {
  return <NotFound />;
}
