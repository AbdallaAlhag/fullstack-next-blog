import { type Post } from "@/app/interfaces/post";
import { type User } from "@/app/interfaces/user";
import { db } from "@/app/lib/db";

interface GetPostWithLimitsProps {
  limit: number;
  page: number;
}

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

export async function GetPostsWithLimit({
  limit,
  page,
}: GetPostWithLimitsProps) {
  const offset = (page - 1) * limit;

  try {
    const { rows } = await db.query(`
      SELECT * FROM posts
      ORDER BY date DESC
      LIMIT ${limit}
      OFFSET ${offset}`);

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
    return posts;
  } catch (error) {
    console.error("Dabtase Error: ", error);
    throw new Error("Failed to fetch product data.");
  }
}

export async function getTotalPages(limit: number) {
  try {
    const data = await db.query(`SELECT COUNT(*) FROM posts`);
    const totalCount = Number(data.rows[0].count);

    return Math.ceil(totalCount / limit);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages.");
  }
}

export async function getUser(email: string): Promise<User | null> {
  try {
    const data = await db.query(`SELECT* FROM users where email = $1`, [email]);
    if (!data || data.rows.length === 0) return null;
    return data.rows[0] as User;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}
