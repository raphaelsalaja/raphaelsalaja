"use client";

import { Analytics } from "@vercel/analytics/next";
import { NextProvider } from "fumadocs-core/framework/next";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextProvider>
      {children}
      <Analytics />
    </NextProvider>
  );
};
