"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { bots } from "@/data/bots";
import { BotMark } from "./mark";
import styles from "./styles.module.css";

const PILE = [
  "Executive Assistant",
  "Chief Operating Officer",
  "Product Designer",
  "Brand Designer",
  "Marketing Manager",
  "Head Coach",
  "Culture Curator",
  "Fashion Stylist",
  "Game Developer",
  "Career Coach",
  "Nutrition Coach",
  "Accountant",
  "Motion Designer",
  "Video Editor",
] as const;

const pile = PILE.map((title) => {
  const bot = bots.find((item) => item.title === title);
  if (!bot) throw new Error(`Missing pile bot: ${title}`);
  return bot;
});

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number;
  r: number;
};

function mulberry32(start: number) {
  let seed = start;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function basin(width: number, size: number) {
  const play = Math.min(width - 24, size * 6.4);
  const inset = (width - play) / 2;
  return { inset, right: width - inset };
}

function makeBodies(width: number, size: number): Body[] {
  const rand = mulberry32(42);
  const { inset, right } = basin(width, size);
  return pile.map((_, index) => ({
    x: inset + (right - inset) * (0.18 + rand() * 0.64),
    y: -size * 0.2 - index * size * 0.85,
    vx: (rand() - 0.5) * 70,
    vy: rand() * 20,
    angle: (rand() - 0.5) * 0.8,
    va: (rand() - 0.5) * 1.2,
    r: size * 0.4,
  }));
}

function step(
  bodies: Body[],
  dt: number,
  width: number,
  height: number,
  size: number,
) {
  const gravity = 2800;
  const bounce = 0.45;
  const { inset, right } = basin(width, size);
  const floor = height - 8;
  for (const body of bodies) {
    body.vy += gravity * dt;
    body.vx *= 0.996;
    body.x += body.vx * dt;
    body.y += body.vy * dt;
    body.angle += body.va * dt;
    body.va *= 0.986;
    if (body.y > floor - body.r) {
      body.y = floor - body.r;
      body.vy = Math.abs(body.vy) < 50 ? 0 : -body.vy * bounce;
      body.vx *= 0.68;
      body.va += body.vx * 0.004;
    }
    if (body.x < inset + body.r) {
      body.x = inset + body.r;
      body.vx = Math.abs(body.vx) * bounce;
    }
    if (body.x > right - body.r) {
      body.x = right - body.r;
      body.vx = -Math.abs(body.vx) * bounce;
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const min = a.r + b.r;
      if (dist >= min) continue;
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = (min - dist) / 2;
      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;
      const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (rel < 0) {
        const impulse = (-(1 + bounce) * rel) / 2;
        a.vx -= impulse * nx;
        a.vy -= impulse * ny;
        b.vx += impulse * nx;
        b.vy += impulse * ny;
        const tx = -ny;
        const ty = nx;
        const tan = (b.vx - a.vx) * tx + (b.vy - a.vy) * ty;
        a.va -= tan * 0.012;
        b.va += tan * 0.012;
      }
    }
  }
}

function place(node: HTMLElement, body: Body, size: number) {
  node.style.transform = `translate3d(${(body.x - size / 2).toFixed(2)}px, ${(body.y - size / 2).toFixed(2)}px, 0) rotate(${body.angle.toFixed(3)}rad)`;
}

export function BotPile() {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const root = stage.current;
    if (!root) return;
    const marks = nodes.current.filter((node): node is HTMLDivElement =>
      Boolean(node),
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const width = root.clientWidth;
    const height = root.clientHeight;
    const size = 52;
    const bodies = makeBodies(width, size);

    if (reduced) {
      for (let frame = 0; frame < 360; frame++)
        step(bodies, 1 / 60, width, height, size);
      marks.forEach((node, index) => {
        const body = bodies[index];
        if (body) place(node, body, size);
      });
      return;
    }

    marks.forEach((node, index) => {
      const body = bodies[index];
      if (body) place(node, body, size);
    });

    let frame = 0;
    let last = 0;
    let clock = 0;
    let nextNudge = 3;
    let drag: {
      index: number;
      lastX: number;
      lastY: number;
      lastT: number;
    } | null = null;

    const draw = () => {
      marks.forEach((node, index) => {
        const body = bodies[index];
        if (body) place(node, body, size);
      });
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = last ? Math.min((now - last) / 1000, 0.032) : 0;
      last = now;
      if (!drag) {
        step(bodies, dt, width, height, size);
        clock += dt;
        const calm = bodies.every(
          (body) =>
            Math.hypot(body.vx, body.vy) < 24 && Math.abs(body.va) < 0.4,
        );
        if (calm && clock > nextNudge) {
          const body = bodies[Math.floor(Math.random() * bodies.length)];
          if (body) {
            body.vy -= 90 + Math.random() * 70;
            body.va += (Math.random() - 0.5) * 3;
          }
          nextNudge = clock + 2.4 + Math.random() * 2.2;
        }
      }
      draw();
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

    const point = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const down = (index: number) => (event: PointerEvent) => {
      if (event.button !== 0) return;
      const here = point(event);
      drag = {
        index,
        lastX: here.x,
        lastY: here.y,
        lastT: performance.now(),
      };
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!drag) return;
      const body = bodies[drag.index];
      if (!body) return;
      const here = point(event);
      const now = performance.now();
      const dt = Math.max(0.016, (now - drag.lastT) / 1000);
      const walls = basin(width, size);
      body.x = Math.min(
        walls.right - body.r,
        Math.max(walls.inset + body.r, here.x),
      );
      body.y = Math.min(height - 8 - body.r, Math.max(body.r, here.y));
      body.vx = (here.x - drag.lastX) / dt;
      body.vy = (here.y - drag.lastY) / dt;
      body.va = body.vx * 0.01;
      drag.lastX = here.x;
      drag.lastY = here.y;
      drag.lastT = now;
    };
    const up = () => {
      drag = null;
    };

    marks.forEach((node, index) => {
      node.addEventListener("pointerdown", down(index));
    });
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    observer.observe(root);

    return () => {
      stop();
      observer.disconnect();
      marks.forEach((node, index) => {
        node.removeEventListener("pointerdown", down(index));
      });
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section aria-labelledby="bots-title" className={styles.promo} data-avatar>
      <div className={styles.stage} ref={stage}>
        {pile.map((bot, index) => (
          <div
            className={styles.piece}
            key={bot.title}
            ref={(node) => {
              nodes.current[index] = node;
            }}
          >
            <BotMark color={bot.color} shape={bot.shape} />
          </div>
        ))}
      </div>
      <div className={styles.promoCopy}>
        <h2 className={styles.promoTitle} id="bots-title">
          Bots
        </h2>
        <p className={styles.promoLine}>
          A team of Grok Bots, each with one job.
        </p>
        <Link className={styles.promoButton} data-avatar-action href="/bots">
          See All Bots
        </Link>
      </div>
    </section>
  );
}
