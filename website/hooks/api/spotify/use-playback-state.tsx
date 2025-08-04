"use client";

import type { PlayerState } from "@statsfm/spotify.js";
import { useQuery } from "@tanstack/react-query";

async function fetchPlaybackState(): Promise<PlayerState> {
  const res = await fetch("/api/spotify/playback-state");
  if (!res.ok) throw new Error("Spotify recently-played fetch failed");
  return res.json();
}

export function useSpotifyPlaybackState() {
  return useQuery<PlayerState>({
    queryKey: ["spotify", "playback-state"],
    queryFn: fetchPlaybackState,
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
