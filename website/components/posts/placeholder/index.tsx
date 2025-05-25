import { Frontmatter } from "@/types/frontmatter";
import { Shape1 } from "./shapes/1";
import { Shape2 } from "./shapes/2";
import { Shape3 } from "./shapes/3";
import { Shape4 } from "./shapes/4";
import { Shape5 } from "./shapes/5";
import { Shape6 } from "./shapes/6";
import { Shape7 } from "./shapes/7";
import { Shape8 } from "./shapes/8";
import styles from "./styles.module.scss";

function djb2(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash >>> 0;
}

function getColor(name: string) {
  const colors = ["blue", "gray", "green", "orange", "pink", "red", "violet", "yellow", "lime"];
  const hash = djb2(name.toLowerCase());
  return colors[hash % colors.length];
}

function getShape(name: string, color: string) {
  const shapes = [
    <Shape1 key={1} className={styles.shape} />,
    <Shape2 key={2} className={styles.shape} />,
    <Shape3 key={3} className={styles.shape} />,
    <Shape4 key={4} className={styles.shape} />,
    <Shape5 key={5} className={styles.shape} />,
    <Shape6 key={6} className={styles.shape} />,
    <Shape7 key={7} className={styles.shape} />,
    <Shape8 key={8} className={styles.shape} />,
  ];

  const hash = djb2(name.toLowerCase());

  const index = hash % 8;

  return shapes[index];
}

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Frontmatter;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ post }) => {
  const { title, summary, time, tags } = post;

  const color = getColor(title);
  const shape = getShape(title, color);

  return (
    <div className={styles.thumbnail} style={{ background: `var(--${color}-a9)` }}>
      <div className={styles.placeholder}>
        <div className={styles.content}>
          <div className={styles.details}>
            <p className={styles.text} data-text="primary">
              {title}
            </p>
            <p className={styles.text} data-text="secondary">
              {summary}
            </p>
          </div>
          <div className={styles.square} style={{ background: `var(--${color}-a10)` }}>
            {shape}
          </div>
        </div>
        <div className={styles.extra}>
          <p className={styles.text} data-text="secondary">
            {time.created}
          </p>
        </div>
      </div>
    </div>
  );
};
