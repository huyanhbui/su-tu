import { useState } from "react";
import { joinClass } from "../lib/store";
import { nameProblem, classProblem, normalizeClass } from "../lib/nickname";

// Cửa vào lớp, đặt NGAY TRÊN TRANG THẺ BÀI.
//
// Lý do: mã QR mới là cửa trước của sản phẩm, không phải trang chủ. Học sinh cầm
// thẻ lên và quét — các em không đi qua trang "Vào lớp" bao giờ. Trước đây ai quét
// thẳng vào thẻ sẽ trả lời câu hỏi với mã lớp rỗng, nên điểm không bao giờ hiện lên
// bảng xếp hạng hay bảng theo dõi của giáo viên. Câu trả lời rơi vào hư không.
//
// Nguyên tắc: phần lịch sử KHÔNG bị chặn — ai quét cũng đọc được ngay, kể cả ban
// giám khảo. Chỉ phần ghi điểm mới cần biết em là ai và ở lớp nào.
export default function JoinGate({ onJoined }) {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const p = nameProblem(nick) || classProblem(code);
    if (p) return setErr(p);
    setBusy(true);
    try {
      await joinClass(nick, code);
      onJoined?.(normalizeClass(code));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <h3>Vào lớp để bắt đầu tính điểm</h3>
      <p className="muted sm">
        Phần lịch sử phía trên ai cũng đọc được. Nhập biệt danh và mã lớp thì câu trả
        lời mới được tính XP và hiện lên bảng xếp hạng của lớp.
      </p>
      <form onSubmit={submit} className="form tight">
        <label>
          Biệt danh
          <input value={nick} onChange={(e) => { setNick(e.target.value); setErr(null); }}
                 placeholder="vd: CocNgam2K8" maxLength={16} autoComplete="off" />
        </label>
        <label>
          Mã lớp
          <input value={code} onChange={(e) => { setCode(e.target.value); setErr(null); }}
                 placeholder="vd: 10A1" maxLength={8} autoComplete="off"
                 style={{ textTransform: "uppercase" }} />
        </label>
        {err && <p className="err">{err}</p>}
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Đang vào lớp…" : "Vào lớp"}
        </button>
        <p className="muted sm">
          Dùng biệt danh, <strong>không dùng tên thật</strong>. Ứng dụng không thu thập
          họ tên, email hay hình ảnh.
        </p>
      </form>
    </div>
  );
}
