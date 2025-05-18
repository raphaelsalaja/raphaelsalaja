// hooks/api/steam/use-steam-recently-played.ts
import { useQuery } from "@tanstack/react-query";
import { IOwnedGame } from "@/types/steam/IOwnedGame";

export function useSteamRecentlyPlayed() {
  return useQuery<IOwnedGame | null, Error>({
    queryKey: ["steam", "recently-played"],
    queryFn: async () => {
      const res = await fetch("/api/steam/recently-played");
      if (!res.ok) {
        if (res.status === 204) return null;
        throw new Error(`Steam API returned ${res.status}`);
      }
      return res.json();
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
