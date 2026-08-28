import { type Post } from "@/app/interfaces/post";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import Link from "next/link";
import DateFormatter from "./date-formatter";
type Props = {
  post: Post;
};
export default function PostPreview({ post }: Props) {
  return (
    <section className="gap-5">
      <div className="mb-5">
        <CoverImage title={post.title} src={post.imageUrl} slug={post.slug} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <h3 className="text-lg mb-4">
        <DateFormatter date={post.date} />
      </h3>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
      <Avatar picture={post.author.picture} author={post.author.name} />
    </section>
  );
}
