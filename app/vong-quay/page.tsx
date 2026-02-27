'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCcw, Package, ChevronRight, Star, Zap } from 'lucide-react';

/* ─────────── Types ─────────── */

type Rarity = 'Phổ thông' | 'Hiếm' | 'Sử thi' | 'Thần thoại';

interface GachaItem {
  name: string;
  icon: string;
  rarity: Rarity;
  type: 'weapon' | 'armor' | 'pill' | 'currency' | 'material';
  desc: string;
}

interface BannerConfig {
  id: string;
  name: string;
  subtitle: string;
  cost: number;
  currency: 'linh-thach' | 'linh-dan' | 'linh-ngoc';
  gradient: string;
  accentColor: string;
  icon: string;
  pool: GachaItem[];
  rateUp?: string;
}

/* ─────────── Item Pool ─────────── */

const commonItems: GachaItem[] = [
  { name: 'Tụ Linh Đan',        icon: '⚗️', rarity: 'Phổ thông', type: 'pill',     desc: 'Tăng linh lực +500' },
  { name: 'Linh Thạch ×50',     icon: '💎', rarity: 'Phổ thông', type: 'currency',  desc: '+50 linh thạch' },
  { name: 'Linh Thạch ×100',    icon: '💎', rarity: 'Hiếm',      type: 'currency',  desc: '+100 linh thạch' },
  { name: 'Ngọc Linh Nhẫn',     icon: '💍', rarity: 'Phổ thông', type: 'armor',     desc: '+10% linh thạch từ nhiệm vụ' },
  { name: 'Linh Văn Thạch',     icon: '🪨', rarity: 'Phổ thông', type: 'material',  desc: 'Nguyên liệu nâng cấp' },
  { name: 'Ngân Linh Thạch',    icon: '🪩', rarity: 'Phổ thông', type: 'material',  desc: 'Nguyên liệu nâng cấp' },
];

const weaponPool: GachaItem[] = [
  ...commonItems,
  { name: 'Huyền Thiết Kiếm',   icon: '🗡️', rarity: 'Hiếm',      type: 'weapon',   desc: 'Công kích linh lực +800' },
  { name: 'Ngân Nguyệt Kiếm',   icon: '🌙', rarity: 'Hiếm',      type: 'weapon',   desc: 'Nguyệt hoa kiếm, giảm 20% cooldown' },
  { name: 'Hỏa Long Thương',    icon: '⚔️', rarity: 'Sử thi',    type: 'weapon',   desc: 'Hỏa thuộc tính, thiêu đốt kẻ thù' },
  { name: 'Thiên Lôi Cung',     icon: '⚡', rarity: 'Sử thi',    type: 'weapon',   desc: 'Lôi thuộc tính cực mạnh' },
  { name: 'Vạn Cổ Thần Kiếm',  icon: '✨', rarity: 'Thần thoại', type: 'weapon',   desc: 'Kiếm vô song thiên hạ, power ×3' },
  { name: 'Hồng Mông Trượng',   icon: '🔱', rarity: 'Thần thoại', type: 'weapon',   desc: 'Vũ khí khai thiên tịch địa' },
];

const pillPool: GachaItem[] = [
  ...commonItems,
  { name: 'Hoàn Nguyệt Đan',    icon: '🌕', rarity: 'Hiếm',      type: 'pill',     desc: 'Bứt phá cảnh giới +30%' },
  { name: 'Huyết Long Đan',     icon: '🔴', rarity: 'Hiếm',      type: 'pill',     desc: 'HP tối đa +5000' },
  { name: 'Hóa Thần Đan',       icon: '💜', rarity: 'Sử thi',    type: 'pill',     desc: '+100% linh lực, đột phá Hóa Thần' },
  { name: 'Cửu Chuyển Kim Đan', icon: '🟡', rarity: 'Sử thi',    type: 'pill',     desc: 'Đột phá 9 lần cảnh giới liên tiếp' },
  { name: 'Thiên Địa Linh Đan', icon: '🌟', rarity: 'Thần thoại', type: 'pill',     desc: 'Trực tiếp lên cảnh giới Luyện Hư' },
  { name: 'Hỗn Độn Nguyên Đan', icon: '🫧', rarity: 'Thần thoại', type: 'pill',     desc: 'Đôi lộc linh thạch trong 30 ngày' },
];

