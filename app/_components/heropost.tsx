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
    <section className="flex flex-col gap-10 mb-8 md:md-16">
      <div className="relative w-full h-100">
        <Image
          src={props.imageUrl}
          fill
          alt={`${props.title} cover image`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="grayscale-85 object-cover"
        />
      </div>
      <div className="flex flex-row justify-between  gap-5">
        <div className="flex flex-col gap-5">
          <a className="text-2xl font-semibold hover:underline cursor-pointer leading-tight">
            {props.title}
          </a>
          <h4>{props.date}</h4>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-lg leading-relaxed">{props.excerpt}</p>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <Image
              src={props.author.picture}
              width={50}
              height={50}
              alt={`${props.author} profile picture`}
              className="rounded-3xl grayscale-85"
            />
            <h1 className="font-bold text-lg">{props.author.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
