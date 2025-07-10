import { OutlineProvider } from "@/components/outline";
import { Section } from "@/components/section";
import type { MDX } from "@/types/mdx";
import styles from "./styles.module.css";

interface Props {
  components: MDX[];
}

export default function Documentation({ components }: Props) {
  return (
    <OutlineProvider>
      <article className={styles.article}>
        {components.map((mdx) => (
          <Section key={mdx.data.title} section={mdx} />
        ))}
      </article>
    </OutlineProvider>
  );
}
