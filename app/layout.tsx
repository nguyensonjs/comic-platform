import './globals.css';

import { Footer, Header } from './components/layout';

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cosmic Cultivation | Kho Truyện Tranh',
  description:
    'Khám phá thế giới truyện tranh và tiểu thuyết phong phú với hàng ngàn tác phẩm hấp dẫn.',
  keywords: 'truyện tranh, manga, manhwa, webtoon, tiểu thuyết, đọc truyện online',
  authors: [{ name: 'Cosmic Cultivation Team' }],
  openGraph: {
    title: 'Cosmic Cultivation | Kho Truyện Tranh',
    description: 'Khám phá thế giới truyện tranh và tiểu thuyết phong phú',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${spaceGrotesk.variable} font-display bg-background-light dark:bg-background-dark selection:bg-primary/30 selection:text-primary min-h-screen text-slate-900 antialiased dark:text-slate-100`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
