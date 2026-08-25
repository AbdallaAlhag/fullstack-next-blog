import { Author } from "@/app/interfaces/author";
import Image from "next/image";
type Props = {
  title: string;
  imageUrl: string;
  date: string;
  author: Author;
  slug: string;
  excerpt: string;
};

export default function HeroPost(props: Props) {
  return (
    <section className="flex flex-col gap-10">
      <div>
        <Image
          src={props.imageUrl}
          width={1000}
          height={760}
          alt={`${props.title} cover image`}
        />
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-5">
          <a className="text-2xl font-semibold hover:underline cursor-pointer">
            {props.title}
          </a>
          <h4>{props.date}</h4>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p>{props.excerpt}</p>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <Image
              src={props.author.picture}
              width={50}
              height={50}
              alt={`${props.author} profile picture`}
              className="rounded-3xl"
            />
            <h1 className="font-bold text-lg">{props.author.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
