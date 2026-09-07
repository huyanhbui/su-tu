import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { diagnose } from "../lib/store";
import { CARDS } from "../content/cards";
import { QUESTIONS, LEVEL_LABEL } from "../content/questions";

// Trang tự kiểm tra, dành cho NHÓM LÀM DỰ ÁN, không phải cho học sinh.
//
// Lý do tồn tại: ứng dụng có lớp dự phòng — Firestore hỏng thì tự lùi về bộ nhớ
// máy, không hiện màn hình trắng. Lớp dự phòng đó cứu được buổi thi, nhưng nó
// cũng khiến hỏng hóc trở nên IM LẶNG. Đã có lúc ứng dụng chạy hoàn toàn trên
// bộ nhớ máy mà không ai biết, chỉ vì phần đăng nhập ẩn danh chưa được bật.
//
// Trước mỗi buổi demo: mở /health trên đúng chiếc máy sẽ dùng, đúng mạng wifi
// sẽ dùng. Mất mười giây, đổi lấy việc không phải đoán mò giữa buổi thuyết trình.
export default function Health() {
  const [d, setD] = useState(null);

  useEffect(() => {
    let alive = true;
    diagnose().then((r) => alive && setD(r)).catch((e) => alive && setD({ mode: "error", reason: String(e) }));
    return () => { alive = false; };
  }, []);

  const live = d?.mode === "firestore" && d.canRead && d.canWrite;
  const notes = CARDS.filter((c) => c.reviewNote);
  const noQuestions = CARDS.filter((c) => !QUESTIONS.some((q) => q.cardId === c.id));
  const noMechanics = CARDS.filter((c) => (c.skills || []).length === 0);

  const byLevel = {};
  for (const l of Object.keys(LEVEL_LABEL)) byLevel[l] = QUESTIONS.filter((q) => q.level === l).length;

  return (
    <div className="page">
      <h1>Tự kiểm tra</h1>
      <p className="muted sm">Trang dành cho nhóm làm dự án. Mở trang này trước mỗi buổi demo.</p>

      <h2>Nền lưu trữ</h2>
      {!d ? (
        <p className="muted">Đang kiểm tra…</p>
      ) : live ? (
        <div className="insight">
          <strong>Đang chạy trên Firestore.</strong> Đọc và ghi đều được. Các máy trong
          lớp sẽ thấy chung một bảng xếp hạng.
        </div>
      ) : (
        <div className="warnbar">
          <strong>Chưa nối được Firestore — đang chạy trên bộ nhớ của máy này.</strong>
          <br />
          Ứng dụng vẫn dùng được, nhưng mỗi máy là một ốc đảo: bảng xếp hạng chỉ thấy
          chính mình, Teacher Dashboard chỉ thấy dữ liệu của một thiết bị.
          {d.reason && <><br /><br />Máy chủ báo: <code>{d.reason}</code></>}
          {String(d.reason || "").includes("configuration-not-found") && (
            <>
              <br /><br />
              <strong>Cách sửa:</strong> Firebase Console → Authentication → Sign-in method
              → bật <strong>Anonymous</strong>. Sau đó tải lại trang này.
            </>
          )}
        </div>
      )}

      {d && (
        <table className="kv">
          <tbody>
            <tr><th>Nền lưu trữ</th><td>{d.mode}</td></tr>
            <tr><th>Mã thiết bị</th><td><code>{d.uid || "—"}</code></td></tr>
            <tr><th>Đọc được</th><td>{d.canRead === null ? "—" : d.canRead ? "được" : "KHÔNG"}</td></tr>
            <tr><th>Ghi được</th><td>{d.canWrite === null ? "—" : d.canWrite ? "được" : "KHÔNG"}</td></tr>
            <tr><th>Chế độ build</th><td>{import.meta.env.MODE}</td></tr>
          </tbody>
        </table>
      )}

      <h2>Nội dung</h2>
      <div className="stats">
        <div><b>{CARDS.length}</b><span>Thẻ bài</span></div>
        <div><b>{QUESTIONS.length}</b><span>Câu hỏi</span></div>
        <div><b>{CARDS.length - noMechanics.length}</b><span>Thẻ đủ cơ chế</span></div>
      </div>
      <table className="kv">
        <tbody>
          {Object.keys(LEVEL_LABEL).map((l) => (
            <tr key={l}><th>{LEVEL_LABEL[l]}</th><td>{byLevel[l]} câu</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Việc còn phải làm</h2>
      <ul className="todo">
        {noQuestions.length > 0 && (
          <li className="bad">Thẻ chưa có câu hỏi: {noQuestions.map((c) => c.id).join(", ")}</li>
        )}
        {noMechanics.length > 0 && (
          <li>
            Chưa có cơ chế chơi (mệnh · sinh lực · kỹ năng): <strong>{noMechanics.map((c) => c.id).join(", ")}</strong>.
            Trang thẻ đang tự ẩn các mục này. Chờ nhóm thiết kế gửi bản in cuối rồi
            chép <em>nguyên văn</em> luật in trên thẻ vào.
          </li>
        )}
        {notes.length > 0 && (
          <li>
            {notes.length} thẻ chưa được giáo viên Lịch sử duyệt nội dung. Máy không
            kiểm hộ được việc này.
          </li>
        )}
        {noQuestions.length === 0 && noMechanics.length === 0 && notes.length === 0 && (
          <li>Không còn việc nào máy biết được.</li>
        )}
      </ul>
      <p className="muted sm">Chạy <code>npm run check</code> để xem đầy đủ hơn ở dòng lệnh.</p>

      <nav className="foot"><Link className="btn ghost" to="/">Trang chính</Link></nav>
    </div>
  );
}
