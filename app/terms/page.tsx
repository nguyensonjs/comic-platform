import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';

export default function TermsPage() {
  return (
    <StaticInfoPage
      title="Điều khoản sử dụng"
      lead="Bản tóm tắt minh họa cho môi trường demo. Triển khai production cần văn bản pháp lý chi tiết."
    >
      <p>
        Khi truy cập NetComic, bạn đồng ý tuân thủ các quy tắc cộng đồng: không sao chép nội dung thương mại trái phép,
        không phát tán nội dung vi phạm pháp luật, tôn trọng bản quyền tác giả và nhóm dịch.
      </p>
      <p>
        Nội dung truyện do bên thứ ba cung cấp; NetComic không chịu trách nhiệm cho mọi tranh chấp bản quyền giữa các
        bên nhưng sẽ xử lý báo cáo hợp lệ theo quy trình nội bộ.
      </p>
    </StaticInfoPage>
  );
}
