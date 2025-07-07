import { type NextRequest, NextResponse } from "next/server";
import SteamAPI, { type GameDetails, type GameInfoBasic, type UserPlaytime } from "steamapi";
import type { GetAppReviewsResponse } from "@/types/steam/appreviews";

const API_KEY = process.env.STEAM_API_KEY;

const STEAM_ID = process.env.STEAM_STEAM_ID;

if (!API_KEY || !STEAM_ID) {
  throw new Error("Missing STEAM_API_KEY or STEAM_STEAM_ID in environment");
}

const steam = new SteamAPI(API_KEY);

async function getMostRecentGame(steamId: string): Promise<UserPlaytime<GameInfoBasic> | null> {
  try {
    const [recentGames, _ownedGames] = await Promise.all([steam.getUserRecentGames(steamId, 10), steam.getUserOwnedGames(steamId)]);

    if (recentGames.length > 0) {
      recentGames.sort((a, b) => (b.lastPlayedTimestamp ?? 0) - (a.lastPlayedTimestamp ?? 0));
      const mostRecent = recentGames[0];

      return mostRecent;
    }

    return null;
  } catch (error) {
    console.error("Error in getMostRecentGame:", error);
    throw error;
  }
}

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

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const game = await getMostRecentGame(STEAM_ID as string);

    if (!game) {
      try {
        const ownedGames = await steam.getUserOwnedGames(STEAM_ID as string);
        if (ownedGames.length > 0) {
          ownedGames.sort((a, b) => (b.lastPlayedTimestamp ?? 0) - (a.lastPlayedTimestamp ?? 0));
          const mostRecentOwned = ownedGames[0];

          const appId = mostRecentOwned.game.id;
          let details: GameDetails | null = null;
          let reviews: GetAppReviewsResponse | null = null;

          const results = await Promise.allSettled([
            steam.getGameDetails(appId).catch((error) => {
              console.error("Failed to fetch game details:", error.message);
              return null;
            }),
            fetchReviews(appId).catch((error) => {
              console.error("Failed to fetch reviews:", error.message);
              return null;
            }),
          ]);

          details = results[0].status === "fulfilled" ? results[0].value : null;
          reviews = results[1].status === "fulfilled" ? results[1].value : null;

          // Try to get achievements
          let achievements = null;
          try {
            const achievementData = await steam.getUserAchievements(STEAM_ID as string, appId);
            achievements = achievementData?.achievements || null;
          } catch (error: any) {
            console.error("Failed to fetch achievements:", error.message);
          }

          return NextResponse.json(
            {
              game: mostRecentOwned,
              details,
              reviews,
              achievements,
              note: "No recent games found, showing most recently played owned game",
            },
            { status: 200 },
          );
        }
      } catch (error) {
        console.error("Failed to fetch owned games:", error);
      }

      return new NextResponse(null, { status: 204 });
    }

    const appId = game.game.id;

    let details: GameDetails | null = null;
    let reviews: GetAppReviewsResponse | null = null;

    const results = await Promise.allSettled([
      steam.getGameDetails(appId).catch((error) => {
        console.error("Failed to fetch game details:", error.message);
        return null;
      }),
      fetchReviews(appId).catch((error) => {
        console.error("Failed to fetch reviews:", error.message);
        return null;
      }),
    ]);

    details = results[0].status === "fulfilled" ? results[0].value : null;
    reviews = results[1].status === "fulfilled" ? results[1].value : null;

    let achievements = null;
    try {
      const achievementData = await steam.getUserAchievements(STEAM_ID as string, appId);
      achievements = achievementData?.achievements || null;
    } catch (error: any) {
      console.error("Failed to fetch achievements:", error.message);
    }

    return NextResponse.json({ game, details, reviews, achievements }, { status: 200 });
  } catch (error: any) {
    const status = error.message.startsWith("Failed to fetch") ? 502 : 500;
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status },
    );
  }
}
