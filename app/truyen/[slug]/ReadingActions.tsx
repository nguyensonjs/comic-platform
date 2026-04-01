'use client';

import Link from 'next/link';
import { useCallback, useSyncExternalStore } from 'react';
import { BookOpen } from 'lucide-react';
import { type ReadingProgress, safeReadProgress } from '@/app/components/reading/readingProgress';

type Props = {
  slug: string;
  firstChapterId: string | null;
  latestChapterId: string | null;
};

function useReadingProgress(slug: string): ReadingProgress | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onAny = (e: Event) => {
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
    [slug]
  );

  const getSnapshot = useCallback(() => safeReadProgress(slug), [slug]);
  const getServerSnapshot = useCallback(() => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/25 dark:bg-gradient-to-r dark:from-sky-500 dark:via-blue-500 dark:to-indigo-500 dark:hover:from-sky-400 dark:hover:via-blue-400 dark:hover:to-indigo-400 sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
        >
          <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Tiếp tục đọc
        </Link>
      ) : (
        startHref && (
          <Link
            href={startHref}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/25 dark:bg-gradient-to-r dark:from-sky-500 dark:via-blue-500 dark:to-indigo-500 dark:hover:from-sky-400 dark:hover:via-blue-400 dark:hover:to-indigo-400 sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
          >
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Đọc từ đầu
          </Link>
        )
      )}

      {latestHref && (
        <Link
          href={latestHref}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white/90 px-3 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-700/60 dark:bg-slate-900/55 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-slate-800 dark:hover:text-white sm:rounded-xl sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
        >
          Đọc chap mới nhất
        </Link>
      )}
    </div>
  );
}

