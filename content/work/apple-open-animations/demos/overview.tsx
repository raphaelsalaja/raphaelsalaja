"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import {
  lerp,
  SPEED,
  SPEEDS,
  type Speed,
  smooth,
  TILES,
  useOnScreen,
  usePrefersReducedMotion,
} from "./shared";
import styles from "./styles.module.css";

type Box = { x: number; y: number; w: number; h: number };

const OPEN = 0.7;
const HOLD = 0.95;
const DOTS = [
  { id: "notes-a", tile: 0 },
  { id: "maps-a", tile: 1 },
  { id: "photos-a", tile: 2 },
  { id: "music", tile: 3 },
  { id: "mail", tile: 4 },
  { id: "files", tile: 5 },
  { id: "notes-b", tile: 0 },
  { id: "maps-b", tile: 1 },
  { id: "photos-b", tile: 2 },
] as const;

function readBox(frame: HTMLElement, el: HTMLElement): Box {
  const previous = el.style.transform;
  el.style.transform = "none";
  const frameBox = frame.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  el.style.transform = previous;
  return {
    x: box.left - frameBox.left,
    y: box.top - frameBox.top,
    w: box.width,
    h: box.height,
  };
}

function morph(
  el: HTMLElement,
  from: Box,
  to: Box,
  progress: number,
  radius: [number, number],
  reduce: boolean,
) {
  if (reduce) {
    el.style.transform = "none";
    el.style.borderRadius = `${radius[1]}px`;
    el.style.opacity = String(progress);
    return;
  }
  const width = lerp(from.w, to.w, progress);
  const height = lerp(from.h, to.h, progress);
  const x = lerp(from.x, to.x, progress);
  const y = lerp(from.y, to.y, progress);
  const scaleX = width / Math.max(to.w, 1);
  const scaleY = height / Math.max(to.h, 1);
  const radiusPx = lerp(radius[0], radius[1], progress);
  el.style.transformOrigin = "0 0";
  el.style.transform = `translate(${x - to.x}px, ${y - to.y}px) scale(${scaleX}, ${scaleY})`;
  el.style.borderRadius = `${radiusPx / Math.max(scaleX, 0.001)}px / ${radiusPx / Math.max(scaleY, 0.001)}px`;
  el.style.opacity = "1";
}

function morphUniform(
  el: HTMLElement,
  from: Box,
  to: Box,
  progress: number,
  reduce: boolean,
) {
  if (reduce) {
    el.style.transform = "none";
    el.style.opacity = String(progress);
    return;
  }
  const fit = Math.min(from.w / to.w, from.h / to.h);
  const scale = lerp(fit, 1, progress);
  const startX = from.x + (from.w - to.w * fit) / 2;
  const startY = from.y + (from.h - to.h * fit) / 2;
  el.style.transformOrigin = "0 0";
  el.style.transform = `translate(${lerp(startX, to.x, progress) - to.x}px, ${lerp(startY, to.y, progress) - to.y}px) scale(${scale})`;
  el.style.opacity = "1";
}

