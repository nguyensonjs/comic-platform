import Link from 'next/link';
import { Crown, Zap, Flame, Sparkles, Trophy, ChevronRight, Star, Coins, Castle } from 'lucide-react';

/* ─────────── Data ─────────── */

const cultivationRealms = [
  { name: 'Luyện Khí', color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30' },
  { name: 'Trúc Cơ', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/30' },
  { name: 'Kim Đan', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/30' },
  { name: 'Nguyên Anh', color: 'text-cyan-400', bg: 'bg-cyan-900/20', border: 'border-cyan-700/30' },
  { name: 'Hóa Thần', color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30' },
  { name: 'Luyện Hư', color: 'text-blue-300', bg: 'bg-blue-900/20', border: 'border-blue-700/30' },
  { name: 'Hợp Thể', color: 'text-violet-300', bg: 'bg-violet-900/20', border: 'border-violet-700/30' },
  { name: 'Đại Thừa', color: 'text-orange-300', bg: 'bg-orange-900/20', border: 'border-orange-700/30' },
  { name: 'Độ Kiếp', color: 'text-red-300', bg: 'bg-red-900/20', border: 'border-red-700/30' },
  { name: 'Tiên Nhân', color: 'text-amber-300', bg: 'bg-amber-900/20', border: 'border-amber-700/30' },
];

const realmConfig = Object.fromEntries(cultivationRealms.map(r => [r.name, r]));

const leaderboard = [
  { rank: 1, name: 'Thiên Đạo Tôn', title: 'Vô Thượng Thiên Tôn · Chúa Tể Vạn Giới', realm: 'Tiên Nhân', stage: 'Đỉnh phong', power: 9_999_999, avatar: 'from-amber-400 to-orange-500', titleColor: 'from-amber-300 via-yellow-200 to-amber-400', titleBorder: 'border-amber-500/40', titleBg: 'bg-amber-900/30', badge: '👑', reads: 2847, reviews: 312 },
  { rank: 2, name: 'Kiếm Vô Danh', title: 'Kiếm Thánh Thiên Địa · Độc Tôn Kiếm Đạo', realm: 'Tiên Nhân', stage: 'Hậu kỳ', power: 8_754_320, avatar: 'from-violet-500 to-purple-600', titleColor: 'from-violet-300 via-purple-200 to-violet-400', titleBorder: 'border-violet-500/40', titleBg: 'bg-violet-900/30', badge: '⚔️', reads: 2341, reviews: 278 },
  { rank: 3, name: 'Huyễn Tiên Nữ', title: 'Vạn Hoa Tiên Tử · Hoa Thần Huyền Cơ', realm: 'Tiên Nhân', stage: 'Trung kỳ', power: 7_203_810, avatar: 'from-pink-500 to-rose-600', titleColor: 'from-rose-300 via-pink-200 to-rose-400', titleBorder: 'border-rose-500/40', titleBg: 'bg-rose-900/30', badge: '🌸', reads: 1998, reviews: 241 },
  { rank: 4, name: 'Long Vương', realm: 'Độ Kiếp', stage: 'Đỉnh phong', power: 5_881_000, avatar: 'from-blue-500 to-cyan-600', badge: '🐉', reads: 1654, reviews: 189 },
  { rank: 5, name: 'Vô Cực Tán Nhân', realm: 'Độ Kiếp', stage: 'Hậu kỳ', power: 5_230_400, avatar: 'from-teal-500 to-green-600', badge: '🌀', reads: 1502, reviews: 167 },
  { rank: 6, name: 'Hỏa Linh Tôn', realm: 'Đại Thừa', stage: 'Đỉnh phong', power: 4_110_700, avatar: 'from-orange-500 to-red-500', badge: '🔥', reads: 1340, reviews: 145 },
  { rank: 7, name: 'Băng Phong Ma', realm: 'Đại Thừa', stage: 'Hậu kỳ', power: 3_780_200, avatar: 'from-sky-400 to-blue-500', badge: '❄️', reads: 1201, reviews: 131 },
  { rank: 8, name: 'Lôi Đế', realm: 'Đại Thừa', stage: 'Trung kỳ', power: 3_412_900, avatar: 'from-yellow-500 to-amber-600', badge: '⚡', reads: 1088, reviews: 119 },
  { rank: 9, name: 'Hắc Thiên', realm: 'Hợp Thể', stage: 'Đỉnh phong', power: 2_887_600, avatar: 'from-gray-700 to-slate-800', badge: '🌑', reads: 978, reviews: 103 },
  { rank: 10, name: 'Cửu Dương Tiên Tông', realm: 'Hợp Thể', stage: 'Hậu kỳ', power: 2_540_100, avatar: 'from-yellow-400 to-orange-400', badge: '☀️', reads: 889, reviews: 97 },
  { rank: 11, name: 'Nguyệt Ảnh', realm: 'Luyện Hư', stage: 'Đỉnh phong', power: 1_903_400, avatar: 'from-indigo-400 to-purple-500', badge: '🌙', reads: 801, reviews: 88 },
  { rank: 12, name: 'Ma Tôn Vô Danh', realm: 'Luyện Hư', stage: 'Hậu kỳ', power: 1_640_000, avatar: 'from-red-700 to-rose-800', badge: '👹', reads: 720, reviews: 79 },
  { rank: 13, name: 'Phong Thần', realm: 'Luyện Hư', stage: 'Trung kỳ', power: 1_388_200, avatar: 'from-cyan-500 to-teal-600', badge: '🌪️', reads: 651, reviews: 71 },
  { rank: 14, name: 'Nguyễn Văn A', realm: 'Hóa Thần', stage: 'Đỉnh phong', power: 987_654, avatar: 'from-blue-500 to-indigo-600', badge: '⚡', reads: 581, reviews: 63, isUser: true },
  { rank: 15, name: 'Kiếm Thiên Sơn', realm: 'Hóa Thần', stage: 'Hậu kỳ', power: 812_300, avatar: 'from-green-600 to-emerald-700', badge: '🗡️', reads: 524, reviews: 57 },
  { rank: 16, name: 'Linh Nhi', realm: 'Hóa Thần', stage: 'Trung kỳ', power: 703_100, avatar: 'from-pink-400 to-fuchsia-500', badge: '🌺', reads: 471, reviews: 51 },
  { rank: 17, name: 'Tu La Vương', realm: 'Nguyên Anh', stage: 'Đỉnh phong', power: 541_000, avatar: 'from-red-500 to-orange-600', badge: '👿', reads: 412, reviews: 44 },
  { rank: 18, name: 'Bích Hải Thanh Long', realm: 'Nguyên Anh', stage: 'Hậu kỳ', power: 430_800, avatar: 'from-teal-400 to-cyan-500', badge: '🐲', reads: 358, reviews: 38 },
  { rank: 19, name: 'Tiên Nữ Hạo Nhiên', realm: 'Nguyên Anh', stage: 'Trung kỳ', power: 312_500, avatar: 'from-violet-400 to-purple-500', badge: '🧚', reads: 301, reviews: 33 },
  { rank: 20, name: 'Hoàng Kim Đao', realm: 'Kim Đan', stage: 'Đỉnh phong', power: 198_700, avatar: 'from-yellow-500 to-amber-500', badge: '🗡️', reads: 248, reviews: 27 },
];

function formatPower(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

/* ─────────── Page ─────────── */

export default function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const userEntry = leaderboard.find(e => e.isUser)!;

  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{ background: 'radial-gradient(ellipse at top, #0d1b3e 0%, #050b18 60%, #030710 100%)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full bg-purple-900/15 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-amber-800/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-900/15 blur-[90px]" />
        {/* floating sparks */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-300/30"
            style={{ top: `${8 + i * 9}%`, left: `${4 + i * 10}%`, animationDelay: `${i * 0.35}s`, animationDuration: `${1.8 + i * 0.25}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Page heading ── */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-900/20 px-4 py-1.5 text-sm font-semibold text-amber-300 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Thiên Địa Huyền Hoàng
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Bảng Xếp Hạng{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Tu Vi
            </span>
          </h1>
          <p className="mt-3 text-slate-500 text-sm">Top 20 tu sĩ mạnh nhất thiên hạ — cập nhật mỗi ngày</p>

          {/* ── Tabs ── */}
          <div className="mt-8 flex justify-center">
            <div className="flex p-1 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
              <Link href="/xep-hang" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Zap className="h-4 w-4" />
                Tu Vi
              </Link>
              <Link href="/xep-hang/tai-phu" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                <Coins className="h-4 w-4" />
                Tài Phú
              </Link>
              <Link href="/xep-hang/tong-mon" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                <Castle className="h-4 w-4" />
                Tông Môn
              </Link>
            </div>
          </div>
        </div>

        {/* ── Your rank banner ── */}
        <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-blue-700/30 bg-blue-950/30 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${userEntry.avatar} text-xl`}>
              {userEntry.badge}
            </div>
            <div>
              <p className="text-sm text-slate-400">Xếp hạng của bạn</p>
              <p className="font-black text-white">#{userEntry.rank} · {userEntry.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className={`font-black text-purple-400`}>{userEntry.realm}</div>
              <div className="text-xs text-slate-600">{userEntry.stage}</div>
            </div>
            <div className="text-center">
              <div className="font-black text-amber-300">{formatPower(userEntry.power)}</div>
              <div className="text-xs text-slate-600">linh lực</div>
            </div>
          </div>
          <Link href="/ca-nhan"
            className="flex items-center gap-1.5 rounded-xl border border-blue-700/40 bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-300 transition-all hover:border-blue-600/60 hover:text-blue-200"
          >
            Hồ sơ <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Top 3 Podium ── */}
        <div className="mb-8 grid grid-cols-3 gap-4 items-end">

          {/* ── 2nd ── */}
          <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-violet-700/30 bg-gradient-to-b from-violet-950/50 to-slate-950/80 shadow-lg shadow-violet-950/30 backdrop-blur-sm">
            {/* Danh hiệu banner */}
            <div className={`w-full border-b ${top3[1].titleBorder} ${top3[1].titleBg} px-3 py-2 text-center`}>
              <div className="mb-0.5 text-lg">🥈</div>
              <p className={`bg-gradient-to-r ${top3[1].titleColor} bg-clip-text text-[10px] font-bold leading-tight text-transparent`}>
                {top3[1].title}
              </p>
            </div>
            {/* Body */}
            <div className="flex flex-col items-center gap-3 px-5 py-5 text-center">
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-violet-400/15 blur-sm" />
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${top3[1].avatar} text-2xl shadow-xl ring-2 ring-violet-500/30`}>
                  {top3[1].badge}
                </div>
              </div>
              <div>
                <p className="font-black text-slate-100">{top3[1].name}</p>
                <p className={`text-xs font-semibold ${realmConfig[top3[1].realm]?.color}`}>{top3[1].realm} · {top3[1].stage}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-violet-700/30 bg-violet-900/20 px-3 py-1">
                <Zap className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-sm font-black text-violet-300">{formatPower(top3[1].power)}</span>
              </div>
            </div>
          </div>

          {/* ── 1st ── */}
          <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-amber-600/50 bg-gradient-to-b from-amber-950/60 to-slate-950/80 shadow-2xl shadow-amber-950/50 backdrop-blur-sm">
            {/* Danh hiệu banner */}
            <div className={`w-full border-b ${top3[0].titleBorder} ${top3[0].titleBg} px-3 py-3 text-center`}>
              <Crown className="mx-auto mb-1 h-5 w-5 text-amber-400" />
              <p className={`bg-gradient-to-r ${top3[0].titleColor} bg-clip-text text-[11px] font-black leading-tight text-transparent`}>
                {top3[0].title}
              </p>
            </div>
            {/* Body */}
            <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
              <div className="relative">
                <div className="absolute -inset-2 animate-pulse rounded-full bg-amber-400/20 blur-md" />
                <div className="absolute -inset-1 rounded-full bg-amber-400/10 blur-sm" />
                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${top3[0].avatar} text-3xl shadow-2xl shadow-amber-900/70 ring-2 ring-amber-400/60`}>
                  {top3[0].badge}
                </div>
              </div>
              <div>
                <p className="text-lg font-black text-amber-100">{top3[0].name}</p>
                <p className={`text-xs font-semibold ${realmConfig[top3[0].realm]?.color}`}>{top3[0].realm} · {top3[0].stage}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-900/30 px-4 py-1.5">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-sm font-black text-amber-300">{formatPower(top3[0].power)}</span>
              </div>
            </div>
          </div>

          {/* ── 3rd ── */}
          <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-rose-700/30 bg-gradient-to-b from-rose-950/50 to-slate-950/80 shadow-lg shadow-rose-950/30 backdrop-blur-sm">
            {/* Danh hiệu banner */}
            <div className={`w-full border-b ${top3[2].titleBorder} ${top3[2].titleBg} px-3 py-2 text-center`}>
              <div className="mb-0.5 text-lg">🥉</div>
              <p className={`bg-gradient-to-r ${top3[2].titleColor} bg-clip-text text-[10px] font-bold leading-tight text-transparent`}>
                {top3[2].title}
              </p>
            </div>
            {/* Body */}
            <div className="flex flex-col items-center gap-3 px-5 py-5 text-center">
              <div className="relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-rose-400/15 blur-sm" />
                <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${top3[2].avatar} text-xl shadow-xl ring-2 ring-rose-500/30`}>
                  {top3[2].badge}
                </div>
              </div>
              <div>
                <p className="font-black text-slate-100">{top3[2].name}</p>
                <p className={`text-xs font-semibold ${realmConfig[top3[2].realm]?.color}`}>{top3[2].realm} · {top3[2].stage}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-rose-700/30 bg-rose-900/20 px-3 py-1">
                <Zap className="h-3.5 w-3.5 text-rose-400" />
                <span className="text-sm font-black text-rose-300">{formatPower(top3[2].power)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ranks 4–20 table ── */}
        <div className="overflow-hidden rounded-2xl border border-slate-800/50 backdrop-blur-sm"
          style={{ background: 'linear-gradient(180deg, rgba(12,8,35,0.96) 0%, rgba(4,6,18,0.98) 100%)' }}
        >
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 border-b border-slate-800/50 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-600">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Tu Sĩ</div>
            <div className="col-span-2 text-center hidden sm:block">Truyện đọc</div>
            <div className="col-span-2 text-center hidden sm:block">Đánh giá</div>
            <div className="col-span-2 text-right">Linh lực</div>
          </div>

          <div className="divide-y divide-slate-800/30">
            {rest.map((entry) => {
              const rc = realmConfig[entry.realm] ?? { color: 'text-slate-400', bg: '', border: '' };
              const isUser = entry.isUser;

              return (
                <div
                  key={entry.rank}
                  className={`group grid grid-cols-12 items-center gap-4 px-5 py-4 transition-all ${isUser
                    ? 'bg-blue-950/40 border-l-2 border-blue-500'
                    : 'hover:bg-slate-900/50'
                    }`}
                >
                  {/* Rank number */}
                  <div className="col-span-1 text-center text-sm font-black text-slate-500">{entry.rank}</div>

                  {/* Avatar + name */}
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${entry.avatar} text-lg shadow-md`}>
                      {entry.badge}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`truncate font-bold ${isUser ? 'text-blue-300' : 'text-slate-200'}`}>
                          {entry.name}
                        </span>
                        {isUser && (
                          <span className="shrink-0 rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">BẠN</span>
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${rc.color}`}>{entry.realm} · {entry.stage}</span>
                    </div>
                  </div>

                  {/* Reads */}
                  <div className="col-span-2 hidden text-center sm:block">
                    <div className="flex items-center justify-center gap-1 text-sm text-slate-400">
                      <Trophy className="h-3.5 w-3.5 text-slate-600" />
                      {entry.reads.toLocaleString()}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="col-span-2 hidden text-center sm:block">
                    <div className="flex items-center justify-center gap-1 text-sm text-slate-400">
                      <Star className="h-3.5 w-3.5 text-slate-600" />
                      {entry.reviews}
                    </div>
                  </div>

                  {/* Power */}
                  <div className="col-span-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Zap className={`h-3.5 w-3.5 ${isUser ? 'text-blue-400' : 'text-slate-600'}`} />
                      <span className={`text-sm font-black ${isUser ? 'text-blue-300' : 'text-slate-300'}`}>
                        {formatPower(entry.power)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-700">linh lực</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-800/40 px-6 py-4 text-center text-xs text-slate-700">
            Bảng xếp hạng cập nhật hằng ngày lúc 00:00 · Linh lực tích lũy từ hoạt động đọc truyện, đánh giá và bình luận
          </div>
        </div>
      </div>
    </div>
  );
}
