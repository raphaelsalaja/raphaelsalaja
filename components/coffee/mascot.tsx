"use client";

import {
  animate,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useId, useRef } from "react";

const BODY =
  "M2 10.75L2.007 11.017 2.026 11.274 2.076 11.638 2.126 11.891 2.188 12.141 2.268 12.406 2.355 12.648 2.454 12.886 2.616 13.217 2.742 13.441 2.88 13.659 3.028 13.87 3.186 14.073 3.354 14.269 3.531 14.456 3.731 14.646 3.927 14.814 4.13 14.972 4.341 15.12 4.654 15.313 4.881 15.435 5.131 15.553 5.369 15.651 5.612 15.738 5.859 15.812 6.109 15.874 6.362 15.924 6.616 15.962 6.873 15.986 7.112 15.998 7.87 15.999 8.145 15.985 8.529 15.942 8.891 15.874 9.265 15.777 9.527 15.69 9.869 15.553 10.217 15.384 10.457 15.248 10.765 15.048 11.073 14.814 11.282 14.634 11.546 14.377 11.731 14.172 11.972 13.87 12.181 13.566 12.366 13.25 13.367 13.247 13.538 13.235 13.768 13.201 14.031 13.137 14.285 13.048 14.53 12.934 14.679 12.849 14.793 12.776 14.903 12.698 15.083 12.55 15.181 12.457 15.3 12.333 15.448 12.153 15.526 12.043 15.599 11.929 15.684 11.78 15.783 11.569 15.833 11.444 15.887 11.281 15.922 11.15 15.967 10.922 15.985 10.788 15.997 10.617 16 10.482 15.985 10.212 15.951 9.982 15.887 9.719 15.798 9.465 15.684 9.22 15.599 9.071 15.448 8.847 15.275 8.64 15.181 8.543 15.009 8.386 14.793 8.224 14.679 8.151 14.53 8.066 14.285 7.952 14.159 7.905 13.936 7.837 13.672 7.783 13.538 7.765 13.367 7.753 13 7.75 12.999 7.454 12.984 7.306 12.941 7.139 12.904 7.048 12.866 6.976 12.818 6.901 12.765 6.833 12.706 6.77 12.64 6.713 12.571 6.663 12.481 6.61 12.403 6.575 12.314 6.544 12.157 6.51 12.006 6.5 2.974 6.5 2.806 6.516 2.645 6.557 2.495 6.623 2.36 6.713 2.25 6.816 2.148 6.952 2.075 7.097 2.026 7.255 2.007 7.371 2 7.494ZM12.904 11.75L12.974 11.274 12.998 10.888 13 9.25 13.241 9.25 13.372 9.256 13.494 9.274 13.613 9.304 13.728 9.345 13.839 9.398 13.944 9.461 14.043 9.534 14.134 9.616 14.216 9.707 14.289 9.806 14.352 9.911 14.405 10.022 14.446 10.137 14.476 10.256 14.494 10.378 14.5 10.5 14.494 10.622 14.476 10.744 14.446 10.863 14.405 10.978 14.352 11.089 14.289 11.194 14.216 11.293 14.134 11.384 14.043 11.466 13.944 11.539 13.839 11.602 13.728 11.655 13.613 11.696 13.494 11.726 13.311 11.748Z";

const EYE = "M-.675-.825a.675.675 0 0 1 1.35 0v1.65a.675.675 0 0 1-1.35 0z";

const CENTRE = { x: 7.6, y: 11.2 };
const RADIUS = { x: 5, y: 4 };
const REST = { yaw: 0.37, pitch: 0.38 };
const RANGE = { yaw: [-0.7, 0.75], pitch: [-0.35, 0.5] } as const;
const EYES = [
  { yaw: -0.27, pitch: -0.05, tilt: 16 },
  { yaw: 0.27, pitch: 0.05, tilt: 22 },
];
const GLANCE = { type: "spring", visualDuration: 0.35, bounce: 0.25 } as const;

const clamp = (value: number, [min, max]: readonly [number, number]) =>
  Math.min(max, Math.max(min, value));

const random = ([min, max]: readonly [number, number]) =>
  min + Math.random() * (max - min);

