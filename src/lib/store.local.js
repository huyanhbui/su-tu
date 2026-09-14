// ─────────────────────────────────────────────────────────────────────────────
// LỚP LƯU TRỮ (storage layer)
//
// Mọi trang trong ứng dụng chỉ gọi các hàm trong file này — không trang nào gọi
// thẳng xuống localStorage hay Firebase. Nhờ vậy khi thay localStorage bằng
// Firestore, ta chỉ viết lại file này, không sửa một dòng nào trong các trang.
//
// Bản này lưu trên chính máy người dùng (localStorage): chạy được ngay, không
// cần mạng, không cần tài khoản. Hạn chế: dữ liệu không đi qua được máy khác,
// nên bảng xếp hạng chỉ thấy chính mình. Bản Firestore sẽ giải quyết điều đó.
//
// Mọi hàm đều async và mọi hàm subscribe đều trả về hàm huỷ đăng ký — giống hệt
// chữ ký của bản Firestore, để việc thay thế là thay 1-đổi-1.
// ─────────────────────────────────────────────────────────────────────────────

import { normalizeClass } from "./nickname";

const KEY = "sutu.v1";

// Danh tính ẩn danh: một chuỗi ngẫu nhiên gắn với thiết bị.
// KHÔNG thu thập họ tên thật, email hay hình ảnh — đây là cách dự án tuân thủ
// Nghị định 13/2023/NĐ-CP về dữ liệu cá nhân của người chưa thành niên.
function newUid() {
  return "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // localStorage có thể bị chặn (chế độ ẩn danh, trình duyệt chặn cookie).
    // Khi đó ứng dụng vẫn chạy, chỉ là không nhớ được giữa các lần mở.
  }
  return null;
}

function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* hết dung lượng hoặc bị chặn — bỏ qua, không làm sập ứng dụng */
  }
  listeners.forEach((fn) => fn(state));
}

function blank() {
  return { uid: newUid(), nickname: "", classCode: "", xp: 0, cardXp: {}, answers: {} };
}

const listeners = new Set();

function subscribe(fn) {
  listeners.add(fn);
  fn(read() || blank());
  return () => listeners.delete(fn);
}

// ── API công khai ───────────────────────────────────────────────────────────

export async function getPlayer() {
  let s = read();
  if (!s) {
    s = blank();
    write(s);
  }
  return s;
}

export async function joinClass(nickname, classCode) {
  const s = (await getPlayer());
  s.nickname = nickname.trim().slice(0, 16);
  s.classCode = normalizeClass(classCode);
  write(s);
  return s;
}

/** Ghi nhận một câu trả lời. Trả về số XP vừa nhận (0 nếu đã trả lời trước đó). */
export async function recordAnswer({ qid, cardId, level, correct, xp, picked }) {
  const s = await getPlayer();
  if (s.answers[qid]) return 0; // mỗi câu chỉ tính điểm một lần
  // Lưu cả `picked` — phương án học sinh đã chọn, không chỉ đúng/sai. Nhờ vậy khi
  // quét lại thẻ, các em thấy đúng thứ mình đã chọn lúc trước, kể cả khi chọn sai.
  s.answers[qid] = { qid, cardId, level, correct, picked, at: Date.now() };
  const gained = correct ? xp : 0;
  s.xp += gained;
  s.cardXp[cardId] = (s.cardXp[cardId] || 0) + gained;
  write(s);
  return gained;
}

export const subscribePlayer = subscribe;

/** Xoá sạch tiến trình trên máy này và cấp một mã thiết bị mới. */
export async function resetIdentity() {
  const s = blank();
  write(s);
  return s.uid;
}

/** Bảng xếp hạng. Bản localStorage chỉ có một người chơi — chính thiết bị này. */
export function subscribeLeaderboard(classCode, fn) {
  return subscribe((s) => {
    const rows = s.nickname && s.classCode === classCode ? [s] : [];
    fn(rows.sort((a, b) => b.xp - a.xp));
  });
}

/** Toàn bộ câu trả lời của một lớp — dữ liệu cho Teacher Dashboard. */
export function subscribeClassAnswers(classCode, fn) {
  return subscribe((s) => {
    if (s.classCode !== classCode) return fn([]);
    fn(
      Object.entries(s.answers).map(([qid, a]) => ({
        qid, uid: s.uid, nickname: s.nickname, ...a,
      }))
    );
  });
}
