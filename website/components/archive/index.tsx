import { getMediaFromFolder } from "@/lib/media-fetching";
import MasonryWrapper from "./masonry-wrapper";

const Archive = async () => {
  const items = await getMediaFromFolder("/media/archive");

  return <MasonryWrapper items={items} />;
};

export default Archive;
