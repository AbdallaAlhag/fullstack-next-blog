import Container from "./container";
import HeaderButtons from "./header-buttons";

export default function Header() {
  return (
    <header className=" py-1 bg-zinc-50 border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between">
          <p className="font-thin text-sm">
            The source code for this blog is{" "}
            <a
              href="https://github.com/AbdallaAlhag/simple-blog-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline hover:text-blue-500 cursor-pointer">
                available on Github
              </span>
            </a>
          </p>
          <HeaderButtons />
        </div>
      </Container>
    </header>
  );
}
