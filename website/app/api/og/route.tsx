import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  const data = await fetch(
    new URL("/fonts/openrunde/semibold.otf", request.url),
    {
      cache: "force-cache",
    },
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 64,
      }}
    >
      <div
        style={{
          color: "#343433",
          fontSize: 64,
          fontWeight: 600,
          fontFamily: "OpenRunde",
          lineHeight: 1.5,
          letterSpacing: -1.43,
        }}
      >
        {title || "Raphael Salaja"}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "OpenRunde",
          data: data,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
