import { NextRequest, NextResponse } from "next/server";
import SteamAPI, { GameDetails, GameInfoBasic, UserPlaytime } from "steamapi";
import type { GetAppReviewsResponse } from "@/types/steam/appreviews";

const API_KEY = process.env.STEAM_API_KEY;

const STEAM_ID = process.env.STEAM_STEAM_ID;

if (!API_KEY || !STEAM_ID) {
  throw new Error("Missing STEAM_API_KEY or STEAM_STEAM_ID in environment");
}

const steam = new SteamAPI(API_KEY);

async function getMostRecentGame(
  steamId: string
): Promise<UserPlaytime<GameInfoBasic> | null> {
  try {
    const [recentGames, ownedGames] = await Promise.all([
      steam.getUserRecentGames(steamId, 10), // Get up to 10 recent games instead of 0
      steam.getUserOwnedGames(steamId),
    ]);

    console.log(
      `Found ${recentGames.length} recent games and ${ownedGames.length} owned games`
    );

    // If there are recent games, return the most recent one
    if (recentGames.length > 0) {
      recentGames.sort(
        (a, b) => (b.lastPlayedTimestamp ?? 0) - (a.lastPlayedTimestamp ?? 0)
      );
      const mostRecent = recentGames[0];
      console.log("Most recent from recent games:", mostRecent.game.name);
      return mostRecent;
    }

    // If no recent games but there are owned games, we'll return null for now
    // since we can't easily construct the required UserPlaytime type
    console.log(
      "No recent games found, but found",
      ownedGames.length,
      "owned games"
    );

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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log("Starting Steam API request...");

    const game = await getMostRecentGame(STEAM_ID as string);
    console.log("Most recent game:", game?.game?.name || "No game found");

    if (!game) {
      // Instead of returning empty, let's try to get some useful data
      try {
        const ownedGames = await steam.getUserOwnedGames(STEAM_ID as string);
        if (ownedGames.length > 0) {
          // Sort by last played timestamp and get the most recent
          ownedGames.sort(
            (a, b) =>
              (b.lastPlayedTimestamp ?? 0) - (a.lastPlayedTimestamp ?? 0)
          );
          const mostRecentOwned = ownedGames[0];

          console.log(
            "Falling back to most recent owned game:",
            mostRecentOwned.game.id
          );

          // Try to get details for this game
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
            const achievementData = await steam.getUserAchievements(
              STEAM_ID as string,
              appId
            );
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
            { status: 200 }
          );
        }
      } catch (error) {
        console.error("Failed to fetch owned games:", error);
      }

      return new NextResponse(null, { status: 204 });
    }

    const appId = game.game.id;
    console.log("App ID:", appId);

    let details: GameDetails | null = null;
    let reviews: GetAppReviewsResponse | null = null;

    // Handle game details and reviews with proper error handling
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

    // Handle achievements separately with try-catch since they might not exist for all games
    let achievements = null;
    try {
      const achievementData = await steam.getUserAchievements(
        STEAM_ID as string,
        appId
      );
      achievements = achievementData?.achievements || null;
      console.log("Achievements fetched:", achievements?.length || 0);
    } catch (error: any) {
      console.error("Failed to fetch achievements:", error.message);
      // Don't fail the entire request if achievements fail
    }

    console.log("Request completed successfully");
    return NextResponse.json(
      { game, details, reviews, achievements },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Steam API route error:", error);
    const status = error.message.startsWith("Failed to fetch") ? 502 : 500;
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status }
    );
  }
}
