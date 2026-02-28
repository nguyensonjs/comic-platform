'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Search,
  Bell,
  BookOpen,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
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
  Zap,
} from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
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

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? 'border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent'
        }`}
    >
      {/* Top glowing accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main nav content */}
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'
            }`}
        >

          {/* ── Logo ── */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Image
                src="/logo-v2.png"
                alt="NetComic Logo"
                width={40}
                height={40}
                className="h-full w-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-[19px] font-black tracking-tighter text-transparent">
                NET
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 dark:text-cyan-400 uppercase">
                comic
              </span>
            </div>
          </Link>

          {/* ── Search bar (desktop) ── */}
          <form
            onSubmit={handleSearch}
            className="relative hidden max-w-sm flex-1 md:flex"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-slate-500 transition-colors duration-200 group-focus-within:text-blue-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm truyện, tác giả..."
              className="w-full rounded-full border border-slate-200/50 dark:border-slate-700/40 bg-white/50 dark:bg-slate-900/40 py-2.5 pr-4 pl-11 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 backdrop-blur-md transition-all duration-300 focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            />
          </form>

          {/* ── Right actions ── */}
          <div className="flex shrink-0 items-center gap-1">

            {/* Desktop icons */}
            <div className="hidden items-center gap-1 md:flex">

              <Link
                href="/the-loai"
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                Thể loại
              </Link>
              <Link
                href="/danh-sach"
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-white"
              >
                <Menu className="h-4 w-4" />
                Danh sách
              </Link>

              {/* Dropdown: Khám phá */}
              <div className="group relative">
                <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-white">
                  <Swords className="h-4 w-4" />
                  Khám phá
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                {/* Dropdown panel */}
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 origin-top-right scale-95 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/95 p-2 opacity-0 shadow-2xl shadow-black/10 dark:shadow-black/50 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  <Link href="/xep-hang" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400">
                    <Crown className="h-4 w-4 text-amber-400" />
                    Bảng xếp hạng
                  </Link>
                  <Link href="/diem-danh" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-green-400">
                    <CalendarCheck className="h-4 w-4 text-green-400" />
                    Điểm danh
                  </Link>
                  <Link href="/nhiem-vu" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-blue-400">
                    <Trophy className="h-4 w-4 text-blue-400" />
                    Nhiệm vụ
                  </Link>
                  <Link href="/cua-hang" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-purple-400">
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                    Cửa hàng
                  </Link>
                  <Link href="/vong-quay" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-amber-400">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Vòng quay
                  </Link>
                  <Link href="/nhan-vat" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-pink-400">
                    <Sword className="h-4 w-4 text-pink-400" />
                    Nhân vật
                  </Link>
                  <div className="my-1 border-t border-slate-800" />
                  <Link href="/ca-nhan" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-all hover:bg-slate-800 hover:text-cyan-400">
                    <User className="h-4 w-4 text-cyan-400" />
                    Trang cá nhân
                  </Link>
                </div>
              </div>

              <button className="group relative rounded-xl p-2.5 text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-white">
                <Bell className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {/* Notification dot */}
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
              </button>

              <Link
                href="/thu-vien"
                className="group rounded-xl p-2.5 text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <BookOpen className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>

              <Link
                href="/yeu-thich"
                className="group rounded-xl p-2.5 text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400"
              >
                <Heart className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>

              {/* Profile avatar shortcut */}
              <Link
                href="/ca-nhan"
                className="group relative ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg shadow-lg shadow-blue-900/40 ring-2 ring-slate-800 transition-all hover:ring-blue-500/60 hover:shadow-blue-800/60"
                title="Trang cá nhân"
              >
                ⚡
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-green-400 shadow shadow-green-400/50" />
              </Link>

              <div className="mx-2 h-6 w-px bg-slate-800" />

              {/* Login button */}
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
              >
                <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                Đăng nhập
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-yellow-400"
                aria-label="Toggle theme"
              >
                {mounted && (theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />)}
              </button>
            </div>

            {/* Mobile burger */}
            <button
              className="rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-800 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen
            ? 'max-h-96 border-t border-slate-200 dark:border-slate-800 pb-6 opacity-100'
            : 'max-h-0 opacity-0'
            }`}
        >
          <div className="mt-4 space-y-3">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/70 py-3 pr-4 pl-11 text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </form>

            {/* Mobile nav links */}
            <div className="grid grid-cols-2 gap-2">
              <Link href="/the-loai" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-4 transition-all hover:bg-slate-200 dark:hover:bg-slate-800">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Thể loại</span>
              </Link>
              <Link href="/danh-sach" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-4 transition-all hover:bg-slate-200 dark:hover:bg-slate-800">
                <Menu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Danh sách</span>
              </Link>
              <Link href="/thu-vien" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <BookOpen className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-medium text-slate-200">Thư viện</span>
              </Link>
              <Link href="/yeu-thich" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <Heart className="h-5 w-5 text-pink-400" />
                <span className="text-sm font-medium text-slate-200">Yêu thích</span>
              </Link>
              <Link href="/xep-hang" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-medium text-slate-200">Xếp hạng</span>
              </Link>
              <Link href="/diem-danh" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <CalendarCheck className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-slate-200">Điểm danh</span>
              </Link>
              <Link href="/nhiem-vu" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <Trophy className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-200">Nhiệm vụ</span>
              </Link>
              <Link href="/cua-hang" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <ShoppingBag className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-slate-200">Cửa hàng</span>
              </Link>
              <Link href="/nhan-vat" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800">
                <Sword className="h-5 w-5 text-pink-400" />
                <span className="text-sm font-medium text-slate-200">Nhân vật</span>
              </Link>
            </div>

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all active:scale-98"
            >
              <User className="h-5 w-5" />
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
