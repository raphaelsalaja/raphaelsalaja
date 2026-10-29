"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { VISITED_KEY } from "@/lib/visited";

const TARGETS =
  ":is([data-reveal], [data-reveal-children] > *):not([data-shown])";
const MAX_STAGGER = 6;

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const root = document.documentElement;
    const visited = "visited" in root.dataset;

    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          target.style.setProperty(
            "--reveal-index",
            String(Math.min(index++, MAX_STAGGER)),
          );
          target.dataset.shown = "";
        }
      },
      { threshold: 0.15 },
    );

    for (const target of document.querySelectorAll<HTMLElement>(TARGETS)) {
      const { top, bottom } = target.getBoundingClientRect();
      if (visited && bottom > 0 && top < innerHeight) {
        target.dataset.shown = "instant";
      } else {
        observer.observe(target);
      }
    }

    const timeout = setTimeout(() => {
      root.dataset.visited = "";
      try {
        sessionStorage.setItem(VISITED_KEY, "1");
      } catch {}
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
