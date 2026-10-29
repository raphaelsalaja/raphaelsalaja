import "@/styles/mdx.css";

import { Fragment } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { principles, procedures, type Skill } from "@/data/skills";
import { demos } from "./demos";
import { Install } from "./install";
import styles from "./styles.module.css";

function Entry({ skill }: { skill: Skill }) {
  return (
    <Fragment>
      <h3 id={skill.name} className={styles.name}>
        /{skill.name}
      </h3>
      <p>
        {skill.description}
        {skill.userInvoked && " Runs only when you call it."}
      </p>
      {demos[skill.name]}
    </Fragment>
  );
}

export function Skills() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Skills" }]} />
      <article className="prose" data-reveal-children>
        <header>
          <h1>Skills</h1>
          <Install />
        </header>
        <p>
          Agent skills for building interfaces with coding agents. Every rule
          shows the broken line and the line that replaces it, so each skill
          below is shown as a pair.
        </p>
        <h2 className={styles.group}>Principles</h2>
        <p>Standards the agent holds while it works.</p>
        {principles.map((skill) => (
          <Entry key={skill.name} skill={skill} />
        ))}
        <h2 className={styles.group}>Procedures</h2>
        <p>Jobs the agent runs in order, step by step.</p>
        {procedures.map((skill) => (
          <Entry key={skill.name} skill={skill} />
        ))}
      </article>
    </>
  );
}
