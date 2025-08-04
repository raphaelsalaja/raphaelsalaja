"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextProvider } from "fumadocs-core/framework/next";
import { useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes("4")) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <NextProvider>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#e6e6e6" highlightColor="#ffffff">
          {children}
          <Analytics />
          <SpeedInsights />
        </SkeletonTheme>
      </QueryClientProvider>
    </NextProvider>
  );
};
