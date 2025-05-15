"use client";

import { Masonry as PlockMasonry } from "react-plock";

type MasonryProps = React.ComponentProps<typeof PlockMasonry>;

export const Masonry = async (props: MasonryProps) => {
  return <PlockMasonry {...props} />;
};
