// biome-ignore-all lint/style/noNonNullAssertion: env

import { SpotifyAPI } from "@statsfm/spotify.js";
import { NextResponse } from "next/server";

const spotify = new SpotifyAPI({
  clientCredentials: {
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  },
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
});

export async function GET() {
  try {
    const recentlyPlayed = await spotify.me.getPlaybackState();

    const response = NextResponse.json(recentlyPlayed);

    // Add caching headers
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=5, stale-while-revalidate=30",
    );

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 },
    );
  }
}
