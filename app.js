/* ============================================================
   LINH CHI  —  Logic hiển thị + module admin
   ============================================================ */

/* ---------- BỘ ICON minh hoạ dễ thương (SVG vector) ----------
   Mỗi icon vẽ trong khung 48x48, nét bo tròn, kiểu sách Nhật. */
const ICONS = {
  book: `
    <rect x="11" y="7" width="27" height="34" rx="4.5" fill="#f9b9c8" stroke="#5e4b4b" stroke-width="2.2"/>
    <path d="M17.5 7.5 V40.5" stroke="#df95a8" stroke-width="2"/>
    <rect x="21" y="13" width="13" height="13" rx="3.5" fill="#fff6ec" stroke="#5e4b4b" stroke-width="1.8"/>
    <circle cx="25.7" cy="19" r="1.1" fill="#5e4b4b"/>
    <circle cx="30" cy="19" r="1.1" fill="#5e4b4b"/>
    <path d="M26 22.3 q1.85 1.6 3.7 0" stroke="#5e4b4b" stroke-width="1.3"/>
    <circle cx="23.6" cy="21.6" r="1" fill="#f6a3bb"/>
    <circle cx="32" cy="21.6" r="1" fill="#f6a3bb"/>
    <path d="M21.5 32 H33.5 M21.5 35.5 H30" stroke="#fff6ec" stroke-width="1.8"/>`,

  torii: `
    <path d="M6 12 q18 -4.5 36 0 l-1.5 5 q-16.5 -3.8 -33 0 Z" fill="#e35b4f" stroke="#9e3b34" stroke-width="1.6"/>
    <rect x="10" y="20" width="28" height="4.6" rx="1.4" fill="#e35b4f" stroke="#9e3b34" stroke-width="1.6"/>
    <rect x="12.5" y="12" width="5.2" height="30" rx="1.8" fill="#e9685c" stroke="#9e3b34" stroke-width="1.6"/>
    <rect x="30.3" y="12" width="5.2" height="30" rx="1.8" fill="#e9685c" stroke="#9e3b34" stroke-width="1.6"/>`,

  scale: `
    <path d="M24 8 V40" stroke="#7a5a4e" stroke-width="2.4"/>
    <circle cx="24" cy="7.5" r="2.6" fill="#ffd97d" stroke="#7a5a4e" stroke-width="1.6"/>
    <path d="M11 14 H37" stroke="#7a5a4e" stroke-width="2.4"/>
    <path d="M17 39.5 h14 a7 7 0 0 1 -14 0 Z" fill="#f6c453" stroke="#7a5a4e" stroke-width="2"/>
    <path d="M11 14 L6.5 23 M11 14 L15.5 23" stroke="#7a5a4e" stroke-width="1.3"/>
    <path d="M6 23 a5 3.2 0 0 0 10 0 Z" fill="#ffe6a3" stroke="#7a5a4e" stroke-width="1.7"/>
    <path d="M37 14 L32.5 23 M37 14 L41.5 23" stroke="#7a5a4e" stroke-width="1.3"/>
    <path d="M32 23 a5 3.2 0 0 0 10 0 Z" fill="#ffe6a3" stroke="#7a5a4e" stroke-width="1.7"/>`,

  courthouse: `
    <path d="M7 18 L24 8.5 L41 18 Z" fill="#ecc760" stroke="#5e4b4b" stroke-width="1.8"/>
    <circle cx="24" cy="14" r="1.5" fill="#e35b4f"/>
    <rect x="9" y="18" width="30" height="3.4" rx="1" fill="#f2d27e" stroke="#5e4b4b" stroke-width="1.4"/>
    <rect x="12" y="22" width="3.6" height="13" fill="#fff6ec" stroke="#5e4b4b" stroke-width="1.5"/>
    <rect x="19" y="22" width="3.6" height="13" fill="#fff6ec" stroke="#5e4b4b" stroke-width="1.5"/>
    <rect x="25.4" y="22" width="3.6" height="13" fill="#fff6ec" stroke="#5e4b4b" stroke-width="1.5"/>
    <rect x="32.4" y="22" width="3.6" height="13" fill="#fff6ec" stroke="#5e4b4b" stroke-width="1.5"/>
    <rect x="8" y="35" width="32" height="4.2" rx="1.4" fill="#ecc760" stroke="#5e4b4b" stroke-width="1.6"/>`,

  sakura: `
    <g transform="translate(24,24)">
      <path transform="rotate(0)"   d="M0 -3 C -5 -9 -4.5 -15.5 -1.6 -17.6 C -0.6 -18.6 0.6 -18.6 1.6 -17.6 C 4.5 -15.5 5 -9 0 -3 Z" fill="#fbc2d3" stroke="#ec8aa6" stroke-width="1.4"/>
      <path transform="rotate(72)"  d="M0 -3 C -5 -9 -4.5 -15.5 -1.6 -17.6 C -0.6 -18.6 0.6 -18.6 1.6 -17.6 C 4.5 -15.5 5 -9 0 -3 Z" fill="#fbc2d3" stroke="#ec8aa6" stroke-width="1.4"/>
      <path transform="rotate(144)" d="M0 -3 C -5 -9 -4.5 -15.5 -1.6 -17.6 C -0.6 -18.6 0.6 -18.6 1.6 -17.6 C 4.5 -15.5 5 -9 0 -3 Z" fill="#fbc2d3" stroke="#ec8aa6" stroke-width="1.4"/>
      <path transform="rotate(216)" d="M0 -3 C -5 -9 -4.5 -15.5 -1.6 -17.6 C -0.6 -18.6 0.6 -18.6 1.6 -17.6 C 4.5 -15.5 5 -9 0 -3 Z" fill="#fbc2d3" stroke="#ec8aa6" stroke-width="1.4"/>
      <path transform="rotate(288)" d="M0 -3 C -5 -9 -4.5 -15.5 -1.6 -17.6 C -0.6 -18.6 0.6 -18.6 1.6 -17.6 C 4.5 -15.5 5 -9 0 -3 Z" fill="#fbc2d3" stroke="#ec8aa6" stroke-width="1.4"/>
      <circle r="3.3" fill="#ffd36b" stroke="#ec8aa6" stroke-width="1.2"/>
    </g>`,

  cat: `
    <path d="M13 17 L10 7.5 L19.5 13 Z" fill="#c4beb4" stroke="#5e4b4b" stroke-width="1.9"/>
    <path d="M35 17 L38 7.5 L28.5 13 Z" fill="#c4beb4" stroke="#5e4b4b" stroke-width="1.9"/>
    <circle cx="24" cy="27" r="13.5" fill="#d3cdc3" stroke="#5e4b4b" stroke-width="2"/>
    <circle cx="19.2" cy="26" r="1.7" fill="#5e4b4b"/>
    <circle cx="28.8" cy="26" r="1.7" fill="#5e4b4b"/>
    <path d="M22.3 30.4 q1.7 1.6 3.4 0" stroke="#5e4b4b" stroke-width="1.4"/>
    <path d="M24 28.2 l-1.5 1.6 h3 Z" fill="#f08aa0"/>
    <circle cx="16.6" cy="29.6" r="1.6" fill="#f6a8bd" opacity="0.75"/>
    <circle cx="31.4" cy="29.6" r="1.6" fill="#f6a8bd" opacity="0.75"/>
    <path d="M9 25.5 H14 M9 28.5 H14 M34 25.5 H39 M34 28.5 H39" stroke="#5e4b4b" stroke-width="1.1" opacity="0.65"/>`,

  globe: `
    <circle cx="24" cy="24" r="15" fill="#a7ddec" stroke="#4a8fb0" stroke-width="2"/>
    <path d="M9 24 H39" stroke="#4a8fb0" stroke-width="1.5"/>
    <path d="M24 9 C 16 15 16 33 24 39" stroke="#4a8fb0" stroke-width="1.5"/>
    <path d="M24 9 C 32 15 32 33 24 39" stroke="#4a8fb0" stroke-width="1.5"/>
    <path d="M13 18 q5 -2 8 1 q-2 4 -6 3 q-3 -2 -2 -4 Z" fill="#8fd3a0" stroke="#4a8fb0" stroke-width="1.2"/>
    <path d="M27 27 q4 -1 7 1 q-1 3 -5 3 q-3 -1 -2 -4 Z" fill="#8fd3a0" stroke="#4a8fb0" stroke-width="1.2"/>`,

  sparkles: `
    <path d="M17 7 L19.4 14.6 L27 17 L19.4 19.4 L17 27 L14.6 19.4 L7 17 L14.6 14.6 Z" fill="#ffd97d" stroke="#e6ab43" stroke-width="1.4"/>
    <path d="M33 24 L34.6 29 L39.5 30.5 L34.6 32 L33 37 L31.4 32 L26.5 30.5 L31.4 29 Z" fill="#ffe6a8" stroke="#e6ab43" stroke-width="1.2"/>
    <circle cx="38" cy="14" r="1.8" fill="#ffd97d" stroke="#e6ab43" stroke-width="1"/>`,

  laptop: `
    <rect x="9" y="11" width="30" height="21" rx="3" fill="#bfe1f0" stroke="#5e4b4b" stroke-width="2"/>
    <rect x="13" y="15" width="22" height="13" rx="1.6" fill="#e0f1f8" stroke="#5e4b4b" stroke-width="1.3"/>
    <circle cx="20" cy="20.5" r="1.1" fill="#5e4b4b"/>
    <circle cx="28" cy="20.5" r="1.1" fill="#5e4b4b"/>
    <path d="M22 23.4 q2 1.6 4 0" stroke="#5e4b4b" stroke-width="1.2"/>
    <circle cx="18" cy="23" r="1" fill="#f6a3bb" opacity="0.8"/>
    <circle cx="30" cy="23" r="1" fill="#f6a3bb" opacity="0.8"/>
    <path d="M5 37 H43 L39.5 32 H8.5 Z" fill="#d8d0ca" stroke="#5e4b4b" stroke-width="2"/>`,

  sun: `
    <g stroke="#e9a23e" stroke-width="2">
      <path d="M24 4 V9"/><path d="M24 39 V44"/><path d="M4 24 H9"/><path d="M39 24 H44"/>
      <path d="M10 10 L13.5 13.5"/><path d="M34.5 34.5 L38 38"/><path d="M38 10 L34.5 13.5"/><path d="M13.5 34.5 L10 38"/>
    </g>
    <circle cx="24" cy="24" r="9.5" fill="#ffd36b" stroke="#e9a23e" stroke-width="2"/>
    <circle cx="20.5" cy="23" r="1.3" fill="#e9803e"/>
    <circle cx="27.5" cy="23" r="1.3" fill="#e9803e"/>
    <path d="M21 26.5 q3 2.5 6 0" stroke="#e9803e" stroke-width="1.4"/>
    <circle cx="18" cy="26" r="1.4" fill="#f6a86b" opacity="0.7"/>
    <circle cx="30" cy="26" r="1.4" fill="#f6a86b" opacity="0.7"/>`,

  cloud: `
    <path d="M13 33 Q7 33 7 27.5 Q7 22 13 22 Q14 14 23 15 Q31 15 31 23 Q39 22.5 39 29 Q39 33 33 33 Z" fill="#ffffff" stroke="#e0c9d0" stroke-width="1.6"/>`,
};

