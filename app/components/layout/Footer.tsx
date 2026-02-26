import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="to-background-dark relative mt-24 overflow-hidden bg-gradient-to-b from-slate-900/50">
      {/* Cosmic background effects */}
      <div className="from-primary/5 to-qi-teal/5 absolute inset-0 bg-gradient-to-r via-transparent"></div>
      <div className="via-primary/50 absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"></div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Logo và mô tả */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="from-primary to-qi-teal shadow-primary/25 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
                  <span className="material-symbols-outlined text-xl font-bold text-white">
                    auto_awesome
                  </span>
                </div>
                <div className="flex flex-col">
                  <h1 className="to-primary bg-gradient-to-r from-white bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                    COSMIC
                  </h1>
                  <span className="text-sm font-light tracking-widest text-slate-400 uppercase">
                    cultivation
                  </span>
                </div>
              </div>
              <p className="mb-6 max-w-md leading-relaxed text-slate-300">
                Khám phá kho tàng truyện tranh và tiểu thuyết phong phú nhất. Hành trình khám phá
                thế giới câu chuyện vô tận đang chờ đón bạn.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                <button className="group hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-primary/25 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 backdrop-blur-sm transition-all hover:shadow-lg">
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:scale-110">
                    language
                  </span>
                </button>
                <button className="group hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-primary/25 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 backdrop-blur-sm transition-all hover:shadow-lg">
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:scale-110">
                    mail
                  </span>
                </button>
                <button className="group hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-primary/25 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 backdrop-blur-sm transition-all hover:shadow-lg">
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:scale-110">
                    forum
                  </span>
                </button>
                <button className="group hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-primary/25 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50 text-slate-400 backdrop-blur-sm transition-all hover:shadow-lg">
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:scale-110">
                    share
                  </span>
                </button>
              </div>
            </div>

            {/* Thể loại */}
            <div>
              <h6 className="mb-6 text-sm font-bold tracking-wide text-white uppercase opacity-90">
                Thể loại
              </h6>
              <div className="space-y-3">
                <Link
                  href="/truyen/action"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Hành động</span>
                </Link>
                <Link
                  href="/truyen/romance"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Lãng mạn</span>
                </Link>
                <Link
                  href="/truyen/fantasy"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Huyền huyễn</span>
                </Link>
                <Link
                  href="/truyen/horror"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Kinh dị</span>
                </Link>
                <Link
                  href="/truyen/comedy"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Hài hước</span>
                </Link>
              </div>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h6 className="mb-6 text-sm font-bold tracking-wide text-white uppercase opacity-90">
                Hỗ trợ
              </h6>
              <div className="space-y-3">
                <Link
                  href="/help"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Trung tâm trợ giúp</span>
                </Link>
                <Link
                  href="/community"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Cộng đồng</span>
                </Link>
                <Link
                  href="/contact"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Liên hệ</span>
                </Link>
                <Link
                  href="/faq"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">FAQ</span>
                </Link>
                <Link
                  href="/feedback"
                  className="group hover:text-qi-teal flex items-center gap-2 text-slate-400 transition-colors"
                >
                  <span className="group-hover:bg-qi-teal h-1 w-1 rounded-full bg-slate-600 transition-colors"></span>
                  <span className="text-sm">Góp ý</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 backdrop-blur-sm lg:col-start-4">
            <h6 className="mb-4 text-sm font-bold tracking-wide text-white uppercase opacity-90">
              Thống kê
            </h6>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Tổng truyện</span>
                <span className="text-qi-teal font-bold">12,547</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Người dùng</span>
                <span className="text-qi-teal font-bold">89,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Cập nhật hôm nay</span>
                <span className="text-primary font-bold">156</span>
              </div>
              <div className="my-3 h-px bg-slate-700/50"></div>
              <div className="text-center">
                <button className="from-primary to-qi-teal hover:from-primary/80 hover:to-qi-teal/80 hover:shadow-primary/25 rounded-full bg-gradient-to-r px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all">
                  Gia nhập cộng đồng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-gradient-to-r mt-16 border-t from-transparent via-slate-700/50 to-transparent pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <p className="text-xs tracking-wider text-slate-500">
                © 2024 Cosmic Cultivation. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <span>Được thiết kế với</span>
                <span className="animate-pulse text-red-400">♥</span>
                <span>tại Việt Nam</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-qi-teal text-xs text-slate-500 transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="hover:text-qi-teal text-xs text-slate-500 transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-qi-teal text-xs text-slate-500 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
