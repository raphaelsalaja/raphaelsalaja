"use client";

import { type CSSProperties, type PointerEvent, useId } from "react";
import type { BotColor, BotShape } from "@/data/bots";
import styles from "./styles.module.css";

const SHAPES: Record<BotShape, string> = {
  blob: "M34 8C46 6 56 16 56 28C56 40 52 46 46 52C38 60 24 58 16 50C6 40 8 24 16 16C22 8 26 10 34 8Z",
  star: "M32 8L38.76 24.7L56.73 25.97L42.94 37.55L47.28 55.03L32 45.5L16.72 55.03L21.06 37.55L7.27 25.97L25.24 24.7Z",
  hex: "M32 6L54.52 19L54.52 45L32 58L9.48 45L9.48 19Z",
  heart:
    "M32 54C20 44 8 36 8 24C8 16 14 10 22 10C26 10 30 13 32 18C34 13 38 10 42 10C50 10 56 16 56 24C56 36 44 44 32 54Z",
  square: "M18 8H46Q56 8 56 18V46Q56 56 46 56H18Q8 56 8 46V18Q8 8 18 8Z",
  tablet: "M22 6H42Q52 6 52 16V48Q52 58 42 58H22Q12 58 12 48V16Q12 6 22 6Z",
  sparkle:
    "M32 4C33.2 22 22 30.8 4 32C22 33.2 30.8 42 32 60C30.8 42 42 33.2 60 32C42 30.8 33.2 22 32 4Z",
  flower:
    "M21 19a11 11 0 1 0 22 0a11 11 0 1 0-22 0M32.26 25.5a11 11 0 1 0 22 0a11 11 0 1 0-22 0M32.26 38.5a11 11 0 1 0 22 0a11 11 0 1 0-22 0M21 45a11 11 0 1 0 22 0a11 11 0 1 0-22 0M9.74 38.5a11 11 0 1 0 22 0a11 11 0 1 0-22 0M9.74 25.5a11 11 0 1 0 22 0a11 11 0 1 0-22 0M24 32a8 8 0 1 0 16 0a8 8 0 1 0-16 0",
  wedge: "M32 7C34 7 52 44 52 48C52 54 12 54 12 48C12 44 30 7 32 7Z",
  clover:
    "M19 16a13 13 0 1 0 26 0a13 13 0 1 0-26 0M35 32a13 13 0 1 0 26 0a13 13 0 1 0-26 0M19 48a13 13 0 1 0 26 0a13 13 0 1 0-26 0M3 32a13 13 0 1 0 26 0a13 13 0 1 0-26 0",
  teardrop:
    "M32 6C44 18 54 28 54 40C54 52 44 58 32 58C20 58 10 52 10 40C10 28 20 18 32 6Z",
};

const EYES: Record<BotShape, { x: number; y: number }> = {
  blob: { x: 32, y: 32 },
  star: { x: 32, y: 34 },
  hex: { x: 32, y: 32 },
  heart: { x: 32, y: 28 },
  square: { x: 32, y: 32 },
  tablet: { x: 32, y: 30 },
  sparkle: { x: 32, y: 32 },
  flower: { x: 32, y: 32 },
  wedge: { x: 32, y: 40 },
  clover: { x: 32, y: 32 },
  teardrop: { x: 32, y: 40 },
};

const clamp = (value: number) => Math.min(1, Math.max(-1, value));

export function BotMark({
  shape,
  color,
  title = "",
}: {
  shape: BotShape;
  color: BotColor;
  title?: string;
}) {
  const eyes = EYES[shape];
  const clipId = useId().replace(/:/g, "");
  const delay = `${-((title.length * 17) % 52) / 10}s`;

  function follow(event: PointerEvent<SVGSVGElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - box.left) / box.width - 0.5;
    const dy = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty("--gaze-x", `${clamp(dx) * 2.4}px`);
    event.currentTarget.style.setProperty("--gaze-y", `${clamp(dy) * 1.8}px`);
  }

  function rest(event: PointerEvent<SVGSVGElement>) {
    event.currentTarget.style.setProperty("--gaze-x", "0px");
    event.currentTarget.style.setProperty("--gaze-y", "0px");
  }

  return (
    <svg
      aria-hidden="true"
      className={styles.mark}
      data-color={color}
      onPointerLeave={rest}
      onPointerMove={follow}
      style={{ "--blink-delay": delay } as CSSProperties}
      viewBox="0 0 64 64"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHAPES[shape]} />
        </clipPath>
      </defs>
      <path d={SHAPES[shape]} />
      <g className={styles.eyes} clipPath={`url(#${clipId})`}>
        <rect
          height="10"
          rx="1.8"
          width="3.6"
          x={eyes.x - 7.2}
          y={eyes.y - 5}
        />
        <rect
          height="10"
          rx="1.8"
          width="3.6"
          x={eyes.x + 3.6}
          y={eyes.y - 5}
        />
      </g>
    </svg>
  );
}
