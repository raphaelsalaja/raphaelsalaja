"use client";

import { CldImage } from "next-cloudinary";

type CloudinaryImageProps = React.ComponentProps<typeof CldImage>;

export const Image = ({ className, ...props }: CloudinaryImageProps) => {
  return <CldImage {...props} />;
};
