"use client";

import clsx from "clsx";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { IconBug, IconXmark } from "@/components/icons";
import { LabPanel, labAttributes, useLab } from "@/components/lab";
import styles from "./styles.module.css";

export function Showcase({
  children,
  code,
}: {
  children: ReactNode;
  code: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const closed = useRef<number | null>(null);
  const from = useRef<number | null>(null);
  const lab = useLab(root);
  const [editable, setEditable] = useState(false);
  const attributes = labAttributes(lab);

  useLayoutEffect(() => {
    setEditable(Boolean(root.current?.querySelector("[data-controls]")));
  }, []);

  // The grid's columns and margins transition in CSS; height can't go to and
  // from auto there, so it is tweened here between the two measured heights.
  useLayoutEffect(() => {
    const element = root.current;
    const start = from.current;
    from.current = null;
    if (!element || start === null) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Closing, the panel holds its height until the frame has shrunk, so the
    // frame heads back to the height it opened from.
    if (lab.open) closed.current = start;
    const end = lab.open ? element.offsetHeight : (closed.current ?? start);
    if (start === end) return;
    element.animate(
      [
        { height: `${start}px`, overflow: "clip" },
        { height: `${end}px`, overflow: "clip" },
      ],
      { duration: 400, easing: "cubic-bezier(0.165, 0.84, 0.44, 1)" },
    );
  }, [lab.open]);

  const toggle = () => {
    from.current = root.current?.offsetHeight ?? null;
    lab.toggle();
  };

  return (
    <div
      ref={root}
      {...attributes}
      className={clsx(styles.showcase, attributes.className)}
      data-showcase
      data-editable={editable || undefined}
    >
      <div className={styles.panel}>
        {children}
        {editable && (
          <button
            type="button"
            className={styles.debug}
            onClick={toggle}
            aria-pressed={lab.open}
            aria-label={lab.open ? "Close Debug" : "Debug"}
            data-lab-ui
          >
            {lab.open ? <IconXmark size={16} /> : <IconBug size={16} />}
          </button>
        )}
      </div>
      {editable && (
        <div className={styles.lab} inert={!lab.open} data-lab-ui>
          <LabPanel lab={lab} />
        </div>
      )}
      {code}
    </div>
  );
}
