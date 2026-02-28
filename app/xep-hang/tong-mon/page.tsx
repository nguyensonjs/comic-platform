import Link from 'next/link';
import { Crown, Zap, Sparkles, ChevronRight, Users, Shield, Flag, Castle, Coins } from 'lucide-react';

/* ─────────── Data ─────────── */

const sectLevels = [
    { name: 'Sơ Cấp Tông Môn', color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30' },
    { name: 'Trung Cấp Tông Môn', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/30' },
    { name: 'Cao Cấp Tông Môn', color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700/30' },
    { name: 'Đại Tông Môn', color: 'text-cyan-400', bg: 'bg-cyan-900/20', border: 'border-cyan-700/30' },
    { name: 'Thánh Địa', color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30' },
    { name: 'Thượng Cổ Thánh Tộc', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-700/30' },
    { name: 'Thần Giới Đại Phái', color: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-700/30' },
    { name: 'Vô Thượng Thánh Địa', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700/30' },
];

const sectConfig = Object.fromEntries(sectLevels.map(r => [r.name, r]));

const leaderboard = [
    {
        rank: 1,
        name: 'Thanh Vân Môn',
        title: 'Đệ Nhất Chính Đạo · Trấn Quốc Tông Môn',
        level: 'Vô Thượng Thánh Địa',
        prestige: 15_800_000,
        members: 2500,
        avatar: 'from-blue-500 via-indigo-500 to-purple-600',
        titleColor: 'from-cyan-300 via-blue-200 to-indigo-400',
        titleBorder: 'border-blue-500/40',
        titleBg: 'bg-blue-900/30',
        badge: '🏰',
        territories: 12,
        powerBase: 'Hồ Bắc'
    },
    {
        rank: 2,
        name: 'Ma Giáo',
        title: 'Vạn Ma Chi Vương · Độc Tôn Ma Đạo',
        level: 'Vô Thượng Thánh Địa',
        prestige: 14_200_000,
        members: 3200,
        avatar: 'from-red-600 via-rose-700 to-black',
        titleColor: 'from-red-400 via-rose-300 to-red-500',
        titleBorder: 'border-red-600/40',
        titleBg: 'bg-red-900/30',
        badge: '💀',
        territories: 10,
        powerBase: 'Ma Giới'
    },
    {
        rank: 3,
        name: 'Vạn Kiếm Nhất',
        title: 'Kiếm Đạo Thánh Địa · Vạn Kiếm Quy Tông',
        level: 'Thần Giới Đại Phái',
        prestige: 12_500_000,
        members: 1800,
        avatar: 'from-emerald-400 via-teal-500 to-cyan-600',
        titleColor: 'from-emerald-300 via-teal-200 to-cyan-400',
        titleBorder: 'border-teal-500/40',
        titleBg: 'bg-teal-900/30',
        badge: '⚔️',
        territories: 8,
        powerBase: 'Kiếm Sơn'
    },
    { rank: 4, name: 'Tiên Nữ Các', level: 'Thượng Cổ Thánh Tộc', prestige: 8_900_000, members: 1200, avatar: 'from-pink-500 to-rose-600', badge: '🌸', territories: 6, powerBase: 'Hoa Đảo' },
    { rank: 5, name: 'Thiếu Lâm Tự', level: 'Thánh Địa', prestige: 7_500_000, members: 4500, avatar: 'from-orange-500 to-amber-600', badge: '📿', territories: 5, powerBase: 'Tung Sơn' },
    { rank: 6, name: 'Cái Bang', level: 'Thánh Địa', prestige: 6_200_000, members: 12000, avatar: 'from-slate-600 to-slate-800', badge: '🦯', territories: 8, powerBase: 'Giang Hồ' },
    { rank: 7, name: 'Đường Môn', level: 'Đại Tông Môn', prestige: 5_100_000, members: 900, avatar: 'from-purple-600 to-violet-800', badge: '🦂', territories: 4, powerBase: 'Tứ Xuyên' },
    { rank: 8, name: 'Minh Giáo', level: 'Đại Tông Môn', prestige: 4_300_000, members: 2100, avatar: 'from-orange-600 to-red-700', badge: '🔥', territories: 4, powerBase: 'Quang Minh Đỉnh' },
    { rank: 9, name: 'Dược Vương Cốc', level: 'Cao Cấp Tông Môn', prestige: 3_800_000, members: 450, avatar: 'from-green-500 to-emerald-600', badge: '🌿', territories: 2, powerBase: 'Dược Sơn' },
    { rank: 10, name: 'Vạn Thú Môn', level: 'Cao Cấp Tông Môn', prestige: 2_900_000, members: 850, avatar: 'from-amber-700 to-orange-800', badge: '🐾', territories: 3, powerBase: 'Thú Lâm' },
    { rank: 15, name: 'Tân Thủ Hội (Bạn)', level: 'Sơ Cấp Tông Môn', prestige: 150_000, members: 12, avatar: 'from-slate-700 to-slate-800', badge: '🆕', territories: 1, powerBase: 'Tân Thủ Thôn', isUser: true },
];

// Fill rest with dummy
if (leaderboard.length < 20) {
    const others = Array.from({ length: 20 - leaderboard.length }, (_, i) => ({
        rank: leaderboard.length + i + 1,
        name: `Tông Môn Lớp ${i + 11}`,
        level: 'Trung Cấp Tông Môn',
        prestige: 1_500_000 - i * 100_000,
        members: 200 - i * 10,
        avatar: 'from-slate-800 to-slate-900',
        badge: '🚩',
        territories: 1,
        powerBase: 'Ngoại Thành'
    }));
    leaderboard.push(...others);
    leaderboard.sort((a, b) => b.prestige - a.prestige);
    leaderboard.forEach((e, i) => e.rank = i + 1);
}

function formatVal(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
    return n.toString();
}

/* ─────────── Page ─────────── */

export default function TopTongMonPage() {
    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);
    const userEntry = leaderboard.find(e => e.isUser)!;

    return (
        <div
            className="relative min-h-screen text-foreground pb-20 pt-20 transition-[background,color] duration-300 sm:pb-24 sm:pt-24"
            style={{ background: 'var(--page-bg-gradient)' }}
        >
            {/* Ambient glows - Teal theme */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full bg-teal-900/20 blur-[120px]" />
                <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-blue-800/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-900/15 blur-[90px]" />
                {/* floating embers */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-teal-400/30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* ── Page heading ── */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-900/20 px-4 py-1.5 text-sm font-semibold text-teal-300 backdrop-blur-sm">
                        <Castle className="h-4 w-4" />
                        Vạn Thế Tông Môn
                    </div>
                    <h1 className="text-4xl font-black text-white md:text-5xl">
                        Bảng Xếp Hạng{' '}
                        <span className="bg-gradient-to-r from-teal-400 via-cyan-200 to-blue-500 bg-clip-text text-transparent">
                            Tông Môn
                        </span>
                    </h1>
                    <p className="mt-3 text-slate-400 text-sm">Thế lực hùng mạnh, trấn áp quần hùng — Cập nhật hàng ngày</p>

                    {/* ── Tabs ── */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex p-1 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md">
                            <Link href="/xep-hang" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                                <Zap className="h-4 w-4" />
                                Tu Vi
                            </Link>
                            <Link href="/xep-hang/tai-phu" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                                <Coins className="h-4 w-4" />
                                Tài Phú
                            </Link>
                            <Link href="/xep-hang/tong-mon" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all bg-teal-600 text-white shadow-lg shadow-teal-600/20">
                                <Castle className="h-4 w-4" />
                                Tông Môn
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Your sect banner ── */}
                <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-teal-700/30 bg-teal-950/20 px-5 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${userEntry.avatar} text-xl shadow-lg ring-1 ring-teal-500/30`}>
                            {userEntry.badge}
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Vị thế Tông môn</p>
                            <p className="font-black text-white">#{userEntry.rank} · {userEntry.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                        <div className="text-center">
                            <div className={`font-black ${sectConfig[userEntry.level]?.color}`}>{userEntry.level}</div>
                            <div className="text-xs text-slate-500">Cấp bậc</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 font-black text-teal-400">
                                <Flag className="h-3.5 w-3.5" />
                                {formatVal(userEntry.prestige)}
                            </div>
                            <div className="text-xs text-slate-500">Uy danh</div>
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-xl border border-teal-700/40 bg-teal-900/30 px-4 py-2 text-sm font-semibold text-teal-300 transition-all hover:border-teal-600/60 hover:text-teal-200">
                        Chi chi tiết <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* ── Top 3 Podium ── */}
                <div className="mb-8 grid grid-cols-3 gap-4 items-end">

                    {/* ── 2nd ── */}
                    <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-red-700/30 bg-gradient-to-b from-red-950/40 to-slate-950/90 shadow-xl backdrop-blur-sm">
                        {/* Banner */}
                        <div className={`w-full border-b ${top3[1].titleBorder} ${top3[1].titleBg} px-3 py-2 text-center`}>
                            <div className="mb-0.5 text-lg">🥈</div>
                            <p className={`bg-gradient-to-r ${top3[1].titleColor} bg-clip-text text-[10px] font-bold leading-tight text-transparent`}>
                                {top3[1].title}
                            </p>
                        </div>
                        {/* Body */}
                        <div className="flex flex-col items-center gap-3 px-5 py-5 text-center">
                            <div className="relative">
                                <div className="absolute -inset-1 animate-pulse rounded-full bg-red-400/15 blur-sm" />
                                <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${top3[1].avatar} text-2xl shadow-xl ring-2 ring-red-400/30`}>
                                    {top3[1].badge}
                                </div>
                            </div>
                            <div>
                                <p className="font-black text-slate-100">{top3[1].name}</p>
                                <p className={`text-xs font-semibold ${sectConfig[top3[1].level]?.color}`}>{top3[1].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-teal-700/30 bg-teal-900/20 px-3 py-1">
                                <Flag className="h-3.5 w-3.5 text-teal-400" />
                                <span className="text-sm font-black text-teal-300">{formatVal(top3[1].prestige)}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── 1st ── */}
                    <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-blue-400/50 bg-gradient-to-b from-blue-950/40 to-slate-950/90 shadow-2xl shadow-blue-900/20 backdrop-blur-sm scale-110 z-20">
                        {/* Banner */}
                        <div className={`w-full border-b ${top3[0].titleBorder} ${top3[0].titleBg} px-3 py-3 text-center`}>
                            <Crown className="mx-auto mb-1 h-5 w-5 text-cyan-400" />
                            <p className={`bg-gradient-to-r ${top3[0].titleColor} bg-clip-text text-[11px] font-black leading-tight text-transparent uppercase tracking-tighter`}>
                                {top3[0].title}
                            </p>
                        </div>
                        {/* Body */}
                        <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
                            <div className="relative">
                                <div className="absolute -inset-3 animate-pulse rounded-full bg-cyan-400/20 blur-md" />
                                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${top3[0].avatar} text-3xl shadow-2xl shadow-blue-900/70 ring-2 ring-cyan-400/60`}>
                                    {top3[0].badge}
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-black text-blue-100">{top3[0].name}</p>
                                <p className={`text-xs font-semibold ${sectConfig[top3[0].level]?.color}`}>{top3[0].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-teal-600/40 bg-teal-900/30 px-4 py-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                                <span className="text-sm font-black text-teal-300">{formatVal(top3[0].prestige)}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── 3rd ── */}
                    <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-emerald-700/30 bg-gradient-to-b from-emerald-950/40 to-slate-950/90 shadow-xl backdrop-blur-sm">
                        {/* Banner */}
                        <div className={`w-full border-b ${top3[2].titleBorder} ${top3[2].titleBg} px-3 py-2 text-center`}>
                            <div className="mb-0.5 text-lg">🥉</div>
                            <p className={`bg-gradient-to-r ${top3[2].titleColor} bg-clip-text text-[10px] font-bold leading-tight text-transparent`}>
                                {top3[2].title}
                            </p>
                        </div>
                        {/* Body */}
                        <div className="flex flex-col items-center gap-3 px-5 py-5 text-center">
                            <div className="relative">
                                <div className="absolute -inset-1 animate-pulse rounded-full bg-emerald-400/15 blur-sm" />
                                <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${top3[2].avatar} text-xl shadow-xl ring-2 ring-emerald-500/30`}>
                                    {top3[2].badge}
                                </div>
                            </div>
                            <div>
                                <p className="font-black text-slate-100">{top3[2].name}</p>
                                <p className={`text-xs font-semibold ${sectConfig[top3[2].level]?.color}`}>{top3[2].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-emerald-700/30 bg-emerald-900/20 px-3 py-1">
                                <Flag className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-sm font-black text-emerald-300">{formatVal(top3[2].prestige)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Ranks 4–20 table ── */}
                <div className="mt-12 overflow-hidden rounded-2xl border border-teal-900/20 backdrop-blur-sm shadow-2xl shadow-black/40"
                    style={{ background: 'linear-gradient(180deg, rgba(5,20,20,0.95) 0%, rgba(0,5,5,0.98) 100%)' }}
                >
                    {/* Table header */}
                    <div className="grid grid-cols-12 gap-4 border-b border-teal-900/20 px-5 py-4 text-xs font-bold uppercase tracking-widest text-teal-700">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-4">Tông Môn</div>
                        <div className="col-span-2 text-center hidden sm:block">Đệ tử</div>
                        <div className="col-span-2 text-center hidden sm:block">Lãnh thổ</div>
                        <div className="col-span-3 text-right">Uy danh</div>
                    </div>

                    <div className="divide-y divide-teal-900/10">
                        {rest.map((entry) => {
                            const sc = sectConfig[entry.level] ?? { color: 'text-slate-400' };
                            const isUser = entry.isUser;

                            return (
                                <div
                                    key={entry.rank}
                                    className={`group grid grid-cols-12 items-center gap-4 px-5 py-4 transition-all ${isUser
                                            ? 'bg-teal-950/30 border-l-4 border-teal-500'
                                            : 'hover:bg-teal-900/10'
                                        }`}
                                >
                                    <div className={`col-span-1 text-center text-sm font-black ${entry.rank <= 10 ? 'text-teal-600' : 'text-slate-700'}`}>
                                        {entry.rank}
                                    </div>

                                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${entry.avatar} text-lg shadow-md ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                                            {entry.badge}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`truncate font-bold ${isUser ? 'text-teal-300' : 'text-slate-200'}`}>
                                                    {entry.name}
                                                </span>
                                                {isUser && (
                                                    <span className="shrink-0 rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">BẠN</span>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${sc.color}`}>{entry.level}</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2 hidden text-center sm:block">
                                        <div className="flex items-center justify-center gap-1 text-sm text-slate-500 font-medium">
                                            <Users className="h-3 w-3" />
                                            {entry.members.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="col-span-2 hidden text-center sm:block">
                                        <div className="flex items-center justify-center gap-1 text-sm text-slate-500 font-medium">
                                            <Shield className="h-3 w-3" />
                                            {entry.territories || 0}
                                        </div>
                                    </div>

                                    <div className="col-span-3 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Flag className={`h-3.5 w-3.5 ${isUser ? 'text-teal-400' : 'text-teal-700'}`} />
                                            <span className={`text-sm font-black ${isUser ? 'text-teal-300' : 'text-teal-100'}`}>
                                                {formatVal(entry.prestige)}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-teal-900 uppercase">{entry.powerBase}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-t border-teal-900/10 px-6 py-4 text-center text-[10px] font-medium text-teal-900/60 uppercase tracking-widest">
                        Vạn phái triều tông · Khí vận hưng thịnh · Cập nhật từ thiên đình
                    </div>
                </div>
            </div>
        </div>
    );
}
