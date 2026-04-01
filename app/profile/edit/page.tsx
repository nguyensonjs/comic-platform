'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, Save, UserRound } from 'lucide-react';
import { RequireAuth } from '@/app/components/RequireAuth';

export default function ProfileEditPage() {
  const [displayName, setDisplayName] = useState('Nguyễn Văn A');
  const [username, setUsername] = useState('nguyenvana');
  const [bio, setBio] = useState(
    'Kiếm tu cô đường, chẳng sợ trời đất. Một kiếm phá hư không, vạn cổ lưu danh. ⚔️',
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <RequireAuth>
      <div
        className="relative min-h-screen pb-20 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-24 sm:pt-24"
        style={{ background: 'var(--page-bg-gradient)' }}
      >
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 h-[420px] w-[520px] rounded-full bg-purple-300/12 blur-[100px] dark:bg-purple-900/15" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-300/10 blur-[90px] dark:bg-blue-900/15" />
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
            <div className="absolute inset-0 z-0 hidden bg-gradient-to-b from-purple-500/[0.04] to-transparent dark:block" />
            <div className="relative z-10 border-b border-zinc-200/80 px-5 py-4 dark:border-slate-800/60">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <UserRound className="h-5 w-5" />
                <h1 className="text-lg font-black text-zinc-950 dark:text-white sm:text-xl">
                  Chỉnh sửa hồ sơ
                </h1>
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-slate-500">
                Cập nhật tên hiển thị, tên người dùng và giới thiệu.
              </p>
            </div>

            <div className="relative z-10 space-y-5 p-5 sm:p-6">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 dark:border-slate-700 dark:bg-slate-900/50">
                  <span className="text-4xl">⚡</span>
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-md transition-colors hover:bg-zinc-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    aria-label="Đổi ảnh đại diện"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <p className="max-w-xs text-center text-xs text-zinc-500 sm:text-left dark:text-slate-500">
                  Ảnh đại diện (tùy chọn). Kích thước khuyến nghị 400×400 px, định dạng JPG hoặc PNG.
                </p>
              </div>

              <div>
                <label htmlFor="displayName" className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-slate-400">
                  Tên hiển thị
                </label>
                <input
                  id="displayName"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-blue-500/50 dark:focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-slate-400">
                  Tên người dùng
                </label>
                <div className="flex rounded-xl border border-zinc-200 bg-zinc-50/80 dark:border-slate-700 dark:bg-slate-900/50">
                  <span className="flex items-center border-r border-zinc-200 px-3 text-sm text-zinc-400 dark:border-slate-600 dark:text-slate-500">
                    @
                  </span>
                  <input
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                    className="h-11 min-w-0 flex-1 rounded-r-xl bg-transparent px-3 text-sm text-zinc-900 outline-none dark:text-slate-100"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-slate-400">
                  Giới thiệu
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={4}
                  className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-blue-500/50 dark:focus:ring-blue-500/20"
                />
                <p className="mt-1 text-[11px] text-zinc-400 dark:text-slate-600">{bio.length}/500 ký tự</p>
              </div>

              <div className="flex flex-col gap-3 border-t border-zinc-200/80 pt-5 dark:border-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-zinc-500 dark:text-slate-500">
                  Thay đổi chỉ lưu trên trình duyệt (demo).
                </p>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/25 transition-all hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] dark:shadow-black/40"
                >
                  <Save className="h-4 w-4" />
                  {saved ? 'Đã lưu' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
