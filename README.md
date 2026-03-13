## NetComic – Comic Platform

NetComic là nền tảng đọc truyện tranh (manga / manhwa / webtoon) xây dựng bằng **Next.js 16 (App Router)** với giao diện tối ưu cho trải nghiệm đọc dài.

### Tính năng chính

- **Trang chủ & khám phá**: danh sách truyện, thể loại, xếp hạng, nhiệm vụ, cửa hàng, vòng quay, nhân vật...
- **Chi tiết truyện**: thông tin truyện, tác giả, thể loại, danh sách chương, nút:
  - **Đọc từ đầu**
  - **Đọc chap mới nhất**
  - **Tiếp tục đọc** (dựa trên lịch sử đọc lưu `localStorage`)
- **Trình đọc truyện `/doc/[slug]/[chapter]`**:
  - Thanh điều hướng chương (trước / sau / về trang truyện)
  - Header gọn riêng cho trang đọc (không trùng với header trang chủ)
  - Lazy-load ảnh: 2 trang đầu ưu tiên, các trang sau `loading="lazy"`
  - **Lưu tiến độ đọc**: tự động lưu chap + vị trí scroll vào `localStorage`
  - Khi mở lại chap đã đọc, tự **scroll về đúng vị trí**.
- **Trang cá nhân `/ca-nhan`**:
  - Thống kê tu vi, tài phú, tông môn (UI demo)
  - **Khối “Đọc gần đây”** đọc từ `localStorage` để hiển thị các truyện/chapter bạn đã đọc.

### Cấu trúc chính

- `app/layout.tsx`: layout gốc, `Header`, `Footer`, `ThemeProvider`, `AuthProvider`.
- `app/components/layout/Header.tsx`: header chung, có chế độ **compact** cho `/truyen/*` và `/doc/*`.
- `app/truyen/[slug]/page.tsx`: trang chi tiết truyện.
- `app/truyen/[slug]/ReadingActions.tsx`: nút **Tiếp tục đọc / Đọc từ đầu / Đọc chap mới nhất**.
- `app/(public)/doc/[slug]/[chapter]/page.tsx`: trang đọc chương.
- `app/(public)/doc/[slug]/[chapter]/ReaderProgressTracker.tsx`: client component lưu/khôi phục tiến độ đọc.
- `app/components/reading/readingProgress.ts`: helper làm việc với `localStorage` (đọc/ghi/snapshot lịch sử).
- `app/ca-nhan/page.tsx` + `app/ca-nhan/RecentReadsPanel.tsx`: trang cá nhân & danh sách đọc gần đây.

## Phát triển local

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Project đã được cấu hình sẵn script:

```bash
npm run deploy
```

Lệnh này gọi `vercel --prod` để build & deploy production. Hiện tại đang deploy tại:

- Production: `https://netcomic.vercel.app`

