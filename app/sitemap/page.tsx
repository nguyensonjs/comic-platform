import Link from 'next/link';
import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';

const main = [
  { href: '/', label: 'Trang chủ' },
  { href: '/danh-sach', label: 'Danh sách truyện' },
  { href: '/the-loai', label: 'Thể loại' },
  { href: '/tim-kiem', label: 'Tìm kiếm' },
  { href: '/thu-vien', label: 'Thư viện' },
  { href: '/yeu-thich', label: 'Yêu thích' },
  { href: '/xep-hang', label: 'Xếp hạng' },
  { href: '/diem-danh', label: 'Điểm danh' },
  { href: '/nhiem-vu', label: 'Nhiệm vụ' },
  { href: '/cua-hang', label: 'Cửa hàng' },
  { href: '/vong-quay', label: 'Vòng quay' },
  { href: '/nhan-vat', label: 'Nhân vật' },
  { href: '/ca-nhan', label: 'Cá nhân' },
  { href: '/login', label: 'Đăng nhập' },
  { href: '/register', label: 'Đăng ký' },
];

const legal = [
  { href: '/help', label: 'Trợ giúp' },
  { href: '/contact', label: 'Liên hệ' },
  { href: '/community', label: 'Cộng đồng' },
  { href: '/feedback', label: 'Góp ý' },
  { href: '/privacy', label: 'Bảo mật' },
  { href: '/terms', label: 'Điều khoản' },
  { href: '/settings', label: 'Cài đặt' },
  { href: '/profile/edit', label: 'Sửa hồ sơ' },
];

export default function SitemapPage() {
  return (
    <StaticInfoPage
      title="Sơ đồ trang"
      lead="Liên kết nhanh tới các mục chính của NetComic."
    >
      <div>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-slate-500">
          Ứng dụng
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {main.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-blue-600 hover:underline dark:text-cyan-400"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-slate-500">
          Hỗ trợ & tài khoản
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {legal.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-blue-600 hover:underline dark:text-cyan-400">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </StaticInfoPage>
  );
}
