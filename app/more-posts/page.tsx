import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import PostHeader from "@/app/_components/post-header";
import MoreStories from "@/app/_components/more-stories";
import { GetPostsWithLimit, getTotalPages } from "@/app/lib/api";
import Pagination from "@/app/_components/pagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const LIMIT = 10;

  const [posts, totalPages] = await Promise.all([
    GetPostsWithLimit({ limit: LIMIT, page: currentPage }),
    getTotalPages(LIMIT),
  ]);

  if (!posts || posts.length === 0) return notFound();
  return (
    <main>
      <Container>
        <PostHeader />
        <Pagination totalPages={totalPages} />
        {posts.length > 0 && <MoreStories posts={posts} />}
      </Container>
    </main>
  );
}
