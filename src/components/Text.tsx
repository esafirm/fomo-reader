export function Title({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={`font-bold text-xl ${className}`}>{children}</p>;
}

export function SubTitle({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={`font-bold text-lg ${className}`}>{children}</p>;
}

export function Content({ children }: { children: string }) {
  return (
    <p className="text-gray-600 m-t-4 overflow-x-auto">
      {children.split('*').map((text, index) => {
        if (index % 2 === 1) {
          return <strong className="text-blue-500" key={index}>{text}</strong>;
        } else {
          return text;
        }
      })}
    </p>
  );
}
