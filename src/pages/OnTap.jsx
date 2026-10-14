import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QUESTIONS, LEVEL_LABEL } from "../content/questions";
import { CARD_BY_ID } from "../content/cards";
import { subscribePlayer } from "../lib/store";
import Quiz from "../components/Quiz";

// Personal weak-spot page. Practice only: it reads the player's answers and
// never writes anything (no recordAnswer, no XP).
const LEVELS = Object.keys(LEVEL_LABEL);
const Q_BY_ID = Object.fromEntries(QUESTIONS.map((q, i) => [q.id, { q, i }]));

export default function OnTap() {
  const [player, setPlayer] = useState(null);
  const [results, setResults] = useState({}); // { [qid]: boolean }, local only
  const [round, setRound] = useState(0);
  useEffect(() => subscribePlayer(setPlayer), []);

  // Only answers for questions (and cards) that still exist.
  const answers = Object.values(player?.answers || {}).filter(
    (a) => Q_BY_ID[a.qid] && CARD_BY_ID[Q_BY_ID[a.qid].q.cardId]
  );

  // Group by level; take the level from QUESTIONS, not from the saved record.
  const byLevel = {};
  for (const lv of LEVELS) byLevel[lv] = { n: 0, ok: 0 };
  for (const a of answers) {
    const v = byLevel[Q_BY_ID[a.qid].q.level];
    if (!v) continue;
    v.n += 1;
    if (a.correct) v.ok += 1;
  }

  const weakest = Object.entries(byLevel)
    .filter(([, v]) => v.n > 0)
    .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)[0];

  // Wrong answers, sorted by level, then by order in QUESTIONS.
  const set = answers
    .filter((a) => a.correct === false)
    .map((a) => Q_BY_ID[a.qid])
    .sort((a, b) => LEVELS.indexOf(a.q.level) - LEVELS.indexOf(b.q.level) || a.i - b.i)
    .map((x) => x.q);

  const doneCount = set.filter((q) => q.id in results).length;
  const rightCount = set.filter((q) => results[q.id]).length;

  return (
    <div className="page">
      <h1>Ôn tập</h1>

      <section>
        <h2>Lỗ hổng kiến thức của em</h2>
        {weakest && weakest[1].ok < weakest[1].n && (
          <div className="insight">
            Em yếu nhất ở mức <strong>{LEVEL_LABEL[weakest[0]]}</strong> — đúng{" "}
            {Math.round((weakest[1].ok / weakest[1].n) * 100)}% ({weakest[1].ok}/{weakest[1].n} câu).
          </div>
        )}
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
        <h2>Bộ đề ôn tập riêng của em</h2>
        {set.length === 0 ? (
          <p className="muted">Em chưa sai câu nào. Quét thêm thẻ để mở câu hỏi mới.</p>
        ) : (
          <>
            <p className="muted sm">Đây là bài luyện tập: không tính XP, không lưu kết quả.</p>
            {set.map((q) => (
              <Quiz key={`${round}-${q.id}`} question={q} answered={null} practice
                    onAnswer={({ correct }) => setResults((r) => ({ ...r, [q.id]: correct }))} />
            ))}
            {doneCount === set.length && (
              <>
                <p>Em đúng {rightCount}/{set.length} câu.</p>
                <button className="btn" type="button"
                        onClick={() => { setResults({}); setRound((n) => n + 1); }}>
                  Làm lại
                </button>
              </>
            )}
          </>
        )}
      </section>

      <nav className="foot">
        <Link className="btn ghost" to="/me">Bộ sưu tập</Link>
        <Link className="btn ghost" to="/">Trang chính</Link>
      </nav>
    </div>
  );
}
