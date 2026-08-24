import Container from "@/app/_components/container";
import Intro from "./_components/intro";
export default function Home() {
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
