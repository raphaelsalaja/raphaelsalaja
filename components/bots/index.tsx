import "@/styles/mdx.css";

import { Section } from "@/components/section";
import { areaSlug, botsByArea, leadBot } from "@/data/bots";
import { BotCard } from "./card";
import { BotPile } from "./pile";
import styles from "./styles.module.css";

export function BotsPreview() {
  return (
    <Section id="bots" title="Grok Bots">
      <BotPile />
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
      <div className={styles.chart}>
        {leadBot ? (
          <div className={styles.lead}>
            <BotCard bot={leadBot} />
          </div>
        ) : null}
        {botsByArea.map((group) => {
          const id = areaSlug(group.area);

          return (
            <section
              aria-labelledby={`${id}-heading`}
              className={styles.branch}
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
