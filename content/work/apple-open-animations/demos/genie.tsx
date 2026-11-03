"use client";

import { useEffect, useRef, useState } from "react";
import { Control, ControlButton, Controls } from "@/components/controls";
import {
  clamp,
  lerp,
  observeBox,
  SPEED,
  SPEEDS,
  type Speed,
  smooth,
  TILES,
  useOnScreen,
  usePrefersReducedMotion,
} from "./shared";
import styles from "./styles.module.css";

type Rect = { x: number; y: number; width: number; height: number };

type Run = { from: number; to: number; duration: number; elapsed: number };

const MODES = ["Genie", "Scale"] as const;
type Mode = (typeof MODES)[number];

const ease = bezier(0.4, 0, 0.2, 1);

export function Genie() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const tile = useRef<HTMLSpanElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const snapshot = useRef<HTMLCanvasElement | null>(null);
  const geom = useRef<{ from: Rect; to: Rect } | null>(null);
  const progress = useRef(0);
  const run = useRef<Run | null>(null);
  const [mode, setMode] = useState<Mode>("Genie");
  const [speed, setSpeed] = useState<Speed>("1×");
  const [clock, setClock] = useState(0);
  const [atDock, setAtDock] = useState(false);
  const reduce = usePrefersReducedMotion();
  const onScreen = useOnScreen(stage, 0.25);
  const modeRef = useRef(mode);
  const reduceRef = useRef(reduce);
  const onScreenRef = useRef(onScreen);
  modeRef.current = mode;
  reduceRef.current = reduce;
  onScreenRef.current = onScreen;

  const paint = (value: number) => {
    progress.current = value;
    const node = stage.current;
    const surface = win.current;
    const slot = tile.current;
    const board = canvas.current;
    const boxes = geom.current;
    if (range.current) range.current.value = String(value);
    if (readout.current)
      readout.current.textContent = `${Math.round(value * 100)}%`;
    setAtDock(value > 0.5);
    if (!node || !surface || !slot || !boxes) return;

    if (reduceRef.current) {
      if (board) board.style.opacity = "0";
      surface.style.visibility = "visible";
      surface.style.transform = "none";
      surface.style.opacity = String(1 - value);
      slot.style.opacity = String(0.35 + value * 0.65);
      return;
    }

    slot.style.opacity = "1";
    if (modeRef.current === "Scale") {
      if (board) board.style.opacity = "0";
      surface.style.visibility = "visible";
      surface.style.opacity = "1";
      const fit = Math.min(
        boxes.to.width / boxes.from.width,
        boxes.to.height / boxes.from.height,
      );
      const scale = lerp(1, fit, value);
      const endX = boxes.to.x + (boxes.to.width - boxes.from.width * fit) / 2;
      const endY = boxes.to.y + (boxes.to.height - boxes.from.height * fit) / 2;
      const x = lerp(0, endX - boxes.from.x, value);
      const y = lerp(0, endY - boxes.from.y, value);
      surface.style.transformOrigin = "0 0";
      surface.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      return;
    }

    surface.style.visibility = "hidden";
    surface.style.transform = "none";
    const context = board?.getContext("2d");
    const image = snapshot.current;
    if (!board || !context || !image) return;
    board.style.opacity = "1";
    const ratio = board.width / Math.max(board.clientWidth, 1);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawGenie(
      context,
      image,
      boxes.from,
      boxes.to,
      value,
      node.clientWidth,
      node.clientHeight,
    );
  };
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    const node = stage.current;
    const surface = win.current;
    const slot = tile.current;
    const board = canvas.current;
    if (!node || !surface || !slot || !board) return;

    const measure = () => {
      const previous = surface.style.transform;
      surface.style.transform = "none";
      const from = relative(node, surface);
      surface.style.transform = previous;
      geom.current = { from, to: relative(node, slot) };
      snapshot.current = drawSnapshot(surface, from.width, from.height);
      paintRef.current(progress.current);
    };

    measure();
    const stop = observeBox(board, (_css, pixels) => {
      if (board.width !== pixels.width) board.width = pixels.width;
      if (board.height !== pixels.height) board.height = pixels.height;
      measure();
    });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: clock restarts the pour, and mode or reduced motion changes how that progress is drawn
  useEffect(() => {
    if (!onScreen) return;
    let last = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (!onScreenRef.current) return;
      const delta = last ? now - last : 0;
      last = now;
      const current = run.current;
      if (!current) return;
      current.elapsed += delta;
      const t = clamp(current.elapsed / current.duration);
      paintRef.current(current.from + (current.to - current.from) * ease(t));
      if (t >= 1) {
        run.current = null;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    paintRef.current(progress.current);
    if (run.current) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clock, onScreen, mode, reduce]);

  const go = (target: number) => {
    const from = progress.current;
    if (Math.abs(from - target) < 0.001) {
      paint(target);
      return;
    }
    run.current = {
      from,
      to: target,
      duration: (reduce ? 200 : 500) / SPEED[speed],
      elapsed: 0,
    };
    if (!onScreen) {
      paint(target);
      run.current = null;
      return;
    }
    setClock((value) => value + 1);
  };

  return (
    <div ref={root} className={styles.demo} data-demo-id="genie">
      <div ref={stage} className={styles.desktop}>
        <canvas ref={canvas} className={styles.canvas} aria-hidden />
        <div ref={win} className={styles.desktopWindow} data-window>
          <div className={styles.windowTitle} />
          <span className={styles.bar} style={{ background: TILES[0].color }} />
          <span
            className={`${styles.bar} ${styles.barShort}`}
            style={{ background: TILES[2].color }}
          />
        </div>
        <div className={styles.desktopDock}>
          <span
            className={styles.desktopTile}
            style={{ background: TILES[1].color }}
          />
          <span
            className={styles.desktopTile}
            style={{ background: TILES[3].color }}
          />
          <span
            ref={tile}
            className={styles.desktopTile}
            data-tile
            style={{ background: TILES[4].color }}
          />
          <span
            className={styles.desktopTile}
            style={{ background: TILES[5].color }}
          />
        </div>
      </div>
      <Controls>
        <ControlButton onClick={() => go(1)}>Minimise</ControlButton>
        <ControlButton onClick={() => go(0)}>Restore</ControlButton>
        <Control
          label="Effect"
          options={MODES}
          value={mode}
          onChange={setMode}
        />
        <Control
          label="Speed"
          options={SPEEDS}
          value={speed}
          onChange={setSpeed}
        />
        <label className={styles.scrubRow}>
          <span className={styles.scrubLabel}>Progress</span>
          <input
            ref={range}
            className={styles.scrubber}
            type="range"
            min={0}
            max={1}
            step={0.001}
            defaultValue={0}
            aria-valuetext={atDock ? "Minimised" : "Open"}
            onInput={(event) => {
              run.current = null;
              paint(Number(event.currentTarget.value));
            }}
          />
          <span ref={readout} className={styles.scrubValue}>
            0%
          </span>
        </label>
      </Controls>
    </div>
  );
}

