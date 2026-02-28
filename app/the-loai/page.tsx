import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import type { GenreItem, GenreListApiResponse } from '@/types/otruyen';

async function getGenres(): Promise<GenreItem[]> {
  try {
    const res = await fetch('https://otruyenapi.com/v1/api/the-loai', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json: GenreListApiResponse = await res.json();
    return json.data?.items ?? [];
  } catch {
    return [];
  }
}

// Fixed color palette cycling per genre slug
const colorPalette = [
  { bg: 'bg-red-500/10', border: 'hover:border-red-500/40', text: 'text-red-400' },
  { bg: 'bg-orange-500/10', border: 'hover:border-orange-500/40', text: 'text-orange-400' },
  { bg: 'bg-amber-500/10', border: 'hover:border-amber-500/40', text: 'text-amber-400' },
  { bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/40', text: 'text-yellow-400' },
  { bg: 'bg-lime-500/10', border: 'hover:border-lime-500/40', text: 'text-lime-400' },
  { bg: 'bg-green-500/10', border: 'hover:border-green-500/40', text: 'text-green-400' },
  { bg: 'bg-teal-500/10', border: 'hover:border-teal-500/40', text: 'text-teal-400' },
  { bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/40', text: 'text-cyan-400' },
  { bg: 'bg-sky-500/10', border: 'hover:border-sky-500/40', text: 'text-sky-400' },
  { bg: 'bg-blue-500/10', border: 'hover:border-blue-500/40', text: 'text-blue-400' },
  { bg: 'bg-indigo-500/10', border: 'hover:border-indigo-500/40', text: 'text-indigo-400' },
  { bg: 'bg-violet-500/10', border: 'hover:border-violet-500/40', text: 'text-violet-400' },
  { bg: 'bg-purple-500/10', border: 'hover:border-purple-500/40', text: 'text-purple-400' },
  { bg: 'bg-fuchsia-500/10', border: 'hover:border-fuchsia-500/40', text: 'text-fuchsia-400' },
  { bg: 'bg-pink-500/10', border: 'hover:border-pink-500/40', text: 'text-pink-400' },
  { bg: 'bg-rose-500/10', border: 'hover:border-rose-500/40', text: 'text-rose-400' },
];

export default async function TheLoaiPage() {
  const genres = await getGenres();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">Thể loại</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl">Tất cả thể loại</h1>
          <p className="mt-2 text-sm text-slate-500">{genres.length} thể loại • Chọn thể loại bạn yêu thích</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {genres.map((genre, i) => {
            const color = colorPalette[i % colorPalette.length];
            return (
              <Link
                key={genre._id}
                href={`/the-loai/${genre.slug}`}
                className={`group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-white hover:shadow-lg ${color.border}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color.bg}`}>
                  <BookOpen className={`h-4 w-4 ${color.text}`} />
                </div>
                <span className="line-clamp-2 leading-tight">{genre.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
