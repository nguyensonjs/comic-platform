'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Zap, X, Loader2 } from 'lucide-react';
import type { SearchApiResponse } from '@/types/otruyen';

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
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-black text-white md:text-3xl">Tìm kiếm truyện</h1>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Nhập tên truyện, tác giả..."
            className="h-14 w-full rounded-2xl border border-slate-700/60 bg-slate-900/80 pl-12 pr-12 text-base text-slate-200 placeholder-slate-600 outline-none ring-0 backdrop-blur-sm transition-all focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map(comic => {
              const imgUrl = `${cdnBase}/uploads/comics/${comic.thumb_url}`;
              const latestChapter = comic.chaptersLatest?.[0];
              return (
                <Link key={comic.slug} href={`/truyen/${comic.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 hover:shadow-2xl hover:shadow-black/40">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image src={imgUrl} alt={comic.name} fill sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    {latestChapter && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="flex items-center gap-1 rounded-xl bg-slate-950/80 px-2 py-1 text-[11px] font-semibold text-cyan-300 backdrop-blur-sm">
                          <Zap className="h-3 w-3" /> Chap {latestChapter.chapter_name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-200 group-hover:text-white">{comic.name}</h3>
                    {comic.author && comic.author.length > 0 && comic.author[0] && (
                      <p className="text-[11px] text-slate-600 truncate">{comic.author[0]}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {comic.category.slice(0, 2).map(cat => (
                        <span key={cat.id} className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">{cat.name}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
