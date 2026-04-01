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

/** Chương đã đọc mỗi ngày (T2 → CN); tổng khớp phần tóm tắt */
const weeklyReadingByDay = [
  { day: 'T2', chapters: 28 },
  { day: 'T3', chapters: 38 },
  { day: 'T4', chapters: 22 },
  { day: 'T5', chapters: 42 },
  { day: 'T6', chapters: 33 },
  { day: 'T7', chapters: 45 },
  { day: 'CN', chapters: 37 },
] as const;

const weeklyChaptersTotal = weeklyReadingByDay.reduce((s, d) => s + d.chapters, 0);
const weeklyChaptersMax = Math.max(...weeklyReadingByDay.map((d) => d.chapters));
const weeklyChaptersAvg = Math.round(weeklyChaptersTotal / weeklyReadingByDay.length);
const weeklyPeakDay = weeklyReadingByDay.reduce((a, b) => (b.chapters > a.chapters ? b : a));

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
      <div className="relative min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pt-20 pb-12 text-foreground transition-colors duration-500 dark:from-zinc-950 dark:via-[#060b16] dark:to-slate-950 sm:pt-24 sm:pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />

        <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
          {/* ══ Profile Hero ══ */}
          <div className="relative mb-6 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur sm:mb-8 dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
            <div className="relative z-10 h-28 overflow-hidden sm:h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100/95 via-blue-50/90 to-zinc-100/80 dark:from-slate-900/90 dark:via-blue-950/50 dark:to-slate-950/70" />
              <div
                className="absolute inset-0 opacity-50 dark:opacity-40"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231392ec' fill-opacity='0.06'%3E%3Cpath d='M36 34v6h6v-6h-6zm6 6v6h6v-6h-6zm-6 0v6h6v-6h-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
              <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 sm:top-4 sm:right-4 sm:gap-2">
                <div className="flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/85 px-3 py-1.5 backdrop-blur-sm dark:border-blue-500/25 dark:bg-slate-900/60">
                  <Zap className="h-3.5 w-3.5 text-[#1392ec]" />
                  <span className="text-[10px] font-bold tracking-wider text-blue-800 dark:text-sky-300">
                    TU VI #14
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/85 px-3 py-1.5 backdrop-blur-sm dark:border-amber-500/25 dark:bg-amber-950/40">
                  <Coins className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[10px] font-bold tracking-wider text-amber-800 dark:text-amber-200">
                    PHÚ HÀO #14
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="-mt-10 flex items-end justify-between sm:-mt-14">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#1392ec]/35 via-sky-400/30 to-teal-400/35 blur-md" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/90 bg-gradient-to-br from-[#1392ec] to-sky-700 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 sm:h-24 sm:w-24 dark:border-slate-800 dark:ring-blue-400/15">
                    <span className="text-4xl">⚡</span>
                  </div>
                  <div className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400 shadow-md dark:border-slate-900" />
                </div>
                <div className="flex gap-2 pt-12 sm:pt-16">
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2 rounded-xl border border-zinc-200/90 bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-[#1392ec] dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-blue-500/50 dark:hover:text-sky-300"
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
                    className={`rounded-full border border-violet-200/90 bg-violet-50/90 px-2.5 py-0.5 text-xs font-bold dark:border-violet-500/30 dark:bg-violet-950/40 ${userRealm.color}`}
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
              <div className="mt-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 shadow-sm shadow-zinc-950/5 dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-none">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                    <span className="text-sm font-bold text-zinc-700 dark:text-slate-300">
                      Linh lực
                    </span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-amber-600 dark:text-amber-300">
                      {formatPower(userPower)}
                    </span>
                    <span className="ml-1 text-xs text-zinc-500 dark:text-slate-500">điểm</span>
                  </div>
                </div>
                <div className="mb-1.5 flex items-center gap-3 text-xs">
                  <span className={`font-semibold ${userRealm.color}`}>{userRealm.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1392ec] to-sky-400 shadow-[0_0_10px_rgba(19,146,236,0.35)]"
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
                    className={`flex items-center gap-2 rounded-2xl border border-zinc-200/70 ${border} ${bg} px-3 py-2.5 shadow-sm shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300/80 sm:gap-3 sm:px-4 sm:py-3 dark:border-slate-800/50 dark:shadow-none dark:hover:border-slate-700/60`}
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
              <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
                <div className="border-b border-zinc-200/80 px-5 py-4 dark:border-slate-800/50">
                  <h2 className="font-bold text-zinc-900 dark:text-slate-200">Cài đặt</h2>
                </div>
                <div className="p-2">
                  {menuItems.map(({ label, Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-blue-50/90 dark:hover:bg-blue-950/25"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-[#1392ec] dark:text-slate-600 dark:group-hover:text-sky-400" />
                        <span className="text-sm text-zinc-600 group-hover:text-zinc-900 dark:text-slate-400 dark:group-hover:text-slate-200">
                          {label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-[#1392ec] dark:text-slate-500 dark:group-hover:text-sky-400" />
                    </Link>
                  ))}
                  <div className="mx-3 my-1 border-t border-zinc-200/80 dark:border-slate-800/50" />
                  <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-red-50 dark:hover:bg-red-950/30">
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
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231392ec' fill-opacity='0.07'%3E%3Cpath d='M20 20h20v20H20zM0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                />
                <div className="relative z-10 border-b border-zinc-200/80 dark:border-slate-800/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/90 via-white/40 to-sky-100/70 dark:from-amber-950/35 dark:via-slate-950/20 dark:to-blue-950/25" />
                  <div className="relative px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/25 ring-4 ring-amber-400/20 dark:shadow-amber-950/40 dark:ring-amber-500/15">
                          <Crown className="h-7 w-7 text-white drop-shadow-sm" />
                        </div>
                        <div className="min-w-0">
                          <span className="inline-flex items-center rounded-full border border-amber-200/90 bg-amber-50/90 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-amber-800 uppercase dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200">
                            Bảng xếp hạng
                          </span>
                          <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                            Thứ hạng tu vi
                          </h2>
                          <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
                            Vị trí của bạn trong thiên hạ — so tài tu vi, tài phú và uy danh tông môn.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/xep-hang"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/95 px-5 py-3 text-sm font-bold text-zinc-800 shadow-md transition-all hover:-translate-y-0.5 hover:border-[#1392ec]/50 hover:text-[#1392ec] dark:border-slate-700/70 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:border-sky-500/45 dark:hover:text-sky-300"
                      >
                        Xem bảng đầy đủ
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 px-5 py-5 sm:px-6 sm:py-6">
                  <div className="mb-6 grid gap-4 lg:grid-cols-12 lg:gap-5">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/95 to-white p-6 text-center shadow-sm dark:border-amber-900/35 dark:from-amber-950/30 dark:to-slate-900/40 lg:col-span-5">
                      <p className="text-[11px] font-bold tracking-[0.2em] text-amber-800/90 uppercase dark:text-amber-200/90">
                        Xếp hạng toàn cầu
                      </p>
                      <div className="relative mt-3">
                        <div className="absolute inset-0 mx-auto h-24 w-24 rounded-full bg-amber-400/20 blur-2xl dark:bg-amber-500/15" />
                        <p className="relative bg-gradient-to-b from-amber-500 via-orange-500 to-amber-700 bg-clip-text text-7xl font-black leading-none text-transparent tabular-nums sm:text-8xl dark:from-amber-300 dark:via-amber-400 dark:to-orange-600">
                          #{userRank}
                        </p>
                      </div>
                      <p className="mt-3 text-xs text-zinc-500 dark:text-slate-500">
                        Top luyện đọc · cập nhật theo tuần
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-3">
                      <Link
                        href="/xep-hang"
                        className="group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 transition-all hover:border-[#1392ec]/40 hover:bg-white hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-sky-500/35 dark:hover:bg-slate-900/70"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1392ec]/12 dark:bg-sky-500/15">
                          <Zap className="h-5 w-5 text-[#1392ec] dark:text-sky-400" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase dark:text-slate-500">
                            Tu vi
                          </p>
                          <p className="text-xl font-black tabular-nums text-zinc-950 group-hover:text-[#1392ec] dark:text-white dark:group-hover:text-sky-400">
                            #{userRank}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1392ec] dark:text-slate-600 dark:group-hover:text-sky-400" />
                      </Link>
                      <Link
                        href="/xep-hang/tai-phu"
                        className="group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 transition-all hover:border-amber-300/70 hover:bg-white hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-amber-700/40 dark:hover:bg-slate-900/70"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 dark:bg-amber-500/10">
                          <Coins className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase dark:text-slate-500">
                            Tài phú
                          </p>
                          <p className="text-xl font-black tabular-nums text-zinc-950 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-300">
                            #14
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600 dark:text-slate-600 dark:group-hover:text-amber-400" />
                      </Link>
                      <Link
                        href="/xep-hang/tong-mon"
                        className="group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 transition-all hover:border-teal-300/70 hover:bg-white hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-teal-700/40 dark:hover:bg-slate-900/70"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 dark:bg-teal-500/10">
                          <Trophy className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase dark:text-slate-500">
                            Tông môn
                          </p>
                          <p className="text-xl font-black tabular-nums text-zinc-950 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
                            #{userSect.rank}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600 dark:text-slate-600 dark:group-hover:text-teal-400" />
                      </Link>
                    </div>
                  </div>

                  <p className="mb-3 text-[11px] font-bold tracking-widest text-zinc-500 uppercase dark:text-slate-500">
                    Thế lực tông môn
                  </p>
                  <div className="flex flex-col gap-3 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-white to-emerald-50/50 p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-5 dark:border-teal-900/30 dark:from-teal-950/25 dark:via-slate-900/30 dark:to-emerald-950/20">
                    <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl leading-none shadow-lg ring-2 ring-teal-500/25 sm:h-14 sm:w-14">
                        🏰
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <h3 className="text-base font-bold text-zinc-900 sm:text-lg dark:text-slate-100">
                            {userSect.name}
                          </h3>
                          <span className="inline-flex shrink-0 items-center rounded-full bg-teal-500/15 px-2.5 py-0.5 text-xs font-black text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">
                            Hạng #{userSect.rank}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-600 sm:text-xs dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Flag className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                            Uy danh {formatPower(userSect.prestige)}
                          </span>
                          <span
                            className="hidden h-3 w-px shrink-0 bg-zinc-200 sm:block dark:bg-slate-600"
                            aria-hidden
                          />
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Shield className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                            Cấp Sơ cấp
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/xep-hang/tong-mon"
                      className="inline-flex h-10 w-full shrink-0 items-center justify-center rounded-xl bg-teal-600 px-4 text-xs font-bold text-white shadow-md transition-colors hover:bg-teal-700 sm:ml-0 sm:w-auto sm:self-center dark:bg-teal-600 dark:hover:bg-teal-500"
                    >
                      Vào sảnh
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Weekly reading chart ── */}
              <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
                <div className="flex flex-col gap-3 border-b border-zinc-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/50">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1392ec] to-sky-700 shadow-md shadow-blue-500/20">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-zinc-900 dark:text-slate-200">Tiến độ đọc</h2>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-slate-500">
                        7 ngày gần nhất · theo số chương đã đọc
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/35 dark:text-emerald-300">
                      <TrendingUp className="h-3.5 w-3.5" />
                      +3 so với tuần trước
                    </span>
                    <Link
                      href="/thu-vien"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1392ec] transition-colors hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      Thư viện
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/90 px-3 py-2.5 dark:border-slate-800/60 dark:bg-slate-900/40">
                      <p className="text-[10px] font-semibold tracking-wide text-zinc-500 uppercase dark:text-slate-500">
                        Tổng tuần
                      </p>
                      <p className="mt-0.5 text-lg font-black tabular-nums text-zinc-950 dark:text-white">
                        {weeklyChaptersTotal}
                        <span className="ml-1 text-xs font-semibold text-zinc-500 dark:text-slate-500">
                          chương
                        </span>
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/90 px-3 py-2.5 dark:border-slate-800/60 dark:bg-slate-900/40">
                      <p className="text-[10px] font-semibold tracking-wide text-zinc-500 uppercase dark:text-slate-500">
                        Trung bình
                      </p>
                      <p className="mt-0.5 text-lg font-black tabular-nums text-zinc-950 dark:text-white">
                        {weeklyChaptersAvg}
                        <span className="ml-1 text-xs font-semibold text-zinc-500 dark:text-slate-500">
                          / ngày
                        </span>
                      </p>
                    </div>
                    <div className="rounded-2xl border border-blue-200/80 bg-blue-50/80 px-3 py-2.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                      <p className="text-[10px] font-semibold tracking-wide text-blue-600 dark:text-sky-500">
                        Cao nhất
                      </p>
                      <p className="mt-0.5 truncate text-lg font-black tabular-nums text-zinc-950 dark:text-white">
                        {weeklyPeakDay.chapters}
                        <span className="ml-1 text-xs font-semibold text-zinc-500 dark:text-slate-500">
                          ({weeklyPeakDay.day})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 bg-gradient-to-b from-zinc-50/95 to-white px-3 pt-4 pb-3 dark:border-slate-800/60 dark:from-slate-900/50 dark:to-slate-950/40">
                    <div className="flex min-h-[10.5rem] items-end justify-between gap-1.5 sm:gap-2 sm:px-1">
                      {weeklyReadingByDay.map((row, i) => {
                        const pct =
                          weeklyChaptersMax > 0
                            ? Math.max(8, (row.chapters / weeklyChaptersMax) * 100)
                            : 8;
                        const isPeak = row.chapters === weeklyChaptersMax;
                        const isToday = i === weeklyReadingByDay.length - 1;
                        return (
                          <div
                            key={row.day}
                            className="flex min-w-0 flex-1 flex-col items-center gap-2"
                          >
                            <span
                              className={`text-[10px] font-bold tabular-nums sm:text-xs ${
                                isPeak
                                  ? 'text-[#1392ec] dark:text-sky-400'
                                  : 'text-zinc-400 dark:text-slate-500'
                              }`}
                            >
                              {row.chapters}
                            </span>
                            <div className="flex h-24 w-full max-w-[2.25rem] flex-col justify-end sm:max-w-11">
                              <div
                                title={`${row.chapters} chương`}
                                className={`group/bar relative w-full origin-bottom rounded-t-lg transition-transform duration-200 hover:scale-[1.02] ${
                                  isPeak
                                    ? 'bg-gradient-to-t from-[#1392ec] via-sky-500 to-sky-300 shadow-[0_8px_20px_-4px_rgba(19,146,236,0.45)] dark:shadow-[0_8px_24px_-4px_rgba(56,189,248,0.25)]'
                                    : 'bg-gradient-to-t from-sky-600/90 to-sky-300/85 dark:from-sky-600/70 dark:to-sky-400/50'
                                } ${isToday ? 'ring-2 ring-[#1392ec]/35 ring-offset-2 ring-offset-zinc-50 dark:ring-sky-400/40 dark:ring-offset-slate-900' : ''}`}
                                style={{ height: `${pct}%` }}
                              />
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <span
                                className={`text-[10px] font-bold sm:text-xs ${
                                  isToday
                                    ? 'text-[#1392ec] dark:text-sky-400'
                                    : 'text-zinc-500 dark:text-slate-500'
                                }`}
                              >
                                {row.day}
                              </span>
                              {isToday && (
                                <span className="hidden text-[9px] font-semibold text-zinc-400 sm:inline dark:text-slate-600">
                                  hôm nay
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-center text-xs text-zinc-500 dark:text-slate-500">
                    Gợi ý: giữ nhịp đều giúp duy trì streak và mở thêm phần thưởng tuần.
                  </p>
                </div>
              </div>
              {/* ── Inventory (Hành trang) ── */}
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-xl shadow-zinc-950/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/55 dark:shadow-black/20">
                <div className="relative z-10 flex flex-col gap-3 border-b border-zinc-200/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <Package className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                    <h2 className="font-bold text-zinc-900 dark:text-slate-200">Hành Trang</h2>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-600 dark:bg-slate-800 dark:text-slate-400">
                      {inventory.length} vật phẩm
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Link
                      href="/nhan-vat"
                      className="flex items-center gap-1.5 rounded-xl border border-rose-200/90 bg-rose-50/90 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-all hover:border-rose-300 hover:bg-rose-100/90 dark:border-rose-900/40 dark:bg-rose-950/35 dark:text-rose-300 dark:hover:border-rose-800/50 dark:hover:bg-rose-950/50"
                    >
                      ⚔️ Trang bị
                    </Link>
                    <Link
                      href="/cua-hang"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#1392ec] transition-colors hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Cửa hàng
                    </Link>
                  </div>
                </div>

                {/* Linh thạch banner */}
                <div className="relative z-10 flex flex-col gap-2 border-b border-amber-200/80 bg-amber-50/70 px-5 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-amber-900/30 dark:bg-amber-950/25">
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
                    className="flex w-fit items-center gap-1 rounded-xl border border-amber-200/90 bg-white/95 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-sm hover:border-amber-300 dark:border-amber-800/50 dark:bg-slate-900/70 dark:text-amber-200 dark:hover:border-amber-700/60"
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
                        className={`group relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border border-zinc-200/70 ${item.border} bg-white/90 p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300/80 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/50 dark:hover:border-slate-700/70`}
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
                          <button className="mt-1.5 w-full rounded-lg bg-[#1392ec]/12 py-1 text-[10px] font-bold text-[#1392ec] hover:bg-[#1392ec]/18 dark:bg-sky-500/20 dark:text-sky-200 dark:hover:bg-sky-500/30">
                            Sử dụng
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="relative z-10 border-t border-zinc-200/80 px-5 py-3 text-center dark:border-slate-800/50">
                  <Link
                    href="/cua-hang"
                    className="text-xs font-medium text-[#1392ec] transition-colors hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
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
