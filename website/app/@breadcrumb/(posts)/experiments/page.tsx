"use client";

import * as Breadcrumb from "@/components/breadcrumb";

const page = "experiments";

export default async function Page() {
  return <Breadcrumb.Root page={page} />;
}
