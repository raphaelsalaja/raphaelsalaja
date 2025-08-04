// biome-ignore-all lint/style/noNonNullAssertion: env

import { SpotifyAPI } from "@statsfm/spotify.js";
import { NextResponse } from "next/server";
import { env } from "@/env";
import type { ApiError } from "@/types/api";

const spotify = new SpotifyAPI({
  clientCredentials: {
    clientId: env.SPOTIFY_CLIENT_ID!,
    clientSecret: env.SPOTIFY_CLIENT_SECRET!,
  },
  refreshToken: env.SPOTIFY_REFRESH_TOKEN!,
});

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  // await the params promise first
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing artist id" }, { status: 400 });
  }

  try {
    const artist = await spotify.artists.get(id);
    return NextResponse.json(artist);
  } catch (err: unknown) {
    const error = err as ApiError;
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 },
    );
  }
}
