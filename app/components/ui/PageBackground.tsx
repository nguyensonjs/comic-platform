/**
 * PageBackground
 * Shared cosmic background with radial gradient + ambient glow orbs + floating sparks.
 * Supports light/dark theme: light = soft gradient, dark = cosmic gradient.
 *
 * Usage:
 *   <PageBackground>
 *     <YourPageContent />
 *   </PageBackground>
 */

interface PageBackgroundProps {
  children: React.ReactNode;
  /** Override the number of floating spark particles (default 8) */
  sparks?: number;
  /** Accent glow color class for the top-left orb (default: dark purple, light purple/20) */
  topGlow?: string;
  /** Accent glow color class for the top-right orb */
  rightGlow?: string;
  /** Accent glow color class for the bottom-left orb */
  bottomGlow?: string;
}

const defaultTopGlow = 'bg-purple-400/15 dark:bg-purple-900/20';
const defaultRightGlow = 'bg-amber-500/10 dark:bg-amber-800/10';
const defaultBottomGlow = 'bg-blue-400/15 dark:bg-blue-900/20';

export function PageBackground({
  children,
  sparks = 8,
  topGlow = defaultTopGlow,
  rightGlow = defaultRightGlow,
  bottomGlow = defaultBottomGlow,
}: PageBackgroundProps) {
  return (
    <div
      className="relative min-h-screen pb-20 pt-20 transition-[background] duration-300 sm:pb-24 sm:pt-24"
      style={{ background: 'var(--page-bg-gradient)' }}
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full blur-[120px] ${topGlow}`} />
        <div className={`absolute top-1/3 right-0 h-96 w-96 rounded-full blur-[100px] ${rightGlow}`} />
        <div className={`absolute bottom-0 left-0 h-80 w-80 rounded-full blur-[100px] ${bottomGlow}`} />

        {/* Floating spark particles */}
        {Array.from({ length: sparks }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-500/25 dark:bg-amber-300/30"
            style={{
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
