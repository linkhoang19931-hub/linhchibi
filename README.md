# 🌸 Linh Chi — Kho kiến thức

Website lưu trữ tài liệu học tập & công việc.
Giao diện kiểu **App Store của Apple** pha **theme Nhật Bản dễ thương** (hồng sakura, cánh hoa rơi, icon minh hoạ kawaii).

## 📁 Các file
| File | Công dụng |
|------|-----------|
| `index.html` | Trang chính (không cần sửa) |
| `styles.css` | Giao diện (không cần sửa) |
| `app.js`     | Xử lý hiển thị (không cần sửa) |
| **`data.js`** | ⭐ **File DUY NHẤT cần sửa để thêm sách / link** |
| `assets/anh_bi.jpg` | Ảnh bé mèo (góc trái dưới) |

## ✏️ Cách thêm sách / website
Mở file **`data.js`**, copy 1 khối `{ ... }` có sẵn rồi sửa lại:

```js
{
  title: "Tên cuốn sách",
  desc:  "Mô tả ngắn / tác giả",
  url:   "https://drive.google.com/...",   // link Google Drive hoặc website
  tag:   "PDF",                            // nhãn nhỏ (tuỳ ý)
  emoji: "📘",                             // icon trên bìa (tuỳ ý)
},
```
- Để bìa đẹp nhất với sách: nếu có ảnh bìa thật, thêm `cover: "link-ảnh"`.
  Bỏ trống thì web tự tạo bìa màu gradient + emoji.
- Nhớ giữ dấu phẩy `,` ở cuối mỗi khối.

### Thêm category lớn / mục nhỏ mới
Trong `data.js`, copy nguyên một khối category hoặc subcategory rồi đổi `id`
(viết liền không dấu, vd `"giai-tri"`) và `name`.

## 🚀 Đưa lên GitHub Pages (miễn phí)
1. Đẩy toàn bộ thư mục này lên repo: `linkhoang19931-hub/linhchibi`
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo website kho kiến thức"
   git branch -M main
   git remote add origin https://github.com/linkhoang19931-hub/linhchibi.git
   git push -u origin main
   ```
2. Vào repo trên GitHub → **Settings** → **Pages**
3. Mục **Source** chọn branch `main`, thư mục `/ (root)` → **Save**
4. Đợi ~1 phút, web sẽ chạy tại:
   **https://linkhoang19931-hub.github.io/linhchibi/**

> Mỗi lần sửa `data.js` rồi `git push` là website tự cập nhật.

## 🐱 Đổi ảnh bé mèo
Thay file `assets/anh_bi.jpg` bằng ảnh khác (giữ nguyên tên), hoặc đổi
đường dẫn ảnh trong `index.html` (thẻ `<img id="kittyImg">`).
