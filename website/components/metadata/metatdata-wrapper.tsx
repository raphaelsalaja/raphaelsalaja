"use client";

import { usePathname } from "next/navigation";
import { MetadataDialog } from "@/components/metadata/metadata-dialog";

export default function MetadataDialogWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <>{isHomePage && <MetadataDialog />}</>;
}
