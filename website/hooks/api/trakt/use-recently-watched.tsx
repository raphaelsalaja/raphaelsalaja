import { useQuery } from "@tanstack/react-query";
import { TraktHistoryEntry } from "@/types/trakt";

async function fetchRecentlyWatched(): Promise<TraktHistoryEntry> {
  const res = await fetch("/api/trakt/recently-watched");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useTraktRecentlyWatched() {
  return useQuery<TraktHistoryEntry, Error>({
    queryKey: ["trakt", "recently-watched"],
    queryFn: fetchRecentlyWatched,
    staleTime: 60_000,
  });
}
