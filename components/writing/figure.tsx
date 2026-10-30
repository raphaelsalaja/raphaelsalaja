import type { ReactNode } from "react";
import styles from "./figure.module.css";

export { styles as figure };

export function Figure({
  label,
  viewBox,
  labels,
  children,
}: {
  label: string;
  viewBox: string;
  labels?: string[];
  children: ReactNode;
}) {
  return (
    <figure className={styles.figure} aria-label={label}>
      <svg
        className={styles.svg}
        viewBox={viewBox}
        fill="none"
        aria-hidden="true"
      >
        {children}
      </svg>
      {labels && (
        <div className={styles.labels} aria-hidden="true">
          {labels.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      )}
    </figure>
  );
}

export function curve(points: [number, number][]) {
  let d = `M${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(i - 1, 0)];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[Math.min(i + 2, points.length - 1)];
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += `C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${x2} ${y2}`;
  }

  return d;
}

export function plot(
  fn: (t: number) => number,
  { x, y, width, height, steps = 120 }: Record<string, number>,
) {
  let d = "";

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const px = x + width * t;
    const py = y - height * fn(t);
    d += `${i === 0 ? "M" : "L"}${px.toFixed(2)} ${py.toFixed(2)}`;
  }

  return d;
}
