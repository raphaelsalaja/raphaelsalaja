import { NextRequest, NextResponse } from "next/server";
import SteamAPI, { GameDetails, GameInfoBasic, UserPlaytime } from "steamapi";
import type { GetAppReviewsResponse } from "@/types/steam/appreviews";

export const runtime = "nodejs";

/**
 * Fail fast on missing environment variables
 */
const API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_STEAM_ID;

if (!API_KEY || !STEAM_ID) {
  throw new Error("Missing STEAM_API_KEY or STEAM_STEAM_ID in environment");
}

const steam = new SteamAPI(API_KEY);

/**
 * Returns the most recently played game, or null if none
 */
async function getMostRecentGame(
  steamId: string
): Promise<UserPlaytime<GameInfoBasic> | null> {
  const [recentGames, ownedGames] = await Promise.all([
    steam.getUserRecentGames(steamId, 0),
    steam.getUserOwnedGames(steamId),
  ]);

  ownedGames.sort(
    (a, b) => (b.lastPlayedTimestamp ?? 0) - (a.lastPlayedTimestamp ?? 0)
  );

  const lastPlayedId = ownedGames[0]?.game.id;
  return recentGames.find((g) => g.game.id === lastPlayedId) ?? null;
}

/**
 * Fetches all reviews for the given app ID
 */
async function fetchReviews(appId: number): Promise<GetAppReviewsResponse> {
  const url = new URL(`https://store.steampowered.com/appreviews/${appId}`);
  url.searchParams.set("json", "1");
  url.searchParams.set("filter", "all");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status}`);
  }

  return response.json();
}

/**
 * GET handler: returns the most recently played game,
 * its details, and all reviews.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const game = await getMostRecentGame(STEAM_ID as string);

    if (!game) {
      return NextResponse.json(null, { status: 204 });
    }

    const appId = game.game.id;
    let details: GameDetails | null = null;
    let reviews: GetAppReviewsResponse | null = null;

    await Promise.allSettled([
      steam.getGameDetails(appId).then((d) => {
        details = d;
      }),
      fetchReviews(appId).then((r) => {
        reviews = r;
      }),
    ]);

    return NextResponse.json({ game, details, reviews }, { status: 200 });
  } catch (error: any) {
    const status = error.message.startsWith("Failed to fetch") ? 502 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
