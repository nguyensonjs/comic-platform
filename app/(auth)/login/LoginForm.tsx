'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChromeIcon, Github, ArrowRight, Eye, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/app/components/providers/AuthProvider';
import Image from 'next/image';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    router.push('/ca-nhan');
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center text-center">
        <Link href="/" className="mb-6 inline-block">
          <Image
            src="/logo-neon.svg"
            alt="NetComic Logo"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>
        <h1 className="text-xl font-black text-foreground sm:text-2xl">Chào mừng trở lại</h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          Đăng nhập để tiếp tục hành trình của bạn
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700"
          >
            <ChromeIcon className="h-4 w-4 text-red-400" />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700"
          >
            <Github className="h-4 w-4" />
            GitHub
          </button>
        </div>

        <div className="relative mb-6 flex items-center">
          <div className="flex-1 border-t border-slate-800" />
          <span className="mx-4 text-xs text-slate-500">hoặc đăng nhập bằng email</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-500/50"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Mật khẩu
              </label>
              <Link href="#" className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-500/50"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <div className="h-4 w-4 rounded border border-slate-600 bg-slate-800" />
            <span className="text-sm text-slate-400">Ghi nhớ đăng nhập</span>
          </label>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35"
          >
            Đăng nhập
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
            Đăng ký miễn phí
          </Link>
        </p>
      </div>
    </>
  );
}
