"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Control, Controls } from "@/components/controls";
import {
  prefersReducedMotion,
  supportsViewTransition,
  TILES,
  usePrefersReducedMotion,
} from "./shared";
import styles from "./styles.module.css";

const FILES = [
  { id: "notes", name: "Notes", color: TILES[0].color },
  { id: "sketch", name: "Sketch", color: TILES[2].color },
  { id: "budget", name: "Budget", color: TILES[1].color },
  { id: "photo", name: "Photo", color: TILES[3].color },
] as const;

const FRAMES = ["From thumbnail", "No source frame"] as const;
type Frame = (typeof FRAMES)[number];

const NAME = "apple-open-preview";

type ViewTransitionLike = {
  finished: Promise<void>;
  skipTransition: () => void;
};

function startTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => ViewTransitionLike;
  };
  if (typeof doc.startViewTransition !== "function") return null;
  try {
    return doc.startViewTransition(update);
  } catch {
    return null;
  }
}

export function QuickLook() {
  const stage = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const thumbs = useRef<Record<string, HTMLButtonElement | null>>({});
  const restore = useRef<HTMLElement | null>(null);
  const lock = useRef(false);
  const [open, setOpen] = useState<string | null>(null);
  const [frame, setFrame] = useState<Frame>("From thumbnail");
  const [engine, setEngine] = useState<"view" | "flip" | "fade">("fade");
  const reduce = usePrefersReducedMotion();
  const file = FILES.find((item) => item.id === open) ?? null;
  const fade = frame === "No source frame" || reduce;

  const closeRef = useRef<() => void>(() => {});

  useEffect(() => {
    setEngine(supportsViewTransition() ? "view" : "flip");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    preview.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const finish = (thumb: HTMLElement | null) => {
    lock.current = false;
    if (thumb) thumb.style.viewTransitionName = "";
  };

  const openFile = (id: string, thumb: HTMLButtonElement) => {
    if (lock.current || open) return;
    restore.current = thumb;
    const systemReduce = prefersReducedMotion() || reduce;
    if (frame === "No source frame" || systemReduce || engine === "fade") {
      setOpen(id);
      return;
    }
    if (engine === "view") {
      lock.current = true;
      thumb.style.viewTransitionName = NAME;
      const transition = startTransition(() => {
        thumb.style.viewTransitionName = "";
        flushSync(() => setOpen(id));
      });
      if (!transition) {
        thumb.style.viewTransitionName = "";
        lock.current = false;
        flip(thumb, id, true);
        return;
      }
      transition.finished.finally(() => finish(thumb));
      return;
    }
    flip(thumb, id, true);
  };

  const close = () => {
    const id = open;
    const thumb = id ? thumbs.current[id] : null;
    const current = preview.current;
    if (!id) return;
    const systemReduce = prefersReducedMotion() || reduce;
    if (
      frame === "No source frame" ||
      systemReduce ||
      engine !== "view" ||
      !current ||
      !thumb
    ) {
      if (
        engine === "flip" &&
        thumb &&
        current &&
        !systemReduce &&
        frame !== "No source frame"
      ) {
        flip(thumb, id, false);
        return;
      }
      if (current && (frame === "No source frame" || systemReduce)) {
        const animation = current.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: systemReduce ? 0 : 200,
          fill: "both",
        });
        animation.finished.finally(() => {
          setOpen(null);
          restore.current?.focus();
        });
        return;
      }
      setOpen(null);
      restore.current?.focus();
      return;
    }
    lock.current = true;
    const transition = startTransition(() => {
      flushSync(() => setOpen(null));
      thumb.style.viewTransitionName = NAME;
    });
    if (!transition) {
      lock.current = false;
      setOpen(null);
      restore.current?.focus();
      return;
    }
    transition.finished.finally(() => {
      finish(thumb);
      restore.current?.focus();
    });
  };

  const flip = (thumb: HTMLElement, id: string, opening: boolean) => {
    if (opening) {
      flushSync(() => setOpen(id));
      const panel = preview.current;
      if (!panel) return;
      const from = thumb.getBoundingClientRect();
      const to = panel.getBoundingClientRect();
      panel.animate(flipFrames(from, to, true), flipTiming);
      return;
    }
    const panel = preview.current;
    if (!panel) {
      setOpen(null);
      return;
    }
    const from = panel.getBoundingClientRect();
    const to = thumb.getBoundingClientRect();
    const animation = panel.animate(flipFrames(from, to, false), flipTiming);
    animation.finished.finally(() => {
      setOpen(null);
      restore.current?.focus();
    });
  };

  closeRef.current = close;

  return (
    <div className={styles.demo} data-demo-id="quick-look">
      <div ref={stage} className={styles.files}>
        <div className={styles.fileGrid} inert={open ? true : undefined}>
          {FILES.map((item) => (
            <button
              key={item.id}
              ref={(node) => {
                thumbs.current[item.id] = node;
              }}
              type="button"
              className={styles.fileButton}
              data-file={item.id}
              onClick={(event) => openFile(item.id, event.currentTarget)}
            >
              <span className={styles.fileThumb}>
                <span
                  className={styles.fileSwatch}
                  style={{ background: item.color }}
                />
                <span className={styles.fileMeta}>
                  <span className={styles.fileLine} />
                  <span className={`${styles.fileLine} ${styles.barShort}`} />
                </span>
              </span>
              <span className={styles.fileName}>{item.name}</span>
            </button>
          ))}
        </div>
        {file && (
          <div
            ref={preview}
            className={styles.preview}
            role="dialog"
            aria-modal="true"
            aria-label={`${file.name} preview`}
            tabIndex={-1}
            data-engine={fade ? "fade" : engine}
            style={{
              viewTransitionName: !fade && engine === "view" ? NAME : undefined,
              opacity: fade ? undefined : 1,
            }}
          >
            {fade && <Fade />}
            <div
              className={styles.previewSwatchLarge}
              style={{ background: file.color }}
            />
            <p className={styles.previewTitle}>{file.name}</p>
            <button
              type="button"
              className={styles.previewClose}
              onClick={close}
            >
              Close
            </button>
          </div>
        )}
      </div>
      <Controls>
        <Control
          label="Source frame"
          options={FRAMES}
          value={frame}
          onChange={setFrame}
        />
      </Controls>
    </div>
  );
}

const flipTiming: KeyframeAnimationOptions = {
  duration: 300,
  easing: "cubic-bezier(0.32, 0.72, 0, 1)",
  fill: "both",
};

function flipFrames(from: DOMRect, to: DOMRect, opening: boolean): Keyframe[] {
  const start = {
    transformOrigin: "0 0",
    transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
  };
  const end = { transformOrigin: "0 0", transform: "none" };
  return opening ? [start, end] : [end, start];
}

function Fade() {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const node = ref.current?.parentElement;
    if (!node) return;
    const animation = node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: prefersReducedMotion() ? 0 : 200,
      fill: "both",
    });
    return () => animation.cancel();
  }, []);
  return <span ref={ref} hidden />;
}
