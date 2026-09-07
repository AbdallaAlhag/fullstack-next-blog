// @/app/_components/posts-layout.tsx
import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import PostHeader from "@/app/_components/post-header";
import MoreStories from "@/app/_components/more-stories";
import Pagination from "@/app/_components/pagination";
import { GetPostsWithLimit, getTotalPages } from "@/app/lib/api";

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

  if (!posts || posts.length === 0) return notFound();

  return (
    <main>
      <Container>
        <PostHeader />
        {posts.length > 0 && <MoreStories posts={posts} />}
        <Pagination totalPages={totalPages} />
      </Container>
    </main>
  );
}
