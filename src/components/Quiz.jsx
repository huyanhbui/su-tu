import { useState } from "react";
import { LEVEL_LABEL, XP_PER_CORRECT } from "../content/questions";

export default function Quiz({ question, answered, onAnswer }) {
  const [picked, setPicked] = useState(answered ? answered.picked : null);
  const done = picked !== null;

  function choose(i) {
    if (done) return;
    setPicked(i);
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
            <button key={i} className={cls} onClick={() => choose(i)} disabled={done}>
              <span className="choice-key">{"ABCD"[i]}</span>
              <span>{c}</span>
            </button>
          );
        })}
      </div>

      {done && (
        <div className={`explain ${picked === question.answer ? "ok" : "no"}`}>
          <strong>{picked === question.answer ? "Chính xác" : "Chưa đúng"}</strong>
          <p>{question.explain}</p>
        </div>
      )}
    </div>
  );
}
