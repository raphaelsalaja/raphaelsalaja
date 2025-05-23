import { useQuery } from "@tanstack/react-query";
import { GameDetails, GameInfoBasic, UserPlaytime } from "steamapi";
import { GetAppReviewsResponse } from "@/types/steam/appreviews";

interface IRecentlyPlayedResponse {
  game: UserPlaytime<GameInfoBasic>;
  details: GameDetails | null;
  reviews: GetAppReviewsResponse;
}

async function fetchRecentlyPlayed(): Promise<IRecentlyPlayedResponse | null> {
  const res = await fetch("/api/steam/get/recently-played");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useSteamGetRecentlyPlayed() {
  return useQuery<IRecentlyPlayedResponse | null, Error>({
    queryKey: ["steam", "recently-played"],
    queryFn: fetchRecentlyPlayed,
    staleTime: 60_000,
  });
}
