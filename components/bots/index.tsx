import "@/styles/mdx.css";

import Link from "next/link";
import { Section } from "@/components/section";
import { areaSlug, botSlug, bots, botsByArea } from "@/data/bots";
import { BotCard } from "./card";
import { BotMark } from "./mark";
import styles from "./styles.module.css";

export function BotsPreview() {
  return (
    <Section id="bots" link={{ href: "/bots", label: "All Bots" }} title="Bots">
      <ul className={styles.faces}>
        {bots.map((bot) => (
          <li key={bot.title}>
            <Link className={styles.face} href={`/bots#${botSlug(bot.title)}`}>
              <BotMark color={bot.color} shape={bot.shape} title={bot.title} />
              <span className={styles.faceTitle}>{bot.title}</span>
              <span className={styles.faceHint}>{bot.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Bots() {
  return (
    <article className="prose">
      <header data-reveal>
        <h1>Bots</h1>
      </header>
      <p data-reveal>
        A team of Grok Bots, each with one job. Copy any of them.
      </p>
      <div className={styles.groups}>
        {botsByArea.map((group) => {
          const id = areaSlug(group.area);

          return (
            <section
              aria-labelledby={`${id}-heading`}
              className={styles.group}
              key={group.area}
            >
              <h2 className={styles.area} id={`${id}-heading`}>
                {group.area}
              </h2>
              <div className={styles.grid}>
                {group.bots.map((bot) => (
                  <BotCard bot={bot} key={bot.title} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
