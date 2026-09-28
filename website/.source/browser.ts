// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"about.mdx": () => import("../content/about.mdx?collection=docs"), "library/12-principles-of-animation.mdx": () => import("../content/library/12-principles-of-animation.mdx?collection=docs"), "library/building-vs-banking.mdx": () => import("../content/library/building-vs-banking.mdx?collection=docs"), "library/chasing-approval.mdx": () => import("../content/library/chasing-approval.mdx?collection=docs"), "library/simply-effective.mdx": () => import("../content/library/simply-effective.mdx?collection=docs"), "library/sound-design.mdx": () => import("../content/library/sound-design.mdx?collection=docs"), "library/the-concept-of-taste.mdx": () => import("../content/library/the-concept-of-taste.mdx?collection=docs"), "library/the-rise-of-design-engineering.mdx": () => import("../content/library/the-rise-of-design-engineering.mdx?collection=docs"), "library/understanding-springs.mdx": () => import("../content/library/understanding-springs.mdx?collection=docs"), "library/white-tees.mdx": () => import("../content/library/white-tees.mdx?collection=docs"), "work/family-wallet.mdx": () => import("../content/work/family-wallet.mdx?collection=docs"), "work/low-battery-notification.mdx": () => import("../content/work/low-battery-notification.mdx?collection=docs"), }),
};
export default browserCollections;