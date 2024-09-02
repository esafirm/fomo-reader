import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FOMO Reader',
  description: 'A reader app for FOMO forum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col px-4 lg:px-32">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}

const NavMenus = [
  { target: '/', label: 'Home' },
  { target: '/review', label: 'Review' },
  { target: '/salary', label: 'Salary' },
];

function NavBar() {
  return (
    <div className="flex flex-col lg:flex-row mt-4 lg:space-x-2">
      <span className="sm:text-lg text-xl bg-slate-100 rounded px-4 py-2 tracking-tighter font-bold">
        FOMO Reader
      </span>

      <section className="py-4 space-x-2">
        {NavMenus.map((menu, index) => (
          <Link
            key={index}
            className="rounded px-4 py-2 hover:bg-slate-300"
            href={menu.target}
          >
            {menu.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
