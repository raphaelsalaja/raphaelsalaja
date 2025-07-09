"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useOutline } from "@/hooks/useOutline";
import type { OutlineProps } from "../types";
import { ExpandedOutline } from "./expanded";
import { MinimizedOutline } from "./minimized";

export const OutlineProvider: React.FC<OutlineProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const defaultContentRef = useRef<HTMLDivElement>(null);
  const contentRef = "contentRef" in props ? props.contentRef! : defaultContentRef;

  useEffect(() => {
    if (contentRef.current) setRootElement(contentRef.current);
  }, [contentRef]);

  const providedLinks = "headingLinks" in props ? props.headingLinks : undefined;
  const providedActive = "contentIsActive" in props ? props.contentIsActive : undefined;

  const { headingLinks: calcLinks, contentIsActive: calcActive } = useOutline(
    rootElement ? { rootElement, offset: 120 } : undefined,
  );

  const headingLinks = providedLinks ?? calcLinks;
  const contentIsActive = providedActive ?? calcActive;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fragment>
      <MinimizedOutline headingLinks={headingLinks} contentIsActive={contentIsActive} isHovered={isHovered} />

      <ExpandedOutline
        headingLinks={headingLinks}
        contentIsActive={contentIsActive}
        isHovered={isHovered}
        onHoverChange={setIsHovered}
      />

      {"children" in props && (
        <div
          ref={(node) => {
            if (contentRef === defaultContentRef) {
              defaultContentRef.current = node;
              if (node) setRootElement(node);
            }
          }}
        >
          {props.children}
        </div>
      )}
    </Fragment>
  );
};
