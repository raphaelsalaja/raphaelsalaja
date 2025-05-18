// app/api/steam/recently-played/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { IOwnedGame } from "@/types/steam/IOwnedGame";

export const revalidate = 60; // cache for 60s

export async function GET(request: NextRequest) {
  const key = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_STEAM_ID;

  if (!key || !steamId) {
    console.error("Missing STEAM_API_KEY or STEAM_STEAM_ID");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // 1) get the most‐recently played
  const recentUrl = new URL("https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/");
  recentUrl.searchParams.set("key", key);
  recentUrl.searchParams.set("steamid", steamId);
  recentUrl.searchParams.set("count", "1");
  recentUrl.searchParams.set("format", "json");

  let latestGame: any;
  try {
    const res = await fetch(recentUrl);
    if (!res.ok) throw new Error(`Steam API ${res.status}`);
    const json = await res.json();
    latestGame = json.response?.games?.[0] ?? null;
  } catch (err: any) {
    console.error("Error fetching recently-played:", err);
    return NextResponse.json({ error: err.message }, { status: 502 });
  }

  if (!latestGame) {
    // no recent play
    return NextResponse.json(null, { status: 204 });
  }

  // 2) fetch full app details
  let appDetails: IOwnedGame["app"] | null = null;
  try {
    const storeRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${latestGame.appid}&l=en`);
    if (!storeRes.ok) throw new Error(`Store API ${storeRes.status}`);
    const storeJson: Record<string, { success: boolean; data: IOwnedGame["app"] }> = await storeRes.json();
    const entry = storeJson[String(latestGame.appid)];
    if (entry.success) appDetails = entry.data;
  } catch (err: any) {
    console.error(`Failed to fetch details for appid=${latestGame.appid}`, err);
    // continue with minimal info
  }

  const payload: IOwnedGame = {
    ...latestGame,
    app: appDetails,
  };

  return NextResponse.json(payload);
}
