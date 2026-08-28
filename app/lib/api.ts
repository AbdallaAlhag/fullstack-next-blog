import { type Post } from "@/app/interfaces/post";
import { db } from "@/app/lib/db";

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { rows } = await db.query("SELECT * FROM posts ORDER BY date DESC");
    // will have to do this for every call
    const posts: Post[] = rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      body: row.body,
      imageUrl: row.image_url,
      date: new Date(row.date).getTime(),
      excerpt: row.excerpt,
      slug: row.slug,
      author: {
        name: row.author_name,
        picture: row.author_picture,
      },
    }));
    // console.log(posts);
    return posts;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { rows } = await db.query(
      "SELECT * FROM posts WHERE slug = $1 LIMIT 1",
      [slug],
    );

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];

    const post: Post = {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      body: row.body,
      imageUrl: row.image_url,
      date: new Date(row.date).getTime(),
      excerpt: row.excerpt,
      slug: row.slug,
      author: {
        name: row.author_name,
        picture: row.author_picture,
      },
    };
    return post;
  } catch (e) {
    console.error(e);
    return null;
  }
}
