'use client';

import { useState } from 'react';
import { ShoppingBag, Zap, Filter, Star, Shield, Swords, FlaskConical, Gem, ChevronRight, Package } from 'lucide-react';

type Category = 'all' | 'dan' | 'vu-khi' | 'trang-bi';

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'all',     label: 'Tất cả',   icon: '🏪' },
  { id: 'dan',     label: 'Đan dược', icon: '⚗️' },
  { id: 'vu-khi',  label: 'Vũ khí',   icon: '⚔️' },
  { id: 'trang-bi',label: 'Trang bị', icon: '🛡️' },
];

const items = [
  // Đan dược
  { id: 1, name: 'Tụ Linh Đan',     category: 'dan',     price: 200,  rarity: 'Phổ thông',  icon: '⚗️', color: 'from-green-700 to-emerald-800',  effect: 'Tăng linh lực +500 ngay lập tức',        stock: 99 },
  { id: 2, name: 'Hoàn Nguyt Đan',  category: 'dan',     price: 500,  rarity: 'Hiếm',       icon: '🌙', color: 'from-blue-700 to-indigo-800',     effect: 'Bứt phá cảnh giới, tăng linh lực +30%', stock: 20 },
  { id: 3, name: 'Hóa Thần Đan',    category: 'dan',     price: 1200, rarity: 'Sử thi',     icon: '💜', color: 'from-purple-700 to-violet-800',   effect: 'Đột phá Hóa Thần cảnh, +100% linh lực',  stock: 5  },
  { id: 4, name: 'Cửu Chuyển Kim Đan', category: 'dan',  price: 3000, rarity: 'Thần thoại', icon: '👑', color: 'from-amber-600 to-orange-700',    effect: 'Tiên dược thiên cổ, có thể vượt kiếp',   stock: 1  },
  // Vũ khí
  { id: 5, name: 'Huyền Thiết Kiếm', category: 'vu-khi', price: 400,  rarity: 'Hiếm',       icon: '🗡️', color: 'from-slate-600 to-slate-800',     effect: 'Linh lực công kích +800',                stock: 15 },
  { id: 6, name: 'Hỏa Long Thương',  category: 'vu-khi', price: 900,  rarity: 'Sử thi',     icon: '⚔️', color: 'from-orange-700 to-red-800',      effect: 'Hỏa thuộc tính, thiêu đốt kẻ thù',       stock: 8  },
  { id: 7, name: 'Vô Danh Kiếm',     category: 'vu-khi', price: 2500, rarity: 'Thần thoại', icon: '✨', color: 'from-violet-700 to-purple-900',   effect: 'Kiếm ý vô hình, vô địch thiên hạ',       stock: 2  },
  { id: 8, name: 'Thiên Lôi Cung',   category: 'vu-khi', price: 1800, rarity: 'Sử thi',     icon: '⚡', color: 'from-yellow-600 to-amber-800',    effect: 'Lôi thuộc tính cực mạnh, tầm xa',         stock: 3  },
  // Trang bị
  { id: 9,  name: 'Huyền Giáp',      category: 'trang-bi', price: 600,  rarity: 'Hiếm',     icon: '🛡️', color: 'from-slate-700 to-blue-900',      effect: 'Phòng thủ linh lực +1200',               stock: 10 },
  { id: 10, name: 'Tiên Phụng Bào',  category: 'trang-bi', price: 1500, rarity: 'Sử thi',   icon: '🦅', color: 'from-pink-700 to-rose-900',       effect: 'Tốc độ +50%, tàng hình 5 giây',           stock: 4  },
  { id: 11, name: 'Long Vũ Hộ Giáp', category: 'trang-bi', price: 4000, rarity: 'Thần thoại', icon: '🐉', color: 'from-teal-700 to-cyan-900',    effect: 'Bất tử trong 10 giây khi HP = 0',         stock: 1  },
  { id: 12, name: 'Ngọc Linh Nhẫn',  category: 'trang-bi', price: 350,  rarity: 'Phổ thông', icon: '💍', color: 'from-green-700 to-teal-800',     effect: 'Thu thêm 10% linh thạch từ nhiệm vụ',     stock: 50 },
];

