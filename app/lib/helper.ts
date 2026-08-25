import { faker } from "@faker-js/faker";
import { type IntialPlaceholderPosts, Post } from "@/app/interfaces/post";
export function generateSlug(title: string): string {
  // 1. Clean up accents and special characters first
  const cleanTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "");

  // 2. Split by spaces, grab the first 3 words, and join with a hyphen
  return cleanTitle.trim().split(/\s+/).slice(0, 3).join("-");
}

export function generateFinalizedPosts(
  posts: IntialPlaceholderPosts[],
): Post[] {
  const userLookup = new Map();
  const pfpLookup = new Map();
  const postsWithImages = posts.map((p: IntialPlaceholderPosts) => {
    // generate name for each user
    if (!userLookup.has(p.userId)) {
      userLookup.set(p.userId, faker.person.fullName());
    }
    // generate unique pfp for each user
    if (!pfpLookup.has(p.userId)) {
      pfpLookup.set(p.userId, faker.image.personPortrait());
    }

    const newParagraph = faker.lorem.paragraphs(5);

    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const segments = Array.from(segmenter.segment(newParagraph));

    // generate excerpt
    let excerpt = segments
      .slice(0, 3)
      .map((s) => s.segment.trim())
      .join(" ");
    if (excerpt.length >= 250) {
      excerpt = excerpt.slice(0, 250).replace(/\s+\S*$/, "") + "...";
    }

    // generate unique slug
    const slug = `${p.id}-${generateSlug(p.title)}`;

    const imageUrl = new URL("https://picsum.photos/1200/800").href;
    const randomDate = faker.date.past();
    const formattedDate = new Date(randomDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return {
      ...p,
      imageUrl: imageUrl,
      date: formattedDate,
      body: newParagraph,
      author: {
        name: userLookup.get(p.userId),
        picture: pfpLookup.get(p.userId),
      },
      excerpt: excerpt,
      slug: slug,
    };
  });
  return postsWithImages;
}
