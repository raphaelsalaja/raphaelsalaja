import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/opengraph";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const inter600 = await loadGoogleFont("Inter:wght@600");

  return new ImageResponse(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 64,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            color: "#1b1b1b",
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: -0.69,
            whiteSpace: "nowrap",
          }}
        >
          Raphael Salaja
        </div>
        {title ? (
          <div
            style={{
              color: "#808080",
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: -0.69,
            }}
          >
            {title === "Raphael Salaja" ? "Engineering Feelings" : title}
          </div>
        ) : (
          <div
            style={{
              color: "#808080",
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: -0.69,
              whiteSpace: "nowrap",
            }}
          >
            Engineering Feelings
          </div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: inter600,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
