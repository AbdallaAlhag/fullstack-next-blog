import { type Post } from "@/app/interfaces/post";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { deletePostAction } from "@/app/lib/actions";
type Props = {
  post: Post;
  isAuthor: boolean;
};
export default function PostPreview({ post, isAuthor }: Props) {
  return (
    <section className="gap-5">
      <div className="mb-5">
        <CoverImage title={post.title} src={post.imageUrl} slug={post.slug} />
      </div>
      <h3 className="flex justify-between items-center  text-3xl mb-3 leading-snug">
        <Link href={`posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>{" "}
        {isAuthor && (
          <form action={deletePostAction} className="flex items-center">
            <input type="hidden" name="postId" value={post.id} />
            <button
              type="submit"
              className="text-xs border border-zinc-200 text-zinc-500 hover:text-red-600 hover:border-red-200 rounded px-2 py-1 transition-colors cursor-pointer"
            >
              Delete Post
            </button>
          </form>
        )}
      </h3>
      <h3 className="text-lg mb-4">
        <DateFormatter date={post.date} />
      </h3>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
      <Avatar picture={post.author.picture} author={post.author.name} />
    </section>
  );
}
