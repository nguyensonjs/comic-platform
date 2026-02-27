/**
 * PageBackground
 * Shared dark cosmic background with radial gradient + ambient glow orbs + floating sparks.
 * Used on every xianxia-themed page to keep the look consistent.
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
  /** Accent glow color class for the top-left orb (default: 'bg-purple-900/20') */
  topGlow?: string;
  /** Accent glow color class for the top-right orb (default: 'bg-amber-800/10') */
  rightGlow?: string;
  /** Accent glow color class for the bottom-left orb (default: 'bg-blue-900/20') */
  bottomGlow?: string;
}

export function PageBackground({
  children,
  sparks = 8,
  topGlow = 'bg-purple-900/20',
  rightGlow = 'bg-amber-800/10',
  bottomGlow = 'bg-blue-900/20',
}: PageBackgroundProps) {
  return (
    <div
      className="relative min-h-screen pb-24 pt-24"
      style={{
        background:
          'radial-gradient(ellipse at top, #0d1b3e 0%, #050b18 60%, #030710 100%)',
      }}
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
            className="absolute h-1 w-1 animate-pulse rounded-full bg-amber-300/30"
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
