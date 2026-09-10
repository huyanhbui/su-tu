#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// KIỂM TRA LUẬT BẢO MẬT bằng cách CỐ TÌNH VI PHẠM.
//
//   npm run dev            # cửa sổ khác
//   npm run e2e:rules
//
// Ba câu ban giám khảo có thể hỏi, và đây là chỗ trả lời được bằng bằng chứng
// chứ không bằng lời hứa:
//   • Học sinh tự sửa điểm của mình được không?
//   • Sửa được điểm của bạn khác không?
//   • Trả lời sai rồi đổi thành đúng được không?
//
// Chạy trên Firestore THẬT, không phải trình giả lập — vì luật chạy ở máy chủ,
// và thứ cần biết là luật đã TRIỂN KHAI có chặn thật hay không.
//
// Lưu ý: mỗi lần chạy để lại một hồ sơ và một câu trả lời trong lớp "ZZRULE".
// Luật không cho xoá (đó chính là điều đang kiểm tra), nên đừng chạy hàng loạt.
// ─────────────────────────────────────────────────────────────────────────────
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
const PORT = 9600 + Math.floor(Math.random() * 300);
const APP = (process.argv[2] || "http://localhost:5173").replace(/\/+$/, "");

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

await phaiSong(APP, "Mở một cửa sổ khác và chạy:  npm run dev");

const srcFb = await (await fetch(APP + "/src/lib/firebase.js")).text();
const FS_URL = (srcFb.match(/"(\/node_modules\/\.vite\/deps\/firebase_firestore\.js[^"]*)"/) || [])[1];
if (!FS_URL) { console.error("Không tìm được đường dẫn module firestore mà Vite đang phục vụ."); process.exit(1); }
console.log("module firestore:", FS_URL);
const brave = spawn("brave",["--headless","--disable-gpu","--no-sandbox","--no-zygote",
 `--remote-debugging-port=${PORT}`,"--user-data-dir=/tmp/rules-"+Date.now(),"--no-first-run","about:blank"],{stdio:"ignore"});
let ws,id=0;const pending=new Map();
const send=(m,p={},s)=>new Promise((res,rej)=>{const n=++id;pending.set(n,{res,rej});ws.send(JSON.stringify({id:n,method:m,params:p,sessionId:s}))});
const ev=async(e,S)=>{const r=await send("Runtime.evaluate",{expression:e,awaitPromise:true,returnByValue:true},S);
  if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||"exc");return r.result?.value};
const fails=[];const check=(n,c,d="")=>{console.log((c?"  PASS  ":"  FAIL  ")+n+(d?"  — "+d:""));if(!c)fails.push(n)};
try{
  let v;for(let i=0;i<60;i++){try{v=await(await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();break}catch{await sleep(250)}}
  ws=new WebSocket(v.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
  ws.onmessage=(e)=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const{res,rej}=pending.get(m.id);pending.delete(m.id);if(m.error)rej(new Error(JSON.stringify(m.error)));else res(m.result)}};
  const{targetId}=await send("Target.createTarget",{url:"about:blank"});
  const{sessionId:S}=await send("Target.attachToTarget",{targetId,flatten:true});
  await send("Runtime.enable",{},S);await send("Page.enable",{},S);
  await send("Page.navigate",{url:APP+"/c/N01"},S);
  await sleep(9000);

  const setup = await ev(`(async()=>{
    const [{db,ensureSignedIn},fs] = await Promise.all([import("/src/lib/firebase.js"), import("${FS_URL}")]);
    window.__fs = fs; window.__db = db; window.__uid = await ensureSignedIn();
    await fs.setDoc(fs.doc(db,"players",window.__uid),{nickname:"RulesBot",classCode:"ZZRULE",xp:5,cardXp:{}},{merge:true});
    return window.__uid;
  })()`, S);
  check("Đăng nhập ẩn danh và ghi được hồ sơ của chính mình", !!setup, setup);

  const t = async (name, expr, mustFail) => {
    const r = await ev(`(async()=>{ try { ${expr} ; return "ĐƯỢC PHÉP"; } catch(e){ return "TỪ CHỐI: "+(e.code||e.message); } })()`, S);
    check(name, mustFail ? r.startsWith("TỪ CHỐI") : r === "ĐƯỢC PHÉP", r);
  };

  await t("Không ghi đè được hồ sơ của học sinh khác",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players","uid-cua-nguoi-khac"),{nickname:"Hack",classCode:"ZZRULE",xp:999999})`, true);
  await t("Không tự nâng XP thành số âm/không hợp lệ",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players",window.__uid),{nickname:"X",classCode:"ZZRULE",xp:-5},{merge:true})`, true);
  await t("Không đặt được biệt danh dài quá 16 ký tự (chống nhập họ tên thật)",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players",window.__uid),{nickname:"Nguyen Van A Rat La Dai Dong",classCode:"ZZRULE",xp:5},{merge:true})`, true);

  await ev(`(async()=>{ await window.__fs.setDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"),
    {uid:window.__uid,qid:"ZZTESTQ",cardId:"N01",level:"nhan-biet",correct:false,picked:0,nickname:"RulesBot",classCode:"ZZRULE",at:window.__fs.serverTimestamp()}); })()`, S);
  await t("Không SỬA được câu đã trả lời (chống đổi sai thành đúng)",
    `await window.__fs.updateDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"),{correct:true})`, true);
  await t("Không XOÁ được câu đã trả lời",
    `await window.__fs.deleteDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"))`, true);
  await t("Không mạo danh người khác khi ghi câu trả lời",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"answers","gia-mao_Q01"),{uid:"nguoi-khac",qid:"Q01",cardId:"N01",level:"nhan-biet",correct:true,classCode:"ZZRULE"})`, true);
  await t("Không ghi được vào collection lạ",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"linh_tinh","x"),{a:1})`, true);
}catch(e){console.error("LỖI:",e.message);fails.push("harness")}
finally{try{ws?.close()}catch{}brave.kill("SIGKILL")}
console.log("\n"+(fails.length?`THẤT BẠI ${fails.length}: `+fails.join("; "):"LUẬT BẢO MẬT ĐỨNG VỮNG"));
