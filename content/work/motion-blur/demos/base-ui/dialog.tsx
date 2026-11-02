"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import { useEffect, useRef, useState } from "react";
import styles from "./dialog.module.css";
import type { ExampleProps } from "./index";
import shared from "./styles.module.css";

type Point = { x: number; y: number };

// When the pointer presses and lets go, as a share of one beat
const PRESS = 0.45;
const RELEASE = 0.56;

function centre(node: Element, container: HTMLElement): Point {
  const box = node.getBoundingClientRect();
  const origin = container.getBoundingClientRect();
  return {
    x: box.left + box.width / 2 - origin.left,
    y: box.top + box.height / 2 - origin.top,
  };
}

export function DialogExample({
  blur,
  options,
  rate,
  step,
  container,
}: ExampleProps) {
  const motion = useMotionBlur(options);
  const trigger = useRef<HTMLSpanElement>(null);
  const cancel = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState<"trigger" | "cancel" | null>(null);
  const [pointer, setPointer] = useState<Point | null>(null);

  // Open on one beat, cancel on the next, rest on the third
  useEffect(() => {
    const beat = 1000 / rate;
    const phase = step % 3;
    const rest = {
      x: container.clientWidth / 2 + 72,
      y: container.clientHeight - 48,
    };
    if (phase === 2 || !trigger.current) {
      setPointer(rest);
      return;
    }
    const target = phase === 0 ? trigger.current : cancel.current;
    if (!target) return;
    setPointer(centre(target, container));
    const press = setTimeout(
      () => setPressed(phase === 0 ? "trigger" : "cancel"),
      beat * PRESS,
    );
    const release = setTimeout(() => {
      setPressed(null);
      setOpen(phase === 0);
    }, beat * RELEASE);
    return () => {
      clearTimeout(press);
      clearTimeout(release);
    };
  }, [step, rate, container]);

  return (
    <Dialog.Root open={open} modal={false}>
      <span
        ref={trigger}
        className={`${shared.trigger} ${styles.trigger}`}
        data-pressed={pressed === "trigger" || undefined}
      >
        Delete Project
      </span>
      <Dialog.Portal container={container} className={shared.portal}>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup
          ref={blur ? motion.ref : undefined}
          className={styles.popup}
          initialFocus={false}
          finalFocus={false}
        >
          <div className={`${shared.surface} ${styles.surface}`}>
            <Dialog.Title className={shared.title}>Delete Project</Dialog.Title>
            <Dialog.Description className={shared.text}>
              This removes the project and its 14 deployments. You can't undo
              it.
            </Dialog.Description>
            <div className={styles.actions}>
              <span
                ref={cancel}
                className={styles.button}
                data-pressed={pressed === "cancel" || undefined}
              >
                Cancel
              </span>
              <span className={styles.button} data-primary="">
                Delete
              </span>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
      {pointer && (
        <span
          className={styles.pointer}
          data-pressed={pressed !== null || undefined}
          style={{ translate: `${pointer.x}px ${pointer.y}px` }}
        >
          <Pointer />
        </span>
      )}
    </Dialog.Root>
  );
}

export function Pointer() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
      <g transform="translate(10 7)">
        <path
          d="m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z"
          fill="#fff"
        />
        <path
          d="m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z"
          fill="#000"
        />
      </g>
    </svg>
  );
}
