// biome-ignore-all lint/style/noNonNullAssertion: env
export const runtime = "nodejs";

import SteamAPI from "steamapi";
import { NextRequest, NextResponse } from "next/server";
import { GetAppReviewsResponse } from "@/types/steam/appreviews";

export async function GET(request: NextRequest) {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_STEAM_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json(
      {
        error:
          "Server misconfiguration: missing STEAM_API_KEY or STEAM_STEAM_ID",
      },
      { status: 500 }
    );
  }

  const steam = new SteamAPI(apiKey);

  let game = null;
  try {
    const recentGames = await steam.getUserRecentGames(steamId, 0);
    const ownedGames = await steam.getUserOwnedGames(steamId);

    ownedGames.sort((a, b) => {
      const aLast = a.lastPlayedTimestamp ?? 0;
      const bLast = b.lastPlayedTimestamp ?? 0;
      return bLast - aLast;
    });

    const lastPlayedId = ownedGames[0]?.game.id;
    game = recentGames.find((g) => g.game.id === lastPlayedId) ?? null;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }

  if (!game) {
    return NextResponse.json(null, { status: 204 });
  }

  let details = null;
  try {
    details = await steam.getGameDetails(game.game.id);
  } catch {}

  let reviews: GetAppReviewsResponse | null = null;
  try {
    const url = new URL(
      `https://store.steampowered.com/appreviews/${game.game.id}`
    );
    url.searchParams.set("json", "1");
    url.searchParams.set("filter", "all");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Steam appreviews ${res.status}`);
    reviews = (await res.json()) as GetAppReviewsResponse;
  } catch (err) {
    console.error(
      `Failed to fetch review counts for appid=${game.game.id}`,
      err
    );
  }

  return NextResponse.json({ game, details, reviews }, { status: 200 });
}
