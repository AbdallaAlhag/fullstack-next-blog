"use client";

import { useActionState, useEffect, useRef } from "react";
import { createUserPost } from "@/app/lib/actions";
import { redirect } from "next/navigation";

interface PostFormProps {
  currentUserId: number;
}

export default function PostForm({ currentUserId }: PostFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const postData = {
        body: String(formData.get("body") ?? ""),
        image_url: String(formData.get("image_url") ?? ""),
        title: String(formData.get("title") ?? ""),
      };
      return await createUserPost(postData);
    },
    null,
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      redirect("/more-posts");
    }
  }, [state]);

  // Clean Tailwind abstraction patterns matching your CSS variables preference
  const inputClass =
    "w-full mt-1 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 box-border";
  const labelClass =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300";

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-5 w-full max-w-137.5 mx-auto p-8 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 font-sans"
    >
      {state?.error && (
        <div className="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 p-3 rounded-md text-sm border border-red-200 dark:border-red-900">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-md text-sm border border-emerald-200 dark:border-emerald-900">
          Post created successfully!
        </div>
      )}

      {/* <input type="hidden" name="user_id" value={currentUserId} /> */}

      <div>
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          name="title"
          required
          className={inputClass}
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label className={labelClass}>Featured Image URL</label>
        <input
          type="url"
          name="image_url"
          className={inputClass}
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className={labelClass}>Body Content *</label>
        <textarea
          name="body"
          required
          rows={6}
          className={`${inputClass} resize-y`}
          placeholder="Write your post content here..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`mt-2 p-3.5 rounded-md font-semibold text-base transition-colors duration-200 text-white
          ${
            isPending
              ? "bg-emerald-300 dark:bg-emerald-800/50 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 cursor-pointer"
          }`}
      >
        {isPending ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
}
