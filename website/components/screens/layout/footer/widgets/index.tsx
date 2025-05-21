"use client";

import Image from "next/image";
import { useSpotifyPlaybackState } from "@/hooks/api/spotify/use-playback-state";
import { useSpotifyRecentlyPlayed } from "@/hooks/api/spotify/use-recently-played";
import { useSteamRecentlyPlayed } from "@/hooks/api/steam/use-recently-played";
import { useTraktRecentlyWatched } from "@/hooks/api/trakt/use-recently-watched";
import { Widget } from "./shell";
import styles from "./styles.module.scss";

export const Widgets: React.FC = () => (
  <div className={styles.footer}>
    <SpotifyWidget />
    <SteamWidget />
    <TraktWidget />
  </div>
);

export const SpotifyWidget: React.FC = () => {
  const { data: recent, isLoading: spotifyLoading } = useSpotifyRecentlyPlayed();
  const { data: playbackState, isLoading: stateLoading } = useSpotifyPlaybackState();

  const isLoading = spotifyLoading || stateLoading;

  const isPlaying = playbackState?.is_playing;
  const playingTrack = playbackState?.item;
  const recentTrack = recent?.items?.[0]?.track;
  const track = isPlaying && playingTrack ? playingTrack : recentTrack;

  const art = track?.album?.images?.[0]?.url ?? "./placeholder.png";
  const primaryText = track?.name ?? "No track currently playing";
  const secondaryText = track?.artists?.[0]?.name ?? "Unknown Artist";

  return (
    <Widget
      art={art}
      primaryText={primaryText ?? ""}
      secondaryText={secondaryText}
      background="linear-gradient(180deg, var(--spotify-7) 0%, var(--spotify-9) 100%)"
      aspectRatio="1 / 1"
      isLoading={isLoading}
    />
  );
};

export const SteamWidget: React.FC = () => {
  const { data: game, isLoading, isError } = useSteamRecentlyPlayed();

  return (
    <Widget
      isLoading={isLoading}
      art={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game?.appid}/library_600x900.jpg`}
      primaryText={game?.name ?? "Unknown Game"}
      secondaryText={game?.app?.developers?.join(", ") ?? "Unknown Developer"}
      background="linear-gradient(180deg, #2a475e 0%, #1b2838 100%)"
      aspectRatio="6 / 9"
      customBackground={
        <div className={styles.steam}>
          <div className={styles.mask} />
          <Image
            width={600}
            height={900}
            unoptimized
            src={game?.app?.background_raw || game?.app?.background || "/placeholder.png"}
            alt="Steam Background"
            className={styles.art}
          />
        </div>
      }
    />
  );
};

export const TraktWidget: React.FC = () => {
  const { data: entry, isLoading, isError } = useTraktRecentlyWatched();

  const rawPoster = entry?.images.poster?.[0];

  const posterUrl = rawPoster?.startsWith("http") ? rawPoster : `https://${rawPoster}`;

  const primaryText = entry?.type === "movie" ? entry.title : entry?.showTitle;

  const secondaryText = entry?.type === "episode" ? `${entry.episodeTitle} S${entry.season}:E${entry.episode}` : "";

  return (
    <Widget
      isLoading={isLoading}
      art={posterUrl}
      primaryText={primaryText ?? "Nothing recently watched"}
      secondaryText={secondaryText}
      background="linear-gradient(180deg, #991eeb 0%, #5822b4 100%)"
      aspectRatio="3 / 4.5"
    />
  );
};
