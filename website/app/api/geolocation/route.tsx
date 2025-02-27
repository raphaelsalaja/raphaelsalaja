import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const geo = geolocation(request);

    const { city = "Unknown City", country = "Unknown Country", region = "Unknown Region" } = geo;

    return new Response(JSON.stringify({ city, country, region }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get geolocation data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