const ICON_NAMES = Object.keys(ICONS);

function svgIcon(name, size) {
  const inner = ICONS[name] || ICONS.book;
  return `<svg class="ic" viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

/* ---------- Tiện ích ---------- */
function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function hash(text = "") {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

const PALETTES = [
  ["#ffe0e8", "#ffc9d6"], ["#fff0dd", "#ffe0bf"], ["#e7f4e6", "#cfe9cf"],
  ["#e6f1fb", "#cfe2f5"], ["#f3eafc", "#e2d3f3"], ["#fdeede", "#f8dcc6"],
  ["#fdeaf0", "#f8d3e0"], ["#e9f6f3", "#d2ece6"],
];
function paletteFor(text) { return PALETTES[hash(text) % PALETTES.length]; }

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function slugify(s) {
  return String(s || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function uniqueId(base, taken) {
  let id = base || "x";
  if (!taken.has(id)) return id;
  for (let i = 2; ; i++) {
    const cand = `${id}-${i}`;
    if (!taken.has(cand)) return cand;
  }
}
function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------- Google Drive: lấy bìa & id ---------- */
function driveId(url = "") {
  const m =
    String(url).match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    String(url).match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : "";
}
function driveThumb(url, w = 400) {
  const id = driveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${w}` : "";
}

