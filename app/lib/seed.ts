import { type Post, IntialPlaceholderPosts } from "@/app/interfaces/post";
import { generateFinalizedPosts } from "@/app/lib/helper";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
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

    // 1. Clear out the old schema entirely
    console.log("💥 Resetting tables...");
    await sql`DROP TABLE IF EXISTS posts CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;

    // 2. Create the Users table with unique email and bcrypt password columns
    console.log("🏗️ Creating users table...");
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Create the Posts table (author_picture removed to align with your users table)
    console.log("🏗️ Creating posts table...");
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
        user_id INT REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    // 4. Seed Users and map their generated IDs
    console.log("👥 Seeding users...");
    const userMap = new Map();
    const saltRounds = 10;

    for (const post of postsToSeed) {
      const authorName = post.author.name;

      if (!userMap.has(authorName)) {
        // Generate placeholder email and password based on author name for seeding
        const email = `${authorName.toLowerCase().replace(/\s+/g, "")}@example.com`;
        const plainPassword = "password123"; // The plain text password used for login

        // Hash the password so bcrypt.compare() works later
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        // Insert user and return the auto-generated SERIAL ID
        const [newUser] = await sql`
          INSERT INTO users (name, email, password)
          VALUES (${authorName}, ${email}, ${hashedPassword})
          RETURNING id;
        `;
        userMap.set(authorName, newUser.id);
        console.log(
          `👤 Created user: ${authorName} (${email}) with password: ${plainPassword}`,
        );
      }
    }

    // 5. Seed Posts using the correct user IDs
    console.log("📝 Seeding posts...");
    for (const post of postsToSeed) {
      const resolvedUserId = userMap.get(post.author.name);

      // Convert the numeric timestamp safely to a JS Date object
      const formattedDate = post.date ? new Date(Number(post.date)) : null;

      await sql`
        INSERT INTO posts (
          id, author_name, author_picture, body, date, excerpt, image_url, slug, title, user_id
        ) VALUES (
          ${post.id}, ${post.author.name},${post.author.picture}, ${post.body}, ${formattedDate}, ${post.excerpt}, ${post.imageUrl}, ${post.slug}, ${post.title}, ${resolvedUserId}
        ) 
        ON CONFLICT (slug) DO NOTHING;
      `;
    }

    console.log("✅ Database successfully seeded!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}
main();
