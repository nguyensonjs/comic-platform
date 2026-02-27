/**
 * PageHeader
 * Badge-pill + gradient title + optional subtitle.
 * Used at the top of every xianxia-themed page.
 *
 * Usage:
 *   <PageHeader
 *     badge="Thiên Địa Huyền Hoàng"
 *     badgeIcon={<Sparkles className="h-4 w-4" />}
 *     title={<>Bảng Xếp Hạng <span className="...">Tu Vi</span></>}
 *     subtitle="Top 20 tu sĩ mạnh nhất thiên hạ"
 *   />
 */

import { ReactNode } from 'react';

interface PageHeaderProps {
  /** Small pill badge above the title */
  badge: string;
  /** Optional icon to show inside the badge (Lucide element) */
  badgeIcon?: ReactNode;
  /** Badge border + bg color classes (default: amber) */
  badgeColor?: string;
  /** Main heading — can include styled <span> for gradient effect */
  title: ReactNode;
  /** Optional subtitle below the heading */
  subtitle?: string;
  /** Extra class on the wrapper div */
  className?: string;
}

export function PageHeader({
  badge,
  badgeIcon,
  badgeColor = 'border-amber-700/40 bg-amber-900/20 text-amber-300',
  title,
  subtitle,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      {/* Badge pill */}
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold backdrop-blur-sm ${badgeColor}`}
      >
        {badgeIcon}
        {badge}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-black text-white md:text-5xl">{title}</h1>

      {/* Subtitle */}
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  );
}
