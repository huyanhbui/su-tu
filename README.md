# SỬ TỰ

Ứng dụng web đi kèm bộ cờ **Kỳ Hùng Đất Việt**. Mỗi thẻ bài in một mã QR; quét
mã là mở thẳng trang của thẻ đó.

**Nguyên tắc thiết kế quan trọng nhất:** trang web *không lặp lại* những gì đã in
trên thẻ. Tấm bìa đã có tên, mệnh, sinh lực, luật chơi rồi. Trang web bổ sung thứ
tấm bìa không chứa nổi — **lịch sử đằng sau cơ chế chơi**, câu hỏi, và điểm XP.

> Ví dụ: thẻ Ngô Quyền in luật "khi triều rút, kích hoạt bẫy cọc". Trang web giải
> thích vì sao luật ấy lại là *triều rút* — vì năm 938 Ngô Quyền đã nhử hạm đội
> Nam Hán vượt bãi cọc lúc triều lên rồi phản công đúng lúc triều xuống. Cơ chế
> chơi và sự kiện lịch sử là một.

---

## Chạy thử

```bash
npm install
npm run dev          # http://localhost:5173
```

| Lệnh | Việc |
|---|---|
| `npm run dev` | chạy bản phát triển |
| `npm run build` | đóng gói vào `dist/` |
| `npm run check` | soát nội dung thẻ và câu hỏi trước khi in |
| `npm run e2e` | chạy thử luồng thật trên trình duyệt thật |
| `npm run e2e:offline` | ngắt mạng thật rồi thử lại — cần chạy `preview` trước |
| `npm run lint` | soát code |

`npm run e2e https://ten-mien-that.xyz` chạy được cả với bản đã lên mạng. **Chạy
lệnh này trước mỗi buổi demo, trên đúng đường mạng sẽ dùng.**

---

## Các trang

| Đường dẫn | Ai xem | Nội dung |
|---|---|---|
| `/` | học sinh | Nhập biệt danh + mã lớp. Không bắt buộc — quét thẻ là vào được. |
| `/c/:mã` | học sinh | **Trang chính của sản phẩm.** Mã QR trỏ vào đây. |
| `/me` | học sinh | Bộ sưu tập: XP, số câu đã làm, tỷ lệ đúng, cấp của từng thẻ. |
| `/board/:lớp` | cả lớp | Bảng xếp hạng, chữ to cho máy chiếu, cập nhật ngay. |
| `/t/:lớp` | giáo viên | Teacher Dashboard — màn hình chứng minh dòng doanh thu B2B. |
| `/health` | **nhóm làm dự án** | Tự kiểm tra trước buổi demo. |

### Vì sao mã QR trỏ vào `/c/:mã` chứ không phải trang chủ

Vì học sinh **cầm thẻ lên và quét**, các em không đi qua trang chủ bao giờ. Trang
thẻ vì thế phải tự lo được mọi việc: đọc lịch sử ngay không cần đăng nhập, và có
sẵn ô nhập lớp khi em muốn tính điểm.

### Teacher Dashboard bán cái gì

Không phải "xem điểm số" — phần mềm nào cũng làm được. Điểm bán hàng là giáo viên
thấy lớp mình yếu ở **mức tư duy nào** theo GDPT 2018: *nhận biết / thông hiểu /
vận dụng*. Mỗi câu hỏi mang sẵn một mức, nên biểu đồ này hiện ra miễn phí từ chính
dữ liệu học sinh làm bài. Câu nào cả lớp đúng dưới 50% thì tự động được tô đỏ.

---

## Cấu trúc

```
src/
  content/cards.js       nội dung thẻ — biên soạn tay, KHÔNG sinh tự động
  content/questions.js   ngân hàng câu hỏi, mỗi câu gắn một mức nhận thức
  lib/store.js           LỚP LƯU TRỮ (Firestore)  ─┐ cùng một bộ chữ ký hàm
  lib/store.local.js     LỚP LƯU TRỮ (localStorage)─┘
  lib/firebase.js        cấu hình Firebase + đăng nhập ẩn danh
  pages/                 mỗi trang một file
```

### Lớp lưu trữ, và vì sao nó tách riêng

Không trang nào gọi thẳng xuống Firebase. Tất cả đi qua `lib/store.js`, và file
đó có **đúng bộ chữ ký hàm** với `store.local.js`. Đổi nền lưu trữ là đổi một
file, không sửa một dòng nào trong các trang.

Nếu Firestore không khởi tạo được — mất mạng, dự án chưa bật, trường chặn — ứng
dụng **tự lùi về localStorage** thay vì hiện màn hình trắng. Đây là lớp bảo hiểm
cho ngày thi: học sinh vẫn quét được thẻ, vẫn đọc được sử, vẫn làm được bài; chỉ
là bảng xếp hạng không nối được giữa các máy.

