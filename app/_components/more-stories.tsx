import { type Post } from "@/app/interfaces/post";
import PostPreview from "@/app/_components/post-preview";
import Link from "next/link";

interface Props {
  posts: Post[];
  homePage?: boolean;
}
export default function MoreStories({ posts, homePage = false }: Props) {
  return (
    <section className="">
      {homePage && (
        <h1 className="text-5xl md:text-7xl tracking-tigher leading-tight font-bold mb-8">
          <Link href={"/more-posts"} className="hover:underline">
            More Stories &gt;&gt;
          </Link>
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post: Post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
