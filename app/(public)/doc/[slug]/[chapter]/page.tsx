import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  List,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
} from 'lucide-react';
import type { ChapterDetailApiResponse, ComicDetailApiResponse } from '@/types/otruyen';

async function getChapterByUrl(url: string): Promise<ChapterDetailApiResponse | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
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

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;

  // 1. Fetch comic detail first to get full chapter API URL and navigation info
  const comicData = await getComic(slug);
  if (!comicData || comicData.status !== 'success') return notFound();

  const allChapters = comicData.data.item.chapters
    .flatMap(s => s.server_data)
    .sort((a, b) => {
      const numA = parseFloat(a.chapter_name) || 0;
      const numB = parseFloat(b.chapter_name) || 0;
      return numA - numB;
    });

  const currentIndex = allChapters.findIndex(
    ch => ch.chapter_api_data.split('/').pop() === chapter
  );

  if (currentIndex === -1) return notFound();

  const currentChapterInfo = allChapters[currentIndex];

  // 2. Fetch actually chapter detail using the full URL from comic data
  const chapterData = await getChapterByUrl(currentChapterInfo.chapter_api_data);
  if (!chapterData || chapterData.status !== 'success') return notFound();

  const { item, domain_cdn: cdnBase } = chapterData.data;
  const images = item.chapter_image;

  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#111] pb-20">
      {/* Reader toolbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href={`/truyen/${slug}`}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Quay lại</span>
          </Link>
          <div className="hidden sm:block max-w-[200px] md:max-w-md">
            <p className="text-sm font-bold text-white truncate">{item.comic_name}</p>
            <p className="text-xs text-slate-400 truncate">
              Chương {item.chapter_name} {item.chapter_title && `· ${item.chapter_title}`}
            </p>
          </div>
        </div>

        {/* Center: chapter nav */}
        <div className="flex items-center gap-2">
          {prevChapter ? (
            <Link
              href={`/doc/${slug}/${prevChapter.chapter_api_data.split('/').pop()}`}
              className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 transition-all hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <div className="p-2 opacity-20"><ChevronLeft className="h-4 w-4 text-white" /></div>
          )}

          <div className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-white min-w-[100px] text-center">
            Chương {item.chapter_name}
          </div>

          {nextChapter ? (
            <Link
              href={`/doc/${slug}/${nextChapter.chapter_api_data.split('/').pop()}`}
              className="flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-sm text-white transition-all hover:bg-blue-500"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div className="p-2 opacity-20"><ChevronRight className="h-4 w-4 text-white" /></div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white sm:block hidden">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reading area */}
      <div className="mx-auto max-w-3xl px-0 sm:px-2 py-6">
        <div className="flex flex-col items-center">
          {images.map((img, i) => {
            const imgUrl = `${cdnBase}/${item.chapter_path}/${img.image_file}`;
            return (
              <div key={img.image_page} className="relative w-full">
                <Image
                  src={imgUrl}
                  alt={`Trang ${img.image_page}`}
                  width={1000}
                  height={1500}
                  className="w-full h-auto object-contain"
                  priority={i < 2}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        {/* End of chapter */}
        <div className="mt-10 mx-4 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="mb-2 text-xl font-black text-white">Hết Chương {item.chapter_name}!</h3>
          <p className="mb-6 text-slate-400">Bạn đã đọc hết nội dung chương này.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {prevChapter && (
              <Link
                href={`/doc/${slug}/${prevChapter.chapter_api_data.split('/').pop()}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-slate-200 transition-all hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
                Chương trước
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/doc/${slug}/${nextChapter.chapter_api_data.split('/').pop()}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-500"
              >
                Chương tiếp theo
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href={`/truyen/${slug}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-200 transition-all hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              Về trang truyện
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>{images.length} Trang</span>
            <span>Chương {item.chapter_name}</span>
          </div>
          <div className="h-1 rounded-full bg-slate-800">
            <div className="h-full w-full rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
