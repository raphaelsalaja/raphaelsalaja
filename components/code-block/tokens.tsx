import type { CSSProperties } from "react";

// GitHub Light and Dark, the themes rehype-shiki highlights the posts with,
// so code built at runtime matches the code blocks around it.
const COLORS = {
  plain: ["#24292E", "#E1E4E8"],
  keyword: ["#D73A49", "#F97583"],
  string: ["#032F62", "#9ECBFF"],
  constant: ["#005CC5", "#79B8FF"],
  function: ["#6F42C1", "#B392F0"],
  tag: ["#22863A", "#85E89D"],
  comment: ["#6A737D", "#6A737D"],
} as const;

type Kind = keyof typeof COLORS;

type Token = readonly [text: string, kind?: Kind];

/** A line of code as tokens, each with the colour Shiki would give it. */
export type Line = readonly Token[];

export function Highlighted({ lines }: { lines: readonly Line[] }) {
  return (
    <pre className="shiki">
      <code>
        {lines.map((line, row) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: lines have no identity beyond their place
          <span key={row} className="line">
            {line.map(([text, kind = "plain"], column) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: as above
                key={column}
                style={
                  {
                    "--shiki-light": COLORS[kind][0],
                    "--shiki-dark": COLORS[kind][1],
                  } as CSSProperties
                }
              >
                {text}
              </span>
            ))}
            {row < lines.length - 1 && "\n"}
          </span>
        ))}
      </code>
    </pre>
  );
}
