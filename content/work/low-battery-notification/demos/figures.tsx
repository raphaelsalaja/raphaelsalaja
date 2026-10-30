import type { CSSProperties } from "react";
import base from "@/content/work/command-menu/demos/figures.module.css";

const MIDDLE = 76;
const NAMES_Y = 124;
const BELOW = NAMES_Y + 10;
const RETURN_Y = 152;
const RED = "#ff4f5c";
const YELLOW = "#fec642";

type Island = { name: string; x: number; width: number; height: number };

const islands: Island[] = [
  { name: "closed", x: 28, width: 72, height: 22 },
  { name: "expanded", x: 140, width: 172, height: 48 },
  { name: "low power mode", x: 364, width: 172, height: 48 },
];

const tone = (color: string) => ({ "--figure-accent": color }) as CSSProperties;

function Arrow({
  from,
  to,
  y,
  label,
  below = false,
}: {
  from: number;
  to: number;
  y: number;
  label: string;
  below?: boolean;
}) {
  const dir = to > from ? -1 : 1;
  return (
    <g>
      <path className={base.leader} d={`M${from} ${y}H${to}`} />
      <path
        className={base.leader}
        d={`M${to + dir * 5} ${y - 3}L${to} ${y}L${to + dir * 5} ${y + 3}`}
      />
      <text
        className={base.spec}
        x={(from + to) / 2}
        y={below ? y + 13 : y - 7}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function Content({ island, low }: { island: Island; low: boolean }) {
  const { x, width } = island;
  const battery = { x: x + width - 48, y: MIDDLE - 7 };

  return (
    <g style={tone(low ? YELLOW : RED)}>
      <rect
        className={base.ink}
        x={x + 22}
        y={MIDDLE - 9}
        width={48}
        height={5}
        rx={2.5}
      />
      <rect
        className={low ? base.focus : base.ink}
        x={x + 22}
        y={MIDDLE + 5}
        width={low ? 82 : 92}
        height={4}
        rx={2}
      />
      <rect
        className={low ? base.focus : base.plate}
        x={battery.x}
        y={battery.y}
        width={26}
        height={14}
        rx={4}
      />
      <rect
        className={base.chip}
        x={battery.x + 27}
        y={MIDDLE - 3}
        width={2}
        height={6}
        rx={1}
      />
      <rect
        className={base.focus}
        x={battery.x + 2.5}
        y={battery.y + 2.5}
        width={5}
        height={9}
        rx={2}
      />
    </g>
  );
}

export function IslandFigure() {
  const [closed, expanded, low] = islands;
  const home = closed.x + closed.width / 2;
  const away = low.x + low.width / 2;

  return (
    <figure
      className={base.figure}
      aria-label="Three states of the island. Closed is a small pill. A tap expands it to show the battery level and a prompt. Another tap turns on low power mode and the battery turns yellow. A tap turns it back off, and a tap outside closes it. Every change uses the same spring, bounce 0.2 over 0.6 seconds."
    >
      <svg className={base.svg} viewBox="0 0 560 172" aria-hidden="true">
        <text className={base.formula} x={28} y={20}>
          {"spring({ bounce: 0.2, duration: 0.6 })"}
        </text>
        {islands.map((island, i) => (
          <g key={island.name}>
            <rect
              className={base.plate}
              x={island.x}
              y={MIDDLE - island.height / 2}
              width={island.width}
              height={island.height}
              rx={island.height / 2}
            />
            {i > 0 && <Content island={island} low={i === 2} />}
            <text
              className={base.name}
              x={island.x + island.width / 2}
              y={NAMES_Y}
              textAnchor="middle"
            >
              {island.name}
            </text>
          </g>
        ))}
        <Arrow
          from={closed.x + closed.width + 6}
          to={expanded.x - 6}
          y={MIDDLE}
          label="tap"
        />
        <Arrow
          from={expanded.x + expanded.width + 6}
          to={low.x - 6}
          y={MIDDLE - 8}
          label="tap"
        />
        <Arrow
          from={low.x - 6}
          to={expanded.x + expanded.width + 6}
          y={MIDDLE + 8}
          label="tap"
          below
        />
        <path
          className={base.leader}
          d={`M${away} ${BELOW}V${RETURN_Y}H${home}V${BELOW}`}
        />
        <path
          className={base.leader}
          d={`M${home - 3} ${BELOW + 5}L${home} ${BELOW}L${home + 3} ${BELOW + 5}`}
        />
        <text
          className={base.spec}
          x={(home + away) / 2}
          y={RETURN_Y - 7}
          textAnchor="middle"
        >
          tap outside, from either
        </text>
      </svg>
    </figure>
  );
}
