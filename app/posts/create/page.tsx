import PostForm from "@/app/_components/post-form";
import { verifySession } from "@/app/lib/dal";

export default async function CreatePostPage() {
  const user = await verifySession();

  // Guard clause if user is not authenticated
  if (user.isAuth == false || !user) {
    return (
      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>Access Denied</h1>
        <p>You must be logged in to create a post.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Create New Post
        </h1>
        <p style={{ color: "#666" }}>
          Fill out the details below to publish a new article.
        </p>
      </header>

      {/* Renders the client-side form component, injecting the server-validated user ID */}
      <PostForm currentUserId={user.userId} />
    </main>
  );
}
