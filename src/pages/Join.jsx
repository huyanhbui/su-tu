import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { joinClass, subscribePlayer } from "../lib/store";
import { nameProblem, classProblem, normalizeClass } from "../lib/nickname";
import { CARDS } from "../content/cards";

export default function Join() {
  const [nick, setNick] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [player, setPlayer] = useState(null);
  const nav = useNavigate();

  useEffect(() => subscribePlayer(setPlayer), []);

  async function submit(e) {
    e.preventDefault();
    const p = nameProblem(nick) || classProblem(code);
    if (p) return setErr(p);
    setBusy(true);
    try {
      await joinClass(nick, code);
      // Vào thẳng bộ sưu tập: đó là nơi các em thấy toàn bộ thẻ và biết mình
      // đang ở đâu. Bảng xếp hạng lúc mới vào thì trống, chẳng nói lên điều gì.
      nav("/me");
    } finally {
      setBusy(false);
    }
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
          {" "}<Link to="/me">Bộ sưu tập →</Link>
        </div>
      )}

      <form onSubmit={submit} className="form">
        <label>
          Biệt danh
          <input value={nick} onChange={(e) => { setNick(e.target.value); setErr(null); }}
                 placeholder="vd: CocNgam2K8" maxLength={16} autoComplete="off" />
        </label>
        <p className="muted sm">Đặt biệt danh — <strong>không dùng tên thật</strong>. Ứng dụng không thu thập họ tên, email hay hình ảnh.</p>

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
      </form>

      <section>
        <h2>Quét thẻ để bắt đầu</h2>
        <p className="muted sm">
          Mỗi thẻ bài trong hộp có một mã QR riêng. Quét thẻ là cách vào chính —
          không cần qua trang này. Hoặc mở thử một thẻ:
        </p>
        <div className="cardgrid">
          {CARDS.map((c) => (
            <Link key={c.id} to={`/c/${c.id}`} className="mini">
              <img src={c.art} alt="" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <nav className="foot">
        <Link className="btn ghost" to="/t">Tôi là giáo viên</Link>
        {player?.classCode && (
          <Link className="btn ghost" to={`/board/${normalizeClass(player.classCode)}`}>Bảng xếp hạng</Link>
        )}
      </nav>
    </div>
  );
}
