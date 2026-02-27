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
  'Phổ thông': 'bg-slate-700   text-slate-300',
  'Hiếm':      'bg-blue-900    text-blue-300',
  'Sử thi':    'bg-purple-900  text-purple-300',
  'Thần thoại':'bg-amber-900   text-amber-300',
  'Tiền tệ':   'bg-yellow-900  text-yellow-300',
};

interface RarityBadgeProps {
  rarity: Rarity;
  /** 'sm' = text-[9px], 'md' = text-xs (default 'sm') */
  size?: 'sm' | 'md';
  className?: string;
}

export function RarityBadge({ rarity, size = 'sm', className = '' }: RarityBadgeProps) {
  const colors = rarityMap[rarity] ?? 'bg-slate-800 text-slate-400';
  const textSize = size === 'md' ? 'text-xs' : 'text-[9px]';

  return (
    <span
      className={`rounded-full px-2 py-0.5 font-bold ${textSize} ${colors} ${className}`}
    >
      {rarity}
    </span>
  );
}
