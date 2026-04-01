'use client';

import { useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeOption = 'light' | 'dark' | 'system';

const options: Array<{
  value: ThemeOption;
  label: string;
  icon: typeof Sun;
}> = [
  { value: 'light', label: 'Sáng', icon: Sun },
  { value: 'dark', label: 'Tối', icon: Moon },
  { value: 'system', label: 'Hệ thống', icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const activeTheme = mounted ? ((theme as ThemeOption) ?? 'system') : 'system';
  const ActiveIcon =
    !mounted || activeTheme === 'system'
      ? Monitor
      : resolvedTheme === 'dark'
        ? Moon
        : Sun;

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center rounded-2xl border border-zinc-200/80 bg-white/80 p-1 text-zinc-600 shadow-lg shadow-zinc-950/5 backdrop-blur md:flex dark:border-zinc-700/70 dark:bg-zinc-900/75 dark:text-zinc-300 dark:shadow-black/20">
        {options.map(({ value, label, icon: Icon }) => {
          const isActive = activeTheme === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className="relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-xl px-3 text-sm font-medium transition-colors duration-200 hover:text-zinc-950 dark:hover:text-white"
              aria-pressed={isActive}
              aria-label={`Chuyển giao diện ${label.toLowerCase()}`}
            >
              {isActive && mounted ? (
                <motion.span
                  layoutId="theme-toggle-pill"
                  className="absolute inset-0 rounded-xl bg-zinc-950 text-white shadow-md shadow-zinc-950/15 dark:bg-gradient-to-r dark:from-sky-500/80 dark:via-blue-500/80 dark:to-indigo-500/80"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative z-10 inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          const sequence: ThemeOption[] = ['light', 'dark', 'system'];
          const currentIndex = sequence.indexOf(activeTheme);
          const nextTheme = sequence[(currentIndex + 1) % sequence.length];
          setTheme(nextTheme);
        }}
        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-lg shadow-zinc-950/5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:text-zinc-950 hover:shadow-xl hover:shadow-sky-500/10 md:hidden dark:border-zinc-700/70 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-sky-500/40 dark:hover:text-white dark:hover:shadow-sky-950/30"
        aria-label="Chuyển chế độ sáng, tối hoặc hệ thống"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${activeTheme}-${resolvedTheme ?? 'system'}`}
            initial={{ opacity: 0, rotate: -25, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 25, scale: 0.7 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute"
          >
            <ActiveIcon className="h-4 w-4" />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
