// @/app/_components/posts-layout.tsx
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import PostHeader from "@/app/_components/post-header";
import MoreStories from "@/app/_components/more-stories";
import Pagination from "@/app/_components/pagination";
import { GetPostsWithLimit, getTotalPages } from "@/app/lib/api";
import Link from "next/link";

interface PostsLayoutProps {
  page?: string;
  userId?: number;
}

export default async function PostsLayout({ page, userId }: PostsLayoutProps) {
  const currentPage = Number(page) || 1;
  const LIMIT = 10;

  const [posts, totalPages] = await Promise.all([
    GetPostsWithLimit({ limit: LIMIT, page: currentPage, id: userId }),
    getTotalPages(LIMIT, userId),
  ]);

  if (!posts) return notFound();

  return (
    <main>
      <Container>
        <PostHeader />
        {posts.length > 0 ? (
          <MoreStories posts={posts} currentUserId={userId} />
        ) : (
          <section className="flex flex-col gap-5 text-4xl items-center justify-center h-screen">
            <h1>No blogs posted </h1>
            <div className="text-md font-bold  text-zinc-600 hover:text-black transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-black after:transition-all">
              <Link href="/posts/create">Create a post</Link>
            </div>
          </section>
        )}
        <Pagination totalPages={totalPages} />
      </Container>
    </main>
  );
}
