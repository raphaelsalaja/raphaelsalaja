export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "Animation" | "Thoughts" | "Fashion";
};

export const posts: Post[] = (
  [
    {
      slug: "the-rise-of-design-engineering",
      title: "The Rise of Design Engineering",
      description:
        "From a talk at MIT Startup Week, on the gap between a Figma file and what actually ships.",
      date: "2026-08-05",
      category: "Thoughts",
    },
    {
      slug: "12-principles-of-animation",
      title: "12 Principles of Animation",
      description:
        "A guide to the foundational principles of animation, from squash and stretch to timing and exaggeration, and how they can be applied to create more engaging and lifelike animations.",
      date: "2025-08-04",
      category: "Animation",
    },
    {
      slug: "chasing-approval",
      title: "Chasing Approval",
      description:
        "A reflection on the obsession with validation in tech and design.",
      date: "2025-07-28",
      category: "Thoughts",
    },
    {
      slug: "white-tees",
      title: "White Tees",
      description: "A beginner's guide to menswear's quiet icon.",
      date: "2025-07-27",
      category: "Fashion",
    },
    {
      slug: "building-vs-banking",
      title: "Building vs. Banking",
      description:
        "How the startup conversation has shifted from creating meaningful work to chasing financial outcomes, and why that shift leaves us emptier than we expect.",
      date: "2025-06-21",
      category: "Thoughts",
    },
    {
      slug: "the-concept-of-taste",
      title: "The Concept of Taste",
      description:
        "An exploration of aesthetic taste in art, design, and creative fields.",
      date: "2025-03-11",
      category: "Thoughts",
    },
  ] satisfies Post[]
).sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  posts.find((post) => post.slug === slug);
