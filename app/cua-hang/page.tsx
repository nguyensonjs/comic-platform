'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { shopCategories, shopItems, type ShopCategory } from './shopItems';

const categories = shopCategories;
const items = shopItems;

const categoryLabel: Record<string, string> = {
  dan: 'Đan dược',
  'vu-khi': 'Vũ khí',
  'trang-bi': 'Trang bị',
};

const rarityStyle: Record<string, { badge: string; border: string; glow: string }> = {
  'Phổ thông': {
    badge: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    border: 'border-zinc-200 dark:border-zinc-700/50',
    glow: '',
  },
  Hiếm: {
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700/50',
    glow: 'hover:shadow-blue-200 dark:hover:shadow-blue-900/50',
  },
  'Sử thi': {
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700/50',
    glow: 'hover:shadow-purple-200 dark:hover:shadow-purple-900/50',
  },
  'Thần thoại': {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-600/50',
    glow: 'hover:shadow-amber-200 dark:hover:shadow-amber-900/60',
  },
};

export default function ShopPage() {
  const [cat, setCat] = useState<ShopCategory>('all');
  const [cart, setCart] = useState<number[]>([]);
  const stones = 1_250;

  const filtered = cat === 'all' ? items : items.filter((i) => i.category === cat);

  const addToCart = (id: number) => setCart((prev) => [...prev, id]);
  const cartTotal = cart.reduce((sum, id) => sum + (items.find((i) => i.id === id)?.price ?? 0), 0);

  return (
    <div
      className="text-foreground relative min-h-screen pt-20 pb-28 transition-[background,color] duration-500 sm:pt-24 sm:pb-32"
      style={{ background: 'var(--page-bg-gradient)' }}
    >
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[500px] w-[600px] rounded-full bg-amber-300/15 blur-[120px] dark:bg-amber-900/10" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-300/15 blur-[100px] dark:bg-purple-900/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 sm:mb-2 sm:px-3 sm:py-1 sm:text-xs dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300">
              <ShoppingBag className="h-3.5 w-3.5" />
              Linh Bảo Các
            </div>
            <h1 className="text-2xl font-black text-zinc-950 sm:text-3xl dark:text-white">
              Cửa Hàng{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Tu Vi
              </span>
            </h1>
          </div>
          {/* Wallet */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-amber-200 bg-white/80 px-3 py-2 shadow-sm shadow-zinc-950/5 sm:w-auto sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3 dark:border-amber-700/30 dark:bg-amber-900/15 dark:shadow-none">
            <span className="text-xl sm:text-2xl">💎</span>
            <div className="min-w-0">
              <div className="text-lg font-black text-amber-500 sm:text-xl dark:text-amber-300">
                {stones.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500 sm:text-xs dark:text-slate-500">
                Linh thạch của bạn
              </div>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                cat === c.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-800/30'
                  : 'border border-zinc-200 bg-white/80 text-zinc-600 shadow-sm shadow-zinc-950/5 hover:border-zinc-300 hover:text-zinc-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:shadow-none dark:hover:border-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => {
            const rs = rarityStyle[item.rarity];
            const canAfford = stones >= item.price;
            const inCart = cart.includes(item.id);
            return (
              <div
                key={item.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border ${rs.border} bg-white/85 shadow-lg shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${rs.glow} backdrop-blur-sm dark:bg-slate-950/80 dark:shadow-black/20`}
              >
                {/* Item visual: icon khớp với danh mục (đan / vũ khí / trang bị) */}
                <div
                  className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${item.color} py-6`}
                >
                  <span className="mb-1 text-[10px] font-semibold tracking-wider text-white/70 uppercase">
                    {categoryLabel[item.category]}
                  </span>
                  <span className="text-5xl drop-shadow-lg">{item.icon}</span>
                  {item.stock <= 3 && (
                    <span className="absolute top-2 right-2 rounded-full bg-red-700/85 px-2 py-0.5 text-[10px] font-bold text-red-100 dark:bg-red-800/80 dark:text-red-300">
                      Còn {item.stock}
                    </span>
                  )}
                  <span
                    className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${rs.badge}`}
                  >
                    {item.rarity}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-1 font-black text-zinc-900 dark:text-slate-100">{item.name}</h3>
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-slate-500">
                    {item.effect}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-base">💎</span>
                      <span className="font-black text-amber-500 dark:text-amber-300">
                        {item.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      disabled={!canAfford || inCart}
                      onClick={() => addToCart(item.id)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                        inCart
                          ? 'border border-green-200 bg-green-50 text-green-700 dark:border-green-700/40 dark:bg-green-900/20 dark:text-green-400'
                          : canAfford
                            ? 'bg-amber-600 text-white hover:bg-amber-500'
                            : 'cursor-not-allowed border border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-600'
                      }`}
                    >
                      {inCart ? '✓ Đã thêm' : !canAfford ? 'Không đủ' : 'Mua'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating cart */}
      {cart.length > 0 && (
        <div className="fixed right-2 bottom-4 left-2 z-50 sm:right-auto sm:bottom-6 sm:left-1/2 sm:max-w-md sm:-translate-x-1/2">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-white/95 px-4 py-3 shadow-2xl shadow-amber-200/60 backdrop-blur-xl sm:flex-nowrap sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4 dark:border-amber-600/40 dark:bg-slate-950/95 dark:shadow-amber-950/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-600 font-black text-white sm:h-10 sm:w-10 sm:rounded-xl">
                {cart.length}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-950 sm:text-base dark:text-white">
                  {cart.length} vật phẩm trong giỏ
                </p>
                <p className="text-xs text-amber-500 sm:text-sm dark:text-amber-300">
                  💎 {cartTotal.toLocaleString()} linh thạch
                </p>
              </div>
            </div>
            <button className="w-full rounded-lg bg-amber-600 px-4 py-2 font-black text-white shadow-lg transition-all hover:bg-amber-500 sm:w-auto sm:rounded-xl sm:px-5 sm:py-2.5">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
