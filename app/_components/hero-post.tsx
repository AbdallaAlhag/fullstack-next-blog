import { Author } from "@/app/interfaces/author";
import CoverImage from "@/app/_components/cover-image";
import Avatar from "@/app/_components/avatar";
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
        <CoverImage
          src={props.imageUrl}
          title={props.title}
          slug={props.slug}
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
            <Avatar picture={props.author.picture} author={props.author.name} />
            <h1 className="font-bold text-lg">{props.author.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
