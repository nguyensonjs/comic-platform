# Quy Tắc Phát Triển — Cosmic Cultivation

> Đọc file này trước khi viết bất kỳ code nào trong repo. Mọi thành viên và AI đều phải tuân theo.

---

## 1. Theme & Thiết Kế

### Màu sắc
| Vai trò | Màu | Class ví dụ |
|---------|-----|-------------|
| Background trang | Dark cosmic | `bg-slate-950`, `from-#0d1b3e to-#030710` |
| Text chính | Slate trắng | `text-slate-200`, `text-white` |
| Text phụ | Slate mờ | `text-slate-500`, `text-slate-400` |
| Accent vàng (linh thạch, top 1) | Amber | `text-amber-300`, `border-amber-600/50` |
| Accent tím (cảnh giới, đan dược) | Purple/Violet | `text-purple-400` |
| Accent xanh (rank, nhiệm vụ) | Blue/Cyan | `text-blue-300`, `text-cyan-400` |
| Nguy hiểm / Khóa | Red/Slate | `text-red-400`, `text-slate-600` |

### Hiệu ứng bắt buộc
- **Glassmorphism**: mọi card đều dùng `backdrop-blur-sm` + `bg-slate-950/80`
- **Glow**: các phần tử quan trọng có `shadow-[0_0_Npx_rgba(...)]` hoặc `blur-[Npx]` ambient
- **Hover animation**: `transition-all hover:-translate-y-0.5` hoặc `hover:scale-105` cho card/button
- **Gradient text**: tiêu đề quan trọng dùng `bg-gradient-to-r ... bg-clip-text text-transparent`
- **Animate pulse**: avatar glow, spark particles dùng `animate-pulse`

### Border radius
- Card lớn: `rounded-2xl` hoặc `rounded-3xl`
- Button, badge nhỏ: `rounded-xl`, `rounded-full`

---

## 2. Quy Tắc Đặt Route (URL)

> **Nguyên tắc bất biến: KHÔNG được trộn lẫn tiếng Việt và tiếng Anh trong cùng một route.**

### Chọn một trong hai phong cách — áp dụng nhất quán cho toàn dự án:

| Phong cách | Mô tả | Ví dụ ✅ |
|-----------|--------|---------|
| **Full Việt** (không dấu) | Toàn bộ URL là tiếng Việt không dấu, kebab-case | `/nhan-vat`, `/diem-danh`, `/nhiem-vu`, `/hang-trang` |
| **Full Anh** | Toàn bộ URL là tiếng Anh, kebab-case | `/character`, `/check-in`, `/quests`, `/inventory` |

### ❌ Sai — trộn lẫn:
```
/nhan-vat-profile   ← Việt + Anh
/character-nhan-vat ← Anh + Việt
/shop-cua-hang      ← Anh + Việt
```

### ✅ Đúng:
```
# Nếu chọn Full Việt:
/nhan-vat   /diem-danh   /nhiem-vu   /hang-trang   /xep-hang   /cua-hang

# Nếu chọn Full Anh:
/character  /check-in    /quests     /inventory    /leaderboard  /shop
```

> ⚠️ **Dự án hiện tại** đang dùng **Full Việt** cho các trang game (`/nhan-vat`, `/diem-danh`, `/nhiem-vu`) và **giữ nguyên** `/shop`, `/leaderboard`, `/profile` vì đã push git. Trang mới tạo từ đây → **ưu tiên Full Việt**.

---

## 3. Cấu Trúc File

```
app/
├── components/
│   ├── layout/         # Header, Footer (toàn layout)
│   ├── ui/             # Component dùng chung, tái sử dụng ← LUÔN ĐẶT Ở ĐÂY
│   └── reader/         # Component đặc thù cho reader
├── [page]/
│   ├── page.tsx        # Server/Client component cho route đó
│   └── loading.tsx     # Skeleton loader (nếu có async)
└── ...
```

### Quy tắc đặt file
- **Mới tạo component dùng >1 nơi** → `app/components/ui/TênComponent.tsx`
- **Component chỉ dùng 1 page** → để inline hoặc file riêng trong folder của page đó
- **Export**: luôn export qua `app/components/ui/index.ts`

---

## 3. Components Có Sẵn (`app/components/ui`)

Import từ barrel:
```tsx
import { PageBackground, PageHeader, StatCard, RarityBadge } from '@/app/components/ui';
```

| Component | Props chính | Dùng cho |
|-----------|------------|---------|
| `PageBackground` | `sparks`, `topGlow`, `rightGlow`, `bottomGlow` | Wrapper toàn trang (gradient + glow orbs) |
| `PageHeader` | `badge`, `badgeIcon`, `title`, `subtitle`, `badgeColor` | Heading khu vực đầu trang |
| `StatCard` | `value`, `label`, `color`, `border`, `bg`, `icon` | Ô thống kê (có / không có icon) |
| `RarityBadge` | `rarity`, `size` | Badge độ hiếm vật phẩm |

> **Trước khi tạo component mới**, kiểm tra list trên — nếu đã có, hãy mở rộng props thay vì tạo trùng.

---

## 4. Icons

**Chỉ dùng `lucide-react`** — không dùng Material Icons, Heroicons, hay Font Awesome.

```tsx
import { Crown, Sparkles, Zap, Flame } from 'lucide-react';
```

---

## 5. State Management

- **State UI đơn giản** (toggle, tabs, form input) → `useState` trong component
- **Không dùng Redux/Zustand** cho prototype/demo — chỉ thêm khi cần cross-page state thật sự
- Trang không cần interactivity → **Server Component** (không có `'use client'`)

---

## 6. Dữ Liệu

- Dữ liệu demo/mock → đặt ở đầu file `page.tsx` dưới comment `/* ─── Data ─── */`
- Khi kết nối API thật → tách ra `lib/api/` hoặc `services/`

---

## 7. Xianxia Domain Language

Các thuật ngữ cụ thể của domain:

| Thuật ngữ | Ý nghĩa |
|-----------|---------|
| Linh thạch | Tiền tệ trong game |
| Tu vi / Cảnh giới | Level / Rank của người dùng |
| Đan dược | Consumable item (tăng linh lực) |
| Linh lực | Điểm sức mạnh (power score) |
| Hành trang | Inventory |
| Danh hiệu | Title / Epithet |
| Thiên kiếp | Difficulty threshold / boss event |

---

## 8. Naming Convention

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Component | PascalCase | `StatCard`, `PageHeader` |
| File component | PascalCase `.tsx` | `StatCard.tsx` |
| Route folder | kebab-case | `diem-danh/`, `nhiem-vu/` |
| Constant/data | camelCase | `nearbyRanks`, `inventory` |
| Type/interface | PascalCase | `QuestStatus`, `PageHeaderProps` |
| CSS class | Tailwind utility | — |

---

## 9. Checklist Trước Khi Commit

- [ ] Component dùng lại → đã vào `app/components/ui/`
- [ ] Trang mới → có link trên Header (desktop dropdown + mobile drawer)
- [ ] Không có `console.log` debug vô nghĩa
- [ ] `'use client'` chỉ khi thật sự cần `useState`/`useEffect`
- [ ] Ảnh/icon placeholder → dùng emoji hoặc gradient div, không để `<img src="">` trống
