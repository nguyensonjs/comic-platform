'use client';

import { useEffect, useState } from 'react';

type Props = {
  pageCount: number;
  chapterLabel: string;
};

function readScrollPercent(): number {
  const el = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY ?? el.scrollTop ?? body.scrollTop ?? 0;
  const winH = window.innerHeight;
  const docH = Math.max(
    el.scrollHeight,
    el.offsetHeight,
    body.scrollHeight,
    body.offsetHeight,
  );
  const maxScroll = Math.max(1, docH - winH);
  return Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
}

export default function ReaderBottomBar({ pageCount, chapterLabel }: Props) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setPct(readScrollPercent());
      });
    };

    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick, { passive: true });

    const ro = new ResizeObserver(tick);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      ro.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/95">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {pageCount} trang
            <span className="ml-1.5 tabular-nums text-slate-400 dark:text-slate-500">
              · {Math.round(pct)}%
            </span>
          </span>
          <span className="truncate pl-2">{chapterLabel}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.45)] transition-[width] duration-100 ease-out dark:bg-sky-500 dark:shadow-sky-500/30"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiến độ cuộn trong chương"
          />
        </div>
      </div>
    </div>
  );
}
