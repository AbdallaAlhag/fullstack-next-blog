import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function HeaderButtons() {
  const session = await auth();

  const btnStyle =
    "text-md font-bold  text-zinc-600 hover:text-black transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-black after:transition-all ";

  return (
    <nav aria-label="Header navigation">
      {!session?.user ? (
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-md font-bold text-zinc-600 hover:text-black transition-colors duration-200  "
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex gap-5">
          <div className={btnStyle}>
            <Link href="/more-posts">My Posts</Link>
          </div>
          <div className={btnStyle}>
            <Link href="/posts/create">Create</Link>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-md font-bold text-zinc-400 hover:text-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
