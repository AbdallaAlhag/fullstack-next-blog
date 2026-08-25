import Container from "@/app/_components/container";
import Intro from "./_components/intro";
import { getAllPosts } from "./lib/api";
export default async function Home() {
  const allPosts = await getAllPosts();
  // const heroPost = allPost[0];
  // const morePosts = allPosts.slice(1);
  console.log(allPosts);
  return (
    <main>
      <Container>
        <Intro />
        {/* <HeroPost /> */}
        {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
      </Container>
    </main>
  );
}
