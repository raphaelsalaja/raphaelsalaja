"use client";

import type {
  CursorPagingObject,
  PlayerState,
  RecentlyPlayed,
} from "@statsfm/spotify.js";
import { useQueries } from "@tanstack/react-query";
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

interface ActivityStatus {
  spotify: {
    playbackState: PlayerState | undefined;
    recentlyPlayed: CursorPagingObject<RecentlyPlayed> | undefined;
    isLoading: boolean;
  };
  steam: {
    data: IRecentlyPlayedResponse | null | undefined;
    isLoading: boolean;
  };
  isAnyLoading: boolean;
}

async function fetchSpotifyPlaybackState(): Promise<PlayerState> {
  const res = await fetch("/api/spotify/playback-state");
  if (!res.ok) throw new Error("Spotify playback state fetch failed");
  return res.json();
}

async function fetchSpotifyRecentlyPlayed(): Promise<
  CursorPagingObject<RecentlyPlayed>
> {
  const res = await fetch("/api/spotify/recently-played");
  if (!res.ok) throw new Error("Spotify recently-played fetch failed");
  return res.json();
}

async function fetchSteamRecentlyPlayed(): Promise<IRecentlyPlayedResponse | null> {
  const res = await fetch("/api/steam/recently-played");
  if (!res.ok) throw new Error(`Steam fetch failed: ${res.status}`);
  return res.json();
}

export function useActivityStatus(): ActivityStatus {
  const results = useQueries({
    queries: [
      {
        queryKey: ["spotify", "playback-state"],
        queryFn: fetchSpotifyPlaybackState,
        staleTime: Infinity, // Never consider stale - fetch once only
        gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
        refetchInterval: false, // Disable automatic refetching
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 3,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      {
        queryKey: ["spotify", "recently-played"],
        queryFn: fetchSpotifyRecentlyPlayed,
        staleTime: Infinity, // Never consider stale - fetch once only
        gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
        refetchInterval: false, // Disable automatic refetching
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 3,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      {
        queryKey: ["steam", "recently-played"],
        queryFn: fetchSteamRecentlyPlayed,
        staleTime: Infinity, // Never consider stale - fetch once only
        gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
        refetchInterval: false, // Disable automatic refetching
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 3,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    ],
  });

  const [spotifyPlayback, spotifyRecent, steamData] = results;

  const spotifyLoading = spotifyPlayback.isLoading || spotifyRecent.isLoading;
  const steamLoading = steamData.isLoading;
  const isAnyLoading = spotifyLoading || steamLoading;

  return {
    spotify: {
      playbackState: spotifyPlayback.data,
      recentlyPlayed: spotifyRecent.data,
      isLoading: spotifyLoading,
    },
    steam: {
      data: steamData.data,
      isLoading: steamLoading,
    },
    isAnyLoading,
  };
}
