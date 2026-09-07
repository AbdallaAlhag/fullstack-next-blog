import PostsLayout from "@/app/_components/posts-layout";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
export default async function Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  return <PostsLayout page={resolvedParams.page} />;
}
