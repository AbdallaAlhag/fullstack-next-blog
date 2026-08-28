import Link from "next/link";

export default function PostHeader() {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mid:tracking-tigher leading-tight mb-20 mt-8 flex items-center">
      <Link href={"/"} className="hover:underline">
        Blog
      </Link>
      .
    </h2>
  );
}
