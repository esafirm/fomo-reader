'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavMenus = {
  target: string;
  label: string;
};

type NavBarProps = {
  menus: NavMenus[];
};

const menuClass = 'rounded px-4 py-2 hover:bg-slate-300';
const selectedClass = `${menuClass} bg-slate-200`;

export default function NavBar(props: NavBarProps) {
  const path = usePathname().substring(1);

  return (
    <div className="flex flex-col lg:flex-row mt-4 lg:space-x-2">
      <span className="sm:text-lg text-xl bg-slate-100 rounded px-4 py-2 tracking-tighter font-bold">
        FOMO Reader
      </span>

      <section className="py-4 space-x-2">
        {props.menus.map((menu, index) => {
          const isSelected = path.startsWith(menu.target.substring(1));
          const className = isSelected ? selectedClass : menuClass;

          return (
            <Link key={index} className={className} href={menu.target}>
              {menu.label}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
