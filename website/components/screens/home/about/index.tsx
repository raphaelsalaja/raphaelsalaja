"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { BlurImage } from "@/components/blur-image";
import { useActivityStatus } from "@/hooks/api/use-activity-status";
import styles from "./styles.module.css";

function useAnimatedSkeletonText(
  isLoading: boolean,
  value: string | undefined,
  width: number | string,
  image?: string,
  type: "spotify" | "steam" = "spotify",
): React.ReactNode {
  const animation = {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  };

  return (
    <span
      key={value}
      {...animation}
      className={clsx(styles.content, styles.text)}
      data-with-image={!!image}
      data-type={type}
    >
      <AnimatePresence mode="wait">
        {image && (
          <motion.span {...animation} className={styles.image}>
            <BlurImage src={image} className={styles.media} />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isLoading && !value ? (
          <motion.span {...animation} key={value} layout>
            Something
          </motion.span>
        ) : (
          <motion.span {...animation} key={value} layout>
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function About() {
  const { spotify, steam } = useActivityStatus();

  const currentTrack = spotify.playbackState?.is_playing
    ? spotify.playbackState.item
    : spotify.recentlyPlayed?.items?.[0]?.track;

  const albumImageUrl = currentTrack?.album?.images?.[0]?.url;
  const gameImageUrl = steam.data?.details?.headerImage;

  const trackTitle = useAnimatedSkeletonText(
    spotify.isLoading,
    currentTrack?.name,
    72,
    albumImageUrl,
  );
  const artistName = useAnimatedSkeletonText(
    spotify.isLoading,
    currentTrack?.artists?.[0]?.name,
    64,
  );
  const albumName = useAnimatedSkeletonText(
    spotify.isLoading,
    currentTrack?.album?.name,
    128,
  );
  const gameName = useAnimatedSkeletonText(
    steam.isLoading,
    steam.data?.details?.name,
    128,
    gameImageUrl,
    "steam",
  );
  const gameDeveloper = useAnimatedSkeletonText(
    steam.isLoading,
    steam.data?.details?.developers?.[0],
    72,
    undefined,
    "steam",
  );

  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Raphael Salaja — Engineering Feelings</h1>
      <p>
        I&apos;m someone who loves mixing different influences, genres and
        styles to create unique work. I enjoy pushing boundaries and exploring
        new ways to express myself without limitations.
      </p>
      <p>
        Currently, I’m listening to {trackTitle} by {artistName} from the album{" "}
        {albumName}. I’m also playing {gameName} by {gameDeveloper}.
      </p>
    </div>
  );
}
