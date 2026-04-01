'use client';

import { useSyncExternalStore, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeOption = 'light' | 'dark' | 'system';

interface Option {
  value: ThemeOption;
  label: string;
  icon: typeof Sun;
  colorClass: string;
  bgClass: string;
  hoverBgStr: string;
  hoverTextStr: string;
}

const options: Option[] = [
  {
    value: 'light',
    label: 'Sáng',
    icon: Sun,
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-100 dark:bg-amber-900/40',
    hoverBgStr: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
    hoverTextStr: 'hover:text-amber-700 dark:hover:text-amber-400',
  },
  {
    value: 'dark',
    label: 'Tối',
    icon: Moon,
    colorClass: 'text-sky-600 dark:text-sky-400',
    bgClass: 'bg-sky-100 dark:bg-sky-900/40',
    hoverBgStr: 'hover:bg-sky-50 dark:hover:bg-sky-950/30',
    hoverTextStr: 'hover:text-sky-700 dark:hover:text-sky-400',
  },
  {
    value: 'system',
    label: 'Hệ thống',
    icon: Monitor,
    colorClass: 'text-slate-600 dark:text-slate-400',
    bgClass: 'bg-slate-100 dark:bg-slate-800/60',
    hoverBgStr: 'hover:bg-slate-50 dark:hover:bg-slate-800/40',
    hoverTextStr: 'hover:text-slate-700 dark:hover:text-slate-300',
  },
];

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Safe hydration check for Next.js
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const activeTheme = mounted ? ((theme as ThemeOption) ?? 'system') : 'system';

  const ActiveIcon =
    !mounted || activeTheme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Matches Header's iconBtnClass style */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 outline-none ${
          isOpen
            ? 'bg-zinc-100 text-blue-600 dark:bg-zinc-800/70 dark:text-cyan-300'
            : 'text-zinc-500 hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-cyan-300'
        }`}
        aria-label="Giao diện"
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.div
              key={activeTheme + (resolvedTheme ?? '')}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <ActiveIcon className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Menu - Matches Header's Khám phá dropdown panel layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 z-50 mt-1.5 w-48 origin-top-left rounded-2xl border border-zinc-200/80 bg-white/95 p-2 text-left shadow-xl shadow-zinc-950/10 backdrop-blur-xl md:right-0 md:left-auto md:origin-top-right dark:border-zinc-700/80 dark:bg-zinc-900/95 dark:shadow-black/40"
          >
            <div className="space-y-0.5">
              {options.map(
                ({ value, label, icon: Icon, colorClass, bgClass, hoverBgStr, hoverTextStr }) => {
                  const isActive = activeTheme === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setTheme(value);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? `${hoverBgStr} ${hoverTextStr} bg-zinc-50/50 font-medium dark:bg-zinc-800/50`
                          : `text-slate-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-zinc-800/50 dark:hover:text-white`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgClass}`}
                        >
                          <Icon className={`h-4 w-4 ${colorClass}`} />
                        </div>
                        <span className="truncate">{label}</span>
                      </div>

                      {isActive && <Check className={`h-4 w-4 ${colorClass}`} />}
                    </button>
                  );
                },
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
