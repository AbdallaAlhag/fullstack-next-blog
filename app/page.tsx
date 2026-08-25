import Container from "@/app/_components/container";
import Intro from "@/app/_components/intro";
import { getAllPosts } from "@/app/lib/api";
import HeroPost from "@/app/_components/hero-post";
import MoreStories from "@/app/_components/more-stories";
export default async function Home() {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1, 3);
  console.log(allPosts);
  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          imageUrl={heroPost.imageUrl}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