function eyeTransform(
  eye: (typeof EYES)[number],
  yaw: number,
  pitch: number,
  blink: number,
) {
  const y = yaw + eye.yaw;
  const p = pitch + eye.pitch;
  const x = CENTRE.x + RADIUS.x * Math.sin(y);
  const top = CENTRE.y - RADIUS.y * Math.sin(p);
  return `translate(${x} ${top}) scale(${Math.cos(y)} ${Math.cos(p)}) rotate(${eye.tilt}) scale(1 ${blink})`;
}

function useLoop(callback: () => number, enabled: boolean) {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    if (!enabled) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = (delay: number) => {
      timeout = setTimeout(() => tick(ref.current()), delay);
    };
    tick(ref.current());
    return () => clearTimeout(timeout);
  }, [enabled]);
}

function useEyes(
  yaw: MotionValue<number>,
  pitch: MotionValue<number>,
  blink: MotionValue<number>,
) {
  const refs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      EYES.forEach((eye, index) => {
        refs.current[index]?.setAttribute(
          "transform",
          eyeTransform(eye, yaw.get(), pitch.get(), blink.get()),
        );
      });
    };
    const unsubscribe = [yaw, pitch, blink].map((value) =>
      value.on("change", update),
    );
    return () => {
      for (const stop of unsubscribe) stop();
    };
  }, [yaw, pitch, blink]);

  return refs;
}

export function Mascot({ className }: { className?: string }) {
  const id = useId();
  const svg = useRef<SVGSVGElement>(null);
  const tracking = useRef(false);
  const reduced = useReducedMotion();

  const yaw = useMotionValue(REST.yaw);
  const pitch = useMotionValue(REST.pitch);
  const blink = useMotionValue(1);
  const eyes = useEyes(yaw, pitch, blink);

  const look = useCallback(
    (target: { yaw: number; pitch: number }) => {
      animate(yaw, clamp(target.yaw, RANGE.yaw), GLANCE);
      animate(pitch, clamp(target.pitch, RANGE.pitch), GLANCE);
    },
    [yaw, pitch],
  );

  useLoop(() => {
    if (!tracking.current) {
      look(
        Math.random() < 0.5
          ? {
              yaw: REST.yaw + random([-0.08, 0.08]),
              pitch: REST.pitch + random([-0.06, 0.06]),
            }
          : { yaw: random(RANGE.yaw), pitch: random(RANGE.pitch) },
      );
    }
    return random([1800, 4200]);
  }, !reduced);

  useLoop(() => {
    const close = { duration: 0.07, ease: "easeIn" } as const;
    const open = { duration: 0.14, ease: "easeOut" } as const;
    const twice = Math.random() < 0.2;
    animate(blink, twice ? [1, 0.08, 1, 0.08, 1] : [1, 0.08, 1], {
      duration: twice ? 0.5 : 0.21,
      ease: twice
        ? [close.ease, open.ease, close.ease, open.ease]
        : [close.ease, open.ease],
      times: twice ? [0, 0.15, 0.45, 0.6, 1] : [0, 0.35, 1],
    });
    return random([2500, 6000]);
  }, !reduced);

  useEffect(() => {
    const card = svg.current?.closest("section");
    if (!card || reduced) return;
    let release: ReturnType<typeof setTimeout>;

    const move = (event: PointerEvent) => {
      const box = svg.current?.getBoundingClientRect();
      if (!box) return;
      clearTimeout(release);
      tracking.current = true;
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      look({ yaw: Math.atan(dx / 160), pitch: Math.atan(-dy / 120) });
    };
    const leave = () => {
      release = setTimeout(() => {
        tracking.current = false;
        look(REST);
      }, 400);
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(release);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  }, [look, reduced]);

  return (
    <svg
      ref={svg}
      viewBox="1.5 6 15 10.5"
      width={40}
      height={28}
      aria-hidden="true"
      className={className}
    >
      <defs>
        <clipPath id={id}>
          <path d={BODY} />
        </clipPath>
      </defs>
      <path d={BODY} fill="var(--mascot-body)" />
      <g clipPath={`url(#${id})`} fill="var(--mascot-eyes)">
        {EYES.map((eye, index) => (
          <path
            key={eye.tilt}
            ref={(node) => {
              eyes.current[index] = node;
            }}
            d={EYE}
            transform={eyeTransform(eye, REST.yaw, REST.pitch, 1)}
          />
        ))}
      </g>
    </svg>
  );
}
