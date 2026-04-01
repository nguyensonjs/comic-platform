import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function StaticInfoPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen pb-16 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-20 sm:pt-24"
      style={{ background: 'var(--page-bg-gradient)' }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-900/15" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Trang chủ
        </Link>
        <article className="rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-xl shadow-zinc-950/5 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-black/25 sm:p-8">
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white sm:text-3xl">{title}</h1>
          {lead ? (
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">{lead}</p>
          ) : null}
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-slate-300">{children}</div>
        </article>
      </div>
    </div>
  );
}
