"use client";

import {
  Bodies,
  Body,
  Composite,
  Engine,
  type IBodyDefinition,
  Sleeping,
} from "matter-js";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { bots } from "@/data/bots";
import { BotMark } from "./mark";
import styles from "./styles.module.css";

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

function shuffledBots() {
  const list = [...bots];
  const rand = mulberry32(11);
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const current = list[i];
    const swap = list[j];
    if (!current || !swap) continue;
    list[i] = swap;
    list[j] = current;
  }
  return list;
}

const pile = shuffledBots();

function plan(width: number, height: number, count: number) {
  const pad = 14;
  let size = 40;
  let columns = 1;
  for (let next = 40; next <= 90; next++) {
    const radius = next * 0.46;
    const minX = pad + next / 2;
    const maxX = width - pad - next / 2;
    const cols = Math.max(1, Math.floor((maxX - minX) / (radius * 2 + 3)));
    const rows = Math.ceil(count / cols);
    if (rows * (radius * 2 + 3) <= height - pad * 2) {
      size = next;
      columns = cols;
    }
  }
  return {
    size,
    columns,
    radius: size * 0.46,
    minX: pad + size / 2,
    maxX: width - pad - size / 2,
    maxY: height - pad - size / 2,
  };
}

const bodyOptions: IBodyDefinition = {
  restitution: 0.38,
  friction: 0.14,
  frictionAir: 0.018,
  slop: 0,
  sleepThreshold: 36,
};

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
    const { size, columns, radius, minX, maxX, maxY } = plan(
      width,
      height,
      marks.length,
    );
    const rand = mulberry32(42);

    const engine = Engine.create({
      enableSleeping: true,
      gravity: { x: 0, y: 1.05, scale: 0.001 },
      positionIterations: 14,
      velocityIterations: 8,
    });
    const floor = Bodies.rectangle(
      width / 2,
      maxY + radius + 40,
      width + 80,
      80,
      {
        isStatic: true,
      },
    );
    const left = Bodies.rectangle(
      minX - radius - 40,
      height / 2,
      80,
      height * 4,
      {
        isStatic: true,
      },
    );
    const right = Bodies.rectangle(
      maxX + radius + 40,
      height / 2,
      80,
      height * 4,
      { isStatic: true },
    );
    const bodies = marks.map((_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x =
        minX + ((column + 0.5) / columns) * (maxX - minX) + (rand() - 0.5) * 3;
      const y = -radius * 3 - row * (radius * 2 + 8) - rand() * 12;
      const body = Bodies.circle(Math.min(maxX, Math.max(minX, x)), y, radius, {
        ...bodyOptions,
        angle: (rand() - 0.5) * 1.4,
      });
      Body.setAngularVelocity(body, (rand() - 0.5) * 0.12);
      return body;
    });
    Composite.add(engine.world, [floor, left, right, ...bodies]);

    const draw = () => {
      marks.forEach((node, index) => {
        const body = bodies[index];
        if (!body) return;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.transform = `translate3d(${(body.position.x - size / 2).toFixed(2)}px, ${(body.position.y - size / 2).toFixed(2)}px, 0) rotate(${body.angle.toFixed(4)}rad)`;
      });
    };

    if (reduced) {
      for (let frame = 0; frame < 720; frame++)
        Engine.update(engine, 1000 / 60);
      for (const body of bodies) Sleeping.set(body, true);
      draw();
      return () => {
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    }

    let frame = 0;
    let last = 0;
    let drag: {
      index: number;
      pointer: number;
      lastX: number;
      lastY: number;
      lastT: number;
    } | null = null;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 32) : 1000 / 60;
      last = now;
      if (!drag) Engine.update(engine, dt);
      draw();
      const awake = bodies.some((body) => !body.isSleeping);
      if (!awake && !drag) {
        stop();
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };

    const point = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const down = (index: number) => (event: PointerEvent) => {
      if (event.button !== 0) return;
      const body = bodies[index];
      if (!body) return;
      const here = point(event);
      drag = {
        index,
        pointer: event.pointerId,
        lastX: here.x,
        lastY: here.y,
        lastT: performance.now(),
      };
      Sleeping.set(body, false);
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      start();
    };
    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      const body = bodies[drag.index];
      if (!body) return;
      const here = point(event);
      const now = performance.now();
      const dt = Math.max(16, now - drag.lastT);
      Body.setPosition(body, {
        x: Math.min(maxX, Math.max(minX, here.x)),
        y: Math.min(maxY, Math.max(radius, here.y)),
      });
      Body.setVelocity(body, {
        x: ((here.x - drag.lastX) / dt) * 16,
        y: ((here.y - drag.lastY) / dt) * 16,
      });
      drag.lastX = here.x;
      drag.lastY = here.y;
      drag.lastT = now;
    };
    const up = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag = null;
    };

    marks.forEach((node, index) => {
      node.addEventListener("pointerdown", down(index));
    });
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);

    let visible = false;
    const begin = () => {
      if (!visible || frame) return;
      const reveal = root.closest<HTMLElement>("[data-reveal]");
      if (
        reveal &&
        Number.parseFloat(getComputedStyle(reveal).opacity) < 0.98
      ) {
        return;
      }
      start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (!visible) stop();
      else begin();
    });
    observer.observe(root);
    const reveal = root.closest<HTMLElement>("[data-reveal]");
    const onReveal = () => begin();
    reveal?.addEventListener("transitionend", onReveal);
    const watching = reveal ? new MutationObserver(onReveal) : null;
    watching?.observe(reveal as HTMLElement, {
      attributes: true,
      attributeFilter: ["data-shown"],
    });
    begin();

    return () => {
      stop();
      observer.disconnect();
      watching?.disconnect();
      reveal?.removeEventListener("transitionend", onReveal);
      marks.forEach((node, index) => {
        node.removeEventListener("pointerdown", down(index));
      });
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
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
