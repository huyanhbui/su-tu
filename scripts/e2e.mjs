#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// KIỂM TRA LUỒNG THẬT, chạy trên trình duyệt thật.
//
//   node scripts/e2e.mjs                          # kiểm tra bản dev ở localhost:5173
//   node scripts/e2e.mjs https://ten-mien.xyz     # kiểm tra bản đã lên mạng
//
// Chạy cái này TRƯỚC BUỔI DEMO, trên đúng đường mạng sẽ dùng. Nó đi đúng con
// đường học sinh đi: quét thẻ → vào lớp → trả lời sai → tải lại trang → xem
// bảng xếp hạng → xem bảng theo dõi của giáo viên.
//
// Vì sao phải có: từng có lỗi khiến câu trả lời SAI hiện thành ĐÚNG sau khi tải
// lại trang. Đọc code không thấy được lỗi đó — phải bấm thật mới lộ ra.
// ─────────────────────────────────────────────────────────────────────────────
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = (process.argv[2] || "http://localhost:5173").replace(/\/+$/, "");
// Cổng gỡ lỗi phải ngẫu nhiên. Cổng cố định thì nếu trên máy còn một phiên Brave
// cũ đang giữ cổng đó, bài kiểm tra sẽ lặng lẽ nối vào TRÌNH DUYỆT CŨ và báo hỏng
// những thứ hoàn toàn lành lặn. Đã dính đúng một lần rồi.
const PORT = 9200 + Math.floor(Math.random() * 700);
const CLASS = "ZZTEST";

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

await phaiSong(BASE, "Mở một cửa sổ khác và chạy:  npm run dev");

const NICK = "E2EBot" + Math.floor(Math.random() * 900 + 100);
let NICK2 = NICK;   // biệt danh thứ hai, dùng khi đóng vai học sinh mới ở giữa bài

