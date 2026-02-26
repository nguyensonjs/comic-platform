'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="glass-nav border-primary/10 sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex cursor-pointer items-center gap-4">
            <div className="from-primary to-qi-teal shadow-primary/25 group-hover:shadow-primary/40 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all group-hover:scale-105">
              <span className="material-symbols-outlined text-2xl font-bold text-white">
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="to-primary bg-gradient-to-r from-white via-slate-200 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                COSMIC
              </h1>
              <span className="text-xs font-light tracking-widest text-slate-400 uppercase">
                cultivation
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="mx-8 hidden max-w-lg flex-1 md:flex">
            <div className="group relative w-full">
              <form onSubmit={handleSearch}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                  <span className="material-symbols-outlined group-focus-within:text-qi-teal text-xl text-slate-400 transition-colors">
                    search
                  </span>
                </div>
                <input
                  className="focus:border-qi-teal/50 focus:ring-qi-teal/30 block w-full rounded-full border border-slate-700/50 bg-slate-900/60 py-3 pr-5 pl-12 text-sm text-white placeholder-slate-400 shadow-lg backdrop-blur-sm transition-all focus:bg-slate-900/80 focus:ring-2 focus:outline-none"
                  placeholder="Tìm kiếm truyện, tác giả, thể loại..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-800/50 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>

            <div className="hidden items-center gap-3 md:flex">
              {/* Notifications */}
              <button className="hover:text-qi-teal group relative rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-800/50">
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="bg-qi-teal shadow-qi-teal/50 absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full shadow-lg"></span>
              </button>

              {/* Library */}
              <Link
                href="/library"
                className="hover:text-qi-teal rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-800/50"
              >
                <span className="material-symbols-outlined text-xl">library_books</span>
              </Link>

              {/* Favorites */}
              <Link
                href="/favorites"
                className="hover:text-qi-teal rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-800/50"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
              </Link>

              <div className="mx-2 h-6 w-px bg-slate-700/50"></div>

              {/* User Profile */}
              <Link
                href="/login"
                className="from-primary/20 to-qi-teal/20 hover:from-primary/30 hover:to-qi-teal/30 border-primary/30 hover:border-primary/50 hover:shadow-primary/25 group flex items-center gap-3 rounded-full border bg-gradient-to-r px-5 py-2.5 shadow-lg transition-all"
              >
                <span className="material-symbols-outlined text-primary group-hover:text-qi-teal text-lg transition-colors">
                  account_circle
                </span>
                <span className="text-sm font-semibold text-white">Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-primary/10 absolute top-full right-0 left-0 border-t bg-slate-900/95 shadow-2xl backdrop-blur-md md:hidden">
            <div className="space-y-4 px-4 py-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 transform text-xl text-slate-400">
                  search
                </span>
                <input
                  className="focus:border-qi-teal/50 focus:ring-qi-teal/30 w-full rounded-full border border-slate-700/50 bg-slate-800/60 py-3 pr-4 pl-11 text-sm text-white placeholder-slate-400 transition-all focus:ring-2 focus:outline-none"
                  placeholder="Tìm kiếm..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* Mobile Navigation */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/library"
                  className="flex items-center gap-3 rounded-lg bg-slate-800/40 p-3 transition-all hover:bg-slate-800/60"
                >
                  <span className="material-symbols-outlined text-qi-teal">library_books</span>
                  <span className="text-sm text-white">Thư viện</span>
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center gap-3 rounded-lg bg-slate-800/40 p-3 transition-all hover:bg-slate-800/60"
                >
                  <span className="material-symbols-outlined text-qi-teal">favorite</span>
                  <span className="text-sm text-white">Yêu thích</span>
                </Link>
              </div>

              <Link
                href="/login"
                className="from-primary to-qi-teal hover:shadow-primary/25 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3 font-semibold text-white shadow-lg transition-all"
              >
                <span className="material-symbols-outlined">account_circle</span>
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
