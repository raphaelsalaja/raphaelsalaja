const BOT_AREAS = [
  "Staff",
  "Training",
  "Engineering",
  "Design",
  "Marketing",
  "Shopping",
] as const;

type BotArea = (typeof BOT_AREAS)[number];

const BOT_SHAPES = [
  "blob",
  "star",
  "hex",
  "heart",
  "square",
  "tablet",
  "sparkle",
  "flower",
  "wedge",
  "clover",
  "teardrop",
  "pebble",
  "cloud",
] as const;

export type BotShape = (typeof BOT_SHAPES)[number];

const BOT_COLORS = [
  "black",
  "gray",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "magenta",
  "violet",
] as const;

export type BotColor = (typeof BOT_COLORS)[number];

export type Bot = {
  title: string;
  area: BotArea;
  description: string;
  does: readonly string[];
  routines: readonly string[];
  tools: readonly string[];
  shape: BotShape;
  color: BotColor;
  lead?: true;
  shareUrl?: string;
  video?: string;
};

export const bots: readonly Bot[] = [
  {
    title: "Executive Assistant",
    area: "Staff",
    description:
      "Runs the day, from the morning brief to calendar defence and travel.",
    does: [
      "Sends a weekday morning brief",
      "Triages the inbox with draft replies",
      "Preps meetings and defends the calendar",
      "Handles travel and occasions",
      "Never sends or books without an OK",
    ],
    routines: ["Morning brief, weekdays", "Weekly review, Fridays"],
    tools: ["Gmail", "Google Calendar"],
    shape: "blob",
    color: "black",
    lead: true,
    shareUrl: "https://x.ai/bot/HtVc-uG8RjAgiTPk15reT",
  },
  {
    title: "Chief Operating Officer",
    area: "Staff",
    description: "Runs the team of Grok Bots end to end.",
    does: [
      "Designs new bots",
      "Audits the team for drift",
      "Upgrades each bot to its field's top standards",
      "Watches usage pace",
      "Cleans up after retired bots",
    ],
    routines: [],
    tools: [],
    shape: "star",
    color: "gray",
    shareUrl: "https://x.ai/bot/LIDb8mpgAwoqIXttg7A0s",
  },
  {
    title: "Financial Advisor",
    area: "Staff",
    description:
      "A calm, numbers-first money admin that watches email for receipts and bills.",
    does: [
      "Tracks receipts, bills and subscriptions",
      "Watches tax deadlines",
      "Flags upcoming charges",
      "Spots wasted subscriptions",
      "Never pays or moves money without an OK",
    ],
    routines: [],
    tools: [],
    shape: "square",
    color: "gray",
    shareUrl: "https://x.ai/bot/_Ztu0D6hN88W-nc_4ETqk",
  },
  {
    title: "Head Coach",
    area: "Training",
    description:
      "A sprint coach that sends tomorrow's session every night from the posted plan.",
    does: [
      "Sends tomorrow's session each night",
      "Follows the coach's posted plan",
      "Logs results in a weekly training page",
    ],
    routines: ["Session plan, 9pm nightly"],
    tools: [],
    shape: "heart",
    color: "green",
    shareUrl: "https://x.ai/bot/qbnwqllDzMQ7Yvbybzh2a",
  },
  {
    title: "Strength & Conditioning Coach",
    area: "Training",
    description:
      "An evidence-based gym coach for sprinters, built around track sessions.",
    does: [
      "Writes strength and power programmes",
      "Adds plyometric work",
      "Gives technique cues",
      "Fits the gym around track sessions",
    ],
    routines: [],
    tools: [],
    shape: "cloud",
    color: "green",
    shareUrl: "https://x.ai/bot/briQ14jd3-taJjZ02jqTf",
  },
  {
    title: "Physical Therapist",
    area: "Training",
    description:
      "Keeps a sprinter's body healthy with evidence-based prehab and recovery.",
    does: [
      "Tracks niggles and injuries",
      "Plans hamstring, hip and ankle prehab",
      "Guides a criteria-based return to run",
      "Sends anything serious to a real physio",
    ],
    routines: [],
    tools: [],
    shape: "cloud",
    color: "green",
    shareUrl: "https://x.ai/bot/F5AncQ85KMiawIgliPmPO",
  },
  {
    title: "Performance Dietitian",
    area: "Training",
    description:
      "A dietitian for sprinters, fuelling around training, races and recovery.",
    does: [
      "Plans fuelling around training and races",
      "Writes meal plans and shopping lists",
      "Helps with eating out",
      "Tracks drinks and nudges on water",
    ],
    routines: ["Water check, every 2 hours"],
    tools: [],
    shape: "teardrop",
    color: "green",
    shareUrl: "https://x.ai/bot/2Eqi-S5xSBqr2LjwjDKLF",
  },
  {
    title: "Software Engineer",
    area: "Engineering",
    description:
      "Keeps web apps, extensions and open-source contributions healthy.",
    does: [
      "Finds the cause of failed deploys",
      "Fixes bugs with a failing test first",
      "Prepares clean PRs",
      "Never ships without an OK",
    ],
    routines: [],
    tools: [],
    shape: "hex",
    color: "blue",
    shareUrl: "https://x.ai/bot/ppWwc5XQAuFO8kQOJ74Ik",
  },
  {
    title: "Web Developer",
    area: "Engineering",
    description: "Builds, fixes and polishes this website.",
    does: [
      "Builds and fixes pages",
      "Polishes the site",
      "Checks every change in preview and production",
      "Ships when told to",
    ],
    routines: [],
    tools: [],
    shape: "pebble",
    color: "blue",
    shareUrl: "https://x.ai/bot/fO8qADaV47FW-chDEjlZ4",
  },
  {
    title: "Product Designer",
    area: "Design",
    description:
      "An opinionated product designer for apps and new app concepts.",
    does: [
      "Gathers real-world UI references",
      "Builds screen directions in Figma",
      "Gives critique backed by named design principles",
    ],
    routines: [],
    tools: ["Figma"],
    shape: "sparkle",
    color: "violet",
    shareUrl: "https://x.ai/bot/IPCuZ4NoYuCGwFTVjvNb5",
  },
  {
    title: "Brand Designer",
    area: "Design",
    description: "Designs logos and wordmarks in a few distinct directions.",
    does: [
      "Gives a few distinct directions per ask",
      "Tests each one small and in one colour",
      "Refines the one picked",
    ],
    routines: [],
    tools: [],
    shape: "tablet",
    color: "violet",
    shareUrl: "https://x.ai/bot/eif6WEVw7MzOe53QZP2oD",
  },
  {
    title: "Marketing Manager",
    area: "Marketing",
    description: "Gets eyes on projects and launches, then tracks what lands.",
    does: [
      "Drafts hook-first X posts",
      "Writes Reddit and community posts",
      "Plans Product Hunt and Show HN launches",
      "Tracks what lands",
      "Never posts without an OK",
    ],
    routines: [],
    tools: [],
    shape: "heart",
    color: "orange",
    shareUrl: "https://x.ai/bot/pryEyer7SSOx-KBiE0zJ0",
  },
  {
    title: "Video Editor",
    area: "Marketing",
    description:
      "Cuts streams, podcasts, videos and X Spaces into vertical clips.",
    does: [
      "Saves full segments",
      "Cuts the best moments into 9:16 clips",
      "Adds captions, hooks and titles",
    ],
    routines: [],
    tools: [],
    shape: "wedge",
    color: "orange",
    shareUrl: "https://x.ai/bot/lB9M6GHvWM2ebQWotA9Lw",
  },
  {
    title: "Fashion Stylist",
    area: "Shopping",
    description: "A candid personal stylist for a leaner, better wardrobe.",
    does: [
      "Makes fit calls from real measurements",
      "Suggests outfits",
      "Finds pieces worth buying, new or secondhand",
      "Never buys without an OK",
    ],
    routines: [],
    tools: [],
    shape: "flower",
    color: "magenta",
    shareUrl: "https://x.ai/bot/fZ8I5t-Maz1OSR7oKf7CR",
  },
];

export const leadBot = bots.find((bot) => bot.lead);

export const botsByArea = BOT_AREAS.map((area) => ({
  area,
  bots: bots.filter((bot) => bot.area === area && !bot.lead),
})).filter((group) => group.bots.length > 0);

export function botSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function areaSlug(area: string) {
  return area
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
