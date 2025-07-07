import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import type * as React from "react";
import styles from "./styles.module.scss";

export interface SliderRootProps extends React.ComponentProps<typeof BaseSlider.Root> {}

export default function Slider({ ...props }: SliderRootProps) {
  const { value, onValueChange } = props;

  const format = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format;

  if (Array.isArray(value)) {
    throw new Error("Slider value must be a number");
  }

  if (typeof value !== "number") {
    throw new Error("Slider value must be a number");
  }

  return (
    <BaseSlider.Root
      value={value}
      onValueChange={onValueChange}
      format={{
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }}
    >
      <div className={styles.root}>
        <div className={styles.label}>
          <span data-leading>Joyful {format(value)}%</span>
          <span data-trailing>{format(100 - value)}% Elegant</span>
        </div>
        <BaseSlider.Control className={styles.control}>
          <div
            className={styles.indicator}
            style={{
              position: "absolute",
              left: 0,
              right: `${100 - value + 4}%`,
              height: "inherit",
            }}
            data-leading
          />
          <div
            className={styles.indicator}
            style={{
              position: "absolute",
              left: `${value + 4}%`,
              right: 0,
              height: "inherit",
            }}
            data-trailing
          />
          <BaseSlider.Thumb className={styles.thumb} />
        </BaseSlider.Control>
      </div>
    </BaseSlider.Root>
  );
}
