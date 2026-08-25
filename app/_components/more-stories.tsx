import { type Post } from "@/app/interfaces/post";

interface Props {
  posts: Post[];
}
export default function MoreStories({ posts }: Props) {
  return (
    <section>
      <h1 className="text-8xl font-black">More Stories</h1>
      <div>
        {posts.map((post: Post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </section>
  );
}
