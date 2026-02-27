'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Swords, Shield, Gem, Zap, Flame, RefreshCcw, ChevronRight, Star, Wind } from 'lucide-react';

/* ─────────── Types ─────────── */

type SlotKey = 'weapon' | 'armor' | 'helmet' | 'ring' | 'amulet';

interface Item {
  id: number;
  name: string;
  slot: SlotKey;
  icon: string;
  rarity: string;
  rarityBadge: string;
  color: string;
  border: string;
  stats: Partial<Record<'atk' | 'def' | 'spd' | 'hp', number>>;
  effect: string;
}

/* ─────────── Data ─────────── */

const allItems: Item[] = [
  {
    id: 1, name: 'Huyền Thiết Kiếm',  slot: 'weapon', icon: '🗡️', rarity: 'Hiếm',
    rarityBadge: 'bg-blue-900 text-blue-300', color: 'from-slate-600 to-slate-800', border: 'border-blue-700/40',
    stats: { atk: 800 }, effect: 'Linh lực công kích +800',
  },
  {
    id: 2, name: 'Hỏa Long Thương',   slot: 'weapon', icon: '⚔️', rarity: 'Sử thi',
    rarityBadge: 'bg-purple-900 text-purple-300', color: 'from-orange-700 to-red-800', border: 'border-purple-700/40',
    stats: { atk: 1400, spd: 50 }, effect: 'Hỏa thuộc tính, thiêu đốt kẻ thù',
  },
  {
    id: 3, name: 'Huyền Giáp',        slot: 'armor',  icon: '🛡️', rarity: 'Hiếm',
    rarityBadge: 'bg-blue-900 text-blue-300', color: 'from-slate-700 to-blue-900', border: 'border-blue-700/40',
    stats: { def: 1200, hp: 2000 }, effect: 'Phòng thủ linh lực +1200, HP +2000',
  },
  {
    id: 4, name: 'Tiên Phụng Bào',    slot: 'armor',  icon: '🦅', rarity: 'Sử thi',
    rarityBadge: 'bg-purple-900 text-purple-300', color: 'from-pink-700 to-rose-900', border: 'border-purple-700/40',
    stats: { def: 800, spd: 500 }, effect: 'Tốc độ +50%, có thể tàng hình 5 giây',
  },
  {
    id: 5, name: 'Ngọc Linh Nhẫn',   slot: 'ring',   icon: '💍', rarity: 'Phổ thông',
    rarityBadge: 'bg-slate-700 text-slate-300', color: 'from-green-700 to-teal-800', border: 'border-slate-700/40',
    stats: { atk: 200, def: 200 }, effect: 'Thu thêm 10% linh thạch từ nhiệm vụ',
  },
  {
    id: 6, name: 'Long Vũ Hộ Giáp',  slot: 'armor',  icon: '🐉', rarity: 'Thần thoại',
    rarityBadge: 'bg-amber-900 text-amber-300', color: 'from-teal-700 to-cyan-900', border: 'border-amber-600/50',
    stats: { def: 3500, hp: 8000, spd: 200 }, effect: 'Bất tử trong 10 giây khi HP = 0',
  },
  {
    id: 7, name: 'Thiên Lôi Cung',   slot: 'weapon', icon: '⚡', rarity: 'Sử thi',
    rarityBadge: 'bg-purple-900 text-purple-300', color: 'from-yellow-600 to-amber-800', border: 'border-purple-700/40',
    stats: { atk: 1800, spd: 100 }, effect: 'Lôi thuộc tính cực mạnh, tấm xa',
  },
  {
    id: 8, name: 'Hỏa Tinh Bội',     slot: 'amulet', icon: '🔥', rarity: 'Hiếm',
    rarityBadge: 'bg-blue-900 text-blue-300', color: 'from-red-700 to-orange-800', border: 'border-blue-700/40',
    stats: { atk: 300, hp: 1000 }, effect: 'Châm lửa khi bị tấn công, HP +1000',
  },
  {
    id: 9, name: 'Ngọc Hàn Băng',    slot: 'amulet', icon: '❄️', rarity: 'Sử thi',
    rarityBadge: 'bg-purple-900 text-purple-300', color: 'from-cyan-600 to-blue-800', border: 'border-purple-700/40',
    stats: { def: 500, spd: 300 }, effect: 'Băng phong kẻ địch, tốc độ +30%',
  },
  {
    id: 10, name: 'Cửu Long Quan',   slot: 'helmet', icon: '👑', rarity: 'Thần thoại',
    rarityBadge: 'bg-amber-900 text-amber-300', color: 'from-amber-600 to-orange-700', border: 'border-amber-600/50',
    stats: { atk: 1000, def: 1000, hp: 5000 }, effect: 'Chín rồng hộ thể, toàn diện tăng cường',
  },
  {
    id: 11, name: 'Ngân Nguyệt Mão', slot: 'helmet', icon: '🌙', rarity: 'Hiếm',
    rarityBadge: 'bg-blue-900 text-blue-300', color: 'from-indigo-700 to-purple-900', border: 'border-blue-700/40',
    stats: { def: 600, spd: 150 }, effect: 'Nguyệt quang bảo hộ, phòng thủ +600',
  },
];

