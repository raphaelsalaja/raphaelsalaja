import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import marks from "./marks.module.css";
import styles from "./styles.module.css";

export { marks };

export type Series = {
  label: string;
  kind: "ink" | "accent" | "muted" | "fill" | "dot";
  /** Overrides the accent, for a series whose colour is the data. */
  color?: string;
};

export function Legend({ series }: { series: Series[] }) {
  return (
    <ul className={styles.legend}>
      {series.map(({ label, kind, color }) => (
        <li key={label}>
          <svg
            className={styles.swatch}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            aria-hidden
            style={color ? { color } : undefined}
          >
            {kind === "fill" ? (
              <rect
                className={styles.fill}
                x="2"
                y="1"
                width="12"
                height="8"
                rx="2"
              />
            ) : kind === "dot" ? (
              <circle className={styles.dot} cx="8" cy="5" r="2.5" />
            ) : (
              <path className={styles[kind]} d="M1 5h14" />
            )}
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}

export function Chart({
  title,
  legend,
  className,
  panelClassName,
  children,
  ...props
}: ComponentProps<"figure"> & {
  title: string;
  legend?: Series[] | ReactNode;
  panelClassName?: string;
}) {
  return (
    <figure className={clsx(styles.chart, className)} data-chart {...props}>
      <div className={styles.head}>
        <span className={styles.title}>{title}</span>
        {Array.isArray(legend) ? <Legend series={legend} /> : legend}
      </div>
      <div className={clsx(styles.panel, panelClassName)}>{children}</div>
    </figure>
  );
}
