import Link from 'next/link';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  ChromeIcon,
} from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="group mb-6 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-xl font-black tracking-wide text-transparent">
                COSMIC
              </span>
              <span className="text-[9px] font-semibold tracking-[0.22em] text-cyan-400 uppercase">
                cultivation
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white">Chào mừng trở lại</h1>
          <p className="mt-1 text-sm text-slate-400">Đăng nhập để tiếp tục hành trình của bạn</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl">
          {/* Social logins */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700">
              <ChromeIcon className="h-4 w-4 text-red-400" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700">
              <Github className="h-4 w-4" />
              GitHub
            </button>
          </div>

          <div className="relative mb-6 flex items-center">
            <div className="flex-1 border-t border-slate-800" />
            <span className="mx-4 text-xs text-slate-500">hoặc đăng nhập bằng email</span>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pr-4 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pr-10 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
                <button type="button" className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2.5">
              <div className="h-4 w-4 rounded border border-slate-600 bg-slate-800" />
              <span className="text-sm text-slate-400">Ghi nhớ đăng nhập</span>
            </label>

            {/* Submit */}
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
      </div>
    </div>
  );
}
