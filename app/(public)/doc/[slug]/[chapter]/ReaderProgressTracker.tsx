'use client';

import { useEffect, useMemo, useRef } from 'react';
import { safeReadProgress, safeWriteProgress } from '@/app/components/reading/readingProgress';

type Props = {
  slug: string;
  chapter: string;
  comicTitle: string;
  chapterName: string;
};

export default function ReaderProgressTracker({ slug, chapter, comicTitle, chapterName }: Props) {
  const restoreDoneRef = useRef(false);
  const lastSavedRef = useRef<{ scrollY: number; t: number } | null>(null);
  const progressAtMount = useMemo(() => safeReadProgress(slug), [slug]);

  // Restore scroll position once, if the saved progress matches this chapter.
  useEffect(() => {
    if (restoreDoneRef.current) return;
    restoreDoneRef.current = true;

    if (!progressAtMount) return;
    if (progressAtMount.chapter !== chapter) return;

    const y = Math.max(0, Math.floor(progressAtMount.scrollY || 0));
    if (y <= 0) return;

    // Allow images/layout to start painting before scrolling.
    const id = window.setTimeout(() => {
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    }, 50);
    return () => window.clearTimeout(id);
  }, [chapter, comicTitle, chapterName, progressAtMount]);

  // Persist progress as user scrolls.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const scrollY = Math.max(0, Math.floor(window.scrollY || 0));
        const now = Date.now();

        const last = lastSavedRef.current;
        // Avoid spamming localStorage (save if moved >= 40px or 2s elapsed)
        if (last && Math.abs(scrollY - last.scrollY) < 40 && now - last.t < 2000) return;

        lastSavedRef.current = { scrollY, t: now };
        safeWriteProgress({ slug, chapter, scrollY, updatedAt: now, comicTitle, chapterName });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Save once right away (e.g. scrollY=0)
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [slug, chapter, comicTitle, chapterName]);

  return null;
}

