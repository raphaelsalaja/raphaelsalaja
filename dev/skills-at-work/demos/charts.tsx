"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Control, Controls } from "@/components/controls";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

const WEEK = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 14 },
  { label: "Thu", value: 22 },
  { label: "Fri", value: 19 },
  { label: "Sat", value: 28 },
  { label: "Sun", value: 24 },
];

const MONTH = [8, 11, 9, 14, 13, 18, 16, 21, 19, 24, 22, 30].map(
  (value, index) => ({ label: `W${index + 1}`, value }),
);

const RANGES = ["Week", "Month"] as const;
type Range = (typeof RANGES)[number];

function ease(t: number) {
  const p1x = 0.23;
  const p1y = 1;
  const p2x = 0.32;
  const p2y = 1;
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
  const slope = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const dx = slope(u);
    if (Math.abs(dx) < 1e-6) break;
    u -= (sampleX(u) - t) / dx;
  }
  return sampleY(Math.min(1, Math.max(0, u)));
}

function resample(values: number[], count: number) {
  if (values.length === 1)
    return Array.from({ length: count }, () => values[0]);
  return Array.from({ length: count }, (_, index) => {
    const t = (index / (count - 1)) * (values.length - 1);
    const left = Math.floor(t);
    const right = Math.min(values.length - 1, left + 1);
    const mix = t - left;
    return values[left] * (1 - mix) + values[right] * mix;
  });
}

function linePath(values: number[], width: number, height: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ChartsDemo() {
  const reduced = useReducedMotion();
  const [range, setRange] = useState<Range>("Week");
  const [snap, setSnap] = useState(true);
  const plot = useRef<HTMLDivElement>(null);
  const stroke = useRef<SVGPathElement>(null);
  const hair = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const value = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const drawn = useRef(false);
  const morphed = useRef(false);
  const points = useRef(WEEK);
  const labelId = useId();

  const series = range === "Week" ? WEEK : MONTH;

  useEffect(() => {
    points.current = series;
    const node = value.current;
    const name = label.current;
    const last = series.at(-1);
    if (node && name && last) {
      node.textContent = String(last.value);
      name.textContent = last.label;
    }
  }, [series]);

  useEffect(() => {
    const path = stroke.current;
    if (!path || drawn.current) return;
    drawn.current = true;
    if (reduced) return;
    const length = path.getTotalLength();
    const animation = path.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      {
        duration: 400,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "forwards",
      },
    );
    path.style.strokeDasharray = `${length}`;
    animation.onfinish = () => {
      path.style.strokeDasharray = "";
      path.style.strokeDashoffset = "";
    };
    return () => animation.cancel();
  }, [reduced]);

  useEffect(() => {
    const path = stroke.current;
    if (!path) return;
    if (!morphed.current) {
      morphed.current = true;
      path.setAttribute(
        "d",
        linePath(
          series.map((point) => point.value),
          320,
          140,
        ),
      );
      return;
    }
    const from = resample(
      (range === "Week" ? MONTH : WEEK).map((point) => point.value),
      series.length,
    );
    const to = series.map((point) => point.value);
    const width = 320;
    const height = 140;
    if (reduced) {
      path.setAttribute("d", linePath(to, width, height));
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 200);
      const mixed = from.map(
        (value, index) => value + (to[index] - value) * ease(t),
      );
      path.setAttribute("d", linePath(mixed, width, height));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [range, reduced, series]);

  const place = (index: number, showHair: boolean) => {
    const box = plot.current?.getBoundingClientRect();
    const point = points.current[index];
    if (!box || !point) return;
    const values = points.current.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const x = (index / (values.length - 1)) * box.width;
    const y =
      box.height - ((point.value - min) / (max - min || 1)) * box.height;
    if (hair.current) hair.current.hidden = !showHair;
    if (dot.current) {
      dot.current.hidden = !showHair;
      dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
    }
    if (hair.current) hair.current.style.transform = `translateX(${x}px)`;
    if (value.current) value.current.textContent = String(point.value);
    if (label.current) label.current.textContent = point.label;
    slider.current?.setAttribute("aria-valuenow", String(index));
    slider.current?.setAttribute(
      "aria-valuetext",
      `${point.label} ${point.value}`,
    );
  };

  const indexAt = (clientX: number) => {
    const box = plot.current?.getBoundingClientRect();
    const count = points.current.length;
    if (!box || count < 2) return 0;
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    if (!snap) return ratio * (count - 1);
    return Math.round(ratio * (count - 1));
  };

  const onPointer = (event: React.PointerEvent) => {
    const index = indexAt(event.clientX);
    const nearest = Math.round(index);
    place(snap ? nearest : nearest, true);
    if (!snap && hair.current && plot.current) {
      const box = plot.current.getBoundingClientRect();
      hair.current.style.transform = `translateX(${event.clientX - box.left}px)`;
    }
  };

  const onKey = (event: React.KeyboardEvent) => {
    const count = points.current.length;
    const current = Number(
      slider.current?.getAttribute("aria-valuenow") ?? count - 1,
    );
    let next = current;
    if (event.key === "ArrowRight") next = Math.min(count - 1, current + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, current - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    place(next, true);
  };

  const initial = linePath(
    WEEK.map((point) => point.value),
    320,
    140,
  );

  return (
    <Demo wide>
      <div className={styles.stack} style={{ width: "min(100%, 520px)" }}>
        <div
          className={styles.row}
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <p id={labelId}>
            <span ref={label}>Sun</span> <span ref={value}>24</span>
          </p>
          <div className={styles.row}>
            {RANGES.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.choice}
                aria-pressed={range === item}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={plot}
          style={{ position: "relative", width: "100%", height: 160 }}
        >
          <svg
            viewBox="0 0 320 140"
            width="100%"
            height="140"
            role="img"
            aria-labelledby={labelId}
          >
            <title>Series</title>
            <path
              ref={stroke}
              d={initial}
              fill="none"
              stroke="light-dark(#1c6bb5, #8ec5ff)"
              strokeWidth="2"
            />
          </svg>
          <div
            ref={slider}
            role="slider"
            tabIndex={0}
            aria-label="Scrub the series"
            aria-valuemin={0}
            aria-valuemax={series.length - 1}
            aria-valuenow={series.length - 1}
            aria-valuetext={`${series.at(-1)?.label} ${series.at(-1)?.value}`}
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            onPointerUp={() => {
              if (hair.current) hair.current.hidden = true;
              if (dot.current) dot.current.hidden = true;
            }}
            onPointerLeave={() => {
              if (hair.current) hair.current.hidden = true;
              if (dot.current) dot.current.hidden = true;
              const last = points.current.at(-1);
              if (value.current && label.current && last) {
                value.current.textContent = String(last.value);
                label.current.textContent = last.label;
              }
            }}
            onKeyDown={onKey}
            style={{
              position: "absolute",
              inset: 0,
              touchAction: "pan-y",
              cursor: "crosshair",
            }}
          />
          <div
            ref={hair}
            hidden
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 1,
              background:
                "light-dark(rgb(0 0 0 / 40%), rgb(255 255 255 / 55%))",
              pointerEvents: "none",
            }}
          />
          <div
            ref={dot}
            hidden
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "light-dark(#1c6bb5, #8ec5ff)",
              pointerEvents: "none",
            }}
          />
        </div>
        <Controls>
          <Control
            label="Crosshair"
            options={["Snap", "Free"]}
            value={snap ? "Snap" : "Free"}
            onChange={(value) => setSnap(value === "Snap")}
          />
        </Controls>
      </div>
    </Demo>
  );
}
