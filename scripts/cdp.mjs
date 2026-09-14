// Shared browser-test harness: starts headless Brave and talks to it over the
// Chrome DevTools Protocol (CDP). Also holds the PASS/FAIL bookkeeping.
// Used by scripts/e2e.mjs, e2e-identity.mjs, e2e-offline.mjs and e2e-rules.mjs.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

export { sleep };

export const fails = [];

export function check(name, cond, detail = "") {
  console.log((cond ? "  PASS  " : "  FAIL  ") + name + (detail ? "  — " + detail : ""));
  if (!cond) fails.push(name + (detail ? " — " + detail : ""));
}

// Kiểm tra máy chủ có sống không TRƯỚC khi mở trình duyệt.
// Vì sao phải có: một lần cổng mặc định sai (5177 trong khi `npm run dev` chạy ở
// 5173) đã khiến bài kiểm tra báo bốn lỗi nghe như lỗi ứng dụng, trong khi thật ra
// nó đang nói chuyện với một cái cổng không có ai nghe. Thà không chạy còn hơn
// chạy rồi đổ oan cho phần mềm.
export async function phaiSong(url, goiY) {
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

// Start Brave, open one tab, and return helpers bound to that tab.
export async function openBrave(windowSize) {
  // Cổng gỡ lỗi phải ngẫu nhiên. Cổng cố định thì nếu trên máy còn một phiên Brave
  // cũ đang giữ cổng đó, bài kiểm tra sẽ lặng lẽ nối vào TRÌNH DUYỆT CŨ và báo hỏng
  // những thứ hoàn toàn lành lặn. Đã dính đúng một lần rồi.
  const port = 9200 + Math.floor(Math.random() * 700);
  const brave = spawn("brave", [
    "--headless", "--disable-gpu", "--no-sandbox", "--no-zygote",
    `--remote-debugging-port=${port}`,
    "--user-data-dir=/tmp/e2e-brave-" + Date.now(),
    "--no-first-run",
    ...(windowSize ? [`--window-size=${windowSize}`] : []),
    "about:blank",
  ], { stdio: "ignore" });

  let ws, id = 0;
  const pending = new Map();
  const close = () => {
    try { ws?.close(); } catch { /* ignore */ }
    brave.kill("SIGKILL");
  };
  const rawSend = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const m = ++id;
    pending.set(m, { res, rej });
    ws.send(JSON.stringify({ id: m, method, params, sessionId }));
  });

  try {
    // wait for CDP to open its port
    let list;
    for (let i = 0; i < 60; i++) {
      try { list = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break; }
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

    const { targetId } = await rawSend("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await rawSend("Target.attachToTarget", { targetId, flatten: true });
    const send = (method, params = {}) => rawSend(method, params, sessionId);
    const ev = async (expr) => {
      const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(expr + " → " + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails));
      return r.result?.value;
    };
    await send("Runtime.enable");
    await send("Page.enable");
    return { send, ev, close };
  } catch (e) {
    // setup failed before the caller got close(), so clean up here
    close();
    throw e;
  }
}

export function finish(okMessage = "TẤT CẢ ĐỀU ĐẠT") {
  console.log("\n" + (fails.length ? `THẤT BẠI ${fails.length}:\n- ` + fails.join("\n- ") : okMessage));
  process.exit(fails.length ? 1 : 0);
}

export function harnessError(e) {
  console.error("\nLỖI KHI CHẠY:", e.message);
  fails.push("harness: " + e.message);
}
