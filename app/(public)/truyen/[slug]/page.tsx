import Link from 'next/link';
import {
  BookOpen,
  Star,
  Eye,
  Heart,
  Share2,
  ChevronRight,
  Clock,
  User,
  Tag,
  Play,
  Bookmark,
} from 'lucide-react';

const chapters = [
  { num: 398, title: 'Cuộc chiến cuối cùng', date: '2 giờ trước', isNew: true },
  { num: 397, title: 'Sức mạnh thức tỉnh', date: '3 ngày trước', isNew: false },
  { num: 396, title: 'Bí mật ngàn năm', date: '6 ngày trước', isNew: false },
  { num: 395, title: 'Trận đấu sinh tử', date: '9 ngày trước', isNew: false },
  { num: 394, title: 'Kẻ thù mới', date: '12 ngày trước', isNew: false },
  { num: 393, title: 'Hành trình trở về', date: '15 ngày trước', isNew: false },
];

const related = [
  { id: 2, title: 'Thánh Khư', genre: 'Hành động', gradient: 'from-violet-600 to-purple-700' },
  { id: 3, title: 'Thần Mộ', genre: 'Huyền huyễn', gradient: 'from-teal-600 to-cyan-500' },
  { id: 4, title: 'Đường Ân', genre: 'Tiên hiệp', gradient: 'from-amber-600 to-orange-500' },
  { id: 5, title: 'Tiên Nghịch', genre: 'Tiên hiệp', gradient: 'from-rose-600 to-pink-500' },
];

export default async function TruyenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24">
      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900/50 py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Cover art */}
            <div className="mx-auto w-48 shrink-0 md:mx-0">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-900/50">
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <BookOpen className="mb-3 h-14 w-14 text-white/40" />
                  <span className="text-sm font-bold text-white/60">Đấu La Đại Lục</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col">
              <div className="mb-1 text-sm text-slate-500">Truyện #{slug}</div>
              <h1 className="mb-2 text-3xl font-black text-white md:text-4xl">Đấu La Đại Lục</h1>

              <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>Đường Gia Tam Thiếu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>Cập nhật: 2 giờ trước</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-yellow-400">4.9</span>
                  <span className="text-slate-600">(12.4k đánh giá)</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-5 flex flex-wrap gap-2">
                {['Huyền huyễn', 'Tu tiên', 'Phong thần', 'Chiến đấu', 'Phiêu lưu'].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    <Tag className="h-3 w-3 text-slate-500" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mb-6 flex gap-6">
                <div className="text-center">
                  <div className="text-xl font-black text-white">398</div>
                  <div className="text-xs text-slate-500">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-white">2.4M</div>
                  <div className="text-xs text-slate-500">Lượt xem</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-white">89K</div>
                  <div className="text-xs text-slate-500">Yêu thích</div>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-400">
                Đường Tam đã được tái sinh vào một thế giới khác với một linh hồn thứ chín - điều không bao giờ xảy ra trong thế giới Đấu La.
                Chứng kiến hành trình tu luyện phi thường của chàng trai trẻ...
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/doc/1-chapter-1"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Đọc từ đầu
                </Link>
                <Link
                  href="/doc/1-chapter-398"
                  className="flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all hover:bg-slate-700"
                >
                  <ChevronRight className="h-4 w-4" />
                  Chapter mới nhất
                </Link>
                <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-pink-400 transition-all hover:bg-slate-800 hover:text-pink-300">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-400 transition-all hover:bg-slate-800 hover:text-slate-200">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-400 transition-all hover:bg-slate-800 hover:text-slate-200">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter list + Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Chapter list */}
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-xl font-black text-white">Danh sách chapter</h2>
            <div className="space-y-2">
              {chapters.map((ch) => (
                <Link
                  key={ch.num}
                  href={`/doc/1-chapter-${ch.num}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400">Ch.{ch.num}</span>
                    <span className="font-medium text-slate-200 transition-colors group-hover:text-white">
                      {ch.title}
                    </span>
                    {ch.isNew && (
                      <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-bold text-blue-400">
                        MỚI
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{ch.date}</span>
                    <ChevronRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar: Related */}
          <div>
            <h2 className="mb-5 text-xl font-black text-white">Có thể bạn thích</h2>
            <div className="space-y-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/truyen/${r.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-3 transition-all hover:border-slate-700 hover:bg-slate-900"
                >
                  <div className={`flex h-14 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${r.gradient}`}>
                    <BookOpen className="h-4 w-4 text-white/60" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 transition-colors group-hover:text-white">{r.title}</p>
                    <p className="text-xs text-slate-500">{r.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
