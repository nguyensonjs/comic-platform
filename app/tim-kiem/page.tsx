'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import type { SearchApiResponse } from '@/types/otruyen';
import { ComicCard } from '@/app/components/ComicCard';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function TimKiemPage() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchApiResponse | null>(null);
  const [resolvedQuery, setResolvedQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const q = new URLSearchParams(window.location.search).get('q');
    if (!q) return;

    const frame = window.requestAnimationFrame(() => {
      setQuery(q);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) return;

    let cancelled = false;

    fetch(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(debouncedQuery)}`)
      .then(r => r.json())
      .then((json: SearchApiResponse) => {
        if (cancelled) return;
        setData(json);
        setResolvedQuery(debouncedQuery);
      })
      .catch(() => {
        if (cancelled) return;
        setData(null);
        setResolvedQuery(debouncedQuery);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const shouldSearch = debouncedQuery.trim().length >= 2;
  const loading = shouldSearch && resolvedQuery !== debouncedQuery;
  const visibleData = shouldSearch && resolvedQuery === debouncedQuery ? data : null;
  const items = visibleData?.data?.items ?? [];
  const cdnBase = visibleData?.data?.APP_DOMAIN_CDN_IMAGE ?? 'https://img.otruyenapi.com';
  const total = visibleData?.data?.params?.pagination?.totalItems ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pt-20 pb-12 transition-colors duration-500 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950 sm:pt-24 sm:pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div className="mb-5 rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-950/5 backdrop-blur sm:mb-8 sm:p-6 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
          <h1 className="text-xl font-black text-zinc-950 dark:text-white sm:text-2xl md:text-3xl">Tìm kiếm truyện</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-slate-500">
            Tìm nhanh theo tên truyện hoặc tác giả với giao diện đọc dễ nhìn ở cả light và dark mode.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 sm:left-4 sm:h-5 sm:w-5 dark:text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Nhập tên truyện, tác giả..."
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white/90 pl-10 pr-10 text-sm text-zinc-900 shadow-lg shadow-zinc-950/5 outline-none ring-0 backdrop-blur-sm transition-all duration-300 placeholder:text-zinc-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 sm:h-14 sm:rounded-2xl sm:pl-12 sm:pr-12 sm:text-base dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-100 dark:shadow-black/20 dark:placeholder:text-slate-500 dark:focus:border-blue-500/60 dark:focus:ring-blue-500/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status bar */}
        {loading && (
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tìm...
          </div>
        )}
        {!loading && data && (
          <p className="mb-6 text-sm text-zinc-500 dark:text-slate-400">
            Tìm thấy <span className="font-semibold text-zinc-900 dark:text-white">{total.toLocaleString()}</span> kết quả cho &ldquo;{debouncedQuery}&rdquo;
          </p>
        )}
        {!loading && !data && query.trim().length >= 2 && (
          <div className="mb-6 rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-sm text-zinc-500 shadow-sm shadow-zinc-950/5 dark:border-slate-800/70 dark:bg-slate-950/45 dark:text-slate-400">
            Không tìm thấy kết quả.
          </div>
        )}
        {!query && (
          <div className="mb-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-4 text-sm text-zinc-500 dark:border-slate-700 dark:bg-slate-950/35 dark:text-slate-500">
            Gõ ít nhất 2 ký tự để bắt đầu tìm kiếm.
          </div>
        )}

        {/* Results */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map(comic => (
              <ComicCard
                key={comic.slug}
                comic={comic}
                cdnBase={cdnBase}
                showAuthor
                showStatus={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
