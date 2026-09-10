// Sinh file in thẻ bài: HTML khổ A4, mỗi tờ 6 thẻ 63×88mm, kèm mã QR.
// Dùng:  node scripts/make-cards.mjs --base https://ten-mien-that.vercel.app
//
// QUAN TRỌNG: mã QR chứa đường link cố định. In xong là KHÔNG sửa được nữa.
// Phải chốt tên miền thật trước khi mang đi in.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import QRCode from "qrcode";
import { CARDS } from "../src/content/cards.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const argBase = process.argv.indexOf("--base");
const BASE = argBase > -1 ? process.argv[argBase + 1] : "https://CHUA-CO-TEN-MIEN.example";
const isPlaceholder = BASE.includes("CHUA-CO-TEN-MIEN");

const MENH = { kim: "Kim", moc: "Mộc", thuy: "Thủy", hoa: "Hỏa", tho: "Thổ" };
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function dataUri(file) {
  const buf = await readFile(path.join(root, "public", file));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

const cardHtml = (c, qr, art) => `
<div class="card">
  <div class="frame">
    <div class="art"><img src="${art}" alt=""></div>
    <div class="name">
      <h2>${esc(c.name)}</h2>
      ${c.years && c.years !== "—" ? `<div class="yrs">${esc(c.years)}</div>` : ""}
    </div>
    <div class="roles">${c.roles.map((r) => `<div>${esc(r)}</div>`).join("")}</div>
    ${c.skills.length ? `<div class="skills">${c.skills.map((s) => `
      <div class="sk">
        <b>${esc(s.name)}</b>
        <span class="kind">${s.kind === "kich-hoat" ? "Kích hoạt" : "Thường trực"}</span>
        <p>${esc(s.text)}</p>
      </div>`).join("")}</div>`
      : `<div class="todo">Cơ chế chơi — chép từ bản thiết kế của nhóm</div>`}
    <div class="foot">
      <div class="stats">
        ${c.menh ? `<span class="st">Mệnh ${MENH[c.menh] || c.menh}</span>` : ""}
        ${c.sinhLuc ? `<span class="st">Sinh lực ${c.sinhLuc}</span>` : ""}
      </div>
      <img class="qr" src="${qr}" alt="QR ${esc(c.id)}">
    </div>
    <div class="id">${esc(c.id)}</div>
  </div>
</div>`;

const CSS = `
@page { size: A4 portrait; margin: 8mm; }
*{box-sizing:border-box}
body{margin:0;font-family:"Be Vietnam Pro",system-ui,sans-serif;background:#8d8d8d}
.sheet{width:194mm;margin:0 auto;display:grid;grid-template-columns:repeat(3,63mm);
  grid-auto-rows:88mm;gap:2mm;page-break-after:always}
.card{width:63mm;height:88mm;overflow:hidden;background:#F3E7CE;position:relative}
.frame{position:absolute;inset:2mm;border:0.5mm solid #7A5A1E;padding:2mm;
  display:flex;flex-direction:column;background:#F7EFDC}
.frame::before{content:"";position:absolute;inset:0.8mm;border:0.2mm solid #B99A55;pointer-events:none}
.art{height:37mm;display:flex;align-items:center;justify-content:center;overflow:hidden;
  border-bottom:0.3mm solid #B99A55}
/* Ảnh cắt từ Oger có tỷ lệ khác nhau. Ép cùng CHIỀU CAO rồi cắt bớt hai bên
   để sáu tấm thẻ trông đồng bộ, thay vì tấm to tấm nhỏ. */
.art img{height:37mm;width:auto;max-width:none;mix-blend-mode:multiply}
.name{text-align:center;margin-top:1.6mm}
.name h2{margin:0;font-size:11.5pt;font-weight:800;color:#20160A;letter-spacing:.01em;line-height:1.1}
.yrs{font-size:6pt;color:#7A6440;margin-top:.4mm}
.roles{margin-top:1.4mm;text-align:center;font-size:5.6pt;color:#4A3A22;line-height:1.5}
.skills{margin-top:1.6mm;display:flex;flex-direction:column;gap:1.2mm}
.sk{border-left:0.5mm solid #9B3228;padding-left:1.4mm}
.sk b{font-size:7pt;color:#20160A;display:inline}
.sk .kind{font-size:4.8pt;color:#7A5A1E;border:0.2mm solid #B99A55;border-radius:2mm;
  padding:0 1mm;margin-left:1mm;white-space:nowrap}
.sk p{margin:.5mm 0 0;font-size:5.4pt;line-height:1.35;color:#3A2E1C}
.todo{margin-top:2mm;font-size:5.4pt;color:#9B3228;border:0.2mm dashed #9B3228;
  padding:1.4mm;border-radius:1mm;text-align:center}
.foot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;gap:1mm}
.stats{display:flex;flex-direction:column;gap:.8mm}
.st{font-size:5.6pt;color:#20160A;background:#E7D6AF;border-radius:2mm;padding:.3mm 1.4mm;white-space:nowrap}
.qr{width:13mm;height:13mm;display:block}
.id{position:absolute;top:1.2mm;right:1.6mm;font-size:5pt;color:#9A8460}
.warn{background:#9B3228;color:#fff;padding:4mm;font-size:10pt;margin:0 auto 4mm;
  width:194mm;border-radius:2mm;line-height:1.5}
@media print{ body{background:#fff} .warn{display:none} }
`;

const cards = [];
for (const c of CARDS) {
  const url = `${BASE}/c/${c.id}`;
  const qr = await QRCode.toDataURL(url, { margin: 0, width: 400, errorCorrectionLevel: "M" });
  cards.push(cardHtml(c, qr, await dataUri(c.art.replace(/^\//, ""))));
}

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>Thẻ bài Kỳ Hùng Đất Việt — bản in</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;800&display=swap">
<style>${CSS}</style></head><body>
${isPlaceholder ? `<div class="warn"><b>CHƯA IN ĐƯỢC.</b> Mã QR đang trỏ tới tên miền giả
(<code>${BASE}</code>). Chạy lại lệnh với tên miền thật rồi mới mang đi in:<br>
<code>node scripts/make-cards.mjs --base https://ten-mien-that</code></div>` : ""}
<div class="sheet">${cards.join("")}</div>
</body></html>`;

await mkdir(path.join(root, "html"), { recursive: true });
await writeFile(path.join(root, "html", "print.html"), html, "utf8");
console.log(`✓ html/print.html — ${CARDS.length} thẻ, QR trỏ tới ${BASE}/c/<ID>`);
if (isPlaceholder) console.log("⚠  TÊN MIỀN GIẢ — chưa được mang đi in.");
