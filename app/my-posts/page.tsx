import PostsLayout from "@/app/_components/posts-layout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
export default async function Page({ searchParams }: Props) {
  const [session, resolvedParams] = await Promise.all([auth(), searchParams]);
  // console.log("user id type", typeof session?.user.id);
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <PostsLayout page={resolvedParams.page} userId={Number(session.user.id)} />
  );
}
