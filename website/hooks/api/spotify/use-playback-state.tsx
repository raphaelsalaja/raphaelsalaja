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
    staleTime: 60_000,
  });
}
