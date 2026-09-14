import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CARDS, CARD_BY_ID } from "../content/cards";
import { QUESTIONS } from "../content/questions";
import { levelOf } from "../lib/level";
import { getPlayer, recordAnswer, subscribePlayer } from "../lib/store";
import Quiz from "../components/Quiz";
import JoinGate from "../components/JoinGate";

// Đây là trang quan trọng nhất của sản phẩm: nơi mã QR trên thẻ bài dẫn tới.
// Nguyên tắc: KHÔNG lặp lại những gì đã in trên thẻ. Thẻ đã có cơ chế chơi rồi.
// Trang này bổ sung thứ tấm bìa không chứa được — LỊCH SỬ ĐẰNG SAU CƠ CHẾ ĐÓ.

const MENH_LABEL = { thuy: "Thủy", hoa: "Hỏa", moc: "Mộc", kim: "Kim", tho: "Thổ" };
const LEVEL_ORDER = { "nhan-biet": 0, "thong-hieu": 1, "van-dung": 2 };

export default function CardPage() {
  const { cardId } = useParams();
  const card = CARD_BY_ID[cardId];
  const [player, setPlayer] = useState(null);
  const [flash, setFlash] = useState(null);
  // Ảnh thẻ thiếu hoặc đổi tên thì hiện khung chữ thay thế. Biểu tượng ảnh vỡ
  // ngay giữa trang là thứ tệ nhất có thể xảy ra lúc giám khảo cầm điện thoại.
  // Nhớ theo MÃ THẺ chứ không phải true/false, để chuyển sang thẻ khác là tự
  // tính lại — khỏi cần một useEffect chỉ để đặt lại cờ.
  const [artLoiId, setArtLoiId] = useState(null);

  useEffect(() => subscribePlayer(setPlayer), []);
  useEffect(() => { getPlayer(); }, []);

  // Câu hỏi của thẻ được suy ra từ ngân hàng câu hỏi theo `cardId`, không chép tay
  // vào từng thẻ. Thêm câu hỏi mới chỉ cần sửa một file, không sợ quên nối dây.
  const questions = useMemo(() => {
    if (!card) return [];
    return QUESTIONS
      .filter((q) => q.cardId === card.id)
      .sort((a, b) => (LEVEL_ORDER[a.level] ?? 9) - (LEVEL_ORDER[b.level] ?? 9));
  }, [card]);

  if (!card) {
    return (
      <div className="page">
        <h1>Không tìm thấy thẻ</h1>
        <p className="muted">
          Mã thẻ “{cardId}” không có trong bộ bài. Có thể mã QR bị mờ hoặc quét nhầm thẻ.
        </p>
        <h2>Các thẻ hiện có</h2>
        <div className="cardgrid">
          {CARDS.map((c) => (
            <Link key={c.id} to={`/c/${c.id}`} className="mini">
              <img src={c.art} alt="" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
        <nav className="foot"><Link className="btn" to="/">Về trang chính</Link></nav>
      </div>
    );
  }

  const artLoi = artLoiId === cardId;
  const joined = !!player?.nickname && !!player?.classCode;
  const cardXp = player?.cardXp?.[card.id] || 0;
  const lv = levelOf(card, cardXp);

  async function onAnswer(q, res) {
    const gained = await recordAnswer({
      qid: q.id, cardId: card.id, level: q.level,
      correct: res.correct, xp: res.xp, picked: res.picked,
    });
    if (gained > 0) {
      setFlash(`+${gained} XP`);
      setTimeout(() => setFlash(null), 1600);
    }
  }

  return (
    <div className="page card-page">
      {flash && <div className="flash">{flash}</div>}

      <div className={`card-hero ${artLoi ? "noart" : ""}`}>
        {artLoi
          ? <div className="artfall"><span>{card.name}</span></div>
          : <img src={card.art} alt={`Thẻ bài ${card.name}`} onError={() => setArtLoiId(cardId)} />}
      </div>

      <div className="card-id">
        <h1>{card.name}</h1>
        <div className="chips">
          {/* Chỉ hiện những ô có dữ liệu thật. Mệnh và Sinh lực là cơ chế chơi do
              nhóm thiết kế; thẻ nào chưa có bản in cuối thì không hiện ô rỗng. */}
          {card.menh && (
            <span className="chip menh">Mệnh {MENH_LABEL[card.menh] || card.menh}</span>
          )}
          {card.years && card.years !== "—" && <span className="chip">{card.years}</span>}
          {card.sinhLuc != null && <span className="chip">Sinh lực {card.sinhLuc}</span>}
        </div>
        <ul className="roles">{card.roles.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>

      {card.hucau && (
        <div className="hucau">
          <strong>Nhân vật hư cấu — không có trong chính sử</strong>
          <p>{card.hucau}</p>
        </div>
      )}

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

      {card.skills.length > 0 && (
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
      )}

      <section>
        <h2>Ba điều cần nhớ</h2>
        <ol className="facts">{card.facts.map((f) => <li key={f}>{f}</li>)}</ol>
        <p className="src">Nguồn: {card.source}</p>
      </section>

      <section>
        <h2>Thử thách</h2>
        {questions.length === 0 ? (
          <p className="muted sm">Thẻ này chưa có câu hỏi.</p>
        ) : !joined ? (
          <>
            {/* Cửa vào lớp, đặt NGAY TRÊN TRANG THẺ BÀI.

                Lý do: mã QR mới là cửa trước của sản phẩm, không phải trang chủ. Học sinh cầm
                thẻ lên và quét — các em không đi qua trang "Vào lớp" bao giờ. Trước đây ai quét
                thẳng vào thẻ sẽ trả lời câu hỏi với mã lớp rỗng, nên điểm không bao giờ hiện lên
                bảng xếp hạng hay bảng theo dõi của giáo viên. Câu trả lời rơi vào hư không.

                Nguyên tắc: phần lịch sử KHÔNG bị chặn — ai quét cũng đọc được ngay, kể cả ban
                giám khảo. Chỉ phần ghi điểm mới cần biết em là ai và ở lớp nào. */}
            <div className="gate">
              <h3>Vào lớp để bắt đầu tính điểm</h3>
              <p className="muted sm">
                Phần lịch sử phía trên ai cũng đọc được. Nhập biệt danh và mã lớp thì câu trả
                lời mới được tính XP và hiện lên bảng xếp hạng của lớp.
              </p>
              <JoinGate player={player} />
              <p className="muted sm">
                Dùng biệt danh, <strong>không dùng tên thật</strong>. Ứng dụng không thu thập
                họ tên, email hay hình ảnh.
              </p>
            </div>
            <p className="muted sm">
              {questions.length} câu hỏi đang chờ — trả lời đúng để mở thêm phần lịch sử của thẻ này.
            </p>
          </>
        ) : (
          questions.map((q) => (
            <Quiz
              key={q.id}
              question={q}
              answered={player?.answers?.[q.id] || null}
              onAnswer={(res) => onAnswer(q, res)}
            />
          ))
        )}
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
