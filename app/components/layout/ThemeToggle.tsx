'use client';

import { useSyncExternalStore, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeOption = 'light' | 'dark' | 'system';

interface Option {
  value: ThemeOption;
  label: string;
  hint: string;
  icon: typeof Sun;
  iconWrap: string;
  iconColor: string;
}

const options: Option[] = [
  {
    value: 'light',
    label: 'Sáng',
    hint: 'Nền sáng cố định',
    icon: Sun,
    iconWrap: 'bg-amber-100 dark:bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    value: 'dark',
    label: 'Tối',
    hint: 'Nền tối, dễ đọc đêm',
    icon: Moon,
    iconWrap: 'bg-sky-100 dark:bg-sky-500/15',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    value: 'system',
    label: 'Hệ thống',
    hint: 'Theo cài đặt thiết bị',
    icon: Monitor,
    iconWrap: 'bg-zinc-200 dark:bg-zinc-700/50',
    iconColor: 'text-zinc-600 dark:text-zinc-400',
  },
];

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const activeTheme = mounted ? ((theme as ThemeOption) ?? 'system') : 'system';

  const ActiveIcon =
    !mounted || activeTheme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Chọn chế độ giao diện"
        className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl outline-none ring-1 transition-all duration-200 ${
          isOpen
            ? 'bg-zinc-100 text-blue-600 ring-blue-400/35 shadow-[0_0_0_3px_rgba(59,130,246,0.12)] dark:bg-zinc-800/80 dark:text-cyan-300 dark:ring-cyan-400/25 dark:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]'
            : 'text-zinc-500 ring-zinc-200/90 hover:bg-zinc-100 hover:text-blue-600 hover:ring-zinc-300/80 dark:text-zinc-400 dark:ring-zinc-700/70 dark:hover:bg-zinc-800/70 dark:hover:text-cyan-300 dark:hover:ring-zinc-600/50'
        }`}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/[0.07] via-transparent to-cyan-500/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:from-cyan-400/10 dark:to-blue-500/10"
          aria-hidden
        />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 dark:bg-zinc-900/40">
          {!mounted ? (
            <Sun className="h-[1.15rem] w-[1.15rem] animate-pulse text-zinc-400 dark:text-zinc-500" />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTheme + (resolvedTheme ?? '')}
                initial={{ opacity: 0, scale: 0.72, rotate: -40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.72, rotate: 40 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                <ActiveIcon className="h-5 w-5" />
              </motion.div>
            </AnimatePresence>
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="Chế độ giao diện"
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 z-50 mt-2 w-[min(100vw-2rem,15.5rem)] origin-top-left rounded-2xl border border-zinc-200/90 bg-white/90 p-1.5 text-left shadow-xl shadow-zinc-950/[0.08] ring-1 ring-black/[0.03] backdrop-blur-xl md:right-0 md:left-auto md:origin-top-right dark:border-zinc-700/80 dark:bg-zinc-950/90 dark:shadow-black/50 dark:ring-white/[0.06]"
          >
            <div className="px-2.5 pb-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                Giao diện
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              {options.map(({ value, label, hint, icon: Icon, iconWrap, iconColor }) => {
                const isActive = activeTheme === value;

                return (
                  <button
                    key={value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => {
                      setTheme(value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors ${
                      isActive
                        ? 'bg-blue-50/90 font-medium text-zinc-900 ring-1 ring-blue-200/70 dark:bg-blue-950/35 dark:text-white dark:ring-blue-500/25'
                        : 'text-zinc-600 hover:bg-zinc-100/90 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
                    >
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-tight">{label}</div>
                      <div className="mt-0.5 text-[11px] leading-snug text-zinc-400 dark:text-zinc-500">
                        {hint}
                      </div>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                      {isActive ? (
                        <Check className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
