/**
 * StatCard
 * A single stat tile: icon + large numeric value + label.
 * Used in the stats grid rows on profile, leaderboard, quest, and check-in pages.
 *
 * Usage:
 *   <StatCard value="3/12" label="Đã hoàn thành" color="text-green-400" border="border-green-800/30" bg="bg-green-900/10" />
 *   <StatCard value="💎 900" label="Linh thạch" color="text-amber-300" border="border-amber-800/30" bg="bg-amber-900/10" />
 *   <StatCard icon={<Trophy className="h-4 w-4" />} value="23" label="Hoàn thành" color="text-yellow-400" ... />
 */

import { ReactNode } from 'react';

interface StatCardProps {
  /** Optional Lucide icon element. When provided, shown in a square icon box. */
  icon?: ReactNode;
  /** The main displayed value — can include an emoji prefix */
  value: ReactNode;
  /** Small label below the value */
  label: string;
  /** Tailwind text color for the value (e.g. 'text-green-400') */
  color?: string;
  /** Tailwind border class (e.g. 'border-green-800/30') */
  border?: string;
  /** Tailwind background class (e.g. 'bg-green-900/10') */
  bg?: string;
  /** Extra classes on the root element */
  className?: string;
}

const defaultColor = 'text-slate-800 dark:text-slate-200';
const defaultBorder = 'border-zinc-200 dark:border-zinc-700';
const defaultBg = 'bg-white/85 dark:bg-zinc-900/55';

export function StatCard({
  icon,
  value,
  label,
  color = defaultColor,
  border = defaultBorder,
  bg = defaultBg,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border px-3 py-3 text-center shadow-sm shadow-zinc-950/5 backdrop-blur-sm transition-colors duration-300 sm:rounded-2xl sm:px-5 sm:py-5 dark:shadow-black/20 ${border} ${bg} ${className}`}
    >
      {icon ? (
        /* Layout with icon box */
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950/5 dark:bg-white/5 sm:h-10 sm:w-10 sm:rounded-xl ${color}`}>
            {icon}
          </div>
          <div className="min-w-0 text-left">
            <div className={`text-lg font-black sm:text-2xl ${color}`}>{value}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-500 sm:text-xs">{label}</div>
          </div>
        </div>
      ) : (
        /* Centered layout without icon */
        <>
          <div className={`text-2xl font-black sm:text-3xl ${color}`}>{value}</div>
          <div className="mt-0.5 text-[10px] text-zinc-600 dark:text-zinc-500 sm:mt-1 sm:text-xs">{label}</div>
        </>
      )}
    </div>
  );
}
