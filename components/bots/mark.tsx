"use client";

import { useEffect, useId, useRef } from "react";
import type { BotColor, BotShape } from "@/data/bots";
import { createAvatar, type Head, restingEyes } from "./face";
import { MARKS, markEyes, markViewBox } from "./geometry";
import styles from "./styles.module.css";

const VIEW_BOX = markViewBox();

function headFor(shape: BotShape): Head {
  const [left, right] = MARKS[shape].eyes.seat;
  return {
    x: (left[0] + right[0]) / 2,
    y: (left[1] + right[1]) / 2 + 18,
    rx: 68,
    ry: 60,
  };
}

function matrixOf(transform: string) {
  const values = transform
    .slice(transform.indexOf("(") + 1, -1)
    .split(",")
    .map(Number);
  return {
    tx: values[4] ?? 0,
    ty: values[5] ?? 0,
    sy: Math.hypot(values[1] ?? 0, values[3] ?? 0) || 1,
  };
}

export function BotMark({
  shape,
  color,
}: {
  shape: BotShape;
  color: BotColor;
}) {
  const clipId = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const body = useRef<SVGGElement>(null);
  const eyes = useRef<(SVGGElement | null)[]>([]);
  const paths = markEyes(shape);

  useEffect(() => {
    const seats = MARKS[shape].eyes.seat;
    const angles = MARKS[shape].eyes.ang;
    const node = svg.current;
    const root = node?.closest<HTMLElement>("[data-avatar]");
    if (!node || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const head = headFor(shape);
    const avatar = createAvatar({
      head,
      pivot: { x: head.x, y: head.y + 78 },
    });
    const rest = restingEyes(head).map((eye) => matrixOf(eye.transform));

    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const pose = avatar.step(last ? Math.min((now - last) / 1000, 0.064) : 0);
      last = now;
      body.current?.setAttribute("transform", pose.transform);
      pose.eyes.forEach((eye, index) => {
        const group = eyes.current[index];
        if (!group) return;
        const current = matrixOf(eye.transform);
        const base = rest[index];
        if (!base) return;
        const [sx, sy] = seats[index];
        const squash = current.sy / base.sy;
        const angle = angles[index];
        group.setAttribute(
          "transform",
          `translate(${sx} ${sy}) rotate(${angle}) scale(1 ${squash.toFixed(3)}) rotate(${-angle}) translate(${-sx} ${-sy})`,
        );
        group.setAttribute("opacity", String(eye.opacity));
      });
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    observer.observe(node);

    const center = () => {
      const box = node.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    };
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      avatar.enter();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const origin = center();
      avatar.move(event.clientX - origin.x, event.clientY - origin.y);
    };
    const leave = () => avatar.leave();
    const poke = () => avatar.poke();
    const hover = () => avatar.hover(true);
    const unhover = () => avatar.hover(false);
    const action = root.querySelector<HTMLElement>("[data-avatar-action]");

    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    node.addEventListener("pointerdown", poke);
    action?.addEventListener("pointerenter", hover);
    action?.addEventListener("pointerleave", unhover);
    action?.addEventListener("pointerdown", poke);

    return () => {
      stop();
      observer.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      node.removeEventListener("pointerdown", poke);
      action?.removeEventListener("pointerenter", hover);
      action?.removeEventListener("pointerleave", unhover);
      action?.removeEventListener("pointerdown", poke);
    };
  }, [shape]);

  return (
    <svg
      aria-hidden="true"
      className={styles.mark}
      data-color={color}
      ref={svg}
      viewBox={VIEW_BOX}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={MARKS[shape].path} />
        </clipPath>
      </defs>
      <g ref={body}>
        <path className={styles.body} d={MARKS[shape].path} />
        <g clipPath={`url(#${clipId})`}>
          {paths.map((d, index) => (
            <g
              key={index === 0 ? "left" : "right"}
              ref={(group) => {
                eyes.current[index] = group;
              }}
            >
              <path className={styles.eye} d={d} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
