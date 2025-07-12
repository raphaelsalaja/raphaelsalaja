"use client";

import * as Breadcrumb from "@/components/breadcrumb";

const page = "projects";

export default async function Page() {
  return <Breadcrumb.Root page={page} />;
}
