import { Figure, figure } from "@/components/writing/figure";
import styles from "./styles.module.css";

const COLUMNS = [40, 140, 240, 340, 440];
const SPREAD = [0, 64, 112, 140, 152];
const MIDDLE = 88;

const nodes = COLUMNS.map((x, k) => {
  const count = 2 ** k;
  return Array.from({ length: count }, (_, i) => ({
    x,
    y: count === 1 ? MIDDLE : MIDDLE + (i / (count - 1) - 0.5) * SPREAD[k],
  }));
});

const stage = [styles.a, styles.b, styles.c, styles.d];

export function CopiesFigure() {
  return (
    <Figure
      label="One dot on the left branches into two, then four, eight and sixteen. A single copy of an idea, passed on until it reaches everyone after."
      viewBox="0 0 480 176"
      labels={["One person learns it", "Everyone after them"]}
    >
      <g className={styles.tree}>
        {nodes.slice(1).map((column, k) =>
          column.map((node, i) => {
            const parent = nodes[k][Math.floor(i / 2)];
            const bend = (node.x - parent.x) / 2;
            return (
              <path
                key={`${node.x}-${node.y}`}
                className={`${figure.line} ${styles.edge} ${stage[k]}`}
                d={`M${parent.x} ${parent.y}C${parent.x + bend} ${parent.y} ${node.x - bend} ${node.y} ${node.x} ${node.y}`}
                pathLength={1}
              />
            );
          }),
        )}
        {nodes
          .slice(1)
          .map((column, k) =>
            column.map((node) => (
              <circle
                key={`${node.x}-${node.y}`}
                className={`${figure.dot} ${styles.node} ${stage[k]}`}
                cx={node.x}
                cy={node.y}
                r={k === 3 ? 2 : 2.5}
              />
            )),
          )}
      </g>
      <circle
        className={figure.dot}
        cx={nodes[0][0].x}
        cy={nodes[0][0].y}
        r={3.5}
      />
    </Figure>
  );
}

const ROWS = [
  { name: "Behind a paywall", y: 40, gated: true },
  { name: "Free to read", y: 104, gated: false },
];
const GATE = 240;
const READERS = [0, 1, 2, 3, 4, 5, 6, 7];

export function GateFigure() {
  return (
    <Figure
      label="Two streams of readers moving right. Behind a paywall, most stop at the wall and only a few get through. Free to read, every one of them passes."
      viewBox="0 0 480 128"
    >
      {ROWS.map(({ name, y, gated }) => (
        <g key={name}>
          <text className={figure.text} x={24} y={y - 20}>
            {name}
          </text>
          <path className={figure.guide} d={`M24 ${y}H456`} />
          <path
            className={gated ? figure.line : figure.guide}
            style={gated ? { strokeWidth: 2 } : undefined}
            d={`M${GATE} ${y - 14}V${y + 14}`}
          />
          <g className={styles.moving}>
            {READERS.map((i) => {
              const passes = !gated || i % 4 === 2;
              return (
                <circle
                  key={i}
                  className={`${figure.dot} ${passes ? styles.flow : styles.blocked}`}
                  style={{ animationDelay: `${-i}s` }}
                  cx={24}
                  cy={y}
                  r={3}
                />
              );
            })}
          </g>
          <g className={styles.still}>
            {(gated
              ? [40, 88, 136, 184, 224, 352]
              : [40, 96, 152, 208, 264, 320, 376, 432]
            ).map((x) => (
              <circle key={x} className={figure.dot} cx={x} cy={y} r={3} />
            ))}
          </g>
        </g>
      ))}
    </Figure>
  );
}
