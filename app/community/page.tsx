import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <StaticInfoPage
      title="Cộng đồng"
      lead="Kết nối độc giả và chia sẻ truyện yêu thích. Trang này là bản xem trước — tích hợp forum / Discord sau."
    >
      <p>
        Bạn có thể bắt đầu từ{' '}
        <Link href="/feedback" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
          Góp ý
        </Link>{' '}
        hoặc{' '}
        <Link href="/help" className="font-medium text-blue-600 hover:underline dark:text-cyan-400">
          Trợ giúp
        </Link>
        .
      </p>
    </StaticInfoPage>
  );
}
