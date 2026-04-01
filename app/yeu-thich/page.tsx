import Link from 'next/link';
import {
  Heart,
  BookOpen,
  Star,
  Trash2,
  Filter,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const favorites = [
  {
    id: 1,
    slug: 'dau-la-dai-luc',
    title: 'Đấu La Đại Lục',
    genre: 'Huyền huyễn',
    chapters: 398,
    rating: 4.9,
    status: 'Đang ra',
    gradient: 'from-[#1392ec] to-indigo-700',
    accent: 'text-sky-500 dark:text-sky-400',
  },
  {
    id: 2,
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    genre: 'Hành động',
    chapters: 179,
    rating: 4.9,
    status: 'Hoàn thành',
    gradient: 'from-violet-600 to-fuchsia-600',
    accent: 'text-violet-500 dark:text-violet-400',
  },
  {
    id: 3,
    slug: 'one-piece',
    title: 'One Piece',
    genre: 'Phiêu lưu',
    chapters: 1109,
    rating: 4.8,
    status: 'Đang ra',
    gradient: 'from-orange-600 to-rose-600',
    accent: 'text-orange-500 dark:text-orange-400',
  },
  {
    id: 4,
    slug: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    genre: 'Hành động',
    chapters: 256,
    rating: 4.7,
    status: 'Đang ra',
    gradient: 'from-teal-600 to-cyan-600',
    accent: 'text-teal-500 dark:text-teal-400',
  },
  {
    id: 5,
    slug: 'spy-x-family',
    title: 'Spy x Family',
    genre: 'Hài hước',
    chapters: 95,
    rating: 4.9,
    status: 'Đang ra',
    gradient: 'from-rose-600 to-pink-500',
    accent: 'text-rose-500 dark:text-rose-400',
  },
  {
    id: 6,
    slug: 'blue-lock',
    title: 'Blue Lock',
    genre: 'Thể thao',
    chapters: 270,
    rating: 4.8,
    status: 'Đang ra',
    gradient: 'from-amber-600 to-orange-600',
    accent: 'text-amber-500 dark:text-amber-400',
  },
];

export default function FavoritesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pb-16 pt-20 transition-colors duration-500 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950 sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.12),_transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/25">
              <Heart className="h-6 w-6 fill-white text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                Yêu thích
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-slate-400">
                <span className="font-bold text-zinc-800 dark:text-slate-200">{favorites.length}</span> tác phẩm đã lưu
                — đọc tiếp bất cứ lúc nào.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/95 px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-pink-300/80 hover:bg-pink-50/90 hover:text-pink-800 sm:w-auto dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-pink-800/50 dark:hover:bg-pink-950/30 dark:hover:text-pink-200"
          >
            <Filter className="h-4 w-4 shrink-0" />
            Sắp xếp
          </button>
        </div>

        {/* List */}
        <ul className="space-y-3 sm:space-y-4">
          {favorites.map((comic) => (
            <li key={comic.id}>
              <article className="group/card overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-lg shadow-zinc-950/5 backdrop-blur transition-all duration-300 hover:border-zinc-300/90 hover:shadow-xl dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20 dark:hover:border-slate-700/80">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
                  {/* Cover */}
                  <Link
                    href={`/truyen/${comic.slug}`}
                    className="relative mx-auto flex aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-2xl border border-zinc-200/80 shadow-md ring-1 ring-black/5 transition-transform hover:scale-[1.02] sm:mx-0 sm:w-24 dark:border-slate-700/60 dark:ring-white/5"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${comic.gradient}`}
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' fill-opacity='0.15' d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E\")",
                      }}
                    />
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-2">
                      <BookOpen className="h-8 w-8 text-white/85 drop-shadow-md sm:h-9 sm:w-9" />
                    </div>
                    <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/35 backdrop-blur-sm">
                      <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-300" />
                    </span>
                  </Link>

                  {/* Info + actions */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <Link
                          href={`/truyen/${comic.slug}`}
                          className="min-w-0 text-lg font-bold leading-snug text-zinc-950 transition-colors hover:text-[#1392ec] sm:text-xl dark:text-white dark:hover:text-sky-400"
                        >
                          {comic.title}
                        </Link>
                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 dark:bg-amber-950/40">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                          <span className="text-sm font-black tabular-nums text-amber-700 dark:text-amber-300">
                            {comic.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300">
                          <Sparkles className={`h-3 w-3 ${comic.accent}`} />
                          {comic.genre}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300">
                          <BookOpen className="h-3 w-3 text-[#1392ec] dark:text-sky-400" />
                          {comic.chapters} chương
                        </span>
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                            comic.status === 'Hoàn thành'
                              ? 'border-emerald-200/90 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/35 dark:text-emerald-300'
                              : 'border-blue-200/90 bg-blue-50 text-blue-800 dark:border-blue-800/50 dark:bg-blue-950/35 dark:text-blue-300'
                          }`}
                        >
                          {comic.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4 dark:border-slate-800/60 sm:flex-nowrap sm:justify-end sm:border-t-0 sm:pt-0">
                      <Link
                        href={`/truyen/${comic.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1392ec] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-600 sm:flex-initial dark:hover:bg-sky-600"
                      >
                        Đọc ngay
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-zinc-50 text-zinc-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        aria-label={`Bỏ yêu thích ${comic.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/95 px-6 py-3 text-sm font-bold text-zinc-800 shadow-md transition-all hover:border-[#1392ec]/40 hover:text-[#1392ec] dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-sky-500/40 dark:hover:text-sky-400"
          >
            <BookOpen className="h-5 w-5" />
            Khám phá thêm truyện
          </Link>
        </div>
      </div>
    </div>
  );
}
