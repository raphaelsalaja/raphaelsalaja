"use client";

import { Slider } from "@base-ui-components/react/slider";
import styles from "./styles.module.css";

type ReadingTimeTrackerProps = React.ComponentProps<typeof Slider.Root>;

const ReadingTimeTracker = (props: ReadingTimeTrackerProps) => {
  return (
    <div className={styles.root}>
      <Slider.Root {...props}>
        <Slider.Control className={styles.control}>
          <Slider.Track className={styles.track}>
            <Slider.Indicator className={styles.indicator} />
            <Slider.Thumb className={styles.thumb} />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};

export default ReadingTimeTracker;
