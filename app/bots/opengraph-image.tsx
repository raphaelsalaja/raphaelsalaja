import { Bodies, Body, Composite, Engine, Vertices } from "matter-js";
import { ImageResponse } from "next/og";
import {
  MARK_CENTER,
  MARK_RADIUS,
  MARKS,
  markEyes,
  markHull,
} from "@/components/bots/geometry";
import { type BotColor, bots } from "@/data/bots";
import { ogFonts, ogSize } from "@/lib/og";

export const alt = "Grok Bots";
export const size = ogSize;
export const contentType = "image/png";

const MARK = 136;
const STAGE = 640;
const COLUMNS = 5;
const SETTLE_STEPS = 900;

const FILLS: Record<BotColor, string> = {
  black: "#21201c",
  gray: "#777777",
  blue: "#1084fe",
  cyan: "#00bca6",
  green: "#00c972",
  yellow: "#ff9800",
  orange: "#ff6700",
  magenta: "#ff309b",
  violet: "#9159fe",
};

function mulberry32(start: number) {
  let seed = start;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function settle() {
  const rand = mulberry32(7);
  const order = [...bots].sort(() => rand() - 0.5);
  const scale = MARK / (MARK_RADIUS * 2);
  const radius = MARK * 0.46;

  const engine = Engine.create({
    gravity: { x: 0, y: 1.05, scale: 0.001 },
    positionIterations: 14,
    velocityIterations: 8,
  });
  const walls = [
    Bodies.rectangle(STAGE / 2, 40, STAGE + 200, 80, { isStatic: true }),
    Bodies.rectangle(-40, -1000, 80, 2200, { isStatic: true }),
    Bodies.rectangle(STAGE + 40, -1000, 80, 2200, { isStatic: true }),
  ];

  const pieces = order.map((bot, index) => {
    const outline = Vertices.clockwiseSort(
      markHull(bot.shape).map(([x, y]) => ({
        x: (x - MARK_CENTER) * scale,
        y: (y - MARK_CENTER) * scale,
      })),
    );
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const body = Body.create({
      vertices: outline,
      position: {
        x: ((column + 0.5) / COLUMNS) * STAGE + (rand() - 0.5) * 20,
        y: -radius * 2 - row * (radius * 2 + 8) - rand() * 12,
      },
      angle: (rand() - 0.5) * 1.4,
      restitution: 0.38,
      friction: 0.14,
      frictionAir: 0.018,
      slop: 0,
    });
    return { bot, body, offset: Vertices.centre(outline) };
  });

  Composite.add(engine.world, [...walls, ...pieces.map(({ body }) => body)]);
  for (let step = 0; step < SETTLE_STEPS; step++) {
    Engine.update(engine, 1000 / 60);
  }

  return pieces.map(({ bot, body, offset }) => ({
    bot,
    x: body.position.x,
    y: body.position.y,
    angle: body.angle,
    offset,
    bounds: { ...body.bounds },
  }));
}

export default async function Image() {
  const pieces = settle();
  const scale = MARK / (MARK_RADIUS * 2);
  const left = Math.min(...pieces.map(({ bounds }) => bounds.min.x));
  const right = Math.max(...pieces.map(({ bounds }) => bounds.max.x));
  const top = Math.min(...pieces.map(({ bounds }) => bounds.min.y));
  const bottom = Math.max(...pieces.map(({ bounds }) => bounds.max.y));
  const shiftX = ogSize.width / 2 - (left + right) / 2;
  const shiftY = ogSize.height / 2 - 20 - (top + bottom) / 2;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontFamily: "Inter",
        fontWeight: 600,
      }}
    >
      <svg
        width={ogSize.width}
        height={ogSize.height}
        viewBox={`0 0 ${ogSize.width} ${ogSize.height}`}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <defs>
          {pieces.map(({ bot }, index) => (
            <clipPath id={`mark-${index}`} key={bot.title}>
              <path d={MARKS[bot.shape].path} />
            </clipPath>
          ))}
        </defs>
        {pieces.map(({ bot, x, y, angle, offset }, index) => (
          <g
            key={bot.title}
            transform={`translate(${(x + shiftX).toFixed(2)} ${(y + shiftY).toFixed(2)}) rotate(${((angle * 180) / Math.PI).toFixed(2)}) translate(${(-offset.x).toFixed(2)} ${(-offset.y).toFixed(2)}) scale(${scale.toFixed(4)}) translate(${-MARK_CENTER} ${-MARK_CENTER})`}
          >
            <path d={MARKS[bot.shape].path} fill={FILLS[bot.color]} />
            <g clipPath={`url(#mark-${index})`}>
              {markEyes(bot.shape).map((d) => (
                <path
                  d={d}
                  fill={bot.color === "black" ? "#fdfdfc" : "#ffffff"}
                  key={d}
                />
              ))}
            </g>
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 52,
          display: "flex",
          fontSize: 40,
          letterSpacing: -0.9,
          color: "#343433",
        }}
      >
        Bots
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
