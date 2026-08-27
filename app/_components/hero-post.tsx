import { Author } from "@/app/interfaces/author";
import CoverImage from "@/app/_components/cover-image";
import Avatar from "@/app/_components/avatar";
import Link from "next/link";
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
    <section className=" mb-8 md:md-16">
      <div className="mb-8 md:mb-16">
        <CoverImage
          src={props.imageUrl}
          title={props.title}
          slug={props.slug}
        />
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          {/* TODO: fix href */}
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              href={"/"}
              className="text-2xl font-semibold hover:underline cursor-pointer leading-tight"
            >
              {props.title}
            </Link>
          </h3>
          <h4 className="mb-4 md:mb-0 text-lg">{props.date}</h4>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{props.excerpt}</p>
          <Avatar picture={props.author.picture} author={props.author.name} />
        </div>
      </div>
    </section>
  );
}
