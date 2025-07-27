import type { Frontmatter } from "@/types/frontmatter";
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
  const colors = [
    "blue",
    "gray",
    "green",
    "orange",
    "pink",
    "red",
    "violet",
    "yellow",
    "lime",
  ];
  const hash = djb2(name.toLowerCase());
  return colors[hash % colors.length];
}

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Frontmatter;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ post }) => {
  const { data } = post;

  const { title, description, time } = data;

  return (
    <div className={styles.thumbnail}>
      <div className={styles.placeholder}>
        <div className={styles.content}>
          <div className={styles.details}>
            <p className={styles.text} data-text="primary">
              {title}
            </p>
            <p className={styles.text} data-text="secondary">
              {description}
            </p>
          </div>
        </div>
        <div className={styles.extra}>
          <p className={styles.text} data-text="secondary">
            {/* {time.created} */}
          </p>
        </div>
      </div>
    </div>
  );
};
