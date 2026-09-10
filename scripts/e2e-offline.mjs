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
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
const PORT = 9500 + Math.floor(Math.random() * 300);
const APP = (process.argv[2] || "http://localhost:4173").replace(/\/+$/, "");

// Kiểm tra máy chủ có sống không TRƯỚC khi mở trình duyệt.
// Vì sao phải có: một lần cổng mặc định sai (5177 trong khi `npm run dev` chạy ở
// 5173) đã khiến bài kiểm tra báo bốn lỗi nghe như lỗi ứng dụng, trong khi thật ra
// nó đang nói chuyện với một cái cổng không có ai nghe. Thà không chạy còn hơn
// chạy rồi đổ oan cho phần mềm.
async function phaiSong(url, goiY) {
  try {
    const r = await fetch(url, { redirect: "manual" });
    if (r.status >= 500) throw new Error("HTTP " + r.status);
  } catch (e) {
    console.error(`\n✗ Không kết nối được tới ${url}`);
    console.error(`  (${e.message})\n`);
    console.error(`  ${goiY}\n`);
    console.error(`  Hoặc chỉ rõ địa chỉ khác:  node ${process.argv[1].split("/").pop()} <địa-chỉ>\n`);
    process.exit(1);
  }
}

await phaiSong(APP, "Mở một cửa sổ khác và chạy:  npm run build && npm run preview");

const brave = spawn("brave", ["--headless", "--disable-gpu", "--no-sandbox", "--no-zygote",
  `--remote-debugging-port=${PORT}`, "--user-data-dir=/tmp/off-" + Date.now(),
  "--no-first-run", "--window-size=390,1400", "about:blank"], { stdio: "ignore" });
let ws, id = 0; const pending = new Map();
const send = (m, p = {}, s) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method: m, params: p, sessionId: s })); });
const ev = async (e, S) => { const r = await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true }, S); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || "exc"); return r.result?.value; };
const fails = [];
const check = (n, c, d = "") => { console.log((c ? "  PASS  " : "  FAIL  ") + n + (d ? "  — " + d : "")); if (!c) fails.push(n); };
try {
  let v; for (let i = 0; i < 60; i++) { try { v = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break } catch { await sleep(250) } }
  ws = new WebSocket(v.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); if (m.error) rej(new Error(JSON.stringify(m.error))); else res(m.result); } };
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId: S } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Runtime.enable", {}, S); await send("Page.enable", {}, S); await send("Network.enable", {}, S);

  await send("Page.navigate", { url: APP + "/c/N01" }, S);
  await sleep(9000);
  const reg = await ev(`navigator.serviceWorker.getRegistration().then(r => r ? ({scope:r.scope, state:(r.active||{}).state}) : null)`, S);
  check("Service worker đăng ký và hoạt động", reg && reg.state === "activated", JSON.stringify(reg));
  const keys = await ev(`caches.keys()`, S);
  check("Có kho cache của bản build", (keys || []).some(k => k.startsWith("su-tu-")), JSON.stringify(keys));
  // Số file lấy từ chính dist/sw.js chứ không gõ cứng — thêm một tấm tranh là con
  // số đổi, gõ cứng thì bài kiểm tra sẽ hỏng vì lý do chẳng liên quan gì.
  const swSrc = await readFile(new URL("../dist/sw.js", import.meta.url), "utf8");
  const canCo = (swSrc.match(/^\s*"\/[^"]+",?$/gm) || []).length;
  const n = await ev(`caches.open(${JSON.stringify((keys||[])[0]||"x")}).then(c=>c.keys()).then(k=>k.length)`, S);
  check(`Kho chứa đủ ${canCo} file như danh sách trong dist/sw.js`, n === canCo, `${n} file`);

  const cross = await ev(`caches.open(${JSON.stringify((keys||[])[0]||"x")}).then(c=>c.keys())
    .then(k=>k.map(r=>new URL(r.url).host).filter(h=>h!==${JSON.stringify(new URL(APP).host)}))`, S);
  check("KHÔNG cache bất cứ thứ gì của Firebase/bên thứ ba", (cross || []).length === 0, JSON.stringify(cross));

  // Ngắt mạng thật sự rồi mở lại các trang.
  console.log("\n── Ngắt mạng ──");
  await send("Network.emulateNetworkConditions", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 }, S);
  for (const path of ["/c/N01", "/c/S01", "/me", "/"]) {
    await send("Page.navigate", { url: APP + path }, S);
    await sleep(3500);
    const t = await ev(`document.body.innerText.replace(/\\s+/g," ").trim()`, S);
    const ok = t.length > 120 && !/offline|ERR_INTERNET|No internet|Không có kết nối/i.test(t);
    check(`Mất mạng vẫn mở được ${path}`, ok, `${t.length} ký tự: "${t.slice(0, 60)}…"`);
  }
} catch (e) { console.error("LỖI:", e.message); fails.push("harness"); }
finally { try { ws?.close() } catch {} brave.kill("SIGKILL"); }
console.log("\n" + (fails.length ? `THẤT BẠI ${fails.length}: ` + fails.join("; ") : "TẤT CẢ ĐỀU ĐẠT"));
process.exit(fails.length ? 1 : 0);
