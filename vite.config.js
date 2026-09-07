import react from '@vitejs/plugin-react'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, posix, relative, sep } from 'node:path'
import { defineConfig } from 'vite'

const SW = 'sw.js'
const MOC = /\/\* SU-TU:PRECACHE:BEGIN[\s\S]*?SU-TU:PRECACHE:END \*\//

/** Liệt kê mọi file đã thực sự nằm trong dist, kể cả thứ copy từ public/. */
function liet_ke(goc, thu_muc = goc) {
  const ra = []
  for (const muc of readdirSync(thu_muc, { withFileTypes: true })) {
    const duong = join(thu_muc, muc.name)
    if (muc.isDirectory()) ra.push(...liet_ke(goc, duong))
    else ra.push(relative(goc, duong).split(sep).join(posix.sep))
  }
  return ra
}

// ─────────────────────────────────────────────────────────────────────────────
// Vite đặt mã băm vào tên file (index-D1L-tYZU.js), nên một danh sách precache
// gõ tay sẽ hỏng ngay lần build sau — và hỏng lặng lẽ: service worker vẫn cài
// đặt được, chỉ là chẳng lưu gì cả, đến lúc mất mạng mới lộ. Vì vậy danh sách
// được đọc thẳng từ dist/ sau khi build xong rồi ghi đè vào dist/sw.js.
//
// Tên kho lấy từ mã băm nội dung của chính các file đó: sửa bất cứ thứ gì thì
// tên kho đổi, activate xoá kho cũ, không còn đường nào để bản build cũ sống sót.
// ─────────────────────────────────────────────────────────────────────────────
function swPrecache() {
  return {
    name: 'su-tu-sw-precache',
    apply: 'build',
    enforce: 'post',
    writeBundle(options) {
      const dist = options.dir
      const swFile = join(dist, SW)

      const files = liet_ke(dist)
        .filter((f) => f !== SW && !f.endsWith('.map'))
        .sort()

      const dau = createHash('sha256')
      for (const f of files) dau.update(f).update(readFileSync(join(dist, f)))
      const build = dau.digest('hex').slice(0, 8)

      const urls = files.map((f) => '/' + f)
      if (!urls.includes('/index.html')) {
        throw new Error('[su-tu-sw] không thấy index.html trong dist — precache sẽ vô nghĩa')
      }

      const nguon = readFileSync(swFile, 'utf8')
      if (!MOC.test(nguon)) {
        throw new Error(`[su-tu-sw] không thấy mốc SU-TU:PRECACHE trong ${SW} — dừng build còn hơn ship một service worker rỗng`)
      }

      writeFileSync(swFile, nguon.replace(MOC, [
        '/* SU-TU:PRECACHE:BEGIN — vùng này do vite.config.js ghi lại lúc build. ĐỪNG SỬA TAY. */',
        `const BUILD = ${JSON.stringify(build)};`,
        `const PRECACHE = ${JSON.stringify(urls, null, 2)};`,
        '/* SU-TU:PRECACHE:END */',
      ].join('\n')))

      console.log(`\x1b[32m✓\x1b[0m sw.js: precache ${urls.length} file, kho "su-tu-${build}"`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), swPrecache()],
})
