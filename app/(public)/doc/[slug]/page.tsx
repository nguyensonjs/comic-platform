import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  List,
  Settings2,
  Sun,
  ZoomIn,
  ZoomOut,
  BookOpen,
} from 'lucide-react';

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const gradients = [
  'from-slate-700 to-slate-800',
  'from-slate-800 to-slate-700',
  'from-slate-700 to-slate-900',
  'from-slate-800 to-slate-700',
];

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#111] pb-20">

      {/* Reader toolbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-xl">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link
            href="/truyen/1"
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </Link>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-white">Đấu La Đại Lục</p>
            <p className="text-xs text-slate-400">Chapter 398 · Cuộc chiến cuối cùng</p>
          </div>
        </div>

        {/* Center: chapter nav */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 transition-all hover:bg-slate-700 disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Ch.397</span>
          </button>
          <select className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-white focus:outline-none">
            <option>Chapter 398</option>
            <option>Chapter 397</option>
            <option>Chapter 396</option>
          </select>
          <button className="flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-sm text-white transition-all hover:bg-blue-500">
            <span className="hidden sm:inline">Ch.399</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right: tools */}
        <div className="flex items-center gap-2">
          <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
            <Sun className="h-4 w-4" />
          </button>
          <button className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reading area */}
      <div className="mx-auto max-w-2xl px-2 py-6">
        <div className="space-y-1">
          {pages.map((page, i) => (
            <div key={page} className="relative">
              {/* Mock manga page */}
              <div
                className={`w-full bg-gradient-to-b ${gradients[i % gradients.length]} flex items-center justify-center overflow-hidden`}
                style={{ aspectRatio: '700/1000', minHeight: '300px' }}
              >
                {/* Fake manga panel grid */}
                <div className="absolute inset-3 grid grid-cols-2 grid-rows-3 gap-1 opacity-30">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="rounded bg-slate-600/40" />
                  ))}
                </div>
                {/* Page number indicator */}
                <div className="relative flex flex-col items-center gap-2 text-slate-500">
                  <BookOpen className="h-8 w-8" />
                  <span className="text-sm">Trang {page}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End of chapter */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="mb-2 text-xl font-black text-white">Hết Chapter 398!</h3>
          <p className="mb-6 text-slate-400">Chapter tiếp theo dự kiến cập nhật vào thứ 6</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-slate-200 transition-all hover:bg-slate-700">
              <ChevronLeft className="h-4 w-4" />
              Chapter trước
            </button>
            <Link
              href="/truyen/1"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-200 transition-all hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              Về trang truyện
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Trang 1/{pages.length}</span>
            <span>Chapter 398</span>
          </div>
          <div className="h-1 rounded-full bg-slate-800">
            <div className="h-full w-[5%] rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
