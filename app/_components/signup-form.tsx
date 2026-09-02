"use client";

import { signup } from "@/app/lib/actions";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      {" "}
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {" "}
        <h1 className={` mb-3 text-2xl`}>Sign up to continue</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                name="name"
                placeholder="Name"
              />
            </div>
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                name="password"
                type="password"
              />
            </div>
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li className="text-sm text-red-500" key={error}>
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="mt-4 p-2 rounded-md w-full m-auto cursor-pointer hover:bg-black hover:text-white"
            disabled={pending}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
