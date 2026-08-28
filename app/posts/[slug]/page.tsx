import Avatar from "@/app/_components/avatar";
import Container from "@/app/_components/container";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import { Post } from "@/app/interfaces/post";
import { getAllPosts, getPostBySlug } from "@/app/lib/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ slug: string }>;
};
export default async function Page(props: Params) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return (
    <main>
      <Container>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mid:tracking-tigher leading-tight mb-20 mt-8 flex items-center">
          <Link href={"/"} className="hover:underline">
            Blog
          </Link>
          .
        </h2>
        <h1 className="text-7xl font-black pb-5">{post.title}</h1>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <Avatar picture={post.author.picture} author={post.author.name} />
        </div>

        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={post.title} src={post.imageUrl} />
        </div>
        <h4 className="mb-6 mx-auto max-w-2xl text-lg">
          <DateFormatter date={post.date} />
        </h4>
        <div className="mx-auto mb-25 max-w-2xl">{post.body}</div>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with Markdown`;

  return {
    title,
    openGraph: {
      title,
      images: [post.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
