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

export function StatCard({
  icon,
  value,
  label,
  color = 'text-slate-200',
  border = 'border-slate-800/50',
  bg = 'bg-slate-900/30',
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border px-5 py-5 text-center ${border} ${bg} ${className}`}
    >
      {icon ? (
        /* Layout with icon box */
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${color}`}>
            {icon}
          </div>
          <div className="text-left">
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-slate-600">{label}</div>
          </div>
        </div>
      ) : (
        /* Centered layout without icon */
        <>
          <div className={`text-3xl font-black ${color}`}>{value}</div>
          <div className="mt-1 text-xs text-slate-500">{label}</div>
        </>
      )}
    </div>
  );
}
