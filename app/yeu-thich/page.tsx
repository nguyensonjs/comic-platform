import Link from 'next/link';
import {
  Heart,
  BookOpen,
  Star,
  Trash2,
  Filter,
  ArrowRight,
} from 'lucide-react';

const favorites = [
  { id: 1, title: 'Đấu La Đại Lục', genre: 'Huyền huyễn', chapters: 398, rating: 4.9, status: 'Đang ra', gradient: 'from-blue-600 to-indigo-700' },
  { id: 2, title: 'Solo Leveling', genre: 'Hành động', chapters: 179, rating: 4.9, status: 'Hoàn thành', gradient: 'from-purple-600 to-pink-600' },
  { id: 3, title: 'One Piece', genre: 'Phiêu lưu', chapters: 1109, rating: 4.8, status: 'Đang ra', gradient: 'from-orange-600 to-red-600' },
  { id: 4, title: 'Jujutsu Kaisen', genre: 'Hành động', chapters: 256, rating: 4.7, status: 'Đang ra', gradient: 'from-teal-600 to-cyan-500' },
  { id: 5, title: 'Spy x Family', genre: 'Hài hước', chapters: 95, rating: 4.9, status: 'Đang ra', gradient: 'from-rose-600 to-pink-500' },
  { id: 6, title: 'Blue Lock', genre: 'Thể thao', chapters: 270, rating: 4.8, status: 'Đang ra', gradient: 'from-amber-600 to-orange-500' },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background pb-16 pt-20 transition-colors duration-300 sm:pb-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex flex-wrap items-center gap-2 text-xl font-black text-foreground sm:gap-3 sm:text-3xl md:text-4xl">
              Yêu thích
              <Heart className="h-7 w-7 fill-pink-500 text-pink-500" />
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{favorites.length}</span> tác phẩm yêu thích
            </p>
          </div>
          <button className="flex w-fit items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:text-white">
            <Filter className="h-4 w-4" />
            Sắp xếp
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {favorites.map((comic) => (
            <div
              key={comic.id}
              className="group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl"
            >
              {/* Cover */}
              <div className={`flex h-20 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${comic.gradient} shadow-lg`}>
                <BookOpen className="h-6 w-6 text-white/60" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mb-1 font-bold text-white transition-colors group-hover:text-blue-300">
                      {comic.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{comic.genre}</span>
                      <span className="text-slate-700">•</span>
                      <span>{comic.chapters} chapters</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          comic.status === 'Hoàn thành'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-blue-500/15 text-blue-400'
                        }`}
                      >
                        {comic.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-400">{comic.rating}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/truyen/${comic.id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-blue-500"
                >
                  Đọc ngay
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button className="rounded-xl p-2 text-slate-600 transition-all hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-semibold text-slate-200 transition-all hover:border-slate-600 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            Khám phá thêm truyện
          </Link>
        </div>
      </div>
    </div>
  );
}
