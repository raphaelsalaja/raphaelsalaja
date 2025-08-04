import { useQuery } from "@tanstack/react-query";
import type {
  GameDetails,
  GameInfoBasic,
  UserAchievement,
  UserPlaytime,
} from "steamapi";
import type { GetAppReviewsResponse } from "@/types/steam/appreviews";

interface IRecentlyPlayedResponse {
  game: UserPlaytime<GameInfoBasic>;
  details: GameDetails | null;
  reviews: GetAppReviewsResponse;
  achievements: UserAchievement[];
}

async function fetchRecentlyPlayed(): Promise<IRecentlyPlayedResponse | null> {
  const res = await fetch("/api/steam/recently-played");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useSteamGetRecentlyPlayed() {
  return useQuery<IRecentlyPlayedResponse | null, Error>({
    queryKey: ["steam", "recently-played"],
    queryFn: fetchRecentlyPlayed,
    staleTime: Infinity, // Never consider stale - fetch once only
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    refetchInterval: false, // Disable automatic refetching
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
