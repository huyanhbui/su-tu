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
import { check, finish, harnessError, openBrave, phaiSong, sleep } from "./cdp.mjs";
const APP = (process.argv[2] || "http://localhost:5173").replace(/\/+$/, "");

await phaiSong(APP, "Mở một cửa sổ khác và chạy:  npm run dev");

const srcFb = await (await fetch(APP + "/src/lib/firebase.js")).text();
const FS_URL = (srcFb.match(/"(\/node_modules\/\.vite\/deps\/firebase_firestore\.js[^"]*)"/) || [])[1];
if (!FS_URL) { console.error("Không tìm được đường dẫn module firestore mà Vite đang phục vụ."); process.exit(1); }
console.log("module firestore:", FS_URL);
let b;
try{
  b=await openBrave();
  await b.send("Page.navigate",{url:APP+"/c/N01"});
  await sleep(9000);

  const setup = await b.ev(`(async()=>{
    const [{db,ensureSignedIn},fs] = await Promise.all([import("/src/lib/firebase.js"), import("${FS_URL}")]);
    window.__fs = fs; window.__db = db; window.__uid = await ensureSignedIn();
    await fs.setDoc(fs.doc(db,"players",window.__uid),{nickname:"RulesBot",classCode:"ZZRULE",xp:5,cardXp:{}},{merge:true});
    return window.__uid;
  })()`);
  check("Đăng nhập ẩn danh và ghi được hồ sơ của chính mình", !!setup, setup);

  const t = async (name, expr, mustFail) => {
    const r = await b.ev(`(async()=>{ try { ${expr} ; return "ĐƯỢC PHÉP"; } catch(e){ return "TỪ CHỐI: "+(e.code||e.message); } })()`);
    check(name, mustFail ? r.startsWith("TỪ CHỐI") : r === "ĐƯỢC PHÉP", r);
  };

  await t("Không ghi đè được hồ sơ của học sinh khác",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players","uid-cua-nguoi-khac"),{nickname:"Hack",classCode:"ZZRULE",xp:999999})`, true);
  await t("Không tự nâng XP thành số âm/không hợp lệ",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players",window.__uid),{nickname:"X",classCode:"ZZRULE",xp:-5},{merge:true})`, true);
  await t("Không đặt được biệt danh dài quá 16 ký tự (chống nhập họ tên thật)",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"players",window.__uid),{nickname:"Nguyen Van A Rat La Dai Dong",classCode:"ZZRULE",xp:5},{merge:true})`, true);

  await b.ev(`(async()=>{ await window.__fs.setDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"),
    {uid:window.__uid,qid:"ZZTESTQ",cardId:"N01",level:"nhan-biet",correct:false,picked:0,nickname:"RulesBot",classCode:"ZZRULE",at:window.__fs.serverTimestamp()}); })()`);
  await t("Không SỬA được câu đã trả lời (chống đổi sai thành đúng)",
    `await window.__fs.updateDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"),{correct:true})`, true);
  await t("Không XOÁ được câu đã trả lời",
    `await window.__fs.deleteDoc(window.__fs.doc(window.__db,"answers",window.__uid+"_ZZTESTQ"))`, true);
  await t("Không mạo danh người khác khi ghi câu trả lời",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"answers","gia-mao_Q01"),{uid:"nguoi-khac",qid:"Q01",cardId:"N01",level:"nhan-biet",correct:true,classCode:"ZZRULE"})`, true);
  await t("Không ghi được vào collection lạ",
    `await window.__fs.setDoc(window.__fs.doc(window.__db,"linh_tinh","x"),{a:1})`, true);
}catch(e){harnessError(e)}
finally{b?.close()}
finish("LUẬT BẢO MẬT ĐỨNG VỮNG");
