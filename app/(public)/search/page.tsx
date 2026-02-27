'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Star, TrendingUp, X } from 'lucide-react';

const allComics = [
  { id: 1, title: 'Đấu La Đại Lục', genre: 'Huyền huyễn', chapters: 398, rating: 4.9, status: 'Đang ra', gradient: 'from-blue-600 to-indigo-700', author: 'Đường Gia Tam Thiếu' },
  { id: 2, title: 'Solo Leveling', genre: 'Hành động', chapters: 179, rating: 4.9, status: 'Hoàn thành', gradient: 'from-purple-600 to-pink-600', author: 'Chugong' },
  { id: 3, title: 'One Piece', genre: 'Phiêu lưu', chapters: 1109, rating: 4.8, status: 'Đang ra', gradient: 'from-orange-600 to-red-600', author: 'Eiichiro Oda' },
  { id: 4, title: 'Jujutsu Kaisen', genre: 'Hành động', chapters: 256, rating: 4.7, status: 'Đang ra', gradient: 'from-teal-600 to-cyan-500', author: 'Gege Akutami' },
  { id: 5, title: 'Spy x Family', genre: 'Hài hước', chapters: 95, rating: 4.9, status: 'Đang ra', gradient: 'from-rose-600 to-pink-500', author: 'Tatsuya Endo' },
  { id: 6, title: 'Blue Lock', genre: 'Thể thao', chapters: 270, rating: 4.8, status: 'Đang ra', gradient: 'from-amber-600 to-orange-500', author: 'Muneyuki Kaneshiro' },
  { id: 7, title: 'Thánh Khư', genre: 'Hành động', chapters: 220, rating: 4.8, status: 'Đang ra', gradient: 'from-violet-600 to-purple-700', author: 'Đường Gia Tam Thiếu' },
  { id: 8, title: 'Diêu Chí Tiên Kiếm', genre: 'Tiên hiệp', chapters: 115, rating: 4.7, status: 'Đang ra', gradient: 'from-green-600 to-emerald-500', author: 'Phong Linh Thiên Hạ' },
];

const genres = ['Tất cả', 'Hành động', 'Lãng mạn', 'Huyền huyễn', 'Tiên hiệp', 'Hài hước', 'Phiêu lưu', 'Thể thao'];
const trendingSearches = ['Đấu La', 'Solo Leveling', 'Tiên nghịch', 'One Piece', 'Naruto'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  const filtered = allComics.filter((c) => {
    const matchesQuery = !query || c.title.toLowerCase().includes(query.toLowerCase()) || c.author.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = selectedGenre === 'Tất cả' || c.genre === selectedGenre;
    return matchesQuery && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search header */}
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-black text-white md:text-4xl">Tìm kiếm</h1>

          <div className="relative">
            <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên truyện, tác giả, thể loại..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-4 pr-14 pl-14 text-lg text-white placeholder-slate-500 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-5 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trending searches - show when no query */}
        {!query && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <TrendingUp className="h-4 w-4" />
              Tìm kiếm phổ biến
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm text-slate-300 transition-all hover:border-slate-600 hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Genre filters */}
        <div className="mb-8 no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                selectedGenre === g
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'border border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
          <button className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-400 hover:border-slate-600 hover:text-slate-200">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Results */}
        {query && (
          <p className="mb-4 text-sm text-slate-500">
            Tìm thấy <span className="font-semibold text-slate-300">{filtered.length}</span> kết quả cho &quot;{query}&quot;
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((comic) => (
            <Link key={comic.id} href={`/truyen/${comic.id}`} className="group flex flex-col">
              <div className={`relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${comic.gradient} shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                  <BookOpen className="mb-2 h-8 w-8 text-white/40" />
                  <span className="text-xs font-bold text-white/70 leading-tight">{comic.title}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
                  <span className="text-xs font-semibold text-slate-200">Ch.{comic.chapters}</span>
                </div>
              </div>
              <h3 className="mb-0.5 truncate text-sm font-bold text-slate-200 group-hover:text-white">{comic.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{comic.genre}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400">{comic.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-slate-700" />
            <p className="text-lg font-semibold text-slate-400">Không tìm thấy kết quả</p>
            <p className="mt-1 text-sm text-slate-600">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
  );
}
