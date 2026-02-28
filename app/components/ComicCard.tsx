'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ComicItem } from '@/types/otruyen';
import { statusLabel } from '@/types/otruyen';

function StatusBadge({ status }: { status: ComicItem['status'] }) {
  const map = {
    ongoing: 'border-green-300 dark:border-green-700/50 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    completed: 'border-blue-300 dark:border-blue-700/50 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    coming_soon: 'border-amber-300 dark:border-amber-700/50 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  } as const;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${map[status] ?? map.ongoing}`}>
      {statusLabel(status)}
    </span>
  );
}

export interface ComicCardProps {
  comic: ComicItem;
  cdnBase: string;
  showCategory?: boolean;
  showAuthor?: boolean;
  showStatus?: boolean;
  showUpdatedAt?: boolean;
}

export function ComicCard({
  comic,
  cdnBase,
  showCategory = true,
  showAuthor = false,
  showStatus = true,
  showUpdatedAt = false,
}: ComicCardProps) {
  const imgUrl = `${cdnBase}/uploads/comics/${comic.thumb_url}`;
  const latestChapter = (comic.chaptersLatest || [])[0];

  return (
    <Link href={`/truyen/${comic.slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/50 transition-colors duration-300 hover:border-blue-300 dark:hover:border-slate-600/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-cyan-900/20"
        style={{
          willChange: 'transform',
          WebkitFontSmoothing: 'antialiased',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        {/* Thumbnail area */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {/* Framer motion wrapper for the image to prevent conflict with container transforms */}
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={imgUrl}
              alt={comic.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-slate-950/80 via-transparent to-transparent opacity-80" />

          {/* Status badge */}
          {showStatus && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
              <StatusBadge status={comic.status} />
            </div>
          )}

          {/* Latest chapter overlay */}
          {latestChapter && (
            <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2">
              <span className="flex items-center gap-1 rounded-lg bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300 backdrop-blur-sm sm:rounded-xl sm:px-2 sm:py-1 sm:text-[11px]">
                <Zap className="h-3 w-3" />
                Chap {latestChapter.chapter_name}
              </span>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="flex flex-1 flex-col gap-1 sm:gap-1.5 p-2 sm:p-3">
          <h3
            className="text-xs font-bold leading-tight text-slate-900 dark:text-slate-200 transition-colors group-hover:text-blue-600 dark:group-hover:text-white sm:text-sm"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {comic.name}
          </h3>

          {showAuthor && comic.author && comic.author.length > 0 && comic.author[0] && (
            <p className="text-[10px] text-slate-500 truncate sm:text-[11px]">{comic.author[0]}</p>
          )}

          {/* Categories */}
          {showCategory && comic.category && comic.category.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {comic.category.slice(0, 2).map((cat: any) => (
                <span
                  key={cat.id}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-slate-700/80 group-hover:text-blue-600 dark:group-hover:text-slate-300"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {showStatus && !comic.category && (
            <span className={`mt-0.5 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${comic.status === 'ongoing' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                comic.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
              }`}>
              {statusLabel(comic.status)}
            </span>
          )}

          {/* Updated time */}
          {showUpdatedAt && comic.updatedAt && (
            <div className="mt-auto pt-1.5 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-400 sm:pt-2 sm:text-[11px]">
              <Clock className="h-3 w-3" />
              {new Date(comic.updatedAt).toLocaleDateString('vi-VN')}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
