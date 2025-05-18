// biome-ignore-all lint/style/noNonNullAssertion: env

import { NextResponse } from "next/server";
import { TraktClient } from "@/lib/trakt/";

const client = new TraktClient({
  clientId: process.env.TRAKT_CLIENT_ID!,
  userSlug: process.env.TRAKT_USER_SLUG!,
});

export async function GET() {
  try {
    const entry = await client.getLastWatchedEntry();
    return entry ? NextResponse.json(entry) : NextResponse.json(null, { status: 204 });
  } catch (e: any) {
    console.error("Trakt error:", e);
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}
