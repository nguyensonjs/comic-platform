'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/app/components/providers/AuthProvider';
import {
  Search,
  Bell,
  BookOpen,
  Heart,
  User,
  Menu,
  X,
  LogIn,
  Crown,
  CalendarCheck,
  ShoppingBag,
  Trophy,
  ChevronDown,
  Swords,
  Sword,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinkClass =
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-slate-100';

  const iconBtnClass =
    'relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-500 dark:hover:text-cyan-400';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 shadow-sm dark:shadow-slate-950/50 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Accent line */}
      <div
        className={`absolute left-0 right-0 top-0 h-px transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-16'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-xl px-1 py-1.5 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/30 -ml-1"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/50 ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all duration-300 group-hover:ring-blue-400/30 group-hover:scale-105">
              <Image
                src="/logo-neon.svg"
                alt="NetComic"
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold tracking-tight text-slate-800 dark:text-white text-lg">
                NET
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-blue-500 dark:text-cyan-400 uppercase opacity-90">
                comic
              </span>
            </div>
          </Link>

          {/* Search (desktop) */}
          <form
            onSubmit={handleSearch}
            className="group relative hidden max-w-xs flex-1 md:flex md:justify-center lg:max-w-sm"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 transition-colors duration-200 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm truyện, tác giả..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/50 py-2.5 pr-4 pl-11 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:border-blue-400/60 dark:focus:border-cyan-500/50 focus:bg-white dark:focus:bg-slate-800/80 focus:ring-2 focus:ring-blue-400/10 dark:focus:ring-cyan-500/10 focus:outline-none"
            />
          </form>

          {/* Right: desktop nav + actions */}
          <div className="flex shrink-0 items-center gap-0.5">
            <div className="hidden items-center gap-0.5 md:flex">
              <Link href="/the-loai" className={navLinkClass}>
                <BookOpen className="h-4 w-4" />
                <span className="hidden lg:inline">Thể loại</span>
              </Link>
              <Link href="/danh-sach" className={navLinkClass}>
                <Menu className="h-4 w-4" />
                <span className="hidden lg:inline">Danh sách</span>
              </Link>

              {/* Dropdown: Khám phá */}
              <div className="relative group/drop">
                <button
                  type="button"
                  className={`${navLinkClass} gap-1`}
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <Swords className="h-4 w-4" />
                  <span className="hidden lg:inline">Khám phá</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/drop:rotate-180" />
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-1.5 w-56 origin-top-right scale-95 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/95 p-2 opacity-0 shadow-xl shadow-slate-900/10 dark:shadow-black/40 backdrop-blur-xl transition-all duration-200 group-hover/drop:visible group-hover/drop:scale-100 group-hover/drop:opacity-100">
                  <div className="space-y-0.5">
                    <Link
                      href="/xep-hang"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40">
                        <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      Bảng xếp hạng
                    </Link>
                    <Link
                      href="/diem-danh"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                        <CalendarCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      Điểm danh
                    </Link>
                    <Link
                      href="/nhiem-vu"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                        <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      Nhiệm vụ
                    </Link>
                    <Link
                      href="/cua-hang"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-700 dark:hover:text-purple-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40">
                        <ShoppingBag className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      Cửa hàng
                    </Link>
                    <Link
                      href="/vong-quay"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40">
                        <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      Vòng quay
                    </Link>
                    <Link
                      href="/nhan-vat"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-colors hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-700 dark:hover:text-pink-400"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/40">
                        <Sword className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                      </div>
                      Nhân vật
                    </Link>
                  </div>
                  {isLoggedIn && (
                    <>
                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />
                      <Link
                        href="/ca-nhan"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:text-cyan-700 dark:hover:text-cyan-400"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/40">
                          <User className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        Trang cá nhân
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700/60" />

              <button type="button" className={iconBtnClass} aria-label="Thông báo">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
              </button>
              <Link href="/thu-vien" className={iconBtnClass} aria-label="Thư viện">
                <BookOpen className="h-5 w-5" />
              </Link>
              <Link href="/yeu-thich" className={iconBtnClass} aria-label="Yêu thích">
                <Heart className="h-5 w-5" />
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/ca-nhan"
                  className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-base font-bold text-white shadow-md shadow-blue-500/25 ring-2 ring-white dark:ring-slate-900 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                  title="Trang cá nhân"
                >
                  ⚡
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-100 px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition-all duration-200 hover:bg-blue-600 dark:hover:bg-white hover:shadow-md hover:shadow-blue-500/20"
                >
                  <LogIn className="h-4 w-4" />
                  Đăng nhập
                </Link>
              )}

              <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-700/60" />

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`ml-1 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 ${iconBtnClass}`}
                aria-label="Đổi giao diện sáng/tối"
              >
                {mounted && (theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-xl md:hidden ${iconBtnClass}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`grid transition-all duration-300 ease-out md:hidden ${
            isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 pb-6 pt-4">
              <form onSubmit={handleSearch} className="mb-4 px-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm truyện, tác giả..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 py-3 pr-4 pl-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>
              </form>

              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Khám phá
              </p>
              <div className="mb-4 grid grid-cols-2 gap-2 px-1">
                {[
                  { href: '/the-loai', icon: BookOpen, label: 'Thể loại', color: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40' },
                  { href: '/danh-sach', icon: Menu, label: 'Danh sách', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40' },
                  { href: '/thu-vien', icon: BookOpen, label: 'Thư viện', color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/40' },
                  { href: '/yeu-thich', icon: Heart, label: 'Yêu thích', color: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/40' },
                  { href: '/xep-hang', icon: Crown, label: 'Xếp hạng', color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40' },
                  { href: '/diem-danh', icon: CalendarCheck, label: 'Điểm danh', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40' },
                  { href: '/nhiem-vu', icon: Trophy, label: 'Nhiệm vụ', color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40' },
                  { href: '/cua-hang', icon: ShoppingBag, label: 'Cửa hàng', color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40' },
                  { href: '/nhan-vat', icon: Sword, label: 'Nhân vật', color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40' },
                ].map(({ href, icon: Icon, label, color }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-3 transition-all active:scale-[0.98] hover:border-blue-300/50 dark:hover:border-cyan-500/30 hover:shadow-sm"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
                  </Link>
                ))}
              </div>

              {isLoggedIn ? (
                <Link
                  href="/ca-nhan"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition active:scale-[0.99]"
                >
                  <User className="h-5 w-5" />
                  Trang cá nhân
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white py-3.5 text-sm font-semibold text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/20 transition active:scale-[0.99]"
                >
                  <User className="h-5 w-5" />
                  Đăng nhập / Đăng ký
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
