import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Raphael Salaja";

  const fontData = await fetch(
    new URL("/fonts/openrunde/semibold.otf", request.url),
    { cache: "no-store" },
  ).then((r) => r.arrayBuffer());

  const image = new ImageResponse(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
        color: "#343433",
        fontSize: 64,
        fontWeight: 600,
        fontFamily: "OpenRunde",
        lineHeight: 1.5,
        letterSpacing: -1.43,
      }}
    >
      {title}
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "OpenRunde",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );

  image.headers.set("Cache-Control", "no-store");

  return image;
}