/* ─────────── Banner Config ─────────── */

const banners: BannerConfig[] = [
  {
    id: 'weapon',
    name: 'Linh Vũ Giáng Thế',
    subtitle: 'Triệu hồi vũ khí huyền thoại từ cõi thiên ngoại',
    cost: 160,
    currency: 'linh-thach',
    gradient: 'from-blue-900/80 via-indigo-900/80 to-purple-900/80',
    accentColor: 'text-blue-300',
    icon: '⚔️',
    rateUp: 'Vạn Cổ Thần Kiếm',
    pool: weaponPool,
  },
  {
    id: 'pill',
    name: 'Đan Điện Kỳ Duyên',
    subtitle: 'Triệu hồi đan dược thượng phẩm, đột phá tu vi',
    cost: 200,
    currency: 'linh-dan',
    gradient: 'from-purple-900/80 via-violet-900/80 to-pink-900/80',
    accentColor: 'text-purple-300',
    icon: '⚗️',
    rateUp: 'Thiên Địa Linh Đan',
    pool: pillPool,
  },
  {
    id: 'standard',
    name: 'Thiên Địa Bí Kho',
    subtitle: 'Kho báu hỗn hợp — trang bị, đan dược, linh thạch',
    cost: 120,
    currency: 'linh-thach',
    gradient: 'from-amber-900/80 via-orange-900/80 to-red-900/80',
    accentColor: 'text-amber-300',
    icon: '🎁',
    pool: [...weaponPool, ...pillPool],
  },
];

/* ─────────── Rarity config ─────────── */

const rarityConfig: Record<Rarity, { weight: number; color: string; glow: string; badge: string; star: number }> = {
  'Phổ thông': { weight: 65, color: 'text-slate-300',  glow: 'shadow-slate-600/30',   badge: 'bg-slate-700 text-slate-300',   star: 1 },
  'Hiếm':      { weight: 25, color: 'text-blue-300',   glow: 'shadow-blue-600/50',    badge: 'bg-blue-900 text-blue-300',     star: 2 },
  'Sử thi':    { weight: 8,  color: 'text-purple-300', glow: 'shadow-purple-600/60',  badge: 'bg-purple-900 text-purple-300', star: 3 },
  'Thần thoại':{ weight: 2,  color: 'text-amber-300',  glow: 'shadow-amber-500/70',   badge: 'bg-amber-900 text-amber-300',   star: 4 },
};

function roll(pool: GachaItem[], count: number): GachaItem[] {
  const results: GachaItem[] = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.random() * 100;
    let cumulative = 0;
    let rarity: Rarity = 'Phổ thông';
    for (const [r, cfg] of Object.entries(rarityConfig) as [Rarity, typeof rarityConfig[Rarity]][]) {
      cumulative += cfg.weight;
      if (rand < cumulative) { rarity = r; break; }
    }
    const filtered = pool.filter(item => item.rarity === rarity);
    const item = filtered[Math.floor(Math.random() * filtered.length)] ?? pool[0];
    results.push(item);
  }
  return results;
}

/* ─────────── Currencies ─────────── */

const currencyLabel: Record<string, string> = {
  'linh-thach': '💎 Linh Thạch',
  'linh-dan': '⚗️ Linh Đan',
  'linh-ngoc': '🪩 Linh Ngọc',
};

/* ─────────── Component ─────────── */

