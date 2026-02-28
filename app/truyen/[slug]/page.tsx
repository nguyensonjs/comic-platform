import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, BookOpen, User, Tag, Clock, ExternalLink } from 'lucide-react';
import type { ComicDetailApiResponse } from '@/types/otruyen';
import { statusLabel } from '@/types/otruyen';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getComic(slug: string): Promise<ComicDetailApiResponse | null> {
  try {
    const res = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TruyenDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getComic(slug);

  if (!data || data.status !== 'success') return notFound();

  const { item, APP_DOMAIN_CDN_IMAGE: cdnBase } = data.data;
  const imgUrl = `${cdnBase}/uploads/comics/${item.thumb_url}`;

  // Flatten all chapters across all servers, deduplicate by chapter_name
  const allChapters = item.chapters
    .flatMap(s => s.server_data)
    .filter((ch, idx, arr) => arr.findIndex(x => x.chapter_name === ch.chapter_name) === idx)
    .sort((a, b) => parseFloat(b.chapter_name) - parseFloat(a.chapter_name));

  const statusColor = {
    ongoing: 'bg-green-900/40 text-green-400 border-green-700/50',
    completed: 'bg-blue-900/40 text-blue-400 border-blue-700/50',
    coming_soon: 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  }[item.status] ?? 'bg-slate-800 text-slate-400 border-slate-700';

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 sm:pt-24 sm:pb-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:mb-6 sm:gap-2 sm:text-sm">
          <Link href="/" className="hover:text-slate-300 transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4" />
          {item.category[0] && (
            <>
              <Link href={`/the-loai/${item.category[0].slug}`} className="hover:text-slate-300 transition-colors">
                {item.category[0].name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="line-clamp-1 text-slate-700 dark:text-slate-300">{item.name}</span>
        </nav>

        {/* Main info */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:gap-8 md:flex-row">
          {/* Thumbnail */}
          <div className="shrink-0">
            <div className="relative mx-auto w-36 overflow-hidden rounded-xl border border-slate-800/60 shadow-2xl shadow-black/60 sm:w-48 md:w-56 sm:rounded-2xl">
              <Image
                src={imgUrl}
                alt={item.name}
                width={224}
                height={300}
                className="w-full object-cover"
                priority
              />
            </div>
            {/* Action buttons */}
            <div className="mt-3 space-y-2 sm:mt-4">
              {allChapters.length > 0 && (
                <>
                  <Link href={`/doc/${slug}/${allChapters[allChapters.length - 1].chapter_api_data.split('/').pop()}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm">
                    <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Đọc từ đầu
                  </Link>
                  <Link href={`/doc/${slug}/${allChapters[0].chapter_api_data.split('/').pop()}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm">
                    Đọc chap mới nhất
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="mb-1.5 text-xl font-black leading-tight text-slate-900 dark:text-white sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl">{item.name}</h1>

            {item.origin_name?.filter(Boolean).length > 0 && (
              <p className="mb-4 text-sm text-slate-500 italic">{item.origin_name.filter(Boolean).join(' · ')}</p>
            )}

            {/* Meta badges */}
            <div className="mb-5 flex flex-wrap gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor}`}>
                {statusLabel(item.status)}
              </span>
              {item.sub_docquyen && (
                <span className="rounded-full border border-yellow-700/50 bg-yellow-900/30 px-3 py-1 text-xs font-bold text-yellow-400">
                  Độc quyền
                </span>
              )}
            </div>

            {/* Details table */}
            <dl className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
              {item.author && item.author.filter(Boolean).length > 0 && (
                <div className="flex items-start gap-2 sm:gap-3">
                  <dt className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 w-20 sm:w-24 sm:text-sm">
                    <User className="h-3.5 w-3.5" /> Tác giả
                  </dt>
                  <dd className="text-sm text-slate-700 dark:text-slate-300">{item.author.filter(Boolean).join(', ')}</dd>
                </div>
              )}
              <div className="flex items-start gap-2 sm:gap-3">
                <dt className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 w-20 sm:w-24 sm:text-sm">
                  <Tag className="h-3.5 w-3.5" /> Thể loại
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {item.category.map(cat => (
                    <Link key={cat.id} href={`/the-loai/${cat.slug}`}
                      className="rounded-full border border-slate-700/60 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-400 transition-all hover:border-blue-500/40 hover:bg-blue-900/20 hover:text-blue-300">
                      {cat.name}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <dt className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 w-20 sm:w-24 sm:text-sm">
                  <Clock className="h-3.5 w-3.5" /> Cập nhật
                </dt>
                <dd className="text-sm text-slate-400">
                  {new Date(item.updatedAt).toLocaleString('vi-VN')}
                </dd>
              </div>
            </dl>

            {/* Description */}
            {item.content && (
              <div>
                <h2 className="mb-2 text-sm font-bold text-slate-400 uppercase tracking-wider">Nội dung</h2>
                <p className="text-sm leading-relaxed text-slate-400 line-clamp-5">{item.content}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chapter list */}
        {allChapters.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Danh sách chương
                <span className="ml-2 text-sm font-normal text-slate-500">({allChapters.length} chương)</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {allChapters.map(ch => (
                <Link
                  key={ch.chapter_api_data}
                  href={`/doc/${slug}/${ch.chapter_api_data.split('/').pop()}`}
                  className="group flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800/40 bg-white dark:bg-slate-900/30 px-3 py-2 text-xs transition-all hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-blue-400" />
                  <span className="flex-1 truncate text-slate-400 group-hover:text-slate-200">
                    Chương {ch.chapter_name}
                    {ch.chapter_title && <span className="ml-1 text-slate-600">– {ch.chapter_title}</span>}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-700 group-hover:text-slate-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
