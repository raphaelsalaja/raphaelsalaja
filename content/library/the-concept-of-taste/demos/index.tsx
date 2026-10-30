import { Figure, figure } from "@/components/writing/figure";

const START = 24;
const END = 456;
const BASE = 104;
const FEED = 10;

const movements = [
  { name: "Baroque", width: 168, height: 64 },
  { name: "Modernism", width: 104, height: 60 },
  { name: "Postmodernism", width: 64, height: 56 },
];

const feedStart = START + movements.reduce((sum, { width }) => sum + width, 0);
const feedWidth = (END - feedStart) / FEED;

const hills = [
  ...movements,
  ...Array.from({ length: FEED }, (_, i) => ({
    name: "",
    width: feedWidth,
    height: i % 2 === 0 ? 28 : 20,
  })),
].map((movement, i, all) => ({
  ...movement,
  x: START + all.slice(0, i).reduce((sum, { width }) => sum + width, 0),
}));

const names = [
  ...hills
    .filter(({ name }) => name)
    .map(({ name, x, width }) => ({ name, x: x + width / 2 })),
  { name: "The feed", x: (feedStart + END) / 2 },
];

const hill = ({ x, width, height }: (typeof hills)[number]) => {
  const peak = BASE - height;
  return `C${x + width * 0.35} ${BASE} ${x + width * 0.25} ${peak} ${x + width / 2} ${peak}S${x + width * 0.65} ${BASE} ${x + width} ${BASE}`;
};

export function CycleFigure() {
  return (
    <Figure
      label="A line rising and falling in hills. Baroque is a long, slow hill. Modernism is shorter, postmodernism shorter again, and the feed is a row of tiny spikes, each gone almost as soon as it starts."
      viewBox="0 0 480 136"
      labels={["Then", "Now"]}
    >
      <path className={figure.axis} d={`M${START} ${BASE}H${END}`} />
      <path
        className={`${figure.line} ${figure.draw}`}
        d={`M${START} ${BASE}${hills.map(hill).join("")}`}
        pathLength={1}
      />
      {names.map(({ name, x }) => (
        <text
          key={name}
          className={figure.quiet}
          x={x}
          y={BASE + 20}
          textAnchor="middle"
        >
          {name}
        </text>
      ))}
    </Figure>
  );
}

const CARD = { y: 16, width: 192, height: 100, inset: 16 };

const flat = [150, 140, 156, 120, 148, 96];
const body = [150, 144, 110];

const cards = [
  { name: "No hierarchy", x: 24 },
  { name: "With hierarchy", x: 264 },
];

export function HierarchyFigure() {
  const [plain, ordered] = cards.map(({ x }) => x + CARD.inset);

  return (
    <Figure
      label="Two cards with the same content. In the first, six lines of equal weight sit evenly spaced. In the second, a short heavy heading comes first, then three lighter lines, then a button, with space between each group."
      viewBox="0 0 480 144"
    >
      {cards.map(({ name, x }) => (
        <g key={name}>
          <rect
            className={figure.plane}
            x={x}
            y={CARD.y}
            width={CARD.width}
            height={CARD.height}
            rx={8}
          />
          <text
            className={figure.text}
            x={x + CARD.width / 2}
            y={136}
            textAnchor="middle"
          >
            {name}
          </text>
        </g>
      ))}
      {flat.map((length, i) => (
        <path
          key={length}
          className={figure.faint}
          d={`M${plain} ${CARD.y + 16 + i * 14}h${length}`}
        />
      ))}
      <path
        className={figure.line}
        style={{ strokeWidth: 4 }}
        d={`M${ordered} ${CARD.y + 20}h88`}
      />
      {body.map((length, i) => (
        <path
          key={length}
          className={figure.faint}
          d={`M${ordered} ${CARD.y + 42 + i * 10}h${length}`}
        />
      ))}
      <rect
        className={figure.hollow}
        x={ordered}
        y={CARD.y + 74}
        width={48}
        height={14}
        rx={7}
      />
    </Figure>
  );
}

const HUB = { x: 240, y: 76 };

const sources = [
  "Hardware",
  "Film",
  "Music",
  "Print",
  "Architecture",
  "Fashion",
].map((name, i) => {
  const angle = (i * Math.PI) / 3;
  return {
    name,
    x: Number((HUB.x + Math.cos(angle) * 168).toFixed(2)),
    y: Number((HUB.y + Math.sin(angle) * 52).toFixed(2)),
  };
});

const crossings = [
  [3, 4],
  [1, 2],
  [5, 0],
];

function placement({ x, y }: { x: number; y: number }) {
  if (y === HUB.y) {
    const right = x > HUB.x;
    return {
      x: x + (right ? 10 : -10),
      y: y + 3,
      anchor: right ? "start" : "end",
    } as const;
  }
  return { x, y: y < HUB.y ? y - 10 : y + 18, anchor: "middle" } as const;
}

export function ConnectFigure() {
  return (
    <Figure
      label="Your work sits in the middle, connected to six sources around it: hardware, film, music, print, architecture and fashion. Some of the sources are connected to each other too."
      viewBox="0 0 480 152"
    >
      {crossings.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          className={figure.guide}
          d={`M${sources[a].x} ${sources[a].y}L${sources[b].x} ${sources[b].y}`}
        />
      ))}
      {sources.map((source) => {
        const label = placement(source);
        return (
          <g key={source.name}>
            <path
              className={`${figure.line} ${figure.draw}`}
              d={`M${HUB.x} ${HUB.y}L${source.x} ${source.y}`}
              pathLength={1}
            />
            <circle className={figure.dot} cx={source.x} cy={source.y} r={3} />
            <text
              className={figure.quiet}
              x={label.x}
              y={label.y}
              textAnchor={label.anchor}
            >
              {source.name}
            </text>
          </g>
        );
      })}
      <circle className={figure.hollow} cx={HUB.x} cy={HUB.y} r={8} />
      <circle className={figure.dot} cx={HUB.x} cy={HUB.y} r={3.5} />
      <text
        className={figure.text}
        x={HUB.x}
        y={HUB.y + 24}
        textAnchor="middle"
      >
        Your work
      </text>
    </Figure>
  );
}
