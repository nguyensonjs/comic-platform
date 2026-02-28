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
  /** Badge border + bg + text classes for light and dark (default: amber, theme-aware) */
  badgeColor?: string;
  /** Main heading — can include styled <span> for gradient effect */
  title: ReactNode;
  /** Optional subtitle below the heading */
  subtitle?: string;
  /** Extra class on the wrapper div */
  className?: string;
}

const defaultBadgeColor =
  'border-amber-500/50 bg-amber-100/90 text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300';

export function PageHeader({
  badge,
  badgeIcon,
  badgeColor = defaultBadgeColor,
  title,
  subtitle,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`mb-6 text-center sm:mb-8 md:mb-10 px-2 sm:px-0 ${className}`}>
      {/* Badge pill */}
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm ${badgeColor}`}
      >
        {badgeIcon}
        {badge}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-black text-foreground sm:text-3xl md:text-4xl lg:text-5xl">{title}</h1>

      {/* Subtitle */}
      {subtitle && <p className="mt-2 text-sm text-slate-600 dark:text-slate-500 sm:mt-3">{subtitle}</p>}
    </div>
  );
}
