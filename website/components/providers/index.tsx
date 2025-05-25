"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SkeletonTheme baseColor="#e6e6e6" highlightColor="#ffffff">
        {children}
      </SkeletonTheme>
    </QueryClientProvider>
  );
};
