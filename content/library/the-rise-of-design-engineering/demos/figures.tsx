import { Figure, figure } from "@/components/writing/figure";

const GAP = { from: 200, to: 280 };

const sides = [
  { name: "Designer", x: 24, width: GAP.from - 24, anchor: "start" },
  { name: "Engineer", x: GAP.to, width: 456 - GAP.to, anchor: "end" },
] as const;

const BRIDGE = { x: 112, width: 256, y: 96 };

export function GapFigure() {
  return (
    <Figure
      label="Two bars on a line from how it looks to how it works. The designer covers the left, the engineer covers the right, and a dashed gap sits between them, where quality dies. A third bar, the design engineer, spans the gap."
      viewBox="0 0 480 128"
      labels={["How it looks", "How it works"]}
    >
      <rect
        className={figure.dashed}
        x={GAP.from}
        y={24}
        width={GAP.to - GAP.from}
        height={96}
        rx={6}
      />
      <text
        className={figure.quiet}
        x={(GAP.from + GAP.to) / 2}
        y={14}
        textAnchor="middle"
      >
        Where quality dies
      </text>
      {sides.map(({ name, x, width, anchor }) => (
        <g key={name}>
          <text
            className={figure.text}
            x={anchor === "start" ? x : x + width}
            y={42}
            textAnchor={anchor}
          >
            {name}
          </text>
          <rect
            className={figure.plane}
            x={x}
            y={50}
            width={width}
            height={10}
            rx={5}
          />
        </g>
      ))}
      <text className={figure.text} x={BRIDGE.x} y={BRIDGE.y - 8}>
        Design engineer
      </text>
      <rect
        className={figure.dot}
        x={BRIDGE.x}
        y={BRIDGE.y}
        width={BRIDGE.width}
        height={10}
        rx={5}
      />
    </Figure>
  );
}

const FILE = 288;
const EXTENT = 440;

const roles = [
  { name: "Front-end engineer", note: "Builds what's on the page", y: 56 },
  { name: "Design engineer", note: "Motion, states, the feel", y: 104 },
];

export function FloorFigure() {
  const [frontEnd, designEngineer] = roles;

  return (
    <Figure
      label="A vertical line marks the static design. The front-end engineer's bar stops exactly at it. The design engineer's bar reaches the same line and keeps going, dashed, into motion, states and feel."
      viewBox="0 0 480 128"
    >
      <path className={figure.faint} d={`M${FILE} 22V124`} />
      <text className={figure.quiet} x={FILE} y={14} textAnchor="middle">
        The static design
      </text>
      {roles.map(({ name, note, y }) => (
        <g key={name}>
          <text className={figure.text} x={24} y={y - 12}>
            {name}
          </text>
          <text className={figure.quiet} x={FILE + 8} y={y - 12}>
            {note}
          </text>
          <rect
            className={figure.plane}
            x={24}
            y={y - 6}
            width={FILE - 24}
            height={12}
            rx={6}
          />
        </g>
      ))}
      <rect
        className={figure.dashed}
        x={FILE}
        y={designEngineer.y - 6}
        width={EXTENT - FILE}
        height={12}
        rx={6}
      />
      <circle className={figure.dot} cx={FILE} cy={frontEnd.y} r={3} />
      <circle className={figure.dot} cx={EXTENT} cy={designEngineer.y} r={3} />
    </Figure>
  );
}
