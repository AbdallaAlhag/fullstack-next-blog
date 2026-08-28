import { notFound } from "next/navigation";
import Container from "@/app/_components/container";
import PostHeader from "@/app/_components/post-header";
import MoreStories from "@/app/_components/more-stories";
import { getAllPosts } from "@/app/lib/api";
import { type Post } from "@/app/interfaces/post";

export default async function Page() {
  const allPosts: Post[] = await getAllPosts();
  if (!allPosts || allPosts.length === 0) return notFound();
  return (
    <main>
      <Container>
        <PostHeader />
        {allPosts.length > 0 && <MoreStories posts={allPosts.slice(0, 10)} />}
      </Container>
    </main>
  );
}
