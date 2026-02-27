import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import type { ListApiResponse } from '@/types/otruyen';
import { statusLabel } from '@/types/otruyen';

type ListType = 'truyen-moi' | 'sap-ra-mat' | 'dang-phat-hanh' | 'hoan-thanh';

const LIST_LABELS: Record<ListType, string> = {
  'truyen-moi':       'Truyện Mới',
  'sap-ra-mat':       'Sắp Ra Mắt',
  'dang-phat-hanh':   'Đang Phát Hành',
  'hoan-thanh':       'Hoàn Thành',
};

interface Props {
  searchParams: Promise<{ page?: string; type?: string }>;
}

async function getList(type: string, page: number): Promise<ListApiResponse | null> {
  try {
    const res = await fetch(`https://otruyenapi.com/v1/api/danh-sach/${type}?page=${page}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function DanhSachPage({ searchParams }: Props) {
  const { page: pageStr, type: typeStr } = await searchParams;
  const listType = (typeStr as ListType) || 'truyen-moi';
  const page = Math.max(1, parseInt(pageStr ?? '1', 10));

  const data = await getList(listType, page);
  const items     = data?.data?.items ?? [];
  const cdnBase   = data?.data?.APP_DOMAIN_CDN_IMAGE ?? 'https://img.otruyenapi.com';
  const pagination = data?.data?.params?.pagination;
  const totalItems = pagination?.totalItems ?? 0;
  const totalPerPage = pagination?.totalItemsPerPage ?? 24;
  const currentPage  = pagination?.currentPage ?? page;
  const pageRanges   = pagination?.pageRanges ?? 5;
  const totalPages   = Math.ceil(totalItems / totalPerPage);

  const half = Math.floor(pageRanges / 2);
  const startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + pageRanges - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const listTypes: ListType[] = ['truyen-moi', 'sap-ra-mat', 'dang-phat-hanh', 'hoan-thanh'];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">Danh sách</span>
        </nav>

        {/* Type tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {listTypes.map(t => (
            <Link key={t} href={`/danh-sach?type=${t}&page=1`}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                t === listType
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'border border-slate-700/60 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}>
              {LIST_LABELS[t]}
            </Link>
          ))}
        </div>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white md:text-3xl">{LIST_LABELS[listType]}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {totalItems.toLocaleString()} truyện • Trang {currentPage}/{totalPages}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map(comic => {
            const imgUrl = `${cdnBase}/uploads/comics/${comic.thumb_url}`;
            const latestChapter = comic.chaptersLatest?.[0];
            return (
              <Link key={comic._id} href={`/truyen/${comic.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-2xl hover:shadow-black/40">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image src={imgUrl} alt={comic.name} fill sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                  {latestChapter && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="flex items-center gap-1 rounded-xl bg-slate-950/80 px-2 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-sm">
                        <Zap className="h-3 w-3" /> Chap {latestChapter.chapter_name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-200 group-hover:text-white">{comic.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {comic.category.slice(0, 2).map(cat => (
                      <span key={cat.id} className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">{cat.name}</span>
                    ))}
                  </div>
                  <span className={`mt-auto w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    comic.status === 'ongoing'   ? 'bg-green-900/30 text-green-400' :
                    comic.status === 'completed' ? 'bg-blue-900/30 text-blue-400' :
                                                   'bg-amber-900/30 text-amber-400'
                  }`}>{statusLabel(comic.status)}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link href={`/danh-sach?type=${listType}&page=${currentPage - 1}`}
                className="flex items-center gap-1 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
                <ChevronLeft className="h-4 w-4" /> Trước
              </Link>
            )}
            {pages.map(p => (
              <Link key={p} href={`/danh-sach?type=${listType}&page=${p}`}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                  p === currentPage
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'border border-slate-700/60 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}>{p}</Link>
            ))}
            {currentPage < totalPages && (
              <Link href={`/danh-sach?type=${listType}&page=${currentPage + 1}`}
                className="flex items-center gap-1 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
                Sau <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
