"use client";

import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Engine,
  Events,
  type IBodyDefinition,
  type IEventCollision,
  type Pair,
  Sleeping,
  Vertices,
} from "matter-js";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { botSlug, bots } from "@/data/bots";
import { playBump, unlockAudio } from "@/lib/sounds";
import { MARK_CENTER, MARK_RADIUS, markHull } from "./geometry";
import { BotMark, BUMP, type BumpDetail } from "./mark";
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

const SQUASH = 3;
const MAX_SQUASH = 0.3;
const STRETCH = 0.016;
const MAX_STRETCH = 0.18;
const JELLY_STIFFNESS = 0.22;
const JELLY_DAMPING = 0.74;
const MAX_SPEED = 24;
const SOFT_HIT = 1.2;
const HARD_HIT = 4.5;
const LOUD_HIT = 6;
const TAP_SLOP = 6;
const SHAKE_JOLT = 18;

type Jelly = {
  p: number;
  q: number;
  r: number;
  vp: number;
  vq: number;
  vr: number;
};

type MotionPermission = {
  requestPermission?: () => Promise<PermissionState>;
};

function watchShake(onShake: () => void) {
  if (typeof DeviceMotionEvent === "undefined") {
    return { request() {}, stop() {} };
  }
  const permission = (DeviceMotionEvent as unknown as MotionPermission)
    .requestPermission;
  let previous: [number, number, number] | null = null;
  let shookAt = 0;
  let listening = false;

  const motion = (event: DeviceMotionEvent) => {
    const g = event.accelerationIncludingGravity;
    if (!g) return;
    const current: [number, number, number] = [g.x ?? 0, g.y ?? 0, g.z ?? 0];
    const before = previous;
    previous = current;
    if (!before) return;
    const jolt = Math.hypot(
      current[0] - before[0],
      current[1] - before[1],
      current[2] - before[2],
    );
    const now = performance.now();
    if (jolt < SHAKE_JOLT || now - shookAt < 1000) return;
    shookAt = now;
    onShake();
  };
  const listen = () => {
    if (listening) return;
    listening = true;
    window.addEventListener("devicemotion", motion);
  };

  if (!permission) listen();

  return {
    /** iOS only asks from inside a gesture, so this runs on the shake tap. */
    request() {
      if (listening || !permission) return;
      permission
        .call(DeviceMotionEvent)
        .then((state) => {
          if (state === "granted") listen();
        })
        .catch(() => {});
    },
    stop() {
      window.removeEventListener("devicemotion", motion);
    },
  };
}

