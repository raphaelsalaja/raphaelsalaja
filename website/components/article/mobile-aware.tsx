"use client";

import { useEffect, useState } from "react";
import type { Page } from "@/lib/fumadocs";
import { getMDXComponents } from "@/mdx-components";
import { OutlineProvider } from "../outline";
import { Support } from "../support";

interface MobileAwareArticleProps {
  page: Page;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      // Use multiple methods to detect mobile
      const userAgent = navigator.userAgent;
      const isMobileUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        );
      const isMobileViewport = window.innerWidth <= 768;

      setIsMobile(isMobileUserAgent || isMobileViewport);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile, isClient };
};

export const MobileAwareArticle = ({ page }: MobileAwareArticleProps) => {
  const { title, date, body: MDX } = page.data;
  const { isMobile, isClient } = useIsMobile();

  // Show loading state while detecting mobile
  if (!isClient) {
    return (
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <p>Loading...</p>
      </article>
    );
  }

  // Show mobile restriction message
  if (isMobile) {
    return (
      <article>
        <p>
          This article is under construction to achieve the best viewing
          pleasure on mobile devices.
        </p>
        <p>Please check back later :)</p>
      </article>
    );
  }

  // Show full article for desktop
  return (
    <OutlineProvider>
      <article>
        <header>
          <h1>{title}</h1>
          <time>{date && <time>{date}</time>}</time>
        </header>
        <MDX components={getMDXComponents()} />
        <Support />
      </article>
    </OutlineProvider>
  );
};
