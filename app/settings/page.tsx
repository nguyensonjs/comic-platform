import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Globe,
  Palette,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';
import { RequireAuth } from '@/app/components/RequireAuth';

const rows = [
  {
    href: '/settings/notifications',
    label: 'Thông báo',
    desc: 'Email, đẩy và nhắc đọc truyện',
    icon: Bell,
    iconBg: 'bg-amber-100 dark:bg-amber-900/35',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    href: '/settings/security',
    label: 'Bảo mật',
    desc: 'Mật khẩu và phiên đăng nhập',
    icon: Shield,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/35',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

export default function SettingsPage() {
  return (
    <RequireAuth>
      <div
        className="relative min-h-screen pb-20 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-24 sm:pt-24"
        style={{ background: 'var(--page-bg-gradient)' }}
      >
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-20 right-1/4 h-[380px] w-[480px] rounded-full bg-cyan-300/10 blur-[100px] dark:bg-cyan-900/12" />
          <div className="absolute bottom-10 left-0 h-64 w-64 rounded-full bg-indigo-300/10 blur-[80px] dark:bg-indigo-900/15" />
        </div>

        <div className="relative z-10 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <Link
            href="/ca-nhan"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang cá nhân
          </Link>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-black/25">
            <div className="relative z-10 border-b border-zinc-200/80 px-5 py-4 dark:border-slate-800/60">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400">
                <SlidersHorizontal className="h-5 w-5" />
                <h1 className="text-lg font-black text-zinc-950 dark:text-white sm:text-xl">Cài đặt</h1>
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-slate-500">
                Quản lý tài khoản, thông báo và bảo mật.
              </p>
            </div>

            <div className="relative z-10 divide-y divide-zinc-200/80 dark:divide-slate-800/60">
              {rows.map(({ href, label, desc, icon: Icon, iconBg, iconColor }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-zinc-50/90 dark:hover:bg-slate-800/40"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-zinc-900 dark:text-slate-100">{label}</p>
                    <p className="text-xs text-zinc-500 dark:text-slate-500">{desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-zinc-300 dark:text-slate-600" />
                </Link>
              ))}
            </div>

            <div className="relative z-10 space-y-3 border-t border-zinc-200/80 p-5 dark:border-slate-800/60">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-slate-600">
                Giao diện & ngôn ngữ
              </p>
              <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-3 dark:border-slate-800/60 dark:bg-slate-900/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Palette className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium text-zinc-800 dark:text-slate-200">Chế độ sáng / tối</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-slate-500">
                    Dùng biểu tượng mặt trời / trăng trên thanh điều hướng.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-3 opacity-75 dark:border-slate-800/60 dark:bg-slate-900/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/30">
                  <Globe className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium text-zinc-800 dark:text-slate-200">Ngôn ngữ</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-slate-500">Tiếng Việt (sắp có thêm tùy chọn)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