export function BotPile() {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const label = useRef<HTMLAnchorElement>(null);
  const shake = useRef<() => void>(null);
  const placeLabel = useRef<() => void>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const named = picked === null ? undefined : pile[picked];

  useLayoutEffect(() => {
    const root = stage.current;
    if (!root) return;
    const marks = nodes.current.filter((node): node is HTMLDivElement =>
      Boolean(node),
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
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
      { isStatic: true },
    );
    const left = Bodies.rectangle(
      minX - radius - 40,
      height / 2,
      80,
      height * 4,
      { isStatic: true },
    );
    const right = Bodies.rectangle(
      maxX + radius + 40,
      height / 2,
      80,
      height * 4,
      { isStatic: true },
    );

    const scale = size / (MARK_RADIUS * 2);
    const outlines = pile.map((bot) =>
      Vertices.clockwiseSort(
        markHull(bot.shape).map(([x, y]) => ({
          x: (x - MARK_CENTER) * scale,
          y: (y - MARK_CENTER) * scale,
        })),
      ),
    );
    const offsets = outlines.map((outline) => Vertices.centre(outline));
    const bodies = marks.map((_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x =
        minX + ((column + 0.5) / columns) * (maxX - minX) + (rand() - 0.5) * 3;
      const y = -radius * 3 - row * (radius * 2 + 8) - rand() * 12;
      const body = Body.create({
        ...bodyOptions,
        vertices: outlines[index],
        position: { x: Math.min(maxX, Math.max(minX, x)), y },
        angle: (rand() - 0.5) * 1.4,
      });
      Body.setAngularVelocity(body, (rand() - 0.5) * 0.12);
      return body;
    });
    Composite.add(engine.world, [floor, left, right, ...bodies]);

    const cleanup: (() => void)[] = [];
    const listen = <K extends keyof HTMLElementEventMap>(
      target: HTMLElement,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
    ) => {
      target.addEventListener(type, handler);
      cleanup.push(() => target.removeEventListener(type, handler));
    };

    let chosen: number | null = null;
    const choose = (index: number | null) => {
      chosen = index;
      setPicked(index);
    };
    const place = () => {
      const tag = label.current;
      const body = chosen === null ? undefined : bodies[chosen];
      if (!tag || !body) return;
      const w = tag.offsetWidth;
      const h = tag.offsetHeight;
      let y = body.bounds.min.y - 8 - h;
      if (y < 6) y = Math.min(body.bounds.max.y + 8, height - h - 6);
      const x = Math.min(width - w - 6, Math.max(6, body.position.x - w / 2));
      tag.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    placeLabel.current = place;

    const slots = new Map(bodies.map((body, index) => [body.id, index]));
    const jelly: Jelly[] = bodies.map(() => ({
      p: 1,
      q: 0,
      r: 1,
      vp: 0,
      vq: 0,
      vr: 0,
    }));
    const pressure = bodies.map(() => ({ p: 0, q: 0, r: 0 }));

    const press = (
      index: number | undefined,
      x: number,
      y: number,
      d: number,
    ) => {
      if (index === undefined) return;
      const slot = pressure[index];
      if (!slot) return;
      slot.p += d * x * x;
      slot.q += d * x * y;
      slot.r += d * y * y;
    };

    const draw = (instant = false) => {
      for (const slot of pressure) {
        slot.p = 0;
        slot.q = 0;
        slot.r = 0;
      }
      for (const pair of (engine.pairs as { list: Pair[] }).list) {
        if (!pair.isActive) continue;
        const { normal, depth } = pair.collision;
        const d = Math.min(depth / radius, 0.5);
        press(slots.get(pair.bodyA.id), normal.x, normal.y, d);
        press(slots.get(pair.bodyB.id), normal.x, normal.y, d);
      }

      marks.forEach((node, index) => {
        const body = bodies[index];
        const shape = jelly[index];
        const push = pressure[index];
        const centre = offsets[index];
        if (!body || !shape || !push || !centre) return;

        const load = push.p + push.r;
        const squash = load * SQUASH > MAX_SQUASH ? MAX_SQUASH / load : SQUASH;
        let tp = 1 - squash * push.p;
        let tq = -squash * push.q;
        let tr = 1 - squash * push.r;
        const { x: vx, y: vy } = body.velocity;
        const speed = Math.hypot(vx, vy);
        if (speed > 0.01) {
          const s = Math.min(speed * STRETCH, MAX_STRETCH);
          const ux = vx / speed;
          const uy = vy / speed;
          tp += s * ux * ux;
          tq += s * ux * uy;
          tr += s * uy * uy;
        }

        if (instant) {
          shape.p = tp;
          shape.q = tq;
          shape.r = tr;
          shape.vp = 0;
          shape.vq = 0;
          shape.vr = 0;
        } else {
          shape.vp =
            (shape.vp + (tp - shape.p) * JELLY_STIFFNESS) * JELLY_DAMPING;
          shape.vq =
            (shape.vq + (tq - shape.q) * JELLY_STIFFNESS) * JELLY_DAMPING;
          shape.vr =
            (shape.vr + (tr - shape.r) * JELLY_STIFFNESS) * JELLY_DAMPING;
          shape.p += shape.vp;
          shape.q += shape.vq;
          shape.r += shape.vr;
        }
        shape.p = Math.min(1.3, Math.max(0.7, shape.p));
        shape.q = Math.min(0.3, Math.max(-0.3, shape.q));
        shape.r = Math.min(1.3, Math.max(0.7, shape.r));

        const area =
          1 / Math.sqrt(Math.max(shape.p * shape.r - shape.q ** 2, 0.2));
        const p = shape.p * area;
        const q = shape.q * area;
        const r = shape.r * area;
        const cos = Math.cos(body.angle);
        const sin = Math.sin(body.angle);
        const a = p * cos + q * sin;
        const b = q * cos + r * sin;
        const c = q * cos - p * sin;
        const d = r * cos - q * sin;
        // The body sits on the hull's centroid, so pull the mark's centre back from it.
        const x = body.position.x - (a * centre.x + c * centre.y) - size / 2;
        const y = body.position.y - (b * centre.x + d * centre.y) - size / 2;

        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) matrix(${[a, b, c, d].map((value) => value.toFixed(4)).join(", ")}, 0, 0)`;
      });
      place();
    };

    const wobbling = () =>
      jelly.some(
        (shape) =>
          Math.abs(shape.vp) + Math.abs(shape.vq) + Math.abs(shape.vr) > 0.0005,
      );

    const scatter = () => {
      choose(null);
      for (const body of bodies) {
        Sleeping.set(body, false);
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 12,
          y: -(3 + Math.random() * 4),
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
      }
    };

    let moved = false;
    marks.forEach((node, index) => {
      listen(node, "click", () => {
        if (moved) return;
        choose(chosen === index ? null : index);
      });
    });
    listen(root, "click", (event) => {
      const target = event.target as Element;
      if (marks.some((node) => node.contains(target))) return;
      if (target.closest("a, button")) return;
      choose(null);
    });

    let visible = false;
    let shakeNow = () => {};
    const motion = watchShake(() => {
      if (visible || reduced) shakeNow();
    });
    cleanup.push(motion.stop);
    shake.current = () => {
      if (coarse) motion.request();
      shakeNow();
    };

    const teardown = () => {
      shake.current = null;
      placeLabel.current = null;
      for (const undo of cleanup) undo();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };

    if (reduced) {
      const settle = () => {
        for (let step = 0; step < 720; step++) Engine.update(engine, 1000 / 60);
        for (const body of bodies) Sleeping.set(body, true);
        draw(true);
      };
      settle();
      shakeNow = () => {
        scatter();
        settle();
      };
      return teardown;
    }

    const felt = bodies.map(() => Number.NEGATIVE_INFINITY);
    let heard = Number.NEGATIVE_INFINITY;
    const hit = (event: IEventCollision<Engine>) => {
      const now = performance.now();
      let loudest = 0;
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair;
        const { normal } = pair.collision;
        const speed = Math.abs(
          (bodyA.velocity.x - bodyB.velocity.x) * normal.x +
            (bodyA.velocity.y - bodyB.velocity.y) * normal.y,
        );
        if (speed < SOFT_HIT) continue;
        loudest = Math.max(loudest, speed);
        for (const body of [bodyA, bodyB]) {
          const index = slots.get(body.id);
          if (index === undefined) continue;
          if (now - (felt[index] ?? Number.NEGATIVE_INFINITY) < 300) continue;
          felt[index] = now;
          marks[index]?.firstElementChild?.dispatchEvent(
            new CustomEvent<BumpDetail>(BUMP, {
              detail: { hard: speed > HARD_HIT },
            }),
          );
        }
      }
      if (loudest && now - heard > 60) {
        heard = now;
        playBump(loudest / LOUD_HIT);
      }
    };
    Events.on(engine, "collisionStart", hit);
    cleanup.push(() => Events.off(engine, "collisionStart", hit));

    let frame = 0;
    let last = 0;
    let drag: {
      body: Body;
      node: HTMLElement;
      pointer: number;
      grip: Constraint;
      startX: number;
      startY: number;
    } | null = null;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    cleanup.push(stop);
    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 32) : 1000 / 60;
      last = now;
      if (drag) Sleeping.set(drag.body, false);
      Engine.update(engine, dt);
      for (const body of bodies) {
        if (Body.getSpeed(body) > MAX_SPEED) Body.setSpeed(body, MAX_SPEED);
      }
      draw();
      const awake = bodies.some((body) => !body.isSleeping);
      if (!awake && !drag && !wobbling()) {
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

    shakeNow = () => {
      scatter();
      start();
    };

    const point = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return {
        x: Math.min(maxX, Math.max(minX, event.clientX - box.left)),
        y: Math.min(maxY, Math.max(radius, event.clientY - box.top)),
      };
    };
    const release = () => {
      if (!drag) return;
      Composite.remove(engine.world, drag.grip);
      delete drag.node.dataset.dragging;
      drag = null;
    };
    marks.forEach((node, index) => {
      listen(node, "pointerdown", (event) => {
        if (event.button !== 0) return;
        const body = bodies[index];
        if (!body) return;
        unlockAudio();
        release();
        moved = false;
        const here = point(event);
        const grip = Constraint.create({
          pointA: here,
          bodyB: body,
          pointB: { x: here.x - body.position.x, y: here.y - body.position.y },
          length: 0,
          stiffness: 0.16,
          damping: 0.1,
        });
        Composite.add(engine.world, grip);
        drag = {
          body,
          node,
          pointer: event.pointerId,
          grip,
          startX: event.clientX,
          startY: event.clientY,
        };
        node.dataset.dragging = "";
        Sleeping.set(body, false);
        node.setPointerCapture(event.pointerId);
        start();
      });
    });
    listen(root, "pointermove", (event) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      if (
        Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) >
        TAP_SLOP
      ) {
        moved = true;
      }
      drag.grip.pointA = point(event);
    });
    const up = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      release();
    };
    listen(root, "pointerup", up);
    listen(root, "pointercancel", up);

    const reveal = root.closest<HTMLElement>("[data-reveal]");
    const begin = () => {
      if (!visible || frame) return;
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
    cleanup.push(() => observer.disconnect());
    if (reveal) {
      listen(reveal, "transitionend", begin);
      const watching = new MutationObserver(begin);
      watching.observe(reveal, {
        attributes: true,
        attributeFilter: ["data-shown"],
      });
      cleanup.push(() => watching.disconnect());
    }
    begin();

    return teardown;
  }, []);

  useLayoutEffect(() => {
    if (picked !== null) placeLabel.current?.();
  }, [picked]);

  return (
    <div className={styles.promo} data-avatar>
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
        {named ? (
          <Link
            className={styles.name}
            href={`/bots#${botSlug(named.title)}`}
            key={named.title}
            ref={label}
          >
            {named.title}
          </Link>
        ) : null}
      </div>
      <div className={styles.promoActions}>
        <button
          className={styles.promoSecondary}
          onClick={() => shake.current?.()}
          type="button"
        >
          Shake Bots
        </button>
        <Link className={styles.promoButton} data-avatar-action href="/bots">
          View Bots
        </Link>
      </div>
    </div>
  );
}
