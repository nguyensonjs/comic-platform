'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

export default function FeedbackPage() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <div
      className="relative min-h-screen pb-16 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-20 sm:pt-24"
      style={{ background: 'var(--page-bg-gradient)' }}
    >
      <div className="relative z-10 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Trang chủ
        </Link>
        <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-xl shadow-zinc-950/5 backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-black/25 sm:p-8">
          <h1 className="text-2xl font-black text-zinc-950 dark:text-white">Góp ý</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-slate-400">
            Chia sẻ ý tưởng hoặc báo lỗi. Form demo — chưa gửi lên máy chủ.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              placeholder="Nội dung góp ý..."
              className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-blue-500/50"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 dark:shadow-black/30 sm:w-auto sm:px-6"
            >
              <Send className="h-4 w-4" />
              {sent ? 'Đã ghi nhận (demo)' : 'Gửi góp ý'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
