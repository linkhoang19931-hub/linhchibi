/* =============================================================
   DỮ LIỆU WEBSITE  —  Linh Chi
   -------------------------------------------------------------
   👉 ĐÂY LÀ FILE DUY NHẤT CẦN CHỈNH ĐỂ THÊM NỘI DUNG.

   CẤU TRÚC 3 CẤP:
   1) CATEGORY lớn   : Học tập, Công việc ...
   2) CHỦ ĐỀ (topic) : trong "Học tập" có Tiếng Nhật, Tiếng Anh...
                       trong "Công việc" có Luật, Công nghệ...
   3) MỤC (item)     : từng cuốn sách / app / website.

   MỖI MỤC (item) gồm:
     title : Tên hiển thị (bắt buộc)
     type  : "book"  -> hiện dạng bìa sách (cho tài liệu / Google Drive)
             "website" -> hiện dạng thẻ app/website
     url   : Link (bắt buộc)
     desc  : Mô tả ngắn (không bắt buộc)
     tag   : Nhãn nhỏ góc thẻ, vd "PDF", "App" (không bắt buộc)
     icon  : Icon dễ thương, chọn 1 trong:
             book | torii | scale | courthouse | sakura | cat | globe | laptop | sparkles
     cover : Link ảnh bìa thật nếu có (không bắt buộc)

   Trong 1 chủ đề, các mục "book" gom vào khung "Tài liệu",
   các mục "website" gom vào khung "App & Website" (tự động).

   THÊM CHỦ ĐỀ MỚI: copy 1 khối topic { ... } rồi đổi id, name, items.
   Chủ đề chưa có nội dung (items: []) sẽ hiện "Sắp cập nhật".
   Nhớ giữ dấu phẩy "," ở cuối mỗi khối.
   ============================================================= */

const siteData = {
  siteName: "Linh Chi",
  tagline: "Sách hay, tài liệu và app hữu ích",

  categories: [
    /* ==================== HỌC TẬP ==================== */
    {
      id: "hoc-tap",
      name: "Học tập",
      icon: "sakura",
      description: "Học mỗi ngày một chút — がんばって！",
      topics: [
        {
          id: "tieng-nhat",
          name: "Tiếng Nhật",
          icon: "torii",
          description: "Ngôn ngữ · 日本語",
          items: [
            {
              title: "Sách học tiếng Nhật",
              type: "book",
              desc: "Giáo trình PDF · Google Drive",
              url: "https://drive.google.com/file/d/1HqmRujh8ZYCbcZJiEzIU3tINI8nx8wiX/view?usp=drive_link",
              tag: "PDF",
              icon: "book",
            },
            {
              title: "App học tiếng Nhật Chibi",
              type: "website",
              desc: "Học từ vựng & kaiwa online",
              url: "https://linkhoang19931-hub.github.io/linhchibi_japan/#home",
              tag: "App",
              icon: "torii",
            },
          ],
        },
      ],
    },

    /* ==================== CÔNG VIỆC ==================== */
    {
      id: "cong-viec",
      name: "Công việc",
      icon: "scale",
      description: "Tài liệu & công cụ phục vụ công việc.",
      topics: [
        {
          id: "luat",
          name: "Luật",
          icon: "scale",
          description: "Ôn thi & tài liệu ngành Luật ⚖️",
          items: [
            {
              title: "Sách ôn thi Luật",
              type: "book",
              desc: "Tài liệu PDF · Google Drive",
              url: "https://drive.google.com/file/d/1z0IcnO8b7xiXGE51V-utJpkkgIJpg1pc/view?usp=drive_link",
              tag: "PDF",
              icon: "scale",
            },
            {
              title: "App ôn thi Luật Chibi",
              type: "website",
              desc: "Luyện đề & ôn tập online",
              url: "https://linkhoang19931-hub.github.io/app_chibi_law/",
              tag: "App",
              icon: "courthouse",
            },
          ],
        },
        {
          id: "cong-nghe",
          name: "Công nghệ",
          icon: "laptop",
          description: "Lập trình, công cụ, tài liệu kỹ thuật.",
          items: [
            // Chưa có nội dung — thêm sách/app vào đây theo mẫu ở trên.
          ],
        },
      ],
    },
  ],
};
