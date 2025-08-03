"use client";

import { motion } from "motion/react";
import { TimeMachine, type TimeMachineFrame } from "@/components/time-machine";
import styles from "./styles.module.css";

const TWITTER_CLIPS = [
  {
    user: {
      name: "JohnPhamous",
      handle: "@JohnPhamous",
      avatar:
        "https://pbs.twimg.com/profile_images/1689659361726263298/wBOYRobp_400x400.png",
    },
    video: "/media/tweets/john-phamous.mp4",
  },
  {
    user: {
      name: "Antimetal",
      handle: "@antimetal",
      avatar:
        "https://pbs.twimg.com/profile_images/1933164122058743808/n9Dlkr88_400x400.jpg",
    },
    video: "/media/tweets/antimetal.mp4",
  },
  {
    user: {
      name: "Gustav Ekerot",
      handle: "@designgurra",
      avatar:
        "https://pbs.twimg.com/profile_images/1897964636441358336/Pc6OPmvP_400x400.jpg",
    },
    video: "/media/tweets/gustav-ekerot.mp4",
  },
  {
    user: {
      name: "Abhijeet Singh",
      handle: "@abjt14",
      avatar:
        "https://pbs.twimg.com/profile_images/1495909945887186948/-QYeJ-YY_400x400.jpg",
    },
    video: "/media/tweets/abhijeet-singh.mp4",
  },
  {
    user: {
      name: "Mint",
      handle: "@smintfy",
      avatar:
        "https://pbs.twimg.com/profile_images/1928266972330086404/lrqNJSR-_400x400.jpg",
    },
    video: "/media/tweets/smintfy.mp4",
  },
  {
    user: {
      name: "Xavier (Jack)",
      handle: "@KMkota0",
      avatar:
        "https://pbs.twimg.com/profile_images/773427888360161280/TgO3ynCO_400x400.jpg",
    },
    video: "/media/tweets/xavier.mp4",
  },
];

export function Appeal() {
  const frames: TimeMachineFrame[] = TWITTER_CLIPS.map((clip, index) => ({
    id: `frame-${index + 1}`,
    content: <TwitterFrame user={clip.user} video={clip.video} />,
  }));

  return (
    <div className={styles.container}>
      <TimeMachine
        frames={frames}
        config={{
          wheelThreshold: 750,
          frameSpacing: 24,
          maxVisibleFrames: 3,
        }}
        showControls={false}
      />
    </div>
  );
}

interface TwitterFrameProps {
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  video: string;
}

const TwitterFrame = ({
  user = {
    name: "JohnPhamous",
    handle: "@JohnPhamous",
    avatar:
      "https://pbs.twimg.com/profile_images/1689659361726263298/wBOYRobp_400x400.png",
  },
  video = "https://cdn.rauno.me/ixd/iphone-dynamic-island-physics-c.mp4#t=0.01",
}: TwitterFrameProps) => {
  return (
    <div className={styles.post}>
      <video
        className={styles.video}
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={48}
          height={48}
        />
        <span className={styles.name}>{user.name}</span>
        <span className={styles.handle}>{user.handle}</span>
      </div>
    </div>
  );
};
