import { getArchiveMedia } from "@/lib/cloudinary";
import MasonryWrapper from "./masonry-wrapper";

const Archive = async () => {
  const items = await getArchiveMedia();

  return <MasonryWrapper items={items} />;
};

export default Archive;
