import { CURVE, TOP } from "@web-kits/blur";
import Image from "next/image";
import { marks as base, Chart } from "@/components/chart";
import styles from "./figures.module.css";

const round = (n: number) => Math.round(n * 10) / 10;

const X0 = 8;
const W = 544;
const Y0 = 8;
const Y1 = 104;

function mask(t: number) {
  if (t <= TOP.start) return 1;
  if (t >= TOP.end) return 0;
  const u = ((t - TOP.start) / (TOP.end - TOP.start)) * (CURVE.length - 1);
  const i = Math.floor(u);
  return CURVE[i] + ((CURVE[i + 1] ?? 0) - CURVE[i]) * (u - i);
}

export function Curve() {
  const tx = (t: number) => round(X0 + t * W);
  const ty = (v: number) => round(Y1 - v * (Y1 - Y0));
  const points = Array.from({ length: 121 }, (_, i) => i / 120);
  const path = `M${points.map((t) => `${tx(t)} ${ty(mask(t))}`).join("L")}`;

  return (
    <Chart
      title="Mask Strength"
      aria-label="The mask down the top edge. It holds at full strength for the first 34 percent, then falls on an S-shaped curve to nothing at 97 percent."
    >
      <svg className={base.svg} viewBox="0 0 560 146" aria-hidden="true">
        <path className={base.axis} d={`M${X0} ${ty(0)}h${W}`} />
        <path className={base.guide} d={`M${X0} ${ty(1)}h${W}`} />
        {[TOP.start, TOP.end].map((t) => (
          <path key={t} className={base.guide} d={`M${tx(t)} ${Y0}V${Y1}`} />
        ))}
        <path className={base.lineStrong} d={path} />
        {[0, TOP.start, TOP.end].map((t) => (
          <text
            key={t}
            className={base.spec}
            x={tx(t)}
            y={Y1 + 18}
            textAnchor={t === 0 ? "start" : "middle"}
          >
            {`${Math.round(t * 100)}%`}
          </text>
        ))}
        <text className={base.spec} x={X0} y={Y1 + 36}>
          from the bar to the content
        </text>
      </svg>
    </Chart>
  );
}

const STRIPS = [
  { name: "iOS 27", spec: "Simulator", src: "ios" },
  { name: "Safari", spec: "blend, rms 0.0064", src: "safari" },
  { name: "Chrome", spec: "filter, rms 0.0089", src: "chrome" },
] as const;

export function Compare() {
  return (
    <Chart title="Edge Captures" panelClassName={styles.compare}>
      {STRIPS.map(({ name, spec, src }) => (
        <div key={src} className={styles.strip}>
          <p className={styles.label}>
            <span className={styles.name}>{name}</span>
            <span className={styles.spec}>{spec}</span>
          </p>
          <Image
            className={styles.image}
            src={`/media/work/progressive-blur/${src}.png`}
            width={1206}
            height={306}
            sizes="(width <= 640px) 100vw, 640px"
            alt={`The top 102 points of the soft edge over black and white bars, in ${name}.`}
          />
        </div>
      ))}
    </Chart>
  );
}
