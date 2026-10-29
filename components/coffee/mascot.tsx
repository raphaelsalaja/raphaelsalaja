"use client";

import { useEffect, useId, useRef } from "react";

const BODY =
  "M2 10.75L2.007 11.017 2.026 11.274 2.076 11.638 2.126 11.891 2.188 12.141 2.268 12.406 2.355 12.648 2.454 12.886 2.616 13.217 2.742 13.441 2.88 13.659 3.028 13.87 3.186 14.073 3.354 14.269 3.531 14.456 3.731 14.646 3.927 14.814 4.13 14.972 4.341 15.12 4.654 15.313 4.881 15.435 5.131 15.553 5.369 15.651 5.612 15.738 5.859 15.812 6.109 15.874 6.362 15.924 6.616 15.962 6.873 15.986 7.112 15.998 7.87 15.999 8.145 15.985 8.529 15.942 8.891 15.874 9.265 15.777 9.527 15.69 9.869 15.553 10.217 15.384 10.457 15.248 10.765 15.048 11.073 14.814 11.282 14.634 11.546 14.377 11.731 14.172 11.972 13.87 12.181 13.566 12.366 13.25 13.367 13.247 13.538 13.235 13.768 13.201 14.031 13.137 14.285 13.048 14.53 12.934 14.679 12.849 14.793 12.776 14.903 12.698 15.083 12.55 15.181 12.457 15.3 12.333 15.448 12.153 15.526 12.043 15.599 11.929 15.684 11.78 15.783 11.569 15.833 11.444 15.887 11.281 15.922 11.15 15.967 10.922 15.985 10.788 15.997 10.617 16 10.482 15.985 10.212 15.951 9.982 15.887 9.719 15.798 9.465 15.684 9.22 15.599 9.071 15.448 8.847 15.275 8.64 15.181 8.543 15.009 8.386 14.793 8.224 14.679 8.151 14.53 8.066 14.285 7.952 14.159 7.905 13.936 7.837 13.672 7.783 13.538 7.765 13.367 7.753 13 7.75 12.999 7.454 12.984 7.306 12.941 7.139 12.904 7.048 12.866 6.976 12.818 6.901 12.765 6.833 12.706 6.77 12.64 6.713 12.571 6.663 12.481 6.61 12.403 6.575 12.314 6.544 12.157 6.51 12.006 6.5 2.974 6.5 2.806 6.516 2.645 6.557 2.495 6.623 2.36 6.713 2.25 6.816 2.148 6.952 2.075 7.097 2.026 7.255 2.007 7.371 2 7.494ZM12.904 11.75L12.974 11.274 12.998 10.888 13 9.25 13.241 9.25 13.372 9.256 13.494 9.274 13.613 9.304 13.728 9.345 13.839 9.398 13.944 9.461 14.043 9.534 14.134 9.616 14.216 9.707 14.289 9.806 14.352 9.911 14.405 10.022 14.446 10.137 14.476 10.256 14.494 10.378 14.5 10.5 14.494 10.622 14.476 10.744 14.446 10.863 14.405 10.978 14.352 11.089 14.289 11.194 14.216 11.293 14.134 11.384 14.043 11.466 13.944 11.539 13.839 11.602 13.728 11.655 13.613 11.696 13.494 11.726 13.311 11.748Z";

const CENTRE = { x: 7.6, y: 11.2 };
const RADIUS = { x: 5, y: 4 };
const PIVOT = { x: 7.5, y: 16 };
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
  const eyes = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const node = svg.current;
    const card = node?.closest("section");
    const button = card?.querySelector("a");
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
      <g ref={body}>
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
