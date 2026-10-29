import { Coffee } from "@/components/coffee";
import { JsonLd } from "@/components/json-ld";
import { Writing } from "@/components/library";
import { Experiments, Projects } from "@/components/work";
import About from "@/content/about.mdx";
import { personJsonLd, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { BioLink } from "./bio-link";
import styles from "./styles.module.css";

export function Home() {
  return (
    <div className={styles.layout}>
      <JsonLd data={personJsonLd} />
      <div className={styles.intro}>
        <header className={styles.header} data-reveal>
          <div className={styles.identity}>
            <h1 className={styles.name}>{SITE_NAME}</h1>
            <p className={styles.role}>{SITE_DESCRIPTION}</p>
          </div>
        </header>
        <section className={`${styles.about} prose`} data-reveal>
          <About components={{ a: BioLink }} />
        </section>
      </div>
      <div data-reveal>
        <Projects />
      </div>
      <div data-reveal>
        <Experiments />
      </div>
      <div data-reveal>
        <Writing />
      </div>
      <div data-reveal>
        <Coffee />
      </div>
    </div>
  );
}
