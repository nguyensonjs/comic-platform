import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Star,
  Filter,
  Grid3x3,
  List,
  ChevronRight,
} from 'lucide-react';

const mockComics = [
  { id: 1, title: 'Đấu La Đại Lục', chapter: 'Chapter 398', genre: 'Huyền huyễn', rating: 4.9, cover: '1' },
  { id: 2, title: 'Thánh Khư', chapter: 'Chapter 220', genre: 'Hành động', rating: 4.8, cover: '2' },
  { id: 3, title: 'Diêu Chí Tiên Kiếm', chapter: 'Chapter 115', genre: 'Tiên hiệp', rating: 4.7, cover: '3' },
  { id: 4, title: 'Solo Leveling', chapter: 'Chapter 179', genre: 'Hành động', rating: 4.9, cover: '4' },
  { id: 5, title: 'One Piece', chapter: 'Chapter 1109', genre: 'Phiêu lưu', rating: 4.8, cover: '5' },
  { id: 6, title: 'Jujutsu Kaisen', chapter: 'Chapter 256', genre: 'Hành động', rating: 4.7, cover: '6' },
  { id: 7, title: 'Spy x Family', chapter: 'Chapter 95', genre: 'Hài hước', rating: 4.9, cover: '7' },
  { id: 8, title: 'Blue Lock', chapter: 'Chapter 270', genre: 'Thể thao', rating: 4.8, cover: '8' },
];

const gradients = [
  'from-blue-600 to-indigo-700',
  'from-purple-600 to-pink-600',
  'from-teal-600 to-cyan-500',
  'from-orange-600 to-red-600',
  'from-green-600 to-emerald-500',
  'from-violet-600 to-purple-700',
  'from-rose-600 to-pink-500',
  'from-amber-600 to-orange-500',
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pb-16 pt-20 transition-colors duration-500 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950 sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
          <div>
            <h1 className="text-xl font-black text-zinc-950 dark:text-white sm:text-3xl md:text-4xl">Thư viện của tôi</h1>
            <p className="mt-1 text-zinc-500 dark:text-slate-400">
              <span className="font-semibold text-zinc-800 dark:text-slate-200">{mockComics.length}</span> bộ truyện đang theo dõi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white">
              <Filter className="h-4 w-4" />
              Lọc
            </button>
            <div className="flex rounded-xl border border-zinc-200 bg-white/90 p-1 shadow-sm shadow-zinc-950/5 dark:border-slate-700 dark:bg-slate-900/70">
              <button className="rounded-lg bg-zinc-900 p-2 text-white dark:bg-slate-700">
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button className="p-2 text-zinc-400 transition-colors hover:text-zinc-700 dark:text-slate-500 dark:hover:text-slate-300">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex w-fit gap-1 rounded-2xl border border-zinc-200 bg-white/90 p-1 shadow-sm shadow-zinc-950/5 dark:border-slate-800 dark:bg-slate-950/70">
          {['Đang đọc', 'Đã hoàn thành', 'Yêu thích', 'Sẽ đọc'].map((tab, i) => (
            <button
              key={tab}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-gradient-to-r dark:from-sky-500 dark:via-blue-500 dark:to-indigo-500'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {mockComics.map((comic, i) => (
            <Link
              key={comic.id}
              href={`/truyen/${comic.id}`}
              className="group flex flex-col rounded-2xl border border-zinc-200/70 bg-white/80 p-2 shadow-lg shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/10 dark:border-slate-800/70 dark:bg-slate-950/45 dark:shadow-black/20"
            >
              {/* Cover */}
              <div className={`relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                {/* Mock cover content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <BookOpen className="mb-2 h-10 w-10 text-white/40" />
                  <span className="text-sm font-bold text-white/70 leading-tight">{comic.title}</span>
                </div>
                {/* Chapter badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <span className="text-xs font-semibold text-slate-200">{comic.chapter}</span>
                </div>
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-black/30">
                  <div
                    className="h-full bg-blue-400"
                    style={{ width: `${60 + (i * 7) % 35}%` }}
                  />
                </div>
              </div>
              {/* Info */}
              <div className="px-1 pb-1">
                <h3 className="mb-0.5 truncate text-sm font-bold text-zinc-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-white">
                  {comic.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-slate-500">{comic.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-400">{comic.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">Lịch sử đọc gần đây</h2>
            <button className="flex items-center gap-1 text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {mockComics.slice(0, 4).map((comic, i) => (
              <div key={comic.id} className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-lg shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800/70 dark:bg-slate-950/45 dark:shadow-black/20 dark:hover:border-slate-700 dark:hover:bg-slate-900/80">
                <div className={`flex h-12 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i]}`}>
                  <BookOpen className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-zinc-900 dark:text-slate-200">{comic.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-slate-500">{comic.chapter}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{i + 1}h trước</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
