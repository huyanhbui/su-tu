import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CARDS } from "../content/cards";
import { levelOf } from "../lib/level";
import { subscribePlayer, resetIdentity } from "../lib/store";

export default function Me() {
  const [player, setPlayer] = useState(null);
  const [dangDoi, setDangDoi] = useState(false);
  useEffect(() => subscribePlayer(setPlayer), []);

  const answered = Object.keys(player?.answers || {}).length;
  const right = Object.values(player?.answers || {}).filter((a) => a.correct).length;

  return (
    <div className="page">
      <h1>Bộ sưu tập</h1>
      <div className="stats">
        <div><b>{player?.xp || 0}</b><span>Tổng XP</span></div>
        <div><b>{answered}</b><span>Câu đã làm</span></div>
        <div><b>{answered ? Math.round((right / answered) * 100) : 0}%</b><span>Tỷ lệ đúng</span></div>
      </div>

      <div className="cardgrid">
        {CARDS.map((c) => {
          const xp = player?.cardXp?.[c.id] || 0;
          const lv = levelOf(c, xp);
          return (
            <Link key={c.id} to={`/c/${c.id}`} className="mini tall">
              <img src={c.art} alt="" />
              <span>{c.name}</span>
              <em>{lv.current.label} · {xp} XP</em>
              <div className="bar sm"><i style={{ width: `${lv.progress * 100}%` }} /></div>
            </Link>
          );
        })}
      </div>

      <nav className="foot"><Link className="btn ghost" to="/">Trang chính</Link></nav>

      {/* Danh tính gắn với THIẾT BỊ chứ không gắn với biệt danh: đổi tên chỉ đổi
          nhãn hiển thị, XP vẫn còn nguyên. Đó là chủ ý — một điện thoại là một
          học sinh, và ứng dụng không thu thập gì để nhận ra ai. Nhưng máy dùng
          chung lúc demo thì phải có lối làm lại từ đầu, nếu không người sau sẽ
          thừa hưởng điểm của người trước. */}
      <section className="reset">
        <h2>Máy này đang dùng chung?</h2>
        <p className="muted sm">
          Tiến trình được lưu theo <strong>thiết bị</strong>, không theo biệt danh —
          nên đổi tên vẫn giữ nguyên XP. Muốn nhường máy cho người khác thì bắt đầu
          lại từ đầu ở đây.
        </p>
        <button
          className="btn ghost danger"
          type="button"
          disabled={dangDoi}
          onClick={async () => {
            const xp = player?.xp || 0;
            if (!window.confirm(
              `Xoá toàn bộ tiến trình trên máy này (${xp} XP) và bắt đầu lại từ đầu?\n\n` +
              `Không lấy lại được.`
            )) return;
            setDangDoi(true);
            try {
              await resetIdentity();
              window.location.href = "/";
            } catch (e) {
              setDangDoi(false);
              window.alert("Không đổi được người chơi: " + (e?.message || e));
            }
          }}
        >
          {dangDoi ? "Đang đổi…" : "Đổi người chơi — xoá tiến trình"}
        </button>
      </section>
    </div>
  );
}
