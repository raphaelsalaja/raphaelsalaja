"use client";

import type { CursorPagingObject, RecentlyPlayed } from "@statsfm/spotify.js";
import { useQuery } from "@tanstack/react-query";

async function fetchRecentlyPlayed(): Promise<
  CursorPagingObject<RecentlyPlayed>
> {
  const res = await fetch("/api/spotify/recently-played");
  if (!res.ok) throw new Error("Spotify recently-played fetch failed");
  return res.json();
}

export function useSpotifyRecentlyPlayed() {
  return useQuery<CursorPagingObject<RecentlyPlayed>>({
    queryKey: ["spotify", "recently-played"],
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
