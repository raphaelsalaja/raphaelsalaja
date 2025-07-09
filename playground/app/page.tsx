import { OutlineProvider } from "@/components/outline";
import { Section } from "@/components/section";
import { getFiles } from "@/utils/mdx";
import styles from "./styles.module.css";

export default async function Page() {
  const components = await getFiles();

  return (
    <OutlineProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* <h1 id="rs/design">rs/design</h1>
          <p>Elegant, accessible components built on Base UI primitives.</p>
          <h1 id="about">About</h1>
          <p>
            Explore my comprehensive design system with fully customizable components that follow best practices for
            accessibility and performance.
          </p>
          <div className={styles.divider} /> */}
          {components.map((mdx) => (
            <Section key={mdx.data.title} section={mdx} />
          ))}
        </div>
      </div>
    </OutlineProvider>
  );
}
