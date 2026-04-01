'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { Package, Swords, Shield, Gem, Zap, Flame, ChevronRight, Star, Wind } from 'lucide-react';

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

const slots: { key: SlotKey; label: string; icon: ReactNode; desc: string }[] = [
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

function EquippedOrb({ item, label }: { item: Item; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br ${item.color} text-xl shadow-lg sm:h-12 sm:w-12 sm:text-2xl dark:border-white/10 ${rarityGlow(item.rarity)}`}
      >
        {item.icon}
      </div>
      <span className="max-w-[4.25rem] truncate text-center text-[9px] font-semibold text-zinc-500 dark:text-slate-500">
        {label}
      </span>
    </div>
  );
}

function EmptyEquipSlot() {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-zinc-200/90 bg-zinc-50/40 sm:h-12 sm:w-12 dark:border-slate-700/55 dark:bg-slate-900/30"
      aria-hidden
    />
  );
}

function parseSlotLabel(key: SlotKey) {
  return slots.find(s => s.key === key)?.label ?? key;
}

const statLabelVi: Record<string, string> = {
  atk: 'Công',
  def: 'Thủ',
  spd: 'Tốc',
  hp: 'HP',
};

type ItemPopupState = {
  item: Item;
  left: number;
  top: number;
  placeAbove: boolean;
};

function positionItemPopup(item: Item, el: HTMLElement): ItemPopupState {
  const r = el.getBoundingClientRect();
  const gutter = 10;
  const estimateH = 176;
  const maxW = 320;
  const half = maxW / 2 + gutter;
  const placeAbove = r.top >= estimateH + gutter + 20;
  let left = r.left + r.width / 2;
  left = Math.max(half, Math.min(window.innerWidth - half, left));
  const top = placeAbove ? r.top - gutter : r.bottom + gutter;
  return { item, left, top, placeAbove };
}

/* ─────────── Page ─────────── */

export default function CharacterPage() {
  const [equipped, setEquipped] = useState<Partial<Record<SlotKey, Item>>>({
    weapon: allItems[0],  // Huyền Thiết Kiếm
    armor:  allItems[2],  // Huyền Giáp
  });
  const [itemPopup, setItemPopup] = useState<ItemPopupState | null>(null);

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

  useEffect(() => {
    if (!itemPopup) return;
    const hide = () => setItemPopup(null);
    window.addEventListener('scroll', hide, true);
    return () => window.removeEventListener('scroll', hide, true);
  }, [itemPopup]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pb-12 pt-20 text-foreground transition-colors duration-500 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950 sm:pb-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/90 px-3 py-1.5 text-xs font-semibold text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/40 dark:text-sky-300">
              <Package className="h-3.5 w-3.5 text-[#1392ec]" /> Trang bị nhân vật
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
              Nhân vật{' '}
              <span className="bg-gradient-to-r from-[#1392ec] via-sky-500 to-teal-500 bg-clip-text text-transparent">
                tu sĩ
              </span>
            </h1>
            <p className="mt-1 max-w-xl text-sm text-zinc-500 dark:text-slate-500">
              Chọn trang bị từ hành trang — nhấp ô để đeo / tháo, xem chỉ số tổng hợp bên dưới.
            </p>
          </div>
          <Link
            href="/ca-nhan"
            className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/95 px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:border-blue-400/60 hover:text-[#1392ec] dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-sky-300"
          >
            Về cá nhân
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-5">

          {/* ── Left: Character display ── */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-transparent to-zinc-50/40 dark:from-blue-950/25 dark:via-transparent dark:to-slate-950/40" />
              {/* Character area */}
              <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 sm:py-10">
                <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-[#1392ec]/10 blur-3xl dark:bg-sky-500/10" />

                {/* Character figure — trang bị quanh avatar: trên / trái-phải / đáy */}
                <div className="relative mx-auto flex w-full max-w-[19rem] flex-col items-center sm:max-w-[21rem]">
                  {/* Mũ — phía trên */}
                  <div className="flex min-h-[4.25rem] items-end justify-center pb-1">
                    {equipped.helmet ? (
                      <EquippedOrb item={equipped.helmet} label="Mũ" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <EmptyEquipSlot />
                        <span className="text-[9px] font-medium text-zinc-400 dark:text-slate-600">Mũ</span>
                      </div>
                    )}
                  </div>

                  {/* Hàng giữa: vũ khí | avatar | giáp */}
                  <div className="flex w-full items-center justify-between gap-1 px-0.5 sm:gap-2">
                    <div className="flex w-[4.75rem] shrink-0 flex-col items-center justify-center sm:w-[5.25rem]">
                      {equipped.weapon ? (
                        <EquippedOrb item={equipped.weapon} label="Vũ khí" />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <EmptyEquipSlot />
                          <span className="text-[9px] font-medium text-zinc-400 dark:text-slate-600">Vũ khí</span>
                        </div>
                      )}
                    </div>

                    <div className="relative flex h-[8.5rem] w-[8.5rem] shrink-0 items-center justify-center sm:h-36 sm:w-36">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1392ec]/25 to-sky-400/15 blur-xl" />
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/90 bg-gradient-to-br from-[#1392ec] to-sky-800 shadow-lg shadow-blue-500/30 ring-4 ring-[#1392ec]/15 dark:border-slate-800 dark:ring-sky-500/20">
                        <span className="text-6xl">⚡</span>
                      </div>
                    </div>

                    <div className="flex w-[4.75rem] shrink-0 flex-col items-center justify-center sm:w-[5.25rem]">
                      {equipped.armor ? (
                        <EquippedOrb item={equipped.armor} label="Giáp" />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <EmptyEquipSlot />
                          <span className="text-[9px] font-medium text-zinc-400 dark:text-slate-600">Giáp</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Đáy: nhẫn + linh bội */}
                  <div className="mt-2 flex min-h-[4.5rem] w-full justify-center gap-6 sm:gap-10">
                    <div className="flex flex-col items-center">
                      {equipped.ring ? (
                        <EquippedOrb item={equipped.ring} label="Nhẫn" />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <EmptyEquipSlot />
                          <span className="text-[9px] font-medium text-zinc-400 dark:text-slate-600">Nhẫn</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      {equipped.amulet ? (
                        <EquippedOrb item={equipped.amulet} label="Linh bội" />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <EmptyEquipSlot />
                          <span className="text-[9px] font-medium text-zinc-400 dark:text-slate-600">Linh bội</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Character info */}
                  <div className="mt-5 text-center">
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white">Nguyễn Văn A</h2>
                    <p className="text-sm font-medium text-violet-600 dark:text-violet-400">Hóa Thần · Đỉnh phong</p>
                  </div>
                </div>
              </div>

              {/* Combat stats */}
              <div className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/50 p-5 dark:border-slate-800/50 dark:bg-slate-900/25">
                <p className="mb-3 text-xs font-bold tracking-widest text-zinc-500 uppercase dark:text-slate-400">
                  Chiến lực tổng hợp
                </p>
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
                          <span className="flex items-center gap-1.5 text-zinc-600 dark:text-slate-400">{icon}{label}</span>
                          <span className="font-black text-zinc-950 dark:text-white">
                            {total.toLocaleString()}
                            {bonus > 0 && <span className="ml-1 text-green-400 font-semibold">+{bonus.toLocaleString()}</span>}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200/90 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${color} shadow-sm transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
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
            <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
              <div className="border-b border-zinc-200/80 px-5 py-4 dark:border-slate-800/50">
                <h2 className="font-bold text-zinc-900 dark:text-slate-200">Trang bị đang mặc</h2>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-slate-500">
                  Nhấp ô có đồ để tháo nhanh
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2 p-4 sm:gap-3">
                {slots.map(({ key, label, icon, desc }) => {
                  const item = equipped[key];
                  return (
                    <div key={key} className="flex flex-col items-center gap-2">
                      {/* Slot */}
                      <div
                        onClick={() => item && equip(item)}
                        onMouseEnter={(e) => item && setItemPopup(positionItemPopup(item, e.currentTarget))}
                        onMouseLeave={() => setItemPopup(null)}
                        className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border-2 text-3xl transition-all ${
                          item
                            ? `${item.border} bg-gradient-to-br ${item.color} shadow-md hover:scale-[1.04] active:scale-[0.98]`
                            : 'border-dashed border-zinc-300/90 bg-zinc-50/90 hover:border-[#1392ec]/40 hover:bg-blue-50/50 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-sky-500/35'
                        }`}
                      >
                        {item ? item.icon : (
                          <span className="text-zinc-400 dark:text-slate-500">{icon}</span>
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
                        <p className="text-[11px] font-semibold text-zinc-600 dark:text-slate-400">{label}</p>
                        {item ? (
                          <p className="max-w-[70px] truncate text-[10px] text-zinc-500 dark:text-slate-500">{item.name}</p>
                        ) : (
                          <p className="text-[10px] text-zinc-400 dark:text-slate-500">{desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inventory grid (equippable items only) */}
            <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
              <div className="flex flex-col gap-2 border-b border-zinc-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/50">
                <h2 className="font-bold text-zinc-900 dark:text-slate-200">Hành trang — Trang bị</h2>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-slate-800 dark:text-slate-400">
                  {allItems.length} vật phẩm · nhấp để đeo / tháo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 sm:gap-3 sm:p-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                {allItems.map((item) => {
                  const isEquipped = equippedIds.has(item.id);
                  return (
                    <div key={item.id}
                      onClick={() => equip(item)}
                      onMouseEnter={(e) => setItemPopup(positionItemPopup(item, e.currentTarget))}
                      onMouseLeave={() => setItemPopup(null)}
                      className={`group relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 p-3 text-center transition-all duration-200 ${item.border} ${
                        isEquipped
                          ? `bg-gradient-to-br ${item.color} shadow-lg ring-2 ring-[#1392ec]/25 ring-offset-2 ring-offset-white dark:ring-sky-400/30 dark:ring-offset-slate-950`
                          : `bg-white/95 shadow-sm hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/55`
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
                      <p className={`text-[11px] font-bold leading-tight ${isEquipped ? 'text-white' : 'text-zinc-800 dark:text-slate-300'}`}>
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
          </div>
        </div>
      </div>

      {/* Hover popup — fixed để không bị cắt bởi overflow */}
      {itemPopup && (
        <div
          className="pointer-events-none fixed z-[300] w-[min(20rem,calc(100vw-1.5rem))] select-none"
          style={{
            left: itemPopup.left,
            top: itemPopup.top,
            transform: itemPopup.placeAbove ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
          }}
          role="tooltip"
        >
          <div
            className={`rounded-2xl border border-zinc-200/90 bg-white/98 px-4 py-3 shadow-2xl shadow-zinc-950/20 ring-1 ring-black/5 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-950/95 dark:shadow-black/50 dark:ring-white/10 ${itemPopup.item.border}`}
          >
            <div className="flex gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${itemPopup.item.color} text-2xl shadow-md`}
              >
                {itemPopup.item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-zinc-950 dark:text-white">{itemPopup.item.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${itemPopup.item.rarityBadge}`}
                  >
                    {itemPopup.item.rarity}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-snug text-zinc-600 dark:text-slate-400">
                  {itemPopup.item.effect}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold text-zinc-400 dark:text-slate-500">
                  Ô: {parseSlotLabel(itemPopup.item.slot)}
                </p>
              </div>
            </div>
            {Object.keys(itemPopup.item.stats).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-zinc-200/80 pt-3 dark:border-slate-700/60">
                {Object.entries(itemPopup.item.stats).map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-center dark:bg-emerald-500/15"
                  >
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      +{v?.toLocaleString('vi-VN')}
                    </div>
                    <div className="text-[10px] font-semibold uppercase text-zinc-500 dark:text-slate-500">
                      {statLabelVi[k] ?? k}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
