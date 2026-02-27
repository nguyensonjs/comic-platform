# Deploy lên Vercel

## Lần đầu tiên (Setup)

### 1. Cài Vercel CLI
```bash
npm install -g vercel
```

### 2. Đăng nhập Vercel
```bash
vercel login
```
> Chọn phương thức đăng nhập (GitHub, email...) và làm theo hướng dẫn.

### 3. Link project với Vercel (chỉ cần làm 1 lần)
```bash
cd d:\Client\comic-platform
vercel link
```
> Chọn team/account, sau đó chọn "Link to existing project" hoặc tạo project mới.

---

## Mỗi lần deploy

### Deploy lên môi trường Preview (test trước)
```bash
cd d:\Client\comic-platform
vercel
```

### Deploy lên Production
```bash
cd d:\Client\comic-platform
vercel --prod
```

---

## Cách 2: Deploy qua GitHub (Tự động CI/CD)

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com) → **Add New Project**
3. Import repository GitHub của project này
4. Vercel tự detect Next.js, giữ nguyên cài đặt mặc định
5. Nhấn **Deploy**

> Sau khi setup xong, mỗi lần `git push` lên branch `main` sẽ tự động deploy Production.

---

## Cấu hình môi trường (Environment Variables)

Nếu có biến môi trường (`.env.local`):

1. Vào Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Thêm từng biến tương ứng

---

## Lưu ý

- Framework: **Next.js** (tự detect)
- Build Command: `npm run build` (mặc định)
- Output Directory: `.next` (mặc định)
- Node.js version: 20.x (khuyến nghị)
