import { type Post, IntialPlaceholderPosts } from "@/app/interfaces/post";
import { generateFinalizedPosts } from "@/app/lib/helper";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load variables from the Vercel-generated file
dotenv.config({ path: ".env.development.local" });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing. Did you run "vercel env pull"?');
}

const sql = neon(process.env.DATABASE_URL);

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

async function main() {
  console.log("🌱 Starting database seed...");
  try {
    const postsToSeed = await getAllPosts();

    console.log("💥 Resetting posts table...");
    await sql`DROP TABLE IF EXISTS posts CASCADE;`;

    // 2. Create the fresh table definition using UUID as the Primary Key
    console.log("🏗️ Creating table with UUID schema...");
    await sql`
      CREATE TABLE posts (
        id UUID PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        author_picture TEXT,
        body TEXT NOT NULL,
        date TIMESTAMPTZ,
        excerpt TEXT,
        image_url TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        user_id INT NOT NULL
      );
    `;

    for (const post of postsToSeed) {
      await sql`
    INSERT INTO posts (
      id, author_name, author_picture, body, date, excerpt, image_url, slug, title, user_id
    ) VALUES (
      ${post.id}, ${post.author.name}, ${post.author.picture}, ${post.body}, ${post.date}, ${post.excerpt}, ${post.imageUrl}, ${post.slug}, ${post.title}, ${post.userId}
    ) 
    ON CONFLICT (slug) DO NOTHING
  `;
    }

    console.log("✅ Database successfully seeded!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

main();