export default function VongQuayPage() {
  const [wallet, setWallet] = useState({ 'linh-thach': 1250, 'linh-dan': 12, 'linh-ngoc': 3 });
  const [activeBanner, setActiveBanner] = useState(banners[0]);
  const [pulling, setPulling] = useState(false);
  const [results, setResults] = useState<GachaItem[] | null>(null);
  const [history, setHistory] = useState<{ item: GachaItem; ts: number }[]>([]);

  const doPull = useCallback(async (count: 1 | 10) => {
    const cost = activeBanner.cost * count;
    const cur = activeBanner.currency as keyof typeof wallet;
    if (wallet[cur] < cost) return;
    setPulling(true);
    setResults(null);
    await new Promise(r => setTimeout(r, 900));
    const items = roll(activeBanner.pool, count);
    setResults(items);
    setWallet(w => ({ ...w, [cur]: w[cur] - cost }));
    setHistory(h => [...items.map(item => ({ item, ts: Date.now() })), ...h].slice(0, 50));
    setPulling(false);
  }, [activeBanner, wallet]);

  const bestItem = results?.reduce((best, cur) =>
    rarityConfig[cur.rarity].weight < rarityConfig[best.rarity].weight ? cur : best
  );

  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{ background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #050b18 60%, #030710 100%)' }}
    >
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/3 h-[600px] w-[700px] rounded-full bg-purple-900/20 blur-[130px]" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-amber-800/10 blur-[100px]" />
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-300/20"
            style={{ top: `${8 + i * 8}%`, left: `${3 + i * 9}%`, animationDelay: `${i * 0.35}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-900/20 px-3 py-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" /> Thiên Cơ Vòng Quay
            </div>
            <h1 className="text-4xl font-black text-white">
              Vòng Quay{' '}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">Linh Bảo</span>
            </h1>
            <p className="mt-1 text-slate-500">Dùng linh thạch và đan dược để triệu hồi vật phẩm thần kỳ</p>
          </div>
          <Link href="/ca-nhan" className="flex items-center gap-1.5 rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 hover:text-slate-200">
            <Package className="h-4 w-4" /> Hành trang
          </Link>
        </div>

        {/* ── Wallet ── */}
        <div className="mb-7 flex flex-wrap gap-3">
          {(Object.entries(wallet) as [keyof typeof wallet, number][]).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2 rounded-2xl border border-slate-800/50 bg-slate-900/60 px-4 py-2.5">
              <span className="font-black text-slate-200">{currencyLabel[key]}</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-sm font-black text-amber-300">{val.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* ── Banner selector ── */}
        <div className="mb-7 grid grid-cols-3 gap-3">
          {banners.map(b => (
            <button key={b.id} onClick={() => { setActiveBanner(b); setResults(null); }}
              className={`overflow-hidden rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                activeBanner.id === b.id
                  ? 'border-amber-500/50 shadow-xl shadow-amber-900/30'
                  : 'border-slate-800/50 opacity-60 hover:opacity-90 hover:border-slate-700'
              }`}
              style={{ background: `linear-gradient(135deg, ${activeBanner.id === b.id ? 'rgba(10,6,30,0.97)' : 'rgba(6,6,18,0.95)'})` }}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <p className={`font-black text-sm ${b.accentColor}`}>{b.name}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{b.cost} {currencyLabel[b.currency]} / lần</p>
            </button>
          ))}
        </div>

        {/* ── Main banner card ── */}
        <div className={`relative overflow-hidden rounded-3xl border border-slate-700/40 bg-gradient-to-br ${activeBanner.gradient} mb-6 shadow-2xl`}>
          {/* Decorative stars */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute h-px w-px rounded-full bg-white/30 animate-pulse"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${i * 0.2}s`, width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px` }} />
          ))}

          <div className="relative px-8 py-10 text-center">
            {/* Banner display */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-white/70">
              <Star className="h-3.5 w-3.5 text-amber-300" />
              {activeBanner.rateUp ? `Tỷ lệ cao: ${activeBanner.rateUp}` : 'Banner tiêu chuẩn'}
            </div>

            <h2 className={`mt-3 text-3xl font-black ${activeBanner.accentColor}`}>{activeBanner.name}</h2>
            <p className="mt-2 text-sm text-white/50">{activeBanner.subtitle}</p>

            {/* Spin orb */}
            <div className="my-8 flex justify-center">
              <div className={`relative flex h-40 w-40 items-center justify-center rounded-full transition-all duration-700 ${pulling ? 'animate-spin scale-110' : ''}`}
                style={{ background: 'radial-gradient(circle, rgba(180,100,255,0.3) 0%, rgba(60,20,120,0.6) 60%, rgba(10,5,30,0.9) 100%)', boxShadow: '0 0 60px rgba(160,80,255,0.4), 0 0 120px rgba(160,80,255,0.15)' }}
              >
                <div className="absolute inset-0 animate-pulse rounded-full border-2 border-purple-400/20" />
                <div className="text-6xl">{pulling ? '✨' : activeBanner.icon}</div>
              </div>
            </div>

            {/* Pull buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => doPull(1)}
                disabled={pulling || wallet[activeBanner.currency as keyof typeof wallet] < activeBanner.cost}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3.5 font-black text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Zap className="h-4 w-4" />
                Quay x1 · {activeBanner.cost} {activeBanner.icon}
              </button>
              <button
                onClick={() => doPull(10)}
                disabled={pulling || wallet[activeBanner.currency as keyof typeof wallet] < activeBanner.cost * 10}
                className="flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-600/30 to-orange-600/30 px-6 py-3.5 font-black text-amber-200 backdrop-blur-sm transition-all hover:from-amber-600/50 hover:to-orange-600/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles className="h-4 w-4" />
                Quay x10 · {(activeBanner.cost * 10).toLocaleString()} {activeBanner.icon}
              </button>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {results && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-purple-800/40 bg-slate-950/90 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-800/50 px-6 py-4">
              <h3 className="font-black text-white">Kết quả triệu hồi</h3>
              {bestItem && (
                <span className={`rounded-full px-3 py-1 text-sm font-black ${rarityConfig[bestItem.rarity].badge}`}>
                  🎯 Tốt nhất: {bestItem.rarity}
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-3 p-5 sm:grid-cols-5 md:grid-cols-10">
              {results.map((item, i) => {
                const cfg = rarityConfig[item.rarity];
                return (
                  <div key={i}
                    className={`group relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all
                      ${item.rarity === 'Thần thoại' ? 'border-amber-500/60 bg-amber-900/20 shadow-xl shadow-amber-900/40 scale-105' :
                        item.rarity === 'Sử thi'    ? 'border-purple-600/50 bg-purple-900/20 shadow-lg shadow-purple-900/30' :
                        item.rarity === 'Hiếm'      ? 'border-blue-700/40 bg-blue-900/15' :
                        'border-slate-800/40 bg-slate-900/40'}`}
                  >
                    {item.rarity === 'Thần thoại' && (
                      <div className="absolute inset-0 animate-pulse rounded-2xl bg-amber-400/5" />
                    )}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl shadow-md ${cfg.glow}`}
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {item.icon}
                    </div>
                    <p className={`text-[10px] font-bold leading-tight ${cfg.color}`}>{item.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: cfg.star }).map((_, s) => (
                        <Star key={s} className={`h-2.5 w-2.5 fill-current ${cfg.color}`} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Rates table ── */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/70">
          <div className="border-b border-slate-800/50 px-6 py-4">
            <h3 className="font-bold text-slate-200">Tỷ lệ triệu hồi</h3>
          </div>
          <div className="grid grid-cols-4 divide-x divide-slate-800/50 p-0">
            {(Object.entries(rarityConfig) as [Rarity, typeof rarityConfig[Rarity]][]).map(([rarity, cfg]) => (
              <div key={rarity} className="py-5 text-center">
                <div className={`text-2xl font-black ${cfg.color}`}>{cfg.weight}%</div>
                <div className={`mt-1 text-xs font-semibold ${cfg.color}`}>{rarity}</div>
                <div className="mt-0.5 flex justify-center gap-0.5">
                  {Array.from({ length: cfg.star }).map((_, s) => (
                    <Star key={s} className={`h-2.5 w-2.5 fill-current ${cfg.color}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pull history ── */}
        {history.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/70">
            <div className="flex items-center justify-between border-b border-slate-800/50 px-6 py-4">
              <h3 className="font-bold text-slate-200">Lịch sử triệu hồi</h3>
              <span className="text-xs text-slate-600">{history.length} lần gần nhất</span>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
              {history.slice(0, 20).map(({ item }, i) => {
                const cfg = rarityConfig[item.rarity];
                return (
                  <div key={i} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    item.rarity === 'Thần thoại' ? 'border-amber-600/50 bg-amber-900/20 text-amber-300' :
                    item.rarity === 'Sử thi'    ? 'border-purple-700/50 bg-purple-900/20 text-purple-300' :
                    item.rarity === 'Hiếm'      ? 'border-blue-800/40 bg-blue-900/15 text-blue-300' :
                    'border-slate-800 bg-slate-900/50 text-slate-500'
                  }`}>
                    <span>{item.icon}</span>
                    <span className="max-w-[80px] truncate">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
