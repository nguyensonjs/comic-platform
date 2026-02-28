import Link from 'next/link';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  ChromeIcon,
  CheckCircle2,
} from 'lucide-react';

const perks = [
  'Đọc truyện không giới hạn',
  'Lưu thư viện cá nhân',
  'Nhận thông báo chapter mới',
  'Tham gia cộng đồng',
];

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 transition-colors duration-300">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-500/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-600/8 blur-[100px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: promo */}
        <div className="flex flex-col justify-center">
          <Link href="/" className="group mb-8 inline-flex items-center gap-3">
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

          <h2 className="mb-3 text-3xl font-black text-foreground">
            Tham gia cùng<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              89,000+ độc giả
            </span>
          </h2>
          <p className="mb-8 text-slate-500 dark:text-slate-400">
            Đăng ký miễn phí và bắt đầu hành trình khám phá thế giới truyện tranh vô tận.
          </p>

          <div className="space-y-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-400" />
                <span className="text-slate-600 dark:text-slate-300">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-8 backdrop-blur-xl">
          <h1 className="mb-2 text-xl font-black text-foreground">Tạo tài khoản miễn phí</h1>
          <p className="mb-6 text-sm text-slate-400">Chỉ mất 30 giây</p>

          {/* Social */}
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
            <span className="mx-4 text-xs text-slate-500">hoặc dùng email</span>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Tên hiển thị</label>
              <div className="relative">
                <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pr-4 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>

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

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  placeholder="Ít nhất 8 ký tự"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pr-4 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <Link href="/terms" className="text-blue-400 hover:underline">Điều khoản</Link>{' '}
              và{' '}
              <Link href="/privacy" className="text-blue-400 hover:underline">Chính sách bảo mật</Link>.
            </p>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500"
            >
              Tạo tài khoản
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