const rarityStyle: Record<string, { badge: string; border: string; glow: string }> = {
  'Phổ thông': { badge: 'bg-slate-700 text-slate-300',    border: 'border-slate-700/50', glow: '' },
  'Hiếm':      { badge: 'bg-blue-900 text-blue-300',      border: 'border-blue-700/50',  glow: 'hover:shadow-blue-900/50' },
  'Sử thi':    { badge: 'bg-purple-900 text-purple-300',  border: 'border-purple-700/50',glow: 'hover:shadow-purple-900/50' },
  'Thần thoại':{ badge: 'bg-amber-900 text-amber-300',    border: 'border-amber-600/50', glow: 'hover:shadow-amber-900/60' },
};

export default function ShopPage() {
  const [cat, setCat] = useState<Category>('all');
  const [cart, setCart] = useState<number[]>([]);
  const stones = 1_250;

  const filtered = cat === 'all' ? items : items.filter(i => i.category === cat);

  const addToCart = (id: number) => setCart(prev => [...prev, id]);
  const cartTotal = cart.reduce((sum, id) => sum + (items.find(i => i.id === id)?.price ?? 0), 0);

  return (
    <div
      className="relative min-h-screen text-foreground pb-28 pt-20 transition-[background,color] duration-300 sm:pb-32 sm:pt-24"
      style={{ background: 'var(--page-bg-gradient)' }}
    >
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 h-[500px] w-[600px] rounded-full bg-amber-900/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-900/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 sm:mb-2 sm:px-3 sm:py-1 sm:text-xs">
              <ShoppingBag className="h-3.5 w-3.5" />
              Linh Bảo Các
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Cửa Hàng{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Tu Vi</span>
            </h1>
          </div>
          {/* Wallet */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-amber-700/30 bg-amber-900/15 px-3 py-2 sm:w-auto sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3">
            <span className="text-xl sm:text-2xl">💎</span>
            <div className="min-w-0">
              <div className="text-lg font-black text-amber-300 sm:text-xl">{stones.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 sm:text-xs">Linh thạch của bạn</div>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                cat === c.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-800/30'
                  : 'border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
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
              <div key={item.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border ${rs.border} bg-slate-950/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${rs.glow} backdrop-blur-sm`}
              >
                {/* Item visual */}
                <div className={`relative flex items-center justify-center bg-gradient-to-br ${item.color} py-8`}>
                  <span className="text-5xl drop-shadow-lg">{item.icon}</span>
                  {item.stock <= 3 && (
                    <span className="absolute top-2 right-2 rounded-full bg-red-800/80 px-2 py-0.5 text-[10px] font-bold text-red-300">
                      Còn {item.stock}
                    </span>
                  )}
                  <span className={`absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${rs.badge}`}>
                    {item.rarity}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-1 font-black text-slate-100">{item.name}</h3>
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-slate-500">{item.effect}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-base">💎</span>
                      <span className="font-black text-amber-300">{item.price.toLocaleString()}</span>
                    </div>
                    <button
                      disabled={!canAfford || inCart}
                      onClick={() => addToCart(item.id)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                        inCart
                          ? 'border border-green-700/40 bg-green-900/20 text-green-400'
                          : canAfford
                          ? 'bg-amber-600 text-white hover:bg-amber-500'
                          : 'cursor-not-allowed border border-slate-700 bg-slate-800/50 text-slate-600'
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
        <div className="fixed bottom-4 left-2 right-2 z-50 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-600/40 bg-slate-950/95 px-4 py-3 shadow-2xl shadow-amber-950/60 backdrop-blur-xl sm:flex-nowrap sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-600 font-black text-white sm:h-10 sm:w-10 sm:rounded-xl">
                {cart.length}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white sm:text-base">{cart.length} vật phẩm trong giỏ</p>
                <p className="text-xs text-amber-300 sm:text-sm">💎 {cartTotal.toLocaleString()} linh thạch</p>
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
