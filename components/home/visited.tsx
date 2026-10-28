"use client";

import { useEffect } from "react";
import { VISITED_KEY } from "@/lib/visited";

export function Visited() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.documentElement.dataset.visited = "";
      try {
        sessionStorage.setItem(VISITED_KEY, "1");
      } catch {}
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
