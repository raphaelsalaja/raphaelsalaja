import type { IconProps } from "@/components/icons";

export const HighPriority = (props: IconProps) => {
  return (
    <svg
      fill="lch(36.659% 3.643 282.498 / 1)"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <rect width="3" height="6" x="1.5" y="8" rx="1" />
      <rect width="3" height="9" x="6.5" y="5" rx="1" />
      <rect width="3" height="12" x="11.5" y="2" rx="1" />
    </svg>
  );
};

export const InProgress = (props: IconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="lch(80% 90 85)"
        strokeWidth="1.5"
        strokeDasharray="3.14 0"
        strokeDashoffset="-0.7"
      />
      <circle
        cx="7"
        cy="7"
        r="2"
        fill="none"
        stroke="lch(80% 90 85)"
        strokeWidth="4"
        strokeDasharray="12.189379495928398 24.378758991856795"
        strokeDashoffset="6.094689747964199"
        transform="rotate(-90 7 7)"
      />
    </svg>
  );
};

export const Done = (props: IconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" fill="lch(70% 40 120)" />
      <path
        d="M4.5 7L6.5 9L10 5.5"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Todo = (props: IconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="lch(50% 0 0)"
        strokeWidth="1.5"
      />
    </svg>
  );
};
