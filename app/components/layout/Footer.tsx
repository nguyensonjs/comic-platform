import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Globe,
  Mail,
  MessageCircle,
  Share2,
  ArrowRight,
  Shield,
  FileText,
  Map,
  HelpCircle,
  HeadphonesIcon,
  Send,
  Heart,
  Zap,
} from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'Hành động', href: '/truyen/action', color: 'hover:text-orange-400' },
    { label: 'Lãng mạn', href: '/truyen/romance', color: 'hover:text-pink-400' },
    { label: 'Huyền huyễn', href: '/truyen/fantasy', color: 'hover:text-purple-400' },
    { label: 'Kinh dị', href: '/truyen/horror', color: 'hover:text-red-400' },
    { label: 'Hài hước', href: '/truyen/comedy', color: 'hover:text-yellow-400' },
    { label: 'Võ thuật', href: '/truyen/martial', color: 'hover:text-cyan-400' },
  ],
  support: [
    { label: 'Trung tâm trợ giúp', href: '/help', Icon: HelpCircle },
    { label: 'Liên hệ', href: '/contact', Icon: HeadphonesIcon },
    { label: 'Cộng đồng', href: '/community', Icon: MessageCircle },
    { label: 'Góp ý', href: '/feedback', Icon: Send },
  ],
};

const socials = [
  { Icon: Globe, href: '#', label: 'Website', hoverColor: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10' },
  { Icon: Mail, href: '#', label: 'Email', hoverColor: 'hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10' },
  { Icon: MessageCircle, href: '#', label: 'Forum', hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10' },
  { Icon: Share2, href: '#', label: 'Share', hoverColor: 'hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 xl:gap-16">

          {/* ── Brand column ── */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-6 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/logo-v2.png"
                  alt="NetComic Logo"
                  width={44}
                  height={44}
                  className="h-full w-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-2xl font-black tracking-tighter text-transparent">
                  NET
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 dark:text-cyan-400 uppercase">
                  comic
                </span>
              </div>
            </Link>

            <p className="mb-8 max-w-xs text-sm leading-relaxed text-slate-400">
              Khám phá kho tàng truyện tranh và tiểu thuyết phong phú nhất. Hành trình vô tận đang chờ bạn.
            </p>

            {/* Social buttons */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500 transition-all duration-300 hover:-translate-y-0.5 ${hoverColor}`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore column ── */}
          <div>
            <h6 className="mb-6 text-xs font-bold tracking-widest text-slate-900 dark:text-slate-200 uppercase">
              Khám phá
            </h6>
            <ul className="space-y-3.5">
              {footerLinks.explore.map(({ label, href, color }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`group flex items-center gap-2 text-sm text-slate-400 transition-all duration-200 ${color}`}
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support column ── */}
          <div>
            <h6 className="mb-6 text-xs font-bold tracking-widest text-slate-900 dark:text-slate-200 uppercase">
              Hỗ trợ
            </h6>
            <ul className="space-y-3.5">
              {footerLinks.support.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2.5 text-sm text-slate-400 transition-colors duration-200 hover:text-slate-200"
                  >
                    <Icon className="h-4 w-4 text-slate-600 transition-colors duration-200 group-hover:text-blue-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter column ── */}
          <div>
            <h6 className="mb-6 text-xs font-bold tracking-widest text-slate-900 dark:text-slate-200 uppercase">
              Bản tin
            </h6>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Nhận thông báo về truyện mới và sự kiện hấp dẫn hàng tuần.
            </p>
            <form className="relative mb-8">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full rounded-xl border border-slate-200/50 dark:border-slate-700/40 bg-slate-100/50 dark:bg-slate-900/40 py-3 pr-12 pl-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 backdrop-blur-sm transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Stats mini-section */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">12K+</div>
                  <div className="text-xs text-slate-500">Bộ truyện</div>
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 dark:text-white">89K+</div>
                  <div className="text-xs text-slate-500">Độc giả</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800/80 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 text-xs text-slate-500 md:items-start">
            <p>
              © 2024{' '}
              <span className="font-semibold text-slate-400">NetComic</span>. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Thiết kế với <Heart className="inline h-3 w-3 text-red-500" fill="currentColor" /> tại Việt Nam
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: 'Bảo mật', href: '/privacy', Icon: Shield },
              { label: 'Điều khoản', href: '/terms', Icon: FileText },
              { label: 'Sitemap', href: '/sitemap', Icon: Map },
            ].map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 transition-colors group-hover:text-blue-400" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
