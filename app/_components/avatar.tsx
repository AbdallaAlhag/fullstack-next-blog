import Image from "next/image";
type Props = {
  picture: string;
  author: string;
};
export default function Avatar({ picture, author }: Props) {
  return (
    <Image
      src={picture}
      width={50}
      height={50}
      alt={`${author} profile picture`}
      className="rounded-3xl grayscale-85"
    />
  );
}