function relative(stage: HTMLElement, el: HTMLElement): Rect {
  const outer = stage.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  return {
    x: box.left - outer.left,
    y: box.top - outer.top,
    width: box.width,
    height: box.height,
  };
}

function drawSnapshot(surface: HTMLElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const computed = getComputedStyle(surface);
  const bars = [...surface.querySelectorAll("span")].map(
    (bar) => getComputedStyle(bar).backgroundColor,
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  roundedRect(ctx, canvas.width, canvas.height, 12);
  ctx.fillStyle = computed.backgroundColor;
  ctx.fill();
  ctx.fillStyle = getComputedStyle(
    surface.firstElementChild ?? surface,
  ).backgroundColor;
  ctx.fillRect(12, 12, canvas.width * 0.4, 8);
  ctx.fillStyle = bars[0] || computed.color;
  ctx.fillRect(12, 32, canvas.width - 24, 14);
  ctx.fillStyle = bars[1] || computed.color;
  ctx.fillRect(12, 54, canvas.width * 0.62, 14);
  return canvas;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(0, 0, width, height, radius);
    return;
  }
  ctx.rect(0, 0, width, height);
}

// progress 0 is the open window, 1 is the window inside the Dock tile.
function drawGenie(
  ctx: CanvasRenderingContext2D,
  snapshot: CanvasImageSource & { width: number; height: number },
  from: Rect,
  to: Rect,
  progress: number,
  viewWidth: number,
  viewHeight: number,
) {
  const bend = smooth(clamp(progress / 0.4));
  const pour = smooth(clamp((progress - 0.25) / 0.75));
  const funnelTop = from.y;
  const funnelBottom = to.y + to.height;
  const top = lerp(from.y, to.y, pour);
  const bottom = lerp(from.y + from.height, funnelBottom, pour);

  ctx.clearRect(0, 0, viewWidth, viewHeight);
  if (bottom - top < 1) return;

  for (let y = Math.floor(top); y < bottom; y++) {
    const depth = smooth(clamp((y - funnelTop) / (funnelBottom - funnelTop)));
    const left = lerp(from.x, lerp(from.x, to.x, depth), bend);
    const right = lerp(
      from.x + from.width,
      lerp(from.x + from.width, to.x + to.width, depth),
      bend,
    );
    const sourceY = ((y - top) / (bottom - top)) * snapshot.height;
    ctx.drawImage(
      snapshot,
      0,
      sourceY,
      snapshot.width,
      1,
      left,
      y,
      Math.max(right - left, 0.5),
      1,
    );
  }
}

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slope = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (u: number) => {
    let t = u;
    for (let i = 0; i < 6; i++) {
      const error = sampleX(t) - u;
      const derivative = slope(t);
      if (Math.abs(error) < 1e-4) break;
      if (derivative > 1e-4) t -= error / derivative;
    }
    return sampleY(clamp(t));
  };
}
