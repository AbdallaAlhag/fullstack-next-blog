"use client";

import React, { useState } from "react";
import { createPost } from "@/app/lib/actions";

interface PostFormProps {
  currentUserId: number;
}
export default function PostForm({ currentUserId }: PostFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const postData = {
      author_name: String(formData.get("author_name") ?? ""),
      author_picture: String(formData.get("author_picture") ?? ""),
      body: String(formData.get("body") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      image_url: String(formData.get("image_url") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      title: String(formData.get("title") ?? ""),
      user_id: Number(formData.get("user_id")),
    };
    const result = await createPost(postData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      event.currentTarget.reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "500px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Hidden input to pass the user_id foreign key */}
      <input type="hidden" name="user_id" value={currentUserId} />

      <div>
        <label style={{ display: "block" }}>Title *</label>
        <input type="text" name="title" required style={{ width: "100%" }} />
      </div>

      <div>
        <label style={{ display: "block" }}>Slug *</label>
        <input type="text" name="slug" required style={{ width: "100%" }} />
      </div>

      <div>
        <label style={{ display: "block" }}>Author Name *</label>
        <input
          type="text"
          name="author_name"
          required
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label style={{ display: "block" }}>Author Picture URL</label>
        <input type="url" name="author_picture" style={{ width: "100%" }} />
      </div>

      <div>
        <label style={{ display: "block" }}>Featured Image URL</label>
        <input type="url" name="image_url" style={{ width: "100%" }} />
      </div>

      <div>
        <label style={{ display: "block" }}>Excerpt</label>
        <input type="text" name="excerpt" style={{ width: "100%" }} />
      </div>

      <div>
        <label style={{ display: "block" }}>Body Content *</label>
        <textarea name="body" required rows={6} style={{ width: "100%" }} />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.5rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
