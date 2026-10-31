import "@/styles/mdx.css";

import { areaSlug, botsByArea } from "@/data/bots";
import { BotCard } from "./card";
import { BotPile } from "./pile";
import styles from "./styles.module.css";

export function BotsPreview() {
  return <BotPile />;
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
