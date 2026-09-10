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
let fbMod = null;         // module firebase.js, nạp động
let uid = null;
let initError = null;     // vì sao phải lùi về localStorage — trang /health đọc cái này

const ready = (async () => {
  try {
    const [fb, firestore] = await Promise.all([
      import("./firebase"),
      import("firebase/firestore"),
    ]);
    uid = await fb.ensureSignedIn();
    fbMod = fb;
    fs = { db: fb.db, ...firestore };
    mode = "firestore";
  } catch (e) {
    initError = e?.code || e?.message || String(e);
    console.warn("[store] Firestore không dùng được, chuyển sang localStorage:", initError);
    mode = "local";
  }
  return mode;
})();

export function backendMode() { return mode; }

/**
 * Bắt đầu lại từ đầu: bỏ danh tính hiện tại, cấp mã thiết bị mới, xoá sạch XP.
 *
 * Vì sao cần: danh tính trong hệ thống này gắn với THIẾT BỊ, không gắn với biệt
 * danh — đổi tên chỉ là đổi nhãn hiển thị, tiến trình vẫn nguyên. Đó là chủ ý
 * (một điện thoại = một học sinh, và không thu thập gì để nhận ra ai). Nhưng vì
 * vậy phải có một lối thoát rõ ràng cho máy dùng chung và cho lúc demo.
 */
export async function resetIdentity() {
  await ready;
  if (mode === "local") return local.resetIdentity();
  uid = await fbMod.newAnonymousIdentity();
  cache = { uid, nickname: "", classCode: "", xp: 0, cardXp: {}, answers: {} };
  hydration = null;
  push();
  return uid;
}

/**
 * Chẩn đoán cho trang /health. Trả về đúng những gì đang xảy ra, kể cả khi hỏng —
 * vì lỗi im lặng là loại lỗi đắt nhất. Chính ứng dụng này đã chạy trên localStorage
 * một thời gian mà không ai biết, chỉ vì phần đăng nhập ẩn danh chưa được bật.
 */
export async function diagnose() {
  const out = { mode: "loading", uid: null, reason: null, canRead: null, canWrite: null };
  out.mode = await ready;
  out.reason = initError;
  if (out.mode === "local") {
    const p = await local.getPlayer();
    out.uid = p.uid;
    return out;
  }
  out.uid = uid;
  try {
    await fs.getDoc(fs.doc(fs.db, "players", uid));
    out.canRead = true;
  } catch (e) { out.canRead = false; out.reason = e?.message || String(e); }
  try {
    await fs.setDoc(fs.doc(fs.db, "players", uid),
      { nickname: cache.nickname || "", classCode: cache.classCode || "",
        xp: cache.xp || 0, updatedAt: fs.serverTimestamp() }, { merge: true });
    out.canWrite = true;
  } catch (e) { out.canWrite = false; out.reason = e?.message || String(e); }
  return out;
}

/** Báo cho giao diện biết khi đã xác định xong nền lưu trữ (firestore hay local). */
export function onBackendReady(fn) {
  let alive = true;
  ready.then((m) => { if (alive) fn(m); });
  return () => { alive = false; };
}

// Bộ nhớ đệm trong phiên, để giao diện không phải chờ mạng mỗi lần đọc.
let cache = { uid: null, nickname: "", classCode: "", xp: 0, cardXp: {}, answers: {} };
const watchers = new Set();
function push() { watchers.forEach((fn) => fn({ ...cache })); }

// Đã nạp xong hồ sơ từ máy chủ hay chưa. Quan trọng: luật bảo mật chỉ cho TẠO
// bản ghi câu trả lời, không cho sửa. Nếu ghi điểm khi chưa biết em đã trả lời
// những câu nào, ta sẽ ghi đè lên một bản ghi cũ và bị từ chối. Nên luôn nạp trước.
let hydration = null;
function hydrated() {
  if (!hydration) hydration = getPlayer();
  return hydration;
}

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

export async function recordAnswer({ qid, cardId, level, correct, xp, picked }) {
  await ready;
  if (mode === "local") return local.recordAnswer({ qid, cardId, level, correct, xp, picked });
  await hydrated();                                // biết chắc em đã trả lời những câu nào
  if (cache.answers[qid]) return 0;               // mỗi câu chỉ tính điểm một lần
  const gained = correct ? xp : 0;

  cache.answers[qid] = { qid, cardId, level, correct, picked };
  cache.xp = (cache.xp || 0) + gained;
  cache.cardXp[cardId] = (cache.cardXp[cardId] || 0) + gained;
  push();                                          // cập nhật giao diện ngay, không chờ mạng

  try {
    await fs.setDoc(fs.doc(fs.db, "answers", `${uid}_${qid}`), {
      uid, qid, cardId, level, correct, picked,
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
  watchers.add(fn);
  fn({ ...cache });
  // Lúc gọi hàm này ta thường chưa biết nền lưu trữ là gì (`mode` còn "loading"),
  // nên phải chờ `ready` rồi mới quyết định — và phải nhớ hàm huỷ của bản local,
  // nếu không mỗi lần rời trang lại bỏ sót một người nghe.
  let stopLocal = null;
  ready.then(() => {
    if (mode === "local") stopLocal = local.subscribePlayer(fn);
    else hydrated();
  });
  return () => {
    watchers.delete(fn);
    if (stopLocal) stopLocal();
  };
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
