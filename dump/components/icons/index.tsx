import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  DividerHorizontalIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

interface IconProps {
  size?: number;
  direction?: number;
}

export const Arrow = ({ size = 16, direction = 0 }: IconProps) => {
  const Icon = direction === 180 ? ArrowLeftIcon : ArrowRightIcon;
  return <Icon width={size} height={size} />;
};

export const Chevron = ({ size = 16, direction = 0 }: IconProps) => {
  return <ChevronDownIcon width={size} height={size} style={{ transform: `rotate(${direction}deg)` }} />;
};

export const Clock = ({ size = 16 }: IconProps) => {
  return <ClockIcon width={size} height={size} />;
};

export const Divider = ({ size = 16 }: IconProps) => {
  return <DividerHorizontalIcon width={size} height={size} />;
};

export const Dots = ({ size = 16 }: IconProps) => {
  return <DotsHorizontalIcon width={size} height={size} />;
};

export const Check = ({ size = 16 }: IconProps) => {
  return <CheckIcon width={size} height={size} />;
};
