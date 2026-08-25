export default function Intro() {
  return (
    <section className="mt-16 mb-16 flex items-center flex-col md:justify-between md:flex-row gap-10">
      <h1 className="text-8xl font-black">Blog.</h1>
      <h4 className="text-center md:text-left text-lg mt-5">
        A dynamically generated blog example using{" "}
        <a
          href="https://github.com/AbdallaAlhag/simple-blog-app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer hover:text-blue-500"
        >
          Next.js
        </a>{" "}
        and Markdown.
      </h4>
    </section>
  );
}
