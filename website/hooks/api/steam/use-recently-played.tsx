import { useQuery } from "@tanstack/react-query";
import { IOwnedGame } from "@/types/steam/IOwnedGame";

async function fetchRecentlyPlayed(): Promise<IOwnedGame | null> {
  const res = await fetch("/api/steam/recently-played");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useSteamRecentlyPlayed() {
  return useQuery<IOwnedGame | null, Error>({
    queryKey: ["steam", "recently-played"],
    queryFn: fetchRecentlyPlayed,
    staleTime: 60_000,
  });
}
