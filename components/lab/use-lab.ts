"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
} from "react";
import * as clock from "./clock";

export const SPEEDS = ["1×", "½×", "¼×", "⅒×"] as const;
export type Speed = (typeof SPEEDS)[number];
const RATES: Record<Speed, number> = {
  "1×": 1,
  "½×": 0.5,
  "¼×": 0.25,
  "⅒×": 0.1,
};

export const OUTLINES = ["Off", "Moving", "All"] as const;
export type Outline = (typeof OUTLINES)[number];

const WINDOW = 180;
const STILL = 0.5;
const KEYS = new Set(["offset", "computedOffset", "easing", "composite"]);

export type Running = {
  id: number;
  name: string;
  duration: number;
  easing: string;
  progress: number;
};

export type Snapshot = {
  motion: number[];
  time: number;
  frame: number;
  moving: number;
  running: Running[];
};

const EMPTY: Snapshot = {
  motion: [],
  time: 0,
  frame: 0,
  moving: 0,
  running: [],
};

// The clock is global, so only one lab runs at a time.
let owner: string | null = null;
const listeners = new Set<() => void>();
function claim(next: string | null) {
  owner = next;
  for (const listener of listeners) listener();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const ids = new WeakMap<Animation, number>();
let nextId = 0;

function describe(animation: Animation): Running {
  if (!ids.has(animation)) ids.set(animation, nextId++);
  const effect = animation.effect as KeyframeEffect | null;
  const timing = effect?.getComputedTiming();
  let name = "animation";
  if (animation instanceof CSSTransition) name = animation.transitionProperty;
  else if (animation instanceof CSSAnimation) {
    name = animation.animationName.replace(/^.*__/, "");
  } else if (effect) {
    const props = new Set(
      effect.getKeyframes().flatMap((keyframe) => Object.keys(keyframe)),
    );
    name = [...props].filter((prop) => !KEYS.has(prop)).join(", ") || name;
  }
  return {
    id: ids.get(animation) ?? 0,
    name,
    duration: Number(timing?.duration) || 0,
    easing: effect?.getTiming().easing ?? "linear",
    progress: timing?.progress ?? 0,
  };
}

export function useLab(root: RefObject<HTMLElement | null>) {
  const id = useId();
  const open = useSyncExternalStore(
    subscribe,
    () => owner === id,
    () => false,
  );
  const [speed, setSpeed] = useState<Speed>("1×");
  const [paused, setPaused] = useState(false);
  const [outlines, setOutlines] = useState<Outline>("Moving");
  const [snapshot, setSnapshot] = useState<Snapshot>(EMPTY);

  useEffect(() => {
    if (!open) return;
    clock.install();
    clock.setRate(RATES[speed]);
  }, [open, speed]);

  useEffect(() => {
    if (open) clock.setPaused(paused);
  }, [open, paused]);

  useEffect(() => {
    const element = root.current;
    if (!open || !element) return;
    let previous = new WeakMap<Element, number[]>();
    const motion: number[] = [];
    const start = clock.now();
    let last = Number.NaN;
    let count = 0;
    let request = 0;

    const tick = () => {
      clock.sync(element);
      const time = clock.now();
      if (clock.framing(element)) {
        previous = new WeakMap();
        request = clock.frame(tick);
        return;
      }
      if (time !== last) {
        last = time;
        count++;
        const box = element.getBoundingClientRect();
        let total = 0;
        let moving = 0;
        for (const node of element.querySelectorAll("*")) {
          if (node.closest("[data-lab-ui], [data-controls]")) continue;
          const rect = node.getBoundingClientRect();
          const next = [
            rect.x - box.x,
            rect.y - box.y,
            rect.width,
            rect.height,
            Number(getComputedStyle(node).opacity) * 100,
          ];
          const before = previous.get(node);
          previous.set(node, next);
          const delta = before
            ? next.reduce(
                (sum, value, i) => sum + Math.abs(value - before[i]),
                0,
              )
            : 0;
          const isMoving = delta > STILL;
          node.toggleAttribute("data-lab-moving", isMoving);
          if (isMoving) moving++;
          total += delta;
        }
        motion.push(total);
        if (motion.length > WINDOW) motion.shift();
        setSnapshot({
          motion: [...motion],
          time: time - start,
          frame: count,
          moving,
          running: clock
            .timed(element)
            .filter((animation) => animation.playState !== "finished")
            .slice(0, 4)
            .map(describe),
        });
      }
      request = clock.frame(tick);
    };
    request = clock.frame(tick);

    return () => {
      clock.cancel(request);
      clock.release(element);
      for (const node of element.querySelectorAll("[data-lab-moving]")) {
        node.removeAttribute("data-lab-moving");
      }
      setSnapshot(EMPTY);
    };
  }, [open, root]);

  useEffect(() => {
    if (!open) {
      setPaused(false);
      setSpeed("1×");
    }
  }, [open]);

  const toggle = useCallback(() => claim(owner === id ? null : id), [id]);
  const close = useCallback(() => {
    if (owner === id) claim(null);
  }, [id]);
  const step = useCallback(() => {
    if (root.current) clock.step(root.current);
  }, [root]);

  return {
    open,
    toggle,
    close,
    speed,
    setSpeed,
    paused,
    setPaused,
    step,
    outlines,
    setOutlines,
    snapshot,
  };
}

export type Lab = ReturnType<typeof useLab>;
