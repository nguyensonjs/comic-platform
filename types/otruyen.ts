/* ──────────────────────────────────────────────────────────────
 * OTruyen API Types
 * Base URL: https://otruyenapi.com/v1/api
 * CDN Image: https://img.otruyenapi.com/uploads/comics/<thumb_url>
 * ────────────────────────────────────────────────────────────── */

/* ── Shared primitives ─────────────────────────────────────── */

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ChapterLatest {
  /** Display name like "Tuyệt Thế Võ Thần [Chap 1122-1127]" */
  filename: string;
  /** Chapter number as string e.g. "1127" */
  chapter_name: string;
  chapter_title: string;
  /** Direct API URL for chapter content */
  chapter_api_data: string;
}

/** Status of the comic series */
export type ComicStatus = 'ongoing' | 'completed' | 'coming_soon';

/* ── Genre (from /the-loai) ─────────────────────────────────── */

export interface GenreItem {
  _id: string;
  slug: string;
  name: string;
}

export interface GenreListApiResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    items: GenreItem[];
  };
}

/* ── Comic item (returned in lists) ────────────────────────── */

export interface ComicItem {
  _id: string;
  name: string;
  slug: string;
  /** Array of alternate/original names */
  origin_name: string[];
  status: ComicStatus;
  /** Filename only — prepend APP_DOMAIN_CDN_IMAGE + "/uploads/comics/" */
  thumb_url: string;
  /** Whether it's a premium exclusive */
  sub_docquyen: boolean;
  category: Category[];
  updatedAt: string;
  chaptersLatest: ChapterLatest[] | null;
  /** Present in search results */
  author?: string[];
}

/* ── SEO On Page ────────────────────────────────────────────── */

export interface SeoOnPage {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  /** Array of image paths (relative to CDN) */
  og_image: string[];
  og_url?: string;
}

/* ── Pagination ─────────────────────────────────────────────── */

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

/* ── Params (filters used for the request) ──────────────────── */

export interface ApiParams {
  type_slug: string;
  slug?: string;
  keyword?: string;
  filterCategory: string[];
  sortField: string;
  sortType?: string;
  pagination: Pagination;
  itemsUpdateInDay?: number;
}

/* ── Shared data wrapper for list-like pages ────────────────── */

export interface ListData {
  seoOnPage: SeoOnPage;
  breadCrumb: { name: string; slug?: string; isCurrent?: boolean; position: number }[];
  titlePage?: string;
  items: ComicItem[];
  params: ApiParams;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface ListApiResponse {
  status: 'success' | 'error';
  message: string;
  data: ListData;
}

/* ── Genre detail (/the-loai/[slug]) ───────────────────────── */
export type GenreDetailApiResponse = ListApiResponse;

/* ── Search (/tim-kiem) ─────────────────────────────────────── */
export type SearchApiResponse = ListApiResponse;

/* ── Home API response ─────────────────────────────────────── */

export interface HomeData {
  seoOnPage: SeoOnPage;
  items: ComicItem[];
  params: ApiParams;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface HomeApiResponse {
  status: 'success' | 'error';
  message: string;
  data: HomeData;
}

/* ── Comic Detail (/truyen-tranh/[slug]) ────────────────────── */

export interface Chapter {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

export interface ServerData {
  server_name: string;
  server_data: Chapter[];
}

export interface ComicDetail extends Omit<ComicItem, 'chaptersLatest'> {
  content: string;
  author: string[];
  chieuDai?: boolean;
  chapters: ServerData[];
  view?: number;
}

export interface ComicDetailApiResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    seoOnPage: SeoOnPage;
    breadCrumb: { name: string; slug?: string; isCurrent?: boolean; position: number }[];
    params: { slug: string };
    item: ComicDetail;
    APP_DOMAIN_CDN_IMAGE: string;
  };
}

/* ── Helper ─────────────────────────────────────────────────── */

export const CDN_BASE = 'https://img.otruyenapi.com/uploads/comics';

/** Build the full thumbnail URL from a thumb_url filename */
export function thumbUrl(filename: string): string {
  return `${CDN_BASE}/${filename}`;
}

/** Map status code → Vietnamese label */
export function statusLabel(status: ComicStatus): string {
  switch (status) {
    case 'ongoing':      return 'Đang tiến hành';
    case 'completed':    return 'Hoàn thành';
    case 'coming_soon':  return 'Sắp ra mắt';
    default:             return status;
  }
}
