import Link from 'next/link';
import { Crown, Coins, Sparkles, TrendingUp, Gem, Wallet, Zap, Castle } from 'lucide-react';

/* ─────────── Data ─────────── */

const wealthLevels = [
    { name: 'Nghèo Kiết Xác', color: 'text-slate-500', bg: 'bg-slate-700/30', border: 'border-slate-700/30' },
    { name: 'Thường Dân', color: 'text-slate-400', bg: 'bg-slate-700/30', border: 'border-slate-600/30' },
    { name: 'Tiểu Hộ Gia', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/30' },
    { name: 'Hào Phú', color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700/30' },
    { name: 'Cự Phú', color: 'text-cyan-400', bg: 'bg-cyan-900/20', border: 'border-cyan-700/30' },
    { name: 'Đại Trưởng Lão', color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30' },
    { name: 'Phú Khả Địch Quốc', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-700/30' },
    { name: 'Tài Thần', color: 'text-amber-400', bg: 'bg-amber-900/20', border: 'border-amber-700/30' },
    { name: 'Chúa Tể Kim Tiền', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-700/30' },
    { name: 'Vô Thượng Chí Tôn', color: 'text-yellow-300', bg: 'bg-yellow-900/20', border: 'border-yellow-700/30' },
];

const wealthConfig = Object.fromEntries(wealthLevels.map(r => [r.name, r]));
const floatingGold = Array.from({ length: 15 }, (_, i) => ({
    top: `${7 + i * 6}%`,
    left: `${5 + (i * 7) % 88}%`,
    animationDelay: `${(i % 5) * 0.35}s`,
    animationDuration: `${2 + (i % 4) * 0.45}s`
}));

const leaderboard = [
    {
        rank: 1,
        name: 'Vạn Bảo Các',
        title: 'Đệ Nhất Phú Hào · Kim Tiền Như Biển',
        level: 'Vô Thượng Chí Tôn',
        wealth: 99_999_999,
        avatar: 'from-amber-400 via-yellow-500 to-orange-500',
        titleColor: 'from-amber-300 via-yellow-200 to-amber-400',
        titleBorder: 'border-amber-500/40',
        titleBg: 'bg-amber-900/30',
        badge: '💎',
        spent: 450_000,
        assets: 120
    },
    {
        rank: 2,
        name: 'Sơn Tinh',
        title: 'Thần Tài Gõ Cửa · Vàng Bạc Đầy Kho',
        level: 'Vô Thượng Chí Tôn',
        wealth: 85_230_000,
        avatar: 'from-yellow-400 to-amber-600',
        titleColor: 'from-yellow-300 via-amber-200 to-yellow-400',
        titleBorder: 'border-yellow-500/40',
        titleBg: 'bg-yellow-900/30',
        badge: '💰',
        spent: 320_000,
        assets: 85
    },
    {
        rank: 3,
        name: 'Thẩm Vạn Tam',
        title: 'Gia Tài Bạc Tỷ · Phú Quốc Cự Gia',
        level: 'Chúa Tể Kim Tiền',
        wealth: 72_100_000,
        avatar: 'from-emerald-400 to-teal-600',
        titleColor: 'from-emerald-300 via-teal-200 to-emerald-400',
        titleBorder: 'border-emerald-500/40',
        titleBg: 'bg-emerald-900/30',
        badge: '💵',
        spent: 280_000,
        assets: 64
    },
    { rank: 4, name: 'Đại Gia Phố Cổ', level: 'Chúa Tể Kim Tiền', wealth: 58_000_000, avatar: 'from-blue-500 to-indigo-600', badge: '🏦', spent: 150_000, assets: 42 },
    { rank: 5, name: 'Trùm Bán Truyện', level: 'Tài Thần', wealth: 45_500_000, avatar: 'from-purple-500 to-pink-600', badge: '📜', spent: 120_000, assets: 38 },
    { rank: 6, name: 'Thiếu Gia Nhà Giàu', level: 'Tài Thần', wealth: 38_200_000, avatar: 'from-rose-500 to-red-600', badge: '🏎️', spent: 95_000, assets: 31 },
    { rank: 7, name: 'Lão Bản', level: 'Phú Khả Địch Quốc', wealth: 32_100_000, avatar: 'from-cyan-500 to-blue-600', badge: '🚬', spent: 80_000, assets: 25 },
    { rank: 8, name: 'Thương Nhân Vô Danh', level: 'Phú Khả Địch Quốc', wealth: 25_400_000, avatar: 'from-slate-500 to-gray-600', badge: '📦', spent: 72_000, assets: 22 },
    { rank: 9, name: 'Phu Nhân Tài Chính', level: 'Đại Trưởng Lão', wealth: 18_900_000, avatar: 'from-fuchsia-400 to-purple-600', badge: '💍', spent: 65_000, assets: 18 },
    { rank: 10, name: 'Công Tử Bạc Liêu', level: 'Đại Trưởng Lão', wealth: 12_300_000, avatar: 'from-yellow-200 to-yellow-500', badge: '🦯', spent: 50_000, assets: 15 },
    { rank: 14, name: 'Nguyễn Văn A', level: 'Hào Phú', wealth: 1_280_000, avatar: 'from-blue-500 to-indigo-600', badge: '🪙', spent: 5_000, assets: 5, isUser: true },
];

// Fill with some dummy data for ranks 11-20
if (leaderboard.length < 20) {
    const filtered = leaderboard.filter(e => !e.isUser);
    const others = Array.from({ length: 20 - filtered.length - 1 }, (_, i) => ({
        rank: filtered.length + i + 1,
        name: `Đại Gia ${i + 1}`,
        level: i < 5 ? 'Cự Phú' : 'Hào Phú',
        wealth: 5_000_000 - i * 300_000,
        avatar: 'from-slate-700 to-slate-800',
        badge: '💸',
        spent: 10_000 - i * 500,
        assets: 8 - Math.floor(i / 2)
    }));
    leaderboard.splice(10, 0, ...others);
    // Re-sort and re-rank
    leaderboard.sort((a, b) => b.wealth - a.wealth);
    leaderboard.forEach((e, i) => e.rank = i + 1);
}

function formatCurrency(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
    return n.toString();
}

/* ─────────── Page ─────────── */

export default function TopTaiPhuPage() {
    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);
    const userEntry = leaderboard.find(e => e.isUser)!;

    return (
        <div
            className="relative min-h-screen pb-20 pt-20 text-foreground transition-[background,color] duration-500 sm:pb-24 sm:pt-24"
            style={{ background: 'var(--page-bg-gradient)' }}
        >
            {/* Ambient glows - Gold theme */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/3 h-[500px] w-[700px] rounded-full bg-amber-300/20 blur-[120px] dark:bg-amber-900/20" />
                <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-yellow-300/15 blur-[100px] dark:bg-yellow-800/10" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-300/15 blur-[90px] dark:bg-orange-900/15" />
                {/* floating gold coins/sparks */}
                {floatingGold.map((spark, i) => (
                    <div key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-yellow-500/35 dark:bg-yellow-400/40"
                        style={spark}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* ── Page heading ── */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50/80 px-4 py-1.5 text-sm font-semibold text-yellow-700 backdrop-blur-sm dark:border-yellow-700/40 dark:bg-yellow-900/20 dark:text-yellow-300">
                        <TrendingUp className="h-4 w-4" />
                        Kim Sơn Ngân Hải
                    </div>
                    <h1 className="text-4xl font-black text-zinc-950 dark:text-white md:text-5xl">
                        Bảng Xếp Hạng{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                            Tài Phú
                        </span>
                    </h1>
                    <p className="mt-3 text-sm text-zinc-500 dark:text-slate-400">Những đại gia nức tiếng giới tu tiên — Vàng bạc đầy kho</p>

                    {/* ── Tabs ── */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex rounded-2xl border border-zinc-200 bg-white/85 p-1 shadow-sm shadow-zinc-950/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                            <Link href="/xep-hang" className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                                <Zap className="h-4 w-4" />
                                Tu Vi
                            </Link>
                            <Link href="/xep-hang/tai-phu" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all bg-amber-600 text-white shadow-lg shadow-amber-600/20">
                                <Coins className="h-4 w-4" />
                                Tài Phú
                            </Link>
                            <Link href="/xep-hang/tong-mon" className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                                <Castle className="h-4 w-4" />
                                Tông Môn
                            </Link>
                        </div>
                    </div>
                </div>


                {/* ── Your rank banner ── */}
                <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-white/85 px-5 py-4 shadow-sm shadow-zinc-950/5 backdrop-blur-sm dark:border-amber-700/30 dark:bg-amber-950/20 dark:shadow-none">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${userEntry.avatar} text-xl shadow-lg ring-1 ring-amber-500/30`}>
                            {userEntry.badge}
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-slate-400">Xếp hạng tài chính</p>
                            <p className="font-black text-zinc-950 dark:text-white">#{userEntry.rank} · {userEntry.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                        <div className="text-center">
                            <div className={`font-black ${wealthConfig[userEntry.level]?.color}`}>{userEntry.level}</div>
                            <div className="text-xs text-zinc-500 dark:text-slate-500">Cấp bậc</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 font-black text-amber-400">
                                <Coins className="h-3.5 w-3.5" />
                                {userEntry.wealth.toLocaleString()}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-slate-500">Tiền dư</div>
                        </div>
                    </div>
                    <Link href="/ca-nhan"
                        className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-all hover:border-yellow-400 hover:text-yellow-800 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:border-yellow-600/60 dark:hover:text-yellow-200"
                    >
                        Ví tiền <Wallet className="h-4 w-4" />
                    </Link>
                </div>

                {/* ── Top 3 Podium ── */}
                <div className="mb-8 grid grid-cols-3 gap-4 items-end">

                    {/* ── 2nd ── */}
                    <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-zinc-300 bg-gradient-to-b from-zinc-100 to-white shadow-xl backdrop-blur-sm dark:border-slate-500/30 dark:from-slate-900/80 dark:to-slate-950/90">
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
                                <div className="absolute -inset-1 animate-pulse rounded-full bg-slate-400/15 blur-sm" />
                                <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${top3[1].avatar} text-2xl shadow-xl ring-2 ring-slate-400/30`}>
                                    {top3[1].badge}
                                </div>
                            </div>
                            <div>
                                <p className="font-black text-zinc-900 dark:text-slate-100">{top3[1].name}</p>
                                <p className={`text-xs font-semibold ${wealthConfig[top3[1].level]?.color}`}>{top3[1].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-amber-700/30 bg-amber-900/20 px-3 py-1">
                                <Coins className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-sm font-black text-amber-300">{formatCurrency(top3[1].wealth)}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── 1st ── */}
                    <div className="z-20 flex scale-110 flex-col items-center gap-0 overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-50 to-white shadow-2xl shadow-yellow-200/40 backdrop-blur-sm dark:border-amber-400/50 dark:from-amber-950/40 dark:to-slate-950/90 dark:shadow-yellow-900/20">
                        {/* Danh hiệu banner */}
                        <div className={`w-full border-b ${top3[0].titleBorder} ${top3[0].titleBg} px-3 py-3 text-center`}>
                            <Crown className="mx-auto mb-1 h-5 w-5 text-amber-400" />
                            <p className={`bg-gradient-to-r ${top3[0].titleColor} bg-clip-text text-[11px] font-black leading-tight text-transparent uppercase tracking-tighter`}>
                                {top3[0].title}
                            </p>
                        </div>
                        {/* Body */}
                        <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
                            <div className="relative">
                                <div className="absolute -inset-3 animate-pulse rounded-full bg-yellow-400/20 blur-md" />
                                <div className="absolute -inset-1 rounded-full bg-yellow-400/10 blur-sm" />
                                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${top3[0].avatar} text-3xl shadow-2xl shadow-amber-900/70 ring-2 ring-amber-400/60`}>
                                    {top3[0].badge}
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-black text-amber-900 dark:text-amber-100">{top3[0].name}</p>
                                <p className={`text-xs font-semibold ${wealthConfig[top3[0].level]?.color}`}>{top3[0].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-900/30 px-4 py-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-sm font-black text-amber-300">{formatCurrency(top3[0].wealth)}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── 3rd ── */}
                    <div className="flex flex-col items-center gap-0 overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white shadow-xl backdrop-blur-sm dark:border-orange-800/30 dark:from-orange-950/40 dark:to-slate-950/90">
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
                                <div className="absolute -inset-1 animate-pulse rounded-full bg-orange-400/15 blur-sm" />
                                <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${top3[2].avatar} text-xl shadow-xl ring-2 ring-orange-500/30`}>
                                    {top3[2].badge}
                                </div>
                            </div>
                            <div>
                                <p className="font-black text-zinc-900 dark:text-slate-100">{top3[2].name}</p>
                                <p className={`text-xs font-semibold ${wealthConfig[top3[2].level]?.color}`}>{top3[2].level}</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-orange-700/30 bg-orange-900/20 px-3 py-1">
                                <Coins className="h-3.5 w-3.5 text-orange-400" />
                                <span className="text-sm font-black text-orange-300">{formatCurrency(top3[2].wealth)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Ranks 4–20 table ── */}
                <div className="mt-12 overflow-hidden rounded-2xl border border-yellow-200 bg-white/90 shadow-2xl shadow-zinc-950/5 backdrop-blur-sm dark:border-yellow-900/20 dark:shadow-black/40"
                    style={{ background: 'linear-gradient(180deg, rgba(255,251,235,0.96) 0%, rgba(255,255,255,0.98) 100%)' }}
                >
                    <div className="absolute inset-0 hidden dark:block"
                        style={{ background: 'linear-gradient(180deg, rgba(20,15,5,0.95) 0%, rgba(5,5,0,0.98) 100%)' }}
                    />
                    {/* Table header */}
                    <div className="relative grid grid-cols-12 gap-4 border-b border-yellow-200 px-5 py-4 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-yellow-900/20">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-4">Đại Gia</div>
                        <div className="col-span-2 text-center hidden sm:block">Chi tiêu</div>
                        <div className="col-span-2 text-center hidden sm:block">Linh bảo</div>
                        <div className="col-span-3 text-right">Tài sản (Vàng)</div>
                    </div>

                    <div className="relative divide-y divide-yellow-100 dark:divide-yellow-900/10">
                        {rest.map((entry) => {
                            const wc = wealthConfig[entry.level] ?? { color: 'text-slate-400' };
                            const isUser = entry.isUser;

                            return (
                                <div
                                    key={entry.rank}
                                    className={`group grid grid-cols-12 items-center gap-4 px-5 py-4 transition-all ${isUser
                                        ? 'border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                                        : 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10'
                                        }`}
                                >
                                    {/* Rank number */}
                                    <div className={`col-span-1 text-center text-sm font-black ${entry.rank <= 10 ? 'text-amber-600' : 'text-zinc-400 dark:text-slate-700'}`}>
                                        {entry.rank}
                                    </div>

                                    {/* Avatar + name */}
                                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${entry.avatar} text-lg shadow-md ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                                            {entry.badge}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`truncate font-bold ${isUser ? 'text-amber-700 dark:text-amber-300' : 'text-zinc-900 dark:text-slate-200'}`}>
                                                    {entry.name}
                                                </span>
                                                {isUser && (
                                                    <span className="shrink-0 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">BẠN</span>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${wc.color}`}>{entry.level}</span>
                                        </div>
                                    </div>

                                    {/* Spent */}
                                    <div className="col-span-2 hidden text-center sm:block">
                                        <div className="flex items-center justify-center gap-1 text-sm font-medium text-zinc-500 dark:text-slate-500">
                                            <TrendingUp className="h-3 w-3" />
                                            {formatCurrency(entry.spent || 0)}
                                        </div>
                                    </div>

                                    {/* Assets */}
                                    <div className="col-span-2 hidden text-center sm:block">
                                        <div className="flex items-center justify-center gap-1 text-sm font-medium text-zinc-500 dark:text-slate-500">
                                            <Gem className="h-3 w-3" />
                                            {entry.assets || 0}
                                        </div>
                                    </div>

                                    {/* Wealth */}
                                    <div className="col-span-3 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Coins className={`h-3.5 w-3.5 ${isUser ? 'text-amber-400' : 'text-amber-700'}`} />
                                            <span className={`text-sm font-black ${isUser ? 'text-amber-700 dark:text-amber-300' : 'text-amber-800 dark:text-amber-100'}`}>
                                                {entry.wealth.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase text-amber-500 dark:text-amber-900">Kim Nguyên Bảo</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="relative border-t border-yellow-200 px-6 py-4 text-center text-[10px] font-medium uppercase tracking-widest text-amber-700/70 dark:border-yellow-900/10 dark:text-amber-900/60">
                        Kinh tế ổn định · Phú quý tự nhiên · Cập nhật liên tục từ ngân khố
                    </div>
                </div>
            </div>
        </div>
    );
}
