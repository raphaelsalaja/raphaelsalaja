import type { IconProps } from "@/components/icons";
import styles from "./styles.module.css";

export const UserSelectButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.part}>
        <span className={styles.label}>
          <CentralBubbleCrossedFilledOnStroke2Radius3 />
        </span>
        <button
          type="button"
          className={styles.button}
          style={{ userSelect: "all" }}
        >
          New Workout
        </button>
      </div>
      <svg
        viewBox="0 0 4 200"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.divider}
      >
        <title>Divider</title>
        <line
          x1="2"
          y1="2"
          x2="2"
          y2="200"
          stroke="var(--border-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
        />
      </svg>
      <div className={styles.part}>
        <span className={styles.label}>
          <CentralBubbleCheckFilledOnStroke2Radius3 />
        </span>
        <button
          type="button"
          className={styles.button}
          style={{ userSelect: "none" }}
        >
          New Workout
        </button>
      </div>
    </div>
  );
};

export function CentralBubbleCrossedFilledOnStroke2Radius3(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00195 3.00002L17.0019 3C19.2111 3 21.002 4.79086 21.002 7V15.0358C21.002 17.2449 19.2111 19.0357 17.002 19.0358L15.3757 19.0358L12.6357 21.3058C12.2639 21.6138 11.7252 21.6123 11.3553 21.3021L8.65157 19.0358H7.00195C4.79281 19.0358 3.00195 17.2449 3.00195 15.0358V7.00002C3.00195 4.79088 4.79281 3.00002 7.00195 3.00002ZM14.7069 9.70711C15.0974 9.31658 15.0974 8.68342 14.7069 8.29289C14.3163 7.90237 13.6832 7.90237 13.2926 8.29289L11.9998 9.58579L10.7069 8.29289C10.3163 7.90237 9.68317 7.90237 9.29265 8.29289C8.90212 8.68342 8.90212 9.31658 9.29265 9.70711L10.5855 11L9.29265 12.2929C8.90212 12.6834 8.90212 13.3166 9.29265 13.7071C9.68317 14.0976 10.3163 14.0976 10.7069 13.7071L11.9998 12.4142L13.2926 13.7071C13.6832 14.0976 14.3163 14.0976 14.7069 13.7071C15.0974 13.3166 15.0974 12.6834 14.7069 12.2929L13.414 11L14.7069 9.70711Z"
        fill="var(--red-a9)"
      />
    </svg>
  );
}

export function CentralBubbleCheckFilledOnStroke2Radius3(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00195 3.00002L17.0019 3C19.2111 3 21.002 4.79086 21.002 7V15.0358C21.002 17.2449 19.2111 19.0357 17.002 19.0358L15.3757 19.0358L12.6357 21.3058C12.2639 21.6138 11.7252 21.6123 11.3553 21.3021L8.65157 19.0358H7.00195C4.79281 19.0358 3.00195 17.2449 3.00195 15.0358V7.00002C3.00195 4.79088 4.79281 3.00002 7.00195 3.00002ZM15.4569 9.95711C15.8474 9.56658 15.8474 8.93342 15.4569 8.54289C15.0663 8.15237 14.4332 8.15237 14.0427 8.54289L11.2498 11.3358L10.4569 10.5429C10.0663 10.1524 9.43317 10.1524 9.04265 10.5429C8.65212 10.9334 8.65212 11.5666 9.04265 11.9571L10.5427 13.4571C10.7302 13.6446 10.9845 13.75 11.2498 13.75C11.515 13.75 11.7693 13.6446 11.9569 13.4571L15.4569 9.95711Z"
        fill="var(--green-a9)"
      />
    </svg>
  );
}
