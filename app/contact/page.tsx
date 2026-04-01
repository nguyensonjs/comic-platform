import { StaticInfoPage } from '@/app/components/layout/StaticInfoPage';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <StaticInfoPage
      title="Liên hệ"
      lead="Đội ngũ NetComic tiếp nhận phản hồi qua các kênh dưới đây (thông tin minh họa — thay bằng email / form thật khi triển khai)."
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="mailto:support@netcomic.example"
          className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-blue-500/40"
        >
          <Mail className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">Email</p>
            <p className="text-xs text-zinc-500 dark:text-slate-500">support@netcomic.example</p>
          </div>
        </a>
        <a
          href="/community"
          className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-blue-500/40"
        >
          <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">Cộng đồng</p>
            <p className="text-xs text-zinc-500 dark:text-slate-500">Tham gia thảo luận</p>
          </div>
        </a>
      </div>
    </StaticInfoPage>
  );
}
