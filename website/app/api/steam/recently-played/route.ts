// biome-ignore-all lint/style/noNonNullAssertion: env

import { NextRequest, NextResponse } from "next/server";
import SteamAPI from "steamapi";
import { GetAppReviewsResponse } from "@/types/steam/appreviews";

export const runtime = "nodejs";

export const revalidate = 60;

const steam = new SteamAPI(process.env.STEAM_API_KEY!);

export async function GET(request: NextRequest) {
  const steamId = process.env.STEAM_STEAM_ID;

  if (!steamId) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  let game = null;
  try {
    const recentGames = await steam.getUserRecentGames(steamId, 0);
    const ownedGames = await steam.getUserOwnedGames(steamId);
    ownedGames.sort((a, b) => {
      const aLastPlayed = a.lastPlayedTimestamp || 0;
      const bLastPlayed = b.lastPlayedTimestamp || 0;
      return bLastPlayed - aLastPlayed;
    });
    const lastPlayedGameId = ownedGames[0]?.game.id;
    const recent = recentGames.find(
      (game) => game.game.id === lastPlayedGameId
    );
    game = recent ?? null;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
  if (!game) {
    return NextResponse.json(null, { status: 204 });
  }

  let details = null;
  try {
    details = await steam.getGameDetails(game.game.id);
  } catch (err: any) {}

  let reviews: GetAppReviewsResponse | null = null;
  try {
    const url = new URL(
      `https://store.steampowered.com/appreviews/${game.game.id}`
    );
    url.searchParams.set("json", "1");
    url.searchParams.set("filter", "all");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Steam appreviews ${res.status}`);
    const data = await res.json();
    reviews = data;
  } catch (err) {
    console.error(
      `Failed to fetch review counts for appid=${game.game.id}`,
      err
    );
  }

  return NextResponse.json({ game, details, reviews }, { status: 200 });
}
