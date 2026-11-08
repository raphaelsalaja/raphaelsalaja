"use client";

import { useEffect, useRef, useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

type Shape = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  kind: "text" | "box";
};

type Badge = { id?: string; text: string; x: number; y: number };

function lineRects(node: HTMLElement, origin: DOMRect) {
  const shapes: Shape[] = [];
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let index = 0;
  while (walker.nextNode()) {
    const text = walker.currentNode;
    const value = text.textContent?.trim();
    if (!value || !text.parentElement) continue;
    const range = document.createRange();
    range.selectNodeContents(text);
    for (const rect of range.getClientRects()) {
      if (rect.width < 2 || rect.height < 2) continue;
      shapes.push({
        id: `line-${index}`,
        x: rect.left - origin.left,
        y: rect.top - origin.top + rect.height * 0.19,
        width: rect.width,
        height: rect.height * 0.62,
        radius: 999,
        kind: "text",
      });
      index += 1;
    }
  }
  return shapes;
}

export function WireframeDemo() {
  const reduced = useReducedMotion();
  const fixture = useRef<HTMLDivElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [on, setOn] = useState(false);
  const [wiping, setWiping] = useState<"in" | "out" | null>(null);
  const [badge, setBadge] = useState<Badge | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const measure = () => {
    const node = fixture.current;
    if (!node) return [];
    const origin = node.getBoundingClientRect();
    const boxes = [...node.querySelectorAll<HTMLElement>("[data-box]")].map(
      (element, index) => {
        const rect = element.getBoundingClientRect();
        const radius =
          Number.parseFloat(getComputedStyle(element).borderRadius) || 0;
        return {
          id: `box-${index}`,
          x: rect.left - origin.left,
          y: rect.top - origin.top,
          width: rect.width,
          height: rect.height,
          radius,
          kind: "box" as const,
        };
      },
    );
    return [...lineRects(node, origin), ...boxes];
  };

  const enter = () => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setShapes(measure());
    setOn(true);
    setWiping(reduced ? null : "in");
  };

  const exit = () => {
    if (!on) return;
    if (reduced) {
      setOn(false);
      returnFocus.current?.focus();
      return;
    }
    setWiping("out");
    window.setTimeout(() => {
      setOn(false);
      setWiping(null);
      returnFocus.current?.focus();
    }, 240);
  };

  useEffect(() => {
    if (!on) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        exit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onMove = (event: React.PointerEvent) => {
    const node = fixture.current;
    if (!node || !on) return;
    const origin = node.getBoundingClientRect();
    const x = event.clientX - origin.left;
    const y = event.clientY - origin.top;
    const hit = [...shapes]
      .reverse()
      .find(
        (shape) =>
          x >= shape.x &&
          x <= shape.x + shape.width &&
          y >= shape.y &&
          y <= shape.y + shape.height,
      );
    const style = getComputedStyle(node);
    const pad = Math.round(Number.parseFloat(style.paddingTop));
    const row = node.querySelector("[data-row]");
    const gap = row
      ? Math.round(Number.parseFloat(getComputedStyle(row).gap || "0"))
      : 0;
    const width = Math.round(hit?.width ?? origin.width);
    const height = Math.round(hit?.height ?? origin.height);
    setBadge({
      id: hit?.id,
      text: `Padding ${pad}, gap ${gap}, ${width}×${height}`,
      x: x + 12,
      y: y + 12,
    });
  };

  return (
    <Demo>
      <div className={styles.stack}>
        <div
          ref={fixture}
          className={styles.stage}
          style={{ minHeight: 160, padding: 16 }}
        >
          <strong>Inbox</strong>
          <p>Three notes from this morning, still unread.</p>
          <div data-row="" className={styles.row} style={{ gap: 8 }}>
            <span
              data-box=""
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--gray-5)",
              }}
            />
            <button type="button" className={styles.button} data-box="">
              Reply
            </button>
          </div>
          {on && (
            <div
              role="presentation"
              onPointerMove={onMove}
              onPointerLeave={() => setBadge(null)}
              style={{
                position: "absolute",
                inset: 0,
                background: "#f2f2f2",
                animation:
                  wiping && !reduced
                    ? `${wiping === "in" ? "wire-in" : "wire-out"} 240ms linear forwards`
                    : undefined,
              }}
            >
              <style>{`
                @keyframes wire-in { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
                @keyframes wire-out { from { clip-path: inset(0); } to { clip-path: inset(0 0 0 100%); } }
              `}</style>
              {shapes.map((shape) => (
                <span
                  key={shape.id}
                  style={{
                    position: "absolute",
                    left: shape.x,
                    top: shape.y,
                    width: shape.width,
                    height: shape.height,
                    borderRadius: shape.radius,
                    background:
                      badge?.id === shape.id
                        ? "rgba(20, 131, 244, 0.16)"
                        : shape.kind === "text"
                          ? "#c7c6c9"
                          : "#e4e4e7",
                    boxShadow:
                      badge?.id === shape.id
                        ? "inset 0 0 0 1px #1483f4"
                        : undefined,
                  }}
                />
              ))}
              {badge && (
                <span
                  style={{
                    position: "absolute",
                    left: badge.x,
                    top: badge.y,
                    padding: "2px 6px",
                    color: "#fff",
                    background: "#1483f4",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                >
                  {badge.text}
                </span>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <button
            ref={openButton}
            type="button"
            className={styles.button}
            onClick={enter}
          >
            Enter Wireframe
          </button>
          <button type="button" className={styles.button} onClick={exit}>
            Exit
          </button>
        </div>
      </div>
    </Demo>
  );
}
