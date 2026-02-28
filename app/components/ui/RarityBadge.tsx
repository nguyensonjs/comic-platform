/**
 * RarityBadge
 * Small pill showing item rarity. Colors map automatically from the rarity string.
 * Used in the shop and profile inventory sections.
 *
 * Usage:
 *   <RarityBadge rarity="Thần thoại" />
 *   <RarityBadge rarity="Sử thi" size="md" />
 */

type Rarity = 'Phổ thông' | 'Hiếm' | 'Sử thi' | 'Thần thoại' | 'Tiền tệ' | string;

const rarityMap: Record<string, string> = {
  'Phổ thông': 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  'Hiếm': 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Sử thi': 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Thần thoại': 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  'Tiền tệ': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

interface RarityBadgeProps {
  rarity: Rarity;
  /** 'sm' = text-[9px], 'md' = text-xs (default 'sm') */
  size?: 'sm' | 'md';
  className?: string;
}

export function RarityBadge({ rarity, size = 'sm', className = '' }: RarityBadgeProps) {
  const colors = rarityMap[rarity] ?? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  const textSize = size === 'md' ? 'text-xs' : 'text-[9px]';

  return (
    <span
      className={`rounded-full px-2 py-0.5 font-bold ${textSize} ${colors} ${className}`}
    >
      {rarity}
    </span>
  );
}
