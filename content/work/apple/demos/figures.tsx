import { type Spring, spring, value } from "@web-kits/springboard";
import { marks as base, Chart } from "@/components/chart";
import styles from "@/content/work/genie/demos/figures.module.css";
import swiftuiFixture from "../fixtures/swiftui.json";

type Point = readonly [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const line = (points: Point[]) =>
  `M${points.map(([x, y]) => `${x} ${y}`).join("L")}`;

const _rms = (errors: number[]) =>
  Math.sqrt(errors.reduce((sum, e) => sum + e * e, 0) / errors.length);

const PRESETS = [
  { name: "smooth", label: ".smooth", kind: "ink", style: base.lineStrong },
  { name: "snappy", label: ".snappy", kind: "muted", style: base.lineMuted },
  { name: "bouncy", label: ".bouncy", kind: "accent", style: base.lineAccent },
] as const;

const SPRING_PLOT = { x0: 40, x1: 540, top: 4, base: 124, end: 1.2 };

export function Springs() {
  const { x0, x1, top, base: bottom, end } = SPRING_PLOT;
  const px = (t: number) => round(x0 + (t / end) * (x1 - x0));
  const py = (v: number) => round(bottom - v * ((bottom - top) / 1.1));
  const steps = range(241).map((i) => (i / 240) * end);

  return (
    <Chart
      title="Named Springs"
      legend={[
        ...PRESETS.map(({ label, kind }) => ({ label, kind })),
        { label: "Sampled from SwiftUI", kind: "dot" },
      ]}
      aria-label="SwiftUI's smooth, snappy and bouncy springs from 0 to 1.2 seconds, drawn from the port, with dots sampled from SwiftUI's own Spring.value. Smooth rises without overshooting, snappy overshoots by under 1 percent and bouncy by about 5 percent. Every dot sits on its line."
    >
      <svg className={base.svg} viewBox="0 0 560 160" aria-hidden="true">
        <path className={base.axis} d={`M${x0} ${py(0)}H${x1}`} />
        <path className={base.guide} d={`M${x0} ${py(1)}H${x1}`} />
        {PRESETS.map((preset) => {
          const fixture = swiftuiFixture.springs.find(
            (s) => s.name === preset.name,
          );
          if (!fixture) return null;
          const s: Spring = spring(fixture.response, fixture.dampingRatio);
          return (
            <g key={preset.name}>
              <path
                className={preset.style}
                d={line(steps.map((t) => [px(t), py(value(s, t))]))}
              />
              {fixture.value
                .map((v, i) => ({ t: i * fixture.dt, v, keep: i % 6 === 0 }))
                .filter(({ t, keep }) => keep && t <= end)
                .map(({ t, v }) => (
                  <circle
                    key={t}
                    className={styles.sample}
                    cx={px(t)}
                    cy={py(v)}
                    r={1.4}
                  />
                ))}
            </g>
          );
        })}
        {[0, 0.4, 0.8, 1.2].map((t) => (
          <text
            key={t}
            className={styles.caps}
            x={px(t)}
            y={bottom + 20}
            textAnchor={t ? "middle" : "start"}
          >
            {`${Math.round(t * 1000)} ms`}
          </text>
        ))}
      </svg>
    </Chart>
  );
}
