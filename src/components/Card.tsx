import Link from 'next/link';

type CardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function Card(props: CardProps) {
  const cls = `border border-black p-4 rounded-lg shadow-md ${props.className}`;

  if (props.href) {
    const finalCls = `${cls} cursor-pointer hover:shadow-xl transition duration-200`;
    return (
      <Link href={props.href} className={finalCls}>
        {props.children}
      </Link>
    );
  }

  return <div className={cls}>{props.children}</div>;
}
