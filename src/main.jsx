import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);

// ─────────────────────────────────────────────────────────────────────────────
// Bật service worker để ứng dụng mở được khi mất mạng (chi tiết ở public/sw.js).
//
// Chỉ bật ở bản build. Ở chế độ dev nó sẽ giữ lại file cũ và biến mỗi lần sửa
// code thành một cuộc truy tìm cache — thứ không ai muốn gặp sát ngày thi.
// ─────────────────────────────────────────────────────────────────────────────
if ("serviceWorker" in navigator) {
  if (import.meta.env.DEV) {
    // Phòng khi ai đó chạy preview rồi chạy dev trên cùng một cổng: gỡ sạch
    // service worker cũ, không thì dev server sẽ phục vụ lại bản build cũ.
    navigator.serviceWorker.getRegistrations()
      .then((cai) => cai.forEach((r) => r.unregister()))
      .catch(() => {});
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" })
        .catch((e) => console.warn("[sw] không đăng ký được, ứng dụng vẫn chạy bình thường:", e?.message || e));
    });
  }
}
