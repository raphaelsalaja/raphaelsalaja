import { Video } from "@/components/video";
import { type Bot, botSlug } from "@/data/bots";
import styles from "./styles.module.css";

export function BotCard({ bot }: { bot: Bot }) {
  return (
    <article className={styles.card} data-reveal>
      {bot.video ? (
        <Video
          aria-label={`${bot.title} preview`}
          className={styles.video}
          src={bot.video}
        />
      ) : null}
      <h3 className={styles.title} id={botSlug(bot.title)}>
        {bot.title}
      </h3>
      <p className={styles.description}>{bot.description}</p>
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
      {bot.shareUrl ? (
        <a
          className={styles.copy}
          href={bot.shareUrl}
          rel="noopener"
          target="_blank"
        >
          Copy This Bot
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <button className={styles.copy} disabled type="button">
          Link Coming Soon
        </button>
      )}
    </article>
  );
}
