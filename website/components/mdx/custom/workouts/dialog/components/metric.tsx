import styles from "../styles.module.scss";

interface MetricProps {
  color: string;
  label: string;
  value: string;
}

export const Metric: React.FC<MetricProps> = ({ color, label, value }) => (
  <div className={styles.metric}>
    <span className={styles.title}>{label}</span>
    <span data-measurement-quantity style={{ color: `var(--${color}-9)` }}>
      {value}
    </span>
  </div>
);