const slots: { key: SlotKey; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'helmet', label: 'Mũ',    icon: <Star className="h-4 w-4" />,   desc: 'Đầu giáp' },
  { key: 'weapon', label: 'Vũ khí', icon: <Swords className="h-4 w-4" />, desc: 'Vũ trang' },
  { key: 'armor',  label: 'Giáp',   icon: <Shield className="h-4 w-4" />, desc: 'Thân giáp' },
  { key: 'ring',   label: 'Nhẫn',   icon: <Gem className="h-4 w-4" />,    desc: 'Trang sức' },
  { key: 'amulet', label: 'Bội',    icon: <Wind className="h-4 w-4" />,   desc: 'Linh bội' },
];

const baseStats = { atk: 5000, def: 3200, spd: 800, hp: 20000 };

/* ─────────── Helpers ─────────── */

function rarityGlow(rarity: string) {
  if (rarity === 'Thần thoại') return 'shadow-amber-600/60';
  if (rarity === 'Sử thi')    return 'shadow-purple-600/60';
  if (rarity === 'Hiếm')      return 'shadow-blue-600/40';
  return 'shadow-slate-700/30';
}

function parseSlotLabel(key: SlotKey) {
  return slots.find(s => s.key === key)?.label ?? key;
}

/* ─────────── Page ─────────── */

