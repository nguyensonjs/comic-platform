## Hướng dẫn cho Agent: Commit, Push, Deploy NetComic

File này dùng để mọi Agent (hoặc dev mới) làm đúng quy trình mỗi khi chỉnh code.

### 1. Kiểm tra & chạy lint

1. Xem thay đổi hiện tại:

```bash
git status
git diff
```

2. Chạy lint (ưu tiên chỉ vào file đã sửa nếu scope nhỏ):

```bash
npm run lint
```

Nếu có lỗi mới do mình tạo ra thì sửa trước khi commit. Cảnh báo cũ có thể giữ nguyên trừ khi sửa dễ.

### 2. Commit

1. Stage đúng file:

```bash
git add <các-file-đã-sửa>
```

2. Commit với message ngắn gọn, dạng:

- `feat: ...` – thêm tính năng
- `fix: ...` – sửa bug
- `chore: ...` – dọn dẹp, cấu hình
- `docs: ...` – tài liệu

Ví dụ:

```bash
git commit -m "feat: add reading progress and compact reader header"
```

### 3. Push lên remote

Giả sử đang trên nhánh `main` và remote là `origin`:

```bash
git push origin main
```

Nếu push lần đầu trên nhánh mới:

```bash
git push -u origin <branch-name>
```

### 4. Deploy production lên Vercel

Sau khi push xong và mọi thứ ổn, chạy:

```bash
npm run deploy
```

Script này thực hiện:

- Gọi `vercel --prod`
- Build dự án bằng `next build` trên hạ tầng Vercel
- Deploy ra production (hiện tại alias là `https://netcomic.vercel.app`)

### 5. Checklist nhanh cho Agent

- [ ] Đã chạy `npm run lint` và sửa lỗi mới
- [ ] Đã `git status` kiểm tra không stage nhầm file (đặc biệt là `.env*`)
- [ ] Đã đặt commit message đúng format (`feat:`, `fix:`, v.v.)
- [ ] Đã `git push`
- [ ] Nếu cần: đã `npm run deploy` và xem site chạy ổn trên `https://netcomic.vercel.app`

