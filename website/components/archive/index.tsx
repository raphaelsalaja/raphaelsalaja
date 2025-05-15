import { getArchiveMedia } from "@/lib/cloudinary";
import { MasonryWrapper } from "./server";

export const Archive = async () => {
  const items = await getArchiveMedia();

  return <MasonryWrapper items={items} />;
};
