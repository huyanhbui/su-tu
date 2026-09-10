#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// KIỂM TRA DANH TÍNH: đổi tên thì giữ điểm, đổi LỚP thì làm lại từ đầu.
//
//   npm run dev            # cửa sổ khác
//   npm run e2e:identity
//
// Quy tắc đang được kiểm:
//   • Danh tính gắn với THIẾT BỊ, không gắn với biệt danh. Gõ tên khác chỉ là
//     đổi nhãn hiển thị — XP vẫn nguyên. Một điện thoại là một học sinh.
//   • Đổi LỚP thì khác: cấp mã thiết bị mới, XP về 0, và phải hỏi lại trước.
//   • Bản ghi cũ Ở LẠI lớp cũ. Đây là phần dễ hỏng nhất và cũng là lý do có bài
//     kiểm tra này: trước đây bản ghi người chơi đi theo em sang lớp mới còn các
//     bản ghi câu trả lời ở lại lớp cũ, nên hai lớp vênh nhau vĩnh viễn — giáo
//     viên lớp mới thấy một em có sẵn XP mà bảng theo dõi trống trơn.
// ─────────────────────────────────────────────────────────────────────────────
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
const PORT = 9350 + Math.floor(Math.random()*140);
const BASE = (process.argv[2] || "http://localhost:5173").replace(/\/+$/, "");
const stamp = Date.now().toString(36).slice(-4).toUpperCase();
const CU = "ZC"+stamp, MOI = "ZM"+stamp;

// Kiểm tra máy chủ có sống không TRƯỚC khi mở trình duyệt.
async function phaiSong(url, goiY) {
  try {
    const r = await fetch(url, { redirect: "manual" });
    if (r.status >= 500) throw new Error("HTTP " + r.status);
  } catch (e) {
    console.error(`\n✗ Không kết nối được tới ${url}`);
    console.error(`  (${e.message})\n`);
    console.error(`  ${goiY}\n`);
    process.exit(1);
  }
}
await phaiSong(BASE, "Mở một cửa sổ khác và chạy:  npm run dev");

const brave=spawn("brave",["--headless","--disable-gpu","--no-sandbox","--no-zygote",
 `--remote-debugging-port=${PORT}`,"--user-data-dir=/tmp/sw-"+Date.now(),"--no-first-run","--window-size=390,2200","about:blank"],{stdio:"ignore"});
let ws,id=0;const pending=new Map();let S;
const send=(m,p={},s)=>new Promise((res,rej)=>{const n=++id;pending.set(n,{res,rej});ws.send(JSON.stringify({id:n,method:m,params:p,sessionId:s}))});
const ev=async(e)=>{const r=await send("Runtime.evaluate",{expression:e,awaitPromise:true,returnByValue:true},S);
  if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||"exc");return r.result?.value};
const goto=async(u)=>{await send("Page.navigate",{url:u},S);for(let i=0;i<40;i++){await sleep(250);
  if(await ev(`document.getElementById("root")?.childElementCount>0`).catch(()=>false))break;} await sleep(2200)};
const fails=[];const check=(n,c,d="")=>{console.log((c?"  PASS  ":"  FAIL  ")+n+(d?"  — "+d:""));if(!c)fails.push(n)};
const state=()=>ev(`(async()=>{const m=await import("/src/lib/store.js");const p=await m.getPlayer();
  return {uid:p.uid,nickname:p.nickname,classCode:p.classCode,xp:p.xp,cau:Object.keys(p.answers||{}).length};})()`);
const fillForm=(sel,nick,cls)=>ev(`(()=>{const els=document.querySelectorAll("${sel} input");
  const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;
  set.call(els[0],${JSON.stringify(nick)});els[0].dispatchEvent(new Event("input",{bubbles:true}));
  set.call(els[1],${JSON.stringify(cls)});els[1].dispatchEvent(new Event("input",{bubbles:true}));return els.length;})()`);
