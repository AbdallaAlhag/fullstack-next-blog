import { type Post } from "@/app/interfaces/post";
import { type User } from "@/app/interfaces/user";
import { db } from "@/app/lib/db";
import { auth } from "@/auth";
import bcrypt from "bcrypt";
import { generateSlug } from "./helper";

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

type createUserProps = {
  name: string;
  email: string;
  password: string;
};
export async function createUser(userData: createUserProps) {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
      [name, email, hashedPassword],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database error inside createUser:", error);
    throw error;
  }
}

type createPostProps = {
  body: string;
  image_url: string;
  title: string;
};

export async function createPost(rawData: createPostProps) {
  try {
    const session = await auth();
    console.log("session check: ", session);
    if (!session?.user?.email) {
      throw new Error("Unauthorized: You must be logged in to create a post.");
    }

    const userInfo = await getUser(session.user.email);
    if (!userInfo) {
      throw new Error("User profile not found.");
    }

    // Move author_picture to users table later! For now, keep it blank or pull from userInfo
    const author_picture = "";
    const { name: author_name } = userInfo;
    console.log("user info", userInfo);
    const { id: user_id } = session?.user;
    const { body, title } = rawData;
    let { image_url } = rawData;

    // Generate excerpt
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const segments = Array.from(segmenter.segment(body));
    let excerpt = segments
      .slice(0, 3)
      .map((s) => s.segment.trim())
      .join(" ");

    if (excerpt.length >= 250) {
      excerpt = excerpt.slice(0, 250).replace(/\s+\S*$/, "") + "...";
    }

    // 3. Execute the UUID function properly
    const postId = crypto.randomUUID();
    const slugId = postId.slice(0, 6);
    const slug = `${slugId}-${generateSlug(title)}`;
    const random3Digit = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    if (!image_url || image_url == "" || image_url.length === 0) {
      image_url = new URL(`https://picsum.photos/id/${random3Digit}/1300/630`)
        .href;
    }

    console.log(
      "values::::",
      author_name,
      author_picture,
      body,
      excerpt,
      image_url,
      slug,
      title,
      user_id,
    );
    const result = await db.query(
      `INSERT INTO posts (
        id,
        author_name, 
        author_picture, 
        body, 
        excerpt, 
        image_url, 
        slug, 
        title, 
        user_id
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING author_name, author_picture, body, excerpt, image_url, slug, title, user_id`,
      [
        postId,
        author_name,
        author_picture,
        body,
        excerpt,
        image_url,
        slug,
        title,
        user_id,
      ],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Database error inside createPost:", error);
    throw error;
  }
}
