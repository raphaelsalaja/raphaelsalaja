import "@/styles/mdx.css";

import { Section } from "@/components/section";
import { StackList } from "@/components/stack-list";
import { areaSlug, botSlug, botsByArea, previewBots } from "@/data/bots";
import { BotCard } from "./card";
import styles from "./styles.module.css";

export function BotsPreview() {
  return (
    <Section id="bots" link={{ href: "/bots", label: "All Bots" }} title="Bots">
      <StackList
        items={previewBots.map((bot) => ({
          description: bot.description,
          href: `/bots#${botSlug(bot.title)}`,
          title: bot.title,
        }))}
      />
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
        {botsByArea.map((group) => {
          const id = areaSlug(group.area);

          return (
            <section
              aria-labelledby={`${id}-heading`}
              className={styles.group}
              id={id}
              key={group.area}
            >
              <h2 className={styles.area} data-reveal id={`${id}-heading`}>
                {group.area}
              </h2>
              <div className={styles.cards}>
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
