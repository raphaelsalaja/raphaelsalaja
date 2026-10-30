export type Post = {
  slug: string;
  title: string;
  description: string;
  summary?: string;
  date: string;
  category: "Animation" | "Thoughts";
};

export const posts: Post[] = (
  [
    {
      slug: "sauce",
      title: "Sauce",
      description:
        "The difference between a product that's well designed and one that looks like someone made it.",
      date: "2026-10-29",
      category: "Thoughts",
    },
    {
      slug: "information-should-be-free",
      title: "Information Should Be Free",
      description:
        "I learned everything I know because people gave it away. The least I can do is the same.",
      date: "2026-10-29",
      category: "Thoughts",
    },
    {
      slug: "the-last-10-percent",
      title: "The Last 10%",
      description:
        "The part of an interface people feel and almost never name.",
      date: "2026-10-12",
      category: "Thoughts",
    },
    {
      slug: "what-the-model-misses",
      title: "What the Model Misses",
      description:
        "Speed gets you a working screen. The pass after that is still yours.",
      date: "2026-09-14",
      category: "Thoughts",
    },
    {
      slug: "the-rise-of-design-engineering",
      title: "The Rise of Design Engineering",
      description:
        "From a talk at MIT Startup Week, on the gap between a Figma file and what actually ships.",
      date: "2026-08-05",
      category: "Thoughts",
    },
    {
      slug: "on-copying",
      title: "On Copying",
      description:
        "Rebuilding interfaces you admire, until the decisions come apart.",
      date: "2026-06-18",
      category: "Thoughts",
    },
    {
      slug: "a-note-on-timing",
      title: "A Note on Timing",
      description:
        "The curve is the shape. The duration is whether the motion belongs.",
      date: "2026-01-19",
      category: "Animation",
    },
    {
      slug: "quiet-software",
      title: "Quiet Software",
      description: "Tools that show up, do the thing, and get out of the way.",
      date: "2025-11-02",
      category: "Thoughts",
    },
    {
      slug: "when-to-use-a-spring",
      title: "When to Use a Spring",
      description:
        "Springs for things with weight. Eases for things that should just arrive.",
      date: "2025-10-21",
      category: "Animation",
    },
    {
      slug: "12-principles-of-animation",
      title: "12 Principles of Animation",
      description:
        "Disney's 12 principles of animation, from squash and stretch to appeal, and how each one carries over to interfaces.",
      summary: "Disney's principles of animation, applied to interfaces.",
      date: "2025-08-04",
      category: "Animation",
    },
    {
      slug: "chasing-approval",
      title: "Chasing Approval",
      description:
        "On making work to be approved of, and what it does to the work.",
      date: "2025-07-28",
      category: "Thoughts",
    },
    {
      slug: "building-vs-banking",
      title: "Building vs. Banking",
      description:
        "Overheard on a flight home: a lot of talk about exits, and very little about the work.",
      summary:
        "Why building for the exit leaves less than building for the work.",
      date: "2025-06-21",
      category: "Thoughts",
    },
    {
      slug: "performing-the-work",
      title: "Performing the Work",
      description:
        "Sharing what you made, and designing it so it can be shared.",
      date: "2025-05-30",
      category: "Thoughts",
    },
    {
      slug: "good-enough",
      title: "Good Enough",
      description:
        "A useful way to ship, and a bad standard for the parts people touch.",
      date: "2025-04-28",
      category: "Thoughts",
    },
    {
      slug: "the-concept-of-taste",
      title: "The Concept of Taste",
      description:
        "Why taste feels like instinct, and how it actually gets built.",
      date: "2025-03-11",
      category: "Thoughts",
    },
  ] satisfies Post[]
).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  posts.find((post) => post.slug === slug);