const brave = spawn("brave", [
  "--headless", "--disable-gpu", `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/e2e-brave-" + Date.now(),
  "--no-first-run", "--window-size=390,2000", "about:blank",
], { stdio: "ignore" });

let ws, id = 0;
const pending = new Map();
function send(method, params = {}, sessionId) {
  return new Promise((res, rej) => {
    const m = ++id;
    pending.set(m, { res, rej });
    ws.send(JSON.stringify({ id: m, method, params, sessionId }));
  });
}
async function evalJs(expr, sessionId) {
  const r = await send("Runtime.evaluate", {
    expression: expr, awaitPromise: true, returnByValue: true,
  }, sessionId);
  if (r.exceptionDetails) throw new Error(expr + " → " + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails));
  return r.result?.value;
}

const fails = [];
function check(name, cond, detail = "") {
  console.log((cond ? "  PASS  " : "  FAIL  ") + name + (detail ? "  — " + detail : ""));
  if (!cond) fails.push(name + (detail ? " — " + detail : ""));
}

try {
  // chờ CDP mở cổng
  let list;
  for (let i = 0; i < 60; i++) {
    try { list = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; }
    catch { await sleep(250); }
  }
  if (!list) throw new Error("Brave không mở được cổng gỡ lỗi");

  ws = new WebSocket(list.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id); pending.delete(m.id);
      if (m.error) rej(new Error(JSON.stringify(m.error))); else res(m.result);
    }
  };

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = sessionId;
  await send("Runtime.enable", {}, S);

  async function goto(url) {
    await send("Page.enable", {}, S);
    await send("Page.navigate", { url }, S);
    for (let i = 0; i < 80; i++) {
      await sleep(250);
      const st = await evalJs("document.readyState", S).catch(() => null);
      if (st === "complete") break;
    }
    await sleep(1800); // để React + Firebase kịp dựng
  }

  // React ghi đè setter của input, nên phải gán qua prototype rồi tự bắn sự kiện
  // "input"; gán thẳng el.value thì DOM đổi mà state của React vẫn rỗng.
  const fillGate = (nick, code) => `(() => {
    const els = document.querySelectorAll(".gate input");
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    set.call(els[0], ${JSON.stringify(nick)}); els[0].dispatchEvent(new Event("input", { bubbles: true }));
    set.call(els[1], ${JSON.stringify(code)}); els[1].dispatchEvent(new Event("input", { bubbles: true }));
    return els[0].value + "/" + els[1].value;
  })()`;

  console.log(`\n── Luồng quét thẻ N01, biệt danh ${NICK}, lớp ${CLASS} ──`);
  await goto(`${BASE}/c/N01`);

  const backend = await evalJs(`document.body.innerText.includes("Vào lớp để bắt đầu tính điểm")`, S);
  check("Quét thẳng vào thẻ thì hiện cửa vào lớp", backend === true);
  check("Phần lịch sử vẫn đọc được khi chưa vào lớp",
    await evalJs(`document.body.innerText.includes("Trận Địa Cọc Ngầm")`, S) === true);
  check("Chưa vào lớp thì chưa hiện câu hỏi",
    await evalJs(`document.querySelectorAll(".quiz").length === 0`, S) === true);

  const inputs = await evalJs(`document.querySelectorAll(".gate input").length`, S);
  check("Cửa vào lớp có 2 ô nhập", inputs === 2, "thấy " + inputs);

  await evalJs(fillGate(NICK, CLASS), S);
  await evalJs(`document.querySelector(".gate button[type=submit]").click()`, S);
  await sleep(2500);

  const nQuiz = await evalJs(`document.querySelectorAll(".quiz").length`, S);
  check("Vào lớp xong thì câu hỏi hiện ra ngay tại thẻ vừa quét", nQuiz > 0, nQuiz + " câu");

  // Chọn CỐ Ý SAI ở câu đầu tiên.
  const wrongInfo = await evalJs(`(() => {
    const quiz = document.querySelector(".quiz");
    const btns = [...quiz.querySelectorAll(".choice")];
    // Q01 đáp án đúng là "Ngô Quyền" — chọn ô khác.
    const i = btns.findIndex(b => !b.innerText.includes("Ngô Quyền"));
    btns[i].click();
    return { i, text: btns[i].innerText.trim() };
  })()`, S);
  await sleep(2500);

  const afterWrong = await evalJs(`(() => {
    const q = document.querySelector(".quiz");
    return {
      verdict: q.querySelector(".explain strong")?.innerText || null,
      wrongMarked: q.querySelectorAll(".choice.wrong").length,
      wrongText: q.querySelector(".choice.wrong")?.innerText.trim() || null,
      xp: document.querySelector(".lvxp")?.innerText || null,
    };
  })()`, S);
  check("Chọn sai thì báo 'Chưa đúng'", afterWrong.verdict === "Chưa đúng", String(afterWrong.verdict));
  check("Chọn sai thì không được cộng XP", afterWrong.xp === "0 XP", String(afterWrong.xp));

  // ── ĐÂY LÀ BÀI KIỂM TRA CHÍNH: tải lại trang ──
  console.log("\n── Tải lại trang (bài kiểm tra cho lỗi vừa sửa) ──");
  await goto(`${BASE}/c/N01`);

  const afterReload = await evalJs(`(() => {
    const q = document.querySelector(".quiz");
    if (!q) return { none: true };
    return {
      verdict: q.querySelector(".explain strong")?.innerText || null,
      wrongText: q.querySelector(".choice.wrong")?.innerText.trim() || null,
      locked: [...q.querySelectorAll(".choice")].every(b => b.disabled),
    };
  })()`, S);

  check("Tải lại vẫn nhớ đã vào lớp (câu hỏi hiện luôn)", !afterReload.none);
  check("Tải lại KHÔNG biến câu sai thành câu đúng",
    afterReload.verdict === "Chưa đúng", "thấy: " + String(afterReload.verdict));
  check("Tải lại vẫn đánh dấu đúng ô mình đã chọn sai",
    afterReload.wrongText === wrongInfo.text,
    `chọn "${wrongInfo.text}" → hiện "${afterReload.wrongText}"`);
  check("Câu đã trả lời thì khoá lại, không bấm lại được", afterReload.locked === true);

  // Trả lời ĐÚNG một câu để kiểm tra đường cộng XP.
  // ── Đường cộng điểm ──────────────────────────────────────────────────────
  // Muốn kiểm tra đường TRẢ LỜI ĐÚNG thì phải biết đáp án. Không chép cứng đáp
  // án vào đây (sửa câu hỏi là bài kiểm tra hỏng theo), mà học từ chính giao diện:
  // câu đã trả lời luôn tô ô đúng bằng class `.choice.right`. Học xong thì xoá
  // sạch bộ nhớ, đóng vai một học sinh MỚI, rồi bấm thẳng vào ô đúng đó.
  console.log("\n── Đường cộng điểm ──");
  const keyed = await evalJs(`(() => {
    const q = [...document.querySelectorAll(".quiz")].find(x => x.querySelector(".explain"));
    if (!q) return { none: true };
    const btns = [...q.querySelectorAll(".choice")];
    return {
      right: btns.findIndex(b => b.classList.contains("right")),
      lv: q.querySelector(".lv")?.innerText.trim(),
    };
  })()`, S);
  check("Giao diện có chỉ ra ô đúng sau khi trả lời", !keyed.none && keyed.right >= 0,
    "ô " + "ABCD"[keyed.right]);

  const XP = { "NHẬN BIẾT": 10, "THÔNG HIỂU": 20, "VẬN DỤNG": 30 };
  await evalJs(`(() => { try { localStorage.clear(); } catch {} 
    return indexedDB.databases ? indexedDB.databases().then(ds =>
      Promise.all(ds.map(d => new Promise(r => { const q = indexedDB.deleteDatabase(d.name); q.onsuccess = q.onerror = q.onblocked = r; })))
    ).then(() => "wiped") : "no-idb"; })()`, S);
  await goto(`${BASE}/c/N01`);

  NICK2 = "E2EBot" + Math.floor(Math.random() * 900 + 100);
  await evalJs(fillGate(NICK2, CLASS), S);
  await evalJs(`document.querySelector(".gate button[type=submit]").click()`, S);
  await sleep(2500);

  const before = await evalJs(`document.querySelector(".lvxp")?.innerText || "0 XP"`, S);
  await evalJs(`(() => {
    const q = document.querySelectorAll(".quiz")[0];
    q.querySelectorAll(".choice")[${keyed.right}].click();
  })()`, S);
  await sleep(2500);
  const scored = await evalJs(`(() => ({
    xp: document.querySelector(".lvxp")?.innerText || "",
    verdict: document.querySelector(".quiz .explain strong")?.innerText || "",
  }))()`, S);
  const num = (t) => parseInt(String(t).replace(/[^0-9]/g, ""), 10) || 0;
  const want = XP[keyed.lv] ?? -1;
  check("Học sinh mới bắt đầu từ 0 XP", num(before) === 0, before);
  check("Bấm đúng ô đáp án thì báo 'Chính xác'", scored.verdict === "Chính xác", scored.verdict);
  check(`Trả lời đúng câu ${keyed.lv} thì cộng ${want} XP`,
    num(scored.xp) === want, "thực tế " + scored.xp);

  // Bảng xếp hạng — chứng minh index composite đã chạy được.
  console.log("\n── Bảng xếp hạng (kiểm tra index Firestore) ──");
  await goto(`${BASE}/board/${CLASS}`);
  const board = await evalJs(`(() => ({
    rows: document.querySelectorAll(".rank li").length,
    text: document.body.innerText.slice(0, 400),
    warn: !!document.querySelector(".warnbar"),
  }))()`, S);
  check("Bảng xếp hạng chạy trên Firestore, không lùi về bản máy", board.warn === false);
  // NICK2 chứ không phải NICK: giữa bài kiểm tra ta đã xoá bộ nhớ và đóng vai một
  // học sinh mới. Ở chế độ localStorage, bảng xếp hạng chỉ thấy chính thiết bị này.
  check("Bảng xếp hạng thấy người vừa chơi (index composite đã sẵn sàng)",
    board.rows > 0 && board.text.includes(NICK2), `${board.rows} dòng`);

  // Teacher Dashboard
  console.log("\n── Teacher Dashboard ──");
  await goto(`${BASE}/t/${CLASS}`);
  const t = await evalJs(`(() => ({
    text: document.body.innerText.slice(0, 700),
    rows: document.querySelectorAll("tbody tr").length,
  }))()`, S);
  check("Dashboard nhận được dữ liệu của lớp", t.rows > 0 && !/^0 *Lượt/.test(t.text), `${t.rows} dòng câu hỏi`);
  console.log("\n--- trích màn hình dashboard ---\n" + t.text.split("\n").slice(0, 14).join("\n"));

  // ── Đổi người chơi ───────────────────────────────────────────────────────
  // Danh tính gắn với thiết bị, nên đổi biệt danh KHÔNG xoá tiến trình — đó là
  // chủ ý. Vì vậy phải có đường làm lại từ đầu cho máy dùng chung, và đường đó
  // phải thật sự xoá sạch chứ không chỉ đổi cái nhãn.
  console.log("\n── Đổi người chơi ──");
  await goto(`${BASE}/c/N01`);
  const trcReset = await evalJs(`(async () => {
    const m = await import("/src/lib/store.js"); const p = await m.getPlayer();
    return { uid: p.uid, xp: p.xp, cau: Object.keys(p.answers || {}).length };
  })()`, S).catch(() => null);

  if (!trcReset) {
    console.log("  BỎ QUA  — chỉ chạy được với bản dev (cần nạp module nguồn)");
  } else {
    check("Có tiến trình trước khi đổi", trcReset.xp > 0 || trcReset.cau > 0,
      `${trcReset.xp} XP, ${trcReset.cau} câu`);
    const sauReset = await evalJs(`(async () => {
      const m = await import("/src/lib/store.js"); await m.resetIdentity();
      const p = await m.getPlayer();
      return { uid: p.uid, xp: p.xp, cau: Object.keys(p.answers || {}).length,
               nickname: p.nickname, classCode: p.classCode };
    })()`, S);
    check("Đổi người chơi cấp mã thiết bị mới", trcReset.uid !== sauReset.uid);
    check("Đổi người chơi xoá sạch XP và câu đã trả lời",
      sauReset.xp === 0 && sauReset.cau === 0, `${sauReset.xp} XP, ${sauReset.cau} câu`);
    check("Đổi người chơi xoá cả biệt danh và mã lớp",
      !sauReset.nickname && !sauReset.classCode);
  }

} catch (e) {
  console.error("\nLỖI KHI CHẠY:", e.message);
  fails.push("harness: " + e.message);
} finally {
  try { ws?.close(); } catch { /* ignore */ }
  brave.kill("SIGKILL");
}

console.log("\n" + (fails.length ? `THẤT BẠI ${fails.length}:\n- ` + fails.join("\n- ") : "TẤT CẢ ĐỀU ĐẠT"));
process.exit(fails.length ? 1 : 0);
