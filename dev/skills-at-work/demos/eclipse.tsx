"use client";

import { useEffect, useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

const VARIANTS = ["Circle", "Wipe", "Soft mask"] as const;
type Variant = (typeof VARIANTS)[number];

export function EclipseDemo() {
  const reduced = useReducedMotion();
  const button = useRef<HTMLButtonElement>(null);
  const running = useRef(false);
  const [dark, setDark] = useState(false);
  const [variant, setVariant] = useState<Variant>("Circle");

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("data-eclipse");
      document.documentElement.classList.remove("eclipse-quiet");
    };
  }, []);

  const reveal = () => {
    if (running.current) return;
    const node = button.current;
    if (!node) return;
    const next = !dark;
    const apply = () => setDark(next);
    const view = document.startViewTransition?.bind(document);
    if (!view) {
      apply();
      return;
    }
    const rect = node.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      ),
    );
    const root = document.documentElement;
    root.style.setProperty("--eclipse-x", `${x}px`);
    root.style.setProperty("--eclipse-y", `${y}px`);
    root.style.setProperty("--eclipse-r", `${radius}px`);
    root.dataset.eclipse = reduced
      ? "fade"
      : variant.toLowerCase().replace(" ", "-");
    root.classList.add("eclipse-quiet");
    running.current = true;
    const transition = view(() => {
      apply();
    });
    transition.finished.finally(() => {
      running.current = false;
      root.removeAttribute("data-eclipse");
      root.classList.remove("eclipse-quiet");
    });
  };

  return (
    <Demo>
      <style>{`
        html.eclipse-quiet, html.eclipse-quiet * {
          transition: none !important;
        }
        html[data-eclipse="circle"]::view-transition-old(root) { animation: none; }
        html[data-eclipse="circle"]::view-transition-new(root) {
          animation: eclipse-circle 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        html[data-eclipse="wipe"]::view-transition-old(root) { animation: none; }
        html[data-eclipse="wipe"]::view-transition-new(root) {
          animation: eclipse-wipe 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        html[data-eclipse="soft-mask"]::view-transition-old(root) { animation: none; }
        html[data-eclipse="soft-mask"]::view-transition-new(root) {
          animation: eclipse-mask 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        html[data-eclipse="fade"]::view-transition-old(root),
        html[data-eclipse="fade"]::view-transition-new(root) {
          animation-duration: 150ms;
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes eclipse-circle {
          from { clip-path: circle(0 at var(--eclipse-x) var(--eclipse-y)); }
          to { clip-path: circle(var(--eclipse-r) at var(--eclipse-x) var(--eclipse-y)); }
        }
        @keyframes eclipse-wipe {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes eclipse-mask {
          from { mask-image: radial-gradient(circle 0 at var(--eclipse-x) var(--eclipse-y), #000 0, transparent 48px); }
          to { mask-image: radial-gradient(circle var(--eclipse-r) at var(--eclipse-x) var(--eclipse-y), #000 calc(100% - 48px), transparent 100%); }
        }
      `}</style>
      <div className={styles.stack}>
        <div
          className={styles.stage}
          data-theme={dark ? "dark" : "light"}
          style={{
            minHeight: 140,
            background: dark ? "#111110" : "#fdfdfc",
            color: dark ? "#eeeeec" : "#21201c",
          }}
        >
          <p>{dark ? "Dark" : "Light"}</p>
          <button
            ref={button}
            type="button"
            className={styles.button}
            aria-pressed={dark}
            onClick={reveal}
            style={{ color: dark ? "#eeeeec" : "#21201c" }}
          >
            Theme
          </button>
        </div>
        <Controls>
          <Control
            label="Reveal"
            options={VARIANTS}
            value={variant}
            onChange={setVariant}
          />
        </Controls>
      </div>
    </Demo>
  );
}
