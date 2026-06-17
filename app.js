/* ============================================================
   LINH CHI  —  Logic hiển thị (không cần chỉnh file này)
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

// Bảng màu nền dịu kiểu kawaii (chọn ổn định theo tên)
const PALETTES = [
  ["#ffe0e8", "#ffc9d6"], // sakura
  ["#fff0dd", "#ffe0bf"], // kem cam
  ["#e7f4e6", "#cfe9cf"], // matcha
  ["#e6f1fb", "#cfe2f5"], // sky
  ["#f3eafc", "#e2d3f3"], // lavender
  ["#fdeede", "#f8dcc6"], // peach
  ["#fdeaf0", "#f8d3e0"], // hồng nhạt
  ["#e9f6f3", "#d2ece6"], // mint
];
function paletteFor(text) {
  return PALETTES[hash(text) % PALETTES.length];
}

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const state = { active: "all", query: "" };

/* ---------- Render 1 mục (cell kiểu App Store) ---------- */
function renderCell(item) {
  const [c1, c2] = paletteFor(item.title);
  const isWeb = item.type === "website";
  const iconStyle = item.cover
    ? `background-image:url('${esc(item.cover)}');background-size:cover;background-position:center`
    : `background:linear-gradient(150deg, ${c1}, ${c2})`;
  const iconInner = item.cover ? "" : svgIcon(item.icon || (isWeb ? "globe" : "book"), 38);
  return `
    <a class="cell" href="${esc(item.url)}" target="_blank" rel="noopener">
      <span class="cell-icon" style="${iconStyle}">${iconInner}</span>
      <span class="cell-main">
        <span class="cell-title">${esc(item.title)}</span>
        ${item.desc ? `<span class="cell-sub">${esc(item.desc)}</span>` : ""}
        ${item.tag ? `<span class="cell-tag">${esc(item.tag)}</span>` : ""}
      </span>
      <span class="get-btn">Mở</span>
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

/* ---------- Render toàn bộ (kiểu kệ section App Store) ---------- */
function render() {
  const q = state.query.trim().toLowerCase();
  const searching = q.length > 0;
  const cats = siteData.categories.filter(
    (c) => state.active === "all" || c.id === state.active
  );

  let html = "";
  let total = 0;

  for (const cat of cats) {
    for (const topic of cat.topics || []) {
      const items = (topic.items || []).filter((it) => matchQuery(it, q));
      total += items.length;

      // Khi đang tìm kiếm, bỏ qua chủ đề không có kết quả
      if (searching && !items.length) continue;

      const body = items.length
        ? `<div class="cells">${items.map(renderCell).join("")}</div>`
        : `<div class="placeholder">${svgIcon("sakura", 28)} Sắp cập nhật nhé!</div>`;

      html += `
        <section class="shelf" id="sub-${esc(topic.id)}">
          <div class="shelf-head">
            <div class="shelf-titles">
              <p class="shelf-eyebrow">${svgIcon(cat.icon || "book", 16)} ${esc(cat.name)}</p>
              <h2>${esc(topic.name)}</h2>
              ${topic.description ? `<p class="shelf-desc">${esc(topic.description)}</p>` : ""}
            </div>
            ${items.length ? `<span class="shelf-count">${items.length} mục</span>` : ""}
          </div>
          ${body}
        </section>`;
    }
  }

  if (searching && !total) {
    html = `<div class="empty"><span class="big">${svgIcon("sakura", 64)}</span>Không tìm thấy nội dung nào.<br/>Thử từ khoá khác nhé!</div>`;
  }

  $("#sections").innerHTML = html;
}

/* ---------- Sidebar nav ---------- */
function buildNav() {
  const nav = $("#nav");
  for (const cat of siteData.categories) {
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.dataset.cat = cat.id;
    btn.innerHTML = `<span class="nav-emoji">${svgIcon(cat.icon || "book", 24)}</span> ${esc(cat.name)}`;
    nav.appendChild(btn);

    for (const topic of cat.topics || []) {
      const s = document.createElement("button");
      s.className = "nav-item nav-sub";
      s.dataset.cat = cat.id;
      s.dataset.sub = topic.id;
      s.textContent = topic.name;
      nav.appendChild(s);
    }
  }

  nav.addEventListener("click", (e) => {
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

/* ---------- Khởi tạo ---------- */
function init() {
  $("#brandName").textContent = siteData.siteName || "Linh Chi";
  if (siteData.tagline) $("#heroSub").textContent = siteData.tagline;
  document.title = (siteData.siteName || "Linh Chi") + " · Kho kiến thức";

  // Dòng ngày kiểu tab "Today" của App Store
  const eyebrow = $(".hero-eyebrow");
  if (eyebrow) {
    const d = new Date();
    const wd = ["CHỦ NHẬT", "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY"][d.getDay()];
    eyebrow.textContent = `${wd}, ${d.getDate()} THÁNG ${d.getMonth() + 1}`;
  }

  $("#brandLogo").innerHTML = svgIcon("cat", 30);
  $("#discoverIcon").innerHTML = svgIcon("sparkles", 24);

  const art = $("#heroArt");
  if (art) {
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
}

document.addEventListener("DOMContentLoaded", init);
