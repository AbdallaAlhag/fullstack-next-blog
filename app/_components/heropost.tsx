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
    <section className="flex flex-col">
      <div>
        <Image
          src={props.imageUrl}
          width={1000}
          height={760}
          alt={`${props.title} cover image`}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <a>
            <h1>{props.title}</h1>
          </a>
          <h4>{props.date}</h4>
        </div>
        <div className="flex flex-col">
          <div>
            <p>{props.excerpt}</p>
          </div>
          <div className="flex flex-row">
            <Image
              src={props.author.picture}
              width={50}
              height={50}
              alt={`${props.author} profile picture`}
            />
            <h1>{props.author.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
