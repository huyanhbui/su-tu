#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// KIỂM TRA CHẠY OFFLINE.
//
//   npm run build && npm run preview        # cửa sổ khác
//   node scripts/e2e-offline.mjs http://localhost:4173
//
// Ngắt mạng thật bằng DevTools Protocol rồi mở lại từng trang. Trường học wifi
// chập chờn, hội trường thi càng tệ; phải biết chắc lúc rớt mạng thì học sinh
// vẫn quét thẻ đọc sử được, chứ không phải đoán.
//
// Đồng thời kiểm tra service worker KHÔNG cache lưu lượng Firebase — cache nhầm
// dữ liệu đăng nhập vừa làm hỏng đồng bộ, vừa có thể lẫn dữ liệu giữa học sinh.
// ─────────────────────────────────────────────────────────────────────────────
import { readFile } from "node:fs/promises";
import { check, finish, harnessError, openBrave, phaiSong, sleep } from "./cdp.mjs";
const APP = (process.argv[2] || "http://localhost:4173").replace(/\/+$/, "");

await phaiSong(APP, "Mở một cửa sổ khác và chạy:  npm run build && npm run preview");

let b;
try {
  b = await openBrave("390,1400");
  await b.send("Network.enable", {});

  await b.send("Page.navigate", { url: APP + "/c/N01" });
  await sleep(9000);
  const reg = await b.ev(`navigator.serviceWorker.getRegistration().then(r => r ? ({scope:r.scope, state:(r.active||{}).state}) : null)`);
  check("Service worker đăng ký và hoạt động", reg && reg.state === "activated", JSON.stringify(reg));
  const keys = await b.ev(`caches.keys()`);
  check("Có kho cache của bản build", (keys || []).some(k => k.startsWith("su-tu-")), JSON.stringify(keys));
  // Số file lấy từ chính dist/sw.js chứ không gõ cứng — thêm một tấm tranh là con
  // số đổi, gõ cứng thì bài kiểm tra sẽ hỏng vì lý do chẳng liên quan gì.
  const swSrc = await readFile(new URL("../dist/sw.js", import.meta.url), "utf8");
  const canCo = (swSrc.match(/^\s*"\/[^"]+",?$/gm) || []).length;
  const n = await b.ev(`caches.open(${JSON.stringify((keys||[])[0]||"x")}).then(c=>c.keys()).then(k=>k.length)`);
  check(`Kho chứa đủ ${canCo} file như danh sách trong dist/sw.js`, n === canCo, `${n} file`);

  const cross = await b.ev(`caches.open(${JSON.stringify((keys||[])[0]||"x")}).then(c=>c.keys())
    .then(k=>k.map(r=>new URL(r.url).host).filter(h=>h!==${JSON.stringify(new URL(APP).host)}))`);
  check("KHÔNG cache bất cứ thứ gì của Firebase/bên thứ ba", (cross || []).length === 0, JSON.stringify(cross));

  // Ngắt mạng thật sự rồi mở lại các trang.
  console.log("\n── Ngắt mạng ──");
  await b.send("Network.emulateNetworkConditions", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  for (const path of ["/c/N01", "/c/S01", "/me", "/"]) {
    await b.send("Page.navigate", { url: APP + path });
    await sleep(3500);
    const t = await b.ev(`document.body.innerText.replace(/\\s+/g," ").trim()`);
    const ok = t.length > 120 && !/offline|ERR_INTERNET|No internet|Không có kết nối/i.test(t);
    check(`Mất mạng vẫn mở được ${path}`, ok, `${t.length} ký tự: "${t.slice(0, 60)}…"`);
  }
} catch (e) { harnessError(e); }
finally { b?.close(); }
finish();
