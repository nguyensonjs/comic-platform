'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Zap, BookOpen, Star, MessageCircle, Trophy, RefreshCcw, ChevronRight } from 'lucide-react';

type QuestStatus = 'done' | 'active' | 'locked';

interface Quest {
  id: number;
  title: string;
  desc: string;
  reward: number;
  bonus?: string;
  progress: number;
  total: number;
  status: QuestStatus;
  icon: string;
  category: 'daily' | 'weekly' | 'main';
}

const quests: Quest[] = [
  // Daily
  { id: 1,  title: 'Đọc truyện hằng ngày',    desc: 'Đọc 5 chapter bất kỳ hôm nay',              reward: 100,  progress: 5,  total: 5,  status: 'done',   icon: '📖', category: 'daily' },
  { id: 2,  title: 'Điểm danh',                desc: 'Điểm danh nhận thưởng hôm nay',             reward: 300,  progress: 1,  total: 1,  status: 'done',   icon: '📅', category: 'daily' },
  { id: 3,  title: 'Bình luận tu luyện',        desc: 'Để lại 3 bình luận có giá trị',             reward: 150,  progress: 1,  total: 3,  status: 'active', icon: '💬', category: 'daily' },
  { id: 4,  title: 'Đánh giá tác phẩm',         desc: 'Đánh giá 2 bộ truyện bạn đã đọc',          reward: 200,  progress: 0,  total: 2,  status: 'active', icon: '⭐', category: 'daily' },
  { id: 5,  title: 'Giới thiệu truyện',          desc: 'Chia sẻ 1 bộ truyện lên mạng xã hội',      reward: 250,  progress: 0,  total: 1,  status: 'active', icon: '📣', category: 'daily' },
  { id: 6,  title: 'Thêm vào thư viện',          desc: 'Thêm 3 bộ truyện vào thư viện của bạn',    reward: 120,  progress: 0,  total: 3,  status: 'locked', icon: '📚', category: 'daily' },
  // Weekly
  { id: 7,  title: 'Chiến thần đọc sách',        desc: 'Đọc 50 chapter trong tuần',                reward: 800,  bonus: '1 Đan dược',       progress: 23, total: 50, status: 'active', icon: '🏆', category: 'weekly' },
  { id: 8,  title: 'Nhà phê bình huyền thoại',   desc: 'Viết 10 đánh giá chi tiết trong tuần',     reward: 600,  bonus: '1 Huyền tinh thạch', progress: 3, total: 10, status: 'active', icon: '✍️', category: 'weekly' },
  { id: 9,  title: 'Người truyền bá',             desc: 'Giới thiệu 5 người dùng mới',              reward: 1500, bonus: '1 Vũ khí thượng phẩm', progress: 1, total: 5, status: 'active', icon: '🌟', category: 'weekly' },
  // Main
  { id: 10, title: 'Bước vào con đường tu tiên', desc: 'Đọc bộ truyện đầu tiên đến chương 10',    reward: 500,  progress: 10, total: 10, status: 'done',   icon: '⚡', category: 'main' },
  { id: 11, title: 'Kim Đan kết thành',           desc: 'Lên cấp từ Luyện Khí lên Kim Đan',        reward: 1000, progress: 3,  total: 5,  status: 'active', icon: '💎', category: 'main' },
  { id: 12, title: 'Hóa Thần đại thành',          desc: 'Đạt cảnh giới Hóa Thần trong tu luyện',   reward: 3000, bonus: '1 Thần khí',        progress: 0, total: 1, status: 'locked', icon: '👑', category: 'main' },
];

const tabs = [
  { id: 'daily',  label: 'Hằng ngày', icon: '📅' },
  { id: 'weekly', label: 'Hàng tuần', icon: '🗓' },
  { id: 'main',   label: 'Chính tuyến', icon: '⚡' },
];

const resetIn = '14:23:07'; // countdown mock

