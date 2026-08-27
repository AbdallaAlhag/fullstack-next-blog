import Container from "@/app/_components/container";
import Intro from "@/app/_components/intro";
import { getAllPosts } from "@/app/lib/api";
import HeroPost from "@/app/_components/hero-post";
import MoreStories from "@/app/_components/more-stories";
import { Post } from "@/app/interfaces/post";

export default async function Home() {
  const allPosts = await getAllPosts();
  console.log(allPosts);
  const randomizedPosts = shuffle(allPosts);
  const heroPost = randomizedPosts[0];
  const morePosts = randomizedPosts.slice(1, 3);
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

function shuffle(array: Post[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements using array destructuring
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
