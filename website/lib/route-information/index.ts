"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function useRouteInformation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    path: pathname,
    search: searchParams,
  };
}
