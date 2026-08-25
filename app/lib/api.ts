import { type Post, IntialPlaceholderPosts } from "@/app/interfaces/post";
import { generateFinalizedPosts } from "@/app/lib/helper";
// will probably need to rename this to generate db and then make another function called getAllpost
export async function getAllPosts(): Promise<Post[]> {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: IntialPlaceholderPosts[] = await data.json();

    const finalizedPosts = generateFinalizedPosts(posts);
    return finalizedPosts;
  } catch (e) {
    console.error(e);
    return [];
  }
}
