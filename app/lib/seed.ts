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
    // Optional: Clear table first if you want a fresh start
    // await sql('TRUNCATE TABLE products RESTART IDENTITY CASCADE;');
    const products = await getAllPosts();
    // Seed multiple objects efficiently using an array map loop
    for (const item of products) {
      await sql(
        `INSERT INTO products (title, price, stock) 
         VALUES ($1, $2, $3)
         ON CONFLICT (title) DO NOTHING`,
        [item.title, item.price, item.stock],
      );
    }

    console.log("✅ Database successfully seeded!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

main();