**Lớp bảo hiểm này có mặt trái: nó làm hỏng hóc trở nên im lặng.** Ứng dụng đã
từng chạy hoàn toàn trên localStorage một thời gian mà không ai biết, chỉ vì phần
đăng nhập ẩn danh chưa được bật trong Firebase Console. Trang `/health` sinh ra
để chấm dứt chuyện đó — nó nói thẳng đang chạy trên nền nào và vì sao.

### Chạy được khi mất mạng

`public/sw.js` là service worker viết tay (khoảng 80 dòng, chú thích tiếng Việt —
đọc là hiểu, không dùng thư viện sinh sẵn). Nó giữ sẵn vỏ ứng dụng, toàn bộ mã JS
và ảnh thẻ bài trong máy, nên mất mạng vẫn quét thẻ đọc sử và làm bài được; điểm
sẽ tự đồng bộ khi có mạng lại.

Hai điều quan trọng trong đó:

- **Lưu lượng Firebase không bao giờ bị cache.** Chặn tường minh theo tên miền,
  đặt trước cả phép kiểm tra cùng gốc. Cache nhầm dữ liệu đăng nhập vừa làm hỏng
  đồng bộ, vừa có thể đưa nhầm dữ liệu bạn này cho bạn khác.
- **Tên kho cache đổi theo nội dung mỗi lần build.** Bản build tuần trước không
  thể sống sót trong máy để phục vụ nhầm giữa buổi demo.

Kiểm chứng bằng `npm run e2e:offline`.

### Nội dung nằm trong mã nguồn, không tải về qua mạng

`cards.js` và `questions.js` là module JS, được đóng gói thẳng vào bản build. Đổi
lại một chút bất tiện khi sửa nội dung, ta được: trang hiện ra tức thì khi quét
mã, và vẫn đọc được khi mạng chập chờn — hai thứ quyết định trải nghiệm ngay tại
thời điểm học sinh quét thẻ.

---

## Quyền riêng tư

Hệ thống **không có dữ liệu định danh nào**. Chỉ có biệt danh do học sinh tự đặt
và một mã thiết bị ngẫu nhiên. Không họ tên, không email, không số điện thoại,
không hình ảnh. Đây là cách dự án tuân thủ **Nghị định 13/2023/NĐ-CP** về dữ liệu
cá nhân của người chưa thành niên.

Ô nhập biệt danh **chặn cả việc học sinh vô tình gõ họ tên thật** (từ ba chữ trở
lên bị từ chối) — cam kết chỉ đứng vững nếu phần mềm thực sự ngăn được.

Vì không có gì riêng tư, luật bảo mật Firestore cho **đọc rộng**. Phần siết chặt
nằm ở **ghi**: mỗi người chỉ ghi được bản ghi của chính mình, và câu trả lời đã
ghi thì không sửa, không xoá được — để điểm số không gian lận được.

---

## In thẻ và mã QR

```bash
node scripts/make-qr.mjs --base https://ten-mien-that.xyz
```

Script **từ chối chạy** nếu chưa đưa tên miền thật. Mã QR in ra là vĩnh viễn; in
sai tên miền là bỏ cả lô thẻ.

Xuất ra `qr/`: file SVG vector cho người thiết kế, file PNG dự phòng, một trang
`proof.html` để đối chiếu mã nào ứng với thẻ nào, và `HUONG-DAN-IN.md` ghi kích
thước in tối thiểu cùng vùng trắng bắt buộc quanh mã.

**Trước khi in, phải chốt dạng đường dẫn.** `/c/N01` hay `/N01` — đường dẫn ngắn
hơn thì mã QR ít ô hơn, in ra to hơn, dễ quét hơn. Đổi sau khi in là in lại.

---

## Việc còn phải làm

- [ ] **Bật đăng nhập ẩn danh.** Firebase Console → Authentication → Sign-in
      method → **Anonymous** → Enable. Chưa bật thì toàn bộ ứng dụng chạy trên
      localStorage, mỗi máy là một ốc đảo. Kiểm tra lại bằng `/health`.
- [ ] **Giáo viên Lịch sử duyệt nội dung.** `npm run check` liệt kê thẻ nào chưa
      được duyệt. Máy không kiểm hộ được tính đúng đắn của lịch sử.
- [ ] **Cơ chế chơi của N02, N03, N04, D01, S01.** Hiện để trống *có chủ ý* —
      đó là thiết kế game của nhóm, nằm trên bản in thật. Khi có bản cuối, chép
      **nguyên văn** luật in trên thẻ vào `skills[].text`, đừng viết lại theo ý
      mình: chữ trên màn hình khác chữ trên tấm bìa trong tay giám khảo còn tệ
      hơn là không hiện gì.
- [ ] **Mua tên miền, triển khai, sinh mã QR** — theo đúng thứ tự đó.
