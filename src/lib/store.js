// ─────────────────────────────────────────────────────────────────────────────
// LỚP LƯU TRỮ — bản Firestore.
//
// Giữ NGUYÊN chữ ký hàm của bản localStorage (store.local.js). Các trang không
// biết mình đang chạy trên nền nào; đổi nền chỉ là đổi file này.
//
// Nếu Firestore không khởi tạo được (mất mạng lúc mở, dự án chưa bật, bị chặn),
// ứng dụng TỰ ĐỘNG lùi về bản localStorage thay vì hiện màn hình trắng.
// Đây là lớp bảo hiểm cho ngày thi.
// ─────────────────────────────────────────────────────────────────────────────
import * as local from "./store.local";

let mode = "loading";     // "firestore" | "local"
let fs = null;            // các hàm Firestore, nạp động
let uid = null;

const ready = (async () => {
  try {
    const [{ db, ensureSignedIn }, firestore] = await Promise.all([
      import("./firebase"),
      import("firebase/firestore"),
    ]);
    uid = await ensureSignedIn();
    fs = { db, ...firestore };
    mode = "firestore";
  } catch (e) {
    console.warn("[store] Firestore không dùng được, chuyển sang localStorage:", e?.message || e);
    mode = "local";
  }
  return mode;
})();

export function backendMode() { return mode; }

// Bộ nhớ đệm trong phiên, để giao diện không phải chờ mạng mỗi lần đọc.
let cache = { uid: null, nickname: "", classCode: "", xp: 0, cardXp: {}, answers: {} };
const watchers = new Set();
function push() { watchers.forEach((fn) => fn({ ...cache })); }

export async function getPlayer() {
  await ready;
  if (mode === "local") return local.getPlayer();
  const snap = await fs.getDoc(fs.doc(fs.db, "players", uid));
  cache = snap.exists()
    ? { uid, answers: {}, cardXp: {}, ...snap.data() }
    : { uid, nickname: "", classCode: "", xp: 0, cardXp: {}, answers: {} };
  // Nạp lại các câu đã trả lời để không tính điểm hai lần.
  const mine = await fs.getDocs(fs.query(fs.collection(fs.db, "answers"), fs.where("uid", "==", uid)));
  cache.answers = {};
  mine.forEach((d) => { const a = d.data(); cache.answers[a.qid] = a; });
  push();
  return { ...cache };
}

export async function joinClass(nickname, classCode) {
  await ready;
  if (mode === "local") return local.joinClass(nickname, classCode);
  cache.nickname = nickname.trim().slice(0, 16);
  cache.classCode = classCode.trim().toUpperCase().slice(0, 8);
  await fs.setDoc(
    fs.doc(fs.db, "players", uid),
    { nickname: cache.nickname, classCode: cache.classCode, xp: cache.xp || 0,
      cardXp: cache.cardXp || {}, updatedAt: fs.serverTimestamp() },
    { merge: true }
  );
  push();
  return { ...cache };
}

export async function recordAnswer({ qid, cardId, level, correct, xp }) {
  await ready;
  if (mode === "local") return local.recordAnswer({ qid, cardId, level, correct, xp });
  if (cache.answers[qid]) return 0;               // mỗi câu chỉ tính điểm một lần
  const gained = correct ? xp : 0;

  cache.answers[qid] = { qid, cardId, level, correct };
  cache.xp = (cache.xp || 0) + gained;
  cache.cardXp[cardId] = (cache.cardXp[cardId] || 0) + gained;
  push();                                          // cập nhật giao diện ngay, không chờ mạng

  try {
    await fs.setDoc(fs.doc(fs.db, "answers", `${uid}_${qid}`), {
      uid, qid, cardId, level, correct,
      nickname: cache.nickname, classCode: cache.classCode,
      at: fs.serverTimestamp(),
    });
    await fs.setDoc(
      fs.doc(fs.db, "players", uid),
      { xp: cache.xp, cardXp: cache.cardXp, nickname: cache.nickname,
        classCode: cache.classCode, updatedAt: fs.serverTimestamp() },
      { merge: true }
    );
  } catch (e) {
    console.warn("[store] chưa ghi được lên máy chủ, sẽ tự đồng bộ khi có mạng:", e?.message);
  }
  return gained;
}

export function subscribePlayer(fn) {
  if (mode === "local") return local.subscribePlayer(fn);
  watchers.add(fn);
  fn({ ...cache });
  ready.then(() => { if (mode === "local") local.subscribePlayer(fn); else getPlayer(); });
  return () => watchers.delete(fn);
}

export function subscribeLeaderboard(classCode, fn) {
  let stop = () => {};
  ready.then(() => {
    if (mode === "local") { stop = local.subscribeLeaderboard(classCode, fn); return; }
    const q = fs.query(
      fs.collection(fs.db, "players"),
      fs.where("classCode", "==", classCode),
      fs.orderBy("xp", "desc"),
      fs.limit(50)
    );
    stop = fs.onSnapshot(q,
      (snap) => fn(snap.docs.map((d) => ({ uid: d.id, ...d.data() }))),
      (e) => { console.warn("[store] bảng xếp hạng:", e?.message); fn([]); });
  });
  return () => stop();
}

export function subscribeClassAnswers(classCode, fn) {
  let stop = () => {};
  ready.then(() => {
    if (mode === "local") { stop = local.subscribeClassAnswers(classCode, fn); return; }
    const q = fs.query(fs.collection(fs.db, "answers"), fs.where("classCode", "==", classCode));
    stop = fs.onSnapshot(q,
      (snap) => fn(snap.docs.map((d) => d.data())),
      (e) => { console.warn("[store] bảng theo dõi:", e?.message); fn([]); });
  });
  return () => stop();
}
