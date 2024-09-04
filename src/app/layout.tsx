import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FOMO Reader',
  description: 'A reader app for FOMO forum',
};

const NavMenus = [
  { target: '/feed', label: 'Feed' },
  { target: '/review', label: 'Review' },
  { target: '/salary', label: 'Salary' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col px-4 lg:px-32">
          <NavBar menus={NavMenus} />
          {children}
        </div>
      </body>
    </html>
  );
}
