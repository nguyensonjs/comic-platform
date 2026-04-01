import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { RequireAuth } from '@/app/components/RequireAuth';

export default function SettingsSecurityPage() {
  return (
    <RequireAuth>
      <div
        className="relative min-h-screen pb-20 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-24 sm:pt-24"
        style={{ background: 'var(--page-bg-gradient)' }}
      >
        <div className="relative z-10 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <Link
            href="/settings"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Cài đặt
          </Link>

          <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-xl shadow-zinc-950/5 dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-black/25">
            <div className="mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Shield className="h-6 w-6" />
              <h1 className="text-xl font-black text-zinc-950 dark:text-white">Bảo mật</h1>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
              Đổi mật khẩu, xác thực hai lớp và quản lý phiên sẽ được bổ sung sau. Quay lại Cài đặt khi cần.
            </p>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
