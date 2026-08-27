import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CARD_BY_ID } from "../content/cards";
import { QUESTION_BY_ID } from "../content/questions";
import { levelOf } from "../lib/level";
import { getPlayer, recordAnswer, subscribePlayer } from "../lib/store";
import Quiz from "../components/Quiz";

// Đây là trang quan trọng nhất của sản phẩm: nơi mã QR trên thẻ bài dẫn tới.
// Nguyên tắc: KHÔNG lặp lại những gì đã in trên thẻ. Thẻ đã có cơ chế chơi rồi.
// Trang này bổ sung thứ tấm bìa không chứa được — LỊCH SỬ ĐẰNG SAU CƠ CHẾ ĐÓ.
export default function CardPage() {
  const { cardId } = useParams();
  const card = CARD_BY_ID[cardId];
  const [player, setPlayer] = useState(null);
  const [flash, setFlash] = useState(null);

  useEffect(() => subscribePlayer(setPlayer), []);
  useEffect(() => { getPlayer(); }, []);

  if (!card) {
    return (
      <div className="page">
        <h1>Không tìm thấy thẻ</h1>
        <p className="muted">Mã thẻ “{cardId}” không có trong bộ bài.</p>
        <Link className="btn" to="/">Về trang chính</Link>
      </div>
    );
  }

  const cardXp = player?.cardXp?.[card.id] || 0;
  const lv = levelOf(card, cardXp);

  async function onAnswer(q, res) {
    const gained = await recordAnswer({
      qid: q.id, cardId: card.id, level: q.level, correct: res.correct, xp: res.xp,
    });
    if (gained > 0) {
      setFlash(`+${gained} XP`);
      setTimeout(() => setFlash(null), 1600);
    }
  }

  return (
    <div className="page card-page">
      {flash && <div className="flash">{flash}</div>}

      <div className="card-hero">
        <img src={card.art} alt={`Thẻ bài ${card.name}`} />
      </div>

      <div className="card-id">
        <h1>{card.name}</h1>
        <div className="chips">
          <span className="chip menh">Mệnh {card.menh === "thuy" ? "Thủy" : card.menh}</span>
          <span className="chip">{card.years}</span>
          <span className="chip">Sinh lực {card.sinhLuc}</span>
        </div>
        <ul className="roles">{card.roles.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>

      <section className="lvbox">
        <div className="lvhead">
          <span className="lvnow">{lv.current.label}</span>
          <span className="lvxp">{cardXp} XP</span>
        </div>
        <div className="bar"><i style={{ width: `${lv.progress * 100}%` }} /></div>
        {lv.next
          ? <p className="muted sm">Còn {lv.toNext} XP để lên <strong>{lv.next.label}</strong> — mở khoá: {lv.next.unlock}</p>
          : <p className="muted sm">Đã đạt cấp cao nhất của thẻ này.</p>}
      </section>

      <section>
        <h2>Lịch sử đằng sau kỹ năng</h2>
        {card.skills.map((s, i) => {
          const locked = i > 0 && lv.index < 1;
          return (
            <article key={s.name} className={`skill ${locked ? "locked" : ""}`}>
              <header>
                <span className={`kind ${s.kind}`}>
                  {s.kind === "kich-hoat" ? "Kỹ năng kích hoạt" : "Kỹ năng thường trực"}
                </span>
                <h3>{s.name}</h3>
              </header>
              <p className="rules">{s.text}</p>
              {locked
                ? <p className="lockmsg">Trả lời đúng thêm câu hỏi để mở phần lịch sử của kỹ năng này.</p>
                : <p className="history">{s.history}</p>}
            </article>
          );
        })}
      </section>

      <section>
        <h2>Ba điều cần nhớ</h2>
        <ol className="facts">{card.facts.map((f) => <li key={f}>{f}</li>)}</ol>
        <p className="src">Nguồn: {card.source}</p>
      </section>

      <section>
        <h2>Thử thách</h2>
        {card.questions.map((qid) => {
          const q = QUESTION_BY_ID[qid];
          if (!q) return null;
          return (
            <Quiz
              key={q.id}
              question={q}
              answered={player?.answers?.[q.id] ? { picked: q.answer } : null}
              onAnswer={(res) => onAnswer(q, res)}
            />
          );
        })}
      </section>

      <nav className="foot">
        <Link className="btn" to="/me">Bộ sưu tập của tôi</Link>
        {player?.classCode && (
          <Link className="btn ghost" to={`/board/${player.classCode}`}>Bảng xếp hạng</Link>
        )}
      </nav>
    </div>
  );
}
