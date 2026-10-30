"use client";

import { useEffect, useId, useRef } from "react";

const BODY =
  "M1.5 5.4H12.5L11.72 11.6H12.22L11.79 15H11.29L11.15 16.1Q11.05 17 10.15 17H3.85Q2.95 17 2.85 16.1L2.71 15H2.21L1.78 11.6H2.28Z";
const LID =
  "M3.2 1.2H10.8A1 1 0 0 1 11.8 2.2V2.8H12.3A.9.9 0 0 1 12.3 4.6H1.7A.9.9 0 0 1 1.7 2.8H2.2V2.2A1 1 0 0 1 3.2 1.2Z";

const CENTRE = { x: 7, y: 10.8 };
const RADIUS = { x: 4.6, y: 4.6 };
const PIVOT = { x: 7, y: 17 };
const TAU = Math.PI * 2;

type Gaze = { yaw: number; pitch: number; roll: number };
type Eye = { w: number; h: number; tilt: number; open: number };
type Face = { gaze: Gaze; split: number; eyes: [Eye, Eye] };
type Mood = keyof typeof FACES;

const REST: Gaze = { yaw: 24, pitch: 24, roll: -12 };

const pair = (w: number, h: number, tilt = 0, open = 1): [Eye, Eye] => [
  { w, h, tilt, open },
  { w, h, tilt: -tilt, open },
];

const FACES = {
  idle: {
    gaze: { yaw: 0, pitch: 0, roll: 0 },
    split: 15.5,
    eyes: pair(1.36, 3),
  },
  attentive: {
    gaze: { yaw: 0, pitch: 0, roll: 0 },
    split: 16,
    eyes: pair(1.5, 3.2),
  },
  excited: {
    gaze: { yaw: 0, pitch: -4, roll: 6 },
    split: 19,
    eyes: pair(2.1, 3.9, -8),
  },
  happy: {
    gaze: { yaw: 0, pitch: 10, roll: 0 },
    split: 17.5,
    eyes: pair(2.4, 1, 18),
  },
  sleepy: {
    gaze: { yaw: -6, pitch: -14, roll: 4 },
    split: 15,
    eyes: pair(1.36, 3, 0, 0.4),
  },
  asleep: {
    gaze: { yaw: -8, pitch: -20, roll: 8 },
    split: 15,
    eyes: pair(1.6, 3, 0, 0),
  },
} satisfies Record<string, Face>;

type Vector = [number, number, number];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;
const random = (min: number, max: number) => min + Math.random() * (max - min);
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const easeOutQuint = (t: number) => 1 - (1 - t) ** 5;
const round = (value: number) => Math.round(value * 1000) / 1000;

function wave(t: number, period: number, phase: number) {
  const r = (t / period) * TAU;
  return (
    0.55 * Math.sin(r + phase) +
    0.3 * Math.sin(2 * r + phase * 1.7 + 1.1) +
    0.15 * Math.sin(3 * r + phase * 2.3 + 2.4)
  );
}

function turn(a: Vector, b: Vector, angle: number): [Vector, Vector] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [a[0] * c + b[0] * s, a[1] * c + b[1] * s, a[2] * c + b[2] * s],
    [b[0] * c - a[0] * s, b[1] * c - a[1] * s, b[2] * c - a[2] * s],
  ];
}

function capsule(w: number, h: number) {
  const r = Math.min(w, h) / 2;
  if (h >= w) {
    const y = h / 2 - r;
    return `M${round(-r)} ${round(-y)}a${round(r)} ${round(r)} 0 0 1 ${round(2 * r)} 0v${round(2 * y)}a${round(r)} ${round(r)} 0 0 1 ${round(-2 * r)} 0z`;
  }
  const x = w / 2 - r;
  return `M${round(-x)} ${round(r)}a${round(r)} ${round(r)} 0 0 1 0 ${round(-2 * r)}h${round(2 * x)}a${round(r)} ${round(r)} 0 0 1 0 ${round(2 * r)}z`;
}

function drawEyes(face: Face, gaze: Gaze, lid: number) {
  let forward: Vector = [0, 0, 1];
  let right: Vector = [1, 0, 0];
  let up: Vector = [0, 1, 0];
  [forward, right] = turn(forward, right, radians(gaze.yaw));
  [up, forward] = turn(up, forward, radians(gaze.pitch));
  [right, up] = turn(right, up, radians(gaze.roll));

  return face.eyes.map((eye, index) => {
    const [point, tangent] = turn(
      forward,
      right,
      radians(face.split * (index ? 1 : -1)),
    );
    const c = Math.cos(radians(eye.tilt));
    const s = Math.sin(radians(eye.tilt));
    const squash = 0.06 + 0.94 * clamp(Math.min(lid, eye.open));
    const matrix = [
      tangent[0] * c + up[0] * s,
      (tangent[1] * c + up[1] * s) * squash,
      -tangent[0] * s + up[0] * c,
      (-tangent[1] * s + up[1] * c) * squash,
      CENTRE.x + point[0] * RADIUS.x,
      CENTRE.y + point[1] * RADIUS.y,
    ];
    return {
      d: capsule(eye.w, eye.h),
      transform: `matrix(${matrix.map(round).join(",")})`,
      opacity: round(clamp(point[2] / 0.12)),
    };
  });
}

