import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Zap,
  HeartHandshake,
  Swords,
  Heart,
  Wand2,
  Skull,
  Laugh,
  GraduationCap,
  Clock,
  RefreshCcw,
  ChevronRight,
} from 'lucide-react';
import type { HomeApiResponse, ComicItem } from '@/types/otruyen';
import { thumbUrl, statusLabel } from '@/types/otruyen';

/* ─────────── Static data ─────────── */

const features = [
  { Icon: BookOpen,      title: 'Kho tàng phong phú',   desc: 'Hàng ngàn tác phẩm từ khắp nơi, cập nhật liên tục mỗi ngày.',          color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'hover:border-blue-500/40'   },
  { Icon: Zap,           title: 'Tốc độ cực nhanh',     desc: 'Tải trang siêu nhanh, không chờ đợi. Trải nghiệm đọc mượt tuyệt đối.',  color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/40' },
  { Icon: HeartHandshake, title: 'Hoàn toàn miễn phí',  desc: 'Tất cả truyện đọc miễn phí, không quảng cáo gây phiền nhiễu.',          color: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'hover:border-pink-500/40'   },
];

const categories = [
  { Icon: Swords,        name: 'Hành động',   color: 'text-orange-400', bg: 'bg-orange-500/10', href: '/the-loai/action'      },
  { Icon: Heart,         name: 'Lãng mạn',    color: 'text-pink-400',   bg: 'bg-pink-500/10',   href: '/the-loai/romance'     },
  { Icon: Wand2,         name: 'Huyền huyễn', color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/the-loai/fantasy'     },
  { Icon: Skull,         name: 'Kinh dị',     color: 'text-red-400',    bg: 'bg-red-500/10',    href: '/the-loai/horror'      },
  { Icon: Laugh,         name: 'Hài hước',    color: 'text-yellow-400', bg: 'bg-yellow-500/10', href: '/the-loai/comedy'      },
  { Icon: GraduationCap, name: 'Học đường',   color: 'text-blue-400',   bg: 'bg-blue-500/10',   href: '/the-loai/school-life' },
];

/* ─────────── Data fetching ─────────── */

async function getHomeData(): Promise<HomeApiResponse | null> {
  try {
    const res = await fetch('https://otruyenapi.com/v1/api/home', {
      next: { revalidate: 300 }, // revalidate every 5 minutes
    });
    if (!res.ok) return null;
    return res.json() as Promise<HomeApiResponse>;
  } catch {
    return null;
  }
}

/* ─────────── Sub-components ─────────── */

function StatusBadge({ status }: { status: ComicItem['status'] }) {
  const map = {
    ongoing:     'border-green-700/50 bg-green-900/30 text-green-400',
    completed:   'border-blue-700/50 bg-blue-900/30 text-blue-400',
    coming_soon: 'border-amber-700/50 bg-amber-900/30 text-amber-400',
  } as const;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${map[status] ?? map.ongoing}`}>
      {statusLabel(status)}
    </span>
  );
}

function ComicCard({ comic, cdnBase }: { comic: ComicItem; cdnBase: string }) {
  const imgUrl = `${cdnBase}/uploads/comics/${comic.thumb_url}`;
  const latestChapter = (comic.chaptersLatest || [])[0];

  return (
    <Link
      href={`/truyen/${comic.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-2xl hover:shadow-black/40"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={comic.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <StatusBadge status={comic.status} />
        </div>

        {/* Latest chapter overlay */}
        {latestChapter && (
          <div className="absolute bottom-2 left-2 right-2">
            <span className="flex items-center gap-1 rounded-xl bg-slate-950/80 px-2 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-sm">
              <Zap className="h-3 w-3" />
              Chap {latestChapter.chapter_name}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-200 transition-colors group-hover:text-white">
          {comic.name}
        </h3>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {comic.category.slice(0, 2).map(cat => (
            <span
              key={cat.id}
              className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Updated time */}
        <div className="mt-auto flex items-center gap-1 text-[11px] text-slate-600">
          <Clock className="h-3 w-3" />
          {new Date(comic.updatedAt).toLocaleDateString('vi-VN')}
        </div>
      </div>
    </Link>
  );
}

/* ─────────── Page ─────────── */

export default async function Home() {
  const data = await getHomeData();
  const comics     = data?.data?.items ?? [];
  const cdnBase    = data?.data?.APP_DOMAIN_CDN_IMAGE ?? 'https://img.otruyenapi.com';
  const totalItems = data?.data?.params?.pagination?.totalItems ?? 0;
  const updatedToday = data?.data?.params?.itemsUpdateInDay ?? 0;

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── Latest Comics (from API) ── */}
      <section className="pt-24 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white md:text-3xl">
                Truyện mới cập nhật
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {updatedToday > 0 ? `${updatedToday} bộ được cập nhật hôm nay` : 'Dữ liệu thực từ OTruyen API'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <RefreshCcw className="h-3.5 w-3.5" />
                Tự động làm mới 5 phút / lần
              </div>
              <Link href="/danh-sach" className="flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-400 transition-all hover:border-slate-600 hover:text-slate-200">
                Xem tất cả <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {comics.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {comics.map(comic => (
                <ComicCard key={comic._id} comic={comic} cdnBase={cdnBase} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/30 py-20 text-slate-600">
              <RefreshCcw className="mb-3 h-8 w-8 animate-spin" />
              <p>Không thể tải dữ liệu từ API</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-black text-white md:text-3xl">Tại sao chọn chúng tôi?</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">Trải nghiệm đọc truyện tuyệt vời với nhiều tính năng độc đáo</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map(({ Icon, title, desc, color, bg, border }) => (
              <div key={title}
                className={`group rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:shadow-xl ${border}`}>
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 text-center">
            <h2 className="mb-1.5 text-2xl font-black text-white md:text-3xl">Thể loại phổ biến</h2>
            <p className="text-sm text-slate-500">Chọn thể loại yêu thích của bạn</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ Icon, name, color, bg, href }) => (
              <Link key={name} href={href}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <span className="text-sm font-bold text-slate-200 transition-colors group-hover:text-white">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
