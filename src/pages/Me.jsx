import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CARDS } from "../content/cards";
import { levelOf } from "../lib/level";
import { subscribePlayer } from "../lib/store";

export default function Me() {
  const [player, setPlayer] = useState(null);
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
    </div>
  );
}
