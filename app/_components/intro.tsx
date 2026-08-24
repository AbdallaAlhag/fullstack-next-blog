import Container from "./container";

export default function Intro() {
  return (
    <main>
      <Container>
        <div className="pt-10 flex justify-content items-center flex-row gap-10">
          <h1 className="text-8xl font-black">Blog.</h1>
          <p>A statically generated blog example using Next.js and Markdown.</p>
        </div>
      </Container>
    </main>
  );
}
