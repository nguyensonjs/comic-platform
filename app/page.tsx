import {
  Compass,
  TrendingUp,
  BookOpen,
  Zap,
  HeartHandshake,
  Swords,
  Heart,
  Wand2,
  Skull,
  Laugh,
  GraduationCap,
} from 'lucide-react';

const features = [
  {
    Icon: BookOpen,
    title: 'Kho tàng phong phú',
    desc: 'Hàng ngàn tác phẩm từ khắp nơi trên thế giới, được cập nhật liên tục mỗi ngày.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/50',
  },
  {
    Icon: Zap,
    title: 'Tốc độ cực nhanh',
    desc: 'Tải trang siêu nhanh, không cần chờ đợi. Trải nghiệm đọc mượt mà tuyệt đối.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'hover:border-yellow-500/50',
  },
  {
    Icon: HeartHandshake,
    title: 'Hoàn toàn miễn phí',
    desc: 'Tất cả truyện đều có thể đọc miễn phí, không quảng cáo gây phiền nhiễu.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'hover:border-pink-500/50',
  },
];

const categories = [
  { Icon: Swords, name: 'Hành động', color: 'text-orange-400', bg: 'bg-orange-500/10', href: '/truyen/action' },
  { Icon: Heart, name: 'Lãng mạn', color: 'text-pink-400', bg: 'bg-pink-500/10', href: '/truyen/romance' },
  { Icon: Wand2, name: 'Huyền huyễn', color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/truyen/fantasy' },
  { Icon: Skull, name: 'Kinh dị', color: 'text-red-400', bg: 'bg-red-500/10', href: '/truyen/horror' },
  { Icon: Laugh, name: 'Hài hước', color: 'text-yellow-400', bg: 'bg-yellow-500/10', href: '/truyen/comedy' },
  { Icon: GraduationCap, name: 'Học đường', color: 'text-blue-400', bg: 'bg-blue-500/10', href: '/truyen/school' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-48 w-48 rounded-full bg-purple-600/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
            Hơn 12,000+ bộ truyện cập nhật mỗi ngày
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
            <span className="text-white">Khám phá thế giới</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              truyện tranh vô tận
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            Hàng ngàn tác phẩm manga, manhwa, webtoon và tiểu thuyết đang chờ đón bạn.
            Bắt đầu hành trình khám phá ngay hôm nay!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5">
              <Compass className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
              Khám phá ngay
            </button>
            <button className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-8 py-3.5 font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800 hover:-translate-y-0.5">
              <TrendingUp className="h-5 w-5 text-slate-400" />
              Xem thịnh hành
            </button>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              Trải nghiệm đọc truyện tuyệt vời với nhiều tính năng độc đáo được thiết kế riêng cho bạn
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map(({ Icon, title, desc, color, bg, border }) => (
              <div
                key={title}
                className={`group rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:shadow-xl ${border}`}
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black text-white md:text-4xl">
              Thể loại phổ biến
            </h2>
            <p className="text-slate-400">Chọn thể loại yêu thích của bạn</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ Icon, name, color, bg, href }) => (
              <a
                key={name}
                href={href}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <span className="text-sm font-bold text-slate-200 transition-colors group-hover:text-white">
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
