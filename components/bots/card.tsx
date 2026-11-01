"use client";

import { useEffect, useRef } from "react";
import { Video } from "@/components/video";
import { type Bot, botSlug } from "@/data/bots";
import { BotMark } from "./mark";
import styles from "./styles.module.css";

export function BotCard({ bot }: { bot: Bot }) {
  const details = useRef<HTMLDetailsElement>(null);
  const slug = botSlug(bot.title);

  useEffect(() => {
    if (window.location.hash === `#${slug}`) {
      details.current?.setAttribute("open", "");
    }
  }, [slug]);

  return (
    <article
      className={styles.tile}
      data-avatar
      data-color={bot.color}
      id={slug}
    >
      <details className={styles.details} ref={details}>
        <summary className={styles.summary}>
          <span className={styles.wash}>
            <BotMark color={bot.color} shape={bot.shape} />
          </span>
          <span className={styles.heading}>
            <h3 className={styles.title}>{bot.title}</h3>
            <p className={styles.description}>{bot.description}</p>
          </span>
        </summary>
        <div className={styles.more}>
          {bot.video ? (
            <Video
              aria-label={`${bot.title} preview`}
              className={styles.video}
              src={bot.video}
            />
          ) : null}
          <ul className={styles.list}>
            {bot.does.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {bot.routines.length > 0 ? (
            <div className={styles.block}>
              <h4 className={styles.label}>Routines</h4>
              <ul className={styles.list}>
                {bot.routines.map((routine) => (
                  <li key={routine}>{routine}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {bot.tools.length > 0 ? (
            <ul aria-label="Tools" className={styles.tools}>
              {bot.tools.map((tool) => (
                <li className={styles.tool} key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </details>
      {bot.shareUrl ? (
        <a
          className={styles.copy}
          data-avatar-action
          href={bot.shareUrl}
          rel="noopener"
          target="_blank"
        >
          Copy This Bot
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </article>
  );
}
