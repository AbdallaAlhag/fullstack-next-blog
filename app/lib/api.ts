import { faker } from "@faker-js/faker";
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
};
type PostWithoutImg = {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
};

// will probably need to rename this to generate db and then make another function called getAllpost
export async function getAllPosts(): Promise<Post[]> {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: PostWithoutImg[] = await data.json();
    const postsWithImages = await Promise.all(
      posts.map(async (p: PostWithoutImg) => {
        const imageUrl = `https://picsum.photos/seed/picsum/${p.userId}/${p.id}`;
        return {
          ...p,
          imageUrl: imageUrl,
        };
      }),
    );
    return postsWithImages as Post[];
  } catch (e) {
    console.error(e);
    return [];
  }
}
