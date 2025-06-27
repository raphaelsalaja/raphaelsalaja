"use client";

import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SkeletonTheme baseColor="#e6e6e6" highlightColor="#ffffff">
      {children}
    </SkeletonTheme>
  );
};
