import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <StaticInfoPage
      title="Trung tâm trợ giúp"
      lead="Câu hỏi thường gặp và hướng dẫn nhanh khi dùng NetComic."
    >
      <section>
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">Đọc truyện</h2>
        <p className="mt-2">
          Chọn truyện từ{' '}
          <Link href="/danh-sach" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Danh sách
          </Link>
          ,{' '}
          <Link href="/the-loai" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Thể loại
          </Link>{' '}
          hoặc{' '}
          <Link href="/tim-kiem" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Tìm kiếm
          </Link>
          . Vào trang truyện rồi chọn chương để đọc.
        </p>
      </section>
      <section>
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">Tài khoản</h2>
        <p className="mt-2">
          Đăng nhập để lưu{' '}
          <Link href="/thu-vien" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Thư viện
          </Link>
          ,{' '}
          <Link href="/yeu-thich" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Yêu thích
          </Link>{' '}
          và mở{' '}
          <Link href="/ca-nhan" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
            Trang cá nhân
          </Link>
          .
        </p>
      </section>
      <p className="text-zinc-500 dark:text-slate-500">
        Cần hỗ trợ thêm?{' '}
        <Link href="/contact" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
          Liên hệ
        </Link>
        .
      </p>
    </StaticInfoPage>
  );
}
