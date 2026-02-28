'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Zap, X, Loader2 } from 'lucide-react';
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
  const [query, setQuery]   = useState('');
  const [data, setData]     = useState<SearchApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Read ?q= from URL on mount
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setData(null);
      return;
    }
    setLoading(true);
    fetch(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(debouncedQuery)}`)
      .then(r => r.json())
      .then((json: SearchApiResponse) => { setData(json); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [debouncedQuery]);

  const items   = data?.data?.items ?? [];
  const cdnBase = data?.data?.APP_DOMAIN_CDN_IMAGE ?? 'https://img.otruyenapi.com';
  const total   = data?.data?.params?.pagination?.totalItems ?? 0;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 transition-colors duration-300 sm:pt-24 sm:pb-16">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <h1 className="mb-5 text-xl font-black text-foreground sm:mb-8 sm:text-2xl md:text-3xl">Tìm kiếm truyện</h1>

        {/* Search input */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 sm:left-4 sm:h-5 sm:w-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Nhập tên truyện, tác giả..."
            className="h-12 w-full rounded-xl border border-slate-700/60 bg-slate-900/80 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-600 outline-none ring-0 backdrop-blur-sm transition-all focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 sm:h-14 sm:rounded-2xl sm:pl-12 sm:pr-12 sm:text-base"
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status bar */}
        {loading && (
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tìm...
          </div>
        )}
        {!loading && data && (
          <p className="mb-6 text-sm text-slate-500">
            Tìm thấy <span className="text-slate-300 font-semibold">{total.toLocaleString()}</span> kết quả cho &ldquo;{debouncedQuery}&rdquo;
          </p>
        )}
        {!loading && !data && query.trim().length >= 2 && (
          <p className="mb-6 text-sm text-slate-500">Không tìm thấy kết quả.</p>
        )}
        {!query && (
          <p className="text-sm text-slate-600">Gõ ít nhất 2 ký tự để bắt đầu tìm kiếm.</p>
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
