# CLAUDE.md — Hướng dẫn cho Claude agent

File này dành cho Claude Code (hoặc agent khác) clone repo từ máy mới. Đọc trước khi sửa code.

## 1. Project là gì

**Chỗ của Bi** — website tĩnh tổng hợp sách & link học tập/công việc, dành cho 2 chị em Linh & Chi Bi.
- Live: https://linhchibi.io.vn (GitHub Pages + CNAME → repo `linkhoang19931-hub/linhchibi`).
- Giao diện kiểu **Apple App Store** pha **theme Nhật kawaii** (sakura hồng, cánh hoa rơi, torii, mèo, font Be Vietnam Pro).
- Có UI admin chạy ngay trên trình duyệt: login → thêm/sửa/xoá nội dung → 1 click commit lên GitHub → site cập nhật.

## 2. Kiến trúc

```
┌─ Browser (linhchibi.io.vn) ──────────────────────────┐
│  index.html + styles.css + app.js + data.js + config.js│
│  - Vanilla JS, KHÔNG build tool, KHÔNG framework.    │
│  - data.js = state nội dung (siteData object).       │
│  - app.js có module `admin` khi user login.          │
└──────────────┬───────────────────────────────────────┘
               │ fetch /api/login + /api/save (CORS)
               ▼
┌─ Cloudflare Worker (workers.dev) ────────────────────┐
│  worker.js                                            │
│  - POST /api/login: kiểm username/password trong env  │
│    vars → trả token HMAC-SHA256 ký 24h.               │
│  - POST /api/save: verify token → PUT data.js qua     │
│    GitHub Contents API.                               │
│  - Secret (password, GitHub PAT) ở env vars CF dashboard.│
└──────────────┬───────────────────────────────────────┘
               │ GitHub Contents API
               ▼
┌─ GitHub repo + Pages ────────────────────────────────┐
│  Push tới main → GH Pages tự rebuild → site update   │
│  trong ~1 phút.                                       │
└──────────────────────────────────────────────────────┘
```

**Không có database** — `data.js` LÀ database. Worker rewrite file này mỗi lần publish.

## 3. File map

| File | Vai trò | Bị gitignore? |
|------|---------|---------------|
| `index.html` | Khung trang (sidebar + hero + sections + modal/banner shell) | – |
| `styles.css` | Toàn bộ giao diện (public + admin UI) | – |
| `app.js` | Logic render + module `admin` (login, CRUD, draft, publish) | – |
| `data.js` | Dữ liệu nội dung — siteData = {siteName, tagline, categories[]} | – |
| `config.js` | `window.LINHCHI_CONFIG = { WORKER_URL: "..." }` | – |
| `worker.js` | Cloudflare Worker source (paste vào CF dashboard để deploy) | – |
| `assets/` + `anh_bi.jpg` | Ảnh tĩnh | – |
| `CNAME` | Custom domain `linhchibi.io.vn` | – |
| `.nojekyll` | Tắt Jekyll processing trên GH Pages | – |
| `SETUP.md` | Hướng dẫn deploy Worker — CHỨA thông tin nhạy cảm mẫu | **Có** |
| `.gitignore` | – | – |

## 4. Data model

```js
// data.js
const siteData = {
  siteName: "Chỗ của Bi",
  tagline: "...",
  categories: [
    {
      id: "hoc-tap",          // slug, dùng cho deep link
      name: "Học tập",
      icon: "sakura",         // 1 trong các tên trong ICONS (app.js:7)
      description: "...",
      topics: [
        {
          id: "tieng-nhat",
          name: "Tiếng Nhật",
          icon: "torii",
          description: "...",
          items: [
            {
              title: "...",
              type: "book" | "website",
              url: "https://...",
              desc: "...",
              tag: "PDF",       // optional
              icon: "book",     // optional, default theo type
              cover: ""         // optional URL ảnh bìa; nếu trống dùng gradient
            }
          ]
        }
      ]
    }
  ]
};
```

Icon list (app.js:7): `book, torii, scale, courthouse, sakura, cat, globe, laptop, sparkles, sun, cloud`.

## 5. Admin UI flow

1. User vào site → bấm 🔒 Admin (sidebar) → modal login.
2. `app.js:showLogin()` POST `${WORKER_URL}/api/login` → trả token, lưu `sessionStorage["linhchi-admin-session-v2"] = {token, exp}`.
3. Vào admin mode: body class `admin-mode`, banner hồng hiện, mọi cell/topic/category có nút edit.
4. Mọi thay đổi gọi `admin.markDirty()` → lưu draft vào `localStorage["linhchi-draft-v1"]`. State sống qua reload.
5. Bấm **💾 Lưu & Publish** → POST `/api/save` với `Authorization: Bearer <token>` → Worker commit data.js qua GitHub Contents API → ~1 phút sau site update.
6. **Huỷ thay đổi** → revert về `savedData` (snapshot lần publish gần nhất, không phải bản gốc lúc load trang).

