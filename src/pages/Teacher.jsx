import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { QUESTIONS, QUESTION_BY_ID, LEVEL_LABEL } from "../content/questions";
import { CARD_BY_ID } from "../content/cards";
import { subscribeClassAnswers, backendMode } from "../lib/store";

// Teacher Dashboard — màn hình chứng minh dòng doanh thu B2B của dự án.
// Điểm bán hàng không phải là "xem điểm số", mà là: giáo viên thấy lớp mình
// yếu ở MỨC TƯ DUY nào theo GDPT 2018 (nhận biết / thông hiểu / vận dụng).
export default function Teacher() {
  const { classCode } = useParams();
  const [code, setCode] = useState("");
  const nav = useNavigate();

  if (!classCode) {
    return (
      <div className="page">
        <h1>Teacher Dashboard</h1>
        <p className="muted">Nhập mã lớp để xem kết quả. Mã lớp do giáo viên tự đặt và đọc cho học sinh.</p>
        <form className="form" onSubmit={(e) => { e.preventDefault(); if (code.trim()) nav(`/t/${code.trim().toUpperCase()}`); }}>
          <label>Mã lớp
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="vd: 10A1"
                   maxLength={8} style={{ textTransform: "uppercase" }} />
          </label>
          <button className="btn" type="submit">Mở bảng theo dõi</button>
        </form>
        <nav className="foot"><Link className="btn ghost" to="/">Trang chính</Link></nav>
      </div>
    );
  }
  return <Dashboard classCode={classCode} />;
}

function Dashboard({ classCode }) {
  const [rows, setRows] = useState([]);
  useEffect(() => subscribeClassAnswers(classCode, setRows), [classCode]);

  // Gộp theo mức tư duy
  const byLevel = {};
  for (const lv of Object.keys(LEVEL_LABEL)) byLevel[lv] = { n: 0, ok: 0 };
  rows.forEach((r) => {
    if (!byLevel[r.level]) return;
    byLevel[r.level].n += 1;
    if (r.correct) byLevel[r.level].ok += 1;
  });

  // Gộp theo từng câu hỏi
  const byQ = QUESTIONS.map((q) => {
    const rs = rows.filter((r) => r.qid === q.id);
    const ok = rs.filter((r) => r.correct).length;
    return { q, n: rs.length, ok, pct: rs.length ? ok / rs.length : null };
  });

  const students = [...new Set(rows.map((r) => r.uid))];
  const weakest = Object.entries(byLevel)
    .filter(([, v]) => v.n > 0)
    .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)[0];

  return (
    <div className="page">
      <h1>Lớp {classCode}</h1>
      {backendMode() === "local" && (
        <p className="warnbar">Bản lưu trên máy — chỉ thấy dữ liệu của thiết bị này.</p>
      )}

      <div className="stats">
        <div><b>{students.length}</b><span>Học sinh</span></div>
        <div><b>{rows.length}</b><span>Lượt trả lời</span></div>
        <div><b>{rows.length ? Math.round((rows.filter(r => r.correct).length / rows.length) * 100) : 0}%</b><span>Đúng</span></div>
      </div>

      {weakest && (
        <div className="insight">
          Lớp yếu nhất ở mức <strong>{LEVEL_LABEL[weakest[0]]}</strong> — đúng{" "}
          {Math.round((weakest[1].ok / weakest[1].n) * 100)}% ({weakest[1].ok}/{weakest[1].n} lượt).
        </div>
      )}

      <section>
        <h2>Theo mức độ nhận thức (GDPT 2018)</h2>
        {Object.entries(byLevel).map(([lv, v]) => (
          <div className="brow" key={lv}>
            <span className="blabel">{LEVEL_LABEL[lv]}</span>
            <div className="bar wide">
              <i className={v.n && v.ok / v.n < 0.5 ? "bad" : ""}
                 style={{ width: v.n ? `${(v.ok / v.n) * 100}%` : "0%" }} />
            </div>
            <span className="bval">{v.n ? Math.round((v.ok / v.n) * 100) + "%" : "—"}</span>
          </div>
        ))}
      </section>

      <section>
        <h2>Theo từng câu hỏi</h2>
        <div className="tw">
          <table>
            <thead><tr><th>Câu hỏi</th><th>Thẻ</th><th>Mức</th><th>Lượt</th><th>Đúng</th></tr></thead>
            <tbody>
              {byQ.map(({ q, n, ok, pct }) => (
                <tr key={q.id} className={pct !== null && pct < 0.5 ? "flag" : ""}>
                  <td>{q.stem}</td>
                  <td>{CARD_BY_ID[q.cardId]?.name || q.cardId}</td>
                  <td>{LEVEL_LABEL[q.level]}</td>
                  <td className="num">{n}</td>
                  <td className="num">{pct === null ? "—" : Math.round(pct * 100) + "%"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <nav className="foot">
        <Link className="btn ghost" to={`/board/${classCode}`}>Bảng xếp hạng</Link>
        <Link className="btn ghost" to="/">Trang chính</Link>
      </nav>
    </div>
  );
}