export default function QuestsPage() {
  const [tab, setTab] = useState<'daily' | 'weekly' | 'main'>('daily');

  const shown = quests.filter(q => q.category === tab);
  const totalEarned = quests.filter(q => q.status === 'done').reduce((s, q) => s + q.reward, 0);
  const doneCount = quests.filter(q => q.status === 'done').length;

  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{ background: 'radial-gradient(ellipse at top, #0d1b3e 0%, #050b18 60%, #030710 100%)' }}
    >
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-900/12 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-900/8 blur-[100px]" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-300/20"
            style={{ top: `${12 + i * 14}%`, left: `${8 + i * 15}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-700/40 bg-blue-900/20 px-3 py-1.5 text-xs font-semibold text-blue-300">
              <Trophy className="h-3.5 w-3.5" />
              Nhiệm vụ tu luyện
            </div>
            <h1 className="text-4xl font-black text-white">
              Tông Môn{' '}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Nhiệm Vụ
              </span>
            </h1>
            <p className="mt-2 text-slate-500">Hoàn thành nhiệm vụ để nhận linh thạch và vật phẩm quý</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-blue-800/30 bg-blue-900/15 px-5 py-3 text-sm">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-slate-400">Reset sau:</span>
            <span className="font-black text-blue-300">{resetIn}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-green-800/30 bg-green-900/10 px-5 py-5 text-center">
            <div className="text-3xl font-black text-green-400">{doneCount}/{quests.length}</div>
            <div className="mt-1 text-xs text-slate-500">Đã hoàn thành</div>
          </div>
          <div className="rounded-2xl border border-amber-800/30 bg-amber-900/10 px-5 py-5 text-center">
            <div className="text-3xl font-black text-amber-300">💎 {totalEarned.toLocaleString()}</div>
            <div className="mt-1 text-xs text-slate-500">Linh thạch kiếm được</div>
          </div>
          <div className="rounded-2xl border border-blue-800/30 bg-blue-900/10 px-5 py-5 text-center">
            <div className="text-3xl font-black text-blue-300">🔥 5</div>
            <div className="mt-1 text-xs text-slate-500">Ngày liên tiếp</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-7 flex gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-800/30'
                  : 'border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Quest list */}
        <div className="space-y-4">
          {shown.map((q) => {
            const pct = Math.min(100, (q.progress / q.total) * 100);
            return (
              <div key={q.id}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  q.status === 'done'   ? 'border-green-800/40 bg-green-950/20'
                  : q.status === 'locked' ? 'border-slate-800/40 bg-slate-950/50 opacity-60'
                  : 'border-slate-800/50 bg-slate-950/80 hover:border-slate-700/60'
                }`}
              >
                <div className="flex items-center gap-5 px-6 py-5">
                  {/* Icon */}
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl ${
                    q.status === 'done'   ? 'bg-green-900/30'
                    : q.status === 'locked' ? 'bg-slate-800/50'
                    : 'bg-blue-900/20'
                  }`}>
                    {q.status === 'done' ? '✅' : q.status === 'locked' ? '🔒' : q.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h3 className={`text-base font-black ${q.status === 'done' ? 'text-green-300' : q.status === 'locked' ? 'text-slate-600' : 'text-white'}`}>
                        {q.title}
                      </h3>
                      {q.status === 'done' && (
                        <span className="rounded-full bg-green-800/40 px-2 py-0.5 text-[10px] font-bold text-green-400">XONG</span>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-slate-500">{q.desc}</p>
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 overflow-hidden rounded-full bg-slate-800 h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            q.status === 'done' ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-slate-500">{q.progress}/{q.total}</span>
                    </div>
                  </div>

                  {/* Reward + CTA */}
                  <div className="ml-2 flex w-32 shrink-0 flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">💎</span>
                      <span className="text-lg font-black text-amber-300">{q.reward}</span>
                    </div>
                    {q.bonus && (
                      <span className="text-right text-[11px] font-semibold text-purple-400">+ {q.bonus}</span>
                    )}
                    {q.status === 'done' && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Đã nhận
                      </span>
                    )}
                    {q.status === 'active' && pct >= 100 && (
                      <button className="w-full rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-all hover:bg-blue-500">
                        Nhận thưởng
                      </button>
                    )}
                    {q.status === 'active' && pct < 100 && (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Zap className="h-3 w-3" /> {Math.round(pct)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom accent line */}
                {q.status === 'done' && (
                  <div className="h-0.5 w-full bg-gradient-to-r from-green-700/50 via-green-500/40 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Refresh note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-600">
          <RefreshCcw className="h-3.5 w-3.5" />
          Nhiệm vụ hằng ngày reset lúc 00:00 · Hàng tuần reset thứ Hai
        </div>
      </div>
    </div>
  );
}
