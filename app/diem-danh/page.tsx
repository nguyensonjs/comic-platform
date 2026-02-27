'use client';

import { useState } from 'react';
import { Sparkles, Gift, Calendar, CheckCircle2, Lock, Zap, Crown, ChevronRight } from 'lucide-react';

const checkInDays = [
  { day: 1,  reward: '50',   unit: 'Linh thạch',  icon: '💎', claimed: true  },
  { day: 2,  reward: '80',   unit: 'Linh thạch',  icon: '💎', claimed: true  },
  { day: 3,  reward: '120',  unit: 'Linh thạch',  icon: '💎', claimed: true  },
  { day: 4,  reward: '1',    unit: 'Đan dược',     icon: '⚗️', claimed: true  },
  { day: 5,  reward: '200',  unit: 'Linh thạch',  icon: '💎', claimed: true  },
  { day: 6,  reward: '300',  unit: 'Linh thạch',  icon: '💎', claimed: false, isToday: true },
  { day: 7,  reward: '1',    unit: 'Vũ khí',       icon: '⚔️', claimed: false },
  { day: 14, reward: '1',    unit: 'Trang bị hiếm',icon: '🏆', claimed: false, isMilestone: true },
  { day: 21, reward: '2',    unit: 'Vũ khí quý',  icon: '🗡️', claimed: false, isMilestone: true },
  { day: 30, reward: '1',    unit: 'Thần khí',     icon: '👑', claimed: false, isMilestone: true },
];

const bonusStreak = [
  { streak: 7,  label: '7 ngày',  reward: 'Vũ khí thượng phẩm', icon: '⚔️', color: 'text-blue-400',   bg: 'bg-blue-900/20',   border: 'border-blue-700/30'   },
  { streak: 14, label: '14 ngày', reward: 'Đan dược thần cấp',   icon: '⚗️', color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30' },
  { streak: 30, label: '30 ngày', reward: 'Thần Khí Truyền Thế', icon: '👑', color: 'text-amber-400',  bg: 'bg-amber-900/20',  border: 'border-amber-700/30'  },
];

export default function CheckInPage() {
  const [claimed, setClaimed] = useState(false);
  const currentStreak = 5;
  const totalStones = 1_250;

  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{ background: 'radial-gradient(ellipse at top, #0d1b3e 0%, #050b18 60%, #030710 100%)' }}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/3 h-[500px] w-[600px] rounded-full bg-purple-900/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-800/8 blur-[100px]" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-300/30"
            style={{ top: `${10 + i * 11}%`, left: `${5 + i * 12}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${2 + i * 0.3}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-900/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
            <Calendar className="h-4 w-4" />
            Điểm danh hằng ngày
          </div>
          <h1 className="text-3xl font-black text-white md:text-4xl">
            Tu Luyện{' '}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Mỗi Ngày
            </span>
          </h1>
          <p className="mt-2 text-slate-500">Điểm danh để nhận linh thạch và vật phẩm quý giá</p>
        </div>

        {/* Stats bar */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-amber-800/30 bg-amber-900/15 p-4 text-center">
            <div className="text-2xl font-black text-amber-300">💎 {totalStones.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Linh thạch tích lũy</div>
          </div>
          <div className="rounded-2xl border border-purple-800/30 bg-purple-900/15 p-4 text-center">
            <div className="text-2xl font-black text-purple-300">🔥 {currentStreak}</div>
            <div className="text-xs text-slate-500">Chuỗi ngày liên tiếp</div>
          </div>
          <div className="rounded-2xl border border-blue-800/30 bg-blue-900/15 p-4 text-center">
            <div className="text-2xl font-black text-blue-300">🗓 {new Date().getDate()}/27</div>
            <div className="text-xs text-slate-500">Ngày trong tháng</div>
          </div>
        </div>

        {/* Today's check-in hero */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-amber-600/40 shadow-2xl shadow-amber-950/40"
          style={{ background: 'linear-gradient(135deg, rgba(40,20,5,0.95) 0%, rgba(10,8,25,0.98) 100%)' }}
        >
          <div className="relative p-8 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-amber-400/5 blur-3xl" />
            </div>
            <div className="relative">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-500/40 bg-gradient-to-br from-amber-500 to-orange-600 text-5xl shadow-2xl shadow-amber-900/60">
                💎
              </div>
              <p className="mb-1 text-slate-400">Phần thưởng hôm nay — Ngày {currentStreak + 1}</p>
              <p className="text-4xl font-black text-amber-300">+300 Linh thạch</p>

              {!claimed ? (
                <button
                  onClick={() => setClaimed(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-4 text-lg font-black text-white shadow-xl shadow-amber-900/40 transition-all hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-800/60 active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  Điểm danh ngay!
                </button>
              ) : (
                <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-green-600/40 bg-green-900/20 px-8 py-4 text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold">Đã điểm danh hôm nay!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 30-day calendar grid */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800/50"
          style={{ background: 'linear-gradient(180deg, rgba(12,8,35,0.96) 0%, rgba(4,6,18,0.98) 100%)' }}
        >
          <div className="border-b border-slate-800/50 px-6 py-4">
            <h2 className="font-black text-white">Lịch điểm danh tháng này</h2>
          </div>
          <div className="grid grid-cols-5 gap-3 p-5 sm:grid-cols-7">
            {checkInDays.map((d) => (
              <div key={d.day}
                className={`relative flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all ${
                  d.isMilestone
                    ? 'border-amber-700/50 bg-amber-900/20'
                    : d.isToday
                    ? 'border-blue-600/50 bg-blue-950/40'
                    : d.claimed
                    ? 'border-green-700/30 bg-green-950/20'
                    : 'border-slate-800/50 bg-slate-900/30'
                }`}
              >
                {d.claimed && (
                  <CheckCircle2 className="absolute -top-1.5 -right-1.5 h-4 w-4 text-green-400" />
                )}
                {d.isToday && !d.claimed && (
                  <div className="absolute -top-1.5 -right-1.5 h-3 w-3 animate-pulse rounded-full bg-blue-400" />
                )}
                <span className={`text-xs font-bold ${d.claimed ? 'text-green-400' : d.isToday ? 'text-blue-400' : d.isMilestone ? 'text-amber-400' : 'text-slate-600'}`}>
                  Ngày {d.day}
                </span>
                <span className="text-2xl">{d.claimed ? '✅' : d.isToday ? d.icon : d.claimed === false && !d.isMilestone ? <Lock className="h-4 w-4 text-slate-700" /> : d.icon}</span>
                <span className="text-[10px] font-semibold text-slate-500">{d.reward} {d.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Streak bonus */}
        <div>
          <h2 className="mb-4 text-lg font-black text-white">Thưởng chuỗi liên tiếp</h2>
          <div className="space-y-3">
            {bonusStreak.map((b) => (
              <div key={b.streak} className={`flex items-center gap-4 rounded-2xl border ${b.border} ${b.bg} px-5 py-4`}>
                <span className="text-3xl">{b.icon}</span>
                <div className="flex-1">
                  <p className={`font-black ${b.color}`}>{b.label} liên tiếp</p>
                  <p className="text-sm text-slate-400">{b.reward}</p>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${b.color.replace('text-', 'bg-').replace('-400', '-500')}`}
                    style={{ width: `${Math.min(100, (currentStreak / b.streak) * 100)}%` }} />
                </div>
                <span className={`text-sm font-bold ${b.color}`}>{currentStreak}/{b.streak}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
