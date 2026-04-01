export type ReadingProgress = {
  /** comic slug */
  slug: string;
  /** chapter id (the `[chapter]` param in /doc/[slug]/[chapter]) */
  chapter: string;
  /** vertical scroll position in px */
  scrollY: number;
  /** ms timestamp */
  updatedAt: number;
  /** Optional comic title for display */
  comicTitle?: string;
  /** Optional chapter name/label for display (e.g. "Chương 12") */
  chapterName?: string;
};

const KEY_PREFIX = 'readingProgress:v1:';

export function readingProgressKey(slug: string) {
  return `${KEY_PREFIX}${slug}`;
}

const progressCache = new Map<string, { raw: string | null; value: ReadingProgress | null }>();

export function safeReadProgress(slug: string): ReadingProgress | null {
  if (typeof window === 'undefined') return null;
  const key = readingProgressKey(slug);
  const raw = window.localStorage.getItem(key);

  const cached = progressCache.get(slug);
  if (cached && cached.raw === raw) {
    return cached.value;
  }

  try {
    if (!raw) {
      progressCache.set(slug, { raw, value: null });
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<ReadingProgress> | null;
    if (
      !parsed ||
      parsed.slug !== slug ||
      typeof parsed.chapter !== 'string' ||
      typeof parsed.scrollY !== 'number' ||
      typeof parsed.updatedAt !== 'number'
    ) {
      progressCache.set(slug, { raw, value: null });
      return null;
    }
    const value = parsed as ReadingProgress;
    progressCache.set(slug, { raw, value });
    return value;
  } catch {
    progressCache.set(slug, { raw, value: null });
    return null;
  }
}

export function safeWriteProgress(progress: ReadingProgress) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(readingProgressKey(progress.slug), JSON.stringify(progress));
    // trigger updates within same tab as well
    window.dispatchEvent(new CustomEvent('reading-progress', { detail: { slug: progress.slug } }));
  } catch {
    // ignore quota / privacy mode
  }
}

export function snapshotAllProgress(): ReadingProgress[] {
  if (typeof window === 'undefined') return [];
  const result: ReadingProgress[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(KEY_PREFIX)) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as Partial<ReadingProgress> | null;
      if (!parsed || typeof parsed.slug !== 'string') continue;
      if (typeof parsed.chapter !== 'string' || typeof parsed.scrollY !== 'number') continue;
      if (typeof parsed.updatedAt !== 'number') continue;
      result.push(parsed as ReadingProgress);
    }
  } catch {
    return [];
  }
  return result;
}

export function subscribeReadingProgress(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (e: Event) => {
    if (e instanceof CustomEvent) {
      if (!e.detail || typeof e.detail !== 'object') {
        onStoreChange();
        return;
      }
    }
    onStoreChange();
  };

  window.addEventListener('storage', handler);
  window.addEventListener('reading-progress', handler as EventListener);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('reading-progress', handler as EventListener);
  };
}


