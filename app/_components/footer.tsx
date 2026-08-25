import Container from "./container";

export default function Footer() {
  return (
    <footer className=" bg-zinc-50 border-t border-gray-100 text-md font-semibold">
      <Container>
        <div className="flex flex-col gap-10 items-center justify-center py-27">
          <h1 className="text-3xl font-black">
            Dynamically Generated with Next.js
          </h1>
          <div className="flex justify-center items-center gap-10 flex-col lg:flex-row lg:gap-10 ">
            <a
              href="https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-black text-white py-3 px-10 hover:bg-white hover:text-black cursor-pointer border">
                Read Documentation
              </button>{" "}
            </a>
            <a
              href="https://github.com/AbdallaAlhag/simple-blog-app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
