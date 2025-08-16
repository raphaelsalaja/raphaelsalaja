import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #F80 0%, #DB5400 100%)",
        borderRadius: "100%",
        padding: "4px",
      }}
    />,
    {
      ...size,
    },
  );
}
