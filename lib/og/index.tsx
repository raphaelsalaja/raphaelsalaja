import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export async function ogFonts() {
  const font = await readFile(join(process.cwd(), "assets/inter-semibold.ttf"));
  return [
    {
      name: "Inter",
      data: font,
      style: "normal" as const,
      weight: 600 as const,
    },
  ];
}

export async function renderOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 64,
        backgroundColor: "white",
        color: "#343433",
        fontFamily: "Inter",
        fontSize: 64,
        fontWeight: 600,
        letterSpacing: -1.43,
        lineHeight: 1.5,
      }}
    >
      {title}
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