export function Overview({
  forceReduce = null,
}: {
  /** null follows the system setting. A boolean is the demo's own toggle. */
  forceReduce?: boolean | null;
}) {
  const root = useRef<HTMLDivElement>(null);
  const appFrame = useRef<HTMLDivElement>(null);
  const appFrom = useRef<HTMLDivElement>(null);
  const appTo = useRef<HTMLDivElement>(null);
  const folderFrame = useRef<HTMLDivElement>(null);
  const folderFrom = useRef<HTMLDivElement>(null);
  const folderTo = useRef<HTMLDivElement>(null);
  const folderVeil = useRef<HTMLDivElement>(null);
  const windowFrame = useRef<HTMLDivElement>(null);
  const windowFrom = useRef<HTMLDivElement>(null);
  const windowTo = useRef<HTMLDivElement>(null);
  const previewFrame = useRef<HTMLDivElement>(null);
  const previewFrom = useRef<HTMLDivElement>(null);
  const previewTo = useRef<HTMLDivElement>(null);
  const boxes = useRef<Record<string, { from: Box; to: Box }>>({});
  const [speed, setSpeed] = useState<Speed>("1×");
  const system = usePrefersReducedMotion();
  const onScreen = useOnScreen(root, 0.15);
  const reduce = forceReduce ?? system;

  useEffect(() => {
    const frames: [
      string,
      HTMLElement | null,
      HTMLElement | null,
      HTMLElement | null,
    ][] = [
      ["app", appFrame.current, appFrom.current, appTo.current],
      ["folder", folderFrame.current, folderFrom.current, folderTo.current],
      ["window", windowFrame.current, windowFrom.current, windowTo.current],
      ["preview", previewFrame.current, previewFrom.current, previewTo.current],
    ];
    const measure = () => {
      for (const [key, frame, from, to] of frames) {
        if (!frame || !from || !to) continue;
        boxes.current[key] = {
          from: readBox(frame, from),
          to: readBox(frame, to),
        };
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen) return;
    const openFor = reduce ? 0.2 : OPEN;
    const cycle = 2 * (openFor + HOLD);
    let time = 0;
    let last = 0;
    let id = 0;

    const apply = (progress: number) => {
      const app = boxes.current.app;
      const folder = boxes.current.folder;
      const win = boxes.current.window;
      const preview = boxes.current.preview;
      if (app && appTo.current) {
        morph(appTo.current, app.from, app.to, progress, [5, 16], reduce);
      }
      if (folder && folderTo.current) {
        morph(
          folderTo.current,
          folder.from,
          folder.to,
          progress,
          [6, 16],
          reduce,
        );
        if (folderFrom.current) {
          folderFrom.current.style.opacity = reduce
            ? String(1 - progress)
            : "1";
        }
      }
      if (folderVeil.current)
        folderVeil.current.style.opacity = String(progress);
      if (win && windowTo.current) {
        morphUniform(windowTo.current, win.from, win.to, progress, reduce);
      }
      if (preview && previewTo.current) {
        morph(
          previewTo.current,
          preview.from,
          preview.to,
          progress,
          [6, 14],
          reduce,
        );
      }
    };

    const tick = (now: number) => {
      const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += delta * (reduce ? 1 : SPEED[speed]);
      const t = time % cycle;
      let progress = 0;
      if (t < openFor) progress = smooth(t / openFor);
      else if (t < openFor + HOLD) progress = 1;
      else if (t < openFor + HOLD + openFor) {
        progress = smooth(1 - (t - openFor - HOLD) / openFor);
      }
      apply(progress);
      id = requestAnimationFrame(tick);
    };

    apply(0);
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onScreen, reduce, speed]);

  return (
    <div
      ref={root}
      className={styles.demo}
      data-demo-id="overview"
      data-reduced={reduce ? "true" : "false"}
    >
      <div className={styles.overviewGrid}>
        <Mini label="App">
          <div ref={appFrame} className={styles.frame}>
            <div className={styles.homeIcons}>
              {TILES.slice(0, 4).map((tile, index) => (
                <div
                  key={tile.id}
                  ref={index === 0 ? appFrom : undefined}
                  className={styles.homeIcon}
                  style={{ background: tile.color }}
                />
              ))}
            </div>
            <div
              ref={appTo}
              className={styles.growing}
              style={{ background: TILES[0].color }}
            >
              <span className={styles.bar} />
              <span className={`${styles.bar} ${styles.barShort}`} />
            </div>
          </div>
        </Mini>
        <Mini label="Folder">
          <div ref={folderFrame} className={styles.frame}>
            <div ref={folderVeil} className={styles.veil} />
            <div className={styles.folderAnchor}>
              <div ref={folderFrom} className={styles.folderClosed}>
                {DOTS.map((dot) => (
                  <span
                    key={`closed-${dot.id}`}
                    className={styles.folderDot}
                    style={{ background: TILES[dot.tile].color }}
                  />
                ))}
              </div>
            </div>
            <div ref={folderTo} className={styles.folderOpen}>
              {DOTS.map((dot) => (
                <span
                  key={`open-${dot.id}`}
                  className={styles.folderDot}
                  style={{ background: TILES[dot.tile].color }}
                />
              ))}
            </div>
          </div>
        </Mini>
        <Mini label="Window">
          <div ref={windowFrame} className={styles.frame}>
            <div ref={windowTo} className={styles.windowOpen}>
              <div className={styles.windowTitle} />
              <span
                className={styles.bar}
                style={{ background: TILES[0].color }}
              />
              <span
                className={`${styles.bar} ${styles.barShort}`}
                style={{ background: TILES[2].color }}
              />
            </div>
            <div className={styles.dock}>
              <span
                className={styles.dockTile}
                style={{ background: TILES[1].color }}
              />
              <span
                ref={windowFrom}
                className={`${styles.dockTile} ${styles.dockTarget}`}
                style={{ background: TILES[4].color }}
              />
              <span
                className={styles.dockTile}
                style={{ background: TILES[3].color }}
              />
            </div>
          </div>
        </Mini>
        <Mini label="Preview">
          <div ref={previewFrame} className={styles.frame}>
            <div ref={previewFrom} className={styles.thumb}>
              <div
                className={styles.thumbFace}
                style={{ background: TILES[2].color }}
              />
              <div className={styles.thumbLines}>
                <span className={styles.thumbLine} />
                <span className={`${styles.thumbLine} ${styles.barShort}`} />
              </div>
            </div>
            <div ref={previewTo} className={styles.previewOpen}>
              <div
                className={styles.previewSwatch}
                style={{ background: TILES[2].color }}
              />
              <span className={styles.bar} />
              <span className={`${styles.bar} ${styles.barShort}`} />
            </div>
          </div>
        </Mini>
      </div>
      <Controls>
        <Control
          label="Speed"
          options={SPEEDS}
          value={speed}
          onChange={setSpeed}
        />
      </Controls>
    </div>
  );
}

function Mini({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.mini}>
      {children}
      <span className={styles.miniLabel}>{label}</span>
    </div>
  );
}
