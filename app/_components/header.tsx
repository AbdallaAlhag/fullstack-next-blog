export default function Header() {
  return (
    <header className="flex items-center justify-center py-1 bg-zinc-50 border-b border-gray-100">
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
    </header>
  );
}
