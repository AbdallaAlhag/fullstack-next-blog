import Image from "next/image";
type Props = {
  title: string;
  src: string;
  slug: string;
};
export default function CoverImage({ title, src, slug }: Props) {
  return (
    <Image
      src={src}
      fill
      alt={`${title} cover image`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="grayscale-85 object-cover"
    />
  );
}
