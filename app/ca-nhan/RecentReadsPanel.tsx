'use client';

import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ReadingProgress,
  snapshotAllProgress,
  subscribeReadingProgress,
} from '@/app/components/reading/readingProgress';

function useRecentReads(): ReadingProgress[] {
  const [reads, setReads] = useState<ReadingProgress[]>(() => snapshotAllProgress());

  useEffect(() => {
    // subscribe to further changes
    const unsubscribe = subscribeReadingProgress(() => {
      setReads(snapshotAllProgress());
    });

    return unsubscribe;
  }, []);

  return reads;
}

function trimTitle(title: string | undefined, slug: string) {
  if (!title) return slug;
  return title;
}

export default function RecentReadsPanel() {
  const all = useRecentReads();

  const bySlug: Record<string, ReadingProgress> = {};
  for (const p of all) {
    const existing = bySlug[p.slug];
    if (!existing || p.updatedAt > existing.updatedAt) {
      bySlug[p.slug] = p;
    }
  }

  const sorted = Object.values(bySlug)
    .slice()
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 10);

  if (sorted.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-slate-800/50 px-5 py-4">
          <h2 className="font-bold text-slate-200">Đọc gần đây</h2>
        </div>
        <div className="px-5 py-6 text-sm text-slate-500">
          Bạn chưa có truyện nào trong lịch sử đọc. Hãy bắt đầu với một bộ truyện bất kỳ!
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/50 px-5 py-4">
        <h2 className="font-bold text-slate-200">Đọc gần đây</h2>
        <Link href="/thu-vien" className="text-xs text-purple-400 hover:text-purple-300">
          Xem tất cả
        </Link>
      </div>
      <div className="divide-y divide-slate-800/40">
        {sorted.map((item) => (
          <Link
            key={item.slug}
            href={`/doc/${item.slug}/${item.chapter}`}
            className="group flex items-center gap-3 px-5 py-3.5 transition-all hover:bg-purple-900/10"
          >
            <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700">
              <BookOpen className="h-3.5 w-3.5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-slate-300 group-hover:text-white">
                {trimTitle(item.comicTitle, item.slug)}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Clock className="h-3 w-3" />
                <span className="truncate">{item.chapterName ?? `Chương ${item.chapter}`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

