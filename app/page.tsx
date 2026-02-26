export default function Home() {
  return (
    <div className="cosmic-gradient">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h1 className="text-4xl leading-tight font-bold md:text-6xl">
              Khám phá thế giới
              <br />
              <span className="text-primary italic">truyện tranh vô tận</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Hàng ngàn tác phẩm manga, manhwa, webtoon và tiểu thuyết đang chờ đón bạn. Bắt đầu
              hành trình khám phá ngay hôm nay!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary hover:bg-primary/80 hero-glow flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all">
                <span className="material-symbols-outlined">explore</span>
                Khám phá ngay
              </button>
              <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                Xem thịnh hành
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Tại sao chọn chúng tôi?</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Trải nghiệm đọc truyện tuyệt vời với nhiều tính năng độc đáo
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-star-blue/30 hover:border-primary/50 rounded-xl border border-slate-800/50 p-6 text-center transition-all">
              <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-primary text-2xl">
                  library_books
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Kho tàng phong phú</h3>
              <p className="text-slate-400">
                Hàng ngàn tác phẩm từ khắp nơi trên thế giới, được cập nhật liên tục
              </p>
            </div>

            <div className="bg-star-blue/30 hover:border-primary/50 rounded-xl border border-slate-800/50 p-6 text-center transition-all">
              <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-primary text-2xl">speed</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Tốc độ cực nhanh</h3>
              <p className="text-slate-400">
                Tải trang siêu nhanh, không cần chờ đợi, trải nghiệm mượt mà
              </p>
            </div>

            <div className="bg-star-blue/30 hover:border-primary/50 rounded-xl border border-slate-800/50 p-6 text-center transition-all">
              <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Hoàn toàn miễn phí</h3>
              <p className="text-slate-400">
                Tất cả truyện đều có thể đọc miễn phí, không quảng cáo phiền nhiễu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Thể loại phổ biến</h2>
            <p className="text-slate-400">Chọn thể loại yêu thích của bạn</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[
              { icon: 'swords', name: 'Hành động', color: 'qi-teal' },
              { icon: 'favorite', name: 'Lãng mạn', color: 'pink-400' },
              { icon: 'auto_fix_high', name: 'Huyền huyễn', color: 'purple-400' },
              { icon: 'sports_martial_arts', name: 'Võ thuật', color: 'orange-400' },
              { icon: 'school', name: 'Học đường', color: 'blue-400' },
              { icon: 'psychology', name: 'Kinh dị', color: 'red-400' },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-star-blue/40 hover:border-primary/50 group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-800/50 p-6 text-center transition-all"
              >
                <span
                  className={`material-symbols-outlined mb-2 text-3xl text-${category.color} transition-transform group-hover:scale-110`}
                >
                  {category.icon}
                </span>
                <span className="text-sm font-bold">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
