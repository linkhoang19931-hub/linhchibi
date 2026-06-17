/* =============================================================
   CONFIG — Linh Chi
   -------------------------------------------------------------
   File này commit lên GitHub (KHÔNG chứa secret).
   Chỉ chứa URL của Cloudflare Worker đã deploy.

   Cách lấy URL:
     1. Deploy worker.js lên Cloudflare (xem SETUP.md).
     2. Sau khi deploy, CF cho 1 URL dạng:
          https://linhchi-api.<account>.workers.dev
     3. Dán URL đó vào WORKER_URL bên dưới.
     4. git add config.js && git commit -m "Cấu hình worker URL" && git push.
   ============================================================= */
window.LINHCHI_CONFIG = {
  // URL Worker đã deploy lên Cloudflare. Không có dấu / ở cuối.
  WORKER_URL: "https://linhchi-api.linkhoang19931.workers.dev",
};
