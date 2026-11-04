"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  type ComponentProps,
  type Ref,
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { createGenie, type Genie, HANDOFF, IN_FLIGHT } from "./genie";
import { type Edge, GENIE_DURATION } from "./mesh";

export type GeniePopupProps = ComponentProps<typeof Dialog.Popup> & {
  /** The element the window minimises into, like a Dock tile. */
  target: RefObject<HTMLElement | null>;
  /** The screen the funnel is clipped to. Defaults to the viewport. */
  bounds?: RefObject<HTMLElement | null>;
  edge?: Edge;
  /** CSS pixels per macOS point. */
  scale?: number;
  /** Seconds from open to minimised. */
  duration?: number;
  /** Fades the window out over the second half. The Dock doesn't. */
  fade?: boolean;
  /** Blurs the window over the second half. */
  blur?: boolean;
};

const STARTING = "data-starting-style";
const ENDING = "data-ending-style";

// A Base UI Dialog popup that minimises into `target` when it closes and
// comes back out of it when it opens. Base UI keeps the popup mounted until
// its own animations finish, so a linear animation on the popup is both the
// clock and what hides it while the mesh is drawn.
export function GeniePopup({
  target,
  bounds,
  edge = "bottom",
  scale = 1,
  duration = GENIE_DURATION,
  fade = false,
  blur = false,
  ref,
  ...props
}: GeniePopupProps) {
  const node = useRef<HTMLDivElement | null>(null);
  const options = useRef({
    target,
    bounds,
    edge,
    scale,
    duration,
    fade,
    blur,
  });
  options.current = { target, bounds, edge, scale, duration, fade, blur };

  const setRef = useCallback(
    (element: HTMLDivElement | null) => {
      node.current = element;
      assign(ref, element);
    },
    [ref],
  );

  useLayoutEffect(() => {
    const popup = node.current;
    if (!popup) return;

    let progress = popup.hasAttribute(STARTING) ? 1 : 0;
    let goal = 0;
    let animation: Animation | null = null;
    let genie: Genie | null = null;
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      animation?.cancel();
      animation = null;
      genie?.dispose();
      genie = null;
    };

    const play = (to: 0 | 1) => {
      const from = progress;
      goal = to;
      stop();
      const { target, bounds, edge, scale, duration, fade, blur } =
        options.current;
      const tile = target.current;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce || !tile) {
        animation = popup.animate(
          { opacity: [1 - from, 1 - to] },
          { duration: 200, easing: "ease", fill: to ? "forwards" : "none" },
        );
        progress = to;
        return;
      }

      const length = Math.abs(to - from) * duration * 1000;
      if (length === 0) return;
      genie = createGenie({
        source: popup,
        target: tile,
        bounds: bounds?.current,
        edge,
        scale,
        fade,
        blur,
      });
      const run = genie;
      const clock = popup.animate(handoff(from, to), {
        duration: length,
        easing: "linear",
        fill: to ? "forwards" : "none",
      });
      animation = clock;

      const tick = () => {
        if (animation !== clock) return;
        const time = Number(clock.currentTime ?? 0);
        const t = Math.min(time / length, 1);
        progress = from + (to - from) * t;
        run.draw(t < 1 ? Math.max(progress, IN_FLIGHT) : progress);
        if (clock.playState === "finished") {
          if (to === 0) stop();
          return;
        }
        frame = requestAnimationFrame(tick);
      };
      tick();
    };

    if (popup.hasAttribute(STARTING)) play(0);

    const observer = new MutationObserver(() => {
      if (popup.hasAttribute(ENDING)) {
        if (goal !== 1) play(1);
      } else if (goal === 1) {
        play(0);
      }
    });
    observer.observe(popup, { attributes: true, attributeFilter: [ENDING] });

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return <Dialog.Popup ref={setRef} {...props} />;
}

// Keeps the popup visible while progress is under HANDOFF, where the copies
// are still fading in over it.
function handoff(from: number, to: number): Keyframe[] {
  const hidden = { visibility: "hidden" };
  const visible = { visibility: "visible" };
  const at = (HANDOFF - from) / (to - from);
  if (!(at > 0 && at < 1)) {
    return from < HANDOFF && to < HANDOFF
      ? [visible, visible]
      : [hidden, hidden];
  }
  const [before, after] = to > from ? [visible, hidden] : [hidden, visible];
  return [
    { ...before, offset: 0 },
    { ...before, offset: at },
    { ...after, offset: at },
    { ...after, offset: 1 },
  ];
}

function assign<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}
