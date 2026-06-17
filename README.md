# 🌸 Linh Chi — Kho kiến thức

Website tĩnh lưu trữ sách & link học tập/công việc.
Giao diện kiểu **App Store của Apple** pha **theme Nhật Bản dễ thương**.
Có UI admin: login từ bất kỳ trình duyệt nào → thêm/sửa/xoá nội dung → tự commit lên GitHub.

## 🌐 Live

`https://linhchibi.io.vn` (GitHub Pages + CNAME).

## 🛠 Setup admin (lần đầu)

Backend dùng Cloudflare Worker free. Hướng dẫn setup được lưu **riêng ngoài git** ở `SETUP.md` (gitignored vì chứa thông tin mẫu).

## ✏️ Cách dùng (sau khi đã setup)

1. Mở `linhchibi.io.vn`.
2. Bấm 🔒 **Admin** → login với credentials đã set trên Cloudflare worker.
3. Banner hồng hiện trên đầu trang.
4. Sửa nội dung bằng UI:
   - **+ Mục lớn** / ✎ / 🗑 ở sidebar
   - **+ Mục** / ✎ / 🗑 ở mỗi chủ đề
   - Hover lên 1 mục → ✎ Sửa, ↑ ↓ Sắp xếp, 🗑 Xoá
   - **⚙ Cài đặt** — đổi tên site, tagline
5. Mọi thay đổi auto-lưu nháp trong browser. Bấm **Huỷ thay đổi** để revert.
6. Bấm **💾 Lưu & Publish** → worker commit `data.js` lên GitHub → ~1 phút sau site cập nhật.

Token phiên sống 24h. Hết phiên thì login lại.

## 📁 Cấu trúc

| File | Công dụng |
|------|-----------|
| `index.html` / `styles.css` / `app.js` | Frontend + UI admin |
| `data.js` | Dữ liệu nội dung (worker tự ghi lại khi publish) |
| `config.js` | Chứa URL Worker (commit được, không có secret) |
| `worker.js` | Code Cloudflare Worker (deploy lên CF) |
| `SETUP.md` | Hướng dẫn deploy worker |
| `assets/anh_bi.jpg` | Ảnh bé mèo |
| `CNAME` | Custom domain |

## 🔒 Bảo mật

- Username, password, GitHub PAT lưu **chỉ trong env vars Cloudflare** (mã hoá at rest). Browser không bao giờ thấy.
- Worker chỉ chấp nhận origin trong `ALLOWED_ORIGINS`.
- Phiên dùng HMAC-SHA256 ký kèm hạn 24h.
- Để khoá nhanh (nếu lộ): đổi `ADMIN_PASSWORD` + `SESSION_SECRET` trên CF dashboard → mọi phiên tự huỷ.

## ✏️ Sửa thủ công (không qua UI)

Vẫn được — chỉnh `data.js` rồi `git push`:

```js
{
  title: "Tên cuốn sách",
  type: "book",                            // "book" | "website"
  desc: "Mô tả ngắn",
  url: "https://drive.google.com/...",
  tag: "PDF",
  icon: "book",                            // book|torii|scale|courthouse|sakura|cat|globe|laptop|sparkles|sun|cloud
  cover: "",                               // URL ảnh bìa, hoặc bỏ trống
},
```

Lần publish kế tiếp qua UI sẽ ghi đè format thành JSON đẹp.

## 🐱 Đổi ảnh bé mèo

Thay file `assets/anh_bi.jpg` (giữ tên) hoặc đổi src trong `index.html`.
