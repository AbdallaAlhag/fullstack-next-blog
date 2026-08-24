type props = {
  children?: React.ReactNode;
};

export default function Container({ children }: props) {
  return <div className="container mx-auto px-5">{children}</div>;
}
