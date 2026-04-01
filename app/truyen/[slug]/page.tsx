import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, BookOpen, User, Tag, Clock, ExternalLink } from 'lucide-react';
import type { ComicDetailApiResponse } from '@/types/otruyen';
import { statusLabel } from '@/types/otruyen';
import ReadingActions from './ReadingActions';

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
    .flatMap((s) => s.server_data)
    .filter((ch, idx, arr) => arr.findIndex((x) => x.chapter_name === ch.chapter_name) === idx)
    .sort((a, b) => parseFloat(b.chapter_name) - parseFloat(a.chapter_name));

  const firstChapterId =
    allChapters.length > 0
      ? (allChapters[allChapters.length - 1].chapter_api_data.split('/').pop() ?? null)
      : null;
  const latestChapterId =
    allChapters.length > 0 ? (allChapters[0].chapter_api_data.split('/').pop() ?? null) : null;

  const statusColor =
    {
      ongoing:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/40 dark:text-emerald-300',
      completed:
        'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/40 dark:text-blue-300',
      coming_soon:
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/40 dark:text-amber-300',
    }[item.status] ??
    'border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300';

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pt-20 pb-12 transition-colors duration-500 sm:pt-24 sm:pb-16 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 sm:mb-6 sm:gap-2 sm:text-sm dark:text-slate-500">
          <Link
            href="/"
            className="transition-colors hover:text-zinc-900 dark:hover:text-slate-200"
          >
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          {item.category[0] && (
            <>
              <Link
                href={`/the-loai/${item.category[0].slug}`}
                className="transition-colors hover:text-zinc-900 dark:hover:text-slate-200"
              >
                {item.category[0].name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="line-clamp-1 text-zinc-700 dark:text-slate-300">{item.name}</span>
        </nav>

        {/* Main info */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:gap-8 md:flex-row">
          {/* Thumbnail */}
          <div className="shrink-0">
            <div className="relative mx-auto w-36 overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-2xl ring-1 shadow-zinc-950/10 ring-black/5 sm:w-48 sm:rounded-2xl md:w-56 dark:border-slate-800/60 dark:bg-slate-950 dark:shadow-black/60 dark:ring-white/5">
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
            <ReadingActions
              slug={slug}
              firstChapterId={firstChapterId}
              latestChapterId={latestChapterId}
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur sm:p-6 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
              <h1 className="mb-1.5 text-xl leading-tight font-black text-zinc-950 sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
                {item.name}
              </h1>

              {item.origin_name?.filter(Boolean).length > 0 && (
                <p className="mb-4 text-sm text-zinc-500 italic dark:text-slate-500">
                  {item.origin_name.filter(Boolean).join(' · ')}
                </p>
              )}

              {/* Meta badges */}
              <div className="mb-5 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor}`}>
                  {statusLabel(item.status)}
                </span>
                {item.sub_docquyen && (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-yellow-700/50 dark:bg-yellow-900/30 dark:text-yellow-300">
                    Độc quyền
                  </span>
                )}
              </div>

              {/* Details table */}
              <dl className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
                {item.author && item.author.filter(Boolean).length > 0 && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <dt className="flex w-20 shrink-0 items-center gap-1.5 text-xs text-zinc-500 sm:w-24 sm:text-sm dark:text-slate-500">
                      <User className="h-3.5 w-3.5" /> Tác giả
                    </dt>
                    <dd className="text-sm text-zinc-700 dark:text-slate-300">
                      {item.author.filter(Boolean).join(', ')}
                    </dd>
                  </div>
                )}
                <div className="flex items-start gap-2 sm:gap-3">
                  <dt className="flex w-20 shrink-0 items-center gap-1.5 text-xs text-zinc-500 sm:w-24 sm:text-sm dark:text-slate-500">
                    <Tag className="h-3.5 w-3.5" /> Thể loại
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {item.category.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/the-loai/${cat.slug}`}
                        className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </dd>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <dt className="flex w-20 shrink-0 items-center gap-1.5 text-xs text-zinc-500 sm:w-24 sm:text-sm dark:text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> Cập nhật
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-slate-400">
                    {new Date(item.updatedAt).toLocaleString('vi-VN')}
                  </dd>
                </div>
              </dl>

              {/* Description */}
              {item.content && (
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-slate-800/60 dark:bg-slate-900/45">
                  <h2 className="mb-2 text-sm font-bold tracking-wider text-zinc-500 uppercase dark:text-slate-400">
                    Nội dung
                  </h2>
                  <p className="line-clamp-5 text-sm leading-relaxed text-zinc-600 dark:text-slate-300">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chapter list */}
        {allChapters.length > 0 && (
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur sm:p-6 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-zinc-950 dark:text-white">
                Danh sách chương
                <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-slate-500">
                  ({allChapters.length} chương)
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {allChapters.map((ch) => (
                <Link
                  key={ch.chapter_api_data}
                  href={`/doc/${slug}/${ch.chapter_api_data.split('/').pop()}`}
                  className="group flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/90 px-3 py-2 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-blue-500/40 dark:hover:bg-slate-900/75"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400" />
                  <span className="flex-1 truncate text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-slate-300 dark:group-hover:text-white">
                    Chương {ch.chapter_name}
                    {ch.chapter_title && (
                      <span className="ml-1 text-zinc-500 dark:text-slate-500">
                        - {ch.chapter_title}
                      </span>
                    )}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-colors group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
