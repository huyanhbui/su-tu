import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { subscribeLeaderboard, BACKEND } from "../lib/store";

// Màn hình dành cho máy chiếu trong lớp — chữ to, tương phản cao.
export default function Board() {
  const { classCode } = useParams();
  const [rows, setRows] = useState([]);
  useEffect(() => subscribeLeaderboard(classCode, setRows), [classCode]);

  return (
    <div className="page board">
      <h1>Bảng xếp hạng · lớp {classCode}</h1>

      {BACKEND === "localStorage" && (
        <p className="warnbar">
          Đang chạy bản lưu trên máy — bảng xếp hạng chỉ hiện thiết bị này.
          Khi nối Firestore, mọi máy trong lớp sẽ hiện chung một bảng.
        </p>
      )}

      {rows.length === 0 ? (
        <p className="muted">Chưa có ai ghi điểm. Quét một thẻ và trả lời câu hỏi để bắt đầu.</p>
      ) : (
        <ol className="rank">
          {rows.map((r, i) => (
            <li key={r.uid}>
              <span className="pos">{i + 1}</span>
              <span className="who">{r.nickname}</span>
              <span className="xp">{r.xp} XP</span>
            </li>
          ))}
        </ol>
      )}

      <nav className="foot"><Link className="btn ghost" to="/">Trang chính</Link></nav>
    </div>
  );
}
