"use client";

import { CursorPagingObject, RecentlyPlayed } from "@statsfm/spotify.js";
import { useQuery } from "@tanstack/react-query";

async function fetchRecentlyPlayed(): Promise<CursorPagingObject<RecentlyPlayed>> {
  const res = await fetch("/api/spotify/recently-played");
  if (!res.ok) throw new Error("Spotify recently-played fetch failed");
  return res.json();
}

export function useSpotifyRecentlyPlayed() {
  return useQuery<CursorPagingObject<RecentlyPlayed>>({
    queryKey: ["spotify", "recently-played"],
    queryFn: fetchRecentlyPlayed,
    staleTime: 60_000,
  });
}
