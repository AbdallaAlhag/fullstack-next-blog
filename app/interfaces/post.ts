import { Author } from "./author";

export type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  date: number;
  author: Author;
  excerpt: string;
  slug: string;
};

export type IntialPlaceholderPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