export default function CharacterPage() {
  const [equipped, setEquipped] = useState<Partial<Record<SlotKey, Item>>>({
    weapon: allItems[0],  // Huyền Thiết Kiếm
    armor:  allItems[2],  // Huyền Giáp
  });
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);

  /* Equip / unequip */
  const equip = (item: Item) => {
    setEquipped(prev => {
      const current = prev[item.slot];
      if (current?.id === item.id) {
        const next = { ...prev };
        delete next[item.slot];
        return next;
      }
      return { ...prev, [item.slot]: item };
    });
  };

  /* Calc total stats */
  const totalStats = Object.values(equipped).reduce(
    (acc, item) => {
      if (!item) return acc;
      return {
        atk: acc.atk + (item.stats.atk ?? 0),
        def: acc.def + (item.stats.def ?? 0),
        spd: acc.spd + (item.stats.spd ?? 0),
        hp:  acc.hp  + (item.stats.hp  ?? 0),
      };
    },
    { ...baseStats }
  );

  const equippedIds = new Set(Object.values(equipped).map(i => i?.id));

  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{ background: 'radial-gradient(ellipse at top, #0d1b3e 0%, #050b18 60%, #030710 100%)' }}
    >
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-[500px] w-[600px] rounded-full bg-purple-900/15 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-amber-800/8 blur-[100px]" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-300/25"
            style={{ top: `${10 + i * 11}%`, left: `${5 + i * 12}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-900/20 px-3 py-1.5 text-xs font-semibold text-purple-300">
              <Package className="h-3.5 w-3.5" /> Trang bị nhân vật
            </div>
            <h1 className="text-4xl font-black text-white">
              Nhân Vật{' '}
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Tu Sĩ</span>
            </h1>
            <p className="mt-1 text-slate-500">Chọn trang bị từ hành trang, kéo sức mạnh đến đỉnh phong</p>
          </div>
          <Link href="/ca-nhan" className="flex items-center gap-1.5 rounded-xl border border-slate-700/50 bg-slate-900/50 px-4 py-2 text-sm text-slate-400 hover:text-slate-200">
            Hành trang <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* ── Left: Character display ── */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-purple-800/40 shadow-2xl shadow-purple-950/40"
              style={{ background: 'linear-gradient(180deg, rgba(20,8,50,0.97) 0%, rgba(5,6,18,0.99) 100%)' }}
            >
              {/* Character area */}
              <div className="relative flex flex-col items-center justify-center px-6 py-10">
                {/* Outer aura rings */}
                <div className="absolute h-64 w-64 animate-ping rounded-full border border-purple-500/5 opacity-40" style={{ animationDuration: '4s' }} />
                <div className="absolute h-52 w-52 animate-ping rounded-full border border-blue-500/8 opacity-50"  style={{ animationDuration: '3s' }} />
                <div className="absolute h-40 w-40 rounded-full bg-purple-600/10 blur-2xl" />

                {/* Character figure */}
                <div className="relative flex flex-col items-center">
                  {/* Helmet slot indicator */}
                  {equipped.helmet && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-3xl drop-shadow-lg">
                      {equipped.helmet.icon}
                    </div>
                  )}

                  {/* Main avatar */}
                  <div className="relative flex h-36 w-36 items-center justify-center">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/20 blur-lg" />
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-purple-900/60 ring-4 ring-purple-500/10">
                      <span className="text-6xl">⚡</span>
                      {/* Glow pulse */}
                      <div className="absolute inset-0 animate-pulse rounded-full bg-purple-400/10" style={{ animationDuration: '2s' }} />
                    </div>
                  </div>

                  {/* Character info */}
                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-black text-white">Nguyễn Văn A</h2>
                    <p className="text-sm text-purple-400">Hóa Thần · Đỉnh phong</p>
                  </div>

                  {/* Weapon & Armor indicators */}
                  <div className="mt-3 flex gap-4">
                    {equipped.weapon && (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${equipped.weapon.color} text-xl shadow-lg shadow-${rarityGlow(equipped.weapon.rarity)}`}>
                          {equipped.weapon.icon}
                        </div>
                        <span className="text-[10px] text-slate-500">Tả thủ</span>
                      </div>
                    )}
                    {equipped.armor && (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${equipped.armor.color} text-xl shadow-lg`}>
                          {equipped.armor.icon}
                        </div>
                        <span className="text-[10px] text-slate-500">Thân giáp</span>
                      </div>
                    )}
                    {equipped.ring && (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${equipped.ring.color} text-xl shadow-lg`}>
                          {equipped.ring.icon}
                        </div>
                        <span className="text-[10px] text-slate-500">Nhẫn</span>
                      </div>
                    )}
                    {equipped.amulet && (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${equipped.amulet.color} text-xl shadow-lg`}>
                          {equipped.amulet.icon}
                        </div>
                        <span className="text-[10px] text-slate-500">Linh bội</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Combat stats */}
              <div className="border-t border-slate-800/50 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-600">Chiến lực tổng hợp</p>
                <div className="space-y-2.5">
                  {([
                    { label: 'Công kích', key: 'atk', color: 'bg-red-500',    icon: <Flame className="h-3 w-3 text-red-400" /> },
                    { label: 'Phòng thủ', key: 'def', color: 'bg-blue-500',   icon: <Shield className="h-3 w-3 text-blue-400" /> },
                    { label: 'Tốc độ',    key: 'spd', color: 'bg-green-500',  icon: <Wind className="h-3 w-3 text-green-400" /> },
                    { label: 'Máu',       key: 'hp',  color: 'bg-pink-500',   icon: <Zap className="h-3 w-3 text-pink-400" /> },
                  ] as const).map(({ label, key, color, icon }) => {
                    const base = baseStats[key];
                    const total = totalStats[key];
                    const bonus = total - base;
                    const pct = Math.min(100, (total / (base * 2)) * 100);
                    return (
                      <div key={key}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-slate-400">{icon}{label}</span>
                          <span className="font-black text-white">
                            {total.toLocaleString()}
                            {bonus > 0 && <span className="ml-1 text-green-400 font-semibold">+{bonus.toLocaleString()}</span>}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                          <div className={`h-full rounded-full ${color} transition-all duration-500`}
                            style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Equipment slots + Inventory ── */}
          <div className="space-y-5 lg:col-span-3">

            {/* Equipment slots */}
            <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/80">
              <div className="border-b border-slate-800/50 px-5 py-4">
                <h2 className="font-bold text-slate-200">Trang bị đang mặc</h2>
              </div>
              <div className="grid grid-cols-5 gap-3 p-4">
                {slots.map(({ key, label, icon, desc }) => {
                  const item = equipped[key];
                  return (
                    <div key={key} className="flex flex-col items-center gap-2">
                      {/* Slot */}
                      <div
                        onClick={() => item && equip(item)}
                        className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border-2 text-3xl transition-all ${
                          item
                            ? `${item.border} bg-gradient-to-br ${item.color} shadow-lg hover:scale-105`
                            : 'border-dashed border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                        }`}
                      >
                        {item ? item.icon : (
                          <span className="text-slate-700">{icon}</span>
                        )}
                        {item && (
                          <button onClick={(e) => { e.stopPropagation(); equip(item); }}
                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-800/80 text-[10px] text-red-300 hover:bg-red-700"
                            title="Tháo ra"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-[11px] font-semibold text-slate-400">{label}</p>
                        {item ? (
                          <p className="max-w-[70px] truncate text-[10px] text-slate-500">{item.name}</p>
                        ) : (
                          <p className="text-[10px] text-slate-700">{desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inventory grid (equippable items only) */}
            <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/80">
              <div className="flex items-center justify-between border-b border-slate-800/50 px-5 py-4">
                <h2 className="font-bold text-slate-200">Hành trang — Trang bị</h2>
                <span className="text-xs text-slate-600">{allItems.length} vật phẩm · Nhấp để trang bị / tháo</span>
              </div>

              <div className="grid grid-cols-4 gap-3 p-5 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
                {allItems.map((item) => {
                  const isEquipped = equippedIds.has(item.id);
                  const isHovered  = hoveredItem?.id === item.id;
                  return (
                    <div key={item.id}
                      onClick={() => equip(item)}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`group relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-2xl border p-3 text-center transition-all duration-200 ${
                        isEquipped
                          ? `${item.border} bg-gradient-to-br ${item.color} shadow-xl ring-2 ring-white/10`
                          : `${item.border} bg-slate-900/60 hover:-translate-y-1 hover:shadow-lg`
                      }`}
                    >
                      {/* Equipped badge */}
                      {isEquipped && (
                        <div className="absolute top-1.5 right-1.5 rounded-full bg-green-500/90 px-1.5 py-0.5 text-[9px] font-black text-white">
                          ĐEO
                        </div>
                      )}

                      {/* Slot indicator */}
                      <div className="absolute top-1.5 left-1.5 text-[9px] font-semibold text-white/50">
                        {parseSlotLabel(item.slot)}
                      </div>

                      {/* Icon */}
                      <div className={`mt-2 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
                        isEquipped ? 'bg-white/10' : `bg-gradient-to-br ${item.color}`
                      } shadow-md`}>
                        {item.icon}
                      </div>

                      {/* Name */}
                      <p className={`text-[11px] font-bold leading-tight ${isEquipped ? 'text-white' : 'text-slate-300'}`}>
                        {item.name}
                      </p>

                      {/* Rarity */}
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${item.rarityBadge}`}>
                        {item.rarity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hovered item tooltip */}
            {hoveredItem && (
              <div className={`rounded-2xl border bg-slate-950/95 px-5 py-4 backdrop-blur-sm ${hoveredItem.border} transition-all`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${hoveredItem.color} text-2xl shadow-md`}>
                    {hoveredItem.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-white">{hoveredItem.name}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${hoveredItem.rarityBadge}`}>{hoveredItem.rarity}</span>
                    </div>
                    <p className="text-sm text-slate-400">{hoveredItem.effect}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-3 text-sm">
                    {Object.entries(hoveredItem.stats).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <div className="font-black text-green-400">+{v?.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-600 uppercase">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
