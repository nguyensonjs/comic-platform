import Link from 'next/link';
import { RefreshCcw, ChevronRight } from 'lucide-react';
import type { HomeApiResponse } from '@/types/otruyen';
import { ComicCard } from '@/app/components/ComicCard';

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

/* ─────────── Page ─────────── */

export default async function Home() {
  const data = await getHomeData();
  const comics = data?.data?.items ?? [];
  const cdnBase = data?.data?.APP_DOMAIN_CDN_IMAGE ?? 'https://img.otruyenapi.com';
  const updatedToday = data?.data?.params?.itemsUpdateInDay ?? 0;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">

      {/* ── Latest Comics (from API) ── */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl md:text-3xl">
                Truyện mới cập nhật
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {updatedToday > 0 ? `${updatedToday} bộ được cập nhật hôm nay` : 'Dữ liệu thực từ OTruyen API'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-600 sm:text-xs">
                <RefreshCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Tự động làm mới 5 phút / lần
              </div>
              <Link href="/danh-sach" className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all hover:border-blue-500 hover:text-blue-600 dark:hover:text-slate-200 sm:px-4 sm:py-2 sm:text-sm">
                Xem tất cả <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          {comics.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {comics.map(comic => (
                <ComicCard key={comic._id} comic={comic} cdnBase={cdnBase} showUpdatedAt />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 py-20 text-slate-400 dark:text-slate-600">
              <RefreshCcw className="mb-3 h-8 w-8 animate-spin" />
              <p>Không thể tải dữ liệu từ API</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
