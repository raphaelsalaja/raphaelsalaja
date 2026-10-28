import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export async function renderOgImage(title: string) {
  const font = await readFile(
    join(process.cwd(), "assets/openrunde-semibold.otf"),
  );

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
        fontFamily: "OpenRunde",
        fontSize: 64,
        fontWeight: 600,
        letterSpacing: -1.43,
        lineHeight: 1.5,
      }}
    >
      {title}
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "OpenRunde", data: font, style: "normal", weight: 600 }],
    },
  );
}
