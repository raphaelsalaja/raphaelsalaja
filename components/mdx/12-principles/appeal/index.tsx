"use client";

import Image from "next/image";
import { TimeMachine, type TimeMachineFrame } from "@/components/time-machine";
import { Video } from "@/components/video";
import { TWITTER_CLIPS } from "./clips";
import styles from "./styles.module.css";

export function Appeal() {
  const frames: TimeMachineFrame[] = TWITTER_CLIPS.map((clip, index) => ({
    id: `frame-${index + 1}`,
    content: <TwitterFrame {...clip} />,
  }));

  return (
    <TimeMachine
      showControls={false}
      frames={frames}
      className={styles.container}
    />
  );
}

type TwitterFrameProps = (typeof TWITTER_CLIPS)[number];

const TwitterFrame = ({ ...props }: TwitterFrameProps) => {
  return (
    <div className={styles.post}>
      <Video src={props.video} className={styles.video} />
      <a
        className={styles.header}
        href={props.link}
        target="_blank"
        rel="noopener"
      >
        <Image
          className={styles.avatar}
          src={props.user.avatar}
          alt={`${props.user.name}'s avatar`}
          width={48}
          height={48}
        />
        <span className={styles.name}>{props.user.name}</span>
        <span className={styles.handle}>{props.user.handle}</span>
      </a>
    </div>
  );
};
