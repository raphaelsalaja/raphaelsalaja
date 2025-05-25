// biome-ignore-all lint/style/noNonNullAssertion: env

import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.TRAKT_USER_SLUG;
  const apiKey = process.env.TRAKT_CLIENT_ID;

  const url = new URL(`https://api.trakt.tv/users/${username}/history`);
  url.searchParams.set("limit", "1");
  url.searchParams.set("extended", "full,images");

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": apiKey!,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: `Trakt returned ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data[0]?.show ?? null);
}
