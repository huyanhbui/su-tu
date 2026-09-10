import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { joinClass, subscribePlayer, resetIdentity } from "../lib/store";
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

  // ── Đổi tên thì giữ điểm, đổi LỚP thì làm lại từ đầu ────────────────────────
  //
  // Danh tính gắn với thiết bị, nên gõ biệt danh khác chỉ là đổi nhãn hiển thị —
  // XP vẫn nguyên. Đúng như mong muốn: một điện thoại là một học sinh.
  //
  // Nhưng đổi LỚP mà vẫn giữ nguyên bản ghi thì dữ liệu vênh nhau vĩnh viễn:
  // bản ghi người chơi đi theo em sang lớp mới, còn các bản ghi câu trả lời thì
  // ở lại lớp cũ (chúng chỉ được tạo, không được sửa — để không gian lận điểm
  // được). Hậu quả: giáo viên lớp mới thấy một em có sẵn XP mà bảng theo dõi
  // trống trơn, còn lớp cũ thì mất em khỏi bảng xếp hạng dù vẫn còn bài làm.
  //
  // Vì vậy đổi lớp = một học sinh mới: cấp mã thiết bị mới, XP về 0. Bản ghi cũ
  // được để nguyên ở lớp cũ, nên bảng xếp hạng và bảng theo dõi của lớp cũ vẫn
  // đầy đủ. Hai lớp khớp nhau, không lớp nào mất gì.
  async function submit(e) {
    e.preventDefault();
    const p = nameProblem(nick) || classProblem(code);
    if (p) return setErr(p);

    const lopMoi = normalizeClass(code);
    const lopCu = normalizeClass(player?.classCode || "");
    const doiLop = !!lopCu && lopCu !== lopMoi;
    const coTienTrinh = (player?.xp || 0) > 0 || Object.keys(player?.answers || {}).length > 0;

    if (doiLop && coTienTrinh) {
      const dong_y = window.confirm(
        `Bạn đang ở lớp ${lopCu} với ${player.xp} XP.\n\n` +
        `Chuyển sang lớp ${lopMoi} nghĩa là bắt đầu lại từ đầu: 0 XP, bộ sưu tập trống.\n\n` +
        `Điểm cũ vẫn còn nguyên ở bảng xếp hạng lớp ${lopCu}.\n\n` +
        `Chuyển lớp?`
      );
      if (!dong_y) return;
    }

    setBusy(true);
    try {
      if (doiLop) await resetIdentity();
      await joinClass(nick, code);
      // Vào thẳng bộ sưu tập: đó là nơi các em thấy toàn bộ thẻ và biết mình
      // đang ở đâu. Bảng xếp hạng lúc mới vào thì trống, chẳng nói lên điều gì.
      nav("/me");
    } catch (e2) {
      setErr("Không vào lớp được: " + (e2?.message || e2));
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
