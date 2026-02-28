import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Star,
  Filter,
  Grid3x3,
  List,
  ChevronRight,
  TrendingUp,
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
    <div className="min-h-screen bg-background pb-16 pt-20 transition-colors duration-300 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h1 className="text-xl font-black text-foreground sm:text-3xl md:text-4xl">Thư viện của tôi</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{mockComics.length}</span> bộ truyện đang theo dõi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:text-white">
              <Filter className="h-4 w-4" />
              Lọc
            </button>
            <div className="flex rounded-xl border border-slate-700 bg-slate-800 p-1">
              <button className="rounded-lg bg-slate-700 p-2 text-white">
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button className="p-2 text-slate-500 transition-colors hover:text-slate-300">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 rounded-2xl border border-slate-800 bg-slate-900 p-1 w-fit">
          {['Đang đọc', 'Đã hoàn thành', 'Yêu thích', 'Sẽ đọc'].map((tab, i) => (
            <button
              key={tab}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200'
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
              className="group flex flex-col"
            >
              {/* Cover */}
              <div className={`relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
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
              <div>
                <h3 className="mb-0.5 truncate text-sm font-bold text-slate-100 transition-colors group-hover:text-white">
                  {comic.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{comic.genre}</span>
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
            <h2 className="text-xl font-black text-white">Lịch sử đọc gần đây</h2>
            <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {mockComics.slice(0, 4).map((comic, i) => (
              <div key={comic.id} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-900">
                <div className={`flex h-12 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i]}`}>
                  <BookOpen className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-slate-200">{comic.title}</p>
                  <p className="text-sm text-slate-500">{comic.chapter}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
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
