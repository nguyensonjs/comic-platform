import './globals.css';

import { Footer, Header } from './components/layout';

import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import { ThemeProvider } from './components/providers/ThemeProvider';
import { AuthProvider } from './components/providers/AuthProvider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NetComic | Kho Truyện Tranh Online',
  description:
    'Khám phá thế giới truyện tranh, manga, manhwa và webtoon phong phú nhất với NetComic. Đọc truyện online chất lượng cao.',
  keywords: 'NetComic, truyện tranh, manga, manhwa, webtoon, tiểu thuyết, đọc truyện online',
  authors: [{ name: 'NetComic Team' }],
  openGraph: {
    title: 'NetComic | Kho Truyện Tranh Online',
    description: 'Khám phá thế giới truyện tranh và tiểu thuyết phong phú cùng NetComic',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} font-display selection:bg-primary/30 selection:text-primary min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="min-h-screen transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
