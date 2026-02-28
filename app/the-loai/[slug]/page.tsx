import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Zap, ChevronLeft } from 'lucide-react';
import type { GenreDetailApiResponse } from '@/types/otruyen';
import { ComicCard } from '@/app/components/ComicCard';
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getGenreData(slug: string, page: number): Promise<GenreDetailApiResponse | null> {
  try {
    const res = await fetch(`https://otruyenapi.com/v1/api/the-loai/${slug}?page=${page}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TheLoaiSlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? '1', 10));

  const data = await getGenreData(slug, page);
  if (!data || data.status !== 'success') return notFound();

  const { items, params: apiParams, APP_DOMAIN_CDN_IMAGE: cdnBase } = data.data;
  const { totalItems, totalItemsPerPage, currentPage, pageRanges } = apiParams.pagination;
  const totalPages = Math.ceil(totalItems / totalItemsPerPage);
  const genreName = data.data.titlePage ?? slug;

  // Build page range
  const half = Math.floor(pageRanges / 2);
  const startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + pageRanges - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 transition-colors duration-300 sm:pt-24 sm:pb-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:mb-8 sm:gap-2 sm:text-sm">
          <Link href="/" className="hover:text-slate-300 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/the-loai" className="hover:text-slate-300 transition-colors">Thể loại</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">{genreName}</span>
        </nav>

        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-black text-foreground sm:text-3xl md:text-4xl">{genreName}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {totalItems.toLocaleString()} truyện • Trang {currentPage}/{totalPages}
            </p>
          </div>
        </div>

        {/* Comic Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map(comic => (
            <ComicCard
              key={comic._id}
              comic={comic}
              cdnBase={cdnBase}
              showCategory={false}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link href={`/the-loai/${slug}?page=${currentPage - 1}`}
                className="flex items-center gap-1 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                <ChevronLeft className="h-4 w-4" /> Trước
              </Link>
            )}
            {pages.map(p => (
              <Link key={p} href={`/the-loai/${slug}?page=${p}`}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                  p === currentPage
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'border border-slate-700/60 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}>
                {p}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={`/the-loai/${slug}?page=${currentPage + 1}`}
                className="flex items-center gap-1 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                Sau <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
