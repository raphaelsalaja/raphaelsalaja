"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchArtist(id: string) {
  const res = await fetch(`/api/spotify/get-artist/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useSpotifyArtist(id: string) {
  return useQuery({
    queryKey: ["spotify", "artist", id],
    queryFn: () => fetchArtist(id),
    staleTime: 60_000,
    enabled: Boolean(id),
  });
}
