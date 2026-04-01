import Link from 'next/link';
import {
  BookOpen,
  Heart,
  Star,
  Edit3,
  Settings,
  Bell,
  Shield,
  LogOut,
  Trophy,
  ChevronRight,
  Crown,
  Flame,
  Zap,
  TrendingUp,
  Package,
  ShoppingBag,
  Coins,
  Flag,
} from 'lucide-react';
import { RequireAuth } from '@/app/components/RequireAuth';
import RecentReadsPanel from './RecentReadsPanel';

/* ─────────── Data ─────────── */

const userRealm = { name: 'Hóa Thần', color: 'text-purple-500 dark:text-purple-300' };
const userRank = 14;
const userPower = 987_654;
const userWealth = 1_280_000;
const userSect = { name: 'Tân Thủ Hội', rank: 15, prestige: 150_000 };
const progressToNext = 72;

function formatPower(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

const menuItems = [
  { label: 'Chỉnh sửa hồ sơ', Icon: Edit3, href: '/profile/edit' },
  { label: 'Thông báo', Icon: Bell, href: '/settings/notifications' },
  { label: 'Cài đặt', Icon: Settings, href: '/settings' },
  { label: 'Bảo mật', Icon: Shield, href: '/settings/security' },
];

const stats = [
  {
    label: 'Đang đọc',
    value: '12',
    Icon: BookOpen,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    label: 'Yêu thích',
    value: '47',
    Icon: Heart,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    label: 'Hoàn thành',
    value: '23',
    Icon: Trophy,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    label: 'Đánh giá',
    value: '89',
    Icon: Star,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

const weeklyReads = [40, 70, 30, 85, 55, 90, 65];
const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const inventory = [
  {
    id: 1,
    name: 'Tụ Linh Đan',
    icon: '⚗️',
    qty: 5,
    rarity: 'Phổ thông',
    effect: 'Tăng linh lực +500',
    color: 'from-green-600 to-emerald-700',
    badge: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    border: 'border-zinc-200 dark:border-zinc-700/40',
  },
  {
    id: 2,
    name: 'Hoàn Nguyệt Đan',
    icon: '🌙',
    qty: 2,
    rarity: 'Hiếm',
    effect: 'Bứt phá cảnh giới +30%',
    color: 'from-blue-600 to-indigo-700',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700/40',
  },
  {
    id: 3,
    name: 'Huyền Thiết Kiếm',
    icon: '🗡️',
    qty: 1,
    rarity: 'Hiếm',
    effect: 'Công kích linh lực +800',
    color: 'from-slate-500 to-slate-700',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700/40',
  },
  {
    id: 4,
    name: 'Hỏa Long Thương',
    icon: '⚔️',
    qty: 1,
    rarity: 'Sử thi',
    effect: 'Hỏa thuộc tính, thiêu đốt kẻ thù',
    color: 'from-orange-600 to-red-700',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700/40',
  },
  {
    id: 5,
    name: 'Huyền Giáp',
    icon: '🛡️',
    qty: 1,
    rarity: 'Hiếm',
    effect: 'Phòng thủ linh lực +1200',
    color: 'from-slate-600 to-blue-800',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700/40',
  },
  {
    id: 6,
    name: 'Ngọc Linh Nhẫn',
    icon: '💍',
    qty: 3,
    rarity: 'Phổ thông',
    effect: '+10% linh thạch từ nhiệm vụ',
    color: 'from-green-600 to-teal-700',
    badge: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    border: 'border-zinc-200 dark:border-zinc-700/40',
  },
  {
    id: 7,
    name: 'Hóa Thần Đan',
    icon: '💜',
    qty: 1,
    rarity: 'Sử thi',
    effect: '+100% linh lực, đột phá Hóa Thần',
    color: 'from-purple-600 to-violet-700',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700/40',
  },
  {
    id: 8,
    name: 'Linh Thạch',
    icon: '💎',
    qty: 1250,
    rarity: 'Tiền tệ',
    effect: 'Dùng để mua vật phẩm tại Cửa hàng',
    color: 'from-amber-500 to-yellow-600',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700/40',
  },
];

/* ─────────── Component ─────────── */

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div
        className="text-foreground relative min-h-screen pt-20 pb-20 transition-[background,color] duration-500 sm:pt-24 sm:pb-24"
        style={{ background: 'var(--page-bg-gradient)' }}
      >
        {/* Ambient glow orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-300/20 blur-[120px] dark:bg-purple-900/20" />
          <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-amber-300/15 blur-[100px] dark:bg-amber-800/10" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-300/20 blur-[100px] dark:bg-blue-900/20" />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 animate-pulse rounded-full bg-sky-500/25 dark:bg-amber-300/40"
              style={{
                top: `${10 + i * 11}%`,
                left: `${5 + i * 12}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
          {/* ══ Profile Hero ══ */}
          <div
            className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-950/5 sm:mb-8 sm:rounded-3xl dark:border-purple-900/40 dark:shadow-2xl dark:shadow-purple-950/50"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(241,245,249,0.94) 42%, rgba(224,231,255,0.92) 100%)',
            }}
          >
            <div
              className="absolute inset-0 z-0 hidden dark:block"
              style={{
                background:
                  'linear-gradient(135deg, rgba(15,5,40,0.95) 0%, rgba(10,20,50,0.95) 100%)',
              }}
            />
            <div className="relative z-10 h-28 overflow-hidden sm:h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/80 via-blue-100/70 to-amber-100/60 dark:from-purple-900/60 dark:via-indigo-900/40 dark:to-amber-900/30" />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.04'%3E%3Cpath d='M36 34v6h6v-6h-6zm6 6v6h6v-6h-6zm-6 0v6h6v-6h-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
              <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 sm:top-4 sm:right-4 sm:gap-2">
                <div className="flex items-center gap-2 rounded-full border border-purple-300/60 bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:border-purple-500/30 dark:bg-purple-900/50">
                  <Zap className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                  <span className="text-[10px] font-bold tracking-wider text-blue-700 dark:text-blue-300">
                    TU VI #14
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-amber-300/60 bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:border-amber-500/30 dark:bg-amber-900/50">
                  <Coins className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                  <span className="text-[10px] font-bold tracking-wider text-amber-700 dark:text-amber-300">
                    PHÚ HÀO #14
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="-mt-10 flex items-end justify-between sm:-mt-14">
                <div className="relative">
                  <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-br from-amber-400/50 via-purple-500/50 to-cyan-400/50 blur-sm" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/40 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl sm:h-24 sm:w-24">
                    <span className="text-4xl">⚡</span>
                  </div>
                  <div className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-400 shadow-lg shadow-green-400/50 dark:border-slate-900" />
                </div>
                <div className="flex gap-2 pt-12 sm:pt-16">
                  <Link
                    href="/ca-nhan/edit"
                    className="flex items-center gap-2 rounded-xl border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-purple-700 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:bg-white dark:border-purple-700/50 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:border-purple-600/70 dark:hover:text-purple-200"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Chỉnh sửa
                  </Link>
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="text-xl font-black text-zinc-950 sm:text-2xl dark:text-white">
                    Nguyễn Văn A
                  </h1>
                  <span
                    className={`rounded-full border border-purple-200 bg-purple-100/80 px-2.5 py-0.5 text-xs font-bold dark:border-purple-500/30 dark:bg-purple-900/30 ${userRealm.color}`}
                  >
                    {userRealm.name} · Đỉnh phong
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-slate-500">
                  @nguyenvana · Tu tiên từ năm 2024
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
                  Kiếm tu cô đường, chẳng sợ trời đất. Một kiếm phá hư không, vạn cổ lưu danh. ⚔️
                </p>
              </div>

              {/* Spiritual power bar */}
              <div className="mt-5 rounded-2xl border border-purple-200 bg-white/70 p-4 shadow-sm shadow-zinc-950/5 dark:border-purple-800/30 dark:bg-purple-950/30 dark:shadow-none">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-bold text-zinc-700 dark:text-slate-300">
                      Linh lực
                    </span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-amber-300">
                      {formatPower(userPower)}
                    </span>
                    <span className="ml-1 text-xs text-zinc-500 dark:text-slate-500">điểm</span>
                  </div>
                </div>
                <div className="mb-1.5 flex items-center gap-3 text-xs">
                  <span className={`font-semibold ${userRealm.color}`}>{userRealm.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-400 shadow-[0_0_8px_rgba(196,130,244,0.6)]"
                      style={{ width: `${progressToNext}%` }}
                    />
                  </div>
                  <span className="font-semibold text-zinc-600 dark:text-slate-400">Luyện Hư</span>
                </div>
                <p className="text-right text-xs text-zinc-500 dark:text-slate-600">
                  {progressToNext}% đến cảnh giới tiếp theo
                </p>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-3">
                {stats.map(({ label, value, Icon, color, bg, border }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 rounded-xl border ${border} ${bg} px-3 py-2.5 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 dark:shadow-none`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/70 sm:h-9 sm:w-9 sm:rounded-xl dark:bg-white/5">
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div>
                      <div className={`text-lg font-black sm:text-xl ${color}`}>{value}</div>
                      <div className="text-[10px] text-zinc-500 sm:text-xs dark:text-slate-400">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ Main Grid ══ */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Left */}
            <div className="space-y-5">
              {/* Account menu */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 shadow-sm shadow-zinc-950/5 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-950/80 dark:shadow-none">
                <div className="border-b border-zinc-200 px-5 py-4 dark:border-slate-800/50">
                  <h2 className="font-bold text-zinc-900 dark:text-slate-200">Cài đặt</h2>
                </div>
                <div className="p-2">
                  {menuItems.map(({ label, Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-purple-100/70 dark:hover:bg-purple-900/20"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-purple-500 dark:text-slate-600 dark:group-hover:text-purple-400" />
                        <span className="text-sm text-zinc-600 group-hover:text-zinc-900 dark:text-slate-400 dark:group-hover:text-slate-200">
                          {label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 dark:text-slate-500 dark:group-hover:text-slate-400" />
                    </Link>
                  ))}
                  <div className="mx-3 my-1 border-t border-zinc-200 dark:border-slate-800/50" />
                  <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut className="h-4 w-4 text-zinc-400 group-hover:text-red-500 dark:text-slate-500 dark:group-hover:text-red-400" />
                    <span className="text-sm text-zinc-500 group-hover:text-red-500 dark:text-slate-500 dark:group-hover:text-red-400">
                      Đăng xuất
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent reads */}
              <RecentReadsPanel />
            </div>

            {/* Right — 2 cols */}
            <div className="space-y-6 lg:col-span-2">
              {/* ── Rank snapshot card ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-amber-200 shadow-xl shadow-amber-100/50 dark:border-amber-900/30 dark:shadow-amber-950/20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,250,235,0.96) 0%, rgba(255,255,255,0.98) 100%)',
                }}
              >
                <div
                  className="absolute inset-0 z-0 hidden dark:block"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(20,10,50,0.96) 0%, rgba(5,8,20,0.98) 100%)',
                  }}
                />
                <div className="relative z-10 border-b border-amber-200 px-6 py-4 dark:border-amber-800/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/80 to-transparent dark:from-amber-900/10" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/50">
                        <Crown className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-black text-zinc-950 dark:text-white">Thứ hạng tu vi</h2>
                        <p className="text-xs text-zinc-500 dark:text-slate-500">
                          Vị trí của bạn trong thiên hạ
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/xep-hang"
                      className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-white dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:border-amber-600/60 dark:hover:bg-amber-900/30"
                    >
                      Bảng xếp hạng đầy đủ
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative z-10 px-6 py-5">
                  <div className="mb-5 flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-black text-amber-300">#{userRank}</div>
                      <div className="mt-1 text-xs text-zinc-500 dark:text-slate-600">
                        Xếp hạng toàn cầu
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl border border-zinc-200 bg-white/85 p-4 dark:border-slate-800/50 dark:bg-slate-900/50">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <Link href="/xep-hang" className="group">
                          <div className="text-lg font-black text-purple-400 transition-transform group-hover:scale-110">
                            #{userRank}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase dark:text-slate-600">
                            Tu Vi
                          </div>
                        </Link>
                        <Link
                          href="/xep-hang/tai-phu"
                          className="group border-x border-zinc-200 dark:border-slate-800/50"
                        >
                          <div className="text-lg font-black text-amber-300 transition-transform group-hover:scale-110">
                            #14
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase dark:text-slate-600">
                            Tài Phú
                          </div>
                        </Link>
                        <Link href="/xep-hang/tong-mon" className="group">
                          <div className="text-lg font-black text-teal-400 transition-transform group-hover:scale-110">
                            #{userSect.rank}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase dark:text-slate-600">
                            Tông Môn
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-slate-600">
                    Thế lực tông môn
                  </p>
                  <div className="flex items-center gap-4 rounded-xl border border-teal-200 bg-teal-50/80 p-4 dark:border-teal-900/20 dark:bg-teal-900/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl shadow-lg ring-1 ring-teal-500/30">
                      🏰
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-zinc-900 dark:text-slate-200">
                          {userSect.name}
                        </h3>
                        <span className="text-xs font-black text-teal-400">
                          Hạng #{userSect.rank}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-slate-500">
                          <Flag className="h-3 w-3" /> Uy danh: {formatPower(userSect.prestige)}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-slate-500">
                          <Shield className="h-3 w-3" /> Cấp: Sơ cấp
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/xep-hang/tong-mon"
                      className="rounded-lg bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50"
                    >
                      Vào sảnh
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Weekly reading chart ── */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 shadow-sm shadow-zinc-950/5 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-950/80 dark:shadow-none">
                <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-slate-800/50">
                  <h2 className="font-bold text-zinc-900 dark:text-slate-200">Tiến độ đọc</h2>
                  <div className="flex items-center gap-1.5 text-sm text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">+3</span>
                    <span className="text-zinc-500 dark:text-slate-600">tuần này</span>
                  </div>
                </div>
                <div className="p-5">
                  <div
                    className="mb-2 flex items-end justify-between gap-2"
                    style={{ height: '80px' }}
                  >
                    {weeklyReads.map((h, i) => (
                      <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-lg bg-purple-200/70 transition-all group-hover:bg-purple-300/70 dark:bg-purple-500/10 dark:group-hover:bg-purple-500/20"
                          style={{ height: `${h}%` }}
                        >
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-cyan-400"
                            style={{ height: `${40 + ((i * 8) % 35)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 dark:text-slate-600">
                    {weekDays.map((d) => (
                      <span key={d} className="flex-1 text-center">
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-sm text-zinc-500 dark:text-slate-500">
                    Tổng:{' '}
                    <span className="font-bold text-zinc-900 dark:text-slate-300">245 chapter</span>{' '}
                    trong 7 ngày qua
                  </p>
                </div>
              </div>
              {/* ── Inventory (Hành trang) ── */}
              <div
                className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/85 shadow-sm shadow-zinc-950/5 dark:border-slate-800/50 dark:shadow-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(243,244,246,0.98) 100%)',
                }}
              >
                <div
                  className="absolute inset-0 z-0 hidden dark:block"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(12,8,35,0.96) 0%, rgba(4,6,18,0.98) 100%)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-400" />
                    <h2 className="font-bold text-zinc-900 dark:text-slate-200">Hành Trang</h2>
                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-bold text-zinc-600 dark:bg-slate-800 dark:text-slate-500">
                      {inventory.length} vật phẩm
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/nhan-vat"
                      className="flex items-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 transition-all hover:border-pink-300 hover:bg-pink-100 dark:border-pink-800/40 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:border-pink-700/60 dark:hover:bg-pink-900/30"
                    >
                      ⚔️ Trang bị
                    </Link>
                    <Link
                      href="/cua-hang"
                      className="flex items-center gap-1.5 text-xs text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Cửa hàng
                    </Link>
                  </div>
                </div>

                {/* Linh thạch banner */}
                <div className="relative z-10 flex items-center justify-between border-b border-amber-200 bg-amber-50/80 px-5 py-3 dark:border-amber-900/20 dark:bg-amber-900/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💎</span>
                    <div>
                      <span className="text-lg font-black text-amber-500 dark:text-amber-300">
                        {userWealth.toLocaleString('vi-VN')}
                      </span>
                      <span className="ml-1 text-xs text-zinc-500 dark:text-slate-500">
                        linh thạch
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/diem-danh"
                    className="flex items-center gap-1 rounded-xl border border-amber-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:border-amber-400 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:border-amber-600/60"
                  >
                    + Điểm danh
                  </Link>
                </div>

                {/* Item grid */}
                <div className="relative z-10 grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:p-4">
                  {inventory
                    .filter((i) => i.rarity !== 'Tiền tệ')
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`group relative flex flex-col items-center gap-1.5 overflow-hidden rounded-xl border ${item.border} bg-white/80 p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900/50`}
                      >
                        {/* Quantity badge */}
                        {item.qty > 1 && (
                          <span className="absolute top-1.5 right-1.5 rounded-full bg-zinc-950/80 px-1.5 text-[10px] font-black text-amber-300">
                            x{item.qty}
                          </span>
                        )}
                        {/* Icon */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-2xl shadow-md`}
                        >
                          {item.icon}
                        </div>
                        {/* Name */}
                        <p className="text-[11px] leading-tight font-semibold text-zinc-800 dark:text-slate-300">
                          {item.name}
                        </p>
                        {/* Rarity */}
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${item.badge}`}
                        >
                          {item.rarity}
                        </span>
                        {/* Hover tooltip */}
                        <div className="invisible absolute inset-x-0 bottom-0 z-10 rounded-b-xl bg-white/95 px-2 py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 dark:bg-slate-950/95">
                          <p className="text-[10px] leading-tight text-zinc-600 dark:text-slate-400">
                            {item.effect}
                          </p>
                          <button className="mt-1.5 w-full rounded-lg bg-purple-600/15 py-1 text-[10px] font-bold text-purple-700 hover:bg-purple-600/20 dark:bg-purple-700/60 dark:text-purple-200 dark:hover:bg-purple-600/60">
                            Sử dụng
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="relative z-10 border-t border-zinc-200 px-5 py-3 text-center dark:border-slate-800/40">
                  <Link
                    href="/cua-hang"
                    className="text-xs text-zinc-500 transition-colors hover:text-zinc-700 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    Xem cửa hàng để mua thêm vật phẩm →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
