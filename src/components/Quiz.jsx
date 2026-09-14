import { useState } from "react";
import { LEVEL_LABEL, XP_PER_CORRECT } from "../content/questions";

export default function Quiz({ question, answered, onAnswer }) {
  const [justPicked, setJustPicked] = useState(null);

  // `answered` là câu trả lời đã lưu từ lần trước, và nó thường về SAU lần vẽ đầu
  // tiên (còn phải chờ Firestore). Vì vậy tuyệt đối không dùng nó làm giá trị khởi
  // tạo của useState: làm thế thì câu đã trả lời hôm qua sẽ hiện ra như chưa làm.
  // Phải tính lại ở mỗi lần vẽ.
  const restored = answered && answered.picked != null ? answered.picked : null;
  const picked = justPicked != null ? justPicked : restored;

  // Có bản ghi cũ nhưng không biết em đã chọn ô nào (bản ghi từ trước khi ứng dụng
  // lưu `picked`). Vẫn khoá câu hỏi lại, chỉ ra đáp án đúng — không bịa ra lựa chọn.
  const done = picked != null || !!answered;

  function choose(i) {
    if (done) return;
    setJustPicked(i);
    onAnswer({
      correct: i === question.answer,
      picked: i,
      xp: XP_PER_CORRECT[question.level],
    });
  }

  return (
    <div className="quiz">
      <div className="quiz-tag">
        <span className={`lv lv-${question.level}`}>{LEVEL_LABEL[question.level]}</span>
        <span className="lv-xp">+{XP_PER_CORRECT[question.level]} XP</span>
      </div>
      <p className="quiz-stem">{question.stem}</p>

      <div className="quiz-choices">
        {question.choices.map((c, i) => {
          let cls = "choice";
          if (done) {
            if (i === question.answer) cls += " right";
            else if (i === picked) cls += " wrong";
            else cls += " dim";
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)}
                    disabled={done} type="button">
              <span className="choice-key">{"ABCD"[i]}</span>
              <span>{c}</span>
            </button>
          );
        })}
      </div>

      {done && (
        <div className={`explain ${picked === question.answer ? "ok" : "no"}`}>
          <strong>
            {picked == null
              ? "Đã trả lời"
              : picked === question.answer ? "Chính xác" : "Chưa đúng"}
          </strong>
          <p>{question.explain}</p>
        </div>
      )}
    </div>
  );
}
