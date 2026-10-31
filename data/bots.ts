export const BOT_AREAS = ["Work & Building", "Training", "Life"] as const;

export type BotArea = (typeof BOT_AREAS)[number];

export type Bot = {
  title: string;
  area: BotArea;
  description: string;
  does: readonly string[];
  routines: readonly string[];
  tools: readonly string[];
  shareUrl?: string;
  video?: string;
};

export const bots: readonly Bot[] = [
  {
    title: "Executive Assistant",
    area: "Work & Building",
    description:
      "Runs the day, from the morning brief to the small jobs that still need a home.",
    does: [
      "Sends the morning brief",
      "Triages the inbox and calendar",
      "Handles odds and ends",
      "Routes work to the right bot",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Chief Operating Officer",
    area: "Work & Building",
    description: "Keeps the bot team healthy, consistent, and easy to run.",
    does: [
      "Audits bots for drift",
      "Watches how the team is used",
      "Tidies routines that have gone stale",
      "Flags bots that need another pass",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Organisation Designer",
    area: "Work & Building",
    description:
      "Designs and creates new Grok Bots after a few preference questions.",
    does: [
      "Asks a few preference questions",
      "Shapes a bot around one job",
      "Writes the role so it is easy to copy",
      "Hands over a bot ready to run",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Software Engineer",
    area: "Work & Building",
    description: "Keeps Pond, a Firefox add-on, and Koi healthy and moving.",
    does: [
      "Checks that each project is healthy",
      "Fixes bugs and small regressions",
      "Keeps the work moving",
      "Notes what should be built next",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Web Developer",
    area: "Work & Building",
    description:
      "Builds, fixes, and polishes this portfolio, then ships after checking a preview.",
    does: [
      "Builds and fixes pages on this site",
      "Polishes layout, type, and motion",
      "Checks a preview before shipping",
      "Keeps the site consistent",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Product Designer",
    area: "Work & Building",
    description: "Designs products and new app concepts in Figma.",
    does: [
      "Designs product flows and screens",
      "Explores new app concepts",
      "Works in Figma",
      "Hands off work that can be built",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Brand Designer",
    area: "Work & Building",
    description:
      "Designs logos and wordmarks, with a few distinct directions to choose from.",
    does: [
      "Explores several concept directions",
      "Designs logos and wordmarks",
      "Keeps each mark simple and distinct",
      "Presents the options side by side",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Motion Designer",
    area: "Work & Building",
    description:
      "Makes custom animated Discord emotes, stickers, and characters.",
    does: [
      "Animates custom Discord emotes",
      "Designs stickers and characters",
      "Keeps the motion short and loopable",
      "Exports files ready to use",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Video Editor",
    area: "Work & Building",
    description: "Clips streams, podcasts, videos, and X Spaces.",
    does: [
      "Clips streams and podcasts",
      "Cuts longer videos down",
      "Pulls moments from X Spaces",
      "Prepares the cuts for posting",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Marketing Manager",
    area: "Work & Building",
    description: "Gets eyes on projects, mainly Pond, with posts and launches.",
    does: [
      "Drafts posts for X",
      "Plans launches",
      "Puts the focus on Pond",
      "Keeps the message plain and specific",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Skills Researcher",
    area: "Work & Building",
    description: "Pitches new skill ideas for the open skills collection.",
    does: [
      "Looks for gaps in the collection",
      "Pitches new skill ideas",
      "Writes a clear job for each skill",
      "Points at the public skills repository",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Game Developer",
    area: "Work & Building",
    description: "Mods games, starting with the skateboarding game re:skate.",
    does: [
      "Mods re:skate",
      "Tries small gameplay changes",
      "Keeps a list of ideas to test",
      "Notes what is worth keeping",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Career Coach",
    area: "Work & Building",
    description: "Supports growth in design-engineer and frontend-craft work.",
    does: [
      "Looks at design-engineer craft",
      "Suggests what to practise next",
      "Reviews frontend work for clarity",
      "Keeps the focus on the craft",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Head Coach",
    area: "Training",
    description: "Runs the whole sprint training plan.",
    does: [
      "Sets the weekly sprint plan",
      "Balances speed, strength, and rest",
      "Adjusts the plan when the week changes",
      "Keeps sessions pointed at the next race",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Strength Coach",
    area: "Training",
    description:
      "Writes gym strength, power, and plyometric programmes for sprinting.",
    does: [
      "Plans strength sessions for sprinting",
      "Adds power and plyometric work",
      "Matches the gym to the sprint plan",
      "Keeps each session simple to follow",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Performance Analyst",
    area: "Training",
    description:
      "Logs splits and race times, tracks personal bests, and reviews race footage.",
    does: [
      "Logs splits and race times",
      "Tracks personal bests",
      "Reviews race footage",
      "Notes what changed between races",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Sports Psychologist",
    area: "Training",
    description:
      "Helps with race nerves, pre-race routines, focus, and confidence.",
    does: [
      "Works through race nerves",
      "Builds a pre-race routine",
      "Sharpens focus for the race",
      "Supports confidence before the start",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Nutrition Coach",
    area: "Training",
    description:
      "Plans meals, simple recipes, and shopping lists around training.",
    does: [
      "Writes meal plans around training",
      "Suggests simple recipes",
      "Builds a shopping list",
      "Keeps food practical on hard days",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Sleep Coach",
    area: "Training",
    description:
      "Looks after sleep habits, wind-down, and bed and wake times around training.",
    does: [
      "Sets bed and wake times",
      "Builds a wind-down routine",
      "Protects sleep around hard sessions",
      "Keeps the schedule steady",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Culture Curator",
    area: "Life",
    description:
      "Makes taste picks across music, books, film, art, design, fashion, food, and places.",
    does: [
      "Picks music, books, and film",
      "Suggests art, design, and fashion",
      "Notes food and places worth a visit",
      "Keeps the list specific",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Fashion Stylist",
    area: "Life",
    description: "Helps with wardrobe, fit, and outfit ideas.",
    does: [
      "Reviews the wardrobe",
      "Checks fit",
      "Suggests outfit ideas",
      "Keeps combinations easy to repeat",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Interior Designer",
    area: "Life",
    description:
      "Plans flat and workspace layouts, furniture, lighting, and the desk.",
    does: [
      "Plans flat and workspace layouts",
      "Suggests furniture and lighting",
      "Sets up the desk",
      "Keeps the room calm and workable",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Travel Agent",
    area: "Life",
    description: "Finds and compares flights and hotels, and tracks bookings.",
    does: [
      "Searches flights and hotels",
      "Compares the options",
      "Tracks bookings",
      "Keeps trip details in one place",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Accountant",
    area: "Life",
    description:
      "Handles personal money admin, from receipts to subscriptions and renewals.",
    does: [
      "Files receipts",
      "Tracks subscriptions",
      "Watches renewal dates",
      "Keeps the admin in one place",
    ],
    routines: [],
    tools: [],
  },
  {
    title: "Event Planner",
    area: "Life",
    description:
      "Plans birthdays, anniversaries, and other occasions, with gifts and cards ahead of time.",
    does: [
      "Tracks birthdays and anniversaries",
      "Plans gifts and cards early",
      "Keeps a list of upcoming occasions",
      "Leaves enough time to prepare",
    ],
    routines: [],
    tools: [],
  },
];

const previewTitles = [
  "Executive Assistant",
  "Web Developer",
  "Head Coach",
  "Culture Curator",
] as const;

export const previewBots = previewTitles.map((title) => {
  const bot = bots.find((item) => item.title === title);
  if (!bot) throw new Error(`Missing preview bot: ${title}`);
  return bot;
});

export const botsByArea = BOT_AREAS.map((area) => ({
  area,
  bots: bots.filter((bot) => bot.area === area),
}));

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
