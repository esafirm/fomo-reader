type CardProps = {
  children: React.ReactNode;
};

export default function Card(props: CardProps) {
  return (
    <div className="border border-black p-4 rounded-lg shadow-md">
      {props.children}
    </div>
  );
}
