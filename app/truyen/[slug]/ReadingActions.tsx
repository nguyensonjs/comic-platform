'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { BookOpen } from 'lucide-react';
import { safeReadProgress } from '@/app/components/reading/readingProgress';

type Props = {
  slug: string;
  firstChapterId: string | null;
  latestChapterId: string | null;
};

function useReadingProgress(slug: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const onAny = (e: Event) => {
        // Only refresh for matching slug when possible
        if (e instanceof CustomEvent) {
          const detail = (e.detail ?? {}) as { slug?: string };
          if (detail.slug && detail.slug !== slug) return;
        }
        onStoreChange();
      };

      window.addEventListener('storage', onAny);
      window.addEventListener('reading-progress', onAny as EventListener);
      return () => {
        window.removeEventListener('storage', onAny);
        window.removeEventListener('reading-progress', onAny as EventListener);
      };
    },
    () => safeReadProgress(slug),
    () => null
  );
}

export default function ReadingActions({ slug, firstChapterId, latestChapterId }: Props) {
  const progress = useReadingProgress(slug);

  const continueHref = progress?.chapter ? `/doc/${slug}/${progress.chapter}` : null;
  const startHref = firstChapterId ? `/doc/${slug}/${firstChapterId}` : null;
  const latestHref = latestChapterId ? `/doc/${slug}/${latestChapterId}` : null;

  return (
    <div className="mt-3 space-y-2 sm:mt-4" suppressHydrationWarning>
      {continueHref ? (
        <Link
          href={continueHref}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
        >
          <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Tiếp tục đọc
        </Link>
      ) : (
        startHref && (
          <Link
            href={startHref}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
          >
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Đọc từ đầu
          </Link>
        )
      )}

      {latestHref && (
        <Link
          href={latestHref}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-900/50 px-3 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
        >
          Đọc chap mới nhất
        </Link>
      )}
    </div>
  );
}

