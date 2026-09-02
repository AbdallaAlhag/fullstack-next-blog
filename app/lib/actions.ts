"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, FormState } from "@/app/interfaces/definitions";
import z from "zod";
import { createUser } from "./api";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { deleteSession } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;
  try {
    const user = await createUser({ name, email, password });
    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }
    await createSession(user.id);
  } catch (error) {
    return { message: "Database error: Failed to create user." };
  }

  redirect("/");
}
export async function logout() {
  await deleteSession();
  redirect("/login");
}
type createPostProps = {
  author_name: string;
  author_picture: string;
  body: string;
  excerpt: string;
  image_url: string;
  slug: string;
  title: string;
  user_id: number;
};
export async function createPost(rawData: createPostProps) {
  // Extract fields matching your schema
  // const rawData = {
  //   author_name: formData.get("author_name"),
  //   author_picture: formData.get("author_picture"),
  //   body: formData.get("body"),
  //   excerpt: formData.get("excerpt"),
  //   image_url: formData.get("image_url"),
  //   slug: formData.get("slug"),
  //   title: formData.get("title"),
  //   user_id: Number(formData.get("user_id")), // Foreign key references users(id)
  // };

  // Validate required fields
  if (
    !rawData.author_name ||
    !rawData.body ||
    !rawData.slug ||
    !rawData.title ||
    !rawData.user_id
  ) {
    return { error: "Missing required fields" };
  }

  try {
    // Insert into database logic goes here (e.g., Prisma, Drizzle, pg)
    // UUID (id) and TIMESTAMPTZ (date) will generate automatically at database level

    createPost(rawData);

    revalidatePath("/posts");
    return { success: true };
  } catch (err) {
    return { error: "Failed to create post" };
  }
}
