import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
            <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Cosmic Cultivation</h1>
            <p className="text-lg text-slate-400 mb-8 text-center max-w-2xl">
                Khám phá thế giới truyện tranh và tiểu thuyết phong phú với hàng ngàn tác phẩm hấp dẫn.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/truyen"
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-colors"
                >
                    Khám phá ngay
                </Link>
            </div>
        </div>
    );
}
