// ─────────────────────────────────────────────────────────────────────────────
// SERVICE WORKER — để SỬ TỰ vẫn mở được khi mất mạng.
//
// Lớp học ở trường và hội trường thi khởi nghiệp đều dùng wifi chập chờn. Toàn
// bộ nội dung thẻ bài và câu hỏi đã nằm sẵn trong gói JS, nên chỉ cần giữ lại
// phần vỏ ứng dụng là học sinh vẫn quét QR, đọc sử và trả lời được lúc rớt mạng.
//
// Viết tay, không dùng Workbox: chủ dự án phải đứng trước ban giám khảo và giải
// thích được hệ thống của chính mình. Bảy chục dòng đọc hiểu được đáng giá hơn
// một thư viện không đọc nổi.
// ─────────────────────────────────────────────────────────────────────────────

/* SU-TU:PRECACHE:BEGIN — vùng này do vite.config.js ghi lại lúc build. ĐỪNG SỬA TAY. */
const BUILD = "dev";
const PRECACHE = ["/index.html"];
/* SU-TU:PRECACHE:END */

// Tên kho đổi theo nội dung mỗi lần build. Nhờ vậy bản build tuần trước không
// thể còn sống sót trong máy để phục vụ nhầm giữa buổi demo.
const CACHE = `su-tu-${BUILD}`;

// Vỏ ứng dụng. Mọi điều hướng lúc mất mạng đều trả về file này rồi để React
// Router lo phần còn lại; thiếu nó thì /c/N01 hỏng dù JS đã nằm sẵn trong kho.
const SHELL = "/index.html";

// Firebase Auth và Firestore KHÔNG bao giờ được đưa vào kho. Câu trả lời đã lưu
// là dữ liệu riêng của từng học sinh: phục vụ lại một bản cũ vừa làm hỏng đồng
// bộ, vừa có thể đưa nhầm dữ liệu bạn này cho bạn khác. Chặn tường minh ở đây
// để sau này ai sửa file cũng thấy, đừng dựa vào việc chúng khác gốc.
const KHONG_LUU = /(^|\.)(googleapis\.com|firebaseio\.com|firebaseapp\.com|gstatic\.com)$/i;

// Chỉ hai thư mục này mới được lưu thêm lúc chạy: /assets/* có mã băm trong tên
// nên không bao giờ trùng nội dung cũ, /art/* là ảnh thẻ bài đã in ra giấy,
// không đổi nữa. Lấy từ kho trước là an toàn.
const TINH = /^\/(assets|art)\//;

self.addEventListener("install", (e) => {
  // addAll là "được ăn cả, ngã về không": thiếu một file thì cài đặt hỏng hẳn và
  // service worker cũ vẫn phục vụ tiếp. Thà thế còn hơn một kho vá víu nửa vời
  // mà đến lúc mất mạng mới biết là thiếu.
  e.waitUntil(
    caches.open(CACHE)
      .then((kho) => kho.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const ten = await caches.keys();
    await Promise.all(
      ten.filter((t) => t.startsWith("su-tu-") && t !== CACHE).map((t) => caches.delete(t))
    );
    // Chiếm quyền ngay, khỏi bắt người dùng đóng hết tab mới thấy bản mới.
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;                 // ghi dữ liệu thì luôn phải ra mạng

  const url = new URL(req.url);
  if (KHONG_LUU.test(url.hostname)) return;         // Firebase: đi thẳng, xem ghi chú trên
  if (url.origin !== self.location.origin) return;  // gì khác của người ta thì để trình duyệt lo

  // Điều hướng (/, /c/N01, /me, /board/...): ưu tiên mạng để nhận bản mới nhất,
  // rớt mạng thì lấy vỏ trong kho. Đây chính là chỗ giữ cho link QR chạy offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(async () => (await caches.match(SHELL)) || Response.error()));
    return;
  }

  // Ngoài vỏ và hai thư mục tĩnh thì không đụng tới, cứ để mạng xử lý như thường.
  if (!TINH.test(url.pathname) && !PRECACHE.includes(url.pathname)) return;

  e.respondWith((async () => {
    const co = await caches.match(req);
    if (co) return co;                              // đã có trong kho thì khỏi hỏi mạng
    const res = await fetch(req);
    if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  })());
});
