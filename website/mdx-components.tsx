import "@/styles/mdx.css";
import "@/styles/shiki.css";

import type { MDXComponents } from "mdx/types";

import { Image } from "@/components/image";
import {
  Caret,
  Conversions,
  Dialogs,
  FamilyWallet,
  Nature,
  Tone,
  Workouts,
} from "@/components/mdx";
import { Principles } from "./components/mdx/12-principles";
import { BatteryIcon } from "./components/mdx/battery-icon";
import { UserSelectButton } from "./components/mdx/sweating-details/user-select";
import { Video } from "./components/media";

const components: MDXComponents = {
  img: (props) => <Image {...props} />,
  video: (props) => <Video loop {...props} />,
  ...Principles,
  Workouts,
  Caret,
  FamilyWallet,
  Nature,
  Tone,
  Dialogs,
  Conversions,
  BatteryIcon,
  UserSelectButton,
};

export function getMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}