function blinkLid(since: number) {
  const r = since / 0.18;
  if (r < 0 || r > 1) return 1;
  return r < 0.45 ? 1 - r / 0.45 : (r - 0.45) / 0.55;
}

function hop(since: number) {
  if (since < 0 || since > 0.75) return { y: 0, sx: 1, sy: 1 };
  if (since < 0.08) {
    const k = Math.sin((since / 0.08) * (Math.PI / 2));
    return { y: 0, sx: 1 + 0.08 * k, sy: 1 - 0.12 * k };
  }
  if (since < 0.46) {
    const k = (since - 0.08) / 0.38;
    const stretch = 0.1 * Math.abs(1 - 2 * k);
    return { y: -8 * k * (1 - k), sx: 1 - stretch * 0.6, sy: 1 + stretch };
  }
  const k = (since - 0.46) / 0.29;
  const squash = 0.14 * (1 - k) ** 2 * Math.cos(k * TAU * 1.2);
  return { y: 0, sx: 1 + squash * 0.7, sy: 1 - squash };
}

const STILL = drawEyes(FACES.idle, REST, 1);

export function Mascot({ className }: { className?: string }) {
  const id = useId();
  const svg = useRef<SVGSVGElement>(null);
  const body = useRef<SVGGElement>(null);
  const lid = useRef<SVGPathElement>(null);
  const eyes = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const node = svg.current;
    const card = node?.closest("section");
    const button = card?.querySelector("[data-coffee]");
    if (!node || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const face: Face = structuredClone(FACES.idle);
    const gaze: Gaze = { ...REST };
    const lean = { x: 0, y: 0, angle: 0, excited: 0 };
    const glance = { yaw: 0, pitch: 0, until: 0, next: random(1.5, 3) };
    let t = 0;
    let quiet = 0;
    let inside = false;
    let overButton = false;
    let pointer: { x: number; y: number } | null = null;
    let leftAt = -10;
    let blinkAt = -10;
    let nextBlink = random(1, 2.5);
    let spinAt = -10;
    let hopAt = -10;
    let happyUntil = -10;

    const mood = (): Mood => {
      if (t < happyUntil) return "happy";
      if (overButton) return "excited";
      if (inside) return "attentive";
      if (quiet > 30) return "asleep";
      if (quiet > 24) return "sleepy";
      return "idle";
    };

    const pointerGaze = (): Gaze => {
      const box = node.getBoundingClientRect();
      const dx = (pointer?.x ?? 0) - (box.left + box.width / 2);
      const dy = (pointer?.y ?? 0) - (box.top + box.height / 2);
      const yaw = clamp((Math.atan2(dx, 90) * 180) / Math.PI, -45, 45);
      const pitch =
        12 + clamp((Math.atan2(-dy, 70) * 180) / Math.PI, -45, 35) * 0.6;
      return { yaw, pitch, roll: REST.roll - yaw * 0.1 };
    };

    const render = (dt: number) => {
      t += dt;
      const current = mood();
      if (!inside) quiet += dt;

      if (current === "idle" && t > glance.next) {
        const wide = Math.random() < 0.45;
        glance.yaw = wide ? random(-40, 30) : random(-10, 10);
        glance.pitch = wide ? random(-25, 12) : random(-6, 6);
        glance.until = t + random(0.8, 1.8);
        glance.next = glance.until + random(1.5, 4);
        if (Math.abs(glance.yaw) > 25) blinkAt = t;
      }
      if (t > glance.until) {
        glance.yaw = 0;
        glance.pitch = 0;
      }

      if (t > nextBlink && current !== "asleep") {
        blinkAt = t;
        nextBlink = t + random(1.9, 4.6);
        if (Math.random() < 0.18) nextBlink = t + 0.24;
      }

      const target = FACES[current];
      const morph = 1 - Math.exp(-dt / 0.09);
      face.split = lerp(face.split, target.split, morph);
      for (const key of ["yaw", "pitch", "roll"] as const) {
        face.gaze[key] = lerp(face.gaze[key], target.gaze[key], morph);
      }
      face.eyes.forEach((eye, index) => {
        for (const key of ["w", "h", "tilt", "open"] as const) {
          eye[key] = lerp(eye[key], target.eyes[index][key], morph);
        }
      });

      const aim =
        pointer && current !== "happy"
          ? pointerGaze()
          : {
              yaw: REST.yaw + glance.yaw,
              pitch: REST.pitch + glance.pitch,
              roll: REST.roll,
            };
      const snap = 1 - Math.exp(-dt / 0.06);
      for (const key of ["yaw", "pitch", "roll"] as const) {
        gaze[key] = lerp(gaze[key], aim[key] + face.gaze[key], snap);
      }

      const drift = pointer ? 0.35 : current === "asleep" ? 0 : 1;
      const spin =
        t - spinAt < 1.1 ? 360 * (1 - easeOutQuint((t - spinAt) / 1.1)) : 0;
      const roll = wave(t, 13.7, 3.2) * 2.2 * drift;
      const final: Gaze = {
        yaw:
          gaze.yaw +
          (wave(t, 11.3, 0.4) * 5.5 + wave(t, 3.7, 2.1) * 1.6) * drift -
          spin,
        pitch:
          gaze.pitch +
          (wave(t, 9.1, 1.3) * 4.2 + wave(t, 4.3, 0.7) * 1.3) * drift,
        roll: gaze.roll + roll,
      };

      const follow = 1 - Math.exp(-dt / 0.22);
      const turned = gaze.yaw - REST.yaw;
      lean.angle = lerp(
        lean.angle,
        clamp(turned * 0.07, -4, 4) + roll * 0.5,
        follow,
      );
      lean.x = lerp(lean.x, clamp(turned * 0.01, -0.5, 0.5), follow);
      lean.y = lerp(
        lean.y,
        clamp((REST.pitch - gaze.pitch) * 0.008, -0.35, 0.35),
        follow,
      );
      lean.excited = lerp(lean.excited, current === "excited" ? 1 : 0, follow);

      const asleep = current === "asleep" || current === "sleepy";
      const breath = asleep
        ? Math.sin((t / 4.6) * TAU) * 0.03
        : Math.sin((t / 3.4) * TAU) * 0.012;
      const jump = hop(t - hopAt);
      const x = lean.x + wave(t, 7.9, 1.9) * 0.15;
      const y =
        lean.y +
        wave(t, 5.3, 0.3) * 0.3 +
        jump.y -
        Math.abs(Math.sin(t * TAU * 1.4)) * 0.35 * lean.excited;
      const sx = jump.sx * (1 - breath * 0.4);
      const sy = jump.sy * (1 + breath);

      body.current?.setAttribute(
        "transform",
        `translate(${round(x)} ${round(y)}) rotate(${round(lean.angle)} ${PIVOT.x} ${PIVOT.y}) translate(${PIVOT.x} ${PIVOT.y}) scale(${round(sx)} ${round(sy)}) translate(${-PIVOT.x} ${-PIVOT.y})`,
      );
      lid.current?.setAttribute(
        "transform",
        `translate(0 ${round(clamp((jump.sy - 1) * 6, -0.9, 0.2))})`,
      );
      drawEyes(face, final, blinkLid(t - blinkAt)).forEach((eye, index) => {
        const path = eyes.current[index];
        if (!path) return;
        path.setAttribute("d", eye.d);
        path.setAttribute("transform", eye.transform);
        path.setAttribute("opacity", String(eye.opacity));
      });
    };

    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      render(last ? Math.min((now - last) / 1000, 0.064) : 0);
      last = now;
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

    const celebrate = () => {
      hopAt = t;
      happyUntil = t + 1.4;
      quiet = 0;
    };
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (quiet > 24 || t - leftAt > 6) {
        spinAt = t;
        blinkAt = t;
      }
      inside = true;
      quiet = 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      inside = true;
      quiet = 0;
    };
    const leave = () => {
      inside = false;
      pointer = null;
      leftAt = t;
    };
    const tickle = () => {
      if (t - hopAt > 1.2) celebrate();
    };
    const hover = () => {
      overButton = true;
    };
    const unhover = () => {
      overButton = false;
    };

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    node.addEventListener("pointerenter", tickle);
    node.addEventListener("pointerdown", celebrate);
    button?.addEventListener("pointerenter", hover);
    button?.addEventListener("pointerleave", unhover);
    button?.addEventListener("pointerdown", celebrate);

    return () => {
      stop();
      observer.disconnect();
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      node.removeEventListener("pointerenter", tickle);
      node.removeEventListener("pointerdown", celebrate);
      button?.removeEventListener("pointerenter", hover);
      button?.removeEventListener("pointerleave", unhover);
      button?.removeEventListener("pointerdown", celebrate);
    };
  }, []);

  return (
    <svg
      ref={svg}
      viewBox="0 0.6 14 17"
      width={28}
      height={34}
      aria-hidden="true"
      className={className}
    >
      <defs>
        <clipPath id={id}>
          <path d={BODY} />
        </clipPath>
      </defs>
      <g ref={body}>
        <path ref={lid} d={LID} fill="var(--mascot-body)" />
        <path d={BODY} fill="var(--mascot-body)" />
        <g clipPath={`url(#${id})`} fill="var(--mascot-eyes)">
          {STILL.map((eye, index) => (
            <path
              // biome-ignore lint/suspicious/noArrayIndexKey: two fixed eyes
              key={index}
              ref={(path) => {
                eyes.current[index] = path;
              }}
              d={eye.d}
              transform={eye.transform}
              opacity={eye.opacity}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
