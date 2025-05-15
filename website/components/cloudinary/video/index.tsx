"use client";

import { CldVideoPlayer } from "next-cloudinary";

type CloudinaryVideoProps = React.ComponentProps<typeof CldVideoPlayer>;

export const Video = ({ className, ...props }: CloudinaryVideoProps) => {
  return <CldVideoPlayer {...props} />;
};
