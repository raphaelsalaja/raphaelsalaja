"use client";

import clsx from "clsx";
import Image from "next/image";
import type React from "react";
import Skeleton from "react-loading-skeleton";
import { useSteamGetRecentlyPlayed } from "@/hooks/api/steam/use-recently-played";
import { ConditionalWrap } from "@/lib/conditional-wrap";
import styles from "./styles.module.scss";

const placeholder = "/media/placeholder.png";

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (_props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <title>Steam Logo</title>
      <g clipPath="url(#clip0_703_142)">
        <path
          d="M0.666469 15.3976C2.12641 20.2656 6.64173 23.8153 11.9849 23.8153C18.5103 23.8153 23.8003 18.5254 23.8003 12C23.8003 5.47454 18.5103 0.18457 11.9849 0.18457C5.72345 0.18457 0.599638 5.05583 0.194962 11.215C0.960746 12.4988 1.25798 13.293 0.665731 15.3976H0.666469Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M11.3761 9.04067L11.3772 9.09901L8.48611 13.299C8.01792 13.2776 7.54826 13.3599 7.10223 13.5434C6.90807 13.6223 6.72269 13.7213 6.54912 13.8388L0.2002 11.2221C0.2002 11.2221 0.0532461 13.6391 0.665431 15.4402L5.1538 17.2922C5.37534 18.2995 6.06949 19.1827 7.08931 19.6073C7.89163 19.9407 8.79346 19.942 9.59673 19.6109C10.4 19.2799 11.039 18.6435 11.3735 17.8417C11.5519 17.4145 11.638 16.9545 11.626 16.4917L15.7588 13.5361L15.8604 13.5379C18.3361 13.5379 20.3484 11.5197 20.3484 9.04067C20.3484 6.56165 18.3398 4.55082 15.8604 4.54565C13.3858 4.54565 11.3724 6.56165 11.3724 9.04067H11.3761ZM10.6819 17.5514C10.1451 18.8437 8.66371 19.4519 7.3762 18.9154C6.80486 18.6753 6.34175 18.2334 6.07503 17.674L7.53608 18.2796C7.76178 18.3735 8.00378 18.4221 8.24826 18.4225C8.49273 18.4228 8.73489 18.3751 8.96089 18.2818C9.18689 18.1886 9.3923 18.0517 9.5654 17.8791C9.73849 17.7064 9.87586 17.5014 9.96968 17.2756C10.1596 16.8195 10.1608 16.3065 9.9728 15.8495C9.78484 15.3925 9.42316 15.0288 8.96722 14.8383L7.45337 14.2125C8.03602 13.9909 8.69842 13.9836 9.31798 14.2409C9.94568 14.5005 10.4257 14.9893 10.6827 15.6145C10.9396 16.2396 10.9382 16.9289 10.679 17.5514M15.8644 12.037C15.0711 12.0348 14.311 11.7184 13.7506 11.1569C13.1902 10.5954 12.8751 9.83471 12.8744 9.04141C12.8753 8.24823 13.1904 7.48772 13.7509 6.92641C14.3113 6.36509 15.0713 6.04873 15.8644 6.04658C16.6577 6.04853 17.4179 6.36481 17.9785 6.92615C18.5391 7.48748 18.8543 8.2481 18.8552 9.04141C18.8545 9.83484 18.5394 10.5957 17.9788 11.1571C17.4182 11.7186 16.6579 12.035 15.8644 12.037ZM13.624 9.03661C13.6235 8.44056 13.8596 7.8687 14.2806 7.44671C14.7016 7.02472 15.2728 6.78713 15.8689 6.78615C17.1076 6.78615 18.1153 7.79415 18.1153 9.03661C18.1156 9.63279 17.8791 10.2047 17.4578 10.6266C17.0366 11.0484 16.4651 11.2857 15.8689 11.2863C15.2729 11.2855 14.7016 11.048 14.2806 10.6262C13.8596 10.2043 13.6237 9.6326 13.624 9.03661Z"
          fill="white"
          fillOpacity="0.6"
        />
      </g>
      <defs>
        <clipPath id="clip0_703_142">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Steam: React.FC = () => {
  const { data } = useSteamGetRecentlyPlayed();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "standard",
      compactDisplay: "short",
    }).format(num);
  };

  const game = data?.game;
  const details = data?.details;
  const reviews = data?.reviews;

  const achievements = {
    total: data?.achievements.length,
    unlocked: data?.achievements?.filter((a) => a.unlocked).length || 0,
  };

  const playtime = game?.minutes;

  const name = details?.name;
  const developer = details?.developers[0];
  const background = details?.backgroundRaw || placeholder;
  const header = details?.headerImage || placeholder;
  const genres = details?.genres || [];
  const recent_reviews = formatNumber(
    reviews?.query_summary.total_reviews || 0,
  );
  const review_score_desc =
    reviews?.query_summary.review_score_desc.replace(
      "Overwhelmingly Positive",
      "Super Positive",
    ) || "No Reviews";

  const isLoading = !game || !details || !reviews || !achievements;

  return (
    <div className={styles.steam}>
      <div className={styles.trailing}>
        <div className={styles.details}>
          <div className={clsx(styles.text, styles.caps)}>Recent Reviews</div>
          <ConditionalWrap
            condition={isLoading}
            wrap={() => (
              <Skeleton className={styles.skeleton} width={104} height={14} />
            )}
          >
            <div
              className={clsx(styles.text, styles.secondary)}
            >{`${review_score_desc} (${recent_reviews})`}</div>
          </ConditionalWrap>
        </div>
        <div className={styles.details}>
          <div className={clsx(styles.text, styles.caps)}>Play Time</div>
          <ConditionalWrap
            condition={isLoading}
            wrap={() => (
              <Skeleton className={styles.skeleton} width={80} height={14} />
            )}
          >
            <div className={clsx(styles.text, styles.secondary)}>
              {playtime
                ? `${Math.round((playtime / 60) * 10) / 10} ${Math.round((playtime / 60) * 10) / 10 === 1 ? "hour" : "hours"}`
                : "0 hours"}
            </div>
          </ConditionalWrap>
        </div>
        <div className={styles.details}>
          <div className={clsx(styles.text, styles.caps)}>Achivements</div>
          <ConditionalWrap
            condition={isLoading}
            wrap={() => (
              <Skeleton className={styles.skeleton} width={128} height={14} />
            )}
          >
            <div className={clsx(styles.text, styles.secondary)}>
              {achievements?.unlocked} / {achievements?.total}
            </div>
          </ConditionalWrap>
        </div>
      </div>

      <ConditionalWrap
        condition={isLoading}
        wrap={() => (
          <div className={styles.center}>
            <div className={styles.header}>
              <Skeleton
                className={styles.skeleton}
                height={"100%"}
                style={{ position: "absolute" }}
              />
            </div>
            <div className={styles.details}>
              <Skeleton className={styles.skeleton} width={104} height={14} />
              <Skeleton className={styles.skeleton} width={80} height={14} />
            </div>
          </div>
        )}
      >
        <div className={styles.center}>
          <div className={styles.header}>
            <Image
              src={header}
              width={300}
              height={300}
              alt="Spotify Album Art"
              unoptimized
              className={styles.art}
            />
          </div>
          <div className={styles.details}>
            <div className={styles.text}>{name}</div>
            <div className={clsx(styles.text, styles.secondary)}>
              {developer}
            </div>
          </div>
        </div>
      </ConditionalWrap>

      <div className={styles.leading}>
        <Logo />
        <ConditionalWrap
          condition={isLoading}
          wrap={() => (
            <div className={styles.genres}>
              <Skeleton
                className={styles.skeleton}
                borderRadius={4}
                width={56}
                height={16}
              />
              <Skeleton
                className={styles.skeleton}
                borderRadius={4}
                width={80}
                height={16}
              />
              <Skeleton
                className={styles.skeleton}
                borderRadius={4}
                width={72}
                height={16}
              />
            </div>
          )}
        >
          <div className={styles.genres}>
            {genres.slice(0, 3).map((genre) => (
              <div
                key={genre.description}
                className={clsx(styles.genre, styles.text, styles.caps)}
              >
                {genre.description}
              </div>
            ))}
          </div>
        </ConditionalWrap>
      </div>

      <div className={styles.background}>
        <ConditionalWrap
          condition={isLoading}
          wrap={() => <div className={styles.background} />}
        >
          <Image
            src={background}
            width={300}
            height={300}
            alt="Game Background Art"
            unoptimized
            className={styles.art}
          />
        </ConditionalWrap>
      </div>
    </div>
  );
};
