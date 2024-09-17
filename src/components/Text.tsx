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
    <p className="text-gray-600 m-t-4 overflow-x-auto whitespace-pre-wrap">
      {children.split(/(\*.*?\*)/).map((segment, index) => {
        if (segment.startsWith('*') && segment.endsWith('*')) {
          const text = segment.slice(1, -1);
          if (text.startsWith('@')) {
            return (
              <strong className="text-blue-500" key={index}>
                {text}
              </strong>
            );
          }
          return `*${text}*`;
        }
        return segment;
      })}
    </p>
  );
}
