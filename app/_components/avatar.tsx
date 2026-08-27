import Image from "next/image";
type Props = {
  picture: string;
  author: string;
};
export default function Avatar({ picture, author }: Props) {
  return (
    <div className="flex items-center">
      <Image
        src={picture}
        width={50}
        height={50}
        alt={`${author} profile picture`}
        className="mr-4 rounded-full grayscale-85"
      />
      <div className="text-xl font-bold">{author}</div>
    </div>
  );
}
