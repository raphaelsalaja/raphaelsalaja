import type { CSSProperties } from "react";
import { Coffee } from "@/components/coffee";
import { JsonLd } from "@/components/json-ld";
import { Writing } from "@/components/library";
import { Experiments, Projects } from "@/components/work";
import About from "@/content/about.mdx";
import { personJsonLd, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import styles from "./styles.module.css";
import { Visited } from "./visited";

const step = (index: number) => ({ "--step": index }) as CSSProperties;

export function Home() {
  return (
    <div className={styles.layout}>
      <JsonLd data={personJsonLd} />
      <Visited />
      <div className={styles.intro}>
        <header className={styles.header} data-step style={step(0)}>
          <div className={styles.identity}>
            <h1 className={styles.name}>{SITE_NAME}</h1>
            <p className={styles.role}>{SITE_DESCRIPTION}</p>
          </div>
        </header>
        <section className={`${styles.about} prose`} data-step style={step(1)}>
          <About />
        </section>
      </div>
      <div data-step style={step(2)}>
        <Projects />
      </div>
      <div data-step style={step(3)}>
        <Experiments />
      </div>
      <div data-step style={step(4)}>
        <Writing />
      </div>
      <div data-step style={step(5)}>
        <Coffee />
      </div>
    </div>
  );
}
