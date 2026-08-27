type Params = {
  params: Promise<{ slug: string }>;
};
export default async function Page(props: Params) {
  const { slug } = await props.params;
  // const post = await getPostBySlug(slug);
  return (
    <div>
      <h1>title</h1>
      <p>content</p>
    </div>
  );
}