Quan trọng — biến quan trọng trong app.js:
- `let data` — bản đang hiển thị (có thể là draft).
- `let savedData` — snapshot lần publish gần nhất.
- `const siteData` (từ data.js) — bản gốc khi load page; chỉ dùng cho fallback.

## 6. Cách publish (cho agent)

Code thay đổi (index.html, styles.css, app.js, worker.js...) → push tay qua git như bình thường.

Nội dung (categories/topics/items) — 2 cách:
- **Qua UI** (đề xuất): login admin trên site → sửa → bấm Lưu & Publish. Worker tự commit.
- **Sửa data.js trực tiếp**: edit file, `git push`. Lưu ý lần publish kế tiếp qua UI sẽ ghi đè format thành JSON 2-space indent.

## 7. Cloudflare Worker — credentials & env

Worker ở `linhchi-api.linkhoang19931.workers.dev` (URL ghi trong `config.js`).

Env vars **chỉ có trong Cloudflare dashboard**, KHÔNG có trong repo:
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- `SESSION_SECRET` (chuỗi ngẫu nhiên ≥32 ký tự, dùng để ký HMAC token)
- `GITHUB_TOKEN` (fine-grained PAT với Contents:Write trên repo này)
- `GITHUB_REPO` = `linkhoang19931-hub/linhchibi`
- `GITHUB_BRANCH` = `main`
- `ALLOWED_ORIGINS` = `https://linhchibi.io.vn,https://linkhoang19931-hub.github.io`

Khi sửa `worker.js` trong repo, **cần paste lại** vào CF dashboard và bấm Deploy (CF không tự sync từ GitHub trong setup này). Hoặc dùng `wrangler` nếu muốn CI/CD.

**Đừng bao giờ commit credentials hoặc PAT vào repo.** File `SETUP.md` chứa hướng dẫn setup mẫu (có placeholder credentials) nên đã được gitignore. Đừng add nó vào git.

## 8. Constraints / preferences của user

- **Không thêm `Co-Authored-By: Claude` vào commit message** trong repo này.
- User là người Việt, giao tiếp tiếng Việt. Reply ngắn gọn, không lan man.
- User thường commit từng thay đổi nhỏ riêng lẻ (rename, đổi text, sửa lỗi…) — push ngay sau khi sửa, không batch.

## 9. Test / verify khi sửa code

- **Syntax**: `node --check app.js`, `node --check data.js`, `cp worker.js /tmp/w.mjs && node --check /tmp/w.mjs`.
- **JS bug trong CSS-display**: thẻ có thuộc tính `hidden` mà CSS set `display: flex/grid/block` sẽ phá `hidden`. styles.css đã có rule `[hidden] { display: none !important; }` để chặn. Nếu thêm modal/popup mới, đừng quên rule này.
- **Worker test (không cần deploy)**: chạy local:
  ```bash
  curl https://linhchi-api.linkhoang19931.workers.dev/api/ping
  ```
  trả `{"ok":true,"ts":...}` là worker chạy ổn.
- **End-to-end**: mở https://linhchibi.io.vn → login → sửa → publish → đợi ~1 phút → reload public site.

## 10. Common gotchas

- `data.js` declare `const siteData = {...}` ở top-level (không phải module). Sau lần publish đầu, file được rewrite thành JSON 2-space format và mất comment header (giữ bởi worker). Đừng cố reformat lại bằng tay.
- Worker dùng `crypto.subtle` từ Web Crypto (có sẵn trong Workers runtime, không phải Node `crypto`).
- `git stash` cần nếu có unstaged changes trước `git pull --rebase`.
- Khi rename / xoá category/topic, ID slug có thể đổi → nếu có deep link cũ (`#sub-foo`) sẽ vỡ. Hiện không có redirect cho ID cũ.

## 11. Roadmap / known TODOs

Không có scheduled work. Nếu user yêu cầu thêm tính năng:
- Drag-to-reorder cell trong admin: chưa có (chỉ có nút ↑ ↓ từng bước).
- Upload ảnh bìa: chưa hỗ trợ — phải dán URL trực tiếp.
- Multi-user admin: chưa, 1 set credentials trong worker.
- Rate limit / brute force protection: worker có random delay 150-300ms khi login, không có lock account.

Nếu user muốn thêm cái nào → hỏi kỹ scope rồi triển khai.
