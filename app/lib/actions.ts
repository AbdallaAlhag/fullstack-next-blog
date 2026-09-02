"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, FormState } from "@/app/interfaces/definitions";
import z from "zod";
import { createUser } from "./api";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { cookies } from "next/headers";
import { deleteSession } from "@/app/lib/session";
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