try{
  let v;for(let i=0;i<60;i++){try{v=await(await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();break}catch{await sleep(250)}}
  ws=new WebSocket(v.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
  ws.onmessage=(e)=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const{res,rej}=pending.get(m.id);pending.delete(m.id);if(m.error)rej(new Error(JSON.stringify(m.error)));else res(m.result)}};
  const{targetId}=await send("Target.createTarget",{url:"about:blank"});
  ({sessionId:S}=await send("Target.attachToTarget",{targetId,flatten:true}));
  await send("Runtime.enable",{},S);await send("Page.enable",{},S);

  console.log(`\n[1] Vào lớp ${CU} và kiếm XP`);
  await goto(`${BASE}/c/N01`);
  await fillForm(".gate","Alice",CU);
  await ev(`document.querySelector(".gate button[type=submit]").click()`);await sleep(3000);
  // Trả lời ĐÚNG bằng cách tra đáp án từ chính ngân hàng câu hỏi, không bấm bừa
  // một ô cố định. Bấm bừa thì có hôm trúng có hôm trượt, và bài kiểm tra sẽ đỏ
  // vì lý do chẳng liên quan gì tới thứ nó định kiểm.
  const daTraLoi = await ev(`(async()=>{
    const { QUESTIONS } = await import("/src/content/questions.js");
    const gon = (t) => t.replace(/\\s+/g, " ").trim();
    let n = 0;
    for (const q of document.querySelectorAll(".quiz")) {
      if (q.querySelector(".explain")) continue;
      const de = gon(q.querySelector(".quiz-stem").innerText);
      const cau = QUESTIONS.find((x) => gon(x.stem) === de);
      if (!cau) continue;
      q.querySelectorAll(".choice")[cau.answer].click();
      n++;
      await new Promise((r) => setTimeout(r, 700));
    }
    return n;
  })()`);
  await sleep(3000);
  check("Trả lời được đúng các câu của thẻ", daTraLoi > 0, `${daTraLoi} câu`);
  const s1=await state();console.log("   ",JSON.stringify(s1));
  check("Có XP để mà mất", s1.xp>0, `${s1.xp} XP`);

  console.log(`\n[2] ĐỔI TÊN nhưng GIỮ NGUYÊN lớp ${CU} → phải giữ điểm, không hỏi gì`);
  await goto(`${BASE}/`);
  await ev(`window.__hoi=0; window.confirm=(m)=>{window.__hoi++;window.__msg=m;return true;};`);
  await fillForm("form.form","AliceHai",CU);
  await ev(`document.querySelector("form.form button[type=submit]").click()`);await sleep(3500);
  const s2=await state();console.log("   ",JSON.stringify(s2));
  check("Đổi tên KHÔNG hỏi lại", (await ev(`window.__hoi`))===0);
  check("Đổi tên giữ nguyên mã thiết bị", s2.uid===s1.uid);
  check("Đổi tên giữ nguyên XP", s2.xp===s1.xp, `${s2.xp} XP`);
  check("Biệt danh đã đổi", s2.nickname==="AliceHai", s2.nickname);

  console.log(`\n[3] ĐỔI LỚP ${CU} → ${MOI} → phải hỏi lại rồi làm lại từ đầu`);
  await goto(`${BASE}/`);
  await ev(`window.__hoi=0; window.__msg=""; window.confirm=(m)=>{window.__hoi++;window.__msg=m;return true;};`);
  await fillForm("form.form","Bob",MOI);
  await ev(`document.querySelector("form.form button[type=submit]").click()`);await sleep(4000);
  const hoi=await ev(`window.__hoi`); const msg=await ev(`window.__msg`);
  check("Đổi lớp CÓ hỏi lại trước khi xoá", hoi===1, `hỏi ${hoi} lần`);
  check("Lời cảnh báo nêu rõ lớp cũ và số XP sắp mất",
    !!msg && msg.includes(CU) && msg.includes(String(s1.xp)), (msg||"").split("\n")[0]);
  const s3=await state();console.log("   ",JSON.stringify(s3));
  check("Đổi lớp cấp mã thiết bị MỚI", s3.uid!==s1.uid);
  check("Đổi lớp đưa XP về 0", s3.xp===0, `${s3.xp} XP`);
  check("Đã ở lớp mới", s3.classCode===MOI, s3.classCode);

  console.log(`\n[4] Lớp cũ ${CU} có mất dữ liệu không?`);
  await goto(`${BASE}/board/${CU}`);
  const bCu=await ev(`[...document.querySelectorAll(".rank li")].map(l=>l.innerText.replace(/\\n/g," ")).join(" | ")||"(trống)"`);
  console.log("    /board/"+CU+":",bCu);
  check("Bảng xếp hạng lớp CŨ vẫn giữ học sinh cũ và điểm cũ",
    bCu.includes("AliceHai") && bCu.includes(String(s1.xp)), bCu);
  await goto(`${BASE}/t/${CU}`);
  const tCu=await ev(`document.querySelector(".stats")?.innerText.replace(/\\n/g," ")||"(trống)"`);
  console.log("    /t/"+CU+"    :",tCu);
  check("Bảng theo dõi lớp CŨ vẫn còn bài làm", /[1-9]\d* Lượt/.test(tCu), tCu.slice(0,60));

  await goto(`${BASE}/board/${MOI}`);
  const bMoi=await ev(`[...document.querySelectorAll(".rank li")].map(l=>l.innerText.replace(/\\n/g," ")).join(" | ")||"(trống)"`);
  console.log("    /board/"+MOI+":",bMoi);
  check("Lớp MỚI thấy học sinh mới ở 0 XP", bMoi.includes("Bob") && bMoi.includes("0 XP"), bMoi);
}catch(e){console.error("LỖI:",e.message);fails.push("harness")}
finally{try{ws?.close()}catch{}brave.kill("SIGKILL")}
console.log("\n"+(fails.length?`THẤT BẠI ${fails.length}: `+fails.join("; "):"TẤT CẢ ĐỀU ĐẠT"));
process.exit(fails.length?1:0);
