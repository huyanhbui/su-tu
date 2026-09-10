#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// KIỂM TRA NỘI DUNG trước khi in thẻ và trước khi đem đi thi.
//
// Sai một con số trên tấm bìa đã in là hỏng cả hộp. Sai một đáp án trước mặt
// ban giám khảo là hỏng cả buổi thuyết trình. Chạy `npm run check` để máy soát
// những lỗi máy soát được, rồi mới đến lượt người đọc.
//
// Máy KHÔNG kiểm được tính đúng đắn của lịch sử. Việc đó vẫn phải có giáo viên
// Lịch sử đọc và duyệt — xem mục "ghi chú còn tồn đọng" ở cuối.
// ─────────────────────────────────────────────────────────────────────────────
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { CARDS } = await import(join(root, "src/content/cards.js"));
const { QUESTIONS, LEVEL_LABEL, XP_PER_CORRECT } = await import(join(root, "src/content/questions.js"));

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const LEVELS = Object.keys(LEVEL_LABEL);

// ── Thẻ bài ────────────────────────────────────────────────────────────────
const seenCard = new Set();
for (const c of CARDS) {
  const at = `thẻ ${c.id}`;
  if (seenCard.has(c.id)) err(`${at}: mã thẻ bị trùng`);
  seenCard.add(c.id);

  if (!/^[A-Z]\d{2}$/.test(c.id)) err(`${at}: mã thẻ phải dạng N01 / D01 / S01 (mã này đi vào QR, đổi sau khi in là in lại)`);
  for (const f of ["name", "battle", "art", "source", "type"]) {
    if (!c[f]) err(`${at}: thiếu trường \`${f}\``);
  }
  if (!Array.isArray(c.facts) || c.facts.length < 3) err(`${at}: cần ít nhất 3 mục "Ba điều cần nhớ"`);
  if (!Array.isArray(c.roles) || c.roles.length === 0) err(`${at}: thiếu vai trò`);
  if (!Array.isArray(c.levels) || c.levels.length === 0) err(`${at}: thiếu bậc cấp độ`);
  else {
    if (c.levels[0].xp !== 0) err(`${at}: bậc đầu tiên phải bắt đầu từ 0 XP`);
    for (let i = 1; i < c.levels.length; i++) {
      if (c.levels[i].xp <= c.levels[i - 1].xp) err(`${at}: mốc XP của các bậc phải tăng dần`);
    }
    // Thẻ chỉ có MỘT bậc thì sinh ra đã ở cấp cao nhất: thanh tiến trình đầy vàng
    // và dòng chữ "Đã đạt cấp cao nhất" ngay lần mở đầu tiên. Học sinh chưa làm gì
    // mà đã xong — mất sạch lý do trả lời câu hỏi.
    if (c.levels.length < 2) {
      err(`${at}: chỉ có 1 bậc nên vừa mở ra đã ở cấp cao nhất, thanh tiến trình đầy sẵn. Cần ít nhất 2 bậc.`);
    }
  }

  // Ảnh phải có thật, không thì trang thẻ hiện ô vỡ ngay trước mặt giám khảo.
  const art = join(root, "public", c.art.replace(/^\//, ""));
  if (!existsSync(art)) err(`${at}: không tìm thấy file ảnh ${c.art}`);

  // Cơ chế chơi: hoặc có đủ, hoặc chưa có gì. Có nửa vời là dấu hiệu quên.
  const hasMech = c.menh != null || c.sinhLuc != null || (c.skills || []).length > 0;
  const fullMech = c.menh != null && c.sinhLuc != null && (c.skills || []).length > 0;
  if (hasMech && !fullMech) {
    warn(`${at}: cơ chế chơi mới có một phần (mệnh=${c.menh}, sinh lực=${c.sinhLuc}, ${(c.skills || []).length} kỹ năng) — nhóm thiết kế còn phải bổ sung`);
  }
  for (const s of c.skills || []) {
    if (!["kich-hoat", "thuong-truc"].includes(s.kind)) err(`${at}: kỹ năng "${s.name}" có \`kind\` lạ: ${s.kind}`);
    if (!s.text) err(`${at}: kỹ năng "${s.name}" thiếu luật in trên thẻ`);
    if (!s.history) err(`${at}: kỹ năng "${s.name}" thiếu phần lịch sử — đó mới là lý do tồn tại của trang này`);
  }
}

// ── Câu hỏi ────────────────────────────────────────────────────────────────
const seenQ = new Set();
const stems = new Map();
const perCard = Object.fromEntries(CARDS.map((c) => [c.id, 0]));
const perLevel = Object.fromEntries(LEVELS.map((l) => [l, 0]));

for (const q of QUESTIONS) {
  const at = `câu ${q.id}`;
  if (seenQ.has(q.id)) err(`${at}: mã câu hỏi bị trùng`);
  seenQ.add(q.id);

  if (!perCard[q.cardId] && perCard[q.cardId] !== 0) err(`${at}: gắn với thẻ "${q.cardId}" không tồn tại`);
  else perCard[q.cardId]++;

  if (!LEVELS.includes(q.level)) err(`${at}: mức nhận thức lạ "${q.level}" — phải là ${LEVELS.join(" / ")}`);
  else perLevel[q.level]++;
  if (XP_PER_CORRECT[q.level] == null) err(`${at}: mức "${q.level}" chưa có mức XP`);

  if (!Array.isArray(q.choices) || q.choices.length !== 4) err(`${at}: phải có đúng 4 phương án, đang có ${q.choices?.length}`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(`${at}: \`answer\` phải là số 0–3, đang là ${q.answer}`);
  if (new Set(q.choices || []).size !== (q.choices || []).length) err(`${at}: có hai phương án trùng chữ`);
  if (!q.stem) err(`${at}: thiếu đề bài`);
  if (!q.explain) err(`${at}: thiếu lời giải thích — đây là chỗ học sinh thực sự học được`);

  const key = (q.stem || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (stems.has(key)) err(`${at}: trùng đề với ${stems.get(key)}`);
  stems.set(key, q.id);

  // Thẻ hư cấu: câu hỏi không được hỏi về chi tiết bịa. Nếu đề bài nhắc tên nhân
  // vật hư cấu như một sự kiện đã xảy ra thì phải xem lại.
  const card = CARDS.find((c) => c.id === q.cardId);
  if (card?.hucau) {
    const asks = new RegExp(`${card.name}\\s+(đã|từng|chỉ huy|dẫn|đem|bị|tử trận)`, "i");
    if (asks.test(q.stem)) {
      warn(`${at}: hỏi về hành động của "${card.name}" như thể có thật, nhưng đây là nhân vật hư cấu.`);
    }
  }

  // Cái bẫy Bạch Đằng: ba trận khác nhau trên cùng một dòng sông (938 / 981 / 1288).
  // Chỉ kêu khi câu hỏi thật sự mập mờ — nghĩa là không có năm VÀ cũng không có
  // tên riêng nào ghim câu hỏi vào một trận cụ thể. Một bộ kiểm tra lúc nào cũng
  // kêu thì chẳng ai buồn đọc nữa, mà đó mới là lúc lỗi thật lọt qua.
  const text = [q.stem, ...(q.choices || []), q.explain].join(" ");
  if (/Bạch Đằng/i.test(text)) {
    const hasYear = /\b(938|981|1288)\b/.test(text);
    const pinned = /Ngô Quyền|Nam Hán|Lưu Hoằng Tháo|Kiều Công Tiễn|Dương Đình Nghệ|Tiền Ngô|Lê Hoàn|nhà Tống|Trần Hưng Đạo|nhà Nguyên|Mông Cổ|Ô Mã Nhi|Thoát Hoan/i.test(text);
    if (!hasYear && !pinned) {
      warn(`${at}: nhắc "Bạch Đằng" mà không có năm, cũng không có tên riêng nào ghim vào một trận. Có ba trận: 938 (Ngô Quyền), 981 (Lê Hoàn), 1288 (Trần Hưng Đạo).`);
    }
  }
}

// Bậc cao nhất phải với tới được bằng chính các câu hỏi của thẻ đó. Đặt mốc cao
// hơn tổng XP có thể kiếm được thì bậc ấy vĩnh viễn không ai đạt tới — một lời hứa
// suông hiện ngay trên màn hình.
for (const c of CARDS) {
  const toiDa = QUESTIONS
    .filter((q) => q.cardId === c.id)
    .reduce((t, q) => t + (XP_PER_CORRECT[q.level] || 0), 0);
  const moc = (c.levels || []).length ? c.levels[c.levels.length - 1].xp : 0;
  if (moc > toiDa) {
    err(`thẻ ${c.id}: bậc cao nhất cần ${moc} XP nhưng cả ${perCard[c.id]} câu hỏi của thẻ cộng lại chỉ được ${toiDa} XP — không bao giờ đạt tới.`);
  }
}

for (const [id, n] of Object.entries(perCard)) {
  if (n === 0) err(`thẻ ${id}: chưa có câu hỏi nào — quét mã QR xong không có gì để làm`);
  else if (n < 2) warn(`thẻ ${id}: mới có ${n} câu hỏi, quét xong là hết ngay`);
}

// Đáp án không được dồn về một vị trí — học sinh sẽ đoán được quy luật.
const spread = [0, 0, 0, 0];
QUESTIONS.forEach((q) => { if (Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4) spread[q.answer]++; });
const most = Math.max(...spread);
if (QUESTIONS.length >= 8 && most / QUESTIONS.length > 0.45) {
  warn(`đáp án đúng dồn về ô ${"ABCD"[spread.indexOf(most)]} (${most}/${QUESTIONS.length}) — học sinh sẽ đoán được quy luật`);
}

// ── Báo cáo ────────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${CARDS.length} thẻ · ${QUESTIONS.length} câu hỏi\n`);
console.log("Câu hỏi theo thẻ");
for (const c of CARDS) console.log(`  ${pad(c.id, 5)} ${pad(c.name, 26)} ${perCard[c.id]} câu`);
console.log("\nCâu hỏi theo mức độ nhận thức (GDPT 2018)");
for (const l of LEVELS) {
  const n = perLevel[l];
  const pct = QUESTIONS.length ? Math.round((n / QUESTIONS.length) * 100) : 0;
  console.log(`  ${pad(LEVEL_LABEL[l], 12)} ${pad(n, 4)} ${"█".repeat(Math.round(pct / 4))} ${pct}%`);
}

const hucau = CARDS.filter((c) => c.hucau);
if (hucau.length) {
  console.log("\nThẻ NHÂN VẬT HƯ CẤU — phải ghi rõ trên thẻ in, không chỉ trên web:");
  for (const c of hucau) console.log(`  ${pad(c.id, 5)} ${c.name}`);
}

const tam = CARDS.filter((c) => c.artTam);
if (tam.length) {
  console.log("\nThẻ còn dùng ảnh TẠM (tranh khắc gỗ Oger), chưa có tranh chính thức:");
  for (const c of tam) console.log(`  ${pad(c.id, 5)} ${pad(c.name, 26)} ${c.art}`);
}

const notes = CARDS.filter((c) => c.reviewNote);
if (notes.length) {
  console.log("\nGhi chú nội bộ còn tồn đọng (máy không kiểm hộ được):");
  for (const c of notes) console.log(`  ${pad(c.id, 5)} ${c.reviewNote}`);
}

if (warnings.length) {
  console.log(`\nCẢNH BÁO (${warnings.length}) — nên xem lại, không chặn:`);
  for (const w of warnings) console.log("  • " + w);
}
if (errors.length) {
  console.log(`\nLỖI (${errors.length}) — phải sửa:`);
  for (const e of errors) console.log("  ✗ " + e);
  console.log("");
  process.exit(1);
}
console.log("\nKhông có lỗi. Nội dung vẫn cần giáo viên Lịch sử duyệt trước khi in.\n");
