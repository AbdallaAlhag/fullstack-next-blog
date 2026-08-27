import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
type Props = {
  title: string;
  src: string;
  slug?: string;
};
export default function CoverImage({ title, src, slug }: Props) {
  const image = (
    <Image
      src={src}
      width={1300}
      height={630}
      alt={`${title} cover image`}
      className={cn("greyscale-85 shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        // TODO: Fix href
        <Link href={"/"} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}{" "}
    </div>
  );
}
