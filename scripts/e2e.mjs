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
import { check, finish, harnessError, openBrave, phaiSong, sleep } from "./cdp.mjs";

const BASE = (process.argv[2] || "http://localhost:5173").replace(/\/+$/, "");
const CLASS = "ZZTEST";

await phaiSong(BASE, "Mở một cửa sổ khác và chạy:  npm run dev");

const NICK = "E2EBot" + Math.floor(Math.random() * 900 + 100);
let NICK2 = NICK;   // biệt danh thứ hai, dùng khi đóng vai học sinh mới ở giữa bài

let b;
try {
  b = await openBrave("390,2000");

  async function goto(url) {
    await b.send("Page.navigate", { url });
    for (let i = 0; i < 80; i++) {
      await sleep(250);
      const st = await b.ev("document.readyState").catch(() => null);
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

  const backend = await b.ev(`document.body.innerText.includes("Vào lớp để bắt đầu tính điểm")`);
  check("Quét thẳng vào thẻ thì hiện cửa vào lớp", backend === true);
  check("Phần lịch sử vẫn đọc được khi chưa vào lớp",
    await b.ev(`document.body.innerText.includes("Trận Địa Cọc Ngầm")`) === true);
  check("Chưa vào lớp thì chưa hiện câu hỏi",
    await b.ev(`document.querySelectorAll(".quiz").length === 0`) === true);

  const inputs = await b.ev(`document.querySelectorAll(".gate input").length`);
  check("Cửa vào lớp có 2 ô nhập", inputs === 2, "thấy " + inputs);

  await b.ev(fillGate(NICK, CLASS));
  await b.ev(`document.querySelector(".gate button[type=submit]").click()`);
  await sleep(2500);

  const nQuiz = await b.ev(`document.querySelectorAll(".quiz").length`);
  check("Vào lớp xong thì câu hỏi hiện ra ngay tại thẻ vừa quét", nQuiz > 0, nQuiz + " câu");

  // Chọn CỐ Ý SAI ở câu đầu tiên.
  const wrongInfo = await b.ev(`(() => {
    const quiz = document.querySelector(".quiz");
    const btns = [...quiz.querySelectorAll(".choice")];
    // Q01 đáp án đúng là "Ngô Quyền" — chọn ô khác.
    const i = btns.findIndex(b => !b.innerText.includes("Ngô Quyền"));
    btns[i].click();
    return { i, text: btns[i].innerText.trim() };
  })()`);
  await sleep(2500);

  const afterWrong = await b.ev(`(() => {
    const q = document.querySelector(".quiz");
    return {
      verdict: q.querySelector(".explain strong")?.innerText || null,
      wrongMarked: q.querySelectorAll(".choice.wrong").length,
      wrongText: q.querySelector(".choice.wrong")?.innerText.trim() || null,
      xp: document.querySelector(".lvxp")?.innerText || null,
    };
  })()`);
  check("Chọn sai thì báo 'Chưa đúng'", afterWrong.verdict === "Chưa đúng", String(afterWrong.verdict));
  check("Chọn sai thì không được cộng XP", afterWrong.xp === "0 XP", String(afterWrong.xp));

  // ── ĐÂY LÀ BÀI KIỂM TRA CHÍNH: tải lại trang ──
  console.log("\n── Tải lại trang (bài kiểm tra cho lỗi vừa sửa) ──");
  await goto(`${BASE}/c/N01`);

  const afterReload = await b.ev(`(() => {
    const q = document.querySelector(".quiz");
    if (!q) return { none: true };
    return {
      verdict: q.querySelector(".explain strong")?.innerText || null,
      wrongText: q.querySelector(".choice.wrong")?.innerText.trim() || null,
      locked: [...q.querySelectorAll(".choice")].every(b => b.disabled),
    };
  })()`);

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
  const keyed = await b.ev(`(() => {
    const q = [...document.querySelectorAll(".quiz")].find(x => x.querySelector(".explain"));
    if (!q) return { none: true };
    const btns = [...q.querySelectorAll(".choice")];
    return {
      right: btns.findIndex(b => b.classList.contains("right")),
      lv: q.querySelector(".lv")?.innerText.trim(),
    };
  })()`);
  check("Giao diện có chỉ ra ô đúng sau khi trả lời", !keyed.none && keyed.right >= 0,
    "ô " + "ABCD"[keyed.right]);

  const XP = { "NHẬN BIẾT": 10, "THÔNG HIỂU": 20, "VẬN DỤNG": 30 };
  await b.ev(`(() => { try { localStorage.clear(); } catch {} 
    return indexedDB.databases ? indexedDB.databases().then(ds =>
      Promise.all(ds.map(d => new Promise(r => { const q = indexedDB.deleteDatabase(d.name); q.onsuccess = q.onerror = q.onblocked = r; })))
    ).then(() => "wiped") : "no-idb"; })()`);
  await goto(`${BASE}/c/N01`);

  NICK2 = "E2EBot" + Math.floor(Math.random() * 900 + 100);
  await b.ev(fillGate(NICK2, CLASS));
  await b.ev(`document.querySelector(".gate button[type=submit]").click()`);
  await sleep(2500);

  const before = await b.ev(`document.querySelector(".lvxp")?.innerText || "0 XP"`);
  await b.ev(`(() => {
    const q = document.querySelectorAll(".quiz")[0];
    q.querySelectorAll(".choice")[${keyed.right}].click();
  })()`);
  await sleep(2500);
  const scored = await b.ev(`(() => ({
    xp: document.querySelector(".lvxp")?.innerText || "",
    verdict: document.querySelector(".quiz .explain strong")?.innerText || "",
  }))()`);
  const num = (t) => parseInt(String(t).replace(/[^0-9]/g, ""), 10) || 0;
  const want = XP[keyed.lv] ?? -1;
  check("Học sinh mới bắt đầu từ 0 XP", num(before) === 0, before);
  check("Bấm đúng ô đáp án thì báo 'Chính xác'", scored.verdict === "Chính xác", scored.verdict);
  check(`Trả lời đúng câu ${keyed.lv} thì cộng ${want} XP`,
    num(scored.xp) === want, "thực tế " + scored.xp);

  // Bảng xếp hạng — chứng minh index composite đã chạy được.
  console.log("\n── Bảng xếp hạng (kiểm tra index Firestore) ──");
  await goto(`${BASE}/board/${CLASS}`);
  const board = await b.ev(`(() => ({
    rows: document.querySelectorAll(".rank li").length,
    text: document.body.innerText.slice(0, 400),
    warn: !!document.querySelector(".warnbar"),
  }))()`);
  check("Bảng xếp hạng chạy trên Firestore, không lùi về bản máy", board.warn === false);
  // NICK2 chứ không phải NICK: giữa bài kiểm tra ta đã xoá bộ nhớ và đóng vai một
  // học sinh mới. Ở chế độ localStorage, bảng xếp hạng chỉ thấy chính thiết bị này.
  check("Bảng xếp hạng thấy người vừa chơi (index composite đã sẵn sàng)",
    board.rows > 0 && board.text.includes(NICK2), `${board.rows} dòng`);

  // Teacher Dashboard
  console.log("\n── Teacher Dashboard ──");
  await goto(`${BASE}/t/${CLASS}`);
  const t = await b.ev(`(() => ({
    text: document.body.innerText.slice(0, 700),
    rows: document.querySelectorAll("tbody tr").length,
  }))()`);
  check("Dashboard nhận được dữ liệu của lớp", t.rows > 0 && !/^0 *Lượt/.test(t.text), `${t.rows} dòng câu hỏi`);
  console.log("\n--- trích màn hình dashboard ---\n" + t.text.split("\n").slice(0, 14).join("\n"));
} catch (e) { harnessError(e); }
finally { b?.close(); }

finish();
