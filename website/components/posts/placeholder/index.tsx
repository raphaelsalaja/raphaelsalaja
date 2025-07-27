import type { Frontmatter } from "@/types/frontmatter";
import styles from "./styles.module.scss";

function djb2(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash >>> 0;
}

function _getColor(name: string) {
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
