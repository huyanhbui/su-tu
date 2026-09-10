// Sinh mã QR rời cho từng thẻ bài, để bộ phận thiết kế tự ghép vào bản in.
//
// Dùng:  node scripts/make-qr.mjs --base https://ten-mien-that.xyz
//
// Xuất ra:
//   qr/svg/<ID>.svg   — VECTOR, đây là file nên đưa cho người thiết kế
//   qr/png/<ID>.png   — 1200px, dùng khi phần mềm không nhận SVG
//   html/qr-proof.html— bảng đối chiếu: mã nào ứng với link nào
//                       (mọi file HTML sinh ra đều nằm chung thư mục html/)
//   qr/HUONG-DAN-IN.md— quy tắc in để mã quét được
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import QRCode from "qrcode";
import { CARDS } from "../src/content/cards.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const i = process.argv.indexOf("--base");
const BASE = (i > -1 ? process.argv[i + 1] : "https://CHUA-CO-TEN-MIEN.example").replace(/\/+$/, "");

if (BASE.includes("CHUA-CO-TEN-MIEN")) {
  console.error("\n✗ CHƯA CÓ TÊN MIỀN THẬT — không sinh mã QR.\n");
  console.error("  Mã QR in ra là VĨNH VIỄN. In sai tên miền là bỏ cả lô thẻ.\n");
  console.error("  Chạy lại:  node scripts/make-qr.mjs --base https://ten-mien-that.xyz\n");
  process.exit(1);
}

const dir = path.join(root, "qr");
await mkdir(path.join(dir, "svg"), { recursive: true });
await mkdir(path.join(dir, "png"), { recursive: true });

// errorCorrectionLevel "M" = chịu được ~15% diện tích bị bẩn/xước. Đủ cho thẻ giấy.
// margin: 4 = vùng trắng bắt buộc quanh mã (quiet zone). KHÔNG được cắt bớt.
const OPTS = { errorCorrectionLevel: "M", margin: 4, color: { dark: "#000000", light: "#FFFFFF" } };

const rows = [];
for (const c of CARDS) {
  const url = `${BASE}/c/${c.id}`;
  const svg = await QRCode.toString(url, { ...OPTS, type: "svg" });
  await writeFile(path.join(dir, "svg", `${c.id}.svg`), svg, "utf8");
  await QRCode.toFile(path.join(dir, "png", `${c.id}.png`), url, { ...OPTS, width: 1200 });
  const modules = QRCode.create(url, { errorCorrectionLevel: "M" }).modules.size;
  rows.push({ id: c.id, name: c.name, url, modules });
}

const minMm = (m) => Math.ceil(((m + 8) * 0.5) * 10) / 10; // 0.5mm/module + quiet zone

const proof = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>Đối chiếu mã QR — Kỳ Hùng Đất Việt</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;800&display=swap">
<style>
body{font-family:"Be Vietnam Pro",system-ui,sans-serif;background:#fff;color:#111;margin:0;padding:28px}
h1{font-size:22px;margin:0 0 6px}
.sub{color:#555;margin-bottom:22px;font-size:14px}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px}
.c{border:1px solid #ddd;border-radius:10px;padding:14px;text-align:center}
.c img{width:150px;height:150px;display:block;margin:0 auto 10px}
.c b{display:block;font-size:15px}
.c code{font-size:11px;color:#444;word-break:break-all;display:block;margin-top:5px}
.c .m{font-size:11px;color:#777;margin-top:6px}
</style></head><body>
<h1>Đối chiếu mã QR</h1>
<p class="sub">Quét thử từng mã bằng điện thoại trước khi in. Link hiện ra phải khớp đúng dòng chữ bên dưới mã.</p>
<div class="g">
${rows.map((r) => `<div class="c">
  <img src="png/${r.id}.png" alt="QR ${r.id}">
  <b>${r.name}</b>
  <code>${r.url}</code>
  <div class="m">${r.modules}×${r.modules} ô · in tối thiểu ${minMm(r.modules)}mm</div>
</div>`).join("")}
</div></body></html>`;
const htmlDir = path.join(root, "html");
await mkdir(htmlDir, { recursive: true });
await writeFile(path.join(htmlDir, "qr-proof.html"), proof, "utf8");

const guide = `# Hướng dẫn in mã QR

Sinh lúc: ${new Date().toISOString().slice(0, 16).replace("T", " ")}
Tên miền: **${BASE}**

## Quy tắc bắt buộc

Bốn điều dưới đây mà sai thì mã **không quét được**, và in rồi thì không sửa được.

1. **Kích thước tối thiểu.** Xem cột "in tối thiểu" trong bảng dưới. Nên in to hơn
   mức tối thiểu khoảng 20% cho chắc — khuyến nghị **18–20mm** mỗi cạnh.
2. **Giữ nguyên viền trắng.** Mỗi file SVG/PNG đã có sẵn một viền trắng quanh mã
   (quiet zone). **Tuyệt đối không cắt sát vào mã** và không đặt hình/hoa văn đè lên
   viền trắng đó. Đây là lỗi làm hỏng mã QR phổ biến nhất.
3. **Đen trên nền trắng.** Không đảo màu (trắng trên đen), không đặt mã lên nền
   hoa văn hay ảnh. Một số máy quét cũ không đọc được mã đảo màu.
4. **Dùng file SVG nếu được.** SVG là vector, phóng to bao nhiêu cũng nét.
   Chỉ dùng PNG khi phần mềm không nhận SVG.

## Danh sách mã

| Thẻ | Tên | Link | Kích thước ô | In tối thiểu |
| --- | --- | --- | --- | --- |
${rows.map((r) => `| \`${r.id}\` | ${r.name} | \`${r.url}\` | ${r.modules}×${r.modules} | ${minMm(r.modules)}mm |`).join("\n")}

## Trước khi gửi đi in

- [ ] Mở \`html/qr-proof.html\`, **quét thử từng mã bằng điện thoại thật**
- [ ] Link hiện ra khớp đúng với dòng chữ dưới mỗi mã
- [ ] Trang web ở tên miền đó đã chạy được (không phải trang lỗi)
- [ ] In thử **một tấm** trên đúng loại giấy sẽ dùng, quét lại lần nữa
- [ ] Quét thử ở nơi ánh sáng kém, giống hội trường thi

Xong hết mới in cả lô.
`;
await writeFile(path.join(dir, "HUONG-DAN-IN.md"), guide, "utf8");

console.log(`✓ ${rows.length} mã QR → qr/svg, qr/png`);
console.log(`✓ html/qr-proof.html · qr/HUONG-DAN-IN.md`);
rows.forEach((r) => console.log(`   ${r.id}  ${r.modules}×${r.modules}  ≥${minMm(r.modules)}mm  ${r.url}`));
