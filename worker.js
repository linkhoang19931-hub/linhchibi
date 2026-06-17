/* =============================================================
   LINH CHI — Cloudflare Worker (admin backend)
   -------------------------------------------------------------
   Deploy lên Cloudflare Workers. Endpoints:
     POST /api/login   { username, password }  -> { token, exp }
     POST /api/save    Authorization: Bearer <token>
                       { data, message }       -> commit data.js
     GET  /api/ping                            -> { ok: true }

   Cần đặt các biến môi trường (Settings → Variables):
     ADMIN_USERNAME      (tên đăng nhập admin)
     ADMIN_PASSWORD      (mật khẩu admin) — set Secret
     SESSION_SECRET      (chuỗi 32+ ký tự ngẫu nhiên) — set Secret
     GITHUB_TOKEN        (Fine-grained PAT có Contents:Write) — set Secret
     GITHUB_REPO         (owner/repo, vd: linkhoang19931-hub/linhchibi)
     GITHUB_BRANCH       (mặc định "main", có thể bỏ)
     ALLOWED_ORIGINS     (CSV các origin được phép, vd: "https://your-domain,https://owner.github.io")
   ============================================================= */

const SESSION_TTL = 24 * 60 * 60; // 24h
const TOKEN_VERSION = "v1";

const DATA_HEADER = `/* =============================================================
   DỮ LIỆU WEBSITE  —  Linh Chi
   -------------------------------------------------------------
   File này được sinh tự động qua UI admin trên linhchibi.io.vn.
   ============================================================= */
`;

/* ---------- utils ---------- */

function safeEqual(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacHex(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function signToken(secret, username) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL;
  const payload = `${TOKEN_VERSION}.${username}.${exp}`;
  const sig = await hmacHex(secret, payload);
  return { token: `${payload}.${sig}`, exp };
}

async function verifyToken(secret, token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [ver, username, exp, sig] = parts;
  if (ver !== TOKEN_VERSION) return null;
  if (parseInt(exp, 10) < Math.floor(Date.now() / 1000)) return null;
  const expected = await hmacHex(secret, `${ver}.${username}.${exp}`);
  if (!safeEqual(sig, expected)) return null;
  return { username, exp: parseInt(exp, 10) };
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/* ---------- CORS ---------- */

function corsHeaders(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  const allowOrigin = allowed.length === 0 || allowed.includes(origin) ? (origin || "*") : "null";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(body, status, req, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(req, env),
    },
  });
}

/* ---------- handlers ---------- */

async function handleLogin(req, env) {
  let body;
  try { body = await req.json(); }
  catch { return jsonResponse({ ok: false, error: "JSON không hợp lệ" }, 400, req, env); }

  const username = String(body?.username || "");
  const password = String(body?.password || "");
  if (!username || !password) {
    return jsonResponse({ ok: false, error: "Thiếu tên đăng nhập hoặc mật khẩu" }, 400, req, env);
  }

  // Nhả một chút trễ ngẫu nhiên (~150-300ms) để chậm brute-force.
  await new Promise(r => setTimeout(r, 150 + Math.floor(Math.random() * 150)));

  const okUser = safeEqual(username, env.ADMIN_USERNAME || "");
  const okPass = safeEqual(password, env.ADMIN_PASSWORD || "");
  if (!okUser || !okPass) {
    return jsonResponse({ ok: false, error: "Sai tên đăng nhập hoặc mật khẩu" }, 401, req, env);
  }
  if (!env.SESSION_SECRET) {
    return jsonResponse({ ok: false, error: "Server chưa set SESSION_SECRET" }, 500, req, env);
  }

  const { token, exp } = await signToken(env.SESSION_SECRET, username);
  return jsonResponse({ ok: true, token, exp }, 200, req, env);
}

async function handleSave(req, env) {
  const auth = req.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = await verifyToken(env.SESSION_SECRET || "", token);
  if (!session) {
    return jsonResponse({ ok: false, error: "Phiên không hợp lệ hoặc hết hạn — đăng nhập lại" }, 401, req, env);
  }

  let body;
  try { body = await req.json(); }
  catch { return jsonResponse({ ok: false, error: "JSON không hợp lệ" }, 400, req, env); }

  const data = body?.data;
  if (!data || typeof data !== "object" || !Array.isArray(data.categories)) {
    return jsonResponse({ ok: false, error: "Thiếu trường `data` hợp lệ" }, 400, req, env);
  }
  const message = String(body?.message || `Update via admin (${session.username})`).slice(0, 200);

  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH || "main";
  if (!repo || !env.GITHUB_TOKEN) {
    return jsonResponse({ ok: false, error: "Server thiếu GITHUB_REPO / GITHUB_TOKEN" }, 500, req, env);
  }

  const content = `${DATA_HEADER}\nconst siteData = ${JSON.stringify(data, null, 2)};\n`;
  const contentB64 = utf8ToBase64(content);

  const apiBase = `https://api.github.com/repos/${repo}/contents/data.js`;
  const ghHeaders = {
    "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "linhchi-admin-worker",
    "Accept": "application/vnd.github+json",
  };

  // 1. Lấy SHA hiện tại (nếu file đã tồn tại)
  let sha;
  const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers: ghHeaders });
  if (getRes.ok) {
    const j = await getRes.json();
    sha = j.sha;
  } else if (getRes.status !== 404) {
    const txt = await getRes.text();
    return jsonResponse({ ok: false, error: `GitHub GET ${getRes.status}: ${txt.slice(0, 200)}` }, 502, req, env);
  }

  // 2. PUT file mới
  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: { ...ghHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: contentB64,
      sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const txt = await putRes.text();
    return jsonResponse({ ok: false, error: `GitHub PUT ${putRes.status}: ${txt.slice(0, 220)}` }, 502, req, env);
  }
  const result = await putRes.json();
  return jsonResponse({
    ok: true,
    pushed: true,
    sha: result.content?.sha,
    commitUrl: result.commit?.html_url,
    message: "Đã commit lên GitHub. GitHub Pages sẽ cập nhật trong ~1 phút.",
  }, 200, req, env);
}

/* ---------- entry ---------- */

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req, env) });
    }

    try {
      if (url.pathname === "/api/login" && req.method === "POST") {
        return await handleLogin(req, env);
      }
      if (url.pathname === "/api/save" && req.method === "POST") {
        return await handleSave(req, env);
      }
      if (url.pathname === "/api/ping") {
        return jsonResponse({ ok: true, ts: Date.now() }, 200, req, env);
      }
      return jsonResponse({ ok: false, error: "Not found" }, 404, req, env);
    } catch (err) {
      return jsonResponse({ ok: false, error: `Server error: ${err.message}` }, 500, req, env);
    }
  },
};
