"use client";

import { Header } from "./header";
import { Select } from "./select";
import styles from "./styles.module.css";

export const Page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <Header />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.form}>
              <div className={styles.column}>
                <div className={styles.label}>Name</div>
                <input type="text" className={styles.input} placeholder="Activity Name" />
              </div>
              <div className={styles.field}>
                <Select
                  label="Force"
                  items={[
                    {
                      label: "Push",
                      value: "push",
                      title: "Push Movement",
                      description:
                        "Push weight away from your body using muscles like chest, shoulders, and triceps. These movements build upper body strength and power while improving pressing mechanics. Common examples include push-ups, bench press, shoulder press, and dips.",
                    },
                  ]}
                />
                <div className={styles.field}>
                  <Select
                    label="Mechanic"
                    items={[
                      {
                        label: "Compound",
                        value: "compound",
                        title: "Compound Exercise",
                        description:
                          "Work multiple muscle groups together in coordinated movement patterns. These exercises burn more calories, improve functional strength, and build coordination between muscle groups.",
                      },
                      {
                        label: "Isolation",
                        value: "isolation",
                        title: "Isolation Exercise",
                        description:
                          "Target specific muscle groups to refine and strengthen particular areas with focused precision. Examples include bicep curls, leg extensions, and lateral raises.",
                      },
                      {
                        label: "Static",
                        value: "static",
                        title: "Static Hold",
                        description:
                          "Hold a position without movement to build muscular endurance, stability, and mental toughness. These exercises improve core strength, joint stability, and body awareness while developing isometric strength.",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <Select
                  label="Equipment"
                  items={[
                    {
                      label: "Barbell, Bench, + 3",
                      value: "barbell",
                      title: "Barbell",
                      description:
                        "Long bar for compound exercises like squats, deadlifts, and bench presses. Requires Olympic weight plates and safety equipment like racks or benches. Best for building maximum strength and muscle mass through heavy resistance training.",
                    },
                  ]}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Level"
                  items={[
                    {
                      label: "Beginner",
                      value: "beginner",
                      title: "Beginner",
                      description:
                        "Perfect for those new to exercise or returning after extended breaks. Focuses on proper form, basic movement patterns, and gradual strength building. Start here to establish good habits and prevent injury while building confidence.",
                    },
                  ]}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Field"
                  items={[
                    {
                      label: "Strength",
                      value: "strength",
                      title: "Strength",
                      description:
                        "Build muscle and increase lifting capacity through progressive resistance training. Focuses on heavy weights, lower repetitions, and compound movements. Improves bone density, metabolism, and functional power for daily activities.",
                    },
                  ]}
                />
              </div>
              <div className={styles.column}>
                <div className={styles.label}>Notes</div>
                <textarea className={styles.textarea} placeholder="e.g. Focus on slow, controlled movement" />
              </div>
              <button type="button" className={styles.button} data-type="secondary">
                Add Field
              </button>
              <button type="button" className={styles.button} data-type="primary">
                Create Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
