import Link from 'next/link';
import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';

export default function PrivacyPage() {
  return (
    <StaticInfoPage
      title="Chính sách bảo mật"
      lead="Bản tóm tắt minh họa. Khi vận hành thật, cần soạn thảo pháp lý đầy đủ theo quy định Việt Nam."
    >
      <p>
        NetComic cam kết bảo vệ thông tin cá nhân bạn cung cấp khi đăng ký và sử dụng dịch vụ. Dữ liệu chỉ dùng để vận
        hành tài khoản, cá nhân hóa trải nghiệm và cải thiện sản phẩm.
      </p>
      <p>
        Chúng tôi không bán dữ liệu cá nhân cho bên thứ ba. Cookie và lưu trữ cục bộ có thể dùng cho đăng nhập và tùy
        chọn giao diện.
      </p>
      <p className="text-zinc-500 dark:text-slate-500">
        Liên hệ: xem trang{' '}
        <Link href="/contact" className="text-blue-600 hover:underline dark:text-cyan-400">
          Liên hệ
        </Link>
        .
      </p>
    </StaticInfoPage>
  );
}
