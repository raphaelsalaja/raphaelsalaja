"use client";

import React, { Fragment, useCallback, useState } from "react";
import { TableOfContents } from "@/components/table-of-contents";
import { useTableOfContents } from "@/hooks/useTableOfContents";
import { components } from "@/utils/components";
import styles from "./styles.module.css";

export const Home: React.FC = () => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setRootElement(node);
    }
  }, []);

  const { headingLinks, contentIsActive } = useTableOfContents(
    rootElement
      ? {
          rootElement,
          offset: 120,
        }
      : undefined,
  );

  return (
    <React.Fragment>
      <TableOfContents headingLinks={headingLinks} contentIsActive={contentIsActive} />
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <h1 id="design-system">rs/design</h1>
          <p>Elegant, accessible components built on Base UI primitives.</p>
          <h1 id="about">About</h1>
          <p>
            Explore my comprehensive design system with fully customizable components that follow best practices for
            accessibility and performance.
          </p>
          <div className={styles.divider} />
          {Object.entries(components).map(([title, component]) => (
            <Fragment key={title}>
              <h1 id={title.toLowerCase().replace(/\s+/g, "-")}>{title}</h1>
              <h2 id={`${title.toLowerCase().replace(/\s+/g, "-")}-description`}>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <div className={styles.component}>
                <div>{component}</div>
              </div>
              <h3 id={`${title.toLowerCase().replace(/\s+/g, "-")}-random-number`}>
                {Math.floor(Math.random() * 1000) + 1}
              </h3>
            </Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
