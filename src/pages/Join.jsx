import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { joinClass, subscribePlayer } from "../lib/store";
import { CARDS } from "../content/cards";

// Kiểm tra biệt danh: chặn việc học sinh vô tình nhập họ tên thật.
// Đây là lớp bảo vệ thực tế cho cam kết "không thu thập dữ liệu định danh".
function nameProblem(v) {
  const s = v.trim();
  if (s.length < 2) return "Biệt danh cần ít nhất 2 ký tự.";
  if (s.length > 16) return "Biệt danh tối đa 16 ký tự.";
  if (s.split(/\s+/).length >= 3) return "Nghe như họ tên thật — hãy dùng biệt danh.";
  return null;
}

export default function Join() {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState(null);
  const [player, setPlayer] = useState(null);
  const nav = useNavigate();

  useEffect(() => subscribePlayer(setPlayer), []);

  async function submit(e) {
    e.preventDefault();
    const p = nameProblem(nick);
    if (p) return setErr(p);
    if (!code.trim()) return setErr("Nhập mã lớp do giáo viên cung cấp.");
    await joinClass(nick, code);
    nav(`/board/${code.trim().toUpperCase()}`);
  }

  return (
    <div className="page">
      <header className="brand">
        <h1>SỬ TỰ</h1>
        <p className="muted">Nền tảng học tập của bộ cờ Kỳ Hùng Đất Việt</p>
      </header>

      {player?.nickname && (
        <div className="note">
          Đang chơi với biệt danh <strong>{player.nickname}</strong>
          {player.classCode && <> — lớp <strong>{player.classCode}</strong></>} · {player.xp} XP
        </div>
      )}

      <form onSubmit={submit} className="form">
        <label>
          Biệt danh
          <input value={nick} onChange={(e) => { setNick(e.target.value); setErr(null); }}
                 placeholder="vd: CocNgam2K8" maxLength={16} />
        </label>
        <p className="muted sm">Đặt biệt danh — <strong>không dùng tên thật</strong>. Ứng dụng không thu thập họ tên, email hay hình ảnh.</p>

        <label>
          Mã lớp
          <input value={code} onChange={(e) => { setCode(e.target.value); setErr(null); }}
                 placeholder="vd: 10A1" maxLength={8} style={{ textTransform: "uppercase" }} />
        </label>

        {err && <p className="err">{err}</p>}
        <button className="btn" type="submit">Vào lớp</button>
      </form>

      <section>
        <h2>Quét thẻ để bắt đầu</h2>
        <p className="muted sm">Mỗi thẻ bài trong hộp có một mã QR riêng. Hoặc mở thử một thẻ:</p>
        <div className="cardgrid">
          {CARDS.map((c) => (
            <Link key={c.id} to={`/c/${c.id}`} className="mini">
              <img src={c.art} alt="" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <nav className="foot"><Link className="btn ghost" to="/t">Tôi là giáo viên</Link></nav>
    </div>
  );
}
