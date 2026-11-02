import { ImageResponse } from "next/og";
import { ogFonts, ogSize } from "@/lib/og";

const SIZE = 120;
const RADIUS = 26;
const TRAVEL = 160;
const PASSES = 6;

const LEFT = (ogSize.width - SIZE - TRAVEL) / 2;
const TOP = (ogSize.height - SIZE) / 2;

function average(a: string, b: string, dx: number, result: string) {
  return [
    <feOffset
      key={`${result}-shift`}
      in={b}
      dx={dx}
      result={`${result}-shift`}
    />,
    <feComposite
      key={result}
      in={a}
      in2={`${result}-shift`}
      operator="arithmetic"
      k2={0.5}
      k3={0.5}
      result={result}
    />,
  ];
}

// Each pass averages the image with itself shifted along the move, so six
// passes give 64 evenly spaced samples, like an open shutter. Folding in the
// shorter runs at the far end weights the samples towards where the move
// slows down, the way an ease-out lands.
function streak() {
  const step = TRAVEL / 2 ** PASSES;
  const run = (i: number) => step * 2 ** (i + 1);
  const box = Array.from({ length: PASSES }, (_, i) =>
    average(
      i === 0 ? "SourceGraphic" : `box${i - 1}`,
      i === 0 ? "SourceGraphic" : `box${i - 1}`,
      step * 2 ** i,
      `box${i}`,
    ),
  );
  const ease = [PASSES - 2, PASSES - 3, PASSES - 4].map((i, n) =>
    average(
      n === 0 ? `box${PASSES - 1}` : `ease${n - 1}`,
      `box${i}`,
      TRAVEL - run(i),
      `ease${n}`,
    ),
  );
  return [
    ...box.flat(),
    ...ease.flat(),
    <feGaussianBlur key="soften" in="ease2" stdDeviation="8 0" />,
  ];
}

export async function renderMotionBlurOgImage() {
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
          <filter
            id="streak"
            filterUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={ogSize.width}
            height={ogSize.height}
            colorInterpolationFilters="sRGB"
          >
            {streak()}
          </filter>
        </defs>
        <rect
          x={LEFT}
          y={TOP}
          width={SIZE}
          height={SIZE}
          rx={RADIUS}
          fill="#343433"
          filter="url(#streak)"
        />
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
        Motion Blur
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