/* ---------- Tiến độ học (lưu localStorage) ---------- */
const PROGRESS_KEY = "linhchi-progress-v1";
let progress = {};
try { progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch { progress = {}; }
function isDone(url) { return !!progress[url]; }
function toggleDone(url) {
  if (progress[url]) delete progress[url];
  else progress[url] = 1;
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch {}
}

/* ---------- Dark mode ---------- */
const THEME_KEY = "linhchi-theme";
function applyTheme(mode) {
  document.body.classList.toggle("theme-dark", mode === "dark");
  const tc = document.querySelector('meta[name="theme-color"]');
  if (tc) tc.setAttribute("content", mode === "dark" ? "#1f1a1d" : "#e8688a");
  const btn = $("#themeToggle");
  if (btn) btn.textContent = mode === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
  try { localStorage.setItem(THEME_KEY, next); } catch {}
  applyTheme(next);
}

/* ---------- Xem nhanh PDF (Google Drive preview) ---------- */
function openPreview(fileId) {
  let ov = document.getElementById("pdfPreview");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "pdfPreview";
    ov.className = "pdf-preview";
    ov.innerHTML = `
      <div class="pp-backdrop" data-pp-close></div>
      <div class="pp-box">
        <button class="pp-close" type="button" data-pp-close aria-label="Đóng">×</button>
        <div class="pp-frame"></div>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", (e) => { if (e.target.closest("[data-pp-close]")) closePreview(); });
  }
  ov.querySelector(".pp-frame").innerHTML =
    `<iframe src="https://drive.google.com/file/d/${fileId}/preview" allow="autoplay" loading="lazy"></iframe>`;
  ov.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closePreview() {
  const ov = document.getElementById("pdfPreview");
  if (ov) { ov.classList.remove("open"); ov.querySelector(".pp-frame").innerHTML = ""; }
  document.body.style.overflow = "";
}

const state = { active: "all", query: "", filterType: "" };

// `savedData` = bản đã publish (snapshot từ siteData hoặc từ lần publish gần nhất).
// `data` = bản đang hiển thị; ở chế độ admin, có thể là bản nháp (đã sửa).
let savedData = deepClone(siteData);
let data = deepClone(savedData);

/* ---------- Render 1 mục (cell kiểu App Store) ---------- */
function renderCell(item, path) {
  const [c1, c2] = paletteFor(item.title);
  const isWeb = item.type === "website";
  const bg = `background:linear-gradient(150deg, ${c1}, ${c2})`;
  const iconInner = svgIcon(item.icon || (isWeb ? "globe" : "book"), 38);
  // Bìa: ưu tiên ảnh tự nhập; nếu là sách Drive thì tự lấy thumbnail.
  const coverUrl = item.cover || (!isWeb ? driveThumb(item.url, 400) : "");
  const coverImg = coverUrl
    ? `<img class="cell-cover" src="${esc(coverUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />`
    : "";

  const done = !admin.authed && isDone(item.url);
  const fileId = !isWeb ? driveId(item.url) : "";

  const userCtrls = !admin.authed ? `
    ${fileId ? `<button type="button" class="cell-mini preview-btn" data-preview="${esc(fileId)}" title="Xem nhanh">👁</button>` : ""}
    <button type="button" class="cell-mini done-btn ${done ? "is-done" : ""}" data-done="${esc(item.url)}" title="Đánh dấu đã học/đọc">✓</button>` : "";

  const adminCtrls = admin.authed ? `
    <span class="cell-edit">
      <button type="button" class="ce-btn" data-admin="edit-item" data-path="${esc(path)}" title="Sửa">✎</button>
      <button type="button" class="ce-btn ce-up" data-admin="move-item" data-path="${esc(path)}" data-dir="-1" title="Lên">↑</button>
      <button type="button" class="ce-btn ce-down" data-admin="move-item" data-path="${esc(path)}" data-dir="1" title="Xuống">↓</button>
      <button type="button" class="ce-btn ce-del" data-admin="del-item" data-path="${esc(path)}" title="Xoá">🗑</button>
    </span>` : "";

  return `
    <a class="cell ${done ? "cell-done" : ""}" href="${esc(item.url)}" target="_blank" rel="noopener">
      <span class="cell-icon" style="${bg}">${iconInner}${coverImg}</span>
      <span class="cell-main">
        <span class="cell-title">${esc(item.title)}</span>
        ${item.desc ? `<span class="cell-sub">${esc(item.desc)}</span>` : ""}
        ${item.tag ? `<span class="cell-tag">${esc(item.tag)}</span>` : ""}
      </span>
      ${userCtrls}
      <span class="get-btn">Mở</span>
      ${adminCtrls}
    </a>`;
}

function matchQuery(item, q) {
  if (!q) return true;
  return (
    (item.title || "").toLowerCase().includes(q) ||
    (item.desc || "").toLowerCase().includes(q) ||
    (item.tag || "").toLowerCase().includes(q)
  );
}

/* ---------- Helpers render ---------- */
function cellsGrid(items, cat, topic, allItems) {
  return `<div class="cells">${items
    .map((it) => renderCell(it, `${cat.id}/${topic.id}/${allItems.indexOf(it)}`))
    .join("")}</div>`;
}
function progressHTML(items) {
  if (admin.authed || !items.length) return "";
  const doneN = items.filter((it) => isDone(it.url)).length;
  const pct = Math.round((doneN / items.length) * 100);
  return `<div class="shelf-progress" title="${doneN}/${items.length} đã học">
            <span class="sp-bar"><span style="width:${pct}%"></span></span>
            <span class="sp-txt">${doneN}/${items.length}</span>
          </div>`;
}
function typeMatch(it) {
  if (!state.filterType) return true;
  return state.filterType === "website" ? it.type === "website" : it.type !== "website";
}
// Chip lọc theo LOẠI: Tất cả / Sách / App (chỉ hiện khi nhóm có cả 2 loại)
function typeChips(groupItems) {
  const hasBook = groupItems.some((it) => it.type !== "website");
  const hasWeb = groupItems.some((it) => it.type === "website");
  if (!(hasBook && hasWeb)) return "";
  const chip = (val, label) =>
    `<button type="button" class="chip ${state.filterType === val ? "is-on" : ""}" data-filter-type="${val}">${label}</button>`;
  return `<div class="filter-bar">
      <button type="button" class="chip ${!state.filterType ? "is-on" : ""}" data-filter-type="">Tất cả</button>
      ${chip("book", "Sách")}
      ${chip("website", "App")}
    </div>`;
}

/* ---------- Render toàn bộ ---------- */
function render() {
  const q = state.query.trim().toLowerCase();
  const searching = q.length > 0;
  const filtering = searching || !!state.filterType;
  const cats = data.categories.filter(
    (c) => state.active === "all" || c.id === state.active
  );

  let html = "";
  let total = 0;

  for (const cat of cats) {
    for (const topic of cat.topics || []) {
      const allItems = topic.items || [];
      const items = allItems.filter((it) => matchQuery(it, q) && typeMatch(it));
      total += items.length;
      if (filtering && !items.length) continue;

      // Gom mục theo nhóm (item.group), giữ thứ tự xuất hiện
      const groups = new Map();
      for (const it of items) {
        const g = (it.group || "").trim();
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(it);
      }
      const hasNamedGroups = [...groups.keys()].some((k) => k !== "");

      let body = "";
      if (!items.length) {
        body = `<div class="placeholder">${svgIcon("sakura", 28)} Sắp cập nhật nhé!</div>`;
      } else {
        for (const [gname, gitems] of groups) {
          if (gname === "") {
            body += cellsGrid(gitems, cat, topic, allItems);
          } else {
            const allOfGroup = allItems.filter((it) => (it.group || "").trim() === gname);
            const gicon = gitems[0].icon || "book";
            body += `
              <div class="group" id="grp-${esc(slugify(gname))}">
                <div class="group-head">
                  <span class="group-ic">${svgIcon(gicon, 22)}</span>
                  <h3>${esc(gname)}</h3>
                  ${progressHTML(gitems)}
                </div>
                ${cellsGrid(gitems, cat, topic, allItems)}
              </div>`;
          }
        }
      }

      const rightHtml = admin.authed
        ? (items.length ? `<span class="shelf-count">${items.length} mục</span>` : "")
        : (hasNamedGroups ? "" : progressHTML(items));

      const adminTopicCtrls = admin.authed ? `
        <span class="shelf-edit">
          <button type="button" class="ce-btn" data-admin="add-item" data-path="${esc(cat.id)}/${esc(topic.id)}" title="Thêm mục">＋ Mục</button>
          <button type="button" class="ce-btn" data-admin="edit-topic" data-path="${esc(cat.id)}/${esc(topic.id)}" title="Sửa chủ đề">✎</button>
          <button type="button" class="ce-btn ce-del" data-admin="del-topic" data-path="${esc(cat.id)}/${esc(topic.id)}" title="Xoá chủ đề">🗑</button>
        </span>` : "";

      html += `
        <section class="shelf" id="sub-${esc(topic.id)}">
          <div class="shelf-head">
            <div class="shelf-titles">
              <p class="shelf-eyebrow">${svgIcon(cat.icon || "book", 16)} ${esc(cat.name)}</p>
              <h2>${esc(topic.name)}</h2>
              ${topic.description ? `<p class="shelf-desc">${esc(topic.description)}</p>` : ""}
            </div>
            ${rightHtml}
            ${adminTopicCtrls}
          </div>
          ${typeChips(allItems)}
          ${body}
        </section>`;
    }

    if (admin.authed && (state.active === cat.id || cats.length === 1)) {
      html += `
        <div class="shelf-add">
          <button type="button" class="ce-btn ce-add" data-admin="add-topic" data-path="${esc(cat.id)}">＋ Chủ đề mới trong "${esc(cat.name)}"</button>
        </div>`;
    }
  }

  if (admin.authed && state.active === "all" && !searching) {
    html += `
      <div class="shelf-add">
        <button type="button" class="ce-btn ce-add" data-admin="add-category">＋ Mục lớn mới</button>
      </div>`;
  }

  if (filtering && !total) {
    html = `<div class="empty"><span class="big">${svgIcon("sakura", 64)}</span>Không tìm thấy nội dung nào.<br/>Thử từ khoá / nhãn khác nhé!</div>`;
  }

  $("#sections").innerHTML = html;
}

/* ---------- Sidebar nav ---------- */
let navListenerAttached = false;
function buildNav() {
  const nav = $("#nav");
  // Giữ nguyên nút "Khám phá" đầu tiên, xoá phần còn lại
  nav.innerHTML = `
    <button class="nav-item ${state.active === "all" ? "active" : ""}" data-cat="all">
      <span class="nav-emoji" id="discoverIcon">${svgIcon("sparkles", 24)}</span> Khám phá
    </button>`;

  for (const cat of data.categories) {
    const btn = document.createElement("button");
    btn.className = "nav-item" + (state.active === cat.id ? " active" : "");
    btn.dataset.cat = cat.id;
    const adminPart = admin.authed
      ? `<span class="nav-admin">
           <span class="ce-btn ce-mini" data-admin="edit-category" data-path="${esc(cat.id)}" title="Sửa">✎</span>
           <span class="ce-btn ce-mini ce-del" data-admin="del-category" data-path="${esc(cat.id)}" title="Xoá">🗑</span>
         </span>` : "";
    const catCount = (cat.topics || []).reduce((s, t) => s + (t.items || []).length, 0);
    btn.innerHTML = `<span class="nav-emoji">${svgIcon(cat.icon || "book", 24)}</span> <span class="nav-label">${esc(cat.name)}</span><span class="nav-count">${catCount}</span>${adminPart}`;
    nav.appendChild(btn);

    for (const topic of cat.topics || []) {
      const s = document.createElement("button");
      s.className = "nav-item nav-sub";
      s.dataset.cat = cat.id;
      s.dataset.sub = topic.id;
      const tn = (topic.items || []).length;
      s.innerHTML = `<span class="nav-label">${esc(topic.name)}</span><span class="nav-count">${tn}</span>`;
      nav.appendChild(s);
    }
  }

  if (navListenerAttached) return;
  navListenerAttached = true;

  nav.addEventListener("click", (e) => {
    // Click vào icon admin → đừng switch tab
    if (e.target.closest("[data-admin]")) {
      e.stopPropagation();
      return;
    }
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    state.active = btn.dataset.cat;
    $$(".nav-item", nav).forEach((b) => b.classList.remove("active"));
    const main = $$(".nav-item:not(.nav-sub)", nav).find((b) => b.dataset.cat === state.active);
    (main || btn).classList.add("active");

    render();

    if (btn.dataset.sub) {
      requestAnimationFrame(() => {
        const el = document.getElementById("sub-" + btn.dataset.sub);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* ============================================================
   ADMIN MODULE
   ============================================================ */

const DRAFT_KEY = "linhchi-draft-v1";
const SESSION_KEY = "linhchi-admin-session-v2";

function toast(msg, isErr = false) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.toggle("toast-err", isErr);
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 3500);
}

function openModal(html) {
  $("#modalBody").innerHTML = html;
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  const first = $("#modalBody input, #modalBody textarea, #modalBody select");
  if (first) first.focus();
}
function closeModal() {
  $("#modal").hidden = true;
  $("#modalBody").innerHTML = "";
  document.body.style.overflow = "";
}

function iconSelectHTML(name = "selected", current = "book") {
  return `
    <div class="icon-grid">
      ${ICON_NAMES.map(n => `
        <label class="icon-opt ${n === current ? "is-on" : ""}">
          <input type="radio" name="${name}" value="${n}" ${n === current ? "checked" : ""} hidden />
          <span class="icon-opt-svg">${svgIcon(n, 28)}</span>
          <span class="icon-opt-label">${n}</span>
        </label>`).join("")}
    </div>`;
}
function bindIconGrid(scope) {
  scope.querySelectorAll(".icon-grid").forEach(grid => {
    grid.addEventListener("click", (e) => {
      const opt = e.target.closest(".icon-opt");
      if (!opt) return;
      grid.querySelectorAll(".icon-opt").forEach(o => o.classList.remove("is-on"));
      opt.classList.add("is-on");
      const input = opt.querySelector("input");
      if (input) input.checked = true;
    });
  });
}

const admin = {
  enabled: false,
  authed: false,
  dirty: false,
  config: null,
  token: null,
  tokenExp: 0,

  init() {
    this.config = window.LINHCHI_CONFIG || {};
    this.enabled = !!this.config.WORKER_URL;
    if (!this.enabled) return;

    const btn = $("#adminBtn");
    btn.hidden = false;
    btn.addEventListener("click", () => this.showLogin());

    // Khôi phục session từ sessionStorage (token + thời điểm hết hạn)
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.token && s.exp && s.exp > Math.floor(Date.now() / 1000)) {
          this.token = s.token;
          this.tokenExp = s.exp;
          this.authed = true;
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }

    this.bindGlobal();
    this.bindBanner();

    if (this.authed) this.enter(/*silent*/ true);
  },

  workerURL(path) {
    return (this.config.WORKER_URL || "").replace(/\/+$/, "") + path;
  },

  bindGlobal() {
    // Click delegation cho mọi nút admin
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-admin]");
      if (!t || !this.authed) return;
      e.preventDefault();
      const op = t.dataset.admin;
      const path = t.dataset.path;
      const dir = t.dataset.dir;
      if (op === "add-category") this.editCategory(null);
      else if (op === "edit-category") this.editCategory(path);
      else if (op === "del-category") this.delCategory(path);
      else if (op === "add-topic") this.editTopic(path, null);
      else if (op === "edit-topic") this.editTopic(...path.split("/"));
      else if (op === "del-topic") this.delTopic(path);
      else if (op === "add-item") this.editItem(path, null);
      else if (op === "edit-item") this.editItem(path);
      else if (op === "del-item") this.delItem(path);
      else if (op === "move-item") this.moveItem(path, parseInt(dir, 10));
    });

    // Modal close
    $("#modal").addEventListener("click", (e) => {
      if (e.target.matches("[data-close]")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#modal").hidden) closeModal();
    });
  },

  bindBanner() {
    $("#adminAddCategory").addEventListener("click", () => this.editCategory(null));
    $("#adminSettings").addEventListener("click", () => this.editSettings());
    $("#adminDiscard").addEventListener("click", () => this.discard());
    $("#adminPublish").addEventListener("click", () => this.publish());
    $("#adminLogout").addEventListener("click", () => this.logout());
  },

  showLogin() {
    if (this.authed) return;
    openModal(`
      <h2 class="modal-title">🌸 Đăng nhập Admin</h2>
      <p class="modal-sub">Xác thực qua Cloudflare Worker.</p>
      <form id="loginForm" class="form" autocomplete="off">
        <label>Tên đăng nhập
          <input name="username" autofocus required autocomplete="username" />
        </label>
        <label>Mật khẩu
          <input name="password" type="password" required autocomplete="current-password" />
        </label>
        <div id="loginErr" class="form-err" hidden></div>
        <div class="form-actions">
          <button type="button" class="ab-btn ab-btn-ghost" data-close>Huỷ</button>
          <button type="submit" class="ab-btn ab-btn-primary" id="loginSubmit">Đăng nhập</button>
        </div>
      </form>
    `);
    const form = $("#loginForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submit = $("#loginSubmit");
      const err = $("#loginErr");
      err.hidden = true;
      submit.disabled = true;
      submit.textContent = "Đang đăng nhập...";
      try {
        const fd = new FormData(form);
        const res = await fetch(this.workerURL("/api/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fd.get("username"),
            password: fd.get("password"),
          }),
        });
        let j;
        try { j = await res.json(); } catch { j = null; }
        if (!res.ok || !j || !j.ok) {
          throw new Error(j?.error || `HTTP ${res.status}`);
        }
        this.token = j.token;
        this.tokenExp = j.exp;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: j.token, exp: j.exp }));
        this.authed = true;
        closeModal();
        this.enter();
      } catch (ex) {
        err.textContent = ex.message || "Đăng nhập thất bại";
        err.hidden = false;
      } finally {
        submit.disabled = false;
        submit.textContent = "Đăng nhập";
      }
    });
  },

  enter(silent = false) {
    document.body.classList.add("admin-mode");
    $("#adminBanner").hidden = false;
    $("#adminBtn").hidden = true;

    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        data = JSON.parse(draft);
        this.dirty = true;
        $("#adminDiscard").hidden = false;
        $("#adminPublish").disabled = false;
      } catch {
        localStorage.removeItem(DRAFT_KEY);
      }
    }

    buildNav();
    render();
    if (!silent) toast("Đăng nhập thành công 🌸");
  },

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    this.authed = false;
    this.token = null;
    this.tokenExp = 0;
    document.body.classList.remove("admin-mode");
    $("#adminBanner").hidden = true;
    $("#adminBtn").hidden = false;
    buildNav();
    render();
  },

  markDirty() {
    this.dirty = true;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); }
    catch (e) { toast("Không lưu được nháp: " + e.message, true); }
    $("#adminDiscard").hidden = false;
    $("#adminPublish").disabled = false;
    buildNav();
    render();
  },

  discard() {
    if (!confirm("Bỏ tất cả thay đổi chưa publish?")) return;
    localStorage.removeItem(DRAFT_KEY);
    data = deepClone(savedData);
    this.dirty = false;
    $("#adminDiscard").hidden = true;
    $("#adminPublish").disabled = true;
    buildNav();
    render();
    toast("Đã huỷ thay đổi");
  },

  async publish() {
    const btn = $("#adminPublish");
    const oldLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = "⏳ Đang publish...";
    try {
      const res = await fetch(this.workerURL("/api/save"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token || ""}`,
        },
        body: JSON.stringify({
          data,
          message: "Update content via admin UI",
        }),
      });
      let j;
      try { j = await res.json(); } catch { j = { ok: false, error: `HTTP ${res.status}` }; }
      if (res.status === 401) {
        this.logout();
        throw new Error("Phiên hết hạn — đã đăng xuất, hãy login lại.");
      }
      if (!res.ok || !j.ok) throw new Error(j.error || `HTTP ${res.status}`);
      localStorage.removeItem(DRAFT_KEY);
      this.dirty = false;
      savedData = deepClone(data);
      $("#adminDiscard").hidden = true;
      btn.textContent = oldLabel;
      toast(j.message || "Đã publish lên GitHub");
    } catch (err) {
      btn.disabled = false;
      btn.textContent = oldLabel;
      toast("Lỗi publish: " + err.message, true);
    }
  },

  // ===== Helpers find by path =====
  findCat(catId) { return data.categories.find(c => c.id === catId); },
  findTopic(catId, topicId) {
    const c = this.findCat(catId);
    return c && (c.topics || []).find(t => t.id === topicId);
  },

  // ===== Settings =====
  editSettings() {
    openModal(`
      <h2 class="modal-title">⚙ Cài đặt site</h2>
      <form id="settingsForm" class="form">
        <label>Tên site
          <input name="siteName" value="${esc(data.siteName || "")}" required />
        </label>
        <label>Tagline (hiện ở hero)
          <input name="tagline" value="${esc(data.tagline || "")}" />
        </label>
        <div class="form-actions">
          <button type="button" class="ab-btn ab-btn-ghost" data-close>Huỷ</button>
          <button type="submit" class="ab-btn ab-btn-primary">Lưu</button>
        </div>
      </form>
    `);
    $("#settingsForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      data.siteName = (fd.get("siteName") || "").trim();
      data.tagline = (fd.get("tagline") || "").trim();
      $("#brandName").textContent = data.siteName || "Chỗ của Bi";
      $("#heroSub").textContent = data.tagline || "";
      document.title = data.siteName || "Chỗ của Bi";
      this.markDirty();
      closeModal();
      toast("Đã cập nhật cài đặt");
    });
  },

  // ===== Category =====
  editCategory(catId) {
    const isNew = !catId;
    const cat = isNew
      ? { id: "", name: "", icon: "sakura", description: "", topics: [] }
      : this.findCat(catId);
    if (!cat) return;

    openModal(`
      <h2 class="modal-title">${isNew ? "Thêm mục lớn" : "Sửa mục lớn"}</h2>
      <form id="catForm" class="form">
        <label>Tên
          <input name="name" value="${esc(cat.name)}" required autofocus />
        </label>
        <label>Mô tả (ngắn)
          <input name="description" value="${esc(cat.description || "")}" />
        </label>
        <fieldset>
          <legend>Icon</legend>
          ${iconSelectHTML("icon", cat.icon || "sakura")}
        </fieldset>
        <div class="form-actions">
          <button type="button" class="ab-btn ab-btn-ghost" data-close>Huỷ</button>
          <button type="submit" class="ab-btn ab-btn-primary">${isNew ? "Thêm" : "Lưu"}</button>
        </div>
      </form>
    `);
    bindIconGrid($("#catForm"));
    $("#catForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = (fd.get("name") || "").trim();
      if (!name) return;
      const update = {
        name,
        description: (fd.get("description") || "").trim(),
        icon: fd.get("icon") || "sakura",
      };
      if (isNew) {
        const taken = new Set(data.categories.map(c => c.id));
        const id = uniqueId(slugify(name), taken);
        data.categories.push({ id, ...update, topics: [] });
      } else {
        Object.assign(cat, update);
      }
      this.markDirty();
      closeModal();
      toast(isNew ? "Đã thêm mục lớn" : "Đã cập nhật mục lớn");
    });
  },

  delCategory(catId) {
    const cat = this.findCat(catId);
    if (!cat) return;
    const n = (cat.topics || []).reduce((s, t) => s + (t.items || []).length, 0);
    if (!confirm(`Xoá mục lớn "${cat.name}" cùng ${cat.topics.length} chủ đề và ${n} mục con?`)) return;
    data.categories = data.categories.filter(c => c.id !== catId);
    if (state.active === catId) state.active = "all";
    this.markDirty();
    toast("Đã xoá mục lớn");
  },

  // ===== Topic =====
  editTopic(catId, topicId) {
    const isNew = !topicId;
    const cat = this.findCat(catId);
    if (!cat) return;
    const topic = isNew
      ? { id: "", name: "", icon: "sakura", description: "", items: [] }
      : this.findTopic(catId, topicId);
    if (!topic) return;

    openModal(`
      <h2 class="modal-title">${isNew ? "Thêm chủ đề" : "Sửa chủ đề"}</h2>
      <p class="modal-sub">Trong mục: <strong>${esc(cat.name)}</strong></p>
      <form id="topicForm" class="form">
        <label>Tên
          <input name="name" value="${esc(topic.name)}" required autofocus />
        </label>
        <label>Mô tả
          <input name="description" value="${esc(topic.description || "")}" />
        </label>
        <fieldset>
          <legend>Icon</legend>
          ${iconSelectHTML("icon", topic.icon || "sakura")}
        </fieldset>
        <div class="form-actions">
          <button type="button" class="ab-btn ab-btn-ghost" data-close>Huỷ</button>
          <button type="submit" class="ab-btn ab-btn-primary">${isNew ? "Thêm" : "Lưu"}</button>
        </div>
      </form>
    `);
    bindIconGrid($("#topicForm"));
    $("#topicForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = (fd.get("name") || "").trim();
      if (!name) return;
      const update = {
        name,
        description: (fd.get("description") || "").trim(),
        icon: fd.get("icon") || "sakura",
      };
      if (isNew) {
        const taken = new Set((cat.topics || []).map(t => t.id));
        const id = uniqueId(slugify(name), taken);
        cat.topics = cat.topics || [];
        cat.topics.push({ id, ...update, items: [] });
      } else {
        Object.assign(topic, update);
      }
      this.markDirty();
      closeModal();
      toast(isNew ? "Đã thêm chủ đề" : "Đã cập nhật chủ đề");
    });
  },

  delTopic(path) {
    const [catId, topicId] = path.split("/");
    const cat = this.findCat(catId);
    const topic = this.findTopic(catId, topicId);
    if (!cat || !topic) return;
    const n = (topic.items || []).length;
    if (!confirm(`Xoá chủ đề "${topic.name}" cùng ${n} mục?`)) return;
    cat.topics = cat.topics.filter(t => t.id !== topicId);
    this.markDirty();
    toast("Đã xoá chủ đề");
  },

  // ===== Item =====
  editItem(path, sentinel) {
    // path = "catId/topicId" (sentinel === null → thêm mới)
    // path = "catId/topicId/index" → sửa
    const parts = path.split("/");
    const isNew = sentinel === null || parts.length === 2;
    const [catId, topicId, idxStr] = parts;
    const topic = this.findTopic(catId, topicId);
    if (!topic) return;
    const idx = isNew ? -1 : parseInt(idxStr, 10);
    const item = isNew
      ? { title: "", type: "book", group: "", url: "", desc: "", tag: "", icon: "book", cover: "" }
      : topic.items[idx];
    if (!item) return;

    const groupNames = [...new Set(
      data.categories.flatMap((c) => (c.topics || []).flatMap((t) => (t.items || []).map((i) => (i.group || "").trim()).filter(Boolean)))
    )];
    const groupOpts = groupNames.map((g) => `<option value="${esc(g)}"></option>`).join("");

    openModal(`
      <h2 class="modal-title">${isNew ? "Thêm mục" : "Sửa mục"}</h2>
      <p class="modal-sub">Trong chủ đề: <strong>${esc(topic.name)}</strong></p>
      <form id="itemForm" class="form">
        <label>Tên *
          <input name="title" value="${esc(item.title)}" required autofocus />
        </label>
        <label>URL *
          <input name="url" value="${esc(item.url)}" type="url" required placeholder="https://..." />
        </label>
        <label>Mô tả ngắn
          <input name="desc" value="${esc(item.desc || "")}" />
        </label>
        <div class="form-row">
          <fieldset class="form-half">
            <legend>Loại</legend>
            <label class="radio">
              <input type="radio" name="type" value="book" ${item.type !== "website" ? "checked" : ""} />
              <span>📖 Tài liệu / Sách</span>
            </label>
            <label class="radio">
              <input type="radio" name="type" value="website" ${item.type === "website" ? "checked" : ""} />
              <span>🌐 App / Website</span>
            </label>
          </fieldset>
          <label class="form-half">Tag (nhãn nhỏ)
            <input name="tag" value="${esc(item.tag || "")}" placeholder="PDF, App..." />
          </label>
        </div>
        <label>Nhóm (tuỳ chọn — vd "Tiếng Nhật")
          <input name="group" value="${esc(item.group || "")}" list="groupNames" placeholder="Để trống nếu không gom nhóm" />
          <datalist id="groupNames">${groupOpts}</datalist>
        </label>
        <label>Ảnh bìa (URL — để trống thì dùng icon + màu gradient)
          <input name="cover" value="${esc(item.cover || "")}" type="url" placeholder="https://..." />
        </label>
        <fieldset>
          <legend>Icon</legend>
          ${iconSelectHTML("icon", item.icon || "book")}
        </fieldset>
        <div class="form-actions">
          ${!isNew ? `<button type="button" class="ab-btn ab-btn-ghost ab-btn-danger" data-confirm-del>Xoá</button>` : ""}
          <span class="form-spacer"></span>
          <button type="button" class="ab-btn ab-btn-ghost" data-close>Huỷ</button>
          <button type="submit" class="ab-btn ab-btn-primary">${isNew ? "Thêm" : "Lưu"}</button>
        </div>
      </form>
    `);
    bindIconGrid($("#itemForm"));
    $("#itemForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const next = {
        title: (fd.get("title") || "").trim(),
        url: (fd.get("url") || "").trim(),
        desc: (fd.get("desc") || "").trim(),
        type: fd.get("type") || "book",
        group: (fd.get("group") || "").trim(),
        tag: (fd.get("tag") || "").trim(),
        cover: (fd.get("cover") || "").trim(),
        icon: fd.get("icon") || "book",
      };
      if (!next.title || !next.url) return;
      if (isNew) {
        topic.items = topic.items || [];
        topic.items.push(next);
      } else {
        topic.items[idx] = next;
      }
      this.markDirty();
      closeModal();
      toast(isNew ? "Đã thêm mục" : "Đã cập nhật mục");
    });
    const delBtn = $("#itemForm [data-confirm-del]");
    if (delBtn) delBtn.addEventListener("click", () => {
      closeModal();
      this.delItem(path);
    });
  },

  delItem(path) {
    const [catId, topicId, idxStr] = path.split("/");
    const topic = this.findTopic(catId, topicId);
    if (!topic) return;
    const idx = parseInt(idxStr, 10);
    const item = topic.items[idx];
    if (!item) return;
    if (!confirm(`Xoá mục "${item.title}"?`)) return;
    topic.items.splice(idx, 1);
    this.markDirty();
    toast("Đã xoá mục");
  },

  moveItem(path, dir) {
    const [catId, topicId, idxStr] = path.split("/");
    const topic = this.findTopic(catId, topicId);
    if (!topic) return;
    const idx = parseInt(idxStr, 10);
    const j = idx + dir;
    if (j < 0 || j >= topic.items.length) return;
    [topic.items[idx], topic.items[j]] = [topic.items[j], topic.items[idx]];
    this.markDirty();
  },
};

/* ---------- Khởi tạo ---------- */
function init() {
  $("#brandName").textContent = data.siteName || "Chỗ của Bi";
  if (data.tagline) $("#heroSub").textContent = data.tagline;
  document.title = data.siteName || "Chỗ của Bi";

  const eyebrow = $(".hero-eyebrow");
  if (eyebrow) {
    const d = new Date();
    const wd = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"][d.getDay()];
    eyebrow.textContent = `${wd}, ${d.getDate()} THÁNG ${d.getMonth() + 1}`;
  }

  $("#brandLogo").innerHTML = svgIcon("cat", 30);
  $("#discoverIcon").innerHTML = svgIcon("sparkles", 24);

  const art = $("#heroArt");
  if (art && !art.querySelector(".ha-sun")) {
    art.insertAdjacentHTML("beforeend", `
      <span class="ha-sun">${svgIcon("sun", 50)}</span>
      <span class="ha-cloud">${svgIcon("cloud", 52)}</span>
      <span class="ha-sakura ha-s1">${svgIcon("sakura", 26)}</span>
      <span class="ha-sakura ha-s2">${svgIcon("sakura", 20)}</span>
      <span class="ha-torii">${svgIcon("torii", 104)}</span>
      <span class="ha-cat">${svgIcon("cat", 52)}</span>`);
  }

  buildNav();
  render();

  let t;
  $("#searchInput").addEventListener("input", (e) => {
    clearTimeout(t);
    t = setTimeout(() => {
      state.query = e.target.value;
      render();
    }, 120);
  });

  // ----- Dark mode -----
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(THEME_KEY) || "light"; } catch {}
  const foot = $(".sidebar-foot");
  if (foot && !$("#themeToggle")) {
    const tb = document.createElement("button");
    tb.id = "themeToggle";
    tb.type = "button";
    tb.className = "theme-toggle";
    tb.title = "Đổi nền sáng / tối";
    tb.addEventListener("click", toggleTheme);
    foot.appendChild(tb);
  }
  applyTheme(savedTheme);

  // ----- Click: đã học / xem nhanh / lọc nhãn -----
  document.addEventListener("click", (e) => {
    const done = e.target.closest("[data-done]");
    if (done) {
      e.preventDefault(); e.stopPropagation();
      toggleDone(done.getAttribute("data-done"));
      render();
      return;
    }
    const prev = e.target.closest("[data-preview]");
    if (prev) {
      e.preventDefault(); e.stopPropagation();
      openPreview(prev.getAttribute("data-preview"));
      return;
    }
    const chip = e.target.closest("[data-filter-type]");
    if (chip) {
      e.preventDefault();
      state.filterType = chip.getAttribute("data-filter-type");
      render();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePreview();
  });

  // ----- PWA -----
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  admin.init();
}

document.addEventListener("DOMContentLoaded", init);
